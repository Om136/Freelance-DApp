package dbrepo

import (
	"Freelance-DApp-Backend/backend/models/RecievedData"
	"Freelance-DApp-Backend/backend/models/SentData"
	"context"
	"database/sql"
	"errors"
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"time"
)

func (m *PostgresRepo) SignUpUser(user RecievedData.User) error {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()
	query := `INSERT INTO users(username, email, password, role) VALUES ($1, $2, $3,$4);`
	hashedPass, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println("Error hashing password", err)
		return err
	}
	_, err = m.DB.ExecContext(ctx, query, user.Name, user.Email, hashedPass, user.Role)
	if err != nil {
		fmt.Println("Error signing Up user", err)
		return err
	}
	return nil
}

func (m *PostgresRepo) Login(email, password string) (string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()

	var userId, pass string
	query := `SELECT id, password FROM users WHERE email = $1;`

	// Use QueryRowContext for a single row result
	row := m.DB.QueryRowContext(ctx, query, email)
	err := row.Scan(&userId, &pass)
	if err != nil {
		if err == sql.ErrNoRows {
			// No user found with the provided email
			return "", errors.New("user not found")
		}
		fmt.Println("Error scanning user data:", err)
		return "", err
	}

	// Compare the provided password with the stored hash
	err = bcrypt.CompareHashAndPassword([]byte(pass), []byte(password))
	if err != nil {
		fmt.Println("Invalid password:", err)
		return "", errors.New("invalid password")
	}

	return userId, nil
}

func (m *PostgresRepo) GetRoleFromEmail(email string) (string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()
	query := `SELECT role FROM users WHERE email = $1;`
	row := m.DB.QueryRowContext(ctx, query, email)
	var role string
	err := row.Scan(&role)
	if err != nil {
		if err == sql.ErrNoRows {
			return "", errors.New("user role not found")
		} else {
			return "", err
		}
	}
	return role, nil
}

func (m *PostgresRepo) StoreWalletAddress(userId, walletAddress string) error {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()
	query := `UPDATE users 
                      SET wallet_address = $1, wallet_verified = true 
                      WHERE id = $2;`
	_, err := m.DB.ExecContext(ctx, query, walletAddress, userId)
	if err != nil {
		return err
	}
	return nil
}

func (m *PostgresRepo) CreateJob(job RecievedData.Job) error {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()
	query := `INSERT INTO jobs(title,description,budget,status,clientId,created_at,tag) VALUES ($1,$2,$3,$4,$5,$6,(SELECT id from tags where name = $7));`
	_, err := m.DB.ExecContext(ctx, query, job.Title, job.Description, job.Budget, "Open", job.ClientId, time.Now(), job.Tag)
	if err != nil {
		fmt.Println("Error inserting job:", err)
		return err
	}
	return nil
}

func (m *PostgresRepo) AddFreelancerDetails(details RecievedData.FreelancerDetails) error {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()
	tx, err := m.DB.BeginTx(ctx, &sql.TxOptions{
		Isolation: sql.LevelSerializable,
		ReadOnly:  false,
	})
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}

	query1 := `INSERT INTO freelancer_profiles (user_id, description, experience_months)
				VALUES ($1, $2, $3);`
	_, err = tx.ExecContext(ctx, query1, details.FreelancerId, details.Description, details.Experience)
	if err != nil {
		fmt.Println("Error adding freelancer description/exp/id:", err)
		return err
	}

	for i := 0; i < len(details.Tags); i++ {
		query := `INSERT INTO freelancer_rates (user_id,task_id,hourly_rate) VALUES ($1,(SELECT id from tags where name = $2),$3)`
		_, err := tx.ExecContext(ctx, query, details.FreelancerId, details.Tags[i].Name, details.Tags[i].Rate)
		if err != nil {
			fmt.Println("Error adding freelancer tags/rate:", err)
			return err
		}
	}
	return tx.Commit()
}

//Ongoing, Open, Drafted, Disputed, Completed

func (m *PostgresRepo) GetJobsForClientByStatus(userId, status string) ([]SentData.JobData, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()
	var rows *sql.Rows
	var err error
	query := `SELECT DISTINCT j.title,j.description,j.budget,j.status,j.created_at,j.status,t.name from jobs as j join tags as t on j.tag=t.id where freelancer_id = $1 and status = $2`
	if status == "all" {
		query = "SELECT DISTINCT j.title,j.description,j.budget,j.status,j.created_at,j.status,t.name from jobs as j join tags as t on j.tag=t.id where freelancer_id = $1"
		rows, err = m.DB.QueryContext(ctx, query, userId)
	} else {
		rows, err = m.DB.QueryContext(ctx, query, userId, status)
	}
	if err != nil {
		fmt.Println("Error getting jobs for client:", err)
		return []SentData.JobData{}, err
	}
	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {
			fmt.Println("Error closing rows in getJobsById:", err)
			return
		}
	}(rows)
	var jobs []SentData.JobData
	for rows.Next() {
		var job SentData.JobData
		err = rows.Scan(&job)
		if err != nil {
			fmt.Println("Error scanning jobs for client:", err)
			return nil, err
		}
		jobs = append(jobs, job)
	}
	return jobs, nil
}

func (m *PostgresRepo) GetFreelanceDetailsForClient() ([]SentData.FreelancerDetails, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()
	query := `SELECT 
			u.id,
			u.username AS name,
			fp.description,
			fp.experience_months,
			COALESCE(AVG(r.rating), 0) AS avg_rating,
			t.name AS tag_name,
			fr.hourly_rate
		FROM users u
		JOIN freelancer_profiles fp ON u.id = fp.user_id
		LEFT JOIN freelancer_rates fr ON u.id = fr.user_id
		LEFT JOIN tags t ON fr.task_id = t.id
		LEFT JOIN reviews r ON u.id = r.reviewee_id
		WHERE u.role = 'freelancer'
		GROUP BY u.id, u.username, fp.description, fp.experience_months, t.name, fr.hourly_rate
		ORDER BY u.id;
		`
	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		fmt.Println("Error getting freelance details for client:", err)
		return []SentData.FreelancerDetails{}, err
	}
	defer rows.Close()

	freelancerMap := make(map[string]SentData.FreelancerDetails)

	for rows.Next() {
		var id string
		var name, description string
		var experience, hourlyRate int
		var rating float64
		var tagName sql.NullString

		if err := rows.Scan(&id, &name, &description, &experience, &rating, &tagName, &hourlyRate); err != nil {
			return nil, err
		}

		fd, exists := freelancerMap[id]
		if !exists {
			fd = SentData.FreelancerDetails{
				Name:        name,
				Description: description,
				Experience:  experience,
				Rating:      rating,
				Tags:        []SentData.Tag{},
			}
		}

		if tagName.Valid && hourlyRate != 0 {
			fd.Tags = append(fd.Tags, SentData.Tag{
				Name:       tagName.String,
				HourlyRate: hourlyRate,
			})
		}

		freelancerMap[id] = fd
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	var result []SentData.FreelancerDetails
	for _, v := range freelancerMap {
		result = append(result, v)
	}

	return result, nil
}

func (m *PostgresRepo) ApplyForJobById(jobId, userId, filename string, cv []byte, budget int) error {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()
	query := `INSERT INTO proposals(job_id,freelancer_id,cover_letter,proposed_budget,status,created_at,filename) VALUES ($1,$2,$3,$4,$5,$6,$7)`
	_, err := m.DB.ExecContext(ctx, query, jobId, userId, cv, budget, "applied", time.Now(), filename)
	if err != nil {
		fmt.Println("Error adding proposal to db:", err)
		return err
	}
	return nil
}

package dbrepo

import (
	"Freelance-DApp-Backend/backend/models/RecievedData"
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
	query := `INSERT INTO jobs(title,description,budget,status,clientId,created_at,tag) VALUES ($1,$2,$3,$4,$5,$6,$7);`
	_, err := m.DB.ExecContext(ctx, query, job.Title, job.Description, job.Budget, "Pending", job.ClientId, time.Now(), job.Tag)
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

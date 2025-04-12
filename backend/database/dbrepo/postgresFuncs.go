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
	query := `INSERT INTO users(username, email, password, role) VALUES ($1, $2, $3,$4)`
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
	query := `SELECT userId, password FROM users WHERE email = $1`

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
	query := `SELECT role FROM users WHERE email = $1`
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

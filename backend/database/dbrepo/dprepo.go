package dbrepo

import (
	"Freelance-DApp-Backend/backend/database"
	"database/sql"
)

type PostgresRepo struct {
	DB *sql.DB
}

func NewPostgresRepo(conn *sql.DB) database.DbRepo {
	return &PostgresRepo{
		DB: conn,
	}
}

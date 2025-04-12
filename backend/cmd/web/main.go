package main

import (
	"Freelance-DApp-Backend/backend/Handlers"
	"Freelance-DApp-Backend/backend/drivers"
	"database/sql"
	"fmt"
	"net/http"
)

const portNumber = ":8080"

func main() {

	fmt.Println("Connecting to Database")
	db, err := drivers.ConnectSQL("host=localhost port=5432 dbname=DAIICT-Hackathon user=yash password=123")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer func(SQL *sql.DB) {
		err := SQL.Close()
		if err != nil {
			fmt.Println("Error closing SQL", err)
			return
		}
	}(db.SQL)
	err = db.SQL.Ping()
	if err != nil {
		fmt.Println("Error in Pinging database", err)
		return
	}
	fmt.Println("Connected to Database in main.go")

	repo := Handlers.NewRepository(db)
	Handlers.NewHandler(repo)

	fmt.Println("Starting server on portNumber", portNumber)
	srv := http.Server{
		Addr:    portNumber,
		Handler: routes(),
	}

	err = srv.ListenAndServe()
	if err != nil {
		fmt.Println(err)
		return
	}

}

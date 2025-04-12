package main

import (
	"Freelance-DApp-Backend/backend/Handlers"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"net/http"
)

func routes() http.Handler {
	mux := chi.NewRouter()
	mux.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:8080", "http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))
	mux.Use(middleware.Recoverer)
	mux.Post("/login", Handlers.Repo.Login)
	mux.Post("/signUp", Handlers.Repo.SignUp)
	mux.Route("/user", func(mux chi.Router) {
		mux.Use(AuthMiddleware)
		mux.Put("/walletSetup", Handlers.Repo.ConnectWallet)
		mux.Route("/freelancer", func(mux chi.Router) {
			mux.Use(CheckWalletConnection)
			mux.With(RoleMiddleware("freelancer")).Post("/dashboard", Handlers.Repo.SendProposal)
			mux.With(RoleMiddleware("freelancer")).Post("/addDetails", Handlers.Repo.AddFreelancerDetails)

		})
		mux.Route("/recruiter", func(mux chi.Router) {
			mux.Use(CheckWalletConnection)
			mux.With(RoleMiddleware("recruiter")).Post("/addJob", Handlers.Repo.AddJob)
			mux.With(RoleMiddleware("recruiter")).Get("/jobs/{status}", Handlers.Repo.GetJobByStatusForClient)
		})
	})
	return mux
}

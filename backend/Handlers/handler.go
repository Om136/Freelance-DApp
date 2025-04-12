package Handlers

import (
	"Freelance-DApp-Backend/backend/database"
	"Freelance-DApp-Backend/backend/database/dbrepo"
	"Freelance-DApp-Backend/backend/drivers"
	"Freelance-DApp-Backend/backend/models/RecievedData"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/go-chi/chi/v5"
	"github.com/golang-jwt/jwt/v5"
	"net/http"
	"os"
	"time"
)

var Repo *Repository

type Repository struct {
	DB database.DbRepo
}

func NewRepository(db *drivers.DB) *Repository {
	return &Repository{
		dbrepo.NewPostgresRepo(db.SQL),
	}
}

func NewHandler(r *Repository) {
	Repo = r
}

type Claims struct {
	Email  string `json:"email"`
	UserId string `json:"userId"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}

type WalletConnection struct {
	WalletAddress  string `json:"walletAddress"`
	WalletNonce    string `json:"walletNonce"`
	WalletVerified bool   `json:"walletVerified"`
	jwt.RegisteredClaims
}

func (m *Repository) Login(w http.ResponseWriter, r *http.Request) {
	var user RecievedData.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Error parsing login data", http.StatusBadRequest)
		fmt.Println("Error parsing login data:", err)
		return
	}
	fmt.Println(user)
	response := make(map[string]interface{})
	userId, err := m.DB.Login(user.Email, user.Password)
	switch {
	case errors.Is(err, errors.New("user not found")):
		fmt.Println("User not found")
		http.Error(w, "Invalid username", http.StatusUnauthorized)
		return
	case errors.Is(err, errors.New("invalid password")):
		fmt.Println("Invalid password")
		http.Error(w, "Invalid password", http.StatusUnauthorized)
		return
	case err != nil:
		fmt.Println("Error logging in user:", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	role, err := m.DB.GetRoleFromEmail(user.Email)
	if err != nil {
		fmt.Println("Error getting role from user:", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	claims := &Claims{
		Email:  user.Email,
		UserId: userId,
		Role:   role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
		},
	}
	//w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	//w.Header().Set("Access-Control-Allow-Credentials", "true")
	//w.Header().Set("Content-Type", "application/json")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_KEY")))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		_ = json.NewEncoder(w).Encode("Error generating token")
		fmt.Println("Error in signing token", err)
		return
	}
	http.SetCookie(w, &http.Cookie{
		Name:     "accessToken",
		Value:    tokenString,
		Path:     "/",
		Expires:  time.Now().Add(24 * time.Hour),
		HttpOnly: false,
		Secure:   true,
		SameSite: http.SameSiteNoneMode,
	})
	// Successful login
	response["success"] = true
	response["userId"] = userId
	response["tokenString"] = tokenString
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(response)
	if err != nil {
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
		fmt.Println("Error encoding response:", err)
	}
}

func (m *Repository) SignUp(w http.ResponseWriter, r *http.Request) {
	var user RecievedData.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println("Error parsing signup data", err)
		return
	}
	fmt.Println(user)
	if user.Role != "client" && user.Role != "freelancer" {
		w.WriteHeader(http.StatusBadRequest)
		_, err := w.Write([]byte("role is neither client nor freelancer"))
		if err != nil {
			return
		}
		err = json.NewEncoder(w).Encode("role is neither client nor freelancer")
		if err != nil {
			return
		}
		return
	}
	err = m.DB.SignUpUser(user)
	if err != nil {
		fmt.Println("Error adding user to db", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	//_, _ = w.Write([]byte("SUCCESSFUL"))
	err = json.NewEncoder(w).Encode("User created successfully")
	if err != nil {
		fmt.Println("Error encoding response:", err)
		return
	}
}

func (m *Repository) ConnectWallet(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value("userId").(string)
	var wallet RecievedData.Wallet
	err := json.NewDecoder(r.Body).Decode(&wallet)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println("Error parsing wallet address", err)
		return
	}
	fmt.Println(wallet)
	err = m.DB.StoreWalletAddress(userId, wallet.Address)
	if err != nil {
		fmt.Println("Error adding wallet address to db", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	Wallet := &WalletConnection{
		WalletAddress:  wallet.Address,
		WalletNonce:    "",
		WalletVerified: true,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, Wallet)
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_KEY")))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		_ = json.NewEncoder(w).Encode("Error generating token")
		fmt.Println("Error in signing token", err)
		return
	}
	http.SetCookie(w, &http.Cookie{
		Name:     "walletToken",
		Value:    tokenString,
		Path:     "/",
		Expires:  time.Now().Add(24 * time.Hour),
		HttpOnly: false,
		Secure:   true,
		SameSite: http.SameSiteNoneMode,
	})
	w.WriteHeader(http.StatusOK)
	//_, _ = w.Write([]byte("SUCCESSFUL"))
	err = json.NewEncoder(w).Encode("Wallet Linked successfully")
	if err != nil {
		fmt.Println("Error encoding response:", err)
		return
	}

}

func (m *Repository) SendProposal(w http.ResponseWriter, r *http.Request) {

}

func (m *Repository) AddJob(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value("userId").(string)
	var job RecievedData.Job
	err := json.NewDecoder(r.Body).Decode(&job)
	job.ClientId = userId
	//response:=make(map[string]interface{})
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println("Error parsing job data", err)
		//response=append()
		err = json.NewEncoder(w).Encode("Error parsing job data")
		if err != nil {
			return
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode("Job added successfully")
	if err != nil {
		fmt.Println("Error encoding response:", err)
		return
	}
}

func (m *Repository) AddFreelancerDetails(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value("userId").(string)
	var freelancerDetails RecievedData.FreelancerDetails
	err := json.NewDecoder(r.Body).Decode(&freelancerDetails)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println("Error parsing freelancer details data", err)
		err = json.NewEncoder(w).Encode("Error parsing freelancer details data")
		if err != nil {
			fmt.Println("Error encoding response:", err)
			return
		}
	}
	freelancerDetails.FreelancerId = userId
	err = m.DB.AddFreelancerDetails(freelancerDetails)
	if err != nil {
		fmt.Println("Error adding freelancer details to db", err)
		w.WriteHeader(http.StatusInternalServerError)
		err = json.NewEncoder(w).Encode("Error adding freelancer details to db")
		if err != nil {
			fmt.Println("Error encoding response:", err)
			return
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode("Freelancer details added successfully")
	if err != nil {
		fmt.Println("Error encoding response:", err)
		return
	}
}

func (m *Repository) GetJobByStatusForClient(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value("userId").(string)
	status := chi.URLParam(r, "status")
	//var jobs []SentData.JobData
	jobs, err := m.DB.GetJobsForClientByStatus(userId, status)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Println("Error getting jobs from database", err)
		err = json.NewEncoder(w).Encode("Error getting jobs from database")
		if err != nil {
			fmt.Println("Error encoding response:", err)
			return
		}
		return
	}
	response := make(map[string]interface{})
	response["jobs"] = jobs
	err = json.NewEncoder(w).Encode(response)
	if err != nil {
		fmt.Println("Error encoding response:", err)
		return
	}
}

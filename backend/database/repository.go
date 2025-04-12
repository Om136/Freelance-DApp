package database

import "Freelance-DApp-Backend/backend/models/RecievedData"

type DbRepo interface {
	SignUpUser(user RecievedData.User) error
	Login(email, password string) (string, error)
	GetRoleFromEmail(email string) (string, error)
	StoreWalletAddress(userId, walletAddress string) error
	CreateJob(job RecievedData.Job) error
	AddFreelancerDetails(details RecievedData.FreelancerDetails) error
}

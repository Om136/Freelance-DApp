package database

import (
	"Freelance-DApp-Backend/backend/models/RecievedData"
	"Freelance-DApp-Backend/backend/models/SentData"
)

type DbRepo interface {
	SignUpUser(user RecievedData.User) error
	Login(email, password string) (string, error)
	GetRoleFromEmail(email string) (string, error)
	StoreWalletAddress(userId, walletAddress string) error
	CreateJob(job RecievedData.Job) error
	AddFreelancerDetails(details RecievedData.FreelancerDetails) error
	GetJobsForClientByStatus(userId, status string) ([]SentData.JobData, error)
	GetFreelanceDetailsForClient() ([]SentData.FreelancerDetails, error)
	ApplyForJobById(jobId, userId, filename string, cv []byte, budget int) error
}

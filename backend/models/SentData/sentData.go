package SentData

import "time"

type WalletVerifyRequest struct {
	UserID    int    `json:"user_id"`
	Signature string `json:"signature"`
	Address   string `json:"address"`
}

type JobData struct {
	Title       string         `json:"title"`
	Description string         `json:"description"`
	Budget      int            `json:"budget"`
	Status      string         `json:"status"`
	CreatedAt   string         `json:"created_at"`
	Tag         string         `json:"tag"`
	Proposals   []ProposalData `json:"proposals"`
}

type ProposalData struct {
	//ID             string
	FreelancerID   string    `json:"freelancer_id"`
	CoverLetter    []byte    `json:"cover_letter"`
	ProposedBudget int       `json:"proposed_budget"`
	Status         string    `json:"status"`
	CreatedAt      time.Time `json:"created_at"`
	Filename       string    `json:"filename"`
}
type FreelancerDetails struct {
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Experience  int     `json:"experience"`
	Tags        []Tag   `json:"tags"`
	Rating      float64 `json:"rating"`
}
type Tag struct {
	Name       string `json:"name"`
	HourlyRate int    `json:"hourly_rate"`
}

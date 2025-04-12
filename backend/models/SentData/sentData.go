package SentData

type WalletVerifyRequest struct {
	UserID    int    `json:"user_id"`
	Signature string `json:"signature"`
	Address   string `json:"address"`
}

type JobData struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Budget      int    `json:"budget"`
	Status      string `json:"status"`
	CreatedAt   string `json:"created_at"`
	Tag         string `json:"tag"`
}

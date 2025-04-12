package SentData

type WalletVerifyRequest struct {
	UserID    int    `json:"user_id"`
	Signature string `json:"signature"`
	Address   string `json:"address"`
}

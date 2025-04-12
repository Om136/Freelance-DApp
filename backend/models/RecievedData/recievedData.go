package RecievedData

type User struct {
	Name     string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
	Role     string `json:"role"`
}

type WalletVerifyRequest struct {
	UserID    int    `json:"userId"`
	Signature string `json:"signature"`
	Address   string `json:"address"`
}

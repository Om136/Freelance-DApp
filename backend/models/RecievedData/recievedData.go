package RecievedData

type User struct {
	Name     string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
	Role     string `json:"role"`
}
type Wallet struct {
	Address string `json:"walletAddress"`
}

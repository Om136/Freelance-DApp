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

type Job struct {
	Title       string `json:"title"`
	Budget      int    `json:"budget"`
	ClientId    string `json:"clientId"`
	Tag         string `json:"tag"`
	Description string `json:"description"`
}

type FreelancerDetails struct {
	FreelancerId string `json:"freelancerId"`
	Tags         []Tag  `json:"tags"`
	Description  string `json:"description"`
	Experience   int    `json:"experience"`
}
type Tag struct {
	Name string `json:"tagName"`
	Rate int    `json:"hourlyRate"`
}

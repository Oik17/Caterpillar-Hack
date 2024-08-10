package models

import "github.com/google/uuid"

type User struct {
	ID       uuid.UUID `json:"id"`
	UserName string    `json:"username"`
	Email    string    `json:"email"`
	Password string    `json:"password"`
}

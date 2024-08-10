package models

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
)

type Product struct {
	ID                  uuid.UUID    `json:"id"`
	UserID              uuid.UUID    `json:"user_id"`
	Time                time.Time    `json:"time"`
	Machine             string       `json:"machine"`
	Component           string       `json:"component"`
	Parameter           string       `json:"parameter"`
	Value               int          `json:"value"`
	ExpectedFailureDate sql.NullTime `json:"expected_failure_date"`
}

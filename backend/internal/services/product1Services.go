package services

import (
	"encoding/json"
	"time"

	"github.com/Oik17/Caterpillar-Hack/internal/database"
	"github.com/Oik17/Caterpillar-Hack/internal/models"
)

func CreateProduct1(input models.Product1) error {
	db := database.DB.Db
	componentsJSON, err := json.Marshal(input.Components)
	if err != nil {
		return err
	}

	_, err = db.Exec(`INSERT INTO products (id, user_id, time, vehicle_name, machine, components) VALUES ($1, $2, $3, $4, $5, $6)`,
		input.ID, input.UserID, time.Now(), input.VehicleName, input.Machine, componentsJSON)

	if err != nil {
		return err
	}
	return nil
}

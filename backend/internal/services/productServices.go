package services

import (
	"github.com/Oik17/Caterpillar-Hack/internal/database"
	"github.com/Oik17/Caterpillar-Hack/internal/models"
)

func CreateProduct(input models.Product) error {
	db := database.DB.Db
	_, err := db.Exec(`INSERT INTO products (id, time, machine, component, parameter, value) VALUES ($1, $2, $3, $4, $5, $6)`, input.ID, input.Time, input.Machine, input.Component, input.Parameter, input.Value)
	if err != nil {
		return err
	}
	return nil
}

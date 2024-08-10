package services

import (
	"time"

	"github.com/Oik17/Caterpillar-Hack/internal/database"
	"github.com/Oik17/Caterpillar-Hack/internal/models"
	"github.com/google/uuid"
)

func CreateProduct(input models.Product) error {
	db := database.DB.Db
	_, err := db.Exec(`INSERT INTO products (id, user_id, time, machine, component, parameter, value) VALUES ($1, $2, $3, $4, $5, $6, $7)`, input.ID, input.UserID, input.Time, input.Machine, input.Component, input.Parameter, input.Value)
	if err != nil {
		return err
	}
	return nil
}

func GetAllProducts() ([]models.Product, error) {
	db := database.DB.Db

	rows, err := db.Query(`SELECT id, time, machine, component, parameter, value FROM products`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var products []models.Product

	for rows.Next() {
		var product models.Product
		err := rows.Scan(&product.ID, &product.Time, &product.Machine, &product.Component, &product.Parameter, &product.Value)
		if err != nil {
			return nil, err
		}
		products = append(products, product)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return products, nil
}

func UpdateProductDate(date time.Time, id uuid.UUID) error {
	db := database.DB.Db
	_, err := db.Exec(`UPDATE products SET expected_failure_date= $1 WHERE id=$2`, date, id)
	if err != nil {
		return err
	}
	return nil
}

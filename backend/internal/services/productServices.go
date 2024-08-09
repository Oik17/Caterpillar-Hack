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

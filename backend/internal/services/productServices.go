package services

import (
	"database/sql"
	"encoding/json"
	"errors"
	"time"

	"github.com/Oik17/Caterpillar-Hack/internal/database"
	"github.com/Oik17/Caterpillar-Hack/internal/models"
	"github.com/google/uuid"
)

func CreateProduct(input models.Product) error {
	db := database.DB.Db
	componentsJSON, err := json.Marshal(input.Components)
	if err != nil {
		return err
	}

	_, err = db.Exec(`INSERT INTO products (id, user_id, time, vehicle_name, machine, components, expected_failure_date) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
		input.ID, input.UserID, time.Now(), input.VehicleName, input.Machine, componentsJSON, input.ExpectedFailureDate)

	if err != nil {
		return err
	}
	return nil
}
func GetAllProducts() ([]models.Product, error) {
	db := database.DB.Db

	rows, err := db.Query(`SELECT id, user_id, time, vehicle_name, machine, components, expected_failure_date FROM products`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var products []models.Product

	for rows.Next() {
		var product models.Product
		var componentsJSON []byte

		err := rows.Scan(&product.ID, &product.UserID, &product.Time, &product.VehicleName, &product.Machine, &componentsJSON, &product.ExpectedFailureDate)
		if err != nil {
			return nil, err
		}

		err = json.Unmarshal(componentsJSON, &product.Components)
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

func GetProductByMachine(machine string) ([]models.Product, error) {
	db := database.DB.Db

	rows, err := db.Query(`SELECT id, user_id, time, vehicle_name, machine, components, expected_failure_date FROM products WHERE machine=$1`, machine)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var products []models.Product

	for rows.Next() {
		var product models.Product
		var componentsJSON []byte

		err := rows.Scan(&product.ID, &product.UserID, &product.Time, &product.VehicleName, &product.Machine, &componentsJSON, &product.ExpectedFailureDate)
		if err != nil {
			return nil, err
		}

		err = json.Unmarshal(componentsJSON, &product.Components)
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

func GetProductsByUserID(id uuid.UUID) ([]models.Product, error) {
	db := database.DB.Db

	rows, err := db.Query(`SELECT id, user_id, time, vehicle_name, machine, components, expected_failure_date FROM products WHERE user_id=$1`, id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var products []models.Product

	for rows.Next() {
		var product models.Product
		var componentsJSON []byte

		err := rows.Scan(&product.ID, &product.UserID, &product.Time, &product.VehicleName, &product.Machine, &componentsJSON, &product.ExpectedFailureDate)
		if err != nil {
			return nil, err
		}

		err = json.Unmarshal(componentsJSON, &product.Components)
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

func GetProductsByID(id string) ([]models.Product, error) {
	db := database.DB.Db

	rows, err := db.Query(`SELECT id, user_id, time, vehicle_name, machine, components, expected_failure_date FROM products WHERE id=$1`, id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var products []models.Product

	for rows.Next() {
		var product models.Product
		var componentsJSON []byte

		err := rows.Scan(&product.ID, &product.UserID, &product.Time, &product.VehicleName, &product.Machine, &componentsJSON, &product.ExpectedFailureDate)
		if err != nil {
			return nil, err
		}

		err = json.Unmarshal(componentsJSON, &product.Components)
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

func UpdateProductHealthCheck(productID uuid.UUID, healthChecks []models.HealthCheck) error {
	db := database.DB.Db
	healthCheckJSON, err := json.Marshal(healthChecks)
	if err != nil {
		return err
	}

	_, err = db.Exec("UPDATE products SET health_check = $1 WHERE id = $2", healthCheckJSON, productID)
	if err != nil {
		return err
	}

	return nil
}

func GetProductHealthCheck(productID uuid.UUID) ([]models.HealthCheck, error) {
	db := database.DB.Db
	var healthCheckJSON []byte
	var healthChecks []models.HealthCheck

	err := db.QueryRow("SELECT health_check FROM products WHERE id = $1", productID).Scan(&healthCheckJSON)
	if err != nil {
		return nil, err
	}

	if err := json.Unmarshal(healthCheckJSON, &healthChecks); err != nil {
		return nil, err
	}

	return healthChecks, nil
}

func GetDataByID(id string) ([]byte, error) {
	db := database.DB.Db

	// Prepare the query to fetch the components JSON based on the provided ID
	row := db.QueryRow(`SELECT components FROM products WHERE id=$1`, id)

	// Variable to hold the components JSON data
	var componentsJSON []byte

	// Scan the result into the componentsJSON variable
	err := row.Scan(&componentsJSON)
	if err == sql.ErrNoRows {
		return nil, errors.New("no product found with the given ID")
	} else if err != nil {
		return nil, err
	}

	// Unmarshal the JSON into the Product struct to check its validity
	var components models.Component
	err = json.Unmarshal(componentsJSON, &components)
	if err != nil {
		return nil, err
	}

	// Return the unmarshaled JSON or the componentsJSON depending on what you need
	return componentsJSON, nil
}
func GetHealthByID(id string) ([]byte, error) {
	db := database.DB.Db

	// Prepare the query to fetch the health_check JSON based on the provided ID
	row := db.QueryRow(`SELECT health_check FROM products WHERE id=$1`, id)

	// Variable to hold the health_check JSON data
	var healthCheckJSON []byte

	// Scan the result into the healthCheckJSON variable
	err := row.Scan(&healthCheckJSON)
	if err == sql.ErrNoRows {
		return nil, errors.New("no product found with the given ID")
	} else if err != nil {
		return nil, err
	}

	// Unmarshal the JSON data into a slice of HealthCheck
	var healthChecks []models.HealthCheck
	err = json.Unmarshal(healthCheckJSON, &healthChecks)
	if err != nil {
		return nil, err
	}

	// Check if there are any health checks
	if len(healthChecks) == 0 {
		return nil, errors.New("no health check data found")
	}

	// Return the JSON data for the first health check
	return healthCheckJSON, nil
}

package controllers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/Oik17/Caterpillar-Hack/internal/models"
	"github.com/Oik17/Caterpillar-Hack/internal/services"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

func CreateProduct(c echo.Context) error {
	var input struct {
		Machine     string           `json:"machine"`
		VehicleName string           `json:"vehicle_name"`
		Components  models.Component `json:"components"`
	}

	if err := c.Bind(&input); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"message": "Failed to bind input",
			"data":    err.Error(),
		})
	}

	product := models.Product{
		ID:          uuid.New(),
		Machine:     input.Machine,
		VehicleName: input.VehicleName,
		Components:  input.Components,
		UserID:      c.Get("user_id").(uuid.UUID),
	}

	if err := services.CreateProduct(product); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "Failed to create product",
			"data":    err.Error(),
		})
	}

	return c.JSON(http.StatusOK, product)
}

func UpdateProductHealthCheck(c echo.Context) error {
	productID, err := uuid.Parse(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"message": "Invalid product ID",
			"error":   err.Error(),
		})
	}

	var healthChecks []models.HealthCheck
	if err := json.NewDecoder(c.Request().Body).Decode(&healthChecks); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"message": "Failed to parse input",
			"error":   err.Error(),
		})
	}

	if err := services.UpdateProductHealthCheck(productID, healthChecks); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "Failed to update product health check",
			"error":   err.Error(),
		})
	}

	return c.JSON(http.StatusOK, map[string]string{
		"message": "Product health check updated successfully",
	})
}

func GetProductHealthCheck(c echo.Context) error {
	productID, err := uuid.Parse(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"message": "Invalid product ID",
			"error":   err.Error(),
		})
	}

	healthChecks, err := services.GetProductHealthCheck(productID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "Failed to retrieve product health check",
			"error":   err.Error(),
		})
	}

	return c.JSON(http.StatusOK, healthChecks)
}

func GetProductsOfUser(c echo.Context) error {
	userID := c.Get("user_id").(uuid.UUID)
	products, err := services.GetProductsByUserID(userID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "Failed to fetch products",
			"data":    err.Error(),
		})
	}
	return c.JSON(http.StatusOK, products)
}

// GetProductByMachine fetches a product based on the machine name
func GetProductByMachine(c echo.Context) error {
	machine := c.Param("machine")
	product, err := services.GetProductByMachine(machine)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "Failed to get product",
			"data":    err.Error(),
		})
	}
	return c.JSON(http.StatusOK, product)
}

func GetProductByID(c echo.Context) error {
	id := c.Param("id")
	product, err := services.GetProductsByID(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "Failed to get product",
			"data":    err.Error(),
		})
	}
	return c.JSON(http.StatusOK, product)
}

func GetAllProduct(c echo.Context) error {
	products, err := services.GetAllProducts()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "Failed to fetch products",
			"data":    err.Error(),
		})
	}
	return c.JSON(http.StatusOK, products)
}

func UpdateProduct(c echo.Context) error {
	var prod struct {
		ID   uuid.UUID `json:"id"`
		Date string    `json:"date"`
	}

	err := c.Bind(&prod)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"message": "Failed to fetch products",
			"data":    err.Error(),
		})
	}

	parsedDate, err := time.Parse("02-01-2006", prod.Date)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"message": "Invalid date format. Please use dd-mm-yyyy.",
			"data":    err.Error(),
		})
	}

	err = services.UpdateProductDate(parsedDate, prod.ID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "Failed to update product details",
			"data":    err.Error(),
		})
	}

	return c.JSON(http.StatusOK, map[string]string{
		"message": "Successfully updated product date",
		"data":    prod.Date,
	})
}

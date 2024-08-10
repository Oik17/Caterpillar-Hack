package controllers

import (
	"net/http"
	"time"

	"github.com/Oik17/Caterpillar-Hack/internal/models"
	"github.com/Oik17/Caterpillar-Hack/internal/services"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

func CreateProduct(c echo.Context) error {
	var product models.Product
	err := c.Bind(&product)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"message": "Failed to create product",
			"data":    err.Error(),
		})
	}
	product.ID = uuid.New()

	userID := c.Get("user_id").(uuid.UUID)
	product.UserID = userID

	err = services.CreateProduct(product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "Failed to create product",
			"data":    err.Error(),
		})
	}
	return c.JSON(http.StatusOK, product)
}

func GetAllProduct(c echo.Context) error {
	product, err := services.GetAllProducts()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "Failed to fetch products",
			"data":    err.Error(),
		})
	}
	return c.JSON(http.StatusOK, product)
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

package controllers

import (
	"net/http"

	"github.com/Oik17/Caterpillar-Hack/internal/models"
	"github.com/Oik17/Caterpillar-Hack/internal/services"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

func CreateProduct1(c echo.Context) error {
	var input struct {
		Machine     string            `json:"machine"`
		VehicleName string            `json:"vehicle_name"`
		Components  models.Component1 `json:"components"`
	}

	if err := c.Bind(&input); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"message": "Failed to bind input",
			"data":    err.Error(),
		})
	}

	product := models.Product1{
		ID:          uuid.New(),
		Machine:     input.Machine,
		VehicleName: input.VehicleName,
		Components:  input.Components,
		UserID:      c.Get("user_id").(uuid.UUID),
	}

	if err := services.CreateProduct1(product); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "Failed to create product",
			"data":    err.Error(),
		})
	}

	return c.JSON(http.StatusOK, product)
}

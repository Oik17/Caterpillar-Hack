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
	var input struct {
		Machine     string `json:"machine"`
		VehicleName string `json:"vehicle_name"`
		Components  struct {
			Engine struct {
				EngineTemperature float64 `json:"engineTemperature"`
				EngineSpeed       float64 `json:"engineSpeed"`
				OilPressure       float64 `json:"oilPressure"`
			} `json:"engine"`
			Fuel struct {
				WaterInFuel     float64 `json:"WaterInFuel"`
				FuelLevel       float64 `json:"fuelLevel"`
				FuelPressure    float64 `json:"fuelPressure"`
				FuelTemperature float64 `json:"fuelTemperature"`
			} `json:"fuel"`
			Drive struct {
				TransmissionPressure float64 `json:"transmissionPressure"`
				BrakeControl         float64 `json:"brakeControl"`
				PedalSensor          float64 `json:"pedalSensor"`
			} `json:"drive"`
			Misc struct {
				ExhaustGasTemperature float64 `json:"exhaustGasTemperature"`
				AirFilterPressure     float64 `json:"airFilterPresure"`
				SystemVoltage         float64 `json:"systemVoltage"`
				HydraulicPumpRate     float64 `json:"hydraulicPumpRate"`
			} `json:"misc"`
		} `json:"components"`
	}

	err := c.Bind(&input)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"message": "Failed to create product",
			"data":    err.Error(),
		})
	}

	var product models.Product
	product.ID = uuid.New()
	product.Machine = input.Machine
	product.Components = input.Components
	product.VehicleName = input.VehicleName
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

func GetProductByMachine(c echo.Context) error {
	machine := c.Param("machine")
	product, err := services.GetProductByMachine(machine)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "Failed to get products",
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

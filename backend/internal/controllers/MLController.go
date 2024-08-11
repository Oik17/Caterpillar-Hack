package controllers

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/Oik17/Caterpillar-Hack/internal/models"
	"github.com/Oik17/Caterpillar-Hack/internal/services"
	"github.com/labstack/echo/v4"
)

// AnomalyDetectionPayload defines the structure for sending component data to Flask.
type AnomalyDetectionPayload struct {
	Component   string             `json:"component"`
	Parameter   string             `json:"parameter"`
	Value       int                `json:"value"`
	Time        string             `json:"time"`
	Date        string             `json:"date"`
	Data        models.Component   `json:"data"`
	HealthCheck models.HealthCheck `json:"health_card"`
}

func PostAnomalyDetection(c echo.Context) error {
	id := c.Param("id")

	var input struct {
		Component string `json:"component"`
		Parameter string `json:"parameter"`
		Value     int    `json:"value"`
	}

	if err := c.Bind(&input); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"message": "Failed to bind input",
			"data":    err.Error(),
		})
	}

	// Fetch the old components JSON by ID
	data, err := services.GetDataByID(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"message": "Failed to fetch component data",
			"data":    err.Error(),
		})
	}

	// Unmarshal the JSON data into a models.Component struct
	var oldComponents models.Component
	err = json.Unmarshal(data, &oldComponents)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "Failed to unmarshal component data",
			"data":    err.Error(),
		})
	}

	// Fetch the health card by ID
	healthCardJSON, err := services.GetHealthByID(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"message": "Failed to fetch health_card",
			"data":    err.Error(),
		})
	}

	// Unmarshal the JSON data into a slice of models.HealthCheck
	var healthChecks []models.HealthCheck
	err = json.Unmarshal(healthCardJSON, &healthChecks)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "Failed to unmarshal health_card data",
			"data":    err.Error(),
		})
	}

	// Check if there are any health checks
	if len(healthChecks) == 0 {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "No health check data found",
		})
	}
	now := time.Now()
	date := now.Format("2006-01-02")
	time := now.Format("15:04:05")
	payload := AnomalyDetectionPayload{
		Component:   input.Component,
		Parameter:   input.Parameter,
		Value:       input.Value,
		Data:        oldComponents,
		HealthCheck: healthChecks[0],
		Time:        time,
		Date:        date,
	}

	jsonPayload, err := json.Marshal(payload)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "Failed to serialize payload",
			"data":    err.Error(),
		})
	}

	// Create the POST request to Flask
	req, err := http.NewRequest("POST", "https://aj1544.pythonanywhere.com/update_data", bytes.NewBuffer(jsonPayload))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "Failed to create POST request",
			"data":    err.Error(),
		})
	}

	req.Header.Set("Content-Type", "application/json")

	// Send the POST request to Flask
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "Failed to send POST request",
			"data":    err.Error(),
		})
	}
	defer resp.Body.Close()

	// Read the response from Flask
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "Failed to read response",
			"data":    err.Error(),
		})
	}

	// Return the response from the Flask app
	return c.JSON(http.StatusOK, map[string]interface{}{
		"flask_response": string(body),
	})
}

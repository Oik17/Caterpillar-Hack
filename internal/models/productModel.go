package models

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
)

type Component struct {
	Engine struct {
		Temperature float64 `json:"temperature"`
		Speed       float64 `json:"speed"`
		OilPressure float64 `json:"oilPressure"`
	} `json:"engine"`
	Fuel struct {
		WaterInFuel float64 `json:"WaterInFuel"`
		Level       float64 `json:"level"`
		Pressure    float64 `json:"Pressure"`
		Temperature float64 `json:"Temperature"`
	} `json:"fuel"`
	Drive struct {
		TransmissionPressure float64 `json:"transmissionPressure"`
		BrakeControl         float64 `json:"brakecontrol"`
		PedalSensor          float64 `json:"pedalsensor"`
	} `json:"drive"`
	Misc struct {
		ExhaustGasTemperature float64 `json:"exhaustGasTemperature"`
		AirFilterPressure     float64 `json:"airFilterPresure"`
		SystemVoltage         float64 `json:"systemVoltage"`
		HydraulicPumpRate     float64 `json:"hydraulicPumpRate"`
	} `json:"misc"`
}

type Product struct {
	ID                  uuid.UUID    `json:"id"`
	UserID              uuid.UUID    `json:"user_id"`
	Time                time.Time    `json:"time"`
	Machine             string       `json:"machine"`
	Components          Component    `json:"components"` // Replaced Component and Parameter fields
	ExpectedFailureDate sql.NullTime `json:"expected_failure_date"`
}

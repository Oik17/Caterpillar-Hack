package models

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
)

type Component struct {
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
}

type Product struct {
	ID                  uuid.UUID      `json:"id"`
	UserID              uuid.UUID      `json:"user_id"`
	Time                time.Time      `json:"time"`
	Machine             string         `json:"machine"`
	Components          Component      `json:"components"`
	ExpectedFailureDate sql.NullTime   `json:"expected_failure_date"`
	Data                sql.NullString `json:"data"`
	Health_Card         sql.NullString `json:"health_card"`
}

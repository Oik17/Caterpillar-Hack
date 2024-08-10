package models

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
)

type SensorData struct {
	Date   map[int]string  `json:"date"`
	Time   map[int]string  `json:"time"`
	Values map[int]float64 `json:"values"`
}

type Component struct {
	Engine struct {
		Temperature SensorData `json:"temperature"`
		OilPressure SensorData `json:"oilPressure"`
		Speed       SensorData `json:"speed"`
	} `json:"engine"`
	Drive struct {
		BrakeControl         SensorData `json:"brakeControl"`
		PedalSensor          SensorData `json:"pedalSensor"`
		TransmissionPressure SensorData `json:"transmissionPressure"`
	} `json:"drive"`
	Fuel struct {
		WaterInFuel SensorData `json:"waterInFuel"`
		Pressure    SensorData `json:"pressure"`
		Temperature SensorData `json:"temperature"`
		Level       SensorData `json:"level"`
	} `json:"fuel"`
	Misc struct {
		AirFilterPressure     SensorData `json:"airFilterPressure"`
		SystemVoltage         SensorData `json:"systemVoltage"`
		HydraulicPumpRate     SensorData `json:"hydraulicPumpRate"`
		ExhaustGasTemperature SensorData `json:"exhaustGasTemperature"`
	} `json:"misc"`
}

type Product struct {
	ID                  uuid.UUID      `json:"id"`
	UserID              uuid.UUID      `json:"user_id"`
	Time                time.Time      `json:"time"`
	VehicleName         string         `json:"vehicle_name"`
	Machine             string         `json:"machine"`
	Components          Component      `json:"components"`
	ExpectedFailureDate sql.NullTime   `json:"expected_failure_date"`
	Data                sql.NullString `json:"data"`
	HealthCard          sql.NullString `json:"health_card"`
}

type Component1 struct {
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

type Product1 struct {
	ID                  uuid.UUID     `json:"id"`
	UserID              uuid.UUID     `json:"user_id"`
	VehicleName         string        `json:"vehicle_name"`
	Time                time.Time     `json:"time"`
	Machine             string        `json:"machine"`
	Components          Component1    `json:"components"` // Replaced Component and Parameter fields
	ExpectedFailureDate sql.NullTime  `json:"expected_failure_date"`
	HealthScore         sql.NullInt16 `json:"healthscore"`
}

package models

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
)

type SensorData struct {
	Date   map[int]string  `json:"Date"`
	Time   map[int]string  `json:"Time"`
	Values map[int]float64 `json:"Values"`
}

type Component struct {
	Engine struct {
		Temperature SensorData `json:"Temparature"`
		OilPressure SensorData `json:"Oil Pressure"`
		Speed       SensorData `json:"Speed"`
	} `json:"Engine"`
	Drive struct {
		BrakeControl         SensorData `json:"Brake Control"`
		PedalSensor          SensorData `json:"Pedal Sensor"`
		TransmissionPressure SensorData `json:"Transmission Pressure"`
	} `json:"Drive"`
	Fuel struct {
		WaterInFuel SensorData `json:"Water In Fuel"`
		Pressure    SensorData `json:"Pressure"`
		Temperature SensorData `json:"Temparature"`
		Level       SensorData `json:"Level"`
	} `json:"Fuel"`
	Misc struct {
		AirFilterPressure     SensorData `json:"Air Filter Pressure"`
		SystemVoltage         SensorData `json:"System Voltage"`
		HydraulicPumpRate     SensorData `json:"Hydraulic Pump Rate"`
		ExhaustGasTemperature SensorData `json:"Exhaust Gas Temparature"`
	} `json:"Misc"`
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
		Temperature float64 `json:"Temparature"`
		Speed       float64 `json:"Speed"`
		OilPressure float64 `json:"Oil Pressure"`
	} `json:"Engine"`
	Fuel struct {
		WaterInFuel float64 `json:"Water In Fuel"`
		Level       float64 `json:"Level"`
		Pressure    float64 `json:"Pressure"`
		Temperature float64 `json:"Temparature"`
	} `json:"Fuel"`
	Drive struct {
		TransmissionPressure float64 `json:"Transmission Pressure"`
		BrakeControl         float64 `json:"Brake Control"`
		PedalSensor          float64 `json:"Pedal Sensor"`
	} `json:"Drive"`
	Misc struct {
		ExhaustGasTemperature float64 `json:"Exhaust Gas Temparature"`
		AirFilterPressure     float64 `json:"Air Filter Presure"`
		SystemVoltage         float64 `json:"System Voltage"`
		HydraulicPumpRate     float64 `json:"Hydraulic Pump Rate"`
	} `json:"Misc"`
}

type Product1 struct {
	ID                  uuid.UUID     `json:"id"`
	UserID              uuid.UUID     `json:"user_id"`
	VehicleName         string        `json:"vehicle_name"`
	Time                time.Time     `json:"time"`
	Machine             string        `json:"machine"`
	Components          Component1    `json:"components"` // Replaced Component and Parameter fields
	ExpectedFailureDate sql.NullTime  `json:"expected_failure_date"`
	HealthScore         sql.NullInt16 `json:"health_score"`
}

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

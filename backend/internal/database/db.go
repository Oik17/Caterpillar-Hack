package database

import (
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/Oik17/Caterpillar-Hack/internal/utils"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq" // Import the PostgreSQL driver
)

type Dbinstance struct {
	Db *sqlx.DB
}

var DB Dbinstance

func Connect() {
	p := utils.Config("DB_PORT")
	port, err := strconv.Atoi(p)
	if err != nil {
		fmt.Println("Error parsing str to int")
	}

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%d sslmode=require TimeZone=Asia/Shanghai", utils.Config("DB_HOST"), utils.Config("DB_USER"), utils.Config("DB_PASSWORD"), utils.Config("DB_NAME"), port)

	db, err := sqlx.Open("postgres", dsn)
	if err != nil {
		log.Fatal(err.Error())
		log.Fatal("Failed to connect to database. \n", err)
		os.Exit(2)
	}

	if err := db.Ping(); err != nil {
		log.Fatal(err.Error())
		log.Fatal("Failed to ping the database. \n", err)
		os.Exit(2)
	}

	log.Println("Connected")

	runMigrations(db)

	DB = Dbinstance{
		Db: db,
	}
}

func runMigrations(db *sqlx.DB) {
	_, err := db.Exec(`
		CREATE TABLE IF NOT EXISTS users (
			id UUID PRIMARY KEY	,
			username VARCHAR(255) NOT NULL UNIQUE,
			email VARCHAR(255) NOT NULL UNIQUE,
			password VARCHAR(255) NOT NULL
		);

		CREATE TABLE IF NOT EXISTS products (
			id UUID PRIMARY KEY,
			user_id UUID REFERENCES users(id),
			time TIMESTAMP,
			vehicle_name VARCHAR(255),
			machine VARCHAR(255),
			components JSONB, -- Store components as JSON
			expected_failure_date DATE,
			data TEXT,
			health_card TEXT
		);

		CREATE TABLE IF NOT EXISTS products1 (
			id UUID PRIMARY KEY,
			user_id UUID REFERENCES users(id),
			time TIMESTAMP,
			vehicle_name VARCHAR(255),
			machine VARCHAR(255),
			components JSONB, -- Store components as JSON
			expected_failure_date DATE,
			health_score INTEGER
		);
	`)

	if err != nil {
		log.Fatal("Failed to run migrations. \n", err)
		os.Exit(2)
	}

	log.Println("Migrations completed")
}

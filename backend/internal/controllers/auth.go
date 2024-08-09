package controllers

import (
	"net/http"
	"time"

	"github.com/Oik17/Caterpillar-Hack/internal/database"
	"github.com/Oik17/Caterpillar-Hack/internal/models"
	"github.com/Oik17/Caterpillar-Hack/internal/utils"
	"github.com/golang-jwt/jwt/v5"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
)

var JWTSecret = []byte(utils.Config("JWT_SECRET_KEY"))

func Signup(c echo.Context) error {
	db := database.DB.Db
	user := new(models.User)
	if err := c.Bind(user); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	user.ID = uuid.New()
	var existingUser models.User
	err := db.Get(&existingUser, "SELECT * FROM users WHERE email=$1", user.Email)
	if err == nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "User already exists"})
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	user.Password = string(hashedPassword)

	_, err = db.Exec("INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4)",
		user.ID, user.UserName, user.Email, user.Password)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
	}

	return c.JSON(http.StatusCreated, map[string]string{"message": "User created successfully"})
}

func Login(c echo.Context) error {
	db := database.DB.Db
	type LoginRequest struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	loginReq := new(LoginRequest)
	if err := c.Bind(loginReq); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"message": "Invalid Request Payload",
			"data":    err.Error(),
		})
	}
	var user models.User
	err := db.Get(&user, "SELECT * FROM users WHERE email=$1", loginReq.Email)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, map[string]string{
			"message": "Invalid Request Payload",
			"data":    err.Error(),
		})
	}
	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginReq.Password)) != nil {
		return c.JSON(http.StatusUnauthorized, map[string]string{
			"message": "Invalid Request Payload",
			"data":    "Invalid credentials",
		})
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":    user.ID.String(),
		"email": user.Email,
		"exp":   time.Now().Add(time.Hour * 72).Unix(),
	})

	t, err := token.SignedString(JWTSecret)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Could not generate token")
	}
	return c.JSON(http.StatusOK, map[string]string{
		"message": "Successfully logged in",
		"data":    t,
	})
}

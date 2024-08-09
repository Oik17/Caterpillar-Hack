package middleware

import (
	"fmt"
	"net/http"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

func Protected(c echo.Context) error {
	user := c.Get("user")
	if user == nil {
		return echo.NewHTTPError(http.StatusUnauthorized, "Missing or invalid JWT token")
	}

	token, ok := user.(*jwt.Token)
	if !ok {
		return echo.NewHTTPError(http.StatusInternalServerError, "JWT token malformed")
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to parse JWT claims")
	}

	email, ok := claims["email"].(string)
	if !ok {
		return echo.NewHTTPError(http.StatusInternalServerError, "Email claim missing or invalid")
	}

	return c.String(http.StatusOK, fmt.Sprintf("Welcome %s!", email))
}

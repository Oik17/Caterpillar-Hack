package middleware

import (
	"net/http"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

func Protected(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
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

		userIDStr, ok := claims["id"].(string)
		if !ok {
			return echo.NewHTTPError(http.StatusInternalServerError, "User ID claim missing or invalid")
		}

		userID, err := uuid.Parse(userIDStr)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "Invalid user ID format")
		}

		c.Set("user_id", userID)

		return next(c)
	}
}

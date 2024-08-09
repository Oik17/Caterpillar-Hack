package main

import (
	"net/http"

	"github.com/Oik17/Caterpillar-Hack/internal/controllers"
	"github.com/Oik17/Caterpillar-Hack/internal/database"
	middleWare "github.com/Oik17/Caterpillar-Hack/internal/middleware"
	"github.com/Oik17/Caterpillar-Hack/internal/utils"

	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	database.Connect()
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	e.POST("/signup", controllers.Signup)
	e.POST("/login", controllers.Login)

	r := e.Group("/restricted")
	r.Use(echojwt.JWT(controllers.JWTSecret))

	e.GET("/ping", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{
			"message": "pong",
		})
	}, echojwt.JWT(controllers.JWTSecret), middleWare.Protected)
	e.Logger.Fatal(e.Start(":" + utils.Config("PORT")))
}

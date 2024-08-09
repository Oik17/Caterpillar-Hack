package routes

import (
	"github.com/Oik17/Caterpillar-Hack/internal/controllers"
	"github.com/labstack/echo/v4"
)

func ProductRoutes(e *echo.Echo) {
	r := e.Group("/products")

	r.POST("/create", controllers.CreateProduct)
	r.GET("/getAll", controllers.GetAllProduct)
}

package routes

import (
	"github.com/Oik17/Caterpillar-Hack/internal/controllers"

	middleWare "github.com/Oik17/Caterpillar-Hack/internal/middleware"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
)

func ProductRoutes(e *echo.Echo) {
	r := e.Group("/products")

	r.POST("/create", controllers.CreateProduct, echojwt.JWT(controllers.JWTSecret), middleWare.Protected)
	r.GET("/getAll", controllers.GetAllProduct)
	r.GET("/getByMachine/:machine", controllers.GetProductByMachine)
	r.POST("/updateData", controllers.UpdateProduct)
}

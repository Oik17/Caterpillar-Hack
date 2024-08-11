package routes

import (
	"github.com/Oik17/Caterpillar-Hack/internal/controllers"

	middleWare "github.com/Oik17/Caterpillar-Hack/internal/middleware"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
)

func ProductRoutes(e *echo.Echo) {
	e.POST("/upload/:id", controllers.AddData)

	r := e.Group("/products")

	r.GET("/getByUser", controllers.GetProductsOfUser, echojwt.JWT(controllers.JWTSecret), middleWare.Protected)
	r.POST("/create", controllers.CreateProduct, echojwt.JWT(controllers.JWTSecret), middleWare.Protected)
	r.POST("/create1", controllers.CreateProduct1, echojwt.JWT(controllers.JWTSecret), middleWare.Protected)

	r.POST("/updateRoute/:id", controllers.UpdateData)
	r.GET("/predictData/:id", controllers.PredictData)

	r.GET("/getAll", controllers.GetAllProduct)
	r.POST("/updateHealth/:id", controllers.UpdateProductHealthCheck)
	r.GET("/getHealth/:id", controllers.GetProductHealthCheck)
	r.GET("/getByMachine/:machine", controllers.GetProductByMachine)
	r.GET("/getByID/:id", controllers.GetProductByID)
	r.POST("/updateData", controllers.UpdateProduct)
}

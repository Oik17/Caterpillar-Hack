run:
	go run cmd/main.go

postgres:
	docker run --name postgres12 -p 5433:5432 -e POSTGRES_PASSWORD=Orchid7890 -d postgres:12-alpine

createdb:
	docker exec -it postgres12 createdb --username=postgres caterpillar-hack

dropdb:
	docker exec -it postgres12 dropdb 
	
.PHONY: run postgres createdb dropdb
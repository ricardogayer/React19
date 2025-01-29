build:
	docker build -t react19:latest .

docker:
	docker compose down
	docker compose up -d

.PHONY: build docker
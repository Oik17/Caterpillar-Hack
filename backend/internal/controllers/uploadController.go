package controllers

import (
	"net/http"
	"os"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

func UploadFilesToS3(c echo.Context) error {
	form, err := c.MultipartForm()
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"message": "Failed to parse form",
			"data":    err.Error(),
		})
	}

	files := form.File["files"]

	sess, err := session.NewSession(&aws.Config{
		Region: aws.String(os.Getenv("AWS_REGION")),
		Credentials: credentials.NewStaticCredentials(
			os.Getenv("AWS_ACCESS_KEY_ID"),
			os.Getenv("AWS_SECRET_ACCESS_KEY"),
			"",
		),
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"message": "Failed to create AWS session",
			"data":    err.Error(),
		})
	}

	svc := s3.New(sess)

	var uploadedFiles []map[string]string
	for _, fileHeader := range files {
		file, err := fileHeader.Open()
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{
				"message": "Failed to open file",
				"data":    err.Error(),
			})
		}
		defer file.Close()

		filename := uuid.New().String() + "-" + fileHeader.Filename

		_, err = svc.PutObject(&s3.PutObjectInput{
			Bucket: aws.String(os.Getenv("AWS_S3_BUCKET")),
			Key:    aws.String(filename),
			Body:   file,
		})
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{
				"message": "Failed to upload file to S3",
				"data":    err.Error(),
			})
		}

		req, _ := svc.GetObjectRequest(&s3.GetObjectInput{
			Bucket: aws.String(os.Getenv("AWS_S3_BUCKET")),
			Key:    aws.String(filename),
		})
		urlStr, err := req.Presign(60 * 24 * time.Minute)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{
				"message": "Failed to generate pre-signed URL",
				"data":    err.Error(),
			})
		}

		uploadedFiles = append(uploadedFiles, map[string]string{
			"filename": filename,
			"url":      urlStr,
		})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"message": "Files uploaded successfully",
		"data":    uploadedFiles,
	})
}

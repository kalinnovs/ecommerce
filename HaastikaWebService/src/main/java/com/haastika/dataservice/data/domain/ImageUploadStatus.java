package com.haastika.dataservice.data.domain;

public class ImageUploadStatus {
    private ImageUploadStatusMessages uploadedImageStatus;
    private String uplodedImagePath;
   

    public enum ImageUploadStatusMessages {
        UPLOADED_SUCCESSFULLY("Image Uploaded Successfully "), EMPTY_IMAGE("Empty image cannot be uploded"),
            UPLOAD_UNSUCCESSFULL("Error in uploading image "), IMAGE_EXCEEDING_SIZE(
                "Image exceeds the maximum size requirements"), IMAGE_TYPE_INAVLID("Image type unallowed for upload");

        private String statusDescription;

        private ImageUploadStatusMessages(String statusDescription) {
            this.setStatusDescription(statusDescription);
        }

        public String getStatusDescription() {
            return statusDescription;
        }

        public void setStatusDescription(String statusDescription) {
            this.statusDescription = statusDescription;
        }

    }

    public String getUplodedImagePath() {
        return uplodedImagePath;
    }

    public void setUplodedImagePath(String uplodedImagePath) {
        this.uplodedImagePath = uplodedImagePath;
    }

	public ImageUploadStatusMessages getUploadedImageStatus() {
		return uploadedImageStatus;
	}

	public void setUploadedImageStatus(ImageUploadStatusMessages uploadedImageStatus) {
		this.uploadedImageStatus = uploadedImageStatus;
	}

}

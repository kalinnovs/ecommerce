package com.haastika.dataservice.data.domain.product;

import com.haastika.dataservice.data.domain.ImageUploadStatus;


public class ProductImageUploadStatus {

    private ImageUploadStatus baseImageUploadStatus;
    private ImageUploadStatus largeImageUploadStatus;
    private ImageUploadStatus thumbImageUploadStatus;
    private ImageUploadStatus extraLargeImageUploadStatus;
    
    public ImageUploadStatus getExtraLargeImageUploadStatus() {
        return extraLargeImageUploadStatus;
    }
    public void setExtraLargeImageUploadStatus(ImageUploadStatus extraLargeImageUploadStatus) {
        this.extraLargeImageUploadStatus = extraLargeImageUploadStatus;
    }
    public ImageUploadStatus getThumbImageUploadStatus() {
        return thumbImageUploadStatus;
    }
    public void setThumbImageUploadStatus(ImageUploadStatus thumbImageUploadStatus) {
        this.thumbImageUploadStatus = thumbImageUploadStatus;
    }
    public ImageUploadStatus getLargeImageUploadStatus() {
        return largeImageUploadStatus;
    }
    public void setLargeImageUploadStatus(ImageUploadStatus largeImageUploadStatus) {
        this.largeImageUploadStatus = largeImageUploadStatus;
    }
    public ImageUploadStatus getBaseImageUploadStatus() {
        return baseImageUploadStatus;
    }
    public void setBaseImageUploadStatus(ImageUploadStatus baseImageUploadStatus) {
        this.baseImageUploadStatus = baseImageUploadStatus;
    }
    
}

package com.haastika.dataservice.data.domain.category;

import com.haastika.dataservice.data.domain.ImageUploadStatus;

public class CategoryImageUploadStatus {

    private ImageUploadStatus menuImageUploadStatus;
    
    public ImageUploadStatus getMenuImageUploadStatus() {
        return menuImageUploadStatus;
    }
    
    public void setMenuImageUploadStatus(ImageUploadStatus menuImageUploadStatus) {
        this.menuImageUploadStatus = menuImageUploadStatus;
    }
    private ImageUploadStatus tileImageUploadStatus;
    
    public ImageUploadStatus getTileImageUploadStatus() {
        return tileImageUploadStatus;
    }

    
    public void setTileImageUploadStatus(ImageUploadStatus tileImageUploadStatus) {
        this.tileImageUploadStatus = tileImageUploadStatus;
    }
    public ImageUploadStatus getBannerImageUploadStatus() {
        return bannerImageUploadStatus;
    }

    public void setBannerImageUploadStatus(ImageUploadStatus bannerImageUploadStatus) {
        this.bannerImageUploadStatus = bannerImageUploadStatus;
    }
    private ImageUploadStatus bannerImageUploadStatus;
    

    
}

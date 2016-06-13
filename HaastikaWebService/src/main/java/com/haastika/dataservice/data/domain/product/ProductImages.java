package com.haastika.dataservice.data.domain.product;

import org.springframework.web.multipart.MultipartFile;

public class ProductImages {

    private MultipartFile mediumImage;
    private MultipartFile thumbImage;
    private MultipartFile largeImage;
    private MultipartFile extraLargeImage;
    private Integer productId;
    private String imageName;
    private Integer productImageId;

    public MultipartFile getMediumImage() {
		return mediumImage;
	}

	public void setMediumImage(MultipartFile mediumImage) {
		this.mediumImage = mediumImage;
	}

	public MultipartFile getThumbImage() {
        return thumbImage;
    }

    public void setThumbImage(MultipartFile thumbImage) {
        this.thumbImage = thumbImage;
    }

    public MultipartFile getLargeImage() {
        return largeImage;
    }

    public void setLargeImage(MultipartFile largeImage) {
        this.largeImage = largeImage;
    }

    public MultipartFile getExtraLargeImage() {
        return extraLargeImage;
    }

    public void setExtraLargeImage(MultipartFile extraLargeImage) {
        this.extraLargeImage = extraLargeImage;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getProductImageId() {
        return productImageId;
    }

    public void setProductImageId(Integer productImageId) {
        this.productImageId = productImageId;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

}

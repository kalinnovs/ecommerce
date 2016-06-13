package com.haastika.dataservice.data.domain.category;

import org.springframework.web.multipart.MultipartFile;

public class CategoryImages {

    private MultipartFile categoryMenuImage;
    private MultipartFile categoryTileImage;
    private MultipartFile categoryBannerImage;
    private Integer categoryId;
    private String categoryPartNumber;

    public MultipartFile getCategoryMenuImage() {
        return categoryMenuImage;
    }

    public void setCategoryMenuImage(MultipartFile categoryMenuImage) {
        this.categoryMenuImage = categoryMenuImage;
    }

    public MultipartFile getCategoryTileImage() {
        return categoryTileImage;
    }

    public void setCategoryTileImage(MultipartFile categoryTileImage) {
        this.categoryTileImage = categoryTileImage;
    }

    public MultipartFile getCategoryBannerImage() {
        return categoryBannerImage;
    }

    public void setCategoryBannerImage(MultipartFile categoryBannerImage) {
        this.categoryBannerImage = categoryBannerImage;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryPartNumber() {
        return categoryPartNumber;
    }

    public void setCategoryPartNumber(String categoryPartNumber) {
        this.categoryPartNumber = categoryPartNumber;
    }
}

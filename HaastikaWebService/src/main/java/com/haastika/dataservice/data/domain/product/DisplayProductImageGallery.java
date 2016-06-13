package com.haastika.dataservice.data.domain.product;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.haastika.dataservice.data.domain.DisplayImage;

@JsonInclude(Include.NON_NULL)
public class DisplayProductImageGallery {

    private DisplayImage baseImage;

    private DisplayImage thumbImage;

    private DisplayImage largeImage;

    private DisplayImage extraLargeImage;

    private Integer productImageId;

    public DisplayImage getBaseImage() {
        return baseImage;
    }

    public DisplayImage getThumbImage() {
        return thumbImage;
    }

    public DisplayImage getLargeImage() {
        return largeImage;
    }

    public DisplayImage getExtraLargeImage() {
        return extraLargeImage;
    }

    public Integer getProductImageId() {
        return productImageId;
    }

    public void setBaseImage(DisplayImage baseImage) {
        this.baseImage = baseImage;
    }

    public void setThumbImage(DisplayImage thumbImage) {
        this.thumbImage = thumbImage;
    }

    public void setLargeImage(DisplayImage largeImage) {
        this.largeImage = largeImage;
    }

    public void setExtraLargeImage(DisplayImage extraLargeImage) {
        this.extraLargeImage = extraLargeImage;
    }

    public void setProductImageId(Integer productImageId) {
        this.productImageId = productImageId;
    }

}

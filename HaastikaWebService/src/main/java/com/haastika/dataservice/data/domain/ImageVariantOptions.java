package com.haastika.dataservice.data.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class ImageVariantOptions {

    private Integer ImageId;

    private String thumbImagePath;

    private String largeImagePath;

    private String extraLargeImagePath;

    public String getThumbImagePath() {
        return thumbImagePath;
    }

    public String getLargeImagePath() {
        return largeImagePath;
    }

    public String getExtraLargeImagePath() {
        return extraLargeImagePath;
    }

    public void setThumbImagePath(String thumbImagePath) {
        this.thumbImagePath = thumbImagePath;
    }

    public void setLargeImagePath(String largeImagePath) {
        this.largeImagePath = largeImagePath;
    }

    public void setExtraLargeImagePath(String extraLargeImagePath) {
        this.extraLargeImagePath = extraLargeImagePath;
    }

    public Integer getImageId() {
        return ImageId;
    }

    public void setImageId(Integer imageId) {
        ImageId = imageId;
    }

}

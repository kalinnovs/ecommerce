package com.haastika.dataservice.data.domain;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class DisplayProductImage implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = -3309281433489456867L;
	private String baseImagePath;
    private String thumbImagePath;
    private String largeImagePath;
    private String extraLargeImagePath;
    private Integer productImageId;
    private String imageName; 

    
    public String getBaseImagePath() {
        return baseImagePath;
    }

    public void setBaseImagePath(String baseImagePath) {
        this.baseImagePath = baseImagePath;
    }
    
    public String getThumbImagePath() {
        return thumbImagePath;
    }

    public void setThumbImagePath(String thumbImagePath) {
        this.thumbImagePath = thumbImagePath;
    }

    public String getLargeImagePath() {
        return largeImagePath;
    }
    
    public void setLargeImagePath(String largeImagePath) {
        this.largeImagePath = largeImagePath;
    }
    
    public String getExtraLargeImagePath() {
        return extraLargeImagePath;
    }
    
    public void setExtraLargeImagePath(String extraLargeImagePath) {
        this.extraLargeImagePath = extraLargeImagePath;
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

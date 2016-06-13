package com.haastika.dataservice.dataaccess.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "PRODUCT_IMAGE")
public class ProductImage implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = -4222849569970487590L;

    @Column(name = "PRODUCT_ID", nullable = false)
    private Integer productId;

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    @Column(name = "PRODUCT_IMAGE_ID", unique = true, nullable = false)
    private Integer productImageId;

    @Column(name = "IMAGE_NAME")
    private String imageName;
    
    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    @Column(name = "MODIFICATION_DATE")
    private Date modificationDate;

    @Column(name = "CREATION_DATE")
    private Date creationDate;

    @Column(name = "BASE_IMAGE_PATH")
    private String baseImagePath;

    @Column(name = "THUMB_IMAGE_PATH")
    private String thumbImagePath;

    @Column(name = "LARGE_IMAGE_PATH")
    private String largeImagePath;

    @Column(name = "EXTRA_LARGE_IMAGE_PATH")
    private String extraLargeImagePath;

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

    public Date getModificationDate() {
        return modificationDate;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setModificationDate(Date modificationDate) {
        this.modificationDate = modificationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

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

}

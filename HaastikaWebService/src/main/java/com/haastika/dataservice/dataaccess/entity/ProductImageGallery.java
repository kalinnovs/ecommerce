package com.haastika.dataservice.dataaccess.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "PRODUCT_IMAGE_GALLERY")
public class ProductImageGallery implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = -4222849569970487590L;

    @Id
    @Column(name = "PRODUCT_IMAGE_ID", unique = true, nullable = false)
    private Integer productImageId;

    @Column(name = "MODIFICATION_DATE")
    private Date modificationDate;

    @Column(name = "CREATION_DATE")
    private Date creationDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BASE_IMAGE_ID", insertable = false, updatable = false)
    private Image baseImage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "THUMB_IMAGE_ID", insertable = false, updatable = false)
    private Image thumbImage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "LARGE_IMAGE_ID", insertable = false, updatable = false)
    private Image largeImage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "EXTRA_LARGE_IMAGE_ID", insertable = false, updatable = false)
    private Image extraLargeImage;

    public Integer getProductImageId() {
        return productImageId;
    }

    public Date getModificationDate() {
        return modificationDate;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public Image getBaseImage() {
        return baseImage;
    }

    public Image getThumbImage() {
        return thumbImage;
    }

    public Image getLargeImage() {
        return largeImage;
    }

    public Image getExtraLargeImage() {
        return extraLargeImage;
    }

    public void setProductImageId(Integer productImageId) {
        this.productImageId = productImageId;
    }

    public void setModificationDate(Date modificationDate) {
        this.modificationDate = modificationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public void setBaseImage(Image baseImage) {
        this.baseImage = baseImage;
    }

    public void setThumbImage(Image thumbImage) {
        this.thumbImage = thumbImage;
    }

    public void setLargeImage(Image largeImage) {
        this.largeImage = largeImage;
    }

    public void setExtraLargeImage(Image extraLargeImage) {
        this.extraLargeImage = extraLargeImage;
    }
}

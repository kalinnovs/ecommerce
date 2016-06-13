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
@Table(name = " IMAGE")
public class Image implements Serializable {

    public Image() {
        super();
    }

    /**
     * 
     */
    private static final long serialVersionUID = 2899036928757696070L;

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    @Column(name = "IMAGE_ID", unique = true, nullable = false)
    private Integer imageId;

    @Column(name = "MODIFICATION_DATE")
    private Date modificationDate;

    @Column(name = "CREATION_DATE")
    private Date creationDate;

    @Column(name = "IMAGE_PATH")
    private String imagePath;

    @Column(name = "ALT")
    private String alt;

    @Column(name = "HEIGHT")
    private String height;

    @Column(name = "WIDTH")
    private String width;

    public Integer getImageId() {
        return imageId;
    }

    public void setImageId(Integer imageId) {
        this.imageId = imageId;
    }

    public String getAlt() {
        return alt;
    }

    public void setAlt(String alt) {
        this.alt = alt;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public String getWidth() {
        return width;
    }

    public void setWidth(String width) {
        this.width = width;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

    public Date getModificationDate() {
        return modificationDate;
    }

    public void setModificationDate(Date modificationDate) {
        this.modificationDate = modificationDate;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}

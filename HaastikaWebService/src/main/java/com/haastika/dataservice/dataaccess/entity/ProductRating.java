package com.haastika.dataservice.dataaccess.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "PRODUCT_RATING")
public class ProductRating implements Serializable{

    /**
     * 
     */
    private static final long serialVersionUID = -2527159221286278455L;

    @Id
    @Column(name = "PRODUCT_ID", unique = true, nullable = false)
    private Integer productId;

    
    public Integer getProductId() {
        return productId;
    }

    
    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    
    public Integer getOneStarRating() {
        return oneStarRating;
    }

    
    public void setOneStarRating(Integer oneStarRating) {
        this.oneStarRating = oneStarRating;
    }

    
    public Integer getTwoStarRating() {
        return twoStarRating;
    }

    
    public void setTwoStarRating(Integer twoStarRating) {
        this.twoStarRating = twoStarRating;
    }

    
    public Integer getThreeStarRating() {
        return threeStarRating;
    }

    
    public void setThreeStarRating(Integer threeStarRating) {
        this.threeStarRating = threeStarRating;
    }

    
    public Integer getFourStarRating() {
        return fourStarRating;
    }

    
    public void setFourStarRating(Integer fourStarRating) {
        this.fourStarRating = fourStarRating;
    }

    
    public Integer getFiveStarRating() {
        return fiveStarRating;
    }

    
    public void setFiveStarRating(Integer fiveStarRating) {
        this.fiveStarRating = fiveStarRating;
    }

    
    public Integer getAverageRating() {
        return averageRating;
    }

    
    public void setAverageRating(Integer averageRating) {
        this.averageRating = averageRating;
    }

    @Column(name = "ONE_STAR_RATING_COUNT")
    private Integer oneStarRating;

    @Column(name = "TWO_STAR_RATING_COUNT")
    private Integer twoStarRating;

    @Column(name = "THREE_STAR_RATING_COUNT")
    private Integer threeStarRating;

    @Column(name = "FOUR_STAR_RATING_COUNT")
    private Integer fourStarRating;

    @Column(name = "FIVE_STAR_RATING_COUNT")
    private Integer fiveStarRating;

    @Column(name = "AVERAGE_RATING")
    private Integer averageRating;
}

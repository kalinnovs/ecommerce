package com.haastika.dataservice.dataaccess.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "PRODUCT_SPECIFICATION")
public class ProductSpecification implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = 7967890907338869141L;

    /**
     * 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "PRODUCT_SPECIFICATION_ID", unique = true, nullable = false)
    private Integer productSpecificationId;

    
    public Integer getProductSpecificationId() {
        return productSpecificationId;
    }

    
    public void setProductSpecificationId(Integer productSpecificationId) {
        this.productSpecificationId = productSpecificationId;
    }

    @Column(name = "HEIGHT")
    private String height;

    @Column(name = "WEIGHT")
    private String weight;

    @Column(name = "WIDTH")
    private String width;

    @Column(name = "DEPTH")
    private String depth;

    @Column(name = "USAGE_DETAILS")
    private String usageDetails;

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getWidth() {
        return width;
    }

    public void setWidth(String width) {
        this.width = width;
    }

    public String getDepth() {
        return depth;
    }

    public void setDepth(String depth) {
        this.depth = depth;
    }

    public String getUsageDetails() {
        return usageDetails;
    }

    public void setUsageDetails(String usageDetails) {
        this.usageDetails = usageDetails;
    }

}

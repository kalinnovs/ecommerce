package com.haastika.dataservice.data.domain.product;

import java.io.Serializable;

public class DisplayProductSpecification implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = 5452358757391493621L;

	private String height;

    private String weight;

    private String width;

    private String depth;

    private String usageDetails;

    private Integer productSpecificationId;

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

    public Integer getProductSpecificationId() {
        return productSpecificationId;
    }

    public void setProductSpecificationId(Integer productSpecificationId) {
        this.productSpecificationId = productSpecificationId;
    }

}

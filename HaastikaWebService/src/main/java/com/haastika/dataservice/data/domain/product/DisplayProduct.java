package com.haastika.dataservice.data.domain.product;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.haastika.dataservice.data.domain.DisplayProductImage;

@JsonInclude(Include.NON_NULL)
public class DisplayProduct implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = 4737180784950902015L;
	private String productName;
    private Integer productId;
    private String productPartNumber;
    private String productAvailablility;
    private BigDecimal productPrice;

    private String productCurrency;
    private BigDecimal averageProductRating;
    private String productDetailsURL;
    private String productDescription;
    private List<ProductPriceOptions> productPriceOptions;
    private List<DisplayProductImage> productImageGallery;


    public BigDecimal getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(BigDecimal productPrice) {
        this.productPrice = productPrice;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public BigDecimal getAverageProductRating() {
        return averageProductRating;
    }

    public void setAverageProductRating(BigDecimal averageProductRating) {
        this.averageProductRating = averageProductRating;
    }


    public String getProductAvailablility() {
        return productAvailablility;
    }

    public void setProductAvailablility(String productAvailablility) {
        this.productAvailablility = productAvailablility;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getProductCurrency() {
        return productCurrency;
    }

    public void setProductCurrency(String productCurrency) {
        this.productCurrency = productCurrency;
    }

    public String getProductDetailsURL() {
        return productDetailsURL;
    }

    public void setProductDetailsURL(String productDetailsURL) {
        this.productDetailsURL = productDetailsURL;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public String getProductPartNumber() {
        return productPartNumber;
    }

    public void setProductPartNumber(String productPartNumber) {
        this.productPartNumber = productPartNumber;
    }

	public List<ProductPriceOptions> getProductPriceOptions() {
		return productPriceOptions;
	}

	public void setProductPriceOptions(List<ProductPriceOptions> productPriceOptions) {
		this.productPriceOptions = productPriceOptions;
	}

	public List<DisplayProductImage> getProductImageGallery() {
		return productImageGallery;
	}

	public void setProductImageGallery(List<DisplayProductImage> productImageGallery) {
		this.productImageGallery = productImageGallery;
	}
}

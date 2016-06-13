package com.haastika.dataservice.data.domain.product;

import java.io.Serializable;
import java.util.List;

import com.haastika.dataservice.data.domain.DisplayProductImage;
import com.haastika.dataservice.data.domain.product.ProductMetaData.ProductCategory;
import com.haastika.dataservice.data.domain.product.ProductMetaData.ProductCurrency;


public class ProductAttributes implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = 5738357717670368410L;
	private Integer productId;
    private String productName;
    private String productDescription;
    private Boolean enabled;
    private String productAvailablility;

    private ProductCategory productCategory;
    private ProductCurrency productCurrency;
    private String productDetailsURL;
    private List<ProductPriceOptions> priceOptions;
    private DisplayProductSpecification productSpecification;
    private List<DisplayProductImage> productImageGallery;

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public ProductCurrency getProductCurrency() {
        return productCurrency;
    }

    public void setProductCurrency(ProductCurrency productCurrency) {
        this.productCurrency = productCurrency;
    }

    public List<ProductPriceOptions> getPriceOptions() {
        return priceOptions;
    }

    public void setPriceOptions(List<ProductPriceOptions> priceOptions) {
        this.priceOptions = priceOptions;
    }

    public ProductCategory getProductCategory() {
        return productCategory;
    }

    public void setProductCategory(ProductCategory productCategory) {
        this.productCategory = productCategory;
    }

    public DisplayProductSpecification getProductSpecification() {
        return productSpecification;
    }

    public void setProductSpecification(DisplayProductSpecification productSpecification) {
        this.productSpecification = productSpecification;
    }

	public List<DisplayProductImage> getProductImageGallery() {
		return productImageGallery;
	}

	public void setProductImageGallery(List<DisplayProductImage> productImageGallery) {
		this.productImageGallery = productImageGallery;
	}

	public String getProductDetailsURL() {
		return productDetailsURL;
	}

	public void setProductDetailsURL(String productDetailsURL) {
		this.productDetailsURL = productDetailsURL;
	}

	public String getProductAvailablility() {
		return productAvailablility;
	}

	public void setProductAvailablility(String productAvailablility) {
		this.productAvailablility = productAvailablility;
	}

}

package com.haastika.dataservice.data.domain;

import java.math.BigDecimal;
import java.util.List;

import com.haastika.dataservice.data.domain.product.ProductPriceOptions;


public class ProductDetails {
    private String productName;
    private Integer productId;
    private Integer categoryId;
    private String productAvailablility;
    private Boolean enabled;
    private BigDecimal productPrice;
    private String productImage;
    private Integer stock;
    private float avgRating;
    private float height;
    private float width;
    private float depth;
    private String dimensionUnit;

    private ProductCurrency productCurrency;
    private BigDecimal averageProductRating;
    private List<Image> imageGallery;
    private String description;
    
    private List<ProductPriceOptions> priceOptions;
    
    public BigDecimal getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(BigDecimal productPrice) {
        this.productPrice = productPrice;
    }
    
    public List<Image> getImageGallery() {
        return imageGallery;
    }
    
    public void setImageGallery(List<Image> imageGallery) {
        this.imageGallery = imageGallery;
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

    public List<ProductPriceOptions> getPriceOptions() {
        return priceOptions;
    }

    public void setPriceOptions(List<ProductPriceOptions> priceOptions) {
        this.priceOptions = priceOptions;
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

    public String getProductImage() {
        return productImage;
    }

    public void setProductImage(String productImage) {
        this.productImage = productImage;
    }

    public ProductCurrency getProductCurrency() {
        return productCurrency;
    }

    public void setProductCurrency(ProductCurrency productCurrency) {
        this.productCurrency = productCurrency;
    }

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public Integer getStock() {
		return stock;
	}

	public void setStock(Integer stock) {
		this.stock = stock;
	}

	public float getAvgRating() {
		return avgRating;
	}

	public void setAvgRating(float avgRating) {
		this.avgRating = avgRating;
	}

	public float getHeight() {
		return height;
	}

	public void setHeight(float height) {
		this.height = height;
	}

	public float getWidth() {
		return width;
	}

	public void setWidth(float width) {
		this.width = width;
	}

	public float getDepth() {
		return depth;
	}

	public void setDepth(float depth) {
		this.depth = depth;
	}

	public String getDimensionUnit() {
		return dimensionUnit;
	}

	public void setDimensionUnit(String dimensionUnit) {
		this.dimensionUnit = dimensionUnit;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

}

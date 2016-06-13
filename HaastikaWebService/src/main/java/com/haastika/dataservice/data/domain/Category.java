package com.haastika.dataservice.data.domain;

import java.util.List;

public class Category {

    private Integer categoryId;
    private Integer rootCategoryId;
    private String categoryName;
    private String menuImagePath;
    private String bannerImagePath;
    private String tileImagePath;
    private String categoryStatus;
    private String description;
    private String modificationDate;
    
    private List<Category> subcategoryList;
    private List<ProductDetails> productList;
    
    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getMenuImagePath() {
		return menuImagePath;
	}

	public void setMenuImagePath(String menuImagePath) {
		this.menuImagePath = menuImagePath;
	}

	public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public Integer getRootCategoryId() {
		return rootCategoryId;
	}

	public void setRootCategoryId(Integer rootCategoryId) {
		this.rootCategoryId = rootCategoryId;
	}

	public List<Category> getSubcategoryList() {
        return subcategoryList;
    }

    public void setSubcategoryList(List<Category> subcategoryList) {
        this.subcategoryList = subcategoryList;
    }

	public String getBannerImagePath() {
		return bannerImagePath;
	}

	public void setBannerImagePath(String bannerImagePath) {
		this.bannerImagePath = bannerImagePath;
	}

	public String getTileImagePath() {
		return tileImagePath;
	}

	public void setTileImagePath(String tileImagePath) {
		this.tileImagePath = tileImagePath;
	}

	public String getCategoryStatus() {
		return categoryStatus;
	}

	public void setCategoryStatus(String categoryStatus) {
		this.categoryStatus = categoryStatus;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<ProductDetails> getProductList() {
		return productList;
	}

	public void setProductList(List<ProductDetails> productList) {
		this.productList = productList;
	}

	public String getModificationDate() {
		return modificationDate;
	}

	public void setModificationDate(String modificationDate) {
		this.modificationDate = modificationDate;
	}

}

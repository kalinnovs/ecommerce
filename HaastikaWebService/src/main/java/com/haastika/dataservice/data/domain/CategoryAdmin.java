package com.haastika.dataservice.data.domain;


public class CategoryAdmin {

    private Integer categoryId;
    private Integer rootCategoryId;
    private String categoryName;
    private String menuImagePath;
    private String bannerImagePath;
    private String tileImagePath;
    private Boolean enabled;
    private String description;
    private String modificationDate;
    private String creationDate;
    
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

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}


	public String getModificationDate() {
		return modificationDate;
	}

	public void setModificationDate(String modificationDate) {
		this.modificationDate = modificationDate;
	}

	public String getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(String creationDate) {
		this.creationDate = creationDate;
	}

}

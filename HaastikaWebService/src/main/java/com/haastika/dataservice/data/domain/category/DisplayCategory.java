package com.haastika.dataservice.data.domain.category;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.sun.istack.internal.NotNull;

@JsonInclude(Include.NON_NULL)
public class DisplayCategory implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = -472752237088649516L;
	private String categoryName;
    private String menuImagePath;
    private String tileImagePath;
    private String bannerImagePath;
    private String partNumber;
    private String description;
    private String categoryCSSClass;
    private Integer categoryId;
    @NotNull
    private List<DisplayCategory> subcategoryList;
    private String categoryDetailsURL;

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public List<DisplayCategory> getSubcategoryList() {
        return subcategoryList;
    }

    public void setSubcategoryList(List<DisplayCategory> subcategoryList) {
        this.subcategoryList = subcategoryList;
    }

    public String getCategoryDetailsURL() {
        return categoryDetailsURL;
    }

    public void setCategoryDetailsURL(String categoryDetailsURL) {
        this.categoryDetailsURL = categoryDetailsURL;
    }

    public String getCategoryCSSClass() {
        return categoryCSSClass;
    }

    public void setCategoryCSSClass(String categoryCSSClass) {
        this.categoryCSSClass = categoryCSSClass;
    }

	public String getMenuImagePath() {
		return menuImagePath;
	}

	public void setMenuImagePath(String menuImagePath) {
		this.menuImagePath = menuImagePath;
	}

	public String getTileImagePath() {
		return tileImagePath;
	}

	public void setTileImagePath(String tileImagePath) {
		this.tileImagePath = tileImagePath;
	}

	public String getBannerImagePath() {
		return bannerImagePath;
	}

	public void setBannerImagePath(String bannerImagePath) {
		this.bannerImagePath = bannerImagePath;
	}

	public String getPartNumber() {
		return partNumber;
	}

	public void setPartNumber(String partNumber) {
		this.partNumber = partNumber;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}

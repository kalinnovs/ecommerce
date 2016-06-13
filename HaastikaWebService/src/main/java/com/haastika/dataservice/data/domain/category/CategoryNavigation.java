package com.haastika.dataservice.data.domain.category;

import java.io.Serializable;
import java.util.List;

public class CategoryNavigation  implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = -8124162224652393578L;
	private String categoryName;
    private String categoryMenuImagePath;
    private String categoryPartNumber;
    private String categoryCSSClass;
    private Integer categoryId;
    private List<CategoryNavigation> subcategoryList;
    private String categoryDetailsURL;
    private String selected;

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryMenuImagePath() {
        return categoryMenuImagePath;
    }

    public void setCategoryMenuImagePath(String categoryMenuImagePath) {
        this.categoryMenuImagePath = categoryMenuImagePath;
    }

    public String getCategoryPartNumber() {
        return categoryPartNumber;
    }

    public void setCategoryPartNumber(String categoryPartNumber) {
        this.categoryPartNumber = categoryPartNumber;
    }

    public String getCategoryCSSClass() {
        return categoryCSSClass;
    }

    public void setCategoryCSSClass(String categoryCSSClass) {
        this.categoryCSSClass = categoryCSSClass;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }


    public String getCategoryDetailsURL() {
        return categoryDetailsURL;
    }

    public void setCategoryDetailsURL(String categoryDetailsURL) {
        this.categoryDetailsURL = categoryDetailsURL;
    }

    public List<CategoryNavigation> getSubcategoryList() {
        return subcategoryList;
    }

    public void setSubcategoryList(List<CategoryNavigation> subcategoryList) {
        this.subcategoryList = subcategoryList;
    }

	public String getSelected() {
		return selected;
	}

	public void setSelected(String selected) {
		this.selected = selected;
	}

}

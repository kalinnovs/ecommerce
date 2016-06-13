package com.haastika.dataservice.data.domain.category;

import java.io.Serializable;
import java.util.List;

import com.haastika.dataservice.data.domain.category.CategoryMetaData.CategoryView;
import com.haastika.dataservice.data.domain.product.ProductAttributes;


public class CategoryAttributes implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = 3884960540433555596L;
	private String categoryName;
    private String categoryDescription;
    private String categoryPartNumber;
    
    private String categoryMenuImagePath;
    private String categoryTileImagePath;
    private String categoryBannerImagePath;
    private String categoryCSSClass;
    
    private Integer categoryId;
    private Boolean enabled;
    private CategoryView rootCategory;

    private List<ProductAttributes> productsList;
    
    private List<CategoryAttributes> subCategoryList;
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

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public List<ProductAttributes> getProductsList() {
        return productsList;
    }

    public void setProductsList(List<ProductAttributes> productsList) {
        this.productsList = productsList;
    }
    public String getCategoryMenuImagePath() {
        return categoryMenuImagePath;
    }

    public void setCategoryMenuImagePath(String categoryMenuImagePath) {
        this.categoryMenuImagePath = categoryMenuImagePath;
    }

    public String getCategoryTileImagePath() {
        return categoryTileImagePath;
    }

    public void setCategoryTileImagePath(String categoryTileImagePath) {
        this.categoryTileImagePath = categoryTileImagePath;
    }

    public String getCategoryBannerImagePath() {
        return categoryBannerImagePath;
    }

    public void setCategoryBannerImagePath(String categoryBannerImagePath) {
        this.categoryBannerImagePath = categoryBannerImagePath;
    }

    public String getCategoryCSSClass() {
        return categoryCSSClass;
    }

    public void setCategoryCSSClass(String categoryCSSClass) {
        this.categoryCSSClass = categoryCSSClass;
    }

    public String getCategoryDescription() {
        return categoryDescription;
    }

    public void setCategoryDescription(String categoryDescription) {
        this.categoryDescription = categoryDescription;
    }

    public String getCategoryPartNumber() {
        return categoryPartNumber;
    }

    public void setCategoryPartNumber(String categoryPartNumber) {
        this.categoryPartNumber = categoryPartNumber;
    }

    public List<CategoryAttributes> getSubCategoryList() {
        return subCategoryList;
    }

    public void setSubCategoryList(List<CategoryAttributes> subCategoryList) {
        this.subCategoryList = subCategoryList;
    }

	public CategoryView getRootCategory() {
		return rootCategory;
	}

	public void setRootCategory(CategoryView rootCategory) {
		this.rootCategory = rootCategory;
	}   
}

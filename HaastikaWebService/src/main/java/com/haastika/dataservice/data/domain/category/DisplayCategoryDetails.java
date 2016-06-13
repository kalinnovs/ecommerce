package com.haastika.dataservice.data.domain.category;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.haastika.dataservice.data.domain.BreadCrumb;
import com.haastika.dataservice.data.domain.product.DisplayProduct;

@JsonInclude(Include.NON_NULL)
public class DisplayCategoryDetails implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = -4070263233052670246L;
	private DisplayCategory selectedCategory;
    private List<DisplayCategory> filterCategories;
    private List<DisplayProduct> productsList;
    private CategoryAttributes categoryAttributes;
    private List<BreadCrumb> breadcrumb;

    public DisplayCategory getSelectedCategory() {
        return selectedCategory;
    }

    public void setSelectedCategory(DisplayCategory selectedCategory) {
        this.selectedCategory = selectedCategory;
    }

    public List<DisplayCategory> getFilterCategories() {
        return filterCategories;
    }

    public void setFilterCategories(List<DisplayCategory> filterCategories) {
        this.filterCategories = filterCategories;
    }

    public List<DisplayProduct> getProductsList() {
        return productsList;
    }

    public void setProductsList(List<DisplayProduct> productsList) {
        this.productsList = productsList;
    }

	public CategoryAttributes getCategoryAttributes() {
		return categoryAttributes;
	}

	public void setCategoryAttributes(CategoryAttributes categoryAttributes) {
		this.categoryAttributes = categoryAttributes;
	}

	public List<BreadCrumb> getBreadcrumb() {
		return breadcrumb;
	}

	public void setBreadcrumb(List<BreadCrumb> breadcrumb) {
		this.breadcrumb = breadcrumb;
	}

}

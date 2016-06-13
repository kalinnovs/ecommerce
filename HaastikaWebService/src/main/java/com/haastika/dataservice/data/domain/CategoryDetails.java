package com.haastika.dataservice.data.domain;

import java.util.List;


public class CategoryDetails {
    
    private Category selectedCategory;
    private List<Category> filterCategories;
    private List<ProductDetails> productsList;
    
    
    public Category getSelectedCategory() {
        return selectedCategory;
    }
    
    public void setSelectedCategory(Category selectedCategory) {
        this.selectedCategory = selectedCategory;
    }
    
    public List<Category> getFilterCategories() {
        return filterCategories;
    }
    
    public void setFilterCategories(List<Category> filterCategories) {
        this.filterCategories = filterCategories;
    }
    
    public List<ProductDetails> getProductsList() {
        return productsList;
    }
    
    public void setProductsList(List<ProductDetails> productsList) {
        this.productsList = productsList;
    }


}

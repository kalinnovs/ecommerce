package com.haastika.dataservice.dataaccess.dao.productcategory;

import java.util.List;

import com.haastika.dataservice.dataaccess.entity.Category;

public interface CategoryDAO {

    public List<Category> fetchAllEnabledRootCategories();
    public List<Category> fetchAllAvailableCategoriesForProduct();
    public List<Category> fetchAllEnabledCategories(Integer rootCategoryId);
    public List<Category> fetchAllEnabledSubCategories();
    public List<Category> fetchAllRootCategories();
    public List<Category> fetchAllSubCategories();
}

package com.haastika.dataservice.dataaccess.dao.productcategory;

import java.util.List;

import com.haastika.dataservice.dataaccess.entity.ProductCategory;

public interface ProductCategoryDAO {

    public List<ProductCategory> fetchAllRootCategories();
    public List<ProductCategory> fetchAllSubCategories();
    public List<ProductCategory> fetchSubCategories(final Integer categoryId);

}

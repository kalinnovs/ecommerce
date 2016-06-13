package com.haastika.dataservice.data.domain.pageDetails;

import java.util.List;

import com.haastika.dataservice.data.domain.category.CategoryAttributes;
import com.haastika.dataservice.data.domain.category.CategoryMetaData;
import com.haastika.dataservice.data.domain.product.ProductMetaData;

public class AdminPageDetails extends PageDetails {

    private CategoryMetaData categoryMetaData;
    private ProductMetaData productMetaData;
    private List<CategoryAttributes> categoryList;

  
    public List<CategoryAttributes> getCategoryList() {
        return categoryList;
    }

    public void setCategoryList(List<CategoryAttributes> categoryList) {
        this.categoryList = categoryList;
    }

    public CategoryMetaData getCategoryMetaData() {
        return categoryMetaData;
    }

    public void setCategoryMetaData(CategoryMetaData categoryMetaData) {
        this.categoryMetaData = categoryMetaData;
    }

    public ProductMetaData getProductMetaData() {
        return productMetaData;
    }

    public void setProductMetaData(ProductMetaData productMetaData) {
        this.productMetaData = productMetaData;
    }
   
}

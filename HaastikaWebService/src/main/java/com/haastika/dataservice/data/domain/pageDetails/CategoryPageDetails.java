package com.haastika.dataservice.data.domain.pageDetails;

import com.haastika.dataservice.data.domain.PageNavigation;
import com.haastika.dataservice.data.domain.category.DisplayCategoryDetails;

public class CategoryPageDetails extends PageDetails {

    public CategoryPageDetails(DisplayCategoryDetails categoryDetails, PageNavigation pageNavigation) {
        super();
        this.setCategoryDetails(categoryDetails);
        setPageNavigation(pageNavigation);
    }

    public DisplayCategoryDetails getCategoryDetails() {
        return categoryDetails;
    }

    public void setCategoryDetails(DisplayCategoryDetails categoryDetails) {
        this.categoryDetails = categoryDetails;
    }

    private DisplayCategoryDetails categoryDetails;

}

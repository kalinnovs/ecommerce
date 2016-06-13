package com.haastika.dataservice.data.domain.pageDetails;

import com.haastika.dataservice.data.domain.PageNavigation;
import com.haastika.dataservice.data.domain.product.DisplayProductDetails;


public class ProductPageDetails extends PageDetails {
    
    public ProductPageDetails(DisplayProductDetails productDetails,PageNavigation pageNavigation) {
        super();
        this.productDetails = productDetails;
        setPageNavigation(pageNavigation);
    }

    private DisplayProductDetails productDetails;

    public DisplayProductDetails getProductDetails() {
        return productDetails;
    }

    public void setProductDetails(DisplayProductDetails productDetails) {
        this.productDetails = productDetails;
    }
    
    
    

}

package com.haastika.dataservice.data.domain.product;

import com.haastika.dataservice.data.domain.PageNavigation;

public class DisplayProductNavigationDetails {

    private PageNavigation pageNavigation;
    private DisplayProductDetails productDetails;

    public PageNavigation getPageNavigation() {
		return pageNavigation;
	}

	public void setPageNavigation(PageNavigation pageNavigation) {
		this.pageNavigation = pageNavigation;
	}

	public DisplayProductDetails getProductDetails() {
		return productDetails;
	}

	public void setProductDetails(DisplayProductDetails productDetails) {
		this.productDetails = productDetails;
	}

}

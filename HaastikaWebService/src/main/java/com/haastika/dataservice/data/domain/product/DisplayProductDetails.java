package com.haastika.dataservice.data.domain.product;

import java.util.List;

import com.haastika.dataservice.data.domain.BreadCrumb;


public class DisplayProductDetails extends DisplayProduct {

    private DisplayProductSpecification productSpecification;
    private List<BreadCrumb> breadcrumb;

    public DisplayProductSpecification getProductSpecification() {
        return productSpecification;
    }

    public void setProductSpecification(DisplayProductSpecification productSpecification) {
        this.productSpecification = productSpecification;
    }

	public List<BreadCrumb> getBreadcrumb() {
		return breadcrumb;
	}

	public void setBreadcrumb(List<BreadCrumb> breadcrumb) {
		this.breadcrumb = breadcrumb;
	}

}

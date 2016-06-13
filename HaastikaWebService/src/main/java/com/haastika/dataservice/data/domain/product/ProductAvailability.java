package com.haastika.dataservice.data.domain.product;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public enum ProductAvailability  {
    INSTOCK("In stock"), OUTOFSTOCK("Out of stock");

    private String statusDescription;

    
    public String getStatusDescription() {
        return statusDescription;
    }

    private ProductAvailability(final String statusDescription) {
        this.statusDescription = statusDescription;
    }

};

package com.haastika.dataservice.data.domain;


public class ProductCurrency {
    public ProductCurrency(Integer productId, Integer currencyId) {
        super();
        this.productId = productId;
        this.currencyId = currencyId;
    }
    private Integer productId;
    private Integer currencyId;
    public Integer getProductId() {
        return productId;
    }
    public void setProductId(Integer productId) {
        this.productId = productId;
    }
    public Integer getCurrencyId() {
        return currencyId;
    }
    public void setCurrencyId(Integer currencyId) {
        this.currencyId = currencyId;
    }
    

}

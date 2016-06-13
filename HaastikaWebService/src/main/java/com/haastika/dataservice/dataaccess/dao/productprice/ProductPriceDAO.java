package com.haastika.dataservice.dataaccess.dao.productprice;

import java.util.List;

import com.haastika.dataservice.dataaccess.entity.ProductPrice;


public interface ProductPriceDAO {
    public List<ProductPrice> getAllPriceDataForProduct(final Integer productId);
    public List<ProductPrice> getAllPriceDataForProducts(final List<Integer> productIds);
}

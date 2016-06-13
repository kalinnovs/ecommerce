package com.haastika.dataservice.service;

import java.util.List;

import com.haastika.dataservice.data.domain.DisplayProductImage;
import com.haastika.dataservice.data.domain.category.SaveStatus;
import com.haastika.dataservice.data.domain.product.DisplayProduct;
import com.haastika.dataservice.data.domain.product.DisplayProductDetails;
import com.haastika.dataservice.data.domain.product.DisplayProductSpecification;
import com.haastika.dataservice.data.domain.product.ProductAttributes;
import com.haastika.dataservice.data.domain.product.ProductMetaData;
import com.haastika.dataservice.data.domain.product.ProductMetaData.ProductCategory;
import com.haastika.dataservice.data.domain.product.ProductMetaData.ProductCurrency;
import com.haastika.dataservice.dataaccess.entity.Product;
import com.haastika.dataservice.dataaccess.entity.ProductImage;
import com.haastika.dataservice.dataaccess.entity.ProductSpecification;


public interface ProductDataService {

    public DisplayProductDetails getDisplayProductDetails(final Integer productId);
    public DisplayProductDetails getDisplayProductDetails(final Product product);
    public DisplayProduct getDisplayProduct(final Product product);
    public DisplayProduct getDisplayProduct(final Integer productId);
    public ProductAttributes getProductAttributes(final Product product);
    public List<ProductAttributes> getProductAttributes(final List<Product> productList);
    public DisplayProductImage getDisplayProductImage(final ProductImage productImage); 
    public DisplayProductSpecification getDisplayProductSpecification(final ProductSpecification productSpecification); 
    public ProductMetaData getProductAdminPageMetaData();
    public List<ProductCategory> getAllAvailableProductCategoriesForMetaData(); 
    public List<ProductCurrency> getAllAvailableProductCurrencies();
    public SaveStatus saveProductData(final ProductAttributes productAttributes);
    public SaveStatus deleteProductData(final Integer productId);
	public SaveStatus deleteProductImageData(Integer productImageId);
}


package com.haastika.dataservice.dataaccess.dao.productimage;

import java.util.List;

import com.haastika.dataservice.dataaccess.entity.ProductImage;

public interface ProductImageDAO {

    public List<ProductImage> getAllImagesForProduct(final Integer productId);

    public Integer getNextImageSequenceIdForProduct(final Integer productId);
    
}

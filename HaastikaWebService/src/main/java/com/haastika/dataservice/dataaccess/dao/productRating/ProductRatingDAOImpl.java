package com.haastika.dataservice.dataaccess.dao.productRating;

import org.springframework.stereotype.Repository;

import com.haastika.dataservice.dataaccess.dao.base.BaseDAOImpl;
import com.haastika.dataservice.dataaccess.entity.ProductRating;

@Repository("productRatingDAO")
public class ProductRatingDAOImpl extends BaseDAOImpl<ProductRating,String> implements ProductRatingDAO {

    public ProductRatingDAOImpl() {
        super(ProductRating.class);
    }

}

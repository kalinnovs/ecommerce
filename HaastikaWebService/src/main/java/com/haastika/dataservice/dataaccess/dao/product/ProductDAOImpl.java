package com.haastika.dataservice.dataaccess.dao.product;

import org.springframework.stereotype.Repository;

import com.haastika.dataservice.dataaccess.dao.base.BaseDAOImpl;
import com.haastika.dataservice.dataaccess.entity.Product;


@Repository("ProductDAO")
public class ProductDAOImpl extends BaseDAOImpl<Product,Integer> implements ProductDAO {

    public ProductDAOImpl() {
        super(Product.class);
    }
    

}

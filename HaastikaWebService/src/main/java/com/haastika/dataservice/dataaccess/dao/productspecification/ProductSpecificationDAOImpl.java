package com.haastika.dataservice.dataaccess.dao.productspecification;

import org.springframework.stereotype.Repository;

import com.haastika.dataservice.dataaccess.dao.base.BaseDAOImpl;
import com.haastika.dataservice.dataaccess.entity.ProductSpecification;

@Repository("productSpecificationDAO")
public class ProductSpecificationDAOImpl extends BaseDAOImpl< ProductSpecification,String> implements ProductSpecificationDAO {

    public ProductSpecificationDAOImpl() {
        super(ProductSpecification.class);
    }

}

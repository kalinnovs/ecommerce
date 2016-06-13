package com.haastika.dataservice.dataaccess.dao.productcategory;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.haastika.dataservice.dataaccess.dao.base.BaseDAOImpl;
import com.haastika.dataservice.dataaccess.entity.ProductCategory;

@Repository("productCategoryDAO")
public class ProductCategoryDAOImpl extends BaseDAOImpl<ProductCategory,Integer> implements ProductCategoryDAO {

    public ProductCategoryDAOImpl() {
        super(ProductCategory.class);
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<ProductCategory> fetchAllRootCategories() {
        
        List<ProductCategory> productCategories = new ArrayList<ProductCategory>();
        try {
            final Criteria categoryCriteria = getCriteria();
            categoryCriteria.add(Restrictions.isNull("parentCategory.categoryId"));
            productCategories = categoryCriteria.list();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return productCategories;
    }

    @SuppressWarnings("unchecked")
    public List<ProductCategory> fetchAllSubCategories() {
        
        List<ProductCategory> productCategories = new ArrayList<ProductCategory>();
        try {
            final Criteria categoryCriteria = getCriteria();
            categoryCriteria.add(Restrictions.isNotNull("parentCategory.categoryId"));
            productCategories = categoryCriteria.list();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return productCategories;
    }

    @SuppressWarnings("unchecked")
    public List<ProductCategory> fetchSubCategories(final Integer categoryId) {
        
        List<ProductCategory> productCategories = new ArrayList<ProductCategory>();
        try {
            final Criteria categoryCriteria = getCriteria();
            categoryCriteria.add(Restrictions.eq("parentCategory.categoryId", categoryId));
            productCategories = categoryCriteria.list();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return productCategories;
    }
}

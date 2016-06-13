package com.haastika.dataservice.dataaccess.dao.productcategory;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.haastika.dataservice.dataaccess.dao.base.BaseDAOImpl;
import com.haastika.dataservice.dataaccess.entity.Category;

@Repository("categoryDAO")
public class CategoryDAOImpl extends BaseDAOImpl<Category, Integer> implements CategoryDAO {

    public CategoryDAOImpl() {
        super(Category.class);
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<Category> fetchAllEnabledRootCategories() {

        List<Category> productCategories = new ArrayList<Category>();
        try {
            final Criteria categoryCriteria = getCriteria();
            categoryCriteria.add(Restrictions.isNull("parentCategory.categoryId"));
            categoryCriteria.add(Restrictions.eq("enabled", true));
            productCategories = categoryCriteria.list();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return productCategories;
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<Category> fetchAllRootCategories() {

        List<Category> productCategories = new ArrayList<Category>();
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
    public List<Category> fetchAllEnabledCategories(Integer rootCategoryId) {

        List<Category> productCategories = new ArrayList<Category>();
        try {
            final Criteria categoryCriteria = getCriteria();
            categoryCriteria.add(Restrictions.eq("enabled", true));
            categoryCriteria.add(Restrictions.eq("rootCategoryId", rootCategoryId));
            productCategories = categoryCriteria.list();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return productCategories;
    }
    @SuppressWarnings("unchecked")
    public List<Category> fetchAllEnabledSubCategories() {

        List<Category> productCategories = new ArrayList<Category>();
        try {
            final Criteria categoryCriteria = getCriteria();
            categoryCriteria.add(Restrictions.eq("enabled", true));
            categoryCriteria.add(Restrictions.isNotNull("parentCategory.categoryId"));
            productCategories = categoryCriteria.list();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return productCategories;
    }

    @SuppressWarnings("unchecked")
    public List<Category> fetchAllSubCategories() {

        List<Category> productCategories = new ArrayList<Category>();
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
    public List<Category> fetchAllAvailableCategoriesForProduct() {
        final List<Category> categoryList = new ArrayList<Category>();
        final Criteria categoryCriteria = getCriteria();
        final ProjectionList projList = Projections.projectionList();
        projList.add(Projections.property("categoryName"));
        projList.add(Projections.property("categoryId"));
        categoryCriteria.setProjection(projList);
        categoryCriteria.add(Restrictions.eq("enabled", true));
        //categoryCriteria.setResultTransformer(Transformers.aliasToBean(CategoryDTO.class));
        final List<Object[]> rows = categoryCriteria.list();
        for (final Object[] rowData : rows) {
            final Integer categoryId = (Integer) rowData[1];
            final String categoryName = (String) rowData[0];
            Category category = new Category();
            category.setCategoryId(categoryId);
            category.setCategoryName(categoryName);
            categoryList.add(category);

        }

        return categoryList;
    }
    
    public void disableCategory(final Category persistentInstance) {
        persistentInstance.setEnabled(false);
        update(persistentInstance);
    }
    
}

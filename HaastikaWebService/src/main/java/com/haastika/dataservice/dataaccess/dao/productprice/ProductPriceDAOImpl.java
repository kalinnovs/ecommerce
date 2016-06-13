package com.haastika.dataservice.dataaccess.dao.productprice;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.haastika.dataservice.dataaccess.dao.base.BaseDAOImpl;
import com.haastika.dataservice.dataaccess.entity.ProductPrice;
import com.haastika.dataservice.dataaccess.entity.ProductPrice.ProductPricePK;

@Repository("ProductPriceDAO")
public class ProductPriceDAOImpl extends BaseDAOImpl<ProductPrice,ProductPricePK> implements ProductPriceDAO {

    public ProductPriceDAOImpl() {
        super(ProductPrice.class);
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<ProductPrice> getAllPriceDataForProduct(final Integer productId) {
        List<ProductPrice> priceList = new ArrayList<ProductPrice>();
        try {
            final Criteria priceCriteria = getCriteria();
            priceCriteria.add(Restrictions.eq("id.productId", productId));
            priceList = priceCriteria.list();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return priceList;
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<ProductPrice> getAllPriceDataForProducts(List<Integer> productIds) {
        List<ProductPrice> priceList = new ArrayList<ProductPrice>();
        try {
            final Criteria priceCriteria = getCriteria();
            final Criterion productIdCriterion = Restrictions.in("id.productId", productIds);
            priceCriteria.add(productIdCriterion);
            priceList = priceCriteria.list();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return priceList;
    }
}

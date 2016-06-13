package com.haastika.dataservice.dataaccess.dao.productimage;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.haastika.dataservice.dataaccess.dao.base.BaseDAOImpl;
import com.haastika.dataservice.dataaccess.entity.ProductImage;

@Repository("ProductImageDAO")
public class ProductImageDAOImpl extends BaseDAOImpl<ProductImage, Integer> implements ProductImageDAO {

    public ProductImageDAOImpl() {
        super(ProductImage.class);
    }

    @SuppressWarnings("unchecked")
	@Override
    public List<ProductImage> getAllImagesForProduct(final Integer productId) {

        List<ProductImage> productImages = new ArrayList<ProductImage>();
        try {
            final Criteria prodImageCriteria = getCriteria();
            prodImageCriteria.add(Restrictions.eq("productId", productId));
            productImages = prodImageCriteria.list();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return productImages;
    }

    @Override
    public Integer getNextImageSequenceIdForProduct(final Integer productId) {
        final List<ProductImage> productImages = getAllImagesForProduct(productId);
        final List<Integer> imageSequences = new ArrayList<Integer>();
        for (final ProductImage image : productImages) {
            String imageName = image.getImageName();
            final Integer imageSeq = Integer.parseInt(imageName.substring(5));
            imageSequences.add(imageSeq);
        }
        return imageSequences.size() > 0 ? Collections.max(imageSequences) : 1;
    }

}

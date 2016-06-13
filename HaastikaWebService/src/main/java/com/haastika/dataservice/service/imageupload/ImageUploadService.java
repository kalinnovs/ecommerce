package com.haastika.dataservice.service.imageupload;

import com.haastika.dataservice.data.domain.DisplayProductImage;
import com.haastika.dataservice.data.domain.category.CategoryImageUploadStatus;
import com.haastika.dataservice.data.domain.category.CategoryImages;
import com.haastika.dataservice.data.domain.product.ProductImages;

public interface ImageUploadService {

    public DisplayProductImage uploadProductImages(final ProductImages productImages);

    public CategoryImageUploadStatus uploadCategoryImages(final CategoryImages categoryImages);
}

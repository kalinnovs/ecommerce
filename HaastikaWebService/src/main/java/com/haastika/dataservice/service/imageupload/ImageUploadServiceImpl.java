package com.haastika.dataservice.service.imageupload;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.haastika.dataservice.data.domain.DisplayProductImage;
import com.haastika.dataservice.data.domain.ImageUploadStatus;
import com.haastika.dataservice.data.domain.ImageUploadStatus.ImageUploadStatusMessages;
import com.haastika.dataservice.data.domain.category.CategoryImageUploadStatus;
import com.haastika.dataservice.data.domain.category.CategoryImages;
import com.haastika.dataservice.data.domain.product.ProductImages;
import com.haastika.dataservice.dataaccess.dao.productcategory.CategoryDAOImpl;
import com.haastika.dataservice.dataaccess.dao.productimage.ProductImageDAOImpl;
import com.haastika.dataservice.dataaccess.entity.Category;
import com.haastika.dataservice.dataaccess.entity.ProductImage;

@Transactional
@Service("imageUploadService")
public class ImageUploadServiceImpl implements ImageUploadService {

    @Autowired
    CategoryDAOImpl productCategoryDAO;

    @Autowired
    ProductImageDAOImpl ProductImageDAO;
        
//  private final String IMAGES_BASE_PATH = "/home/kalinnovs/";
//    private final String IMAGES_BASE_PATH = "/var/lib/tomcat7/webapps/ROOT/";
  private final String IMAGES_BASE_PATH = "/Users/devi_rath/Development/ecommerce/";
    private final String CATEGORY_IMAGES_BASE_PATH = "assets/images/categories/";
    private final String PRODUCT_IMAGES_BASE_PATH = "assets/images/products/";
    
    public DisplayProductImage uploadProductImages(final ProductImages productImages) {
        final DisplayProductImage displayProductImage = new DisplayProductImage();
        int maxCurrentFolderId = 1;
        if(null != productImages.getProductId()) {
        	List<ProductImage> productImageList = ProductImageDAO.getAllImagesForProduct(productImages.getProductId());
        	if(productImageList!=null && !productImageList.isEmpty()){
        		List<Integer> imageFolderIds = new ArrayList<Integer>();
        		for(ProductImage pi : productImageList){
        			int imageFolderId = Integer.parseInt(pi.getImageName().substring(5));
        			imageFolderIds.add(imageFolderId);
        		}
        		maxCurrentFolderId = Collections.max(imageFolderIds)+1;
        	}
        	
            ProductImage productImage;
            if(null != productImages.getProductImageId()){
            	productImage = ProductImageDAO.findByPrimaryKey(productImages.getProductImageId()); 
            } else {
            	productImage = new ProductImage();
            }
            if(null != productImage){
                final String productFolderName = productImages.getImageName()==null? "HSIMG"+maxCurrentFolderId : productImages.getImageName();
                final String productFolderPath = productImages.getProductId() + File.separator + productFolderName+ File.separator;
                
                final String extraLargeImageDir = PRODUCT_IMAGES_BASE_PATH + productFolderPath + "extraLarge";
                final String largeImageDir = PRODUCT_IMAGES_BASE_PATH + productFolderPath + "large";
                final String mediumImageDir = PRODUCT_IMAGES_BASE_PATH + productFolderPath + "medium";
                final String thumbImageDir = PRODUCT_IMAGES_BASE_PATH + productFolderPath + "thumb";
               
                displayProductImage.setExtraLargeImagePath(uploadMultiPartFileToLocation(IMAGES_BASE_PATH + extraLargeImageDir,
                		productImages.getExtraLargeImage(), "extraLarge.jpg").getUplodedImagePath());
                displayProductImage.setLargeImagePath(uploadMultiPartFileToLocation(IMAGES_BASE_PATH + largeImageDir,
                		productImages.getLargeImage(), "large.jpg").getUplodedImagePath());
                displayProductImage.setBaseImagePath(uploadMultiPartFileToLocation(IMAGES_BASE_PATH + mediumImageDir,
                		productImages.getMediumImage(), "medium.jpg").getUplodedImagePath());
                displayProductImage.setThumbImagePath(uploadMultiPartFileToLocation(IMAGES_BASE_PATH + thumbImageDir,
                		productImages.getThumbImage(), "thumb.jpg").getUplodedImagePath());
                
                // Save uploaded path to PRODUCT_IMAGE table with the product_id.
                
                boolean imageUploaded = false;

                if (null != displayProductImage.getExtraLargeImagePath()) {
                    productImage.setExtraLargeImagePath(displayProductImage.getExtraLargeImagePath());
                    imageUploaded = true;
                }
                if (null != displayProductImage.getLargeImagePath()) {
                    productImage.setLargeImagePath(displayProductImage.getLargeImagePath());
                    imageUploaded = true;
                }
                if (null != displayProductImage.getBaseImagePath()) {
                    productImage.setBaseImagePath(displayProductImage.getBaseImagePath());
                    imageUploaded = true;
                }
                if (null != displayProductImage.getThumbImagePath()) {
                    productImage.setThumbImagePath(displayProductImage.getThumbImagePath());
                    imageUploaded = true;
                }
                
                if(imageUploaded) {
                	productImage.setImageName(productFolderName);
                    productImage.setProductId(productImages.getProductId());
                    if (productImages.getProductImageId() == null) {
                        productImage.setCreationDate(new Date());
                    } else {
                        productImage.setProductImageId(productImages.getProductImageId());
                        productImage.setModificationDate(new Date());
                    }
                    ProductImageDAO.saveOrUpdate(productImage);
                    displayProductImage.setProductImageId(productImage.getProductImageId());
                    displayProductImage.setImageName(productFolderName);
                }
            }
        }
        	
        return displayProductImage;
    }

    public CategoryImageUploadStatus uploadCategoryImages(final CategoryImages categoryImages) {
        final CategoryImageUploadStatus uploadStatus = new CategoryImageUploadStatus();
        if(categoryImages.getCategoryId()!=null){
            final String categoryFolderName = "HSCH"+String.format("%03d", categoryImages.getCategoryId());

            final String tileImageDir = CATEGORY_IMAGES_BASE_PATH + categoryFolderName + File.separator + "tile";
            final String bannerImageDir = CATEGORY_IMAGES_BASE_PATH + categoryFolderName + File.separator + "banner";
            final String menuImageDir = CATEGORY_IMAGES_BASE_PATH + categoryFolderName + File.separator + "menu";

            // create multiple directories at one time

            uploadStatus.setBannerImageUploadStatus(uploadMultiPartFileToLocation(IMAGES_BASE_PATH + bannerImageDir,
                categoryImages.getCategoryBannerImage(), "banner.jpg"));
            uploadStatus.setMenuImageUploadStatus(uploadMultiPartFileToLocation(IMAGES_BASE_PATH + menuImageDir,
                categoryImages.getCategoryMenuImage(), "menu.jpg"));
            uploadStatus.setTileImageUploadStatus(uploadMultiPartFileToLocation(IMAGES_BASE_PATH + tileImageDir,
                categoryImages.getCategoryTileImage(), "tile.jpg"));

            final Category category = productCategoryDAO.findByPrimaryKey(categoryImages.getCategoryId());
            boolean imageUploaded = false;
            if(ImageUploadStatusMessages.UPLOADED_SUCCESSFULLY.equals(uploadStatus.getBannerImageUploadStatus().getUploadedImageStatus())){
            	category.setBannerImagePath(uploadStatus.getBannerImageUploadStatus().getUplodedImagePath());
                imageUploaded = true;
            }
            if(ImageUploadStatusMessages.UPLOADED_SUCCESSFULLY.equals(uploadStatus.getMenuImageUploadStatus().getUploadedImageStatus())){
            	category.setMenuImagePath(uploadStatus.getMenuImageUploadStatus().getUplodedImagePath());
                imageUploaded = true;
            }
            if(ImageUploadStatusMessages.UPLOADED_SUCCESSFULLY.equals(uploadStatus.getTileImageUploadStatus().getUploadedImageStatus())){
            	category.setTileImagePath(uploadStatus.getTileImageUploadStatus().getUplodedImagePath());
                imageUploaded = true;
            }
            if(imageUploaded){
                if(null != categoryImages.getCategoryId()){
                	category.setCategoryId(categoryImages.getCategoryId());
                    productCategoryDAO.saveOrUpdate(category);
                }
            }
        }
        return uploadStatus;
    }

    public ImageUploadStatus uploadMultiPartFileToLocation(final String uploadDirectory, final MultipartFile imageFile,
        final String imageFileName) {
        final ImageUploadStatus uploadStatus = new ImageUploadStatus();
        if (null!=imageFile && !imageFile.isEmpty()) {
            try {
                final File imageDir = new File(uploadDirectory);
                imageDir.mkdirs();
                // created the directories successfully if not directory would be present previously
                final String originalFileName = imageFile.getOriginalFilename();
                final byte[] bytes = imageFile.getBytes();
                final BufferedOutputStream buffStream = new BufferedOutputStream(new FileOutputStream(new File(
                    uploadDirectory + File.separator + imageFileName)));
                //FileUtils.copyInputStreamToFile(in, destination);
                buffStream.write(bytes);
                buffStream.close();
                System.out.println("You have successfully uploaded file Name " + originalFileName + "to location"
                    + uploadDirectory);
                uploadStatus.setUploadedImageStatus(ImageUploadStatusMessages.UPLOADED_SUCCESSFULLY);
                uploadStatus.setUplodedImagePath(uploadDirectory.substring(IMAGES_BASE_PATH.length()) + File.separator + imageFileName);

            } catch (Exception e) {
                e.printStackTrace();
                uploadStatus.setUploadedImageStatus(ImageUploadStatusMessages.UPLOAD_UNSUCCESSFULL);
                uploadStatus.setUplodedImagePath(null);
            }
        }
        return uploadStatus;
    }

}

package com.haastika.dataservice.service;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Currency;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.hibernate.JDBCException;
import org.hibernate.exception.ConstraintViolationException;
import org.hibernate.exception.JDBCConnectionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.haastika.dataservice.data.domain.BreadCrumb;
import com.haastika.dataservice.data.domain.DisplayProductImage;
import com.haastika.dataservice.data.domain.category.SaveStatus;
import com.haastika.dataservice.data.domain.product.DisplayProduct;
import com.haastika.dataservice.data.domain.product.DisplayProductDetails;
import com.haastika.dataservice.data.domain.product.DisplayProductSpecification;
import com.haastika.dataservice.data.domain.product.ProductAttributes;
import com.haastika.dataservice.data.domain.product.ProductAvailability;
import com.haastika.dataservice.data.domain.product.ProductMetaData;
import com.haastika.dataservice.data.domain.product.ProductMetaData.ProductCategory;
import com.haastika.dataservice.data.domain.product.ProductMetaData.ProductCurrency;
import com.haastika.dataservice.data.domain.product.ProductPriceOptions;
import com.haastika.dataservice.data.utility.CurrencyUtility;
import com.haastika.dataservice.data.utility.DeleteImageFromPhysicalPath;
import com.haastika.dataservice.dataaccess.dao.country.CurrencyDAOImpl;
import com.haastika.dataservice.dataaccess.dao.product.ProductDAOImpl;
import com.haastika.dataservice.dataaccess.dao.productcategory.CategoryDAOImpl;
import com.haastika.dataservice.dataaccess.dao.productimage.ProductImageDAOImpl;
import com.haastika.dataservice.dataaccess.dao.productprice.ProductPriceDAOImpl;
import com.haastika.dataservice.dataaccess.dao.productspecification.ProductSpecificationDAOImpl;
import com.haastika.dataservice.dataaccess.entity.Category;
import com.haastika.dataservice.dataaccess.entity.Product;
import com.haastika.dataservice.dataaccess.entity.ProductImage;
import com.haastika.dataservice.dataaccess.entity.ProductPrice;
import com.haastika.dataservice.dataaccess.entity.ProductPrice.ProductPricePK;
import com.haastika.dataservice.dataaccess.entity.ProductSpecification;

@Transactional
@Service("productDataService")
public class ProductDataServiceImpl implements ProductDataService {

    @Autowired
    CategoryDAOImpl productCategoryDao;

    @Autowired
    ProductPriceDAOImpl productPriceDao;

    @Autowired
    CurrencyDAOImpl currencyDAO;

    @Autowired
    ProductImageDAOImpl productImageDao;

    @Autowired
    ProductDAOImpl productDAO;
    
    @Autowired
    ProductSpecificationDAOImpl productSpecificationDAO;

    @Autowired
    CurrencyUtility currencyUtil;

    @Override
    public DisplayProduct getDisplayProduct(final Product product) {
        final DisplayProduct displayProduct = new DisplayProduct();

        if (product != null) {
            if (product.getProductPrice() != null) {
                final BigDecimal productPrice = product.getProductPrice().getPrice();
                final String currencyCode = product.getProductPrice().getCurrency().getCurrencyCode();
                displayProduct.setProductPrice(productPrice);
                displayProduct.setProductCurrency(currencyCode);
            }
            // Get the product availability info
            final String availability = product.isEnabled() ? ProductAvailability.INSTOCK.getStatusDescription()
                : ProductAvailability.OUTOFSTOCK.getStatusDescription();
            // End of setting the product availability info
            displayProduct.setAverageProductRating(new BigDecimal(3));
            displayProduct.setProductName(product.getProductName());

            // If product doesn't have a description use its category description.
            final String productDesc = product.getProductDescription() != null ? product.getProductDescription()
                : product.getCategory().getDescription();
            displayProduct.setProductDescription(productDesc);
            final List<ProductPriceOptions> priceOptionsList = getPriceOptionForProduct(product);
            displayProduct.setProductPriceOptions(priceOptionsList);
            displayProduct.setProductImageGallery(getDisplayProductGallery(product.getProductId()));

            displayProduct.setProductAvailablility(availability);
            displayProduct.setProductId(product.getProductId());
            displayProduct.setProductPartNumber(product.getProductPartNumber());
            final String productDetailsURL = "/product/" + "HSPP"+String.format("%03d", product.getProductId());
            displayProduct.setProductDetailsURL(productDetailsURL);
        }

        return displayProduct;
    }

    @Override
    public DisplayProductImage getDisplayProductImage(final ProductImage productImage) {
        final DisplayProductImage displayProductImage = new DisplayProductImage();

        if (productImage != null) {
            displayProductImage.setBaseImagePath(productImage.getBaseImagePath());
            displayProductImage.setLargeImagePath(productImage.getLargeImagePath());
            displayProductImage.setExtraLargeImagePath(productImage.getExtraLargeImagePath());
            displayProductImage.setThumbImagePath(productImage.getThumbImagePath());
            displayProductImage.setProductImageId(productImage.getProductImageId());
            displayProductImage.setImageName(productImage.getImageName());
            displayProductImage.setProductImageId(productImage.getProductImageId());
        }

        return displayProductImage;
    }

    @Override
    public DisplayProductSpecification getDisplayProductSpecification(final ProductSpecification productSpecification) {
        final DisplayProductSpecification displayProductSpecification = new DisplayProductSpecification();

        if (productSpecification != null) {
            displayProductSpecification.setDepth(productSpecification.getDepth());
            displayProductSpecification.setHeight(productSpecification.getHeight());
            displayProductSpecification.setWidth(productSpecification.getWidth());
            displayProductSpecification.setWeight(productSpecification.getWeight());
            displayProductSpecification.setUsageDetails(productSpecification.getUsageDetails());
            displayProductSpecification.setProductSpecificationId(productSpecification.getProductSpecificationId());
        }
        return displayProductSpecification;
    }

    @Override
    public DisplayProduct getDisplayProduct(final Integer productId) {
        final Product product = productDAO.findByPrimaryKey(productId);
        return getDisplayProduct(product);
    }

    @Override
    public DisplayProductDetails getDisplayProductDetails(final Integer productId) {
        final Product product = productDAO.findByPrimaryKey(productId);
        return getDisplayProductDetails(product);
    }

    public List<DisplayProductImage> getDisplayProductGallery(final Integer productId) {
        List<DisplayProductImage> productGallery = new ArrayList<DisplayProductImage>();
        final List<ProductImage> imageList = productImageDao.getAllImagesForProduct(productId);
        for (final ProductImage image : imageList) {
            productGallery.add(getDisplayProductImage(image));
        }

        return productGallery;
    }

    public List<ProductPriceOptions> getPriceOptionForProduct(final Product product) {
        final List<ProductPrice> priceList = productPriceDao.getAllPriceDataForProduct(product.getProductId());
        final List<ProductPriceOptions> priceOptionsList = new ArrayList<ProductPriceOptions>();
        for (final ProductPrice price : priceList) {
            final ProductPriceOptions priceOption = new ProductPriceOptions();
            priceOption.setCountryName(price.getCurrency().getCountryName());
            priceOption.setPrice(price.getPrice());
            priceOption.setCurrencyCode(price.getCurrency().getCurrencyCode());
            final Locale locale = currencyUtil.getLocaleForCountry(price.getCurrency().getCountryCode());
            final Currency currency = Currency.getInstance(locale);
            priceOption.setCurrencySymbol(currency.getSymbol());
            priceOption.setCurrencyId(price.getCurrency().getCurrencyId());
            priceOptionsList.add(priceOption);
        }
        return priceOptionsList;
    }

    public DisplayProductDetails getDisplayProductDetails(final Product product) {

        // Create ProductDetails JSON for specific product if we found a not null product from DB.
        final DisplayProductDetails productDetails = new DisplayProductDetails();
        if (product != null) {
            // TODO Get product rating details from DB
        	List<BreadCrumb> breadcrumbList = new LinkedList<BreadCrumb>();
        	
        	BreadCrumb breadcrumb1 = new BreadCrumb();
        	breadcrumb1.setDisplayText(product.getCategory().getParentCategory().getCategoryName());
        	breadcrumb1.setLinkUrl("category/"+product.getCategory().getParentCategory().getCategoryPartNumber());
        	
        	BreadCrumb breadcrumb2 = new BreadCrumb();
        	breadcrumb2.setDisplayText(product.getCategory().getCategoryName());
        	breadcrumb2.setLinkUrl("category/"+product.getCategory().getCategoryPartNumber());
        	
        	breadcrumbList.add(breadcrumb1);
        	breadcrumbList.add(breadcrumb2);
        	
        	productDetails.setBreadcrumb(breadcrumbList);
        	product.getCategory().getParentCategory().getCategoryId();

            productDetails.setAverageProductRating(new BigDecimal(3));
            productDetails.setProductName(product.getProductName());
            productDetails.setProductId(product.getProductId());
            productDetails.setProductPartNumber(product.getProductPartNumber());
            // If product doesn't have a description use its category description.
            final String productDesc = (product.getProductDescription() != null && !product.getProductDescription().isEmpty()) ? product.getProductDescription()
                : product.getCategory().getDescription();
            productDetails.setProductDescription(productDesc);

            // Set the product image and image gallery details
            productDetails.setProductImageGallery(getDisplayProductGallery(product.getProductId()));

            // End of setting the product image gallery options .

            BigDecimal productPrice = null;
            String currencyCode = null;
            if (product.getProductPrice() != null) {
                productPrice = product.getProductPrice().getPrice();
                currencyCode = product.getProductPrice().getCurrency().getCurrencyCode();
            }
            productDetails.setProductPrice(productPrice);
            productDetails.setProductCurrency(currencyCode);
            // Set the product price options in other currencies .
            final List<ProductPriceOptions> priceOptionsList = getPriceOptionForProduct(product);
            productDetails.setProductPriceOptions(priceOptionsList);
            // End of setting the product price options in other currencies

            // Get the product availability info
            final String availability = product.isEnabled() ? ProductAvailability.INSTOCK.getStatusDescription()
                : ProductAvailability.OUTOFSTOCK.getStatusDescription();
            // End of setting the product availability info
            productDetails.setProductAvailablility(availability);

            // Get the product specifications
            productDetails.setProductSpecification(getDisplayProductSpecification(product.getProductSpecification()));

        }
        return productDetails;
    }

    @Override
    public List<ProductCategory> getAllAvailableProductCategoriesForMetaData() {
        // Get all available product categories which products can change to
        final List<Category> avaliableCategories = productCategoryDao.fetchAllAvailableCategoriesForProduct();
        final List<ProductCategory> availableProductCategories = new ArrayList<ProductCategory>();
        for (final Category availableCategory : avaliableCategories) {
            final ProductCategory category = new ProductCategory();
            category.setCategoryId(availableCategory.getCategoryId());
            category.setCategoryName(availableCategory.getCategoryName());
            category.setCategoryPartNumber(availableCategory.getCategoryPartNumber());
            availableProductCategories.add(category);
        }
        return availableProductCategories;
    }

    public List<ProductCurrency> getAllAvailableProductCurrencies() {
        final List<ProductCurrency> availableCurrencies = new ArrayList<ProductCurrency>();
        final Map<Integer, String> supportedCurrencyMap = currencyDAO.getSupportedCurrencyCodes();
        for (final Integer currencyId : supportedCurrencyMap.keySet()) {
            final ProductCurrency availableProdCurrency = new ProductCurrency();
            availableProdCurrency.setProductCurrencyCode(supportedCurrencyMap.get(currencyId));
            availableProdCurrency.setProductCurrencyId(currencyId);
            availableCurrencies.add(availableProdCurrency);
        }
        return availableCurrencies;
    }

    @Override
    public ProductAttributes getProductAttributes(final Product product) {
        final ProductAttributes productAttributes = new ProductAttributes();

        productAttributes.setEnabled(product.isEnabled());
        productAttributes.setProductId(product.getProductId());
        final String productName = product.getProductName()==null?product.getProductPartNumber():product.getProductName();
        productAttributes.setProductName(productName);
        productAttributes.setProductDescription(product.getProductDescription());
        productAttributes.setProductName(product.getProductName());
        // Set category of the product to be edited .
        final ProductCategory productCategory = new ProductCategory();
        productCategory.setCategoryId(product.getCategory().getCategoryId());
        productCategory.setCategoryName(product.getCategory().getCategoryName());
        productCategory.setCategoryPartNumber(product.getCategory().getCategoryPartNumber());
        productAttributes.setProductCategory(productCategory);
        // Set product image options
        productAttributes.setProductImageGallery(getDisplayProductGallery(product.getProductId()));
        // Get the product availability info
        final String availability = product.isEnabled() ? ProductAvailability.INSTOCK.getStatusDescription()
            : ProductAvailability.OUTOFSTOCK.getStatusDescription();
        productAttributes.setProductAvailablility(availability);
        // Set default product currencies info
        // final ProductPrice price = product.getProductPrice();
        ProductCurrency productCurrency = new ProductCurrency();
        try{
	        productCurrency.setProductCurrencyCode(product.getProductPrice().getCurrency().getCurrencyCode());
	        productCurrency.setProductCurrencyId(product.getProductPrice().getCurrency().getCurrencyId());
        } catch(Exception e){
        	
        }
        productAttributes.setProductCurrency(productCurrency);
        final String productDetailsURL = "/product/" + "HSPP"+String.format("%03d", product.getProductId());
        productAttributes.setProductDetailsURL(productDetailsURL);

        // Set the product price options in other currencies .
        final List<ProductPriceOptions> priceOptionsList = getPriceOptionForProduct(product);
        productAttributes.setPriceOptions(priceOptionsList);
        // End of setting the product price options in other currencies
        // getDisplayProductSpecification
        productAttributes.setProductSpecification(getDisplayProductSpecification(product.getProductSpecification()));
        // Set product specifications

        return productAttributes;
    }

    @Override
    public List<ProductAttributes> getProductAttributes(final List<Product> productList) {
        final List<ProductAttributes> productAttributeList = new ArrayList<ProductAttributes>();
        for (final Product product : productList) {
        	productAttributeList.add(getProductAttributes(product));
        }
        return productAttributeList;

    }

    @Override
    public ProductMetaData getProductAdminPageMetaData() {
        final ProductMetaData productMetaData = new ProductMetaData();
        productMetaData.setAvailableCurrencies(getAllAvailableProductCurrencies());
        return productMetaData;
    }

    public SaveStatus saveProductData(final ProductAttributes productAttributes) {
    	SaveStatus st = new SaveStatus();
        st.setStatusMessage("Fail");
        st.setOperationStatus(false);
        if (productAttributes != null && productAttributes.getProductCategory() !=null && productAttributes.getProductCategory().getCategoryId()!=null) {
            final Product product = new Product();
            if(productAttributes.getEnabled()!=null) {
                product.setEnabled(productAttributes.getEnabled());
            }
            if(productAttributes.getProductDescription()!=null)
            product.setProductDescription(productAttributes.getProductDescription());
            if(productAttributes.getProductName()!=null)
            product.setProductName(productAttributes.getProductName());
            if(productAttributes.getProductId()!=null){
                product.setProductId(productAttributes.getProductId());
            }
            product.setCategoryId(productAttributes.getProductCategory().getCategoryId());
            product.setDefaultCurrencyId(1);
            final ProductCategory category = productAttributes.getProductCategory();

            if (category != null) {
                final Category productCategory = productCategoryDao.findByPrimaryKey(category.getCategoryId());
                productCategory.setCategoryId(productAttributes.getProductCategory().getCategoryId());
                product.setCategory(productCategory);
            }
            final ProductSpecification productSpecification = new ProductSpecification();

            if ((productAttributes.getProductSpecification() != null)) {
                productSpecification.setProductSpecificationId(productAttributes.getProductSpecification()
                    .getProductSpecificationId());
                productSpecification.setDepth(productAttributes.getProductSpecification().getDepth());
                productSpecification.setWidth(productAttributes.getProductSpecification().getWidth());
                productSpecification.setUsageDetails(productAttributes.getProductSpecification().getUsageDetails());
                productSpecification.setHeight(productAttributes.getProductSpecification().getHeight());
                productSpecification.setWeight(productAttributes.getProductSpecification().getWeight());
            }
            product.setProductSpecification(productSpecification);
            try {
                productDAO.saveOrUpdate(product);
                final List<ProductPriceOptions> priceOptions = productAttributes.getPriceOptions();
                final List<ProductPrice> priceDataList = new ArrayList<ProductPrice>();

                if ((priceOptions != null)) {
                    for (final ProductPriceOptions price : priceOptions) {
                        final ProductPrice priceData = new ProductPrice();
                        priceData.setModificationDate(new Date());
                        final ProductPricePK productPricePK = new ProductPricePK();
                        if(productAttributes.getProductId()==null){
                            productPricePK.setProductId(product.getProductId());
                        } else {
                            productPricePK.setProductId(productAttributes.getProductId());
                        }
                        productPricePK.setCurrencyId(price.getCurrencyId());
                        priceData.setProductPricePk(productPricePK);
                        priceData.setPrice(price.getPrice());
                        priceDataList.add(priceData);
                    }
                }
                productPriceDao.saveOrUpdate(priceDataList);
                st.setStatusMessage("Success");
                st.setOperationStatus(true);
                st.setId(product.getProductId());

            } catch (ConstraintViolationException e) {
                SQLException cause = (SQLException) e.getCause();
                // evaluate cause and find out what was the problem
                st.setStatusMessage("Fail");
                st.setOperationStatus(false);
                System.out.println(cause.getMessage());
            } catch (JDBCConnectionException e) {
                SQLException cause = (SQLException) e.getCause();
                // evaluate cause and find out what was the problem
                st.setStatusMessage("Fail");
                st.setOperationStatus(false);
                System.out.println(cause.getMessage());
            } catch (JDBCException e) {
                SQLException cause = (SQLException) e.getCause();
                // evaluate cause and find out what was the problem
                st.setStatusMessage("Fail");
                st.setOperationStatus(false);
                System.out.println(cause.getMessage());
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
                st.setStatusMessage("Fail");
                st.setOperationStatus(false);
            }
        }

        return st;
    }

    @Override
    public SaveStatus deleteProductData(final Integer productId) {
        SaveStatus st = new SaveStatus();
        try {
        	final List<ProductPrice> prices = productPriceDao.getAllPriceDataForProduct(productId);
        	final Product product = productDAO.findByPrimaryKey(productId);
        	productDAO.remove(product);
        	for(ProductPrice price : prices){
            	productPriceDao.remove(price);
        	}
            final List<ProductImage> imageList = productImageDao.getAllImagesForProduct(productId);
            if(null != imageList && !imageList.isEmpty()){
                for (final ProductImage image : imageList) {
                	productImageDao.remove(image);
                }
            }
            st.setStatusMessage("Success");
            st.setOperationStatus(true);
        } catch (Exception e) {
            e.printStackTrace();
            st.setStatusMessage("Fail");
            st.setOperationStatus(false);
        }
        return st;
    }

	@Override
	public SaveStatus deleteProductImageData(Integer productImageId) {
        SaveStatus st = new SaveStatus();
        try {
        	if(null != productImageId){
            	final ProductImage pi = productImageDao.findByPrimaryKey(productImageId);
            	
            	String imagePath = pi.getBaseImagePath();
            	if(null == imagePath || imagePath.isEmpty()){
            		imagePath = pi.getExtraLargeImagePath();
            	}
            	if(null == imagePath || imagePath.isEmpty()){
            		imagePath = pi.getLargeImagePath();
            	}
            	if(null == imagePath || imagePath.isEmpty()){
            		imagePath = pi.getThumbImagePath();
            	}
            	if(null != imagePath && !imagePath.isEmpty()){
            		DeleteImageFromPhysicalPath.deletePhysicalPathImageData(imagePath);
            	}
            	productImageDao.remove(pi);
                st.setStatusMessage("Success");
                st.setOperationStatus(true);
                st.setId(productImageId);
        	}
        } catch (Exception e) {
            e.printStackTrace();
            st.setStatusMessage("Fail");
            st.setOperationStatus(false);
            st.setId(productImageId);
        }
		return st;
	}
}

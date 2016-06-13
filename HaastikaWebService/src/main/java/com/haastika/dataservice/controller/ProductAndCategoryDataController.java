package com.haastika.dataservice.controller;

import net.spy.memcached.MemcachedClient;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.haastika.dataservice.data.domain.PageNavigation;
import com.haastika.dataservice.data.domain.category.DisplayCategoryDetails;
import com.haastika.dataservice.data.domain.pageDetails.CategoryPageDetails;
import com.haastika.dataservice.data.domain.pageDetails.ProductPageDetails;
import com.haastika.dataservice.data.domain.pageDetails.VisitorsCounts;
import com.haastika.dataservice.data.domain.product.DisplayProductDetails;
import com.haastika.dataservice.data.utility.MemcachedClientWrapper;
import com.haastika.dataservice.service.CategoryDataService;
import com.haastika.dataservice.service.ProductDataService;
import com.haastika.dataservice.service.imageupload.ImageUploadService;
import com.haastika.dataservice.service.websiteactivity.WebsiteActivityTrackerService;
import com.haastika.dataservice.websiteactivity.Activity;

/**
 * Handles requests for the application home page.
 */

@Controller
public class ProductAndCategoryDataController {

    private static final Logger logger = LoggerFactory.getLogger(ProductAndCategoryDataController.class);

    @Autowired
    private ProductDataService productDataService;

    @Autowired
    private CategoryDataService categoryDataService;

    @Autowired
    private ImageUploadService imageUploadService;
    
    @Autowired
    private WebsiteActivityTrackerService websiteActivityTrackerService;

    @RequestMapping(value = "/product/{productId}", method = RequestMethod.GET)
    @ResponseBody
    @Activity(urlPattern = "productDetails")
    public ProductPageDetails getProductDetails(@PathVariable("productId") String productId) {
        final PageNavigation navigation = categoryDataService.buildNavigationMenu(null);
        final Integer prodId = Integer.parseInt(productId.substring(4));
        final DisplayProductDetails productDetails = productDataService.getDisplayProductDetails(prodId);
        final ProductPageDetails productPageDetails = new ProductPageDetails(productDetails, navigation);
        return productPageDetails;
    }

	@RequestMapping(value = "/category/{categoryId}", method = RequestMethod.GET)
    @ResponseBody
    @Activity(urlPattern = "categoryDetails")
    public CategoryPageDetails getCategoryDetails(@PathVariable("categoryId") String categoryId) {
    	MemcachedClient c;
        final Integer catId = Integer.parseInt(categoryId.substring(4));
		try {
			c = MemcachedClientWrapper.getInstance();
	    	Object cachedCategoryPageDetails = c.get("categoryDetails_"+categoryId);
	    	if(null==cachedCategoryPageDetails){
	            final PageNavigation navigation = categoryDataService.buildNavigationMenu(catId);
	            final DisplayCategoryDetails categoryDetails = categoryDataService.getDisplayCategoryDetails(catId);
	            final CategoryPageDetails categoryPageDetails = new CategoryPageDetails(categoryDetails, navigation);
	        	c.set("categoryDetails_"+categoryId, 3600, categoryPageDetails);
	        	return categoryPageDetails;
	    	}
	        return (CategoryPageDetails) cachedCategoryPageDetails;
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
            final PageNavigation navigation = categoryDataService.buildNavigationMenu(catId);
            final DisplayCategoryDetails categoryDetails = categoryDataService.getDisplayCategoryDetails(catId);
            final CategoryPageDetails categoryPageDetails = new CategoryPageDetails(categoryDetails, navigation);
	        return categoryPageDetails;
		}
    }

    @RequestMapping(value = "/exchangeRates", method = RequestMethod.GET)
    @ResponseBody
    public void getExchangeRates() {
        // return productDataService.getExchangeRates();
    }

	@RequestMapping(value = "/visitors", method = RequestMethod.GET)
    @ResponseBody
    public VisitorsCounts getVisitors() {
		VisitorsCounts vc = new VisitorsCounts();
		vc.setTotalUniqueVisitorsCount(websiteActivityTrackerService.getTotalUniqueVisitorsCount());
		vc.setTotalVisitorsCount(websiteActivityTrackerService.getTotalVisitorsCount());
		return vc;
	}
}
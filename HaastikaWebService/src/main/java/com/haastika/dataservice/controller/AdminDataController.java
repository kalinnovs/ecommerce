package com.haastika.dataservice.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.haastika.dataservice.data.domain.AuthenticateResponse;
import com.haastika.dataservice.data.domain.DisplayProductImage;
import com.haastika.dataservice.data.domain.LoginDetail;
import com.haastika.dataservice.data.domain.SubscriberDetails;
import com.haastika.dataservice.data.domain.SubscriptionResponse;
import com.haastika.dataservice.data.domain.category.CategoryAttributes;
import com.haastika.dataservice.data.domain.category.CategoryImageUploadStatus;
import com.haastika.dataservice.data.domain.category.CategoryImages;
import com.haastika.dataservice.data.domain.category.SaveStatus;
import com.haastika.dataservice.data.domain.pageDetails.AdminPageDetails;
import com.haastika.dataservice.data.domain.pageDetails.DisplayAboutUs;
import com.haastika.dataservice.data.domain.product.ProductAttributes;
import com.haastika.dataservice.data.domain.product.ProductImages;
import com.haastika.dataservice.dataaccess.entity.UserSubscription;
import com.haastika.dataservice.service.CategoryDataService;
import com.haastika.dataservice.service.ProductDataService;
import com.haastika.dataservice.service.UserDataService;
import com.haastika.dataservice.service.imageupload.ImageUploadService;

/**
 * 
 * 
 * Handles requests for the application Admin page.
 * @author devi
 *
 */

@Controller
public class AdminDataController {

    @Autowired 
    private CategoryDataService categoryDataService;

    @Autowired 
    private ProductDataService productDataService;
    
    @Autowired 
    private UserDataService userDataService;

    @Autowired
    private ImageUploadService imageUploadService;

    @RequestMapping(value = "/admin/category", method = RequestMethod.GET)
    @ResponseBody
    public AdminPageDetails getCategoryProductHierarchyForAdmin() {
//    	Long activeTimeStamp = new Date(System.currentTimeMillis()+15*60*1000).getTime();
//    	Long receivedTimeStamp = Long.parseLong(timeStamp);
//    	if(activeTimeStamp>=receivedTimeStamp){
            return categoryDataService.getCategoryProductHierarchyForAdmin();
//    	} else {
//    		return null;
//    	}
    	
    }

    @Consumes("multipart/form-data")
    @Produces("application/json")
    @RequestMapping(method = RequestMethod.POST, value = "admin/saveCategoryImages")
    @ResponseBody
    public CategoryImageUploadStatus uploadCategoryImages(
        @ModelAttribute("categoryImagesForm") CategoryImages categoryImages) {
        final CategoryImageUploadStatus status = imageUploadService.uploadCategoryImages(categoryImages);
        return status;
    }

    @Consumes("multipart/form-data")
    @Produces("application/json")
    @RequestMapping(method = RequestMethod.POST, value = "admin/saveProductImages")
    @ResponseBody
    public DisplayProductImage uploadProductImages(@ModelAttribute("productImagesForm") ProductImages productImages) {
        final DisplayProductImage status = imageUploadService.uploadProductImages(productImages);
        return status;
    }

    @Consumes("multipart/form-data")
    @Produces("application/json")
    @RequestMapping(method = RequestMethod.POST, value = "admin/saveMultipleProductImages")
    @ResponseBody
    public List<DisplayProductImage> uploadProductImages(
        @ModelAttribute("productImagesForm") ProductImages[] productImagesList) {
        List<DisplayProductImage> uploadStatusList = new ArrayList<DisplayProductImage>();
        for (final ProductImages productImages : productImagesList) {
            final DisplayProductImage status = imageUploadService.uploadProductImages(productImages);
            uploadStatusList.add(status);
        }
        return uploadStatusList;
    }

    @RequestMapping(value = "/admin/saveCategory", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    @ResponseBody
    public SaveStatus saveCategoryData(@RequestBody final CategoryAttributes categoryAttributes) {
        return categoryDataService.saveCategoryData(categoryAttributes);
    }

    @RequestMapping(value = "/admin/saveProduct", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    @ResponseBody
    public SaveStatus saveProductData(@RequestBody final ProductAttributes productAttributes) {
        return productDataService.saveProductData(productAttributes);
    }

    @RequestMapping(value = "/admin/deleteProduct/{productId}", method = RequestMethod.GET)
    @ResponseBody
    public SaveStatus deleteProductData(@PathVariable("productId") Integer productId) {
        return productDataService.deleteProductData(productId);
    }

    @RequestMapping(value = "/admin/deleteProductImage/{productImageId}", method = RequestMethod.GET)
    @ResponseBody
    public SaveStatus deleteProductImageData(@PathVariable("productImageId") Integer productImageId) {
        return productDataService.deleteProductImageData(productImageId);
    }

    @RequestMapping(value = "/admin/deleteCategory/{categoryId}", method = RequestMethod.GET)
    @ResponseBody
    public SaveStatus deleteCategoryData(@PathVariable("categoryId") Integer categoryId) {
        return categoryDataService.deleteCategoryData(categoryId);
    }
    // Update About Us page content.
    
    @RequestMapping(value = "/admin/updateaboutus", method = RequestMethod.POST, headers = {"Content-type=application/json"})
	@ResponseBody
	public String updateAboutUs(@RequestBody DisplayAboutUs aboutUs) {
		return null;
    	//return categoryDataService.updateAboutUs(aboutUs);
	}
    
    @RequestMapping(value="/checklogin", method = RequestMethod.POST, headers = {"Content-type=application/json"})
    @ResponseBody
	public AuthenticateResponse CheckLogin(@RequestBody LoginDetail logindetail) throws IOException{		
    	return userDataService.authenticateUser(logindetail);
	}
        
    @RequestMapping(value="/admin/subscribers", method = RequestMethod.GET)
    @ResponseBody
	public List<UserSubscription> getSubscribers() throws IOException{		
    	return userDataService.getSubscribers();
	}
    
    @RequestMapping(value="/admin/updateSubscriber", method = RequestMethod.POST, headers = {"Content-type=application/json"})
    @ResponseBody
    public SubscriptionResponse updateSubscriber(@RequestBody SubscriberDetails subscriberDetails){
    	return userDataService.updateSubscriber(subscriberDetails);
    }
    
    @RequestMapping(value = "/saveNewUserSubscription", method = RequestMethod.POST, headers = {"Content-type=application/json"})
    public @ResponseBody final SubscriptionResponse addSubscriber(@RequestBody final SubscriberDetails subscriberDetails) {
       return  userDataService.addUserSubscription(subscriberDetails);
    }

}

package com.haastika.dataservice.controller;

import net.spy.memcached.MemcachedClient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.haastika.dataservice.data.domain.pageDetails.HomePageDetails;
import com.haastika.dataservice.data.utility.MemcachedClientWrapper;
import com.haastika.dataservice.service.CategoryDataService;
import com.haastika.dataservice.websiteactivity.Activity;

/**
 * Handles requests for the application home page.
 */

@Controller
public class HomePageController {

    @Autowired 
    private CategoryDataService categoryDataService;

    @RequestMapping(value = "/home", method = RequestMethod.GET)
    @ResponseBody
    @Activity(urlPattern = "homeDetails")
    public HomePageDetails getDetailsForHome() {
    	MemcachedClient c;
		try {
			c = MemcachedClientWrapper.getInstance();
	    	Object cachedHomePageDetails=c.get("homeDetails");
	    	if(null==cachedHomePageDetails){
	        	HomePageDetails hpd = categoryDataService.getTilesAndNavigationDetailsForHome();
	        	c.set("homeDetails", 3600, hpd);
	        	return hpd;
	    	}
	        return (HomePageDetails) c.get("homeDetails");
		} catch (Exception e) {
			e.printStackTrace();
	        return categoryDataService.getTilesAndNavigationDetailsForHome();
		}
    }
}

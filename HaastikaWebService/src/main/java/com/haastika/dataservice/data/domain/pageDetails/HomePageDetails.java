package com.haastika.dataservice.data.domain.pageDetails;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.haastika.dataservice.data.domain.PageNavigation;
import com.haastika.dataservice.data.domain.tileManagement.PageLayoutDetails;

@JsonInclude(Include.NON_NULL)
public class HomePageDetails extends PageDetails implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = -6154419770636736910L;
	private PageLayoutDetails pageLayoutDetails;

    public HomePageDetails(PageLayoutDetails pageLayoutDetails, PageNavigation pageNavigation) {
        super();
        this.setPageLayoutDetails(pageLayoutDetails);
        this.setPageNavigation(pageNavigation);
    }

    public PageLayoutDetails getPageLayoutDetails() {
        return pageLayoutDetails;
    }

    public void setPageLayoutDetails(PageLayoutDetails pageLayoutDetails) {
        this.pageLayoutDetails = pageLayoutDetails;
    }





}

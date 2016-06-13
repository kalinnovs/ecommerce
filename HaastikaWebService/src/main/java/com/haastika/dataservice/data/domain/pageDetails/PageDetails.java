package com.haastika.dataservice.data.domain.pageDetails;

import java.io.Serializable;

import com.haastika.dataservice.data.domain.PageNavigation;


public class PageDetails implements Serializable{
    
    /**
	 * 
	 */
	private static final long serialVersionUID = -978808832642103523L;
	
	private PageNavigation pageNavigation;

    public PageNavigation getPageNavigation() {
        return pageNavigation;
    }

    public void setPageNavigation(PageNavigation pageNavigation) {
        this.pageNavigation = pageNavigation;
    }

}

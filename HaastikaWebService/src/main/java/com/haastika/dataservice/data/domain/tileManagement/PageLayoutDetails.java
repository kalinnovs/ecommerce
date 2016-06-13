package com.haastika.dataservice.data.domain.tileManagement;

import java.io.Serializable;


public class PageLayoutDetails implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = 6432597835699090807L;
    private String pageName;
    private PageLayoutDetail layouts;
    
    public String getPageName() {
        return pageName;
    }
    public void setPageName(String pageName) {
        this.pageName = pageName;
    }
    public PageLayoutDetail getLayouts() {
        return layouts;
    }
    public void setLayouts(PageLayoutDetail layouts) {
        this.layouts = layouts;
    }

}

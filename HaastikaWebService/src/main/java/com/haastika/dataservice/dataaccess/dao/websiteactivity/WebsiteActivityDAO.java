package com.haastika.dataservice.dataaccess.dao.websiteactivity;

import com.haastika.dataservice.dataaccess.entity.WebsiteActivity;



public interface WebsiteActivityDAO {
    public WebsiteActivity findActivityForIP(final String ipAddress);
    public WebsiteActivity findActivityForURLPattern(final String urlPattern);
    public WebsiteActivity findActivityForIPAndPattern(final String ipAddress,final String urlPattern);
    public Integer getTotalWebsiteVisitorsCount();
    public Integer getTotalUniqueVisitorsCount();
}

package com.haastika.dataservice.service.websiteactivity;

import java.util.Map;


public interface WebsiteActivityTrackerService {
    public Map<String,Integer> getIpWiseCountofVistors();
    public Map<String,Integer> getPageWiseCountofVistors();
    public void trackWebsiteActivity();
    public void trackWebsiteActivity(final String urlPattern);
    public Integer getTotalUniqueVisitorsCount();
    public Integer getTotalVisitorsCount();
    public Integer getTotalUniqueVisitorsCountByDate();  
    

}

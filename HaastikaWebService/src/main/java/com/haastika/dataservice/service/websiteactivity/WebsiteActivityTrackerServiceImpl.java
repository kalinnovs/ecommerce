package com.haastika.dataservice.service.websiteactivity;

import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.haastika.dataservice.dataaccess.dao.websiteactivity.WebsiteActivityDAOImpl;
import com.haastika.dataservice.dataaccess.entity.WebsiteActivity;

@Transactional
@Service("websiteActivityTrackerService")
public class WebsiteActivityTrackerServiceImpl implements WebsiteActivityTrackerService {

    @Autowired(required = true)
    private HttpServletRequest httpServletRequest;
    @Autowired
    private WebsiteActivityDAOImpl websiteActivityDAO;

    @Override
    public Map<String, Integer> getIpWiseCountofVistors() {

        final String remoteIp = httpServletRequest.getRemoteAddr();
        // final String ipAddress = httpServletRequest.getHeader("X-FORWARDED-FOR");
        return null;
    }

    @Override
    public void trackWebsiteActivity() {
        final String remoteIp = httpServletRequest.getRemoteAddr();
        WebsiteActivity websiteActivity = websiteActivityDAO.findActivityForIP(remoteIp);
        if (websiteActivity != null) {
            final int currentHitCount = websiteActivity.getHitCount();
            websiteActivity.setLastAccessedDate(new Date());
            websiteActivity.setHitCount(currentHitCount + 1);
        } else {
            websiteActivity = new WebsiteActivity();
            websiteActivity.setLastAccessedDate(new Date());
            websiteActivity.setHitCount(1);
            websiteActivity.setIpAddress(remoteIp);
        }
        websiteActivityDAO.saveOrUpdate(websiteActivity);
    }

    public void trackWebsiteActivity(final String urlPattern) {
        final String remoteIp = httpServletRequest.getRemoteAddr();
        WebsiteActivity websiteActivity = websiteActivityDAO.findActivityForIPAndPattern(remoteIp, urlPattern);
        if (websiteActivity != null) {
            final int currentHitCount = websiteActivity.getHitCount();
            websiteActivity.setHitCount(currentHitCount + 1);
        } else {
            websiteActivity = new WebsiteActivity();
            websiteActivity.setHitCount(1);
        }
        websiteActivity.setUrlPatternAccessed(urlPattern);
        websiteActivity.setIpAddress(remoteIp);
        websiteActivity.setLastAccessedDate(new Date());
        websiteActivityDAO.saveOrUpdate(websiteActivity);
    }

    @Override
    public Integer getTotalUniqueVisitorsCount() {
        return websiteActivityDAO.getTotalUniqueVisitorsCount();
    }

    @Override
    public Integer getTotalUniqueVisitorsCountByDate() {
        return null;
    }

    @Override
    public Map<String, Integer> getPageWiseCountofVistors() {
        return null;
    }

    @Override
    public Integer getTotalVisitorsCount() {
        return websiteActivityDAO.getTotalWebsiteVisitorsCount();
    }

}

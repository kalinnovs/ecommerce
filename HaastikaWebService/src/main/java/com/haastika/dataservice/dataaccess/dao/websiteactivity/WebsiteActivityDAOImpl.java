package com.haastika.dataservice.dataaccess.dao.websiteactivity;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.haastika.dataservice.dataaccess.dao.base.BaseDAOImpl;
import com.haastika.dataservice.dataaccess.entity.WebsiteActivity;

@Repository("websiteActivityDAO")
public class WebsiteActivityDAOImpl extends BaseDAOImpl<WebsiteActivity, Integer> implements WebsiteActivityDAO {

    private Logger logger = Logger.getLogger(WebsiteActivityDAOImpl.class);

    public WebsiteActivityDAOImpl() {
        super(WebsiteActivity.class);
    }

    public WebsiteActivity findActivityForURLPattern(final String urlPattern) {

        WebsiteActivity activity = null;
        try {
            final Criteria activityCriteria = getCriteria();
            activityCriteria.add(Restrictions.eq("urlPatternAccessed", urlPattern));
            activity = activityCriteria.list() != null && activityCriteria.list().size() > 0
                ? (WebsiteActivity) activityCriteria.list().get(0) : null;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return activity;
    }

    @Override
    public WebsiteActivity findActivityForIP(String ipAddress) {
        WebsiteActivity activity = null;
        try {
            final Criteria activityCriteria = getCriteria();
            activityCriteria.add(Restrictions.eq("ipAddress", ipAddress));
            activity = activityCriteria.list() != null && activityCriteria.list().size() > 0
                ? (WebsiteActivity) activityCriteria.list().get(0) : null;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return activity;
    }

    public WebsiteActivity findActivityForIPAndPattern(final String ipAddress, final String urlPattern) {
        WebsiteActivity activity = null;
        try {
            final Criteria activityCriteria = getCriteria();
            activityCriteria.add(Restrictions.eq("ipAddress", ipAddress));
            activityCriteria.add(Restrictions.eq("urlPatternAccessed", urlPattern));
            activity = activityCriteria.list() != null && activityCriteria.list().size() > 0
                ? (WebsiteActivity) activityCriteria.list().get(0) : null;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return activity;

    }

    @Override
    public Integer getTotalWebsiteVisitorsCount() {
        Integer visitorCount = 0;
        try {
            final Criteria websiteCriteria = getCriteria();
            websiteCriteria.setProjection(Projections.sum("hitCount"));
            Object totalVisitors = websiteCriteria.uniqueResult();
            visitorCount = totalVisitors != null ? ((Number) websiteCriteria.uniqueResult()).intValue() : 0;
            logger.debug("Total rowCount: " + visitorCount);

        } catch (HibernateException e) {
            e.printStackTrace();
        }
        return visitorCount;
    }

    @Override
    public Integer getTotalUniqueVisitorsCount() {
        Integer uniqueVisitorsCount = 0;
        try {
            final Criteria websiteCriteria = getCriteria();
            final Object uniqueVisitors = websiteCriteria.setProjection(Projections.rowCount()).uniqueResult();
            uniqueVisitorsCount = uniqueVisitors != null ? ((Number) websiteCriteria.setProjection(
                Projections.rowCount()).uniqueResult()).intValue() : 0;
            logger.debug("Total UniqueVisitors: " + uniqueVisitors);

        } catch (HibernateException e) {
            e.printStackTrace();
        }

        return uniqueVisitorsCount;
    }

}

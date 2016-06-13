package com.haastika.dataservice.dataaccess.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "HAASTIKA_WEBSITE_ACTIVITY")
public class WebsiteActivity implements Serializable {

    public WebsiteActivity() {
        super();
    }

    /**
     * 
     */
    private static final long serialVersionUID = 4086708025872767702L;
    @Id
    @GeneratedValue
    @Column(name = "WEBSITE_ACTIVITY_ID")
    private Integer activityId;

    @Column(name = "IP_ADDRESS")
    private String ipAddress;

    @Column(name = "HIT_COUNT")
    private Integer hitCount;

    @Column(name = "LAST_ACCESSED_DATE")
    private Date lastAccessedDate;

    @Column(name = "URL_PATTERN_ACCESSED")
    private String urlPatternAccessed;

    public String getUrlPatternAccessed() {
        return urlPatternAccessed;
    }

    public void setUrlPatternAccessed(String urlPatternAccessed) {
        this.urlPatternAccessed = urlPatternAccessed;
    }

    public Date getLastAccessedDate() {
        return lastAccessedDate;
    }

    public void setLastAccessedDate(Date lastAccessedDate) {
        this.lastAccessedDate = lastAccessedDate;
    }

    public Integer getActivityId() {
        return activityId;
    }

    public void setActivityId(Integer activityId) {
        this.activityId = activityId;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public Integer getHitCount() {
        return hitCount;
    }

    public void setHitCount(Integer hitCount) {
        this.hitCount = hitCount;
    }

}

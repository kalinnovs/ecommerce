package com.haastika.dataservice.websiteactivity;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.haastika.dataservice.service.websiteactivity.WebsiteActivityTrackerService;

@Component
@Aspect
public class WebsiteActivityAspect {

    @Autowired
    private WebsiteActivityTrackerService trackerService;

    /**
     * Advice for auditing a user's visit to a page. The rule is that the After annotation applies to any method
     * annotated by @Activity.
     * 
     * @param Activity annotation holds the name of the pattern we're tracking.
     * @throws Throwable
     */

    @After("@annotation(websiteActivity)")
    public void auditScreen(final Activity websiteActivity) throws Throwable {
        final String urlPattern = websiteActivity.urlPattern();
        if (urlPattern == null) {
            trackerService.trackWebsiteActivity();
        } else
            trackerService.trackWebsiteActivity(urlPattern);
    }

}

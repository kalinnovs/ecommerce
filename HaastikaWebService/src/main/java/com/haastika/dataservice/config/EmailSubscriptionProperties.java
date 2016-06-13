package com.haastika.dataservice.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class EmailSubscriptionProperties {

    @Value("#{'${subscriptionEmailBCCList}'.split(',')}")
    private List<String> bccEmailList;
    
    @Value("${subscriptionEmailSubject}")
    private String subscriptionEmailSubject;

    
    public List<String> getBccEmailList() {
        return bccEmailList;
    }

    public String getSubscriptionEmailSubject() {
        return subscriptionEmailSubject;
    }


}

package com.haastika.dataservice.service.email;

import com.haastika.dataservice.data.domain.FeedbackUserDetails;
import com.haastika.dataservice.data.domain.SubscriberDetails;


public interface EmailService {
    public Boolean sendEmailForSuccessfulSubscription(final SubscriberDetails subscriberDetails);
    public Boolean sendDomainEmailForSuccessfulSubscription(final SubscriberDetails subscriberDetails);
	public Boolean sendDomainEmailForFeedback(final FeedbackUserDetails user);

}

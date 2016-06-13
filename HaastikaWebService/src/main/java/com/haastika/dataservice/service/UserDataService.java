package com.haastika.dataservice.service;

import java.util.List;

import com.haastika.dataservice.data.domain.AuthenticateResponse;
import com.haastika.dataservice.data.domain.FeedbackResponse;
import com.haastika.dataservice.data.domain.FeedbackUserDetails;
import com.haastika.dataservice.data.domain.LoginDetail;
import com.haastika.dataservice.data.domain.SubscriberDetails;
import com.haastika.dataservice.data.domain.SubscriptionResponse;
import com.haastika.dataservice.dataaccess.entity.UserSubscription;


public interface UserDataService {
    
    public SubscriptionResponse addUserSubscription(final SubscriberDetails subscriberDetails);

	public List<UserSubscription> getSubscribers();

	public FeedbackResponse sendFeedbackMail(final FeedbackUserDetails user);
	
	public AuthenticateResponse authenticateUser(final LoginDetail logindetail);
	
	public SubscriptionResponse updateSubscriber(SubscriberDetails subscriberDetails);

}

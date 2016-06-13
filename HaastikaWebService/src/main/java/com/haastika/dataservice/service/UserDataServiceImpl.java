package com.haastika.dataservice.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.haastika.dataservice.data.domain.AuthenticateResponse;
import com.haastika.dataservice.data.domain.FeedbackResponse;
import com.haastika.dataservice.data.domain.FeedbackUserDetails;
import com.haastika.dataservice.data.domain.LoginDetail;
import com.haastika.dataservice.data.domain.SubscriberDetails;
import com.haastika.dataservice.data.domain.SubscriptionResponse;
import com.haastika.dataservice.data.utility.BCrypt;
import com.haastika.dataservice.data.utility.PromoCodeGenerator;
import com.haastika.dataservice.dataaccess.dao.subscription.UserSubscriptionDAOImpl;
import com.haastika.dataservice.dataaccess.dao.user.UserDAOImpl;
import com.haastika.dataservice.dataaccess.entity.User;
import com.haastika.dataservice.dataaccess.entity.UserSubscription;
import com.haastika.dataservice.service.email.EmailService;

@Transactional
@Service("userDataService")
public class UserDataServiceImpl implements UserDataService {

    @Autowired
    UserSubscriptionDAOImpl userSubscriptionDAO;

    @Autowired
    UserDAOImpl userDAO;

    @Autowired
    EmailService emailService;
    
    @Autowired
    PromoCodeGenerator promoCodeGenerator;

    @Override
    public SubscriptionResponse addUserSubscription(final SubscriberDetails subscriberDetails) {

        final String emailId = subscriberDetails.getEmailId();

        boolean subscribedSuccesfully = true;
        final SubscriptionResponse response = new SubscriptionResponse();

        final UserSubscription subscription = userSubscriptionDAO.findByPrimaryKey(emailId);
        if (subscription != null) {
            response.setErrorMessage("This Email Id is already subscribed with Haastika.");
            subscribedSuccesfully=false;
        } else {
            final UserSubscription newSubscription = new UserSubscription();
            newSubscription.setContactNo(subscriberDetails.getContactNo());
            newSubscription.setCreationDate(new Date());
            newSubscription.setFirstName(subscriberDetails.getFirstName());
            newSubscription.setLastName(subscriberDetails.getLastName());
            newSubscription.setEmailId(subscriberDetails.getEmailId());
            final String promoCode = promoCodeGenerator.generateSecureRandomPromo(6);
            newSubscription.setPromoCode(promoCode);
            subscriberDetails.setPromoCode(promoCode);
            userSubscriptionDAO.save(newSubscription);
            emailService.sendDomainEmailForSuccessfulSubscription(subscriberDetails);
            response.setSubscriptionMessage("You have successfully subscribed to Haastika. Please check your email "
            		+ "for promo codes to avail discount on your first purchase.");
        }
        response.setSubscribedSuccessfully(subscribedSuccesfully);
        return response;
    }

	@Override
	public List<UserSubscription> getSubscribers() {
		final List<UserSubscription> subscription = userSubscriptionDAO.getAll();
		return subscription;
	}

	public SubscriptionResponse updateSubscriber(SubscriberDetails userDetails) {
		SubscriptionResponse st = new SubscriptionResponse();
		st.setSubscribedSuccessfully(false);
		st.setSubscriptionMessage("FAIL");
		try {
			if(userDetails.getEmailId()!=null){
				UserSubscription subscriber = userSubscriptionDAO.findByPrimaryKey(userDetails.getEmailId());
				if(subscriber!=null){
					subscriber.setPromoUsed(userDetails.isPromoUsed());
					if(null != userDetails.getContactNo())
					subscriber.setContactNo(userDetails.getContactNo());
					if(null != userDetails.getFirstName())
					subscriber.setFirstName(userDetails.getFirstName());
					if(null != userDetails.getLastName())
					subscriber.setLastName(userDetails.getLastName());
					userSubscriptionDAO.update(subscriber);
					st.setSubscribedSuccessfully(true);
					st.setSubscriptionMessage("Success");
				}
			}
		} catch (Exception e){
			e.printStackTrace();
		}
		return st;
	}

	public FeedbackResponse sendFeedbackMail(final FeedbackUserDetails user) {

		final FeedbackResponse response = new FeedbackResponse();
        boolean isSuccessful =  emailService.sendDomainEmailForFeedback(user);
        response.setFeedbackSuccessful(isSuccessful);
        if(isSuccessful){
        	response.setFeedbackMessage("Mail sent successfully. Thank you for reaching us.");
        } else {
        	response.setFeedbackMessage("We are experiencing technical problems. Please try again later.");
        }
        return response;
	}
	
	public AuthenticateResponse authenticateUser(final LoginDetail logindetail){
		AuthenticateResponse resp = new AuthenticateResponse();
		String username = logindetail.getUserName();
		resp.setSuccess(false);
		if(username!=null){
			User user = userDAO.getUserDetail(username.toLowerCase());
			if(null != user) {
				try{
					if(BCrypt.checkpw(logindetail.getPassword(),user.getPassword())){
						resp.setSuccess(true);
						resp.setTimeStamp(Long.toString(new Date(System.currentTimeMillis()).getTime()));
					}
				} catch (Exception e){
					e.printStackTrace();
					resp.setSuccess(false);
				}
			}
		}
		return resp;
		
	}

}
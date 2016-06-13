package com.haastika.dataservice.data.domain;

public class SubscriptionResponse {
    
    private boolean subscribedSuccessfully;
    private String subscriptionMessage;

    private String errorMessage;

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public boolean isSubscribedSuccessfully() {
		return subscribedSuccessfully;
	}

	public void setSubscribedSuccessfully(boolean subscribedSuccessfully) {
		this.subscribedSuccessfully = subscribedSuccessfully;
	}

	public String getSubscriptionMessage() {
        return subscriptionMessage;
    }

    public void setSubscriptionMessage(String subscriptionMessage) {
        this.subscriptionMessage = subscriptionMessage;
    }

}

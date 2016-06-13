package com.haastika.dataservice.data.domain;

public class FeedbackResponse {
    
    private boolean feedbackSuccessful;
    private String feedbackMessage;
    
	public boolean isFeedbackSuccessful() {
		return feedbackSuccessful;
	}
	public void setFeedbackSuccessful(boolean feedbackSuccessful) {
		this.feedbackSuccessful = feedbackSuccessful;
	}
	public String getFeedbackMessage() {
		return feedbackMessage;
	}
	public void setFeedbackMessage(String feedbackMessage) {
		this.feedbackMessage = feedbackMessage;
	}

}

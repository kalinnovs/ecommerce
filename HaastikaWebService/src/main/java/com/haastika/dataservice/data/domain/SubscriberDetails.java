package com.haastika.dataservice.data.domain;

public class SubscriberDetails {

    private String firstName;
    private String lastName;
    private String emailId;
    private String contactNo;
    private String promoCode;
    private boolean promoUsed;
    
    public String getFirstName() {
        return firstName;
    }
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    public String getLastName() {
        return lastName;
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public String getEmailId() {
        return emailId;
    }
    
    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }
    
    public String getContactNo() {
        return contactNo;
    }
    
    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

	public String getPromoCode() {
		return promoCode;
	}

	public void setPromoCode(String promoCode) {
		this.promoCode = promoCode;
	}

	public boolean isPromoUsed() {
		return promoUsed;
	}

	public void setPromoUsed(boolean promoUsed) {
		this.promoUsed = promoUsed;
	}


}

package com.haastika.dataservice.dataaccess.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "USER_SUBSCRIPTION")
public class UserSubscription implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = 4855615382636460958L;

    public UserSubscription() {
        super();
    }

    @Column(name = "FIRST_NAME")
    private String firstName;

    @Column(name = "LAST_NAME")
    private String lastName;

    @Id
    @Column(name = "EMAIL_ID", unique = true, columnDefinition = "VARCHAR(50)")
    private String emailId;

    @Column(name = "CONTACT_NO")
    private String contactNo;

    @Column(name = "CREATION_DATE")
    private Date creationDate;

    @Column(name = "PROMO_CODE")
    private String promoCode;

    @Column(columnDefinition = "TINYINT", name = "PROMO_USED")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean promoUsed;

    public boolean isPromoUsed() {
		return promoUsed;
	}

	public void setPromoUsed(boolean promoUsed) {
		this.promoUsed = promoUsed;
	}

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

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public String getPromoCode() {
        return promoCode;
    }

    public void setPromoCode(String promoCode) {
        this.promoCode = promoCode;
    }

}

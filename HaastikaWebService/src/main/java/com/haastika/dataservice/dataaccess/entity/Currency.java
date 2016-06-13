package com.haastika.dataservice.dataaccess.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "CURRENCY")
public class Currency implements Serializable {

    public Currency() {
        super();
    }

    /**
     * 
     */
    private static final long serialVersionUID = 4086708025872767702L;
    @Id
    @GeneratedValue
    @Column(name = "CURRENCY_ID")
    private Integer currencyId;

    @Column(name = "COUNTRY_CODE")
    private String countryCode;
    
    @Column(name = "COUNTRY_NAME")
    private String countryName;

    @Column(name = "CURRENCY_CODE")
    private String currencyCode;
    
    
    public Integer getCurrencyId() {
        return currencyId;
    }

    
    public void setCurrencyId(Integer currencyId) {
        this.currencyId = currencyId;
    }

    
    public String getCurrencySymbol() {
        return currencySymbol;
    }

    
    public void setCurrencySymbol(String currencySymbol) {
        this.currencySymbol = currencySymbol;
    }

    @Column(name = "CURRENCY_SYMBOL")
    private String currencySymbol;

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public String getCurrencyCode() {
        return currencyCode;
    }

    public void setCurrencyCode(String currencyCode) {
        this.currencyCode = currencyCode;
    }


}

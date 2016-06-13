package com.haastika.dataservice.data.domain;

import java.io.Serializable;
import java.util.Currency;
import java.util.Locale;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;

import com.haastika.dataservice.data.utility.CurrencyUtility;

@Component("countryCurrency")
@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class CountryCurrency implements Serializable {

    @Autowired
    CurrencyUtility currencyUtil;

    /**
     * 
     */
    private static final long serialVersionUID = -9184740743079554130L;

    @PostConstruct
    public void init() {
    }
    private String countryCode;
    private Currency currency;
    private Locale locale;

    public CountryCurrency(String countryCode) {
        super();
        this.countryCode = countryCode;
        this.locale = currencyUtil.getLocaleForCountry(countryCode);
        this.currency = Currency.getInstance(locale);
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public Locale getLocale() {
        return locale;
    }

    public void setLocale(Locale locale) {
        this.locale = locale;
    }

}

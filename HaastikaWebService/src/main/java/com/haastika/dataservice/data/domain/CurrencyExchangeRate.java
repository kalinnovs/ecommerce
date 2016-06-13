package com.haastika.dataservice.data.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class CurrencyExchangeRate {

    public String fromCurrencyCode;

    public String toCurrencyCode;

    public Double exchangeCoefficient;
    
    public Date exchangeRateAccessTime;

    
    public Date getExchangeRateAccessTime() {
        return exchangeRateAccessTime;
    }

    
    public void setExchangeRateAccessTime(Date exchangeRateAccessTime) {
        this.exchangeRateAccessTime = exchangeRateAccessTime;
    }

    public String getFromCurrencyCode() {
        return fromCurrencyCode;
    }

    public void setFromCurrencyCode(String fromCurrencyCode) {
        this.fromCurrencyCode = fromCurrencyCode;
    }

    public String getToCurrencyCode() {
        return toCurrencyCode;
    }

    public void setToCurrencyCode(String toCurrencyCode) {
        this.toCurrencyCode = toCurrencyCode;
    }

    public Double getExchangeCoefficient() {
        return exchangeCoefficient;
    }

    public void setExchangeCoefficient(Double exchangeCoefficient) {
        this.exchangeCoefficient = exchangeCoefficient;
    }

}

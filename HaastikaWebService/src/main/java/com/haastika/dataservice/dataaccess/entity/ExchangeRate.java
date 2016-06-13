package com.haastika.dataservice.dataaccess.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class ExchangeRate implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = -1178316722563488099L;
    
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    @Column(name = "EXCHANGE_RATE_ID", unique = true, nullable = false)
    private Long exchangeRateId;

    @Column(name = "TO_CURRENCY_CODE")
    private String toCurrencyCode;

    @Column(name = "COEFFICIENT")
    private Double coefficient;

    @Column(name = "LAST_MODIFIED_DATE")
    private Date lastmodifiedDate;

    @Column(name = "FROM_CURRENCY_CODE")
    private String fromCurrencyCode;

    public Long getExchangeRateId() {
        return exchangeRateId;
    }

    public void setExchangeRateId(Long exchangeRateId) {
        this.exchangeRateId = exchangeRateId;
    }

    public String getToCurrencyCode() {
        return toCurrencyCode;
    }

    public void setToCurrencyCode(String toCurrencyCode) {
        this.toCurrencyCode = toCurrencyCode;
    }

    public Double getCoefficient() {
        return coefficient;
    }

    public void setCoefficient(Double coefficient) {
        this.coefficient = coefficient;
    }

    public Date getLastmodifiedDate() {
        return lastmodifiedDate;
    }

    public void setLastmodifiedDate(Date lastmodifiedDate) {
        this.lastmodifiedDate = lastmodifiedDate;
    }

    public String getFromCurrencyCode() {
        return fromCurrencyCode;
    }

    public void setFromCurrencyCode(String fromCurrencyCode) {
        this.fromCurrencyCode = fromCurrencyCode;
    }

    public ExchangeRate() {
    }

    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        ExchangeRate other = (ExchangeRate) o;
        if (exchangeRateId != null ? !exchangeRateId.equals(other.exchangeRateId) : other.exchangeRateId != null)
            return false;
        return true;
    }

    public int hashCode() {
        int result;
        result = (exchangeRateId != null ? exchangeRateId.hashCode() : 0);
        return result;
    }

    public String toString() {
        StringBuffer buff = new StringBuffer();
        buff.append("exchangeRateId: " + getExchangeRateId());
        buff.append(", currencyFrom: " + getFromCurrencyCode());
        buff.append(", currencyTo: " + getToCurrencyCode());
        buff.append(", coefficient: " + getCoefficient());
        buff.append(", lastmodified: " + getLastmodifiedDate());
        return buff.toString();
    }

}

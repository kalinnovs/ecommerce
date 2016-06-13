package com.haastika.dataservice.service;

import java.util.Set;

import com.haastika.dataservice.data.domain.CurrencyExchangeRate;


public interface ExchangeRateService {
    
    public Set<CurrencyExchangeRate> getCurrencyExchangeRateFromYahooAPI();

   
}

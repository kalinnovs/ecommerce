package com.haastika.dataservice.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;

import com.haastika.dataservice.data.domain.CurrencyExchangeRate;
import com.haastika.dataservice.dataaccess.dao.exchangerate.ExchangeRateDAOImpl;
import com.haastika.dataservice.dataaccess.entity.ExchangeRate;


public class ExchangeRateServiceImpl implements ExchangeRateService {
    
    @Autowired 
    ExchangeRateDAOImpl exchangeRateDAO;

    @Override
    public Set<CurrencyExchangeRate> getCurrencyExchangeRateFromYahooAPI() {
        
        final List<ExchangeRate> exchangeRateList = exchangeRateDAO.getAll();
        final Set<String> currencyPairs = new HashSet<String>();
        for(final ExchangeRate exchangeRate:exchangeRateList){
            final String fromCurrency = exchangeRate.getFromCurrencyCode();
            final String toCurrency = exchangeRate.getToCurrencyCode();
            final String currencyPair = fromCurrency + toCurrency;
            currencyPairs.add(currencyPair);
        }
        return null;
    }

}

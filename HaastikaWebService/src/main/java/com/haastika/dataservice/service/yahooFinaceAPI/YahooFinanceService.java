package com.haastika.dataservice.service.yahooFinaceAPI;

import com.haastika.dataservice.data.domain.CurrencyExchangeRate;


public interface YahooFinanceService {

    public CurrencyExchangeRate getCurrencyExchangeRate(final String currencyFrom, final String currencyTo) throws Exception;

}

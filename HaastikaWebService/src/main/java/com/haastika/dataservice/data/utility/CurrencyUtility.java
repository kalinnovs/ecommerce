package com.haastika.dataservice.data.utility;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.springframework.stereotype.Component;

@Component("currencyUtility")
public class CurrencyUtility {

    public Map<String, String> getAllAvailableCountries() {
        final Map<String, String> countryMap = new HashMap<String, String>();
        final String[] locales = Locale.getISOCountries();
        for (final String countryCode : locales) {
            final Locale localeObj = new Locale("", countryCode);
            countryMap.put(countryCode, localeObj.getDisplayCountry());
        }
        return countryMap;
    }
    public Map<String, Locale> getAllAvailableLocales() {
        final String[] locales = Locale.getISOCountries();
        Map<String, Locale> localeMap = new HashMap<String, Locale>(locales.length);
        for (final String countryCode : locales) {
            final Locale localeObj = new Locale("", countryCode);
            localeMap.put(countryCode, localeObj);
        }
        return localeMap;
    }
    public Locale getLocaleForCountry(final String countryCode){
        return getAllAvailableLocales().get(countryCode);
    }
    public void getCurrentExchangeRatesFromYahooAPI(){
        
    }

}

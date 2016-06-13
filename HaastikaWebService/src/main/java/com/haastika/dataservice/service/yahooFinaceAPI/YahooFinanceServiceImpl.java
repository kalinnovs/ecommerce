package com.haastika.dataservice.service.yahooFinaceAPI;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import com.haastika.dataservice.data.domain.CurrencyExchangeRate;

public class YahooFinanceServiceImpl implements YahooFinanceService {

    private final String USER_AGENT = "Mozilla/5.0";
    private final String BASE_URL="http://query.yahooapis.com/v1/public/yql";
    private final String BASE_YQL="select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(";

   
    public static void main(String[] args){
       try {
        new YahooFinanceServiceImpl().getCurrencyExchangeRate("USD", "INR");
    } catch (Exception e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
    }
    }
        
    // HTTP GET request
    public CurrencyExchangeRate getCurrencyExchangeRate(final String fromCurrencyCode, final String toCurrencyCode)
        throws Exception {

        final String fromToCurrencyPair = fromCurrencyCode + toCurrencyCode;
        final String yqlQuery = createYQLQueryWithCurrencyPairs(new String[]{fromToCurrencyPair});

        String yahooFinanceURL = new String(BASE_URL);
        yahooFinanceURL = addQueryParameter(yahooFinanceURL,"q",yqlQuery);
        yahooFinanceURL = addQueryParameter(yahooFinanceURL,"env","store://datatables.org/alltableswithkeys");
        System.out.println("Printing the URL"+yahooFinanceURL);
        URL yahooFinanceAPIURL = new URL(yahooFinanceURL);
        
        HttpURLConnection httpConnection = (HttpURLConnection) yahooFinanceAPIURL.openConnection();

        // optional default is GET
        httpConnection.setRequestMethod("GET");

        // add request header
        httpConnection.setRequestProperty("User-Agent", USER_AGENT);
        final int responseCode = httpConnection.getResponseCode();
        System.out.println("\nSending 'GET' request to URL : " + yahooFinanceAPIURL);
        System.out.println("Response Code : " + responseCode);

        final BufferedReader in = new BufferedReader(new InputStreamReader(httpConnection.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        // print result
        System.out.println(response.toString());
        return null;

    }
    public String createYQLQueryWithCurrencyPairs(final String[] fromToCurrencyPairs){
        
        StringBuffer yqlQuery = new StringBuffer(BASE_YQL);
        for(final String currencyPair:fromToCurrencyPairs){
            yqlQuery.append("%22");
            yqlQuery.append(currencyPair);
            yqlQuery.append("%22");
        }
        yqlQuery.append(")");
        
        return yqlQuery.toString();

    }

    public static String addQueryParameter(final String URL, String paramName, String paramValue)
    {
      int questionPosition = URL.indexOf('?');
      int urlFragmentPosition = URL.indexOf('#');
      char querySeparator = questionPosition == -1 ? '?' : '&';
      final String seg = querySeparator + paramName + '=' + paramValue;
      return urlFragmentPosition == -1 ? URL + seg : URL.substring(0, urlFragmentPosition) + seg
          + URL.substring(urlFragmentPosition);
    }


    public static String encodeUrl(final String url)
    {
      try
      {
        return URLEncoder.encode(url, "UTF-8");
      }
      catch (UnsupportedEncodingException uee)
      {
        throw new IllegalArgumentException(uee);
      }
    }

  }



package com.haastika.dataservice.dataaccess.dao.exchangerate;

import org.springframework.stereotype.Repository;

import com.haastika.dataservice.dataaccess.dao.base.BaseDAOImpl;
import com.haastika.dataservice.dataaccess.entity.ExchangeRate;

@Repository("exchangeRateDAO")
public class ExchangeRateDAOImpl extends BaseDAOImpl<ExchangeRate, Integer> implements ExchangeRateDAO {

    public ExchangeRateDAOImpl() {
        super(ExchangeRate.class);
    }
}

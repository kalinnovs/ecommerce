package com.haastika.dataservice.dataaccess.dao.country;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.haastika.dataservice.dataaccess.dao.base.BaseDAOImpl;
import com.haastika.dataservice.dataaccess.entity.Currency;

@Repository("currencyDAO")
public class CurrencyDAOImpl extends BaseDAOImpl<Currency,Integer> implements CurrencyDAO {

    public CurrencyDAOImpl() {
        super(Currency.class);
    }
    @SuppressWarnings("unchecked")
    public Map<Integer,String> getSupportedCurrencyCodes(){
        final Criteria currencyCriteria = getCriteria();
        //TODO Get this currency code list from config .
        final List<Integer> supportedCurrencies = new ArrayList<Integer>();
        supportedCurrencies.add(1);
        supportedCurrencies.add(2);
        supportedCurrencies.add(3);
        final ProjectionList projList = Projections.projectionList();
        projList.add(Projections.property("currencyId"));
        projList.add(Projections.property("currencyCode"));
        currencyCriteria.setProjection(projList);
        currencyCriteria.add(Restrictions.in("currencyId", supportedCurrencies));
        //currencyCriteria.setResultTransformer(Transformers.aliasToBean(Currency.class));
        final  Map<Integer,String> currencyIdCodeMap = new HashMap<Integer,String>();

        final List<Object[]> rows = currencyCriteria.list(); 
        for (Object[] row : rows) {
            currencyIdCodeMap.put((Integer)row[0], (String)row[1]);
        }
        return currencyIdCodeMap;
    }
}

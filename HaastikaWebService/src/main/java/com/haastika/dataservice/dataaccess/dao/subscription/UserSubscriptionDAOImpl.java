package com.haastika.dataservice.dataaccess.dao.subscription;

import org.springframework.stereotype.Repository;

import com.haastika.dataservice.dataaccess.dao.base.BaseDAOImpl;
import com.haastika.dataservice.dataaccess.entity.UserSubscription;

@Repository("userSubscriptionDAO")
public class UserSubscriptionDAOImpl extends BaseDAOImpl<UserSubscription,String> implements UserSubscriptionDAO {

    public UserSubscriptionDAOImpl() {
        super(UserSubscription.class);
    }

}

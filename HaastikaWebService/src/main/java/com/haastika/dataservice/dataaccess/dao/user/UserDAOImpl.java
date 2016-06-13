package com.haastika.dataservice.dataaccess.dao.user;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.haastika.dataservice.dataaccess.dao.base.BaseDAOImpl;
import com.haastika.dataservice.dataaccess.entity.User;

@Repository("userDAO")
public class UserDAOImpl extends BaseDAOImpl<User,Integer> implements UserDAO {

	public UserDAOImpl() {
		super(User.class);
	}

    @SuppressWarnings("unchecked")
	@Override
    public User getUserDetail(final String username) {
        List<User> userList = new ArrayList<User>();
        try {
            final Criteria userDetailCriteria = getCriteria();
            userDetailCriteria.add(Restrictions.eq("username", username));
            userList = userDetailCriteria.list();
            if(userList.isEmpty()){
            	return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return userList.get(0);
    }

    public void saveUser(final User user) {
		save(user);

	}

}

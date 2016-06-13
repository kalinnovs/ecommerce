package com.haastika.dataservice.dataaccess.dao.user;

import com.haastika.dataservice.dataaccess.entity.User;


public interface UserDAO {

    public void saveUser(final User user);

	public User getUserDetail(String username);
}

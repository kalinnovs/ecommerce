package com.haastika.dataservice.dataaccess.dao.layout;

import org.springframework.stereotype.Repository;

import com.haastika.dataservice.dataaccess.dao.base.BaseDAOImpl;
import com.haastika.dataservice.dataaccess.entity.Layout;

@Repository("layoutDAO")
public class LayoutDAOImpl extends BaseDAOImpl<Layout,Integer> implements LayoutDAO{

    public LayoutDAOImpl() {
        super(Layout.class);
    }
}

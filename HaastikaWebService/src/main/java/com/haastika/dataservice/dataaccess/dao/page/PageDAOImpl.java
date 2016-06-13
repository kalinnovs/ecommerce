package com.haastika.dataservice.dataaccess.dao.page;

import org.springframework.stereotype.Repository;

import com.haastika.dataservice.dataaccess.dao.base.BaseDAOImpl;
import com.haastika.dataservice.dataaccess.entity.Page;

@Repository("pageDAO")
public class PageDAOImpl extends BaseDAOImpl<Page,Integer>implements PageDAO {
    public PageDAOImpl() {
        super(Page.class);
    }

}

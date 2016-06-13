package com.haastika.dataservice.dataaccess.dao.aboutus;

import org.springframework.stereotype.Repository;

import com.haastika.dataservice.dataaccess.dao.base.BaseDAOImpl;
import com.haastika.dataservice.dataaccess.entity.AboutUs;

@Repository("aboutUsDAO")
public class AboutUsDAOImpl extends BaseDAOImpl<AboutUs,Integer> implements AboutUsDAO{

    public AboutUsDAOImpl() {
        super(AboutUs.class);
    }
}

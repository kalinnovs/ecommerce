package com.haastika.dataservice.dataaccess.dao.pagelayoutmapping;

import org.springframework.stereotype.Repository;

import com.haastika.dataservice.dataaccess.dao.base.BaseDAOImpl;
import com.haastika.dataservice.dataaccess.entity.PageLayoutMapping;

@Repository("pageLayoutMappingDAO")
public class PageLayoutMappingDAOImpl extends BaseDAOImpl<PageLayoutMapping,Integer>implements PageLayoutMappingDAO {
    
    public PageLayoutMappingDAOImpl() {
        super(PageLayoutMapping.class);
    }

}

package com.haastika.dataservice.dataaccess.dao.image;

import com.haastika.dataservice.dataaccess.dao.base.BaseDAOImpl;
import com.haastika.dataservice.dataaccess.entity.Image;

public class ImageDAOImpl extends BaseDAOImpl<Image, Integer> {

    public ImageDAOImpl() {
        super(Image.class);
    }
    
}

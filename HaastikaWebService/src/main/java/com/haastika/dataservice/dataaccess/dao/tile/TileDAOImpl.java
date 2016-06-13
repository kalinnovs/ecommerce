package com.haastika.dataservice.dataaccess.dao.tile;

import org.springframework.stereotype.Repository;

import com.haastika.dataservice.dataaccess.dao.base.BaseDAOImpl;
import com.haastika.dataservice.dataaccess.entity.Tile;

@Repository("tileDAO")
public class TileDAOImpl extends BaseDAOImpl<Tile,Integer> implements TileDAO{

    public TileDAOImpl() {
        super(Tile.class);
    }
}

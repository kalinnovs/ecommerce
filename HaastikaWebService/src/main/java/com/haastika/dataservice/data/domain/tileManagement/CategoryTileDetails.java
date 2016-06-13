package com.haastika.dataservice.data.domain.tileManagement;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.haastika.dataservice.data.domain.category.DisplayCategory;

@JsonInclude(Include.NON_NULL)
public class CategoryTileDetails extends TileDetails {

    /**
     * 
     */
    private static final long serialVersionUID = 2342759672680093873L;
    private DisplayCategory tileCategory;

    public DisplayCategory getTileCategory() {
        return tileCategory;
    }

    public void setTileCategory(DisplayCategory tileCategory) {
        this.tileCategory = tileCategory;
    }

}

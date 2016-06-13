package com.haastika.dataservice.data.domain.tileManagement;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class LayoutDetails implements Serializable{

    /**
     * 
     */
    private static final long serialVersionUID = 701551398008178480L;
    private Integer layoutCapacity;
    private String layoutName;
    private Integer noOfCategoryTiles;
    private Integer noOfProductTiles;
    private List<TileDetails> tilesList;

    public Integer getLayoutCapacity() {
        return layoutCapacity;
    }

    public void setLayoutCapacity(Integer layoutCapacity) {
        this.layoutCapacity = layoutCapacity;
    }

    public Integer getNoOfCategoryTiles() {
        return noOfCategoryTiles;
    }

    public void setNoOfCategoryTiles(Integer noOfCategoryTiles) {
        this.noOfCategoryTiles = noOfCategoryTiles;
    }

    public Integer getNoOfProductTiles() {
        return noOfProductTiles;
    }

    public void setNoOfProductTiles(Integer noOfProductTiles) {
        this.noOfProductTiles = noOfProductTiles;
    }

    public List<TileDetails> getTilesList() {
        return tilesList;
    }

    public void setTilesList(List<TileDetails> tilesList) {
        this.tilesList = tilesList;
    }

    public String getLayoutName() {
        return layoutName;
    }

    public void setLayoutName(String layoutName) {
        this.layoutName = layoutName;
    }

}

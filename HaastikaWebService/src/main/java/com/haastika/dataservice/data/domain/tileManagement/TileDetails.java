package com.haastika.dataservice.data.domain.tileManagement;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class TileDetails implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = -6001630804242472656L;
    private TileType tileType;
    private TileDimension tileDimension;

    public enum TileType {
        CATEGORY, PRODUCT;
    }

    public enum TileDimension {
        BIG("Big"), WIDE("Wide"), TALL("Tall");

        private TileDimension(String description) {
            this.description = description;
        }

        public String getDescription() {
            return description;
        }

        private String description;

    }

    public TileType getTileType() {
        return tileType;
    }

    public void setTileType(TileType tileType) {
        this.tileType = tileType;
    }

    public TileDimension getTileDimension() {
        return tileDimension;
    }

    public void setTileDimension(TileDimension tileDimension) {
        this.tileDimension = tileDimension;
    }

};

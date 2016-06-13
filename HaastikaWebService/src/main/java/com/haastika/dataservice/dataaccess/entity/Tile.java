package com.haastika.dataservice.dataaccess.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.haastika.dataservice.data.domain.tileManagement.TileDetails.TileDimension;
import com.haastika.dataservice.data.domain.tileManagement.TileDetails.TileType;

@Entity
@Table(name = "TILE")
public class Tile implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = 2705438894385711325L;

    public Tile() {
        super();
    }

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    @Column(name = "TILE_ID", unique = true, nullable = false)
    private Integer tileId;

    @Column(name = "TILE_TYPE")
    @Enumerated(EnumType.STRING)
    private TileType tileType;

    @Column(name = "TILE_DIMENSION")
    @Enumerated(EnumType.STRING)
    private TileDimension tileDimension;

    @Column(name = "LAYOUT_ID")
    private Integer layoutId;

    @ManyToOne
    @JoinColumn(name = "LAYOUT_ID", insertable = false, updatable = false)
    private Layout layout;

    public Integer getTileId() {
        return tileId;
    }

    public void setTileId(Integer tileId) {
        this.tileId = tileId;
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

    public Integer getLayoutId() {
        return layoutId;
    }

    public void setLayoutId(Integer layoutId) {
        this.layoutId = layoutId;
    }

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "PRODUCT_ID", insertable = false, updatable = false)
    private Product tileProduct;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "CATEGORY_ID", insertable = false, updatable = false)
    private Category tileCategory;

    public Product getTileProduct() {
        return tileProduct;
    }

    public void setTileProduct(Product tileProduct) {
        this.tileProduct = tileProduct;
    }

    public Category getTileCategory() {
        return tileCategory;
    }

    public void setTileCategory(Category tileCategory) {
        this.tileCategory = tileCategory;
    }

    public Layout getLayout() {
        return layout;
    }

    public void setLayout(Layout layout) {
        this.layout = layout;
    }

}

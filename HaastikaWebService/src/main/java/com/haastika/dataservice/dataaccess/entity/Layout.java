package com.haastika.dataservice.dataaccess.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.BatchSize;


@Entity
@Table(name = "LAYOUT")
public class Layout implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = 4690749816352752644L;

    public Layout() {
        super();
    }

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    @Column(name = "LAYOUT_ID", unique = true, nullable = false)
    private Integer layoutId;

    @Column(name = "LAYOUT_CAPACITY")
    private Integer layoutCapacity;
    

    @Column(name = "LAYOUT_NAME")
    private String layoutName;
    

    @Column(name = "NO_OF_CATEGORY_TILES")
    private Integer noOfCategoryTiles;
    
    
    @Column(name = "NO_OF_PRODUCT_TILES")
    private Integer noOfProductTiles;
    
    @BatchSize(size = 3)
    @OneToMany(mappedBy = "layout", cascade = CascadeType.ALL,fetch=FetchType.LAZY)
    private List<Tile> tilesList;

    
    public String getLayoutName() {
        return layoutName;
    }

    
    public void setLayoutName(String layoutName) {
        this.layoutName = layoutName;
    }

    public Integer getLayoutId() {
        return layoutId;
    }

    
    public void setLayoutId(Integer layoutId) {
        this.layoutId = layoutId;
    }

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

    
    public List<Tile> getTilesList() {
        return tilesList;
    }

    
    public void setTilesList(List<Tile> tilesList) {
        this.tilesList = tilesList;
    }

    @Override
    public String toString() {
        return "layoutCapacity=" +layoutCapacity
            + ", noOfCategoryTiles=" + noOfCategoryTiles + ", noOfProductTiles=" + noOfProductTiles + " tilesList=" + tilesList;
    }
    

}

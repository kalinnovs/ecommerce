package com.haastika.dataservice.dataaccess.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Type;

@Entity
@Table(name = "CATEGORY")
public class Category implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = 4690749816352752644L;

    public Category() {
        super();
    }

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    @Column(name = "CATEGORY_ID", unique = true, nullable = false)
    private Integer categoryId;
    
    @Column(name = "ROOT_CATEGORY_ID")
    private Integer rootCategoryId;
    
    public Integer getRootCategoryId() {
        return rootCategoryId;
    }
    
    public void setRootCategoryId(Integer rootCategoryId) {
        this.rootCategoryId = rootCategoryId;
    }

    @Column(name = "CATEGORY_NAME")
    private String categoryName;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "BANNER_IMAGE_PATH")
    private String bannerImagePath;

    @Column(name = "MENU_IMAGE_PATH")
    private String menuImagePath;

    @Column(name = "TILE_IMAGE_PATH")
    private String tileImagePath;

    @Column(name = "CATEGORY_CSS_CLASS")
    private String categoryCSSClass;

    @Transient
    private String categoryPartNumber;

    public String getCategoryPartNumber() {
        categoryPartNumber = "HSCH"+String.format("%03d", getCategoryId());
        return categoryPartNumber;
    }

    @Column(name = "CREATION_DATE")
    private Date creationDate;

    @Column(name = "MODIFICATION_DATE")
    private Date modificationDate;

    @Column(columnDefinition = "TINYINT")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean enabled;

    @BatchSize(size = 5)
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch=FetchType.LAZY)
    private Set<Product> productList;
   
    
    @OneToMany
    @JoinColumn(name = "ROOT_CATEGORY_ID", insertable = false, updatable = false)
    private List<Category> subCategories = new ArrayList<Category>();

    public List<Category> getSubCategories() {
        return subCategories;
    }

    public void setSubCategories(List<Category> subCategories) {
        this.subCategories = subCategories;
    }

    public Category getParentCategory() {
        return parentCategory;
    }

    public void setParentCategory(Category parentCategory) {
        this.parentCategory = parentCategory;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ROOT_CATEGORY_ID", insertable = false, updatable = false)
    private Category parentCategory;

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBannerImagePath() {
        return bannerImagePath;
    }

    public void setBannerImagePath(String bannerImagePath) {
        this.bannerImagePath = bannerImagePath;
    }

    public String getMenuImagePath() {
        return menuImagePath;
    }

    public void setMenuImagePath(String menuImagePath) {
        this.menuImagePath = menuImagePath;
    }

    public String getTileImagePath() {
        return tileImagePath;
    }

    public void setTileImagePath(String tileImagePath) {
        this.tileImagePath = tileImagePath;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Date getModificationDate() {
        return modificationDate;
    }

    public void setModificationDate(Date modificationDate) {
        this.modificationDate = modificationDate;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Set<Product> getProductList() {
        return productList;
    }

    public void setProductList(Set<Product> productList) {
        this.productList = productList;
    }

    public String getCategoryCSSClass() {
        return categoryCSSClass;
    }

    public void setCategoryCSSClass(String categoryCSSClass) {
        this.categoryCSSClass = categoryCSSClass;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    @Override
    public String toString() {
        return "categoryId=" + categoryId + ", description=" + description + ", productList=" + productList
            + "subCategory=" + subCategories;
    }

}

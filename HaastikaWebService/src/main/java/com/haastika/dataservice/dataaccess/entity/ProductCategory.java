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

import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Type;

@Entity
@Table(name = "CATEGORY")
public class ProductCategory implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = 4690749816352752644L;

    public ProductCategory() {
        super();
    }

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    @Column(name = "CATEGORY_ID", unique = true, nullable = false)
    private Integer categoryId;

    @Column(name = "ROOT_CATEGORY_ID")
    private Integer rootCategoryId;

    @Column(name = "DESCRIPTION")
    private String description;
    
    @Column(name = "CATEGORY_NAME")
    private String categoryName;

    @Column(name = "MENU_IMAGE_PATH")
    private String menuImagePath;
    
    @Column(name = "BANNER_IMAGE_PATH")
    private String bannerImagePath;

    @Column(name = "TILE_IMAGE_PATH")
    private String tileImagePath;

    @Column(name = "CREATION_DATE")
    private Date creationDate;

    @Column(name = "MODIFICATION_DATE")
    private Date modificationDate;

    @Column(columnDefinition = "TINYINT")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean enabled;

    @Column(name = "CSS_CLASS")
    private String categoryClass;

    @BatchSize(size = 3)
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private Set<Product> productList;
    
    @OneToMany
    @JoinColumn(name = "ROOT_CATEGORY_ID") 
    private List<ProductCategory> subCategories = new ArrayList<ProductCategory>();
    
    
    public List<ProductCategory> getSubCategories() {
        return subCategories;
    }

    
    public void setSubCategories(List<ProductCategory> subCategories) {
        this.subCategories = subCategories;
    }

    
    public ProductCategory getParentCategory() {
        return parentCategory;
    }

    
    public void setParentCategory(ProductCategory parentCategory) {
        this.parentCategory = parentCategory;
    }

    @ManyToOne(fetch=FetchType.LAZY) 
    @JoinColumn(name = "ROOT_CATEGORY_ID",insertable=false,updatable=false) 
    private ProductCategory parentCategory; 

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

    public String getCategoryName() {
		return categoryName;
	}


	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
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

    public String getCategoryClass() {
		return categoryClass;
	}


	public void setCategoryClass(String categoryClass) {
		this.categoryClass = categoryClass;
	}


	public Integer getRootCategoryId() {
		return rootCategoryId;
	}


	public void setRootCategoryId(Integer rootCategoryId) {
		this.rootCategoryId = rootCategoryId;
	}


	public Set<Product> getProductList() {
        return productList;
    }

    public void setProductList(Set<Product> productList) {
        this.productList = productList;
    }

    public String getMenuImagePath() {
		return menuImagePath;
	}

	public void setMenuImagePath(String menuImagePath) {
		this.menuImagePath = menuImagePath;
	}

	public String getBannerImagePath() {
		return bannerImagePath;
	}

	public void setBannerImagePath(String bannerImagePath) {
		this.bannerImagePath = bannerImagePath;
	}

	public String getTileImagePath() {
		return tileImagePath;
	}


	public void setTileImagePath(String tileImagePath) {
		this.tileImagePath = tileImagePath;
	}


	@Override
    public String toString() {
        return "categoryId=" + categoryId + ", description=" + description + ", productList=" + productList+
                        "subCategory=" + subCategories;
    }

}

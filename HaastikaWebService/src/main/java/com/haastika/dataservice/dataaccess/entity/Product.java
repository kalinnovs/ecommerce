package com.haastika.dataservice.dataaccess.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "PRODUCT")
public class Product implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = 7169913230235459982L;

    public Product() {
        super();
    }
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    @Column(name = "PRODUCT_ID", unique = true, nullable = false)
    private Integer productId;

    @Column(name = "CATEGORY_ID", unique = true, nullable = false)
    private Integer categoryId;
    
    
    public Integer getCategoryId() {
        return categoryId;
    }
    
    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }
    @Column(name = "PRODUCT_DESCRIPTION")
    private String productDescription;

    @Column(name = "PRODUCT_NAME")
    private String productName;

    @ManyToOne(fetch = FetchType.LAZY,cascade=CascadeType.PERSIST)
    @JoinColumn(name = "CATEGORY_ID", insertable = false, updatable = false)
    private Category category;

  //Map one to one association between Product and ProductSpecification
    @OneToOne(fetch = FetchType.LAZY,cascade=CascadeType.ALL)
    @JoinColumn(name = "PRODUCT_SPECIFICATION_ID", insertable = true, updatable = true)
    private ProductSpecification productSpecification;

    @Column(columnDefinition = "TINYINT")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean enabled;

    @Column(name = "DEFAULT_CURRENCY_ID")
    private Integer defaultCurrencyId;

    @Transient
    private String productPartNumber;

    public String getProductPartNumber() {
        productPartNumber = "HSPP"+String.format("%03d", getProductId());

        return productPartNumber;
    }
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({ @JoinColumn(name = "DEFAULT_CURRENCY_ID", insertable = false, updatable = false),
        @JoinColumn(name = "PRODUCT_ID", insertable = false, updatable = false) })
    private ProductPrice productPrice;

    public ProductSpecification getProductSpecification() {
        return productSpecification;
    }

    public void setProductSpecification(ProductSpecification productSpecification) {
        this.productSpecification = productSpecification;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public ProductPrice getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(ProductPrice productPrice) {
        this.productPrice = productPrice;
    }

    public Integer getDefaultCurrencyId() {
        return defaultCurrencyId;
    }

    public void setDefaultCurrencyId(Integer defaultCurrencyId) {
        this.defaultCurrencyId = defaultCurrencyId;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

}

package com.haastika.dataservice.dataaccess.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "PRODUCT_PRICE")
public class ProductPrice implements Serializable {

    public ProductPrice() {
        super();
    }
    /**
     * 
     */
    private static final long serialVersionUID = 3634837651605965124L;

    @EmbeddedId
    private ProductPricePK productPricePk;

    public ProductPricePK getProductPricePk() {
        return productPricePk;
    }

    public void setProductPricePk(ProductPricePK productPricePk) {
        this.productPricePk = productPricePk;
    }

    public Date getModificationDate() {
        return modificationDate;
    }

    public void setModificationDate(Date modificationDate) {
        this.modificationDate = modificationDate;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    @Column(name = "MODIFICATION_DATE")
    private Date modificationDate;

    @Column(name = "CREATION_DATE")
    private Date creationDate;

    @Column(name = "PRICE")
    private BigDecimal price;
    
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "CURRENCY_ID", insertable = false, updatable = false)
    private Currency currency;
    
    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "productId=" + productPricePk.getProductId() + ", currencyID=" + productPricePk.getCurrencyId()
            + ", price=" + price + ", modificationDate=" + modificationDate + " creationDate=" + creationDate;
    }

    @Embeddable
    public static class ProductPricePK implements Serializable {

        /**
         * 
         */
        private static final long serialVersionUID = -8701900205110505640L;

        @Column(name = "PRODUCT_ID", nullable = false)
        private Integer productId;

        @Column(name = "CURRENCY_ID", unique = true, nullable = false)
        private Integer currencyId;
        
        public Integer getCurrencyId() {
            return currencyId;
        }
        public void setCurrencyId(Integer currencyId) {
            this.currencyId = currencyId;
        }

        public Integer getProductId() {
            return productId;
        }

        public void setProductId(Integer productId) {
            this.productId = productId;
        }

    }

}

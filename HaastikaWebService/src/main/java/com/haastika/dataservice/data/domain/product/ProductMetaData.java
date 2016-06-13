package com.haastika.dataservice.data.domain.product;

import java.io.Serializable;
import java.util.List;

public class ProductMetaData implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = 3333248167949545570L;
	private List<ProductCurrency> availableCurrencies;

    public static class ProductCurrency  implements Serializable{

        /**
		 * 
		 */
		private static final long serialVersionUID = 5813751085959031318L;
		private Integer productCurrencyId;
        private String productCurrencyCode;

        public Integer getProductCurrencyId() {
            return productCurrencyId;
        }

        public void setProductCurrencyId(Integer productCurrencyId) {
            this.productCurrencyId = productCurrencyId;
        }

        public String getProductCurrencyCode() {
            return productCurrencyCode;
        }

        public void setProductCurrencyCode(String productCurrencyCode) {
            this.productCurrencyCode = productCurrencyCode;
        }
    }

    public static class ProductCategory implements Serializable{

        /**
		 * 
		 */
		private static final long serialVersionUID = 4393573280976778481L;
		private String categoryName;
        private Integer categoryId;
        private String categoryPartNumber;

        public String getCategoryName() {
            return categoryName;
        }

        public void setCategoryName(String categoryName) {
            this.categoryName = categoryName;
        }

        public Integer getCategoryId() {
            return categoryId;
        }

        public void setCategoryId(Integer categoryId) {
            this.categoryId = categoryId;
        }

        public String getCategoryPartNumber() {
            return categoryPartNumber;
        }

        public void setCategoryPartNumber(String categoryPartNumber) {
            this.categoryPartNumber = categoryPartNumber;
        }
    }
    public List<ProductCurrency> getAvailableCurrencies() {
        return availableCurrencies;
    }

    public void setAvailableCurrencies(List<ProductCurrency> availableCurrencies) {
        this.availableCurrencies = availableCurrencies;
    }
}

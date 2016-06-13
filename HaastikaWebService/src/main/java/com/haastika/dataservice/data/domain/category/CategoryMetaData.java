package com.haastika.dataservice.data.domain.category;

import java.io.Serializable;
import java.util.List;

public class CategoryMetaData implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = -4624676645004988805L;
	private List<CategoryView> avaliableRootCategories;
    private List<CategoryView> availableSubCategories;

    public static class CategoryView implements Serializable{

        /**
		 * 
		 */
		private static final long serialVersionUID = -1517779875340129566L;
		private Integer categoryId;
        private String categoryName;

        public Integer getCategoryId() {
            return categoryId;
        }

        public void setCategoryId(Integer categoryId) {
            this.categoryId = categoryId;
        }

        public String getCategoryName() {
            return categoryName;
        }

        public void setCategoryName(String categoryName) {
            this.categoryName = categoryName;
        }

    }

    public List<CategoryView> getAvaliableRootCategories() {
        return avaliableRootCategories;
    }

    public void setAvaliableRootCategories(List<CategoryView> avaliableRootCategories) {
        this.avaliableRootCategories = avaliableRootCategories;
    }

    public List<CategoryView> getAvailableSubCategories() {
        return availableSubCategories;
    }

    public void setAvailableSubCategories(List<CategoryView> availableSubCategories) {
        this.availableSubCategories = availableSubCategories;
    }

}

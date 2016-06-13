package com.haastika.dataservice.data.domain;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.haastika.dataservice.data.domain.category.CategoryNavigation;


/**
 * This contains the details of all that we need in the page navigation menu .
 */


@JsonInclude(Include.NON_NULL)
public class PageNavigation  implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = 4706154603745934712L;
	private List<CategoryNavigation> categories;

    public PageNavigation(List<CategoryNavigation> categories) {
        super();
        this.categories = categories;
    }

    public List<CategoryNavigation> getCategories() {
        return categories;
    }

    public void setCategories(List<CategoryNavigation> categories) {
        this.categories = categories;
    }

}

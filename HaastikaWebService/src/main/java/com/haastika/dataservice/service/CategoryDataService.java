package com.haastika.dataservice.service;

import java.util.List;

import com.haastika.dataservice.data.domain.PageNavigation;
import com.haastika.dataservice.data.domain.category.CategoryAttributes;
import com.haastika.dataservice.data.domain.category.CategoryMetaData;
import com.haastika.dataservice.data.domain.category.CategoryMetaData.CategoryView;
import com.haastika.dataservice.data.domain.category.CategoryNavigation;
import com.haastika.dataservice.data.domain.category.DisplayCategory;
import com.haastika.dataservice.data.domain.category.DisplayCategoryDetails;
import com.haastika.dataservice.data.domain.category.SaveStatus;
import com.haastika.dataservice.data.domain.pageDetails.AdminPageDetails;
import com.haastika.dataservice.data.domain.pageDetails.DisplayAboutUs;
import com.haastika.dataservice.data.domain.pageDetails.HomePageDetails;
import com.haastika.dataservice.data.domain.tileManagement.PageLayoutDetails;
import com.haastika.dataservice.dataaccess.entity.Category;

public interface CategoryDataService {

	public DisplayAboutUs getAboutUs();
	
    public HomePageDetails getTilesAndNavigationDetailsForHome();

    public AdminPageDetails getCategoryProductHierarchyForAdmin();

    public DisplayCategoryDetails getDisplayCategoryDetails(final Integer categoryId);

    public PageLayoutDetails buildTilesAndLayoutsForPage(final Integer pageId);

    public List<CategoryNavigation> getAvaliableCategoryAndSubCategoryForNavigation(Integer catId);

    public PageNavigation buildNavigationMenu(Integer catId);

    public CategoryMetaData getCategoryAdminPageMetaData();

    public CategoryAttributes getCategoryAttributesForCategory(final Category category,
        final boolean includeSubCategories, final boolean includeCategoryProducts,
        final boolean includeSubCategoryProducts, final boolean isAdmin);

    public CategoryAttributes getCategoryAttributesForCategory(final Category category);

    public List<CategoryView> getAllAvailableRootCategoriesForMetaData();

    public DisplayCategory createDisplayCategory(final Category productCategory, final boolean needSubCategory);

    public DisplayCategory createDisplayCategory(final Category productCategory);

    public SaveStatus saveCategoryData(final CategoryAttributes categoryAttributes);

	public SaveStatus deleteCategoryData(Integer categoryId);
}

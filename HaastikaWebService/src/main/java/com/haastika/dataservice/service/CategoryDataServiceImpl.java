package com.haastika.dataservice.service;

import java.io.Serializable;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import org.hibernate.JDBCException;
import org.hibernate.exception.ConstraintViolationException;
import org.hibernate.exception.JDBCConnectionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.haastika.dataservice.data.domain.BreadCrumb;
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
import com.haastika.dataservice.data.domain.product.DisplayProduct;
import com.haastika.dataservice.data.domain.product.ProductAttributes;
import com.haastika.dataservice.data.domain.tileManagement.CategoryTileDetails;
import com.haastika.dataservice.data.domain.tileManagement.LayoutDetails;
import com.haastika.dataservice.data.domain.tileManagement.PageLayoutDetail;
import com.haastika.dataservice.data.domain.tileManagement.PageLayoutDetails;
import com.haastika.dataservice.data.domain.tileManagement.ProductTileDetails;
import com.haastika.dataservice.data.domain.tileManagement.TileDetails;
import com.haastika.dataservice.data.domain.tileManagement.TileDetails.TileType;
import com.haastika.dataservice.dataaccess.dao.aboutus.AboutUsDAOImpl;
import com.haastika.dataservice.dataaccess.dao.country.CurrencyDAOImpl;
import com.haastika.dataservice.dataaccess.dao.layout.LayoutDAOImpl;
import com.haastika.dataservice.dataaccess.dao.page.PageDAOImpl;
import com.haastika.dataservice.dataaccess.dao.productcategory.CategoryDAOImpl;
import com.haastika.dataservice.dataaccess.dao.productprice.ProductPriceDAOImpl;
import com.haastika.dataservice.dataaccess.dao.tile.TileDAOImpl;
import com.haastika.dataservice.dataaccess.entity.AboutUs;
import com.haastika.dataservice.dataaccess.entity.Category;
import com.haastika.dataservice.dataaccess.entity.Layout;
import com.haastika.dataservice.dataaccess.entity.Page;
import com.haastika.dataservice.dataaccess.entity.Product;
import com.haastika.dataservice.dataaccess.entity.Tile;

@Transactional
@Service("categoryDataService")
public class CategoryDataServiceImpl implements CategoryDataService {

    @Autowired
    CategoryDAOImpl productCategoryDAO;

    @Autowired
    CurrencyDAOImpl currencyDAO;

    @Autowired
    ProductPriceDAOImpl productPriceDao;

    @Autowired
    PageDAOImpl pageDAO;

    @Autowired
    LayoutDAOImpl layoutDao;

    @Autowired
    TileDAOImpl tileDAO;
    
    @Autowired
    AboutUsDAOImpl aboutUsDAO;

    @Autowired
    private ProductDataService productDataService;

    @Override
    public HomePageDetails getTilesAndNavigationDetailsForHome() {
        final PageLayoutDetails pageDetails = buildTilesAndLayoutsForPage(1);
        final PageNavigation navigation = buildNavigationMenu(null);
        final HomePageDetails homePageDetails = new HomePageDetails(pageDetails, navigation);
        return homePageDetails;
    }

    @Override
    public PageNavigation buildNavigationMenu(Integer catId) {
        final List<CategoryNavigation> categoryList = getAvaliableCategoryAndSubCategoryForNavigation(catId);
        final PageNavigation navigation = new PageNavigation(categoryList);
        return navigation;
    }

    @Override
    public List<CategoryNavigation> getAvaliableCategoryAndSubCategoryForNavigation(Integer catId) {
        // Create category list to be displayed in the home page
        final List<CategoryNavigation> navigationCategoryList = new ArrayList<CategoryNavigation>();
        // Get all root categories from DB
        final List<Category> productCategoryList = productCategoryDAO.fetchAllEnabledRootCategories();
        for (final Category category : productCategoryList) {
            final CategoryNavigation navigationCategory = buildNavigationCategory(category,catId);

            final List<CategoryNavigation> subCategoryNavigationList = new ArrayList<CategoryNavigation>();
            for (final Category productSubCategory : category.getSubCategories()) {
            	if(productSubCategory.isEnabled()){
                    final CategoryNavigation navigationSubCategory = buildNavigationCategory(productSubCategory,null);
                    subCategoryNavigationList.add(navigationSubCategory);
            	}
            }
            navigationCategory.setSubcategoryList(subCategoryNavigationList);
            navigationCategoryList.add(navigationCategory);

        }
        return navigationCategoryList;
    }

    public CategoryNavigation buildNavigationCategory(final Category category, Integer catId) {
        final CategoryNavigation navigationCategory = new CategoryNavigation();
        navigationCategory.setCategoryId(category.getCategoryId());
        navigationCategory.setCategoryPartNumber(category.getCategoryPartNumber());
        navigationCategory.setCategoryName(category.getCategoryName());
        navigationCategory.setCategoryDetailsURL("category/" + category.getCategoryPartNumber());
        navigationCategory.setCategoryCSSClass(category.getCategoryCSSClass());
        navigationCategory.setCategoryMenuImagePath(category.getMenuImagePath());
        if(catId!=null && catId==category.getCategoryId()){
            navigationCategory.setSelected("selected");
        } else {
        	navigationCategory.setSelected("");
        }
        return navigationCategory;

    }

    @Override
    public PageLayoutDetails buildTilesAndLayoutsForPage(final Integer pageId) {
        final PageLayoutDetails pageTileDetails = new PageLayoutDetails();

        final Page page = pageDAO.findByPrimaryKey(pageId);
        final Set<Layout> layoutsForPage = page.getLayouts();

        final List<LayoutDetails> layoutDetailsList = new ArrayList<LayoutDetails>();
        for (final Layout layout : layoutsForPage) {
            final LayoutDetails layoutDetails = new LayoutDetails();
            layoutDetails.setLayoutCapacity(layout.getLayoutCapacity());
            layoutDetails.setNoOfCategoryTiles(layout.getNoOfCategoryTiles());
            layoutDetails.setNoOfProductTiles(layout.getNoOfProductTiles());
            layoutDetails.setLayoutName(layout.getLayoutName());
            final List<Tile> tilesList = layout.getTilesList();
            final List<TileDetails> tileDetailsList = new ArrayList<TileDetails>();
            for (final Tile tile : tilesList) {
                if (tile.getTileType().equals(TileType.CATEGORY)) {
                    final CategoryTileDetails tileDetails = new CategoryTileDetails();
                    tileDetails.setTileDimension(tile.getTileDimension());
                    tileDetails.setTileType(tile.getTileType());
                    final DisplayCategory category = createDisplayCategory(tile.getTileCategory(), false);
                    tileDetails.setTileCategory(category);
                    tileDetailsList.add(tileDetails);
                } else {
                    final ProductTileDetails tileDetails = new ProductTileDetails();
                    tileDetails.setTileDimension(tile.getTileDimension());
                    tileDetails.setTileType(tile.getTileType());
                    tileDetails.setProductTileDetails(productDataService.getDisplayProduct(tile.getTileProduct()));
                    tileDetailsList.add(tileDetails);
                }
            }
            layoutDetails.setTilesList(tileDetailsList);
            layoutDetailsList.add(layoutDetails);
        }
        
        PageLayoutDetail pageLayoutDetail = new PageLayoutDetail(); 
        for(LayoutDetails layoutDetails : layoutDetailsList){
        	if(layoutDetails.getLayoutCapacity()==2){
        		pageLayoutDetail.setLayout2(layoutDetails);
        	} else if(layoutDetails.getLayoutCapacity()==3){
        		pageLayoutDetail.setLayout3(layoutDetails);
        	} else if(layoutDetails.getLayoutCapacity()==4){
        		pageLayoutDetail.setLayout4(layoutDetails);
        	} else if(layoutDetails.getLayoutCapacity()==5){
        		pageLayoutDetail.setLayout5(layoutDetails);
        	} else if(layoutDetails.getLayoutCapacity()==6){
        		pageLayoutDetail.setLayout6(layoutDetails);
        	}
        }
        
        pageTileDetails.setLayouts(pageLayoutDetail);
        pageTileDetails.setPageName(page.getPageName());
        return pageTileDetails;
    }

    @Override
    public DisplayCategory createDisplayCategory(final Category productCategory) {

        if (productCategory == null) {
            return null;
        }
        final DisplayCategory displayCategory = new DisplayCategory();
        displayCategory.setCategoryId(productCategory.getCategoryId());
        displayCategory.setMenuImagePath(productCategory.getMenuImagePath());
        displayCategory.setBannerImagePath(productCategory.getBannerImagePath());
        displayCategory.setTileImagePath(productCategory.getTileImagePath());
        displayCategory.setCategoryCSSClass(productCategory.getCategoryCSSClass());

        displayCategory.setCategoryName(productCategory.getCategoryName());
        displayCategory.setDescription(productCategory.getDescription());
        displayCategory.setPartNumber(productCategory.getCategoryPartNumber());
        displayCategory.setCategoryDetailsURL("category/" + productCategory.getCategoryPartNumber());
        return displayCategory;

    }

    @Override
    public DisplayCategory createDisplayCategory(final Category productCategory, final boolean needSubCategory) {

        if (productCategory == null) {
            return null;
        }
        final DisplayCategory displayCategory = createDisplayCategory(productCategory);

        if (needSubCategory) {
            final List<DisplayCategory> subCategoryList = new ArrayList<DisplayCategory>();
            for (final Category productSubCategory : productCategory.getSubCategories()) {
                final DisplayCategory displaySubCategory = createDisplayCategory(productSubCategory);
                subCategoryList.add(displaySubCategory);
            }
            displayCategory.setSubcategoryList(subCategoryList);

        }
        return displayCategory;
    }

    public List<DisplayCategory> getFilterCategoriesForCategory(final Category productCategory) {

        final List<Category> categoryList = productCategoryDAO.fetchAllEnabledCategories(productCategory.getParentCategory().getCategoryId());
        final List<DisplayCategory> filterCategoryList = new ArrayList<DisplayCategory>();
        if(categoryList != null){
            for (final Category category : categoryList) {
                if (!(category.getCategoryId().equals(productCategory.getCategoryId()))) {
                    final DisplayCategory filterCategory = new DisplayCategory();
                    filterCategory.setCategoryId(category.getCategoryId());
                    filterCategory.setPartNumber(category.getCategoryPartNumber());
                    filterCategory.setCategoryName(category.getCategoryName());
                    filterCategory.setCategoryDetailsURL("category/" + category.getCategoryPartNumber());

                    filterCategoryList.add(filterCategory);
                }
            }
        }
        return filterCategoryList;
    }

    @Override
    public DisplayCategoryDetails getDisplayCategoryDetails(final Integer categoryId) {
        DisplayCategoryDetails categoryDetails = new DisplayCategoryDetails();

        final Category productCategory = productCategoryDAO.findByPrimaryKey(categoryId);

    	List<BreadCrumb> breadcrumbList = new LinkedList<BreadCrumb>();
    	if(productCategory.getParentCategory()!=null) {
        	BreadCrumb breadcrumb1 = new BreadCrumb();
        	breadcrumb1.setDisplayText(productCategory.getParentCategory().getCategoryName());
        	breadcrumb1.setLinkUrl("category/"+productCategory.getParentCategory().getCategoryPartNumber());
        	breadcrumbList.add(breadcrumb1);
    	}
    	
    	BreadCrumb breadcrumb2 = new BreadCrumb();
    	breadcrumb2.setDisplayText(productCategory.getCategoryName());
    	breadcrumb2.setLinkUrl("category/"+productCategory.getCategoryPartNumber());
    	breadcrumbList.add(breadcrumb2);
    	
    	categoryDetails.setBreadcrumb(breadcrumbList);

    	// We don't need to get the sub category information while getting category details
        final DisplayCategory selectedCategory = createDisplayCategory(productCategory, false);
        categoryDetails.setSelectedCategory(selectedCategory);

        final Set<Product> categoryProductsSet = productCategory.getProductList();
        final List<DisplayProduct> productDetailsList = new ArrayList<DisplayProduct>();
        for (final Product product : categoryProductsSet) {
        	if(product.isEnabled()){
                final DisplayProduct productDetails = productDataService.getDisplayProduct(product);
                productDetailsList.add(productDetails);
        	}
        }
        if(productCategory.getRootCategoryId()!=null){
            categoryDetails.setProductsList(productDetailsList);
            final List<DisplayCategory> filterCategoryList = getFilterCategoriesForCategory(productCategory);
            if(!filterCategoryList.isEmpty())
            categoryDetails.setFilterCategories(filterCategoryList);
        } else {
            CategoryAttributes categoryAttributes = getCategoryAttributesForCategory(productCategory, true, true, true, false);
            for(CategoryAttributes subcategoryAttributes : categoryAttributes.getSubCategoryList()){
                List<ProductAttributes> productsList = new ArrayList<ProductAttributes>();
            	for(ProductAttributes pa : subcategoryAttributes.getProductsList()){
                	if(pa.getEnabled()){
                		productsList.add(pa);
                	}
            	}
            	subcategoryAttributes.setProductsList(productsList);
            }
            categoryDetails.setCategoryAttributes(categoryAttributes);
        }
        return categoryDetails;
    }

    public List<CategoryView> getAllAvailableRootCategoriesForMetaData() {
        final List<Category> categoryList = productCategoryDAO.fetchAllRootCategories();
        final List<CategoryView> rootCategoryList = new ArrayList<CategoryView>();
        for (final Category rootCategory : categoryList) {
            final CategoryView displayRootCategory = new CategoryView();
            displayRootCategory.setCategoryId(rootCategory.getCategoryId());
            displayRootCategory.setCategoryName(rootCategory.getCategoryName());
            rootCategoryList.add(displayRootCategory);
        }
        return rootCategoryList;
    }
    public List<CategoryView> getAllAvailableSubCategoriesForMetaData() {
        final List<Category> categoryList = productCategoryDAO.fetchAllSubCategories();
        final List<CategoryView> subCategoryList = new ArrayList<CategoryView>();
        for (final Category rootCategory : categoryList) {
            final CategoryView displaySubCategory = new CategoryView();
            displaySubCategory.setCategoryId(rootCategory.getCategoryId());
            displaySubCategory.setCategoryName(rootCategory.getCategoryName());
            subCategoryList.add(displaySubCategory);
        }
        return subCategoryList;
    }

    @Override
    public CategoryAttributes getCategoryAttributesForCategory(final Category category) {

        final CategoryAttributes categoryAttributes = new CategoryAttributes();
        categoryAttributes.setCategoryId(category.getCategoryId());
        categoryAttributes.setCategoryName(category.getCategoryName());
        categoryAttributes.setEnabled(category.isEnabled());
        categoryAttributes.setCategoryPartNumber(category.getCategoryPartNumber());
        categoryAttributes.setCategoryDescription(category.getDescription());

        categoryAttributes.setCategoryMenuImagePath(category.getMenuImagePath());
        categoryAttributes.setCategoryBannerImagePath(category.getBannerImagePath());
        categoryAttributes.setCategoryTileImagePath(category.getTileImagePath());
        categoryAttributes.setCategoryCSSClass(category.getCategoryCSSClass());
        final Category parentCategory = category.getParentCategory();

        if (parentCategory != null) {
            final CategoryView displayParentCategory = new CategoryView();
            displayParentCategory.setCategoryId(parentCategory.getCategoryId());
            displayParentCategory.setCategoryName(parentCategory.getCategoryName());
            categoryAttributes.setRootCategory(displayParentCategory);
        }
        return categoryAttributes;
    }

    @Override
    public CategoryAttributes getCategoryAttributesForCategory(final Category category,
        final boolean includeSubCategories, final boolean includeCategoryProducts,
        final boolean includeSubCategoryProducts, final boolean isAdmin) {
        CategoryAttributes categoryAttributes = getCategoryAttributesForCategory(category);
        // Include category products
        if (includeCategoryProducts) {
            final Set<Product> productSet = category.getProductList();
            final List<ProductAttributes> productAttributesList = productDataService
                .getProductAttributes(new ArrayList<Product>(productSet));
            categoryAttributes.setProductsList(productAttributesList);
        }
        // Include Sub-category details
        if (includeSubCategories) {
            final List<CategoryAttributes> subCategoryAttributesList = new ArrayList<CategoryAttributes>();
            for (final Category productSubCategory : category.getSubCategories()) {
            	if(!isAdmin){
                	if(productSubCategory.isEnabled()){
                        final CategoryAttributes subCategoryAttributes = getCategoryAttributesForCategory(productSubCategory);
                        subCategoryAttributesList.add(subCategoryAttributes);
                        // Include Sub-category products
                        if (includeSubCategoryProducts) {
                            final Set<Product> productSet = productSubCategory.getProductList();
                            final List<ProductAttributes> productAttributesList = productDataService
                                .getProductAttributes(new ArrayList<Product>(productSet));
                            subCategoryAttributes.setProductsList(productAttributesList);
                        }
                	}
	            	} else {
	                    final CategoryAttributes subCategoryAttributes = getCategoryAttributesForCategory(productSubCategory);
	                    subCategoryAttributesList.add(subCategoryAttributes);
	                    // Include Sub-category products
	                    if (includeSubCategoryProducts) {
	                        final Set<Product> productSet = productSubCategory.getProductList();
	                        final List<ProductAttributes> productAttributesList = productDataService
	                            .getProductAttributes(new ArrayList<Product>(productSet));
	                        subCategoryAttributes.setProductsList(productAttributesList);
	                    }
	            	}
            }
            categoryAttributes.setSubCategoryList(subCategoryAttributesList);

        }
        return categoryAttributes;
    }

    @Override
    public CategoryMetaData getCategoryAdminPageMetaData() {
        final CategoryMetaData categoryMetaData = new CategoryMetaData();
        categoryMetaData.setAvaliableRootCategories(getAllAvailableRootCategoriesForMetaData());
        categoryMetaData.setAvailableSubCategories(getAllAvailableSubCategoriesForMetaData());
        return categoryMetaData;
    }

    @Override
    public AdminPageDetails getCategoryProductHierarchyForAdmin() {
        List<CategoryAttributes> categoryAttributeList = new ArrayList<CategoryAttributes>();
        final List<Category> rootCategoryList = productCategoryDAO.fetchAllRootCategories();
        for (final Category rootCategory : rootCategoryList) {
            final CategoryAttributes categoryAttributes = getCategoryAttributesForCategory(rootCategory, true, true, true, true);
            categoryAttributeList.add(categoryAttributes);
        }
        final AdminPageDetails adminPageDetails = new AdminPageDetails();
        adminPageDetails.setCategoryList(categoryAttributeList);
        adminPageDetails.setCategoryMetaData(getCategoryAdminPageMetaData());
        adminPageDetails.setProductMetaData(productDataService.getProductAdminPageMetaData());
//        final PageNavigation navigation = buildNavigationMenu();
//
//        adminPageDetails.setPageNavigation(navigation);
        return adminPageDetails;
    }

    // Admin module save methods
    public SaveStatus saveCategoryData(final CategoryAttributes categoryAttributes) {

        final Category category = new Category();
        SaveStatus st = new SaveStatus();
        category.setCategoryCSSClass(categoryAttributes.getCategoryCSSClass());
        if(categoryAttributes.getCategoryId()!=null)
        category.setCategoryId(categoryAttributes.getCategoryId());
        category.setCategoryName(categoryAttributes.getCategoryName());
        category.setDescription(categoryAttributes.getCategoryDescription());
        if(null == categoryAttributes.getEnabled()) {
            category.setEnabled(false);
        } else {
            category.setEnabled(categoryAttributes.getEnabled());
        }

        category.setTileImagePath(categoryAttributes.getCategoryTileImagePath());
        category.setMenuImagePath(categoryAttributes.getCategoryMenuImagePath());
        category.setBannerImagePath(categoryAttributes.getCategoryBannerImagePath());
        category.setModificationDate(new Date());
        if(categoryAttributes.getRootCategory()!=null){
        	category.setRootCategoryId(categoryAttributes.getRootCategory().getCategoryId());
        }
        
        try {
            productCategoryDAO.saveOrUpdate(category);
            st.setStatusMessage("Success");
            st.setOperationStatus(true);
            st.setId(category.getCategoryId());
        } catch (ConstraintViolationException e) {
            SQLException cause = (SQLException) e.getCause();
            // evaluate cause and find out what was the problem
            st.setStatusMessage("Fail");
            st.setOperationStatus(false);
            System.out.println(cause.getMessage());
        } catch (JDBCConnectionException e) {
            SQLException cause = (SQLException) e.getCause();
            // evaluate cause and find out what was the problem
            st.setStatusMessage("Fail");
            st.setOperationStatus(false);
            System.out.println(cause.getMessage());
        } catch (JDBCException e) {
            SQLException cause = (SQLException) e.getCause();
            // evaluate cause and find out what was the problem
            st.setStatusMessage("Fail");
            st.setOperationStatus(false);
            System.out.println(cause.getMessage());
        }
        return st;

    }
    @Override
	public DisplayAboutUs getAboutUs() {
		final PageNavigation pageNavigation = buildNavigationMenu(null);
		List<AboutUs> content = aboutUsDAO.getAll();
		DisplayAboutUs displayAboutUs = new DisplayAboutUs(); 
		displayAboutUs.setPageNavigation(pageNavigation);
		displayAboutUs.setContent(content.get(0).getContent());
		return displayAboutUs;
	}

	@Override
	public SaveStatus deleteCategoryData(Integer categoryId) {
		final Serializable primaryKey = new Integer(categoryId);
        Category persistentInstance = null;
        try {
            persistentInstance = productCategoryDAO.loadEntityByPrimaryKey(primaryKey);

            if (persistentInstance != null) {
                productCategoryDAO.remove(persistentInstance);
            }
        } catch (DataIntegrityViolationException e) {
            e.printStackTrace();
            if (persistentInstance != null) {
                productCategoryDAO.disableCategory(persistentInstance);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }	

}
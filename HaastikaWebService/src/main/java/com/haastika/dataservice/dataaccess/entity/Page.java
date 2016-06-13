package com.haastika.dataservice.dataaccess.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "PAGE")
public class Page {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    @Column(name = "PAGE_ID", unique = true, nullable = false)
    private Integer pageId;

    @Column(name = "PAGE_NAME")
    private String pageName;
    
    public Integer getPageId() {
        return pageId;
    }

    public void setPageId(Integer pageId) {
        this.pageId = pageId;
    }

    public String getPageName() {
        return pageName;
    }

    public void setPageName(String pageName) {
        this.pageName = pageName;
    }
    @OneToMany(cascade=CascadeType.ALL,fetch=FetchType.LAZY)
    @JoinTable(name="PAGE_LAYOUT_MAPPING", joinColumns={@JoinColumn(name ="PAGE_ID", referencedColumnName ="PAGE_ID")},
        inverseJoinColumns={@JoinColumn(name ="LAYOUT_ID", referencedColumnName ="LAYOUT_ID")})
    private Set<Layout> layouts;

    
    public Set<Layout> getLayouts() {
        return layouts;
    }

    
    public void setLayouts(Set<Layout> layouts) {
        this.layouts = layouts;
    }



}

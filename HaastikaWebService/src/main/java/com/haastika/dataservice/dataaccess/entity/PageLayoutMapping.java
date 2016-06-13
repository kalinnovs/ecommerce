package com.haastika.dataservice.dataaccess.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "PAGE_LAYOUT_MAPPING")
public class PageLayoutMapping implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = -8342585775550122311L;

    public PageLayoutMapping() {
        super();
    }

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    @Column(name = "LAYOUT_MAPPING_ID", unique = true, nullable = false)
    private Integer layoutMappingId;

    public Integer getLayoutMappingId() {
        return layoutMappingId;
    }

    public void setLayoutMappingId(Integer layoutMappingId) {
        this.layoutMappingId = layoutMappingId;
    }

    @Column(name = "LAYOUT_ID")
    private Integer layoutId;

    @ManyToOne
    @JoinColumn(name = "PAGE_ID", insertable = false, updatable = false)
    private Page page;

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public Integer getLayoutId() {
        return layoutId;
    }

    public void setLayoutId(Integer layoutId) {
        this.layoutId = layoutId;
    }

}

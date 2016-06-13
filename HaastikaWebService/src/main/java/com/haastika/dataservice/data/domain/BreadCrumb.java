package com.haastika.dataservice.data.domain;

import java.io.Serializable;

public class BreadCrumb implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -950004115287150740L;
	private String displayText;
	private String linkUrl;
	
	public String getDisplayText() {
		return displayText;
	}
	public void setDisplayText(String displayText) {
		this.displayText = displayText;
	}
	public String getLinkUrl() {
		return linkUrl;
	}
	public void setLinkUrl(String linkUrl) {
		this.linkUrl = linkUrl;
	}

}

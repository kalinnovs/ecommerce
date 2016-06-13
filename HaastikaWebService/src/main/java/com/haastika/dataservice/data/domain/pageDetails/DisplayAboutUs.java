package com.haastika.dataservice.data.domain.pageDetails;

import com.haastika.dataservice.data.domain.PageNavigation;

public class DisplayAboutUs {
	private PageNavigation pageNavigation;
	private String content;
	
	public PageNavigation getPageNavigation() {
		return pageNavigation;
	}
	public void setPageNavigation(PageNavigation pageNavigation) {
		this.pageNavigation = pageNavigation;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}

}

package com.haastika.dataservice.data.domain.tileManagement;

import java.io.Serializable;

public class PageLayoutDetail implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = -2559877992686954232L;
    private LayoutDetails layout2;
    private LayoutDetails layout3;
    private LayoutDetails layout4;
    private LayoutDetails layout5;
    private LayoutDetails layout6;

	public LayoutDetails getLayout2() {
		return layout2;
	}
	public void setLayout2(LayoutDetails layout2) {
		this.layout2 = layout2;
	}
	public LayoutDetails getLayout3() {
		return layout3;
	}
	public void setLayout3(LayoutDetails layout3) {
		this.layout3 = layout3;
	}
	public LayoutDetails getLayout4() {
		return layout4;
	}
	public void setLayout4(LayoutDetails layout4) {
		this.layout4 = layout4;
	}
	public LayoutDetails getLayout5() {
		return layout5;
	}
	public void setLayout5(LayoutDetails layout5) {
		this.layout5 = layout5;
	}
	public LayoutDetails getLayout6() {
		return layout6;
	}
	public void setLayout6(LayoutDetails layout6) {
		this.layout6 = layout6;
	}
}

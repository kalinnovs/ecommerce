package com.haastika.dataservice.dataaccess.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ABOUT_US")
public class AboutUs implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -898326556711168757L;
    @Id
    @Column(name = "CONTENT")
    private String content;
    
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}

}

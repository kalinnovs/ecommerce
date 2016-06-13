package com.haastika.dataservice.data.domain.category;


public class SaveStatus {
    private String statusMessage;
    private boolean operationStatus;
    private Integer id;
    
    public boolean isOperationStatus() {
        return operationStatus;
    }
    public void setOperationStatus(boolean operationStatus) {
        this.operationStatus = operationStatus;
    }
    public String getStatusMessage() {
        return statusMessage;
    }
    public void setStatusMessage(String statusMessage) {
        this.statusMessage = statusMessage;
    }
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

}

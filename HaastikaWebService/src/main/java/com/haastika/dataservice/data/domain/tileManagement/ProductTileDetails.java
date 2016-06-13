package com.haastika.dataservice.data.domain.tileManagement;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.haastika.dataservice.data.domain.product.DisplayProduct;

@JsonInclude(Include.NON_NULL)
public class ProductTileDetails extends TileDetails  implements Serializable{

    /**
     * 
     */
    private static final long serialVersionUID = -1191052869226937402L;
    
    private DisplayProduct productTileDetails;
    public DisplayProduct getProductTileDetails() {
        return productTileDetails;
    }
    public void setProductTileDetails(DisplayProduct productTileDetails) {
        this.productTileDetails = productTileDetails;
    }



}


/*

MariaDB [onlineshop2026]> desc product1;
+---------------------+--------------+------+-----+---------+----------------+
| Field               | Type         | Null | Key | Default | Extra          |
+---------------------+--------------+------+-----+---------+----------------+
| rowId               | int(11)      | NO   | PRI | NULL    | auto_increment |
| productName         | varchar(50)  | YES  |     | NULL    |                |
| productUUID         | varchar(36)  | YES  |     | NULL    |                |
| productPricePerUnit | double       | YES  |     | NULL    |                |
| productDescription  | varchar(100) | YES  |     | NULL    |                |
+---------------------+--------------+------+-----+---------+----------------+
5 rows in set (0,001 sec)




*/

package com.stanislavsavolainen.onlineshop2026p1.shop_web_sevice.database_model;

import jakarta.persistence.Column;

//import jakarta.persistence.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "product1")
public class ProductModel1 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "row_id")
    int id;

    @Column(name = "productName")
    String productName;

    public String getProductName() {
        return this.productName;
    }

    public void setProductName(String paramProductName) {
        this.productName = paramProductName;
    }

    @Column(name = "productUUD")
    String uuid;

    public String getProductUUID() {
        return this.uuid;
    }

    public void setProductUUID(String paramUUID) {
        this.uuid = paramUUID;

    }


    public String getModelAsJSON(){
        String result = "";

        result += "{\"rowId\" : " + this.id + "," ;
        result += "\"productName\" : \"" + this.productName + "\" ," ;
        result += "{\"productUUID\" : \"" + this.uuid + "\" }" ;

        return result;
    }


}

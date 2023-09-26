/*

mysql> desc shopProduct1;
+---------------------------+----------------+------+-----+---------+----------------+
| Field                     | Type           | Null | Key | Default | Extra          |
+---------------------------+----------------+------+-----+---------+----------------+
| rowId                     | int(11)        | NO   | PRI | NULL    | auto_increment |
| productName               | varchar(500)   | YES  |     | NULL    |                |
| productType               | int(11)        | YES  |     | NULL    |                |
| productImageURL           | varchar(500)   | YES  |     | NULL    |                |
| productDescription        | varchar(10000) | YES  |     | NULL    |                |
| productPricePerUnit       | double         | YES  |     | NULL    |                |
| productQuantity           | smallint(6)    | YES  |     | NULL    |                |
| productQuantityOption     | varchar(500)   | YES  |     | NULL    |                |
| shippingInfo              | varchar(500)   | YES  |     | NULL    |                |
| shippingPriceSameCountry  | double         | YES  |     | NULL    |                |
| shippingPriceEurope       | double         | YES  |     | NULL    |                |
| shippingPriceWorld        | double         | YES  |     | NULL    |                |
| sellerUUID                | varchar(36)    | YES  |     | NULL    |                |
| sellerQualityScore        | double         | YES  |     | NULL    |                |
| productQualityScore       | double         | YES  |     | NULL    |                |
| productFeedback           | varchar(10000) | YES  |     | NULL    |                |
| buyerUUID                 | varchar(36)    | YES  |     | NULL    |                |
| buyerQualityScore         | double         | YES  |     | NULL    |                |
| buyerQualityInfoVSProduct | varchar(500)   | YES  |     | NULL    |                |
| productCreated            | datetime       | YES  |     | NULL    |                |
| productClosed             | datetime       | YES  |     | NULL    |                |
| productWarrantyAndRefund  | varchar(500)   | YES  |     | NULL    |                |
| productPublicVisible      | tinyint(4)     | YES  |     | NULL    |                |
| adminInfo                 | varchar(500)   | YES  |     | NULL    |                |
+---------------------------+----------------+------+-----+---------+----------------+
24 rows in set (0,00 sec)

*/



//src/main/java/com/example/springboot_demo4/ProductModel1.java

package com.example.springboot_demo4;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="shopProduct1")
public class ProductModel1 {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="rowId")
	int id;

	@Column(name="productName")
	String productName;

	@Column(name="productType")
	int productType;

	//.... toDO : all parameters correspond database table shopProduct1



	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getProductName() {
		return productName;
	}

	public void setProduct(String paramProductName) {
		productName = paramProductName;
	}

	public Integer getProductType() {
		return productType;
	}

	public void setProductType(Integer paramProductType) {
		productType = paramProductType;
	}

	//..... toDO : Write more getters and setters for each parameter described above



	public String getModelAsJSON(){
		String result = "";
		String localValue = "Model is not wotking, implementation not done"
		result += "\"info\":"+"\""+ localValue + "\""+"}";
	}

}




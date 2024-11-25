/*
mysql> desc shop_product1;
+-----------------------------+--------------+------+-----+---------+----------------+
| Field                       | Type         | Null | Key | Default | Extra          |
+-----------------------------+--------------+------+-----+---------+----------------+
| row_id                      | int(11)      | NO   | PRI | NULL    | auto_increment |
| admin_info                  | varchar(255) | YES  |     | NULL    |                |
| buyer_quality_infovsproduct | varchar(255) | YES  |     | NULL    |                |
| buyer_quality_score         | double       | YES  |     | NULL    |                |
| buyeruuid                   | varchar(255) | YES  |     | NULL    |                |
| product_closed              | datetime     | YES  |     | NULL    |                |
| product_created             | datetime     | YES  |     | NULL    |                |
| product_description         | varchar(255) | YES  |     | NULL    |                |
| product_feedback            | varchar(255) | YES  |     | NULL    |                |
| product_imageurl            | varchar(255) | YES  |     | NULL    |                |
| product_name                | varchar(255) | YES  |     | NULL    |                |
| product_price_per_unit      | double       | YES  |     | NULL    |                |
| product_public_visible      | int(11)      | YES  |     | NULL    |                |
| product_quality_score       | double       | YES  |     | NULL    |                |
| product_quantity            | int(11)      | YES  |     | NULL    |                |
| product_quantity_option     | varchar(255) | YES  |     | NULL    |                |
| product_type                | int(11)      | YES  |     | NULL    |                |
| productuuid                 | varchar(255) | YES  |     | NULL    |                |
| product_warranty_and_refund | varchar(255) | YES  |     | NULL    |                |
| seller_quality_score        | double       | YES  |     | NULL    |                |
| selleruuid                  | varchar(255) | YES  |     | NULL    |                |
| shipping_info               | varchar(255) | YES  |     | NULL    |                |
| shipping_price_europe       | double       | YES  |     | NULL    |                |
| shipping_price_same_country | double       | YES  |     | NULL    |                |
| shipping_price_world        | double       | YES  |     | NULL    |                |
| shipping_data_warehouse     | varchar(255) | YES  |     | NULL    |                |
+-----------------------------+--------------+------+-----+---------+----------------+
26 rows in set (0,09 sec)

*/



//src/main/java/com/example/springboot_demo4/ProductModel1.java

package com.example.springboot_demo4;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import java.util.Date;

@Entity
@Table(name="shopProduct1")
public class ProductModel1 {


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="row_id")
	int id;

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	//=====================================================

	@Column(name="product_name")
	String productName;

	public String getProductName() {
		return this.productName;
	}

	public void setProductName(String paramProductName) {
		this.productName = paramProductName;
	}

	//=====================================================

	@Column(name="product_type")
	int productType;

	public Integer getProductType() {
		return this.productType;
	}

	public void setProductType(Integer paramProductType) {
		this.productType = paramProductType;
	}

	//=====================================================

	@Column(name="product_imageurl")
	String productImageURL; 

	public String getProductImageURL() {
		return this.productImageURL;
	}

	public void setProductImageURL(String paramProductImageURL) {
		this.productImageURL = paramProductImageURL;
	}

	//=====================================================

	@Column(name="product_description")	
	String productDescription; 

	public String getProductDescription() {
		return this.productDescription;
	}

	public void setProductDescription(String paramProductDescription) {
		this.productDescription = paramProductDescription;
	}

	//=====================================================

	@Column(name="product_price_per_unit")
	double productPricePerUnit;

	public double getProductPricePerUnit() {
		return this.productPricePerUnit;
	}

	public void setProductPricePerUnit(double paramProductPricePerUnit) {
		this.productPricePerUnit = paramProductPricePerUnit;
	}

	//=====================================================

	@Column(name="product_quantity")
	int productQuantity;

	public double getProductQuantity() {
		return this.productQuantity;
	}

	public void setProductQuantity(Integer paramProductQuantity) {
		this.productQuantity = paramProductQuantity;
	}


	//=====================================================

	@Column(name="product_quantity_option")
	String productQuantityOption;

	public String getProductQuantityOption() {
		return this.productQuantityOption;
	}

	public void setProductQuantityOption(String paramProductQuantityOption) {
		this.productQuantityOption = paramProductQuantityOption;
	}

	//=====================================================

	@Column(name="shipping_info")
	String shippingInfo;

	public String getShippingInfo() {
		return this.shippingInfo;
	}

	public void setShippingInfo(String paramShippingInfo) {
		this.shippingInfo = paramShippingInfo;
	}

	//=====================================================

	@Column(name="shipping_price_same_country")
	double shippingPriceSameCountry;

	public double getShippingPriceSameCountry() {
		return this.shippingPriceSameCountry;
	}

	public void setShippingPriceSameCountry(double paramShippingPriceSameCountry) {
		this.shippingPriceSameCountry = paramShippingPriceSameCountry;
	}

	//=====================================================

	@Column(name="shipping_price_europe")
	double shippingPriceEurope;

	public double getShippingPriceEurope() {
		return this.shippingPriceEurope;
	}

	public void setShippingPriceEurope(double paramShippingPriceEurope) {
		this.shippingPriceEurope = paramShippingPriceEurope;
	}

	//=====================================================

	@Column(name="shipping_price_world")
	double shippingPriceWorld;

	public double getShippingPriceWorld() {
		return this.shippingPriceWorld;
	}

	public void setShippingPriceWorld(double paramShippingPriceWorld) {
		this.shippingPriceWorld = paramShippingPriceWorld;
	}


	//=====================================================

	@Column(name="selleruuid")
 	String sellerUUID;

	public String getSellerUUID() {
		return this.sellerUUID;
	}

	public void setSellerUUID(String paramSellerUUID) {
		this.sellerUUID = paramSellerUUID;
	}

	//=====================================================

	@Column(name="seller_quality_score")
	double sellerQualityScore;

	public double getSellerQualityScore() {
		return this.sellerQualityScore;
	}

	public void setSellerQualityScore(double paramSellerQualityScore) {
		this.sellerQualityScore = paramSellerQualityScore;
	}

	//=====================================================

	@Column(name="product_quality_score")
	double productQualityScore;

	public double getProductQualityScore() {
		return this.productQualityScore;
	}

	public void setProductQualityScore(double paramProductQualityScore) {
		this.productQualityScore = paramProductQualityScore;
	}

	//=====================================================

	@Column(name="product_feedback")
	String productFeedback; 

	public String getProductFeedback() {
		return this.productFeedback;
	}

	public void setProductFeedback(String paramProductFeedback) {
		this.productFeedback = paramProductFeedback;
	}

	//=====================================================              

	@Column(name="buyeruuid")
	String buyerUUID; 

	public String getBuyerUUID() {
		return this.buyerUUID;
	}

	public void setbuyerUUID(String paramBuyerUUID) {
		this.buyerUUID = paramBuyerUUID;
	}

	//=====================================================

	@Column(name="buyer_quality_score")
	double buyerQualityScore;

	public double getBuyerQualityScore() {
		return this.buyerQualityScore;
	}

	public void setBuyerQualityScore(double paramBuyerQualityScore) {
		this.buyerQualityScore = paramBuyerQualityScore;
	}

	//=====================================================

	@Column(name="buyer_quality_infovsproduct")
 	String buyerQualityInfoVSProduct;

	public String getBuyerQualityInfoVSProduct() {
		return this.buyerQualityInfoVSProduct;
	}

	public void setBuyerQualityInfoVSProduct(String paramBuyerQualityInfoVSProduct) {
		this.buyerQualityInfoVSProduct = paramBuyerQualityInfoVSProduct;
	}

	//===================================================== 

	@Column(name="product_created")
	Date productCreated;

	public Date getProductCreated() {
		return this.productCreated;
	}

	public void setProductCreated(Date paramProductCreated) {
		this.productCreated = paramProductCreated;
	}

	//=====================================================

	@Column(name="product_closed")
	Date productClosed;

	public Date getProductClosed() {
		return this.productClosed;
	}

	public void setProductClosed(Date paramProductClosed) {
		this.productClosed = paramProductClosed;
	}

	//=====================================================

	@Column(name="product_warranty_and_refund")
	String productWarrantyAndRefund;

	public String getProductWarrantyAndRefund() {
		return this.productWarrantyAndRefund;
	}

	public void setProductWarrantyAndRefund(String paramProductWarrantyAndRefund) {
		this.productWarrantyAndRefund = paramProductWarrantyAndRefund;
	}

	//=====================================================
	
	@Column(name="product_public_visible")
	int productPublicVisible;

	public Integer getProductPublicVisible() {
		return this.productPublicVisible;
	}

	public void setProductPublicVisible(Integer paramId) {
		this.productPublicVisible = paramId;
	}

	//=====================================================

	@Column(name="admin_info")
	String adminInfo;

	public String getAdminInfo() {
		return this.adminInfo;
	}

	public void setAdminInfo(String paramAdminInfo) {
		this.adminInfo = paramAdminInfo;
	}

	//=====================================================

	@Column(name="productuuid")
	String productUUID;

	public String getProductUUID() {
		return this.productUUID;
	}

	public void setProductUUID(String paramProductUUID) {
		this.productUUID = paramProductUUID;
	}

	//=====================================================

	@Column(name="shipping_data_warehouse")
	String shippingDataWareHouse;

	public String getShippingDataWareHouse() {
		return this.shippingDataWareHouse;
	}

	public void setShippingDataWareHouse(String paramShippingDataWareHouse) {
		this.shippingDataWareHouse = paramShippingDataWareHouse;
	}

	//=====================================================
	
	public String getModelAsJSON(){
		
		String result = "";
		result += "{\"rowId\":"+this.id+",";
		result += "\"productName\":"+"\""+ this.productName + "\""+",";
		result += "\"productImageURL\":"+"\""+ this.productImageURL + "\""+",";
		result += "\"productDescription\":"+"\""+ this.productDescription + "\""+",";
		result += "\"productPricePerUnit\":"+"\""+ this.productPricePerUnit + "\""+",";
		result += "\"productQuantity\":"+"\""+ this.productQuantity + "\""+",";
		result += "\"productQuantityOption\":"+"\""+ this.productQuantityOption + "\""+",";
		result += "\"shippingInfo \":"+"\""+ this.shippingInfo  + "\""+",";
		result += "\"shippingPriceSameCountry\":"+"\""+ this.shippingPriceSameCountry + "\""+",";
		result += "\"shippingPriceEurope\":"+"\""+ this.shippingPriceEurope + "\""+",";
		result += "\"shippingPriceWorld\":"+"\""+ this.shippingPriceWorld + "\""+",";
		result += "\"shippingDataWareHouse\":" + "\"" + this.shippingDataWareHouse  + "\"" + ",";
		result += "\"sellerUUID\":"+"\""+ this.sellerUUID + "\""+",";
		result += "\"sellerQualityScore\":"+"\""+ this.sellerQualityScore+ "\""+",";
		result += "\"productQualityScore\":"+"\""+ this.productQualityScore + "\""+",";
		result += "\"productFeedback\":"+"\""+ this.productFeedback + "\""+",";
		result += "\"buyerUUID \":"+"\""+ this.buyerUUID  + "\""+",";
		result += "\"buyerQualityScore\":"+"\""+ this.buyerQualityScore + "\""+",";
		result += "\"buyerQualityInfoVSProduct\":"+"\""+ this.buyerQualityInfoVSProduct + "\""+",";
		result += "\"productCreated\":"+"\""+ this.productCreated + "\""+",";
		result += "\"productClosed\":"+"\""+ this.productClosed + "\""+",";
		result += "\"productWarrantyAndRefund\":"+"\""+ this.productWarrantyAndRefund + "\""+",";
		result += "\"productPublicVisible\":"+"\""+ this.productPublicVisible + "\""+",";
		result += "\"adminInfo\":"+"\""+ this.adminInfo + "\""+",";
		result += "\"productUUID\":"+"\""+ this.productUUID + "\""+",";
		String lastparam = "not defined!";
		result += "\"lastparam\":"+"\""+ lastparam + "\""+"}";

		return result;

	}
	
}




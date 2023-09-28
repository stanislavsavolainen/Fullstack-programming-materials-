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

import java.util.Date;

@Entity
@Table(name="shopProduct1")
public class ProductModel1 {


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="rowId")
	int id;

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	//=====================================================

    @Column(name="productName")
	String productName;

	public String getProductName() {
		return this.productName;
	}

	public void setProductName(String paramProductName) {
		this.productName = paramProductName;
	}

	//=====================================================

    @Column(name="productType")
	int productType;

	public Integer getProductType() {
		return this.productType;
	}

	public void setProductType(Integer paramProductType) {
		this.productType = paramProductType;
	}

	//=====================================================

	@Column(name="productImageURL")
	String productImageURL; 

	public String getProductImageURL() {
		return this.productImageURL;
	}

	public void setProductImageURL(String paramProductImageURL) {
		this.productImageURL = paramProductImageURL;
	}

	//=====================================================

	@Column(name="productDescription")	
	String productDescription; 

	public String getProductDescription() {
		return this.productDescription;
	}

	public void setProductDescription(String paramProductDescription) {
		this.productDescription = paramProductDescription;
	}

	//=====================================================

	@Column(name="productPricePerUnit")
	double productPricePerUnit;

	public double getProductPricePerUnit() {
		return this.productPricePerUnit;
	}

	public void setProductPricePerUnit(String paramProductPricePerUnit) {
		this.productPricePerUnit = paramProductPricePerUnit;
	}

	//=====================================================

	@Column(name="productQuantity")
	int productQuantity;

	public double getProductQuantity() {
		return this.productQuantity;
	}

	public void setProductQuantity(Integer paramProductQuantity) {
		this.productQuantity = paramProductQuantity;
	}


	//=====================================================

	@Column(name="productQuantityOption")
	String productQuantityOption;

	public String getProductQuantityOption() {
		return this.productQuantityOption;
	}

	public void setProductQuantityOption(String paramProductQuantityOption) {
		this.productQuantityOption = paramProductQuantityOption;
	}

	//=====================================================

	@Column(name="shippingInfo")
	String shippingInfo;

	public String getShippingInfo() {
		return this.shippingInfo;
	}

	public void setShippingInfo(String paramShippingInfo) {
		this.shippingInfo = paramShippingInfo;
	}

	//=====================================================

	@Column(name="shippingPriceSameCountry")
	double shippingPriceSameCountry;

	public double getShippingPriceSameCountry() {
		return this.shippingPriceSameCountry;
	}

	public void setShippingPriceSameCountry(double paramShippingPriceSameCountry) {
		this.shippingPriceSameCountry = paramShippingPriceSameCountry;
	}

	//=====================================================

	@Column(name="shippingPriceEurope")
	double shippingPriceEurope;

	public double getShippingPriceEurope() {
		return this.shippingPriceEurope;
	}

	public void setShippingPriceEurope(double paramShippingPriceEurope) {
		this.shippingPriceEurope = paramShippingPriceEurope;
	}

	//=====================================================

	@Column(name="shippingPriceWorld")
	double shippingPriceWorld;

	public double getShippingPriceWorld() {
		return this.shippingPriceWorld;
	}

	public void setShippingPriceWorld(double paramShippingPriceWorld) {
		this.shippingPriceWorld = paramShippingPriceWorld;
	}


	//=====================================================

	@Column(name="sellerUUID")
 	String sellerUUID;

	public String getSellerUUID() {
		return this.sellerUUID;
	}

	public void setSellerUUID(String paramSellerUUID) {
		this.sellerUUID = paramSellerUUID;
	}

	//=====================================================

	@Column(name="sellerQualityScore")
	double sellerQualityScore;

	public double getShippingPriceWorld() {
		return this.sellerQualityScore;
	}

	public void setShippingPriceWorld(double paramSellerQualityScore) {
		this.sellerQualityScore = paramSellerQualityScore;
	}

	//=====================================================

	@Column(name="productQualityScore")
	double productQualityScore;

	public double getShippingPriceWorld() {
		return this.productQualityScore;
	}

	public void setShippingPriceWorld(double paramProductQualityScore) {
		this.productQualityScore = paramProductQualityScore;
	}

	//=====================================================

	@Column(name="productFeedback")
	String productFeedback; 

	public String getProductFeedback() {
		return this.productFeedback;
	}

	public void setProductFeedback(String paramProductFeedback) {
		this.productFeedback = paramProductFeedback;
	}

	//=====================================================              

	@Column(name="buyerUUID")
	String buyerUUID; 

	public String getBuyerUUID() {
		return this.buyerUUID;
	}

	public void setbuyerUUID(String paramBuyerUUID) {
		this.buyerUUID = paramBuyerUUID;
	}

	//=====================================================

	@Column(name="buyerQualityScore")
	double buyerQualityScore;

	public double getBuyerQualityInfoVSProduct() {
		return this.buyerQualityScore;
	}

	public void setBuyerQualityInfoVSProduct(double paramBuyerQualityScore) {
		this.buyerQualityScore = paramBuyerQualityScore;
	}

	//=====================================================

	@Column(name="buyerQualityInfoVSProduct")
 	String buyerQualityInfoVSProduct;

	public String getBuyerQualityInfoVSProduct() {
		return this.buyerQualityInfoVSProduct;
	}

	public void setBuyerQualityInfoVSProduct(String paramBuyerQualityInfoVSProduct) {
		this.buyerQualityInfoVSProduct = paramBuyerQualityInfoVSProduct;
	}

	//===================================================== 

	@Column(name="productCreated")
	Date productCreated;

	public Date getProductCreated() {
		return this.productCreated;
	}

	public void setProductCreated(Date paramProductCreated) {
		this.productCreated = paramProductCreated;
	}

	//=====================================================

	@Column(name="productClosed")
	Date productClosed;

	public Date getProductClosed() {
		return this.productClosed;
	}

	public void setProductClosed(Date paramProductClosed) {
		this.productClosed = paramProductClosed;
	}

	//=====================================================

	@Column(name="productWarrantyAndRefund")
	String productWarrantyAndRefund;

	public String getProductWarrantyAndRefund() {
		return this.productWarrantyAndRefund;
	}

	public void setProductWarrantyAndRefund(String paramProductWarrantyAndRefund) {
		this.productWarrantyAndRefund = paramProductWarrantyAndRefund;
	}

	//=====================================================
	
	@Column(name="productPublicVisible")
	int productPublicVisible;

	public Integer getProductPublicVisible() {
		return this.productPublicVisible;
	}

	public void setProductPublicVisible(Integer paramId) {
		this.productPublicVisible = paramId;
	}

	//=====================================================

	@Column(name="adminInfo")
	String adminInfo;

	public String getAdminInfo() {
		return this.adminInfo;
	}

	public void setAdminInfo(String paramAdminInfo) {
		this.adminInfo = paramAdminInfo;
	}

	//=====================================================

	public String getModelAsJSON(){
		String result = "";
		String localValue = "Model is not wotking, implementation not done";
		result += "\"info\":"+"\""+ localValue + "\""+"}";
	}

}




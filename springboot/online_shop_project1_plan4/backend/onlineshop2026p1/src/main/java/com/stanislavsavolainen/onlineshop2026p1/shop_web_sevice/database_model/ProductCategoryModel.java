/*
mysql> desc product_category;
+-------------------------------+--------------+------+-----+---------+----------------+
| Field                         | Type         | Null | Key | Default | Extra          |
+-------------------------------+--------------+------+-----+---------+----------------+
| row_id                        | int(11)      | NO   | PRI | NULL    | auto_increment |
| product_type                  | int(11)      | YES  |     | NULL    |                |
| product_category_name         | varchar(500) | YES  |     | NULL    |                |
| product_parrent_type          | int(11)      | YES  |     | NULL    |                |
| product_parrent_category_name | varchar(500) | YES  |     | NULL    |                |
+-------------------------------+--------------+------+-----+---------+----------------+
5 rows in set (0,00 sec)


*/

package com.stanislavsavolainen.onlineshop2026p1.shop_web_sevice.database_model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="product_category")
public class ProductCategoryModel {

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

	@Column(name="product_type")
	int productType;

	public Integer getProductType() {
		return this.productType;
	}

	public void setProductType(Integer paramProductType) {
		this.productType = paramProductType;
	}

	//=====================================================

	@Column(name="product_category_name")
	String productCategoryName;

	public String getProductCategoryName() {
		return this.productCategoryName;
	}

	public void setProductCategoryName(String paramProductCategoryName) {
		this.productCategoryName = paramProductCategoryName;
	}

	//=====================================================

	@Column(name="product_parrent_type")
	int productParrentType;

	public Integer getProductParrentType() {
		return this.productParrentType;
	}

	public void setProductParrentType(Integer paramProductParrentType) {
		this.productParrentType = paramProductParrentType;
	}

	//=====================================================

	@Column(name="product_parrent_category_name")
	String productParrentCategoryName;

	public String getProductParrentCategoryName() {
		return this.productParrentCategoryName;
	}

	public void setProductParrentCategoryName(String paramProductParrentCategoryName) {
		this.productParrentCategoryName = paramProductParrentCategoryName;
	}

}


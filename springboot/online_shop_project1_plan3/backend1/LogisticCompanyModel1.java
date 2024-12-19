
/*
mysql> DESC logistic_company1;
+----------------------------------------+--------------+------+-----+---------+----------------+
| Field                                  | Type         | Null | Key | Default | Extra          |
+----------------------------------------+--------------+------+-----+---------+----------------+
| row_id                                 | int(11)      | NO   | PRI | NULL    | auto_increment |
| name                                   | varchar(100) | YES  |     | NULL    |                |
| company_id                             | varchar(36)  | YES  |     | NULL    |                |
| transition_price                       | double       | YES  |     | NULL    |                |
| standalone_price                       | double       | YES  |     | NULL    |                |
| info                                   | varchar(255) | YES  |     | NULL    |                |
| general_logistic_delay_time_in_seconds | int(11)      | YES  |     | NULL    |                |
| company_is_blacklisted                 | tinyint(4)   | YES  |     | NULL    |                |
| company_reputation                     | varchar(255) | YES  |     | NULL    |                |
| company_trust_rate                     | int(11)      | YES  |     | NULL    |                |
| parcel_center_address                  | varchar(255) | YES  |     | NULL    |                |
+----------------------------------------+--------------+------+-----+---------+----------------+
11 rows in set (0,07 sec)

*/

package com.example.springboot_demo4;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="logistic_company1")
public class LogisticCompanyModel1 {

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

	@Column(name="name")
	String companyName;

	public String getCompanyName() {
		return this.companyName;
	}

	public void setCompanyName(String paramCompanyName) {
		this.companyName = paramCompanyName;
	}

	@Column(name="company_id")
	String companyId;

	public String getCompanyId() {
		return this.companyId;
	}

	public void setCompanyId(String paramCompanyId) {
		this.companyId = paramCompanyId;
	}

	@Column(name="transition_price")
	double transitionPrice;

	public double getTransitionPrice() {
		return this.transitionPrice;
	}

	public void setTransitionPrice(double paramTransitionPrice) {
		this.transitionPrice = paramTransitionPrice;
	}

	@Column(name="standalone_price")
	double standalonePrice;

	public double getStandalonePrice() {
		return this.standalonePrice;
	}

	public void setStandalonePrice(double paramStandalonePrice) {
		this.standalonePrice = paramStandalonePrice;
	}
	
	@Column(name="info")
	String companyInfo;

	public String getCompanyInfo() {
		return this.companyInfo;
	}

	public void setCompanyInfo(String paramCompanyInfo) {
		this.companyInfo = paramCompanyInfo;
	}

	@Column(name="general_logistic_delay_time_in_seconds")
	int companyLogisticDelay;

	public Integer getCompanyLogisticDelay() {
		return this.companyLogisticDelay;
	}

	public void setParamCompanyLogisticDelay(Integer paramCompanyLogisticDelay) {
		this.companyLogisticDelay = paramCompanyLogisticDelay;
	}

	@Column(name="company_is_blacklisted")
	char blocked;

	@Column(name="company_reputation")
	String companyReputation;

	public String getCompanyReputation() {
		return this.companyReputation;
	}

	public void setCompanyReputation(String paramCompanyReputation) {
		this.companyReputation = paramCompanyReputation;
	}

	@Column(name="company_trust_rate")
	int trustRate;

	public Integer getTrustRate() {
		return this.trustRate;
	}

	public void setTrustRate(Integer paramTrustRate ) {
		this.trustRate = paramTrustRate;
	}

	@Column(name="parcel_center_address")
	String companyAddress;

	public String getCompanyAddress() {
		return this.companyAddress;
	}

	public void setCompanyAddress(String paramCompanyAddress) {
		this.companyAddress = paramCompanyAddress;
	}

}
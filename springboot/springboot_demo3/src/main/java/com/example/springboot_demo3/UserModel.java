/*

mysql> desc user_table1;
+-----------------------+--------------+------+-----+---------+----------------+
| Field                 | Type         | Null | Key | Default | Extra          |
+-----------------------+--------------+------+-----+---------+----------------+
| row_id                | int          | NO   | PRI | NULL    | auto_increment |
| user_uuid             | varchar(36)  | YES  |     | NULL    |                |
| password_hash_sha256  | varchar(64)  | YES  |     | NULL    |                |
| user_is_blocked       | tinyint      | YES  |     | NULL    |                |
| user_permission_level | tinyint      | YES  |     | NULL    |                |
| user_is_online        | tinyint      | YES  |     | NULL    |                |
| registered_date       | datetime     | YES  |     | NULL    |                |
| last_online_date      | datetime     | YES  |     | NULL    |                |
| user_maintenance_info | varchar(500) | YES  |     | NULL    |                |
| username              | varchar(40)  | YES  |     | NULL    |                |
+-----------------------+--------------+------+-----+---------+----------------+
10 rows in set (0,25 sec)


*/

package com.example.springboot_demo3;



//Library before Java 11 ( or external import)
//https://stackoverflow.com/questions/37327697/spring-boot-javax-import-statements-not-working-correctly
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import java.util.Date;

/*
//Library after Java 11

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;



//org.hibernate.javax.persistence
import org.hibernatejavax.persistence.Column;
import org.hibernate.javax.persistence.Entity;
import org.hibernate.javax.persistence.GeneratedValue;
import org.hibernate.javax.persistence.GenerationType;
import org.hibernate.javax.persistence.Id;
import org.hibernate.javax.persistence.Table;
*/

@Entity
@Table(name="user_table1")
public class UserModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="row_id")
	int id;
	
	@Column(name="user_uuid")
	String uuid;
	
	@Column(name="username")
	String username;

	@Column(name="password_hash_sha256")
	String password;
	
	@Column(name="user_is_blocked")
	char blocked;
	
	@Column(name="user_permission_level")
	char permission;
	
	@Column(name="user_is_online")
	char isonline;
	
	@Column(name="registered_date")
	Date registereddate;
	
	@Column(name="last_online_date")
	Date lastonlinedate;
	
	@Column(name="user_maintenance_info")
	String maintenance;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public char getBlocked() {
		return blocked;
	}

	public void setBlocked(char blocked) {
		this.blocked = blocked;
	}
	
	public char getPermission() {
		return permission;
	}

	public void setPermission(char permission) {
		this.permission = permission;
	}	

	public char getIsonline() {
		return isonline;
	}

	public void setIsonline(char isonline) {
		this.isonline = isonline;
	}	
	
	public Date getRegistereddate() {
		return registereddate;
	}

	public void setRegistereddate(Date registereddate) {
		this.registereddate = registereddate;
	}
	
	public Date getLastonlinedate() {
		return lastonlinedate;
	}

	public void setLastonlinedate(Date lastonlinedate) {
		this.lastonlinedate = lastonlinedate;
	}
		
	public String getMaintenance() {
		return maintenance;
	}

	public void setMaintenance(String maintenance) {
		this.maintenance = maintenance;
	}
	
	
	public String getModelAsJSON(){
	
		String result = "";
		result += "{\"id\":"+id+",";
		result += "\"uuid\":"+"\""+ uuid + "\""+",";
		result += "\"username\":"+"\""+ username + "\""+",";
		result += "\"password\":"+"\""+ password + "\""+",";
		result += "\"blocked\":"+"\""+ blocked + "\""+",";
		result += "\"permission\":"+"\""+ permission + "\""+",";
		result += "\"isonline\":"+"\""+ isonline + "\""+",";
		result += "\"registereddate\":"+"\""+ registereddate + "\""+",";
		result += "\"lastonlinedate\":"+"\""+ lastonlinedate + "\""+",";
		result += "\"maintenance\":"+"\""+ maintenance + "\""+"}";
		
		return result;
	}
	
}
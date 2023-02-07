package com.example.springboot_demo3;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="msg1")
public class MsgModel {
	
	
	/*

	mysql> desc msg1;
	+---------+--------------+------+-----+---------+----------------+
	| Field   | Type         | Null | Key | Default | Extra          |
	+---------+--------------+------+-----+---------+----------------+
	| row_id  | int          | NO   | PRI | NULL    | auto_increment |
	| message | varchar(100) | YES  |     | NULL    |                |
	+---------+--------------+------+-----+---------+----------------+
	2 rows in set (0,04 sec)

	*/
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="row_id")
	int id;
	
	@Column(name="message")
	String message;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	

}
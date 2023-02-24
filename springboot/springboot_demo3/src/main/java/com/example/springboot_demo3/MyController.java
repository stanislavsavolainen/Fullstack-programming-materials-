
package com.example.springboot_demo3;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestMethod;

import org.springframework.beans.factory.annotation.Autowired;

import org.json.JSONObject;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import java.util.UUID;

import java.util.Iterator;
import java.util.List;



@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class MyController {
	
	@Autowired
	 private UserRepository userRepository;

	@GetMapping(value="/", produces = MediaType.TEXT_PLAIN_VALUE)
	public String index() {
		return "This is Home page";
	}

//https://javarevisited.blogspot.com/2022/03/spring-boot-hibernate-example-for-java.html#axzz7saUOMwpX

//https://www.javainuse.com/spring/jpa

//https://spring.io/guides/gs/accessing-data-mysql/

//https://howtodoinjava.com/jpa/spring-hibernate-jpa-configuration-example/

//https://stackoverflow.com/questions/43572196/missing-artifact-mysqlmysql-connector-javajar5-1-41-why-is-that

//https://stackoverflow.com/questions/59668487/org-hibernate-tool-schema-spi-commandacceptanceexception-error-executing-ddl

//https://www.geeksforgeeks.org/spring-boot-jparepository-with-example/
	
//https://www.javaguides.net/2021/12/spring-data-findbyid-method.html
	
//https://javatute.com/jpa/spring-data-jpa-is-and-equals-example/
	
//https://mkyong.com/java/json-simple-example-read-and-write-json/	
	
//https://stackoverflow.com/questions/6780960/spring-request-mapping
	
//https://stackoverflow.com/questions/45867026/understanding-spring-cloud-stream-content-types
	
	
	@GetMapping(path="/users")
	//@RequestMapping(value="/users", method=RequestMethod.GET)
	public @ResponseBody Iterable<UserModel> getAllUsers() {
		// This returns a JSON or XML with the users
		
		return userRepository.findAll();
	}
	
	
		
	//@GetMapping("/user/{userUUID}")
	//@RequestMapping(value = "/user/{userUUID}", method = RequestMethod.GET, consumes="application/json")
	@RequestMapping(value = "/user/{userUUID}", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
	public String getUser( @PathVariable String userUUID ) {
		//code
		
		
		 System.out.println("/user GET triggered  with param : " +userUUID);
	
		List<UserModel> userList= (List<UserModel>) userRepository.findAll();
		UserModel responseModel = null;
		
		for( UserModel userElement : userList) {
		
			if( userElement.getUuid().equals(userUUID) ){
				responseModel = userElement;
			}
		
		}
				
		return responseModel.getModelAsJSON();
		
	}
	
	
	//@RequestMapping(value = "/employees", method = RequestMethod.POST) 
	 @PostMapping("/user/{userUUID}")
	//public String addUser( @PathVariable String userUUID, @RequestBody UserModel tempUserModel ) {
	public String addUser( @PathVariable String userUUID, @RequestBody String tempUserModel ) {	
		//code
		
		 System.out.println("/user POST triggered with param "+ userUUID);
		
		//System.out.println( "POST body content : " + tempUserModel.getModelAsJSON() );
		System.out.println( "POST body content : " + tempUserModel );
		
		JSONObject jsonUser = new JSONObject(tempUserModel);
		
		String passwordHash = sha256(jsonUser.getString("paramPassword") );
		
		UUID userUuid = UUID.randomUUID();
		
		System.out.println("user login : " + jsonUser.getString("paramLogin") );
		System.out.println("user password : " + passwordHash);
		System.out.println("user uuid : " + userUuid.toString());
		
		//userRepository.save(tempUserModel);
		
		UserModel userRegisterTemplate = new UserModel();	
		userRegisterTemplate.setUuid(userUuid.toString());
		userRegisterTemplate.setUsername(jsonUser.getString("paramLogin"));
		userRegisterTemplate.setPassword(passwordHash);
		userRegisterTemplate.setBlocked('0');
		userRegisterTemplate.setPermission('0');	
		userRegisterTemplate.setIsonline('0');	
		userRegisterTemplate.setRegistereddate( new java.util.Date()); 
		userRegisterTemplate.setLastonlinedate(new java.util.Date());
		userRegisterTemplate.setMaintenance("registered via SpringBoot backend");

		userRepository.save(userRegisterTemplate);
		
	
		return "/user POST triggered with param : " +userUUID + "generated content : " + userRegisterTemplate.getModelAsJSON();
	}
	
	
	@PutMapping("/user/{userUUID}")
	public String updateUser( @PathVariable String userUUID ) {
		//code
		
		 System.out.println("/user PUT triggered with param : " +userUUID);
		
		return "/user PUT triggered with param : " +userUUID;
	}
	
	
	@DeleteMapping("/user/{userUUID}")
	public String deleteUser( @PathVariable String userUUID ) {
		//code
		
		 System.out.println("/user DELETE triggered with param :" + userUUID);
		
		return "/user DELETE triggered with param : " +userUUID;
	}
	
	
	public static String sha256(final String base) {
		
		try{
			final MessageDigest digest = MessageDigest.getInstance("SHA-256");
			final byte[] hash = digest.digest(base.getBytes("UTF-8"));
			final StringBuilder hexString = new StringBuilder();
			for (int i = 0; i < hash.length; i++) {
				final String hex = Integer.toHexString(0xff & hash[i]);
				if(hex.length() == 1) 
				hexString.append('0');
				hexString.append(hex);
				}
			return hexString.toString();
		} catch(Exception ex){
		throw new RuntimeException(ex);
		}
	}
	
	
			
}

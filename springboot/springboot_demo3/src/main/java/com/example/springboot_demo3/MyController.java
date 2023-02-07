
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

import org.springframework.beans.factory.annotation.Autowired;

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
	
	
	@GetMapping(path="/users")
	//@RequestMapping(value="/users", method=RequestMethod.GET)
	public @ResponseBody Iterable<UserModel> getAllUsers() {
		// This returns a JSON or XML with the users
		
		return userRepository.findAll();
	}
	
	
		
	@GetMapping("/user/{userUUID}")
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
	public String addUser( @PathVariable String userUUID ) {
		//code
		
		 System.out.println("/user POST triggered with param "+ userUUID);
		
		return "/user POST triggered with param : " +userUUID;
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
			
}

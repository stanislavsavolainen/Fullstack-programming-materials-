
package com.example.springboot_demo2;

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



@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class MyController {

    @GetMapping(value="/", produces = MediaType.TEXT_PLAIN_VALUE)
    public String index() {

        return "This is Home page";
    }

	//https://www.javaguides.net/2018/11/spring-getmapping-postmapping-putmapping-deletemapping-patchmapping.html
	
	//https://howtodoinjava.com/spring5/webmvc/controller-getmapping-postmapping/
	
	//https://mkyong.com/maven/maven-error-invalid-target-release-17/
	
	//https://stackoverflow.com/questions/25558180/pathvariable-not-found-compilation-error
	
	//https://www.baeldung.com/spring-resttemplate-post-json
	
	//https://www.baeldung.com/spring-boot-hibernate
	
	//https://howtodoinjava.com/spring-boot/spring-boot-jsp-view-example/
	
	//https://www.javaguides.net/2018/11/spring-getmapping-postmapping-putmapping-deletemapping-patchmapping.html
	
	//https://www.springboottutorial.com/creating-web-application-with-spring-boot
	
	//https://stackoverflow.com/questions/70720100/what-do-spring-mvc-view-prefix-and-spring-mvc-view-suffix-have-to-be
	
	//https://mkyong.com/spring-boot/spring-boot-hello-world-example-jsp/
	
	//https://mkyong.com/spring-mvc/spring-mvc-how-to-include-js-or-css-files-in-a-jsp-page/
	
	//https://www.baeldung.com/spring-resttemplate-post-json
	
		
	@GetMapping("/user/{userUUID}")
	public String getUser( @PathVariable String userUUID ) {
		//code
		
		 System.out.println("/user GET triggered  with param : " +userUUID);
	
		return "/user GET triggered  with param : " +userUUID;
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


package com.example.demorest1;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class MyController {

    @GetMapping(value="/", produces = MediaType.TEXT_PLAIN_VALUE)
    public String index() {

        return "This is Home page";
    }

    @GetMapping(value="/hello", produces = MediaType.TEXT_PLAIN_VALUE)
    public String sayHello() {

        return "Hello there!";
    }

	//google -> springboot getmapping query parameters 
	//https://www.baeldung.com/spring-request-param
	// @GetMapping(value="/profile", produces = MediaType.TEXT_PLAIN_VALUE)
     @GetMapping("/profile")
	public String personFunction( @RequestParam String name  ) {

        // google -> springboot getmapping query parameters

		String userData ="";
		userData += name;

		if( name.equals("admin")  ) {
			userData += " , admin-tools : check server status";
		}




        return "Hello "+userData;
    }



}

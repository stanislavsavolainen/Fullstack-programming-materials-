
package com.example.springboot_demo4;

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

import java.util.regex.Matcher;
import java.util.regex.Pattern;


//https://www.baeldung.com/spring-mvc-set-json-content-type

//https://reflectoring.io/bean-validation-with-spring-boot/

//https://stackoverflow.com/questions/45867026/understanding-spring-cloud-stream-content-types

//https://www.javaguides.net/2019/12/java-regex-tutorial-regular-expressions.html

//https://www.javatpoint.com/spring-mvc-number-validation

//https://www.javatpoint.com/spring-mvc-regular-expression-validation

//https://springjava.com/spring-mvc/spring-mvc-form-regular-expression-validation

//https://stackoverflow.com/questions/6017778/c-sharp-regex-checking-for-a-z-and-a-z

//https://reflectoring.io/bean-validation-with-spring-boot/

//https://www.javaguides.net/2019/12/java-regex-tutorial-regular-expressions.html

//https://www.baeldung.com/regular-expressions-java

//https://stackoverflow.com/questions/37719818/the-server-time-zone-value-aest-is-unrecognized-or-represents-more-than-one-ti/39703002#39703002

//https://stackoverflow.com/questions/26515700/mysql-jdbc-driver-5-1-33-time-zone-issue


@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class MyController {
	
	@Autowired
	 private UserRepository userRepository;

	@GetMapping(value="/", produces = MediaType.TEXT_PLAIN_VALUE)
	public String index() {
		return "This is Home page";
	}
	
	@GetMapping(path="/users")
	public @ResponseBody Iterable<UserModel> getAllUsers() {
		return userRepository.findAll();
	}
	
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
	 @PostMapping("/user")
	//public String addUser( @PathVariable String userUUID, @RequestBody UserModel tempUserModel ) {
	public String addUser( @RequestBody String tempUserModel ) {	
		//code
		
		String validationFailJSONReport ="";
		boolean regexPass = true;
			
		//System.out.println( "POST body content : " + tempUserModel.getModelAsJSON() );
		System.out.println( "POST body content : " + tempUserModel );
		
		JSONObject jsonUser = new JSONObject(tempUserModel);
		
		//=========== regular expression validation ==============================
		
		validationFailJSONReport += "{";
		
		//------------------- username validation --------------------------
			
		//String usernameRegex = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\\.[a-zA-Z.]{2,18}$";
		String usernameRegex = "^[a-zA-Z0-9._-]{3,20}$";
		Pattern usernamePattern = Pattern.compile(usernameRegex);
		
		 Matcher usernameRegexMatcher = usernamePattern.matcher(jsonUser.getString("paramLogin"));

		if (usernameRegexMatcher.matches()) {
			//System.out.printf("%s matches%n", jsonUser.getString("paramLogin"));
		 } else {
			 //System.out.printf("%s does not match%n", jsonUser.getString("paramLogin"));
			regexPass = false;		
			validationFailJSONReport += "\"username\" : \"given username cannot be used, not meet regular expression requirements\" ";
		}
		
		//------------------- password validation --------------------------
		
		if( jsonUser.getString("paramPassword").equals( jsonUser.getString("param2ndPassword") ) ) {
		
		}else {
			validationFailJSONReport += ", \"passwordsNotMatch\" : \"Both given passwords not match with each other\" ";
			regexPass = false;
		}
			
		String passwordRegex = "^[a-zA-Z0-9._-]{3,20}$";
		Pattern passwordPattern = Pattern.compile(passwordRegex);
		
		 Matcher passwordRegexMatcher = usernamePattern.matcher(jsonUser.getString("paramPassword"));

		if (passwordRegexMatcher.matches()) {
			//System.out.printf("%s matches%n", jsonUser.getString("paramLogin"));
		 } else {
			//System.out.printf("%s does not match%n", jsonUser.getString("paramLogin"));
			regexPass = false;
			validationFailJSONReport += ", \"password\" : \"given password cannot be used, not meet regular expression requirements\" ";
		}
			
		validationFailJSONReport += "}";
		
		//========================================================================
		
		//userRepository.save(userRegisterTemplate);
		if( regexPass ){
				
			String passwordHash = sha256(jsonUser.getString("paramPassword") );
		
			UUID userUuid = UUID.randomUUID();
		
			System.out.println("user login : " + jsonUser.getString("paramLogin") );
			System.out.println("user password : " + passwordHash);
			System.out.println("user uuid : " + userUuid.toString());
			
			UserModel userRegisterTemplate = new UserModel();	
			userRegisterTemplate.setUuid(userUuid.toString());
			userRegisterTemplate.setUsername(jsonUser.getString("paramLogin"));
			userRegisterTemplate.setPassword(passwordHash);
			userRegisterTemplate.setBlocked('0');
			userRegisterTemplate.setPermission('0');	
			userRegisterTemplate.setIsonline('0');	
			userRegisterTemplate.setRegistereddate(new java.util.Date()); 
			userRegisterTemplate.setLastonlinedate(new java.util.Date());
			userRegisterTemplate.setMaintenance("registered via SpringBoot backend");
	
			userRepository.save(userRegisterTemplate);
			
			return "/user POST triggered , user registered with following content content : " + userRegisterTemplate.getModelAsJSON();
			
		} else {
		
			return "/user POST triggered , validation error : " + validationFailJSONReport;
		}

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
	
	
	public String sha256(final String base) {
		
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

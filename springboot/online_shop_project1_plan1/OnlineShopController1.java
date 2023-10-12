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


@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class OnlineShopController1 {

	@Autowired
	private Product1Repository productObjects;

	@GetMapping(path="/products")
	public @ResponseBody Iterable<ProductModel1> getAllProducts() {
		return productObjects.findAll();
	}

	@RequestMapping(value="/product/{productUUID}")
	public String getProductByUUID(@PathVariable String productUUID){

		List<ProductModel1> productList = (List<ProductModel1>) productObjects.findAll();
		ProductModel1 responseModel = null;
		
		for( ProductModel1 productElement : productList) {
		
			if( productElement.getProductUUID().equals(productUUID) ){
				responseModel = productElement;
			}
		
		}
				
		return responseModel.getModelAsJSON();
	
	}

	@PostMapping("/product")
	public String addProduct( @RequestBody String requestBodyParam ) {

			JSONObject parseredRequest = new JSONObject(requestBodyParam);

			ProductModel1 userRegisterTemplate = new ProductModel1();
			userRegisterTemplate.setProductName( parseredRequest.getString("paramProductName") );
			productObjects.save(userRegisterTemplate);

			return "product registered";
	}

}
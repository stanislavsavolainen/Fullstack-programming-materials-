package com.stanislavsavolainen.onlineshop2026p1.shop_web_sevice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.stanislavsavolainen.onlineshop2026p1.shop_web_sevice.database_model.Product2Repository;
import com.stanislavsavolainen.onlineshop2026p1.shop_web_sevice.database_model.ProductModel2;

@RestController
public class WebController1 {

    //https://mvnrepository.com/artifact/org.mariadb.jdbc/mariadb-java-client/3.5.7

    @GetMapping(value="/") 
    public String index(){
        return "This is index page. Hello client.";
    }

    @Autowired
    private Product2Repository productObjects;

    @GetMapping(value="/products") 
    public @ResponseBody Iterable<ProductModel2> getAllProdcuts(){
        return productObjects.findAll();
    }


}

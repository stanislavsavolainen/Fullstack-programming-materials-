package com.stanislavsavolainen.onlineshop2026p1.shop_web_sevice.database_model;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Product2Repository extends CrudRepository<ProductModel2, Integer> {

}
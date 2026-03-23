package com.stanislavsavolainen.onlineshop2026p1.shop_web_sevice.database_model;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete


@Repository
public interface UserRepository extends CrudRepository<UserModel, Integer> {

}
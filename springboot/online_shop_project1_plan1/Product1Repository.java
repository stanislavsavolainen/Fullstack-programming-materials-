package com.example.springboot_demo4;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

//src/main/java/com/example/springboot_demo4/Product1Repository.java

@Repository
public interface Product1Repository extends CrudRepository<ProductModel1, Integer> {

}

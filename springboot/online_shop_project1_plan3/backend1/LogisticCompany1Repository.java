package com.example.springboot_demo4;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogisticCompany1Repository extends CrudRepository<LogisticCompanyModel1, Integer> {

}
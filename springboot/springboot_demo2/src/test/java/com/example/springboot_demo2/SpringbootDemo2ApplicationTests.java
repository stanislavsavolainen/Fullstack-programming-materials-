package com.example.springboot_demo2;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class SpringbootDemo2ApplicationTests {

	@Test
	void contextLoads() {
	}
	
	@Test
	 void mytestfunction() {
		 
		String name = "stanislav";
		String name2 = "stanislav";
		
		System.out.println("Execute junit test that two strings matches ! (display only when 'mvn test' executed ) ");	
 
		assertThat(name).isEqualTo(name2);
 }

}

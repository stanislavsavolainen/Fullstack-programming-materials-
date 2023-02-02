


1. Download springboot template from :


https://start.spring.io/


Use specification : Project=Maven, Language=Java , SpringBoot=2.7.8, Project Metadata (Artifact/Name)=springboot_demo2, Java=8


2. Extract zip-file to your workspace folder, then open pom.xml file in text editor and add web-library for maven:


<dependency>
	<groupId>org.apache.tomcat.embed</groupId>
	<artifactId>tomcat-embed-jasper</artifactId>
</dependency>

<dependency>
	<groupId>javax.servlet</groupId>
	<artifactId>jstl</artifactId>
</dependency>


<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-web</artifactId>
</dependency>



3. In folder "/springboot_proj1/project3/demo2/src/main/resources" create folder "static" and add user.html file

4. go back to project root folder and write tree command to see file and folder hierarchy ( there is no target folder )

5. write "mvn install" command to cmd/terminal to install springboot libraries ( wait until complete and see target folder apears )

6. In folder "/springboot_demo2/src/main/java/com/example/springboot_demo2" you will see "SpringbootDemo2Application.java" file, create near it new java-file "MyController.java". You can copy from my github file content to work with rest-api call in springboot.

7. Launch springboot project from root folder "mvn spring-boot:run" then open in browser following link "http://127.0.0.1:8080/user.html"

-you can write user-uuid as string in text field nad click each button on page and see result, also in backend console.

8. In folder "/springboot_demo2/src/test/java/com/example/springboot_demo2" modify file "SpringbootDemo2ApplicationTests.java"

add library import "import static org.assertj.core.api.Assertions.assertThat;"

add function:

	@Test
	 void mytestfunction() {
		 
		String name = "stanislav";
		String name2 = "stanislav";
		
		System.out.println("Execute junit test that two strings matches ! (display only when 'mvn test' executed ) ");	
 
		assertThat(name).isEqualTo(name2);
 }


9. run springboot junit test "mvn test" and see in console this output message, also see that test passed

10. delete "target" folder from project ("mvn install" create it) and now you can commit project to github.








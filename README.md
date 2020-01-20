# Fullstack-programming-materials-
helpfull materials for practise my skills for work purpose


--------------------------------------------------------------------------


Frontend frameworks:

--------------------

- React

--------------------

- Angular & AngularJS   ( where Angular based on nodejs and AngularJS on JavaScript external library)

--------------------

- Angular ( nodeJS )

	NodeJS in Ubuntu  : 
	```sh
	 $ sudo npm install -g @angular/cli
	 $ ng v
	```

  - This means that we install Angular-framework installer globaly. After Angular global installation
   not need to install Angular globally anymore. Just create folder where you want to create Angular - project and create project
   from installed module.  
    
    NodeJS in Ubuntu  :
    ```sh
    $ ng new myapp1
    $ ng serve --open
    ```

   Angular create "home" - module
   
    NodeJS in Ubuntu  :
    ```sh
    $ ng g c home
    ```
    Modify app-routing.module.ts file at your Angular project

    ```
     import { HomeComponent } from './home/home.Component';
      
     const routes.Routes [

       ....... some old data ..........
       {path : '', component : HomeComponent}
      ];

    ```
    This means that you open "app-routing.module.ts" file at text editor and modify it for link installed Home-module.
    Import command have same behavior as React - framework. You can check my old github project from 2017 and check this info.
    Add object-element to object-array wich is Angular framework route. 
   
    - After that you can call this module at your index page.
    
    - You can use Javascript for TypeScript programming. TypeScript file have dot - ts extension. 


--------------------

- AngularJS ( JavaScript external library )


--------------------

- VueJS ( JavaScript external library )
     ```
     vueproj1.html  - vuejs hello world
     vueproj2.html  - vuejs button counter
     vueproj3.html  - vue for-each 
     vueproj4.html
     vueproj5.html  - vuejs route links

    ```

frontend_framework/vuejs_materials1/

[a link](frontend_framework/vuejs_materials1/)

--------------------------------------------------------------------------

   
 - Maven:

	Configure maven enviroment variable
	create maven project or download project from internet as we 
        do in SpringBoot application, 
	also default HelloWold java project from Maven folder.
        
      
	my maven hellowold project with executable jar :
	maven/my-app
	[a link](maven/my-app)

       helpfull maven links : 
         
        maven/info1.txt
	[a link](maven/info1.txt)

--------------------------------------------------------------------------


Backend framework:


--------------------
- SpringBoot and Kotlin ( not tried at the moment )

--------------------

- SpringBoot

    https://start.spring.io/

    ```	
    Init SpringBoot in this web-page . 
    Download project zip-file and extract at your worskpace folder. 
    After that go project folder via Terminal or CMD where this project pom.xml and run "mvn install" 
    ```
    springboot/demorest
	[a link](springboot/demorest1)

--------------------

- Java Servlet
   
    https://github.com/stanislavsavolainen/Servlet_projects1
    

--------------------

- Wildfly

--------------------

- Liferay



--------------------------------------------------------------------------

Responsive ui ( html and css)

```
https://www.w3schools.com/html/html_responsive.asp

https://www.w3schools.com/css/tryit.asp?filename=tryresponsive_col-s

google.com -> responsive three column layout
https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_three_columns

https://stackoverflow.com/questions/30141292/how-to-create-a-3-column-responsive-layout
```
   
    
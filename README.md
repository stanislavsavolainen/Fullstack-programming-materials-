# Fullstack-programming-materials-
helpfull materials for practise my skills for work purpose


--------------------------------------------------------------------------


Frontend frameworks:

--------------------

- React

You can use react create https://github.com/facebook/create-react-app
or use my light version of it based on old tutorial https://github.com/stanislavsavolainen/react_setup



Project1 is React-Intl module test ( UI support multilanguage ) 

frontend_framework/react/1

[a link](frontend_framework/react/1)


original links for react-intl module tutorial : 

https://gist.github.com/eveningkid/6df7d35d1884854a6d9ecaaac89fd2ae

https://codesandbox.io/s/i18n-i1y70


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

    - Check my detailed installation guide ( originaly made spring 2019 ) :	

     frontend_framework/angular_via_nodejs/angular_info1.txt
	[a link](frontend_framework/angular_via_nodejs/angular_info1.txt)	


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

   Maven :   

       helpfull maven links : 
         
        maven/info1.txt
	[a link](maven/info1.txt)


	- Configure maven enviroment variable
	create maven project or download project from internet as we 
        do in SpringBoot application, 
	also default HelloWold java project from Maven folder.
        
      
	my maven hellowold project with executable jar :
	maven/my-app
	[a link](maven/my-app)

       

--------------------------------------------------------------------------

My backend nodejs demo ( not done ) :

[a link](backend/nodejs_proj1/)


MongoDB and NodeJS alternative nodejs demo project as replacement for knex-mysql

console 1 ( install and start mongodb process) :

```sh 
$ sudo apt-get install -y mongodb-org
$ mongo --version
$sudo mongod
```
 
console 2  ( use mongodb, when console 1 is done, create collection, view collection and other mongodb commands ):

```sh 
$ mongo
$ > show dbs;
$ > use test
$ > show collections
$ > db.createCollection("user1", { capped : true, autoIndexId : true, size: 6142800, max : 10000 } )
$ > db.user1.find();
```

--------------------------------------------------------------------------

My backend project 2 (http and https server project)

[a link](backend2/)

following https tutorial:
https://www.geeksforgeeks.org/how-to-create-https-server-with-node-js/

SSL certificates deleted from project, so you have to generate your own using openSSL software tools

```sh 
$ cd ssl_certificates ( mkdir ssl_certificates )
$ openssl req -nodes -new -x509 -keyout server.key -out server.cert
$ > cd..
$ > npm install
```
make sure "sl_certificates" subfolder contains 2 files : "server.cert" and "server.key" files 

.
├── package.json
├── package-lock.json
├── public_html
│   └── index.html
├── server1.js
└── ssl_certificates
    ├── server.cert
    └── server.key


My backend projects 3 - 6 :

Project 3 : .env - credentials , split program to components- and services-files and import them , if required

Project 4: GET/POST/PUT/DELETE methods and small usage

Project 5 : backend-input validation ( express-validator) , regular-expression

Project 6 ( http/https server project)

User can authenticate/register. Authenticated user can send public or private messages. Limit message view for each user
who have permission view message. 


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
   
    
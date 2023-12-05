

Copy some code from "online_shop_project1_plan1" to "online_shop_project1_plan2". 

Changes 17th october 2023:

- split Online Shop front-end code to components, because code begin repeat itself and more structured codebase required.

- create subfolders for CSS, JavaScript and Html-components and link them to main pages.

Changes 24th october 2023:

- add product-category database-table reference to spring-boot

- replace filter by product type ( category) from id to product type name using other ajax call relation. Now it's visible product type name in drop-down menu instead of number. ToDo in future use parent-type filter to display only one product sub-group.

Changes 7th november 2023:

- add create-product page to online shop project (check createproduct1.html and angularjslogic3.js files), also updated SpringBoot POST /product method to create new product at database (check OnlineShopController1.java). This implementation not complitely done: required backend input validation and add more details/functionality at creation page ( very important details are still missing) 

Changes 10th november 2023:

- add html cards view for each product in product list page ( more attractive design and followed by many online shops)

- add edit and delete links/buttons for each product ( in future will be limited only for product authors)

- create editproduct1.html file where product will be modified or deleted

- create forceupdate1.js file wich will override bootstrap styles problem ( google -> bootstrap custom styles problem )

Changes 15th november 2023:

- add /PUT for updating product and /DELETE for deleting product at back-end side (check OnlineShopController1.java), also add real database update and delete (JPA) "org.springframework.data.repository.CrudRepository" check for "save()-for update" and "deleteById()-for delete" where is id correspond database autoincrement index and linked with model-class.

- in front-end rename editproduct1.html file to modifyproduct1.html and add update(/PUT)- and delete(/DELETE)-ajax calls to angularjslogic4.js wich is used in modifyproduct1.html linking them to back-end.

- add 2 html componets editproduct1.html and deleteproduct1.html and link them to modifyproduct1.html file depends on user options in products list at glyph-icons click.

Changes 18th november 2023 (Commits 1):

- begin React front-end version of Online Shop, rewrite AngularJS logic to React

- add SpringBoot cross-origin access, front-end location ip-address is different than back-end,  additionaly in linux side where SpringBoot located open firewall access to port 8080 ( sudo ufw allow 8080/tcp)

ToDO : discover this Github submodule stuff, I have no experience/information about it

Changes 18th november 2023 (Commits 2):

- modify React code, remove AngularJS reference on drop-down menu and write alternative way ( instead on ng-repeat on AngularJS write JavaScript map()-function for React wich iterate Product Categories) + use with JavaScript filter()-function to remove results wich not meet conditions.

Changes 22nd november 2023:

- add image functionality on front-end(AngularJS) and Back-end(SpringBoot). Each product in product list have additional image button before edit and delete as you can see on new screenshot. Pressing "image" icon one of product you will go image upload page, where find "html file input dialog" to upload your image for selected product. This operation save image on server hard disk and link it with current product and display your image on this product in product list ( if not, then there is bug on server or client).

Changes 27th november 2023:

- add React example code with dropdown in ChildComponent wich effect to Parrent component vai props ( I need it for my problem simulation)

- add Nodejs backend for this React code dropdowm menu problem

- rewrite React navigation link in ProductList to provide right values ( replace AngularJS syntax)  

Changes 30th november 2023:

- add React-Router in project, now we can navigate in project using links

- add React-Router Links replacing old one for: view, edit, delete and upload image functionality for Products

- create blank pages for product CRUD - actions 

Changes 5th december 2023:

- add old style React version ( React 16 with classes) of Online shop, conclusion: no drop-down-menu bug there.





Copy some code from "online_shop_project1_plan1" to "online_shop_project1_plan2". 

Changes 17th october 2023:

- split Online Shop front-end code to components, because code begin repeat itself and more structured codebase required.

- create subfolders for CSS, JavaScript and Html-components and link them to main pages.

Changes 24th october 2023:

- add product-category database-table reference to spring-boot

- replace filter by product type ( category) from id to product type name using other ajax call relation. Now it's visible product type name in drop-down menu instead of number. ToDo in future use parent-type filter to display only one product sub-group.

Changes 7th november 2023:

- add create-product page to online shop project (check createproduct1.html and angularjslogic3.js files), also updated SpringBoot POST /product method to create new product at database (check OnlineShopController1.java). This implementation not complitely done: required backend input validation and add more details/functionality at creation page ( very important details is still missing) 


September 2023 changes:

Replace mysql-connector-java driver version for matchin your mysql-server

- my solution was change from 8.0.11 to 5.1.49, because I continue develop project in computer where mysql-server version is different. See screenshot of this error.

https://mvnrepository.com/artifact/mysql/mysql-connector-java





Backup database:

mysqldump -u root -p fullstack2022db1 > productDatabase1_backup1.sql




- as you can see this underline product-table version is generated buy springboot. So I modified my Product-modelclass to use autogenerated one and database search begin working

Changes at 4th october 2023:

- create productpage2.html file at "src/main/resources/static/" folder. Where I use AngularJS feature at front-end side.

- create folder "productimage" folder inside "src/main/resources/static/" then front-end have easy image path. In future generatate and create folder based on product_uuid where user can add/upload his owm image of product when create product at online shop project. Search from internet or make your own images. Update database field "product_imageurl"  in table shop_product1

Changes 9th october 2023:

- add filter by product type (angularJS code) . This filter hide other products type and display less products on screen. You can use filter without ajax call and not need another request to server. Filter done by drop down menu and happen only on front-end side.

Changes 12th october 2023:

- add selected product page and display more info about selected product. Make better design in future. Adding link to products list where you can navigate to each product and see more accurate info about one selected product.

Changes 16th october 2023:

- modify "selected product" - pages add some html design to display page user friendly

- add navigation bar on "products list"- and "selected product"-pages, follow same CSS styles













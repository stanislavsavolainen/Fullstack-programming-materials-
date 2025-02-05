
This project based on plan2 with some new features. Purpose is continue my "online shop project"

Changes 12th november 2024:

- add shipment data warehouse information for each product. Purpose is calculate full shipment price and delivery time, if we have full information about all logistic nodes and transition between logistic companies to providing product from seller to buyer following long and complicated way.

Changes 18th november 2024:

- copy old project files for modification. Thouse files will be affected by new shippment feature.

- previously we added "data warehouse" column in product table in database for shippment time and delivery calculation. This issue is undone at the moment. Required "Logistic" database table to get information about shippment. Some planned structure about shippment can be found in "my_onlineshop2024plan1.txt" file, but functionality not implemented yet.

- add delivery_address column for user database table. Purpose is link this address with "buyer user uuid" in products, then identify personal route for shippment and inform user how long and how much shippment price will cost. In completed system user pay product- and shippment-price in same invoice and know when product will arrive.

Changes 25th november 2024:

- copy OnlineShopController class from plan2 for shippment feature modification

- fix ProductModel shippingDataWareHouse json issue

- add Shippment feature in front-end and back-end side, use default value for all products

Changes 10th december 2024:

- fix LogisticUtility.java tabs in file

- add plan text in LogisticUtility.java, how to handle logistic nodes. Implementation still required.

Changes 19th december 2024:

- create LogisticCompany database table with JPA/Persistend databases classes LogisticCompanyModel1.java and LogisticCompany1Repository.java

- create rest-api /logistic endpoint to view logistic companies wich provides packages from seller to user. Plan is handle thouse data in LogisticUtility.java as node elements and provide user individual logistic route with shippment price and delivery time.

Changes 8th february 2025:

- develop generatePersonalLogisticShippmentForProduct - function in LogisticUtility.java. Function calculate now total shippment price and deliverytime for special product. 

- add "logistic companies id" column in Product - table in database. Purpose is handle string of logistic companies id:s as string for each product and then parse it and compare with Logistic companies details.  

- Now each product can have individual logistic route for shippment, but seller should add this route manually by knowing each logistic companies route from seller to buyer, because I don't have an idea at the moment how to track route automatically.


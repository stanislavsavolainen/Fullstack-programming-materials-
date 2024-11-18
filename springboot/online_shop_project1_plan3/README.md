
This project based on plan2 with some new features. Purpose is continue my "online shop project"

Changes 12th november 2024:

- add shipment data warehouse information for each product. Purpose is calculate full shipment price and delivery time, if we have full information about all logistic nodes and transition between logistic companies to providing product from seller to buyer following long and complicated way.

Changes 18th november 2024:

- copy old project files for modification. Thouse files will be affected by new shippment feature.

- previously we added "data warehouse" column in product table in database for shippment time and delivery calculation. This issue is undone at the moment. Required "Logistic" database table to get information about shippment. Some planned structure about shippment can be found in "my_onlineshop2024plan1.txt" file, but functionality not implemented yet.

- add delivery_address column for user database table. Purpose is link this address with "buyer user uuid" in products, then identify personal route for shippment and inform user how long and how much shippment price will cost. In completed system user pay product- and shippment-price in same invoice and know when product will arrive.

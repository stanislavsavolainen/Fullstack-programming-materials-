package com.example.springboot_demo4;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestMethod;

import org.springframework.beans.factory.annotation.Autowired;

import org.json.JSONObject;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import java.util.UUID;

import java.util.Iterator;
import java.util.List;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import org.springframework.util.StringUtils;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


@RestController
//@CrossOrigin(origins = "http://localhost:8080")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OnlineShopController1 {

	public String filesStoragePath = (System.getProperty("user.dir"))+"/src/main/resources/static/productimages";
	//https://stackoverflow.com/questions/68691761/how-to-serve-static-resources-at-runtime-with-spring-boot
	public String filesStoragePathBuildRuntime = (System.getProperty("user.dir"))+"/target/classes/static/productimages";
	
	@Autowired
	 private Product1Repository productObjects;

	@Autowired
	 private ProductCategoryRepository productCategoriesObjects;

	@GetMapping(path="/products")
	public @ResponseBody Iterable<ProductModel1> getAllProducts() {
		return productObjects.findAll();
	}

	@RequestMapping(value="/product/{productUUID}")
	public String getProductByUUID(@PathVariable String productUUID){

		List<ProductModel1> productList = (List<ProductModel1>) productObjects.findAll();
		ProductModel1 responseModel = null;
		
		for( ProductModel1 productElement : productList) {
		
			if( productElement.getProductUUID().equals(productUUID) ){
				responseModel = productElement;
			}
		
		}
				
		return responseModel.getModelAsJSON();
	
	}

	@PostMapping("/product")
	public String addProduct( @RequestBody String requestBodyParam ) {

		JSONObject parseredRequest = new JSONObject(requestBodyParam);

		ProductModel1 productRegisterTemplate = new ProductModel1();

		//autogenerated at backed side
		UUID productUUID = UUID.randomUUID();
		productRegisterTemplate.setProductUUID(productUUID.toString());

		//exsisting seller uuid from database (currently user who create new product for sale)
		productRegisterTemplate.setSellerUUID("720b1410-8c7e-11ed-984d-1528c4aecbd9");

		//product public visibility controlled by Adminstrator
		productRegisterTemplate.setProductPublicVisible(1);

		//product amin info, means that Adminstrator can write tip for himself,
		//for example, if product is illegal and should be hide/removed from shop(public view)
		productRegisterTemplate.setAdminInfo("");

		System.out.println();
		System.out.println("Create product rest-api triggered at backend");
		System.out.println( "" + parseredRequest.toString());

		try{

			productRegisterTemplate.setProductName( parseredRequest.getString("paramProductName") );
			productRegisterTemplate.setProductType( parseredRequest.getInt("paramProductType") );
			productRegisterTemplate.setProductDescription( parseredRequest.getString("paramProductDescription") );
			productRegisterTemplate.setProductQuantity( parseredRequest.getInt("paramProductQuantity") );
			productRegisterTemplate.setProductPricePerUnit( Double.parseDouble(  parseredRequest.getString("paramProductPricePerUnit") ) );
			productRegisterTemplate.setShippingPriceSameCountry( Double.parseDouble( parseredRequest.getString( "paramProductShippingPriceSameCountry") ) );
			productRegisterTemplate.setShippingPriceEurope( Double.parseDouble( parseredRequest.getString( "paramProductShippingPriceEurope")  ) );
			productRegisterTemplate.setShippingPriceWorld( Double.parseDouble(  parseredRequest.getString( "paramProductShippingPriceWorld") ) );
			productRegisterTemplate.setShippingInfo( parseredRequest.getString("paramProductShippingInfo") );
			productRegisterTemplate.setProductQualityScore( Double.parseDouble(  parseredRequest.getString("paramProductQualityScore") ) );
			productRegisterTemplate.setSellerQualityScore( Double.parseDouble( parseredRequest.getString( "paramProductSellerQualityScore") ) );
			productRegisterTemplate.setBuyerQualityScore( Double.parseDouble( parseredRequest.getString("paramProductBuyerQualityityScore") ) );				
			productRegisterTemplate.setProductImageURL( parseredRequest.getString("paramProductImageUrl") );

			productObjects.save(productRegisterTemplate);

			}catch(Exception e){
				System.out.println("Cannot parse Product data for creation, exception : " +e);
			}

			String result = "";
			result += "{\"message\": \"product created\" }";
			return result;
		
	}

	@PutMapping("/product")
	public String editProduct( @RequestBody String requestBodyParam ) {

			JSONObject parseredRequest = new JSONObject(requestBodyParam);
			String editProductUUID = parseredRequest.getString("productUUID");
			ProductModel1 productEditTemplate = new ProductModel1();

		//----------- read all products to find exsisting one for modification ----------

		List<ProductModel1> productList = (List<ProductModel1>) productObjects.findAll();
		ProductModel1 responseModel = null;
		
		for( ProductModel1 productElement : productList) {
		
			if( productElement.getProductUUID().equals(editProductUUID) ){
				responseModel = productElement;
			}
		
		}

		//-----------------------------------------------------------------------------
		
		if(responseModel.getProductUUID() != null || !responseModel.getProductUUID().isEmpty() ){

			productEditTemplate = responseModel;
			//-------------------------------
			String editProductName = parseredRequest.getString("productName");
			String editProductPrice = parseredRequest.getString("productPricePerUnit");
			String editProductDescription = parseredRequest.getString("productDescription");
			String editProductImageUrl = parseredRequest.getString("productImageURL");

			try{
				productEditTemplate.setProductPricePerUnit( Double.parseDouble(editProductPrice) );	
			} catch(Exception e){
				//price error present negative price, product displayed but is not for sale
				productEditTemplate.setProductPricePerUnit( -1.0 );
			}
			
			if( editProductDescription == null || editProductDescription.isEmpty() ){
				editProductDescription = "";
			}

			if( editProductImageUrl == null || editProductImageUrl.isEmpty() ){
				editProductImageUrl = "/productimages/placeholder1.png";
			}

			productEditTemplate.setProductDescription(editProductDescription);
			productEditTemplate.setProductImageURL(editProductImageUrl);
			productEditTemplate.setProductName(editProductName);
			//-------------------------------
			
			System.out.println("PRODUCT /PUT rest-api triggered to edit product with productUuid="+editProductUUID);
			System.out.println("http-request body content : " + parseredRequest.toString() );

			//update exsisting data
			productObjects.save(productEditTemplate);

			String result = "";
			result += "{\"message\": \"product updated\" }";
			return result;

		} else {

			String result = "";
			result += "{\"message\": \"product update failed, Product not found\" }";
			return result;

		}
		
	}

	@DeleteMapping("/product/{productUUID}")
	public String deleteProduct( @PathVariable String productUUID ) {

		System.out.println("PRODUCT /DELETE rest-api triggered to delete product with productUuid="+productUUID);

		List<ProductModel1> productList = (List<ProductModel1>) productObjects.findAll();
		ProductModel1 responseModel = null;
		boolean productIsDeleted = false;
		
		for( ProductModel1 productElement : productList) {
		
			if( productElement.getProductUUID().equals(productUUID) ){
				responseModel = productElement;

				//delete exsisting data
				productObjects.deleteById(productElement.getId());
				productIsDeleted = true;
				
			}
		
		}

		String result = "";

		if(productIsDeleted){
			result += "{\"message\": \"product deleted\" }";
		} else {
			result += "{\"message\": \"product cannot be deleted, problem finding uuid ! \" }";
		}
				
		return result;

	}	
	
	@GetMapping(path="/categories")
	public @ResponseBody Iterable<ProductCategoryModel> getAllCategories() {
		return productCategoriesObjects.findAll();
	}
	
	//https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/file-upload-Spring-Boot-Ajax-example
	@PostMapping("/uploadProductImage") 
	public String handleFileUpload( @RequestParam("file") MultipartFile file ) {

		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		System.out.println("/uploadProductImage triggered ");	

		UUID productTempStorageUUID = UUID.randomUUID();
		String productTempStorageLink = productTempStorageUUID.toString();	

		try {

			Path path = Paths.get(filesStoragePath+"/tempstorage/"+productTempStorageLink+"/"+ fileName);
			Files.createDirectories(path.getParent());
			Files.write(path , file.getBytes());

			Path path2 = Paths.get(filesStoragePathBuildRuntime+"/tempstorage/"+productTempStorageLink+"/"+ fileName);
			Files.createDirectories(path2.getParent());
			Files.write(path2 , file.getBytes());

		} catch (Exception e) {
			return "{ \"message\" : \"Error sending file\" , \"link\": \"error\" }";
		} 

		return "{ \"message\": \"File uploaded successfully\", \"link\" : \""+productTempStorageLink+"\" , \"filename\" : \"" + fileName + "\" }";
		
	}

	@PostMapping("/bindProductImageToSeller") 
	public String bindProductImageToSeller( @RequestBody String requestBodyParam  ) {

		System.out.println("/bindProductImageToSeller triggered !");

		JSONObject parseredRequest = new JSONObject(requestBodyParam);
		String sellerUUID = parseredRequest.getString("sellerUUID");
		String productUUID = parseredRequest.getString("productUUID");
		String fileStorageLink = parseredRequest.getString("link");
		String fileStorageFileName = parseredRequest.getString("filename");
		System.out.println( "" + parseredRequest.toString());

		Path srcfrom = Paths.get(filesStoragePath+"/tempstorage/"+fileStorageLink+"/"+ fileStorageFileName);
		Path destto = Paths.get(filesStoragePath+"/productSeller/"+sellerUUID+"/products/"+productUUID+"/"+ fileStorageFileName);
		
		Path srcfromruntime = Paths.get(filesStoragePathBuildRuntime+"/tempstorage/"+fileStorageLink+"/"+ fileStorageFileName);
		Path desttoruntime = Paths.get(filesStoragePathBuildRuntime+"/productSeller/"+sellerUUID+"/products/"+productUUID+"/"+ fileStorageFileName);
		
		String imageUrlForDB = "/productimages/productSeller/"+sellerUUID+"/products/"+productUUID+"/"+ fileStorageFileName;
		
		String srcurl = filesStoragePath+"/tempstorage/"+fileStorageLink+"/"+ fileStorageFileName;
		String desturl = filesStoragePath+"/productSeller/"+sellerUUID+"/products/"+productUUID+"/"+ fileStorageFileName;

		try{

			System.out.println("");
			System.out.println("source="+srcurl);
			System.out.println("");
			System.out.println("destination="+desturl);
			System.out.println("");

			//save to project sources
			byte[] filesStorageData = Files.readAllBytes(srcfrom);
			Files.createDirectories(destto.getParent());
			Files.write( destto , filesStorageData);
			
			//save to project runtime
			byte[] filesStorageDataRuntime = Files.readAllBytes(srcfromruntime);
			Files.createDirectories(desttoruntime.getParent());
			Files.write( desttoruntime , filesStorageDataRuntime);

			ProductModel1 productEditTemplate = new ProductModel1();

			//----------- read all products to find exsisting one for modification ----------
	
			List<ProductModel1> productList = (List<ProductModel1>) productObjects.findAll();
			ProductModel1 responseModel = null;
			
			for( ProductModel1 productElement : productList) {
			
				if( productElement.getProductUUID().equals(productUUID) ){
					responseModel = productElement;
				}
			
			}

			System.out.println("project-src-static="+filesStoragePath);
			System.out.println("project-runtime-static="+filesStoragePathBuildRuntime);
	
			//-----------------------------------------------------------------------------
			
			if(responseModel.getProductUUID() != null || !responseModel.getProductUUID().isEmpty() ){
	
				productEditTemplate = responseModel;

				if( imageUrlForDB == null || imageUrlForDB.isEmpty() ){
					imageUrlForDB = "/productimages/placeholder1.png";
				}
				
				productEditTemplate.setProductImageURL(imageUrlForDB);
				productObjects.save(productEditTemplate);

			}		

		}catch( IOException ee  ){
			System.out.println("Problem copying image to seller folder ! reson : " +ee);
		}
		
		return "{ 'message' : ' product image or file is binded with seller' }";

	}
		
}


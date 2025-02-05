
package com.example.springboot_demo4;

import java.util.List;
import java.lang.NullPointerException;

public class LogisticUtility {
    
    private String shippmentModel = "";

    String generateDefaultLogisticShippmentForProduct(){

        double shippingPrice = 100.0;
        int priorityOrder = 1;
        int delayInSeconds = ( 60 * 60 * 24 * 14 ); //2 weeks shippment
        String jsonLogisticsNodesArray = "[]";
        String shippingInfo = "Seller don't accept refund";

        shippmentModel = "";
        shippmentModel += "{\"totalShippingPrice\":"+shippingPrice+",";
        shippmentModel += "\"totalPriorityOrder\":"+"\""+ priorityOrder + "\""+",";
        shippmentModel += "\"totalLogisticDelayTimeInSeconds\":"+"\""+ delayInSeconds + "\""+",";
        shippmentModel += "\"totalShippingInfo\":"+"\""+ shippingInfo + "\""+",";
        shippmentModel += "\"totalLogisticsNodeArray\":"+"\""+ jsonLogisticsNodesArray + "\""+"";
        shippmentModel += "}";
		
        //------ logistic node element -------
        //-> logistic company name
        //-> logistic company id
        //-> transition price 
        //-> standalone price
        //-> info
        //-> company_is_blacklisted
        //-> logistic_reputation ( alternative company, if fraggile product )
        //-> logistic trust rate ( alternative company, if fraggile product )

        //totalShippingPrice and totalLogisticDelayTimeInSeconds is summ of each totalLogisticNodeArray element
        //as mentioned earlier each customer have personal totalLogisticsNodeArray depends on his location
        //also please note, that "logistic reputation" and "logistic trust rate" planed for fragile product, wich
        //means in practical way that product logistic route can be different with same location on seller and byer
        //if logistic company cannot handle fragile product properly, then navigate alternative way

        return shippmentModel;
    }

    //address as parameter ? Seller will provide logistic route manually
    String generatePersonalLogisticShippmentForProduct( List<LogisticCompanyModel1> logisticList, String logisticCompaniesAsStr ) {

        shippmentModel = "";

        //parse delivery address and identify from system -> use empty value now
        //because logistic node stuff is not done and we cannot calculate personal path
        //for each user to tell exactly shippment price and delivery time
        //String logisticData [] = deliveryAddress.split(",");

        double shippingPrice = 0.0;
        int delayInSeconds = 0;

        String jsonLogisticsNodesArray = "[]";
        String shippingInfo = "Seller don't accept refund";
        int priorityOrder = 1;


       String [] logisticCompanies;
       
       try{

           if( logisticCompaniesAsStr.length() != 0 && logisticCompaniesAsStr.contains(",") ){

                logisticCompanies = logisticCompaniesAsStr.split(",");

            } else {

                String tmp = "-1,-1";   
                logisticCompanies = tmp.split(",");

            }

       } catch ( NullPointerException noLogisticRoute ){

           String tmp = "-1,-1";   
           logisticCompanies = tmp.split(",");

       }

        for( LogisticCompanyModel1 logisticElement : logisticList) {
         
            for( int arrayIndx = 0; arrayIndx < logisticCompanies.length; arrayIndx++ ){
            
                if( logisticCompanies[arrayIndx].equals(logisticElement.getCompanyId()) ){
                    
                    try{

                        shippingPrice += logisticElement.getTransitionPrice();
                        delayInSeconds += logisticElement.getCompanyLogisticDelay();

                    } catch ( Exception notValidValue) {

                        System.out.println("Error in parsering logistic company values!");

                    }  

                }

            }
        
        }

        shippmentModel = "";
        shippmentModel += "{\"totalShippingPrice\":"+shippingPrice+",";
        shippmentModel += "\"totalPriorityOrder\":"+"\""+ priorityOrder + "\""+",";
        shippmentModel += "\"totalLogisticDelayTimeInSeconds\":"+"\""+ delayInSeconds + "\""+",";
        shippmentModel += "\"totalShippingInfo\":"+"\""+ shippingInfo + "\""+",";
        shippmentModel += "\"totalLogisticsNodeArray\":"+"\""+ jsonLogisticsNodesArray + "\""+"";
        shippmentModel += "}";

      return this.shippmentModel;  
    }

}

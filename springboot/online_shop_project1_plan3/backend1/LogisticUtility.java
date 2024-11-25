
package com.example.springboot_demo4;

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

        return shippmentModel;
    }

    String generatePersonalLogisticShippmentForProduct( String deliveryAddress ){

        shippmentModel = "";

        //parse delivery address and identify from system -> use empty value now
        //because logistic node stuff is not done and we cannot calculate personal path
        //for each user to tell exactly shippment price and delivery time

      return this.shippmentModel;  
    }

}
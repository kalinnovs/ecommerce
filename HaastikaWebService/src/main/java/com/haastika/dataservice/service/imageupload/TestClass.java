package com.haastika.dataservice.service.imageupload;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.haastika.dataservice.data.utility.BCrypt;

public class TestClass {

    private final static String IMAGES_BASE_PATH = "/var/lib/tomcat7/webapps/ROOT/";
    private final static String CATEGORY_IMAGES_BASE_PATH = "assets/images/categories/";
    private final static String PRODUCT_IMAGES_BASE_PATH = "assets/images/products/";
    private static final String SRC_FOLDER = "/Users/devi_rath/Developer/Devi/assets/images/categories/HSCH001";
    static String st = "assets/images/products/264/HSIMG1/medium/medium.jpg";
	
    public static void main(String ar[]){
    	String encryptedpwd  = BCrypt.hashpw("Hmfv@11015", BCrypt.gensalt());
    	System.out.println(encryptedpwd);
    	if(BCrypt.checkpw("Hmfv@11015", "$2a$10$W6xzZAX0ZIK4IW4Uc0Fih./o1aOo9L.ZMLQvwgkLjoI/qE//cHcza")){
    		System.out.println("SAME :)");
    	}
    	
    	
    	
    	int largest = Collections.max(Arrays.asList(1,3,4,2,10));
    	System.out.println(largest);
    	newmethod("HSIMG1","1","276");
    	newmethod("","2","276");

    	ArrayList<Integer> positions = new ArrayList<Integer>();
    	Pattern p = Pattern.compile("/");  // insert your pattern here
    	Matcher m = p.matcher(st);
    	while (m.find()) {
    	   positions.add(m.start());
    	}
    	System.out.println(positions);
    	Integer dirIndex = positions.get(positions.size()-2);
    	System.out.println(st.substring(0,dirIndex));
    	
    	File directory = new File(SRC_FOLDER);
        
    	//make sure directory exists
    	if(!directory.exists()){
 
           System.out.println("Directory does not exist.");
           System.exit(0);
 
        }else{
 
           try{
               delete(directory);
           }catch(IOException e){
               e.printStackTrace();
           }
        }
 
    	System.out.println("Done");
    	
    	//newmethod(null,"1","276");
	}
    
    static void newmethod(String imageName, String folderid, String prodId){
        final String productFolderName = imageName.isEmpty()? "HSIMG"+folderid : imageName;
        final String productFolderPath = prodId + File.separator + productFolderName+ File.separator;
        
        final String extraLargeImageDir = PRODUCT_IMAGES_BASE_PATH + productFolderPath + "extraLarge";
        final String largeImageDir = PRODUCT_IMAGES_BASE_PATH + productFolderPath + "large";
        final String mediumImageDir = PRODUCT_IMAGES_BASE_PATH + productFolderPath + "medium";
        final String thumbImageDir = PRODUCT_IMAGES_BASE_PATH + productFolderPath + "thumb";
        
        String st = (IMAGES_BASE_PATH + extraLargeImageDir).substring(IMAGES_BASE_PATH.length()) + File.separator + "extraLarge.jpg";
        
        System.out.println(st);
    }
        public static void delete(File file)
        	throws IOException{
     
        	if(file.isDirectory()){
     
        		//directory is empty, then delete it
        		if(file.list().length==0){
        		   file.delete();
        		   System.out.println("Directory is deleted : " + file.getAbsolutePath());
        		}else{
        		   //list all the directory contents
            	   String files[] = file.list();
            	   for (String temp : files) {
            	      //construct the file structure
            	      File fileDelete = new File(file, temp);
            	      //recursive delete
            	     delete(fileDelete);
            	   }
            	   //check the directory again, if empty then delete it
            	   if(file.list().length==0){
               	     file.delete();
            	     System.out.println("Directory is deleted : " + file.getAbsolutePath());
            	   }
        		}
        		
        	}else{
        		//if file, then delete it
        		file.delete();
        		System.out.println("File is deleted : " + file.getAbsolutePath());
        	}
        }
}

package com.haastika.dataservice.data.utility;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class DeleteImageFromPhysicalPath {

    private final static String IMAGES_BASE_PATH = "/var/lib/tomcat7/webapps/ROOT/";
    
	public static void deletePhysicalPathImageData(String imagePath) {
    	ArrayList<Integer> positions = new ArrayList<Integer>();
    	Pattern p = Pattern.compile("/");  // insert your pattern here
    	Matcher m = p.matcher(imagePath);
    	while (m.find()) {
    	   positions.add(m.start());
    	}
    	Integer dirIndex = positions.get(positions.size()-2);
    	String imageDirPath = IMAGES_BASE_PATH+imagePath.substring(0,dirIndex);
    	File directory = new File(imageDirPath);
    	if(!directory.exists()){
           System.out.println("Directory does not exist.");
        }else{
           try{
               delete(directory);
           }catch(IOException e){
               e.printStackTrace();
           }
        }
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

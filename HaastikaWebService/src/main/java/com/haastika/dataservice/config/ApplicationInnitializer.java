package com.haastika.dataservice.config;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration.Dynamic;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

public class ApplicationInnitializer implements WebApplicationInitializer{

	@Override
	public void onStartup(final ServletContext servletContext) throws ServletException {  
          
        final AnnotationConfigWebApplicationContext appContext = new AnnotationConfigWebApplicationContext();  
        appContext.register(ApplicationConfiguration.class); 
        appContext.setServletContext(servletContext);    
        
        final Dynamic servlet = servletContext.addServlet("dispatcher", new DispatcherServlet(appContext));  
        servlet.addMapping("/");  
        servlet.setLoadOnStartup(1);  
    }  

}

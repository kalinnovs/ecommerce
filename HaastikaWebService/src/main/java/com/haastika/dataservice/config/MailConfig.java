package com.haastika.dataservice.config;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class MailConfig {

    @Autowired
    private Environment environment;

    @Bean
    public JavaMailSender javaMailService() {
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
        javaMailSender.setHost("a2plcpnl0337.prod.iad2.secureserver.net");
        javaMailSender.setPort(465);
        javaMailSender.setPassword("Prasad#123");
        javaMailSender.setJavaMailProperties(mailServerProperties());
        return javaMailSender;
    }
    @Bean
    public Properties mailServerProperties() {
        final Properties emailProperties = System.getProperties();
        emailProperties.put("mail.smtp.starttls.enable", "true");
        emailProperties.put("mail.smtp.port", environment.getRequiredProperty("mail.smtp.port"));
        emailProperties.put("email.port", environment.getRequiredProperty("email.port"));
        emailProperties.put("mail.smtp.auth", "true");
        emailProperties.put("mail.debug","true");
        emailProperties.put("mail.smtp.user", "devi.rath@kalinnovs.com");
        emailProperties.put("mail.smtp.password", "Prasad#123");
        emailProperties.put("mail.smtp.ssl.trust", "a2plcpnl0337.prod.iad2.secureserver.net");
        return emailProperties;
    }
    
    

}
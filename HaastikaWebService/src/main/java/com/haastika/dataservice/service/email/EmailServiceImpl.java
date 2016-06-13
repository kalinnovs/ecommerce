package com.haastika.dataservice.service.email;

import java.util.Properties;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.haastika.dataservice.config.EmailSubscriptionProperties;
import com.haastika.dataservice.data.domain.FeedbackUserDetails;
import com.haastika.dataservice.data.domain.SubscriberDetails;

@Transactional
@Service("emailServiceImpl")
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private EmailSubscriptionProperties subscriptionProperties;
    
	private static final String SMTP_HOST_NAME = "smtpout.secureserver.net";//"a2plcpnl0337.prod.iad2.secureserver.net"; //smtp URL
	private static final int SMTP_HOST_PORT = 465; //port number
	private static String SMTP_AUTH_USER = "support@haastika.com"; //email_id of sender
	private static String SMTP_AUTH_PWD = "haastika"; //password of sender email_id

    @Override
    public Boolean sendEmailForSuccessfulSubscription(final SubscriberDetails subscriberDetails) {
        boolean emailStatus = true;
        final String fromUserEmailId = "devi.rath@kalinnovs.com";// just the id alone without @gmail.com
        final String emailSubject = "Haastika New user subscription";
        final String userEmailId = subscriberDetails.getEmailId();

        final String htmlTemplateForBody = "<meta charset='utf-8'><style type='text/css'>" + "body {text-align: left;"
            + "padding: 60px;}.mail-body {text-align: left;border: 1px "
            + "solid rgba(153,153,153,.4);border-radius: 6px;padding: 30px;} "
            + ".store {font-size: 35px;}.notification-header {font-size: 30px;"
            + "border-bottom: 1px solid rgba(153,153,153,.4);}</style>"
            + "<span class='icon-font store'>Haastika Subscription </span>"
            + "<div class='mail-body'><div class='notification-header'  "
            + "</div><br/><p>Dear User,</p><p>Thank you for choosing " + "to subscribe Haastika. </p><p>Your "
            + "promo code for claiming discount on your first purhase.Please qoute this code while ordering by phone "
            + subscriberDetails.getPromoCode() + "</a><p>Thank you for choosing Haastika.</p></div>";

        try {
            final MimeMessage mime = javaMailSender.createMimeMessage();
            final MimeMessageHelper messageHelper = new MimeMessageHelper(mime, true);
            messageHelper.setFrom(fromUserEmailId);
            messageHelper.setTo(userEmailId);
            // messageHelper.setBcc("biswajit_nayak01@live.com");
            messageHelper.setSubject(emailSubject);
            messageHelper.setText(htmlTemplateForBody, true);
            javaMailSender.send(mime);

        } catch (MessagingException e) {
            e.printStackTrace();
            emailStatus = false;

        } catch (Exception e) {
            e.printStackTrace();
            emailStatus = false;

        }

        return emailStatus;
    }

	@Override
	public Boolean sendDomainEmailForSuccessfulSubscription(SubscriberDetails subscriberDetails) {
		final String emailSubject = "Haastika New user subscription";
		try {
		    Properties props = new Properties();
		    props.put("mail.transport.protocol", "smtps");
		    props.put("mail.smtps.host", SMTP_HOST_NAME);
		    props.put("mail.smtps.auth", "true");

		    Session mailSession = Session.getDefaultInstance(props);
		    mailSession.setDebug(true);
		    Transport transport = mailSession.getTransport();
		    MimeMessage message = new MimeMessage(mailSession);
	        final String htmlTemplateForBody = "<div style=\"font-family:calibri;font-size:14px;color:#333\"><div class=\"adM\">"+
	        		"</div><h1 style=\"font-weight:200;font-size:24px\">Nice. You're Registered for using the Promo Code!</h1>"+
	        		"<p>Dear "+subscriberDetails.getFirstName()+", </p>"+
	        		"<p>Thank you for subscribing to our website.<br> We are glad to provide you with a Promo Code which can be used to obtain discount on your first purchase with us.</p>"+
	        		"<p style=\"font-weight:700\">Your Promo Code is "+subscriberDetails.getPromoCode()+"</p>"+
	        		"<p>Please visit our website <a href=\"http://www.haastika.com\" target=\"_blank\" data-saferedirecturl=\"https://www.google.com/url?hl=en&amp;q=http://www.haastika.com&amp;source=gmail&amp;ust=1462653253957000&amp;usg=AFQjCNGfDvFkEyKZHHWY0XDHd5CLCaWvfg\">www.<span class=\"il\">haastika</span>.com</a>.</p>"+
	        		"<br><br>"+
	        	    "<p>Thanks,<br><span class=\"il\">Haastika</span> Team<br>"+
	        		"Call us to order : +91 6742355456 / +91 9438371760</p>"+
	        		"<div class=\"yj6qo\"></div><div class=\"adL\">"+
	        	"</div></div>";

		    message.setSubject(emailSubject);
		    message.setContent(htmlTemplateForBody, "text/html");
		    Address[] from = InternetAddress.parse(SMTP_AUTH_USER);//Your domain email
		    message.addFrom(from);
		    Address[] addresses = new InternetAddress[]{new InternetAddress(subscriberDetails.getEmailId()),new InternetAddress(SMTP_AUTH_USER),new InternetAddress("biswajit.swain@haastika.com")};
		    message.addRecipients(Message.RecipientType.TO, addresses); //Send email To (Type email ID that you want to send)
//		    message.addRecipients(Message.RecipientType.CC, addresses); //Send email To (Type email ID that you want to send)

		    transport.connect(SMTP_HOST_NAME, SMTP_HOST_PORT, SMTP_AUTH_USER, SMTP_AUTH_PWD);
		    transport.sendMessage(message, message.getRecipients(Message.RecipientType.TO));
		    transport.close();
		} catch (Exception e) {
		 e.printStackTrace();
		 return false;
		}
		return true;
	}

	@Override
	public Boolean sendDomainEmailForFeedback(FeedbackUserDetails user) {
		final String emailSubject = "Feedback Received !!";
		try {
		    Properties props = new Properties();
		    props.put("mail.transport.protocol", "smtps");
		    props.put("mail.smtps.host", SMTP_HOST_NAME);
		    props.put("mail.smtps.auth", "true");

		    Session mailSession = Session.getDefaultInstance(props);
		    mailSession.setDebug(true);
		    Transport transport = mailSession.getTransport();
		    MimeMessage message = new MimeMessage(mailSession);
	        final String htmlTemplateForBody = "<body style=\"font-family:calibri; font-size: 14px; color: #333;\">"+
				"<h1 style=\"font-weight:200; font-size: 24px;\">New Feedback Received !!</h1>"+
				"<p>Dear Team, </p>"+
				"<p>"+user.getMessage()+"</p>"+
				"<br/>"+
				"<h4 style=\"font-weight:500; font-size: 16px; margin: 0 0 5px 0\">My details are: </h4>"+
				"<p style=\"margin: 2px 0 0 0\"><strong>Name: </strong><span>"+user.getName()+"</span></p>"+
				"<p style=\"margin: 2px 0 0 0\"><strong>Company: </strong><span>"+user.getCompany()+"</span></p>"+
				"<p style=\"margin: 2px 0 0 0\"><strong>Email: </strong><span>"+user.getEmailId()+"</span></p>"+
				"<br/><br/>"+
			    "<p>Thanks,<br/>"+user.getName()+"</p>"+
			    "</body>";

		    message.setSubject(emailSubject);
		    message.setContent(htmlTemplateForBody, "text/html");
		    Address[] from = InternetAddress.parse(SMTP_AUTH_USER);//Your domain email
		    message.addFrom(from);
		    Address[] addresses = new InternetAddress[]{new InternetAddress(SMTP_AUTH_USER),new InternetAddress("biswajit.swain@haastika.com")};
		    message.addRecipients(Message.RecipientType.TO, addresses); //Send email To (Type email ID that you want to send)

		    transport.connect(SMTP_HOST_NAME, SMTP_HOST_PORT, SMTP_AUTH_USER, SMTP_AUTH_PWD);
		    transport.sendMessage(message, message.getRecipients(Message.RecipientType.TO));
		    transport.close();
		} catch (Exception e) {
		 e.printStackTrace();
		 return false;
		}
		return true;
	}

}

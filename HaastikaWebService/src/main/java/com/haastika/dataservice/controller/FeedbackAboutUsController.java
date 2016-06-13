package com.haastika.dataservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.haastika.dataservice.data.domain.FeedbackResponse;
import com.haastika.dataservice.data.domain.FeedbackUserDetails;
import com.haastika.dataservice.data.domain.pageDetails.DisplayAboutUs;
import com.haastika.dataservice.service.CategoryDataService;
import com.haastika.dataservice.service.UserDataService;

@Controller
public class FeedbackAboutUsController {

    @Autowired
    private UserDataService userDataService;
    
    @Autowired 
    private CategoryDataService categoryDataService;

    @RequestMapping(value = "/sendfeedback",  method = RequestMethod.POST, consumes = "application/json")
    public @ResponseBody final FeedbackResponse sendFeedback(@RequestBody final FeedbackUserDetails userDetails) {
       return  userDataService.sendFeedbackMail(userDetails);
    }

    @RequestMapping(value = "/aboutus", method = RequestMethod.GET)
    @ResponseBody
    public DisplayAboutUs getAboutUs() {
        return categoryDataService.getAboutUs() ;
    }

}

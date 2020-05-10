package com.luffykaiyuan.lifeplatform.controller.user;

import com.luffykaiyuan.lifeplatform.po.user.FeedbackInfo;
import com.luffykaiyuan.lifeplatform.service.user.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    FeedbackService feedbackService;

    @GetMapping("/selectFeedback")
    public FeedbackInfo selectFeedback(@RequestParam("taskId") String taskId){
        return feedbackService.selectFeedback(taskId);
    }

    @PostMapping("/insertFeedback")
    public int insertFeedback(@RequestBody FeedbackInfo feedbackInfo){
        return feedbackService.insertFeedback(feedbackInfo);
    }
}

package com.luffykaiyuan.lifeplatform.service.user;

import com.luffykaiyuan.lifeplatform.dao.user.FeedbackInfoMapper;
import com.luffykaiyuan.lifeplatform.po.user.FeedbackInfo;
import com.luffykaiyuan.lifeplatform.util.UUIDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedbackService {

    @Autowired
    FeedbackInfoMapper feedbackInfoMapper;

    public FeedbackInfo selectFeedback(String taskId){
       return feedbackInfoMapper.selectFeedback(taskId);
    }

    public int insertFeedback(FeedbackInfo feedbackInfo){
        feedbackInfo.setId(UUIDUtils.getUUID(32));
        return feedbackInfoMapper.insertFeedback(feedbackInfo);
    }
}

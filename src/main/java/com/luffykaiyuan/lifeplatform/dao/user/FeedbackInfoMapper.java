package com.luffykaiyuan.lifeplatform.dao.user;

import com.luffykaiyuan.lifeplatform.po.user.FeedbackInfo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface FeedbackInfoMapper {

    FeedbackInfo selectFeedback(String taskId);

    int insertFeedback(FeedbackInfo feedbackInfo);
}
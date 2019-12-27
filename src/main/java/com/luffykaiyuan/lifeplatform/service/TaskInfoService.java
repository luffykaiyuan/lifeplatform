package com.luffykaiyuan.lifeplatform.service;

import com.luffykaiyuan.lifeplatform.dao.TaskInfoPoMapper;
import com.luffykaiyuan.lifeplatform.po.TaskInfoPo;
import com.luffykaiyuan.lifeplatform.util.GetNowDate;
import com.luffykaiyuan.lifeplatform.util.UUIDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.UUID;

@Service
public class TaskInfoService {

    @Autowired
    TaskInfoPoMapper taskInfoPoMapper;

    public String insertTask(TaskInfoPo taskInfoPo, HttpSession session){
        String id = (String)session.getAttribute("id");
        String nickName = (String) session.getAttribute("nickName");
        taskInfoPo.setAddTime(GetNowDate.getStringDate());
        taskInfoPo.setStartId(id);
        taskInfoPo.setStartName(nickName);
        taskInfoPo.setId(UUIDUtils.getUUID(32));
        int resule = taskInfoPoMapper.insertTask(taskInfoPo);
        if (resule > 0){
            return "发布成功！";
        }
        return "发布失败！";
    }

    public int updateTask(TaskInfoPo taskInfoPo){
        return taskInfoPoMapper.updateTask(taskInfoPo);
    }

    public List<TaskInfoPo> selectByTaskType(String taskType){
        return taskInfoPoMapper.selectByTaskType(taskType);
    }

    public List<TaskInfoPo> selectAllWaitTask(){
        return taskInfoPoMapper.selectAllWaitTask();
    }

    public List<TaskInfoPo> selectAllReceiveTask(String endId){
        return taskInfoPoMapper.selectAllReceiveTask(endId);
    }

    public List<TaskInfoPo> selectAllFinishTask(String endId){
        return taskInfoPoMapper.selectAllFinishTask(endId);
    }
}

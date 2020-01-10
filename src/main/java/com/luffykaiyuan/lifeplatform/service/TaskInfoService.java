package com.luffykaiyuan.lifeplatform.service;

import com.luffykaiyuan.lifeplatform.dao.TaskInfoPoMapper;
import com.luffykaiyuan.lifeplatform.po.TaskInfoPo;
import com.luffykaiyuan.lifeplatform.util.GetNowDate;
import com.luffykaiyuan.lifeplatform.util.UUIDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.List;

@Service
public class TaskInfoService {

    @Autowired
    TaskInfoPoMapper taskInfoPoMapper;

    public String insertTask(TaskInfoPo taskInfoPo, HttpSession session){
        String id = (String)session.getAttribute("id");
        String nickName = (String) session.getAttribute("nickName");
        String userName = (String) session.getAttribute("userName");
        taskInfoPo.setAddTime(GetNowDate.getStringDate());
        taskInfoPo.setStartId(id);
        taskInfoPo.setStartName(nickName);
        taskInfoPo.setStartUsername(userName);
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

    public int receiveTask(String id, HttpSession session){
        TaskInfoPo taskInfoPo = new TaskInfoPo();
        taskInfoPo.setId(id);
        taskInfoPo.setDeleteStatus("1");
        taskInfoPo.setEndId((String)session.getAttribute("id"));
        taskInfoPo.setEndUsername((String)session.getAttribute("userName"));
        taskInfoPo.setEndName((String)session.getAttribute("nickName"));
        return taskInfoPoMapper.updateTask(taskInfoPo);
    }

    public int notReceive(String id){
        TaskInfoPo taskInfoPo = new TaskInfoPo();
        taskInfoPo.setId(id);
        taskInfoPo.setDeleteStatus("0");
        taskInfoPo.setEndId(" ");
        taskInfoPo.setEndUsername(" ");
        taskInfoPo.setEndName(" ");
        return taskInfoPoMapper.updateTask(taskInfoPo);
    }

    public int finishTask(String id){
        TaskInfoPo taskInfoPo = new TaskInfoPo();
        taskInfoPo.setId(id);
        taskInfoPo.setDeleteStatus("2");
        return taskInfoPoMapper.updateTask(taskInfoPo);
    }

    public List<TaskInfoPo> selectByTaskType(String taskType){
        return taskInfoPoMapper.selectByTaskType(taskType);
    }

    public List<TaskInfoPo> selectAllWaitTask(){
        return taskInfoPoMapper.selectAllWaitTask();
    }

    public List<TaskInfoPo> selectAllReceiveTask(String endUsername){
        return taskInfoPoMapper.selectAllReceiveTask(endUsername);
    }

    public List<TaskInfoPo> selectAllFinishTask(String endUsername){
        return taskInfoPoMapper.selectAllFinishTask(endUsername);
    }
}

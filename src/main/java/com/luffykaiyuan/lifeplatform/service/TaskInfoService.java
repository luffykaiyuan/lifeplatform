package com.luffykaiyuan.lifeplatform.service;

import com.luffykaiyuan.lifeplatform.dao.TaskInfoPoMapper;
import com.luffykaiyuan.lifeplatform.po.TaskInfoPo;
import com.luffykaiyuan.lifeplatform.po.count.CountDict;
import com.luffykaiyuan.lifeplatform.po.count.CountName;
import com.luffykaiyuan.lifeplatform.util.GetNowDate;
import com.luffykaiyuan.lifeplatform.util.UUIDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Service
public class TaskInfoService {

    @Autowired
    TaskInfoPoMapper taskInfoPoMapper;

    public String insertTask(TaskInfoPo taskInfoPo, HttpSession session){
        String id = (String)session.getAttribute("id");
        taskInfoPo.setAddTime(GetNowDate.getStringDate());
        taskInfoPo.setStartId(id);
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

    public List getNum(String nickName){
        List list = new ArrayList();
        list.add(taskInfoPoMapper.countMyRelease(nickName));
        list.add(taskInfoPoMapper.countMyReceive(nickName));
        list.add(taskInfoPoMapper.countMyFinish(nickName));
        return list;
    }

    public int countMyReceive(String endName){
        return taskInfoPoMapper.countMyReceive(endName);
    }

    public int countMyFinish(String endName){
        return taskInfoPoMapper.countMyFinish(endName);
    }

    public List<TaskInfoPo> selectByTaskType(String taskType){
        return taskInfoPoMapper.selectByTaskType(taskType);
    }

    public List<TaskInfoPo> selectMyTask(String startName){
        return taskInfoPoMapper.selectMyTask(startName);
    }

    public List<TaskInfoPo> selectMyGet(String endName){
        return taskInfoPoMapper.selectMyGet(endName);
    }

    public List<TaskInfoPo> selectAllWaitTask(){
        return taskInfoPoMapper.selectAllWaitTask();
    }

    public List<TaskInfoPo> selectAllTask(){
        return taskInfoPoMapper.selectAllTask();
    }

    public List<TaskInfoPo> selectAllReceiveTask(String endUsername){
        return taskInfoPoMapper.selectAllReceiveTask(endUsername);
    }

    public List<TaskInfoPo> selectAllFinishTask(String endUsername){
        return taskInfoPoMapper.selectAllFinishTask(endUsername);
    }

    public List<CountDict> countDictType(){
        return taskInfoPoMapper.countDictType();
    }

    public List<CountDict> countDictPlace(){
        return taskInfoPoMapper.countDictPlace();
    }

    public List<CountName> countStartName(){
        return taskInfoPoMapper.countStartName();
    }


    public List<CountName> countEndName(){
        return taskInfoPoMapper.countEndName();
    }

}

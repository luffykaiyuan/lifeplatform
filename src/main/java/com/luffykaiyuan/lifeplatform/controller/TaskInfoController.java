package com.luffykaiyuan.lifeplatform.controller;

import com.luffykaiyuan.lifeplatform.po.TaskInfoPo;
import com.luffykaiyuan.lifeplatform.service.TaskInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/taskInfo")
public class TaskInfoController {

    @Autowired
    TaskInfoService taskInfoService;

    /** 
    * @Description: 查询所有任务 
    * @Param: [] 
    * @return: java.util.List<com.luffykaiyuan.lifeplatform.po.TaskInfoPo> 
    * @Author: 陈开源
    * @Date: 2020/2/11 
    */
    @GetMapping("/selectAllTask")
    public List<TaskInfoPo> selectAllTask(){
        return taskInfoService.selectAllTask();
    }
    
    /**
    * @Description:  新增一个任务
    * @Param: [taskInfoPo]
    * @return: int
    * @Author: 陈开源
    * @Date: 2019/11/22
    */
    @PostMapping("/insertTask")
    public String insertTask(@RequestBody TaskInfoPo taskInfoPo, HttpSession session){
        return taskInfoService.insertTask(taskInfoPo, session);
    }

    /**
    * @Description:  更新任务信息，以及逻辑删除调用方法
    * @Param: [taskInfoPo]
    * @return: int
    * @Author: 陈开源
    * @Date: 2019/11/22
    */
    @PostMapping("/updateTask")
    public int updateTask(@RequestBody TaskInfoPo taskInfoPo){
        return taskInfoService.updateTask(taskInfoPo);
    }

    /** 
    * @Description: 接受任务 
    * @Param: [id, session] 
    * @return: int 
    * @Author: 陈开源
    * @Date: 2020/1/10 
    */
    @GetMapping("/receiveTask")
    public int receiveTask(@RequestParam("id") String id, HttpSession session){
        return taskInfoService.receiveTask(id, session);
    }

    /** 
    * @Description: 取消接收的任务 
    * @Param: [id] 
    * @return: int 
    * @Author: 陈开源
    * @Date: 2020/1/10 
    */
    @GetMapping("/notReceive")
    public int notReceive(@RequestParam("id") String id){
        return taskInfoService.notReceive(id);
    }
    
    /** 
    * @Description: 完成任务 
    * @Param: [id] 
    * @return: int 
    * @Author: 陈开源
    * @Date: 2020/1/10 
    */
    @GetMapping("/finishTask")
    public int finishTask(@RequestParam("id") String id){
        return taskInfoService.finishTask(id);
    }

    /**
    * @Description:  通过任务类型查询任务
    * @Param: [taskType]
    * @return: java.util.List<com.luffykaiyuan.lifeplatform.po.TaskInfoPo>
    * @Author: 陈开源
    * @Date: 2019/11/22
    */
    @GetMapping("/selectByTaskType")
    public List<TaskInfoPo> selectByTaskType(@RequestParam("taskType") String taskType){
        return taskInfoService.selectByTaskType(taskType);
    }

    /**
    * @Description: 查询所有未接收任务的任务
    * @Param: []
    * @return: java.util.List<com.luffykaiyuan.lifeplatform.po.TaskInfoPo>
    * @Author: 陈开源
    * @Date: 2019/11/22
    */
    @GetMapping("/selectAllWaitTask")
    public List<TaskInfoPo> selectAllWaitTask(){
        return taskInfoService.selectAllWaitTask();
    }

    /**
    * @Description:  查询个人接收的所有任务
    * @Param: [endUsername]
    * @return: java.util.List<com.luffykaiyuan.lifeplatform.po.TaskInfoPo>
    * @Author: 陈开源
    * @Date: 2019/11/22
    */
    @GetMapping("/selectAllReceiveTask")
    public List<TaskInfoPo> selectAllReceiveTask(@RequestParam("endUsername") String endUsername){
        return taskInfoService.selectAllReceiveTask(endUsername);
    }

    /**
    * @Description: 查询个人完成的所有任务
    * @Param: [endUsername]
    * @return: java.util.List<com.luffykaiyuan.lifeplatform.po.TaskInfoPo>
    * @Author: 陈开源
    * @Date: 2019/11/22
    */
    @GetMapping("/selectAllFinishTask")
    public List<TaskInfoPo> selectAllFinishTask(@RequestParam("endUsername") String endUsername){
        return taskInfoService.selectAllFinishTask(endUsername);
    }
}

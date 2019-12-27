package com.luffykaiyuan.lifeplatform.controller;

import com.luffykaiyuan.lifeplatform.po.TaskInfoPo;
import com.luffykaiyuan.lifeplatform.service.TaskInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/taskInfo")
public class TaskInfoController {

    @Autowired
    TaskInfoService taskInfoService;

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
    * @Param: [endId]
    * @return: java.util.List<com.luffykaiyuan.lifeplatform.po.TaskInfoPo>
    * @Author: 陈开源
    * @Date: 2019/11/22
    */
    @GetMapping("/selectAllReceiveTask")
    public List<TaskInfoPo> selectAllReceiveTask(@RequestParam("endId") String endId){
        return taskInfoService.selectAllReceiveTask(endId);
    }

    /**
    * @Description: 查询个人完成的所有任务
    * @Param: [endId]
    * @return: java.util.List<com.luffykaiyuan.lifeplatform.po.TaskInfoPo>
    * @Author: 陈开源
    * @Date: 2019/11/22
    */
    @GetMapping("/selectAllFinishTask")
    public List<TaskInfoPo> selectAllFinishTask(@RequestParam("endId") String endId){
        return taskInfoService.selectAllFinishTask(endId);
    }
}

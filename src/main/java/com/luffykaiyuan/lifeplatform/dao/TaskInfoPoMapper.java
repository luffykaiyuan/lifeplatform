package com.luffykaiyuan.lifeplatform.dao;

import com.luffykaiyuan.lifeplatform.po.TaskInfoPo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface TaskInfoPoMapper {

    int insertTask(TaskInfoPo taskInfoPo);

    int updateTask(TaskInfoPo taskInfoPo);

    List<TaskInfoPo> selectByTaskType(String taskType);

    List<TaskInfoPo> selectAllWaitTask();

    List<TaskInfoPo> selectAllTask();

    List<TaskInfoPo> selectAllReceiveTask(String endUsername);

    List<TaskInfoPo> selectAllFinishTask(String endUsername);

    //以下为自动生成代码

    TaskInfoPo selectByPrimaryKey(String id);
}
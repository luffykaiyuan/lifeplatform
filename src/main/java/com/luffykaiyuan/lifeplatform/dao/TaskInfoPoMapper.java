package com.luffykaiyuan.lifeplatform.dao;

import com.luffykaiyuan.lifeplatform.po.TaskInfoPo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface TaskInfoPoMapper {

    int insertTask(TaskInfoPo record);

    int updateTask(TaskInfoPo record);

    List<TaskInfoPo> selectByTaskType(String taskType);

    List<TaskInfoPo> selectAllWaitTask();

    List<TaskInfoPo> selectAllReceiveTask(String endId);

    List<TaskInfoPo> selectAllFinishTask(String endId);

    //以下为自动生成代码

    int deleteByPrimaryKey(String id);

    int insert(TaskInfoPo record);

    TaskInfoPo selectByPrimaryKey(String id);

    int updateByPrimaryKey(TaskInfoPo record);
}
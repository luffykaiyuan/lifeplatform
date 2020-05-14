package com.luffykaiyuan.lifeplatform.dao;

import com.luffykaiyuan.lifeplatform.po.TaskInfoPo;
import com.luffykaiyuan.lifeplatform.po.count.CountDict;
import com.luffykaiyuan.lifeplatform.po.count.CountName;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface TaskInfoPoMapper {

    int taskTodayNum(String addTime);

    int taskAllNum();

    int insertTask(TaskInfoPo taskInfoPo);

    int updateTask(TaskInfoPo taskInfoPo);

    int countMyRelease(String startName);

    int countMyReceive(String endName);

    int countMyFinish(String endName);

    List<TaskInfoPo> selectAudit();

    List<TaskInfoPo> selectDoing();

    List<TaskInfoPo> selectMyTask(String startName);

    List<TaskInfoPo> selectMyGet(String endName);

    List<TaskInfoPo> selectByTaskType(String taskType);

    List<TaskInfoPo> selectAllWaitTask();

    List<TaskInfoPo> selectAllTask();

    List<TaskInfoPo> selectAllReceiveTask(String endUsername);

    List<TaskInfoPo> selectAllFinishTask(String endUsername);

    List<CountDict> countDictType();

    List<CountDict> countDictPlace();

    List<CountName> countStartName();

    List<CountName> countEndName();
}
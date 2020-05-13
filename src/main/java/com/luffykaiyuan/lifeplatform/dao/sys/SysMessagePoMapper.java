package com.luffykaiyuan.lifeplatform.dao.sys;

import com.luffykaiyuan.lifeplatform.po.sys.SysMessagePo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface SysMessagePoMapper {

    int insertMessage(SysMessagePo sysMessagePo);

    SysMessagePo selectMessage(String id);

    List<SysMessagePo> selectAllMessage();

    List<SysMessagePo> selectThreeMessage();

    int updateMessage(SysMessagePo sysMessagePo);

    int updateAllMessage(List<SysMessagePo> list);
}
package com.luffykaiyuan.lifeplatform.dao.sys;

import com.luffykaiyuan.lifeplatform.po.sys.SysMessagePo;

public interface SysMessagePoMapper {
    int deleteByPrimaryKey(String id);

    int insert(SysMessagePo record);

    int insertSelective(SysMessagePo record);

    SysMessagePo selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(SysMessagePo record);

    int updateByPrimaryKey(SysMessagePo record);
}
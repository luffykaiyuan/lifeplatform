package com.luffykaiyuan.lifeplatform.dao.sys;

import com.luffykaiyuan.lifeplatform.po.sys.SysInfoPo;

public interface SysInfoPoMapper {
    int deleteByPrimaryKey(String id);

    int insert(SysInfoPo record);

    int insertSelective(SysInfoPo record);

    SysInfoPo selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(SysInfoPo record);

    int updateByPrimaryKey(SysInfoPo record);
}
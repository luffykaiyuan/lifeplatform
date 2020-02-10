package com.luffykaiyuan.lifeplatform.dao.sys;

import com.luffykaiyuan.lifeplatform.po.sys.SysInfoPo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface SysInfoPoMapper {

    SysInfoPo confirmAdmin(SysInfoPo sysInfoPo);



    int insert(SysInfoPo record);

    int insertSelective(SysInfoPo record);

    int updateByPrimaryKeySelective(SysInfoPo record);

    int updateByPrimaryKey(SysInfoPo record);
}
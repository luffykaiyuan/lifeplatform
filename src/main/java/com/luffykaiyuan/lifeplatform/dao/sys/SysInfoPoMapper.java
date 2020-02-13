package com.luffykaiyuan.lifeplatform.dao.sys;

import com.luffykaiyuan.lifeplatform.po.sys.SysInfoPo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface SysInfoPoMapper {

    SysInfoPo confirmAdmin(SysInfoPo sysInfoPo);

    int insertAdmin(SysInfoPo sysInfoPo);

    int updateAdmin(SysInfoPo sysInfoPo);

}
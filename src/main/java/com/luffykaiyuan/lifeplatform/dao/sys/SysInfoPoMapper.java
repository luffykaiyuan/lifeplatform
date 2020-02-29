package com.luffykaiyuan.lifeplatform.dao.sys;

import com.luffykaiyuan.lifeplatform.po.sys.SysInfoPo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface SysInfoPoMapper {

    SysInfoPo confirmAdmin(SysInfoPo sysInfoPo);

    List<SysInfoPo> selectAll();

    int insertAdmin(SysInfoPo sysInfoPo);

    int updateAdmin(SysInfoPo sysInfoPo);

}
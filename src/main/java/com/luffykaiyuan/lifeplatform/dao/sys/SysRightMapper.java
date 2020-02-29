package com.luffykaiyuan.lifeplatform.dao.sys;

import com.luffykaiyuan.lifeplatform.po.sys.SysRight;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface SysRightMapper {

    int insertSysRight(SysRight sysRight);

    SysRight selectBySysId(Integer id);

    List<SysRight> selectAll();

    int updateSysRight(SysRight sysRight);
}
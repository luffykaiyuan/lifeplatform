package com.luffykaiyuan.lifeplatform.dao;

import com.luffykaiyuan.lifeplatform.po.DictInfoPo;

public interface DictInfoPoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(DictInfoPo record);

    int insertSelective(DictInfoPo record);

    DictInfoPo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(DictInfoPo record);

    int updateByPrimaryKey(DictInfoPo record);
}
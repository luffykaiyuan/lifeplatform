package com.luffykaiyuan.lifeplatform.dao;

import com.luffykaiyuan.lifeplatform.po.DictInfoPo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface DictInfoPoMapper {

    int addDict(DictInfoPo dictInfoPo);

    List<DictInfoPo> selectDictPlace();

    List<DictInfoPo> selectDictType();

    int updateDict(DictInfoPo dictInfoPo);

}
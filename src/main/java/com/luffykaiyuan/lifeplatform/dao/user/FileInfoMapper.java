package com.luffykaiyuan.lifeplatform.dao.user;

import com.luffykaiyuan.lifeplatform.po.user.FileInfo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface FileInfoMapper {

    int insertFile(FileInfo fileInfo);

    FileInfo selectFile(String id);


    int updateByPrimaryKeySelective(FileInfo record);

}
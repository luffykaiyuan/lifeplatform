package com.luffykaiyuan.lifeplatform.dao.user;

import com.luffykaiyuan.lifeplatform.po.user.LoginInfoPo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface LoginInfoPoMapper {

    int insertLoginInfo(LoginInfoPo loginInfoPo);

    LoginInfoPo selectByUserName(String userName);

    String confirmUser(String userName);

    int updateLoginInfo(LoginInfoPo loginInfoPo);
}
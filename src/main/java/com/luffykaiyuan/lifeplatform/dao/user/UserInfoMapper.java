package com.luffykaiyuan.lifeplatform.dao.user;

import com.luffykaiyuan.lifeplatform.po.user.UserInfo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface UserInfoMapper {

    int insertUserInfo(UserInfo userInfo);

    int updateUserInfo(UserInfo userInfo);

    UserInfo selectUserInfo(String loginId);

}
package com.luffykaiyuan.lifeplatform.dao.user;

import com.luffykaiyuan.lifeplatform.po.user.UserInfo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface UserInfoMapper {

    int insertUserInfo(UserInfo userInfo);

    int updateUserInfo(UserInfo userInfo);

    UserInfo selectUserInfo(String loginId);

    UserInfo selectInfo(String nickName);

    List<UserInfo> selectAllUser();
}
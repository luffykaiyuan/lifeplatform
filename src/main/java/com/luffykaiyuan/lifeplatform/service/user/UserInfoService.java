package com.luffykaiyuan.lifeplatform.service.user;

import com.luffykaiyuan.lifeplatform.dao.user.UserInfoMapper;
import com.luffykaiyuan.lifeplatform.po.user.UserInfo;
import com.luffykaiyuan.lifeplatform.util.GetNowDate;
import com.luffykaiyuan.lifeplatform.util.UUIDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.List;

@Service
public class UserInfoService {

    @Autowired
    UserInfoMapper userInfoMapper;

    public int userTodayNum() {
        String addTime = GetNowDate.getStringDate();
        return userInfoMapper.userTodayNum(addTime);
    }

    public int userAllNum() {
        return userInfoMapper.userAllNum();
    }

    public int updateUserInfo(UserInfo userInfo){
        return userInfoMapper.updateUserInfo(userInfo);
    }

    public UserInfo selectUserInfo(String loginId){
        return userInfoMapper.selectUserInfo(loginId);
    }

    public UserInfo selectInfo(String nickName){
        return userInfoMapper.selectInfo(nickName);
    }

    public List<UserInfo> selectAllUser(){
        return userInfoMapper.selectAllUser();
    }
}

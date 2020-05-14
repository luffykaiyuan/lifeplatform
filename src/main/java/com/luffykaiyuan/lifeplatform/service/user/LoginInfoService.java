package com.luffykaiyuan.lifeplatform.service.user;

import com.luffykaiyuan.lifeplatform.dao.user.LoginInfoPoMapper;
import com.luffykaiyuan.lifeplatform.dao.user.UserInfoMapper;
import com.luffykaiyuan.lifeplatform.po.user.LoginInfoPo;
import com.luffykaiyuan.lifeplatform.po.user.UserInfo;
import com.luffykaiyuan.lifeplatform.util.GetNowDate;
import com.luffykaiyuan.lifeplatform.util.UUIDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
public class LoginInfoService {

    @Autowired
    LoginInfoPoMapper loginInfoPoMapper;

    @Autowired
    UserInfoMapper userInfoMapper;

    public int insertLoginInfo(LoginInfoPo loginInfoPo){
        loginInfoPo.setId(UUIDUtils.getUUID(32));
        loginInfoPo.setAddTime(GetNowDate.getStringDate());
        UserInfo userInfo = new UserInfo();
        userInfo.setId(UUIDUtils.getUUID(32));
        userInfo.setLoginId(loginInfoPo.getUserName());
        userInfo.setNickName(loginInfoPo.getNickName());
        userInfo.setAddTime(GetNowDate.getStringDate());
        userInfoMapper.insertUserInfo(userInfo);
        return loginInfoPoMapper.insertLoginInfo(loginInfoPo);
    }

    public LoginInfoPo selectByNickName(String nickName){
        return loginInfoPoMapper.selectByNickName(nickName);
    }

    public String selectByUserName(LoginInfoPo loginInfoPo, HttpSession session){
        LoginInfoPo back =  loginInfoPoMapper.selectByUserName(loginInfoPo.getUserName());
        if (back == null){
            return "用户不存在！";
        }
        if (loginInfoPo.getPassword().equals(back.getPassword())){
            session.setAttribute("userName", back.getUserName());
            session.setAttribute("nickName", back.getNickName());
            session.setAttribute("id", back.getId());
            return "登录成功！";
        } else{
            return "密码错误！";
        }
    }

    public boolean confirmUser(String userName){
        String user = loginInfoPoMapper.confirmUser(userName);
        if (null == user){
            return false;
        }else {
            return true;
        }
    }

    public int updateLoginInfo(LoginInfoPo loginInfoPo){
        return loginInfoPoMapper.updateLoginInfo(loginInfoPo);
    }

    public int deleteLoginInfo(LoginInfoPo loginInfoPo){
        UserInfo userInfo = new UserInfo();
        userInfo.setId(loginInfoPo.getId());
        userInfo.setDeleteStatus("0");
        userInfoMapper.updateUserInfo(userInfo);
        return loginInfoPoMapper.deleteLoginInfo(loginInfoPo);
    }
}

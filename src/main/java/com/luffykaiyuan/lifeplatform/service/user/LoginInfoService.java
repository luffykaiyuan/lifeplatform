package com.luffykaiyuan.lifeplatform.service.user;

import com.luffykaiyuan.lifeplatform.dao.user.LoginInfoPoMapper;
import com.luffykaiyuan.lifeplatform.po.user.LoginInfoPo;
import com.luffykaiyuan.lifeplatform.util.GetNowDate;
import com.luffykaiyuan.lifeplatform.util.UUIDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
public class LoginInfoService {

    @Autowired
    LoginInfoPoMapper loginInfoPoMapper;

    public int insertLoginInfo(LoginInfoPo loginInfoPo){
        loginInfoPo.setId(UUIDUtils.getUUID(32));
        loginInfoPo.setAddTime(GetNowDate.getStringDate());
        return loginInfoPoMapper.insertLoginInfo(loginInfoPo);
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
        return updateLoginInfo(loginInfoPo);
    }
}

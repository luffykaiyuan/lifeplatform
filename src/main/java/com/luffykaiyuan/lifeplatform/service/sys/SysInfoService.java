package com.luffykaiyuan.lifeplatform.service.sys;

import com.luffykaiyuan.lifeplatform.dao.sys.SysInfoPoMapper;
import com.luffykaiyuan.lifeplatform.po.sys.SysInfoPo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
public class SysInfoService {

    @Autowired
    private SysInfoPoMapper sysInfoPoMapper;

    public String confirmAdmin(SysInfoPo sysInfoPo, HttpSession session){
        SysInfoPo backSys = sysInfoPoMapper.confirmAdmin(sysInfoPo);
        if (backSys != null){
            if (backSys.getPassword().equals(sysInfoPo.getPassword())){
                session.setAttribute("userName", backSys.getUserName());
                session.setAttribute("id", backSys.getId());
                return "success";
            }else {
                return "账号或密码错误！";
            }
        }else {
            return "账号不存在！";
        }
    }

}

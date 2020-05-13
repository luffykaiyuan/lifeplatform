package com.luffykaiyuan.lifeplatform.controller.user;

import com.luffykaiyuan.lifeplatform.po.sys.SysInfoPo;
import com.luffykaiyuan.lifeplatform.po.user.LoginInfoPo;
import com.luffykaiyuan.lifeplatform.service.sys.SysInfoService;
import com.luffykaiyuan.lifeplatform.service.user.LoginInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RequestMapping("/user")
@RestController
public class LoginInfoController {
    
    @Autowired
    LoginInfoService loginInfoService;

    @Autowired
    SysInfoService sysInfoService;

    @GetMapping("/selectByNickName")
    public LoginInfoPo selectByNickName(@RequestParam("nickName") String nickName){
        return loginInfoService.selectByNickName(nickName);
    }

    /**
    * @Description: 用户注册 
    * @Param: [loginInfoPo] 
    * @return: java.lang.String 
    * @Author: 陈开源
    * @Date: 2019/11/22 
    */
    @PostMapping("/insertLoginInfo")
    public String insertLoginInfo(@RequestBody LoginInfoPo loginInfoPo){
        loginInfoService.insertLoginInfo(loginInfoPo);
        return "success";
    }

    /** 
    * @Description: 登录验证 
    * @Param: [userName] 
    * @return: java.lang.String 
    * @Author: 陈开源
    * @Date: 2019/11/22 
    */
    @PostMapping("/doLogin")
    public String selectByUserName(@RequestBody LoginInfoPo loginInfoPo, HttpSession session){
        return loginInfoService.selectByUserName(loginInfoPo, session);
    }

    /**
    * @Description: 校验账号是否存在
    * @Param: [userName]
    * @return: boolean
    * @Author: 陈开源
    * @Date: 2019/12/27
    */
    @GetMapping("/confirmUser")
    public boolean confirmUser(@RequestParam("userName") String userName){
        return loginInfoService.confirmUser(userName);
    }

    /** 
    * @Description: 用户登录信息修改
    * @Param: [loginInfoPo] 
    * @return: java.lang.String 
    * @Author: 陈开源
    * @Date: 2019/11/22 
    */
    @PostMapping("/updateLoginInfo")
    public void updateLoginInfo(@RequestBody LoginInfoPo loginInfoPo){
        loginInfoService.updateLoginInfo(loginInfoPo);
    }

    /** 
    * @Description: 管理员账号登录 
    * @Param: [sysInfoPo, session] 
    * @return: java.lang.String 
    * @Author: 陈开源
    * @Date: 2020/2/10 
    */
    @PostMapping("/adminLogin")
    public String adminLogin(@RequestBody SysInfoPo sysInfoPo, HttpSession session){
        return sysInfoService.confirmAdmin(sysInfoPo, session);
    }
}

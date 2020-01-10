package com.luffykaiyuan.lifeplatform.controller.user;

import com.luffykaiyuan.lifeplatform.po.user.UserInfo;
import com.luffykaiyuan.lifeplatform.service.user.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/userInfo")
@RestController
public class UserInfoController {

    @Autowired
    UserInfoService userInfoService;

    @PostMapping("/updateUserInfo")
    public int updateUserInfo(@RequestBody UserInfo userInfo){
        return userInfoService.updateUserInfo(userInfo);
    }

    @GetMapping("/selectUserInfo")
    public UserInfo selectUserInfo(@RequestParam("loginId") String loginId){
        System.out.println("1111111111111111");
        return userInfoService.selectUserInfo(loginId);
    }
}

package com.luffykaiyuan.lifeplatform.controller.user;

import com.luffykaiyuan.lifeplatform.po.user.UserInfo;
import com.luffykaiyuan.lifeplatform.service.user.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/userInfo")
@RestController
public class UserInfoController {

    @Autowired
    UserInfoService userInfoService;

    @GetMapping("/userTodayNum")
    public int userTodayNum() {
        return userInfoService.userTodayNum();
    }

    @GetMapping("/userAllNum")
    public int userAllNum() {
        return userInfoService.userAllNum();
    }

    @PostMapping("/updateUserInfo")
    public int updateUserInfo(@RequestBody UserInfo userInfo){
        return userInfoService.updateUserInfo(userInfo);
    }

    @GetMapping("/selectUserInfo")
    public UserInfo selectUserInfo(@RequestParam("loginId") String loginId){
        return userInfoService.selectUserInfo(loginId);
    }

    @GetMapping("/selectInfo")
    public UserInfo selectInfo(@RequestParam("nickName") String nickName){
        return userInfoService.selectInfo(nickName);
    }

    @GetMapping("/selectAllUser")
    public List<UserInfo> selectAllUser(){
        return userInfoService.selectAllUser();
    }
}

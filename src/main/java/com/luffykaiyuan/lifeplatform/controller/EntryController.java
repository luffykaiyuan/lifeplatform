package com.luffykaiyuan.lifeplatform.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class EntryController {

    @RequestMapping("/index")
    public String entryIndex(){
        return "front/index";
    }

    @RequestMapping("/taskList")
    public String entryTaskList(){
        return "front/taskList";
    }

    @RequestMapping("/userInfo")
    public String entryUserInfo(){
        return "front/userInfo";
    }

    @RequestMapping("/login")
    public String entryLogin(){
        return "front/login";
    }
}

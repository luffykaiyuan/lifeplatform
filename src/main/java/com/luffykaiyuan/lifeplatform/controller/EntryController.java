package com.luffykaiyuan.lifeplatform.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class EntryController {

    @RequestMapping("/taskList")
    public String entryTaskList(){
        return "front/taskList";
    }

    @RequestMapping("/myRelease")
    public String entryMyRelease(){
        return "front/myRelease";
    }

    @RequestMapping("/myGet")
    public String entryMyGet(){
        return "front/myGet";
    }

    @RequestMapping("/userInfo")
    public String entryUserInfo(){
        return "front/userInfo";
    }

    @RequestMapping("/login")
    public String entryLogin(){
        return "front/login";
    }



    @RequestMapping("/adminLogin")
    public String entryAdminLogin(){
        return "app/adminLogin";
    }

    @RequestMapping("/index")
    public String entryIndex(){
        return "app/index";
    }

    @RequestMapping("/taskBack")
    public String entryTaskBack(){
        return "app/taskBack";
    }

    @RequestMapping("/taskDoing")
    public String entryTaskDoing(){
        return "app/taskDoing";
    }

    @RequestMapping("/userBack")
    public String entryUserBack(){
        return "app/userBack";
    }

    @RequestMapping("/typeBack")
    public String entryTypeBack(){
        return "app/typeBack";
    }

    @RequestMapping("/placeBack")
    public String entryPlaceBack(){
        return "app/placeBack";
    }

    @RequestMapping("/messageBack")
    public String entryMessageBack(){
        return "app/messageBack";
    }

    @RequestMapping("/adminBack")
    public String entryAdminBack(){
        return "app/adminBack";
    }

}

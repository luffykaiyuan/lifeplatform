package com.luffykaiyuan.lifeplatform.controller.sys;

import com.luffykaiyuan.lifeplatform.po.sys.SysRight;
import com.luffykaiyuan.lifeplatform.service.sys.SysRightService;
import com.luffykaiyuan.lifeplatform.util.GetNowDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/sysRight")
public class SysRightController {

    @Autowired
    SysRightService sysRightService;

    @PostMapping("/insertSysRight")
    public int insertSysRight(@RequestBody SysRight sysRight, HttpSession session){
        return sysRightService.insertSysRight(sysRight, session);
    }

    @GetMapping("/selectBySysId")
    public SysRight selectBySysId(@RequestParam("id") Integer id){
        return sysRightService.selectBySysId(id);
    }

    @GetMapping("/selectAll")
    public List<SysRight> selectBySysId(){
        return sysRightService.selectAll();
    }

    @PostMapping("/updateSysRight")
    public int updateSysRight(@RequestBody SysRight sysRight){
        return sysRightService.updateSysRight(sysRight);
    }
}

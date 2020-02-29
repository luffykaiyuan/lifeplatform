package com.luffykaiyuan.lifeplatform.controller.sys;

import com.luffykaiyuan.lifeplatform.po.sys.SysInfoPo;
import com.luffykaiyuan.lifeplatform.service.sys.SysInfoService;
import com.luffykaiyuan.lifeplatform.util.GetNowDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sysInfo")
public class SysInfoController {

    @Autowired
    SysInfoService sysInfoService;

    @GetMapping("/selectAll")
    public List<SysInfoPo> selectAll(){
        return sysInfoService.selectAll();
    }

    @PostMapping("/insertAdmin")
    public String insertAdmin(@RequestBody SysInfoPo sysInfoPo){
        sysInfoPo.setAddTime(GetNowDate.getStringDate());
        return sysInfoService.insertAdmin(sysInfoPo);
    }

    @PostMapping("/updateAdmin")
    public int updateAdmin(@RequestBody SysInfoPo sysInfoPo){
        return sysInfoService.updateAdmin(sysInfoPo);
    }
}

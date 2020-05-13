package com.luffykaiyuan.lifeplatform.controller.sys;

import com.luffykaiyuan.lifeplatform.po.sys.SysMessagePo;
import com.luffykaiyuan.lifeplatform.service.sys.SysMessageService;
import com.luffykaiyuan.lifeplatform.util.GetNowDate;
import com.luffykaiyuan.lifeplatform.util.UUIDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/message")
public class SysMessageController {

    @Autowired
    SysMessageService sysMessageService;

    @PostMapping("/insertMessage")
    public int insertMessage(@RequestBody SysMessagePo sysMessagePo, HttpSession session){
        return sysMessageService.insertMessage(sysMessagePo, session);
    }

    @GetMapping("/selectMessage")
    public SysMessagePo selectMessage(@RequestParam("id") String id){
        return sysMessageService.selectMessage(id);
    }

    @GetMapping("/selectAllMessage")
    public List<SysMessagePo> selectAllMessage(){
        return sysMessageService.selectAllMessage();
    }

    @GetMapping("/selectThreeMessage")
    public List<SysMessagePo> selectThreeMessage(){
        return sysMessageService.selectThreeMessage();
    }

    @PostMapping("/updateMessage")
    public int updateMessage(@RequestBody SysMessagePo sysMessagePo){
        return sysMessageService.updateMessage(sysMessagePo);
    }

    @PostMapping("/updateAllMessage")
    public int updateAllMessage(@RequestBody List<SysMessagePo> list){
        return sysMessageService.updateAllMessage(list);
    }
}

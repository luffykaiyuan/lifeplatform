package com.luffykaiyuan.lifeplatform.service.sys;

import com.luffykaiyuan.lifeplatform.dao.sys.SysMessagePoMapper;
import com.luffykaiyuan.lifeplatform.po.sys.SysMessagePo;
import com.luffykaiyuan.lifeplatform.util.GetNowDate;
import com.luffykaiyuan.lifeplatform.util.UUIDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.List;

@Service
public class SysMessageService {

    @Autowired
    SysMessagePoMapper sysMessagePoMapper;

    public int insertMessage(SysMessagePo sysMessagePo, HttpSession session){
        String username = (String) session.getAttribute("userName");
        String id = (String) session.getAttribute("id");
        if (!"".equals(username) && null != username){
            sysMessagePo.setSysId(id);
            sysMessagePo.setSysName(username);
        }
        sysMessagePo.setId(UUIDUtils.getUUID(32));
        sysMessagePo.setAnnounceTime(GetNowDate.getStringDate());
        sysMessagePo.setAddTime(GetNowDate.getStringDate());
        return sysMessagePoMapper.insertMessage(sysMessagePo);
    }

    public SysMessagePo selectMessage(String id){
        return sysMessagePoMapper.selectMessage(id);
    }

    public List<SysMessagePo> selectAllMessage(){
        return sysMessagePoMapper.selectAllMessage();
    }

    public List<SysMessagePo> selectThreeMessage(){
        return sysMessagePoMapper.selectThreeMessage();
    }

    public int updateMessage(SysMessagePo sysMessagePo){
        return sysMessagePoMapper.updateMessage(sysMessagePo);
    }

    public int updateAllMessage(List<SysMessagePo> list){
        return sysMessagePoMapper.updateAllMessage(list);
    }
}

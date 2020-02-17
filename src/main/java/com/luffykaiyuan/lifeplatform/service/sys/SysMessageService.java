package com.luffykaiyuan.lifeplatform.service.sys;

import com.luffykaiyuan.lifeplatform.dao.sys.SysMessagePoMapper;
import com.luffykaiyuan.lifeplatform.po.sys.SysMessagePo;
import com.luffykaiyuan.lifeplatform.util.GetNowDate;
import com.luffykaiyuan.lifeplatform.util.UUIDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SysMessageService {

    @Autowired
    SysMessagePoMapper sysMessagePoMapper;

    public int insertMessage(SysMessagePo sysMessagePo){
        sysMessagePo.setId(UUIDUtils.getUUID(16));
        sysMessagePo.setAddTime(GetNowDate.getStringDate());
        return sysMessagePoMapper.insertMessage(sysMessagePo);
    }

    public SysMessagePo selectMessage(String id){
        return sysMessagePoMapper.selectMessage(id);
    }

    public List<SysMessagePo> selectAllMessage(){
        return selectAllMessage();
    }

    public int updateMessage(SysMessagePo sysMessagePo){
        return updateMessage(sysMessagePo);
    }
}

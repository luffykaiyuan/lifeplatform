package com.luffykaiyuan.lifeplatform.service.sys;

import com.luffykaiyuan.lifeplatform.dao.sys.SysMessagePoMapper;
import com.luffykaiyuan.lifeplatform.dao.sys.SysRightMapper;
import com.luffykaiyuan.lifeplatform.po.sys.SysRight;
import com.luffykaiyuan.lifeplatform.util.GetNowDate;
import com.luffykaiyuan.lifeplatform.util.UUIDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.List;

@Service
public class SysRightService {

    @Autowired
    SysRightMapper sysRightMapper;

    public int insertSysRight(SysRight sysRight, HttpSession session){
        String id = (String) session.getAttribute("id");
        if (!"".equals(id) && null != id){
            sysRight.setSysId(id);
        }
        sysRight.setAddTime(GetNowDate.getStringDate());
        return sysRightMapper.insertSysRight(sysRight);
    }

    public SysRight selectBySysId(Integer id){
        return sysRightMapper.selectBySysId(id);
    }

    public List<SysRight> selectAll(){
        return sysRightMapper.selectAll();
    }

    public int updateSysRight(SysRight sysRight){
        return sysRightMapper.updateSysRight(sysRight);
    }
}

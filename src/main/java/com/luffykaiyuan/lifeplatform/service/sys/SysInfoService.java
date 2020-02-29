package com.luffykaiyuan.lifeplatform.service.sys;

import com.luffykaiyuan.lifeplatform.dao.sys.SysInfoPoMapper;
import com.luffykaiyuan.lifeplatform.po.sys.SysInfoPo;
import com.luffykaiyuan.lifeplatform.util.GetNowDate;
import com.luffykaiyuan.lifeplatform.util.UUIDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.List;

@Service
public class SysInfoService {

    @Autowired
    private SysInfoPoMapper sysInfoPoMapper;

    public String confirmAdmin(SysInfoPo sysInfoPo, HttpSession session){
        SysInfoPo backSys = sysInfoPoMapper.confirmAdmin(sysInfoPo);
        if (backSys != null){
            if (backSys.getPassword().equals(sysInfoPo.getPassword())){
                session.setAttribute("userName", backSys.getUserName());
                session.setAttribute("id", backSys.getId());
                return "success";
            }else {
                return "账号或密码错误！";
            }
        }else {
            return "账号不存在！";
        }
    }

    public List<SysInfoPo> selectAll(){
        return sysInfoPoMapper.selectAll();
    }

    public String insertAdmin(SysInfoPo sysInfoPo){
        String id = UUIDUtils.getUUID(32);
        sysInfoPo.setId(id);
        sysInfoPo.setAddTime(GetNowDate.getStringDate());
        sysInfoPoMapper.insertAdmin(sysInfoPo);
        return id;
    }

    public int updateAdmin(SysInfoPo sysInfoPo){
        return sysInfoPoMapper.updateAdmin(sysInfoPo);
    }

}

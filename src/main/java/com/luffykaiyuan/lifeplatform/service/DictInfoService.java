package com.luffykaiyuan.lifeplatform.service;

import com.luffykaiyuan.lifeplatform.dao.DictInfoPoMapper;
import com.luffykaiyuan.lifeplatform.po.DictInfoPo;
import com.luffykaiyuan.lifeplatform.util.GetNowDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.List;

@Service
public class DictInfoService {

    @Autowired
    DictInfoPoMapper dictInfoPoMapper;

    public int addDict(DictInfoPo dictInfoPo, HttpSession session){
        String username = (String) session.getAttribute("userName");
        if (!"".equals(username) && null != username){
            dictInfoPo.setAddUser(username);
        }
        dictInfoPo.setAddTime(GetNowDate.getStringDate());
        return dictInfoPoMapper.addDict(dictInfoPo);
    }

    public List<DictInfoPo> selectDictPlace(){
        return dictInfoPoMapper.selectDictPlace();
    }

    public List<DictInfoPo> selectDictType(){
        return dictInfoPoMapper.selectDictType();
    }

    public int updateDict(DictInfoPo dictInfoPo){
        return dictInfoPoMapper.updateDict(dictInfoPo);
    }
}

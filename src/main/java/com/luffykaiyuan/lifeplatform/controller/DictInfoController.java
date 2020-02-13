package com.luffykaiyuan.lifeplatform.controller;

import com.luffykaiyuan.lifeplatform.po.DictInfoPo;
import com.luffykaiyuan.lifeplatform.service.DictInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/dictInfo")
public class DictInfoController {

    @Autowired
    DictInfoService dictInfoService;

    /**
    * @Description:  添加字典
    * @Param: [dictInfoPo, session]
    * @return: int
    * @Author: 陈开源
    * @Date: 2020/2/12
    */
    @PostMapping("/addDict")
    public int addDict(@RequestBody DictInfoPo dictInfoPo, HttpSession session){
        return dictInfoService.addDict(dictInfoPo, session);
    }

    /**
    * @Description: 查找所有任务类型
    * @Param: []
    * @return: java.util.List<com.luffykaiyuan.lifeplatform.po.DictInfoPo>
    * @Author: 陈开源
    * @Date: 2020/2/12
    */
    @GetMapping("/selectDictType")
    public List<DictInfoPo> selectDictType(){
        return dictInfoService.selectDictType();
    }

    /**
     * @Description:  查找所有任务地址
     * @Param: []
     * @return: java.util.List<com.luffykaiyuan.lifeplatform.po.DictInfoPo>
     * @Author: 陈开源
     * @Date: 2020/2/12
     */
    @GetMapping("/selectDictPlace")
    public List<DictInfoPo> selectDictPlace(){
        return dictInfoService.selectDictPlace();
    }

    /**
    * @Description: 更新字典信息
    * @Param: [dictInfoPo]
    * @return: int
    * @Author: 陈开源
    * @Date: 2020/2/12
    */
    @PostMapping("/updateDict")
    public int updateDict(@RequestBody DictInfoPo dictInfoPo){
        return dictInfoService.updateDict(dictInfoPo);
    }
}

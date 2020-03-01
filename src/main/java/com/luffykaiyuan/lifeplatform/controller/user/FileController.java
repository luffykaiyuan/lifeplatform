package com.luffykaiyuan.lifeplatform.controller.user;

import com.luffykaiyuan.lifeplatform.po.user.FileInfo;
import com.luffykaiyuan.lifeplatform.service.user.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;

@RestController
@RequestMapping("/file")
public class FileController {

    @Autowired
    FileService fileService;

    @PostMapping(value = "/imgUpload")
    @ResponseBody
    public String imgUpload(MultipartHttpServletRequest muiltRequest, HttpSession session) throws IOException {
        return fileService.copyImg(muiltRequest, session);
    }

    @RequestMapping("/selectFile")
    public void getFile(HttpServletRequest request , HttpServletResponse response, @RequestParam("id") String id) throws IOException {
        fileService.selectFile(request,response,id);
    }
}

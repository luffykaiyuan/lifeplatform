package com.luffykaiyuan.lifeplatform.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class GetNowDate {
    //获取字符串类型的当前时间
    public static String getStringDate() {
        Date date = new Date();
        SimpleDateFormat sdf
                = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.format(date);
    }

    //获取时间类型的  当前时间
    public static Date getDate() {
        Date date = new Date();
        SimpleDateFormat sdf
                = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            date = sdf.parse(sdf.format(date));
            return date;
        } catch (Exception e) {
            return date;
        }
    }
}


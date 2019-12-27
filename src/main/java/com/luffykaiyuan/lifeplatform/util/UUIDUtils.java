package com.luffykaiyuan.lifeplatform.util;

import java.util.UUID;

public class UUIDUtils {

    public static  String getUUID()
    {
        return UUID.randomUUID().toString().replace("-", "");
    }

    /**
     *
     * (获取指定长度uuid)
     *
     * @return
     */
    public static  String getUUID(int len)
    {
        if(0 >= len)
        {
            return null;
        }

        String uuid = getUUID();
        System.out.println(uuid);
        StringBuffer str = new StringBuffer();

        for (int i = 0; i < len; i++)
        {
            str.append(uuid.charAt(i));
        }

        return str.toString();
    }
}

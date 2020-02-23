package com.luffykaiyuan.lifeplatform.dao.user;

import com.luffykaiyuan.lifeplatform.po.user.MessageRole;

import java.util.List;

public interface MessageRoleMapper {
    int insertRole(MessageRole messageRole);

    List<MessageRole> selectById(String id);
}
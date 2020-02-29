package com.luffykaiyuan.lifeplatform.po.sys;

public class SysRight {
    private Integer id;

    private String sysId;

    private String taskRight;

    private String userRight;

    private String dictRight;

    private String messageRight;

    private String adminRight;

    private String addTime;

    private String deleteStatus;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSysId() {
        return sysId;
    }

    public void setSysId(String sysId) {
        this.sysId = sysId == null ? null : sysId.trim();
    }

    public String getTaskRight() {
        return taskRight;
    }

    public void setTaskRight(String taskRight) {
        this.taskRight = taskRight == null ? null : taskRight.trim();
    }

    public String getUserRight() {
        return userRight;
    }

    public void setUserRight(String userRight) {
        this.userRight = userRight == null ? null : userRight.trim();
    }

    public String getDictRight() {
        return dictRight;
    }

    public void setDictRight(String dictRight) {
        this.dictRight = dictRight == null ? null : dictRight.trim();
    }

    public String getMessageRight() {
        return messageRight;
    }

    public void setMessageRight(String messageRight) {
        this.messageRight = messageRight == null ? null : messageRight.trim();
    }

    public String getAdminRight() {
        return adminRight;
    }

    public void setAdminRight(String adminRight) {
        this.adminRight = adminRight == null ? null : adminRight.trim();
    }

    public String getAddTime() {
        return addTime;
    }

    public void setAddTime(String addTime) {
        this.addTime = addTime == null ? null : addTime.trim();
    }

    public String getDeleteStatus() {
        return deleteStatus;
    }

    public void setDeleteStatus(String deleteStatus) {
        this.deleteStatus = deleteStatus == null ? null : deleteStatus.trim();
    }
}
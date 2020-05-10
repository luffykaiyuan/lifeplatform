package com.luffykaiyuan.lifeplatform.po.user;

public class FeedbackInfo {
    private String id;

    private String taskId;

    private String nickName;

    private String imgId1;

    private String imgId2;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId == null ? null : taskId.trim();
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName == null ? null : nickName.trim();
    }

    public String getImgId1() {
        return imgId1;
    }

    public void setImgId1(String imgId1) {
        this.imgId1 = imgId1 == null ? null : imgId1.trim();
    }

    public String getImgId2() {
        return imgId2;
    }

    public void setImgId2(String imgId2) {
        this.imgId2 = imgId2 == null ? null : imgId2.trim();
    }
}
package com.luffykaiyuan.lifeplatform.po;

public class TaskInfoPo {
    private String id;

    private String startId;

    private String startMail;

    private String startName;

    private String taskTitle;

    private String taskType;

    private String taskPlace;

    private String taskTime;

    private String taskContent;

    private String endId;

    private String endMail;

    private String endName;

    private String addTime;

    private String deleteStatus;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getStartId() {
        return startId;
    }

    public void setStartId(String startId) {
        this.startId = startId == null ? null : startId.trim();
    }

    public void setStartMail(String startMail) {
        this.startMail = startMail;
    }

    public String getStartMail() {
        return startMail;
    }

    public String getStartName() {
        return startName;
    }

    public void setStartName(String startName) {
        this.startName = startName == null ? null : startName.trim();
    }

    public String getTaskTitle() {
        return taskTitle;
    }

    public void setTaskTitle(String taskTitle) {
        this.taskTitle = taskTitle;
    }

    public String getTaskType() {
        return taskType;
    }

    public void setTaskType(String taskType) {
        this.taskType = taskType == null ? null : taskType.trim();
    }

    public String getTaskPlace() {
        return taskPlace;
    }

    public void setTaskPlace(String taskPlace) {
        this.taskPlace = taskPlace == null ? null : taskPlace.trim();
    }

    public String getTaskTime() {
        return taskTime;
    }

    public void setTaskTime(String taskTime) {
        this.taskTime = taskTime == null ? null : taskTime.trim();
    }

    public String getTaskContent() {
        return taskContent;
    }

    public void setTaskContent(String taskContent) {
        this.taskContent = taskContent == null ? null : taskContent.trim();
    }

    public String getEndId() {
        return endId;
    }

    public void setEndId(String endId) {
        this.endId = endId == null ? null : endId.trim();
    }

    public void setEndMail(String endMail) {
        this.endMail = endMail;
    }

    public String getEndMail() {
        return endMail;
    }

    public String getEndName() {
        return endName;
    }

    public void setEndName(String endName) {
        this.endName = endName == null ? null : endName.trim();
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
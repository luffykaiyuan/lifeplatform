var vue1 = new Vue({
    el: '#app',
    data: function () {
        return {
            contextPath:'',
            userName:'',
            taskKind: '',
            urls:{
                initTaskSquare: '/taskInfo/selectAllWaitTask',
                initTaskReceive: '/taskInfo/selectAllReceiveTask',
                initTaskFinish: '/taskInfo/selectAllFinishTask',
                initUser: '/userInfo/selectUserInfo',

                insertTask: '/taskInfo/insertTask',
                receiveTask: '/taskInfo/receiveTask',
                finishTask: '/taskInfo/finishTask',
                notReceive: '/taskInfo/notReceive',
            },
            sureLogin: true,
            taskSelect: [{
                value: '所有',
                label: '所有'
            }, {
                value: '1',
                label: '跑腿任务'
            }, {
                value: '2',
                label: '学习任务'
            }, {
                value: '3',
                label: '志愿任务'
            }],
            value: '',
            taskData: [],
            insertTaskVisible: false,
            receiveTaskVisible: false,
            taskForm: {
                taskTitle: '',
                taskType: '',
                taskPlace: '',
                taskTime: '',
                taskContent: '',
            },
            lookInfo:{
                id: '',
                taskType: '',
                taskPlace: '',
                taskTime: '',
                phone: '',
                qqNumber: '',
                wechatNumber: '',
                taskContent: '',
            },
            taskFormRules: {
                taskTitle: [
                    { required: true, message: '请输入任务标题', trigger: 'blur' },
                    { max: 20, message: '长度在 20 个字符', trigger: 'blur' }
                ],
                taskType: [
                    { required: true, message: '请选择任务类型', trigger: 'change' }
                ],
                taskPlace: [
                    { required: true, message: '请选择任务地区', trigger: 'change' }
                ],
                taskTime: [
                    { type: 'date', required: true, message: '选择截止时间', trigger: 'change' }
                ],
                taskContent: [
                    { required: true, message: '请输入任务内容', trigger: 'blur' },
                    { max: 2000, message: '长度在 2000 个字符', trigger: 'blur' }
                ],
            },
            operateWidth: 200
        }
    },
    created: function () {
        var contextPath = document.location.pathname;
        var contextPath = contextPath.split('/')[1];
        var contextPath = "/" + contextPath;
        this.contextPath = contextPath;
        this.userName = sessionStorage.getItem("userName");
        var flag = this.GetRequest().flag;
        if(flag){
            this.handleSelect(flag);
        }else{
            this.handleSelect("taskSquare");
        }
    },
    filters: {},
    mounted: function () {
    },
    methods: {
        //获取url中"?"符后的字串
        GetRequest() {
            var url = location.search;
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        },
        //打开任务发布的弹窗
        openInsertTask(){
            var self = this;
            if (!this.userName){
                self.$confirm('您还未登录，是否跳转到登录界面?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    window.location.href = this.contextPath + "/login";
                }).catch(() => {
                    return;
                });
            }else{
                self.insertTaskVisible = true;
            }
        },
        //新增任务
        insertTask(){
            var self = this;
            this.$refs['taskForm'].validate((valid) => {
                if (valid) {
                    var url = self.contextPath + self.urls.insertTask;
                    axios.post(url, self.taskForm,)
                        .then(function (res) {
                            self.insertTaskVisible = false;
                            self.refreshTask(self.urls.initTaskSquare);
                            self.$message({
                                showClose: true,
                                message: '发布成功！',
                                type: 'success'
                            });
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //查看任务
        lookTask(row){
            this.receiveTaskVisible = true;
            var self = this;
            self.lookInfo.taskType = self.formatterType(row);
            self.lookInfo.taskPlace = row.taskPlace;
            self.lookInfo.id = row.id;
            self.lookInfo.taskTime = row.taskTime;
            self.lookInfo.taskContent = row.taskContent;
            self.lookInfo.taskContent = row.taskContent;
            var url = self.contextPath + self.urls.initUser + "?loginId=" + row.startUsername;
            axios.get(url)
                .then(function (res) {
                    self.lookInfo.phone = res.data.phone;
                    self.lookInfo.qqNumber = res.data.qqNumber;
                    self.lookInfo.wechatNumber = res.data.wechatNumber;
                })
        },
        //接收任务
        receiveTask(){
            var self = this;
            var url = self.contextPath + self.urls.receiveTask + "?id=" + self.lookInfo.id;
            axios.get(url)
                .then(function (res) {
                    self.receiveTaskVisible = false;
                    self.$message({
                        showClose: true,
                        message: '接收成功，请尽快与发布人联系并完成任务！',
                        type: 'success'
                    });
                    self.refreshTask(self.urls.initTaskSquare);
                })
        },
        notReceive(row){
            var self = this;
            var url = self.contextPath + self.urls.notReceive + "?id=" + row.id;
            self.$confirm('确定要取消任务?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.get(url)
                    .then(function (res) {
                        self.receiveTaskVisible = false;
                        self.$message({
                            showClose: true,
                            message: '已取消！',
                            type: 'success'
                        });
                        var lastUrl = self.urls.initTaskReceive + "?endUsername=" + self.userName;
                        self.refreshTask(lastUrl);
                    })
            }).catch(() => {
                self.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //完成任务
        finishTask(){
            var self = this;
            var url = self.contextPath + self.urls.finishTask + "?id=" + self.lookInfo.id;
            self.$confirm('确定任务是否完成?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.get(url)
                    .then(function (res) {
                        self.receiveTaskVisible = false;
                        self.$message({
                            showClose: true,
                            message: '已成功完成任务！',
                            type: 'success'
                        });
                        var lastUrl = self.urls.initTaskReceive + "?endUsername=" + self.userName;
                        self.refreshTask(lastUrl);
                    })
            }).catch(() => {
                self.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //刷新数据
        refreshTask(lastUrl){
            var self = this;
            var url = self.contextPath + lastUrl;
            axios.get(url)
                .then(function (res) {
                    self.taskData = res.data;
                })
        },
        // 切换表单
        handleSelect(key) {
            this.taskKind = key;
            if (key === 'taskSquare'){
                this.refreshTask(this.urls.initTaskSquare);
                this.operateWidth = 100;
            }else if (key === 'taskReceive'){
                var lastUrl = this.urls.initTaskReceive + "?endUsername=" + this.userName;
                this.refreshTask(lastUrl);
                this.operateWidth = 300;
            }else if (key === 'taskFinish'){
                var lastUrl = this.urls.initTaskFinish + "?endUsername=" + this.userName;
                this.refreshTask(lastUrl);
                this.operateWidth = 100;
            }else if (key === 'moreInfo'){
                window.location.href = this.contextPath + "/userInfo?flag=moreInfo";
            }
        },
        //格式化数据
        formatterPlace(row){
            if (row.taskPlace === '1'){
                return "成都东软学院";
            }
            return "未知";
        },
        formatterType(row){
            for (var i = 0; i < this.taskSelect.length; i++){
                if (this.taskSelect[i].value === row.taskType){
                    return this.taskSelect[i].label;
                }
            }
            return "未知";
        },

    },
    watch: {}
});
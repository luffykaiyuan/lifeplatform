var vue1 = new Vue({
    el: '#app',
    data: function () {
        return {
            contextPath:'',
            userName:'',
            taskKind: '',
            pageSize: 10,
            currpage: 1,
            imageUrl: '',
            urls:{
                initTaskSquare: '/taskInfo/selectAllWaitTask',
                initTaskReceive: '/taskInfo/selectAllReceiveTask',
                initTaskFinish: '/taskInfo/selectAllFinishTask',
                initUser: '/userInfo/selectUserInfo',
                initTaskType: '/dictInfo/selectDictType',
                initTaskPlace: '/dictInfo/selectDictPlace',
                getNum: '/taskInfo/getNum',

                insertTask: '/taskInfo/insertTask',
                receiveTask: '/taskInfo/receiveTask',
                selectFile: '/file/selectFile',
                selectInfo: '/userInfo/selectInfo',

            },
            hrefs:{
                index: '/taskList',
                login: '/login',
                myRelease: '/myRelease',
                myGet: '/myGet',
                myInfo: '/userInfo',
            },
            myRelease: 0,
            myReceive: 0,
            myFinish: 0,
            taskType:[],
            taskPlace:[],
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
            userForm: {},
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

        this.hrefs.index = this.contextPath + this.hrefs.index;
        this.hrefs.login = this.contextPath + this.hrefs.login;
        this.hrefs.myRelease = this.contextPath + this.hrefs.myRelease;
        this.hrefs.myGet = this.contextPath + this.hrefs.myGet;
        this.hrefs.myInfo = this.contextPath + this.hrefs.myInfo;

        this.userName = sessionStorage.getItem("userName");
        this.initTaskType();
        this.initTaskPlace();
        this.refreshTask(this.urls.initTaskSquare);
        this.initUser();
    },
    filters: {},
    mounted: function () {
    },
    methods: {
        //获取url中"?"符后的字串
        GetRequest() {
            var url = location.search;
            var theRequest = new Object();
            if (url.indexOf("?") !== -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        },
        initUser(){
            var self = this;
            var url = self.contextPath + self.urls.initUser + "?loginId=" + self.userName;
            axios.get(url)
                .then(function (res) {
                    self.userForm = res.data;
                    self.imageUrl = self.contextPath + self.urls.selectFile + "?id=" + res.data.imgId;
                    self.getThreeNum();
                })
        },
        getThreeNum(){
            var self = this;
            var url = this.contextPath + this.urls.getNum + "?nickName=" + self.userForm.nickName;
            axios.get(url)
                .then(function (res) {
                    self.myRelease = res.data[0];
                    self.myReceive = res.data[1];
                    self.myFinish = res.data[2];
                })
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
                    window.location.href = self.contextPath + "/login";
                }).catch(() => {
                    return;
                });
            }else{
                var url = self.contextPath + self.urls.selectInfo + "?nickName=" + self.userForm.nickName;
                axios.get(url)
                    .then(function (res) {
                        if (res.data.phone && res.data.wechatNumber){
                            self.insertTaskVisible = true;
                        }else {
                            self.$confirm('请完善个人信息，方便与您取得联系?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                window.location.href = self.contextPath + "/userInfo";
                            }).catch(() => {
                                return;
                            });
                        }
                    })
            }
        },
        //新增任务
        insertTask(){
            var self = this;
            this.$refs['taskForm'].validate((valid) => {
                if (valid) {
                    var url = self.contextPath + self.urls.insertTask;
                    self.taskForm.startUsername = self.userForm.userName;
                    self.taskForm.startName = self.userForm.nickName;
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
        //刷新数据
        refreshTask(lastUrl){
            var self = this;
            var url = self.contextPath + lastUrl;
            axios.get(url)
                .then(function (res) {
                    self.taskData = res.data;
                })
        },
        initTaskType(){
            var self = this;
            var url = self.contextPath + self.urls.initTaskType;
            axios.get(url)
                .then(function (res) {
                    self.taskType = res.data;
                })
        },
        initTaskPlace(){
            var self = this;
            var url = self.contextPath + self.urls.initTaskPlace;
            axios.get(url)
                .then(function (res) {
                    self.taskPlace = res.data;
                })
        },
        //格式化数据
        formatterPlace(row){
            for (let i = 0; i < this.taskPlace.length; i++) {
                if (parseInt(row.taskPlace) === this.taskPlace[i].id){
                    return this.taskPlace[i].dictName;
                }
            }
            return "未知";
        },
        formatterType(row){
            for (let i = 0; i < this.taskType.length; i++) {
                if (parseInt(row.taskType) === this.taskType[i].id){
                    return this.taskType[i].dictName;
                }
            }
            return "未知";
        },
        handleCurrentChange(cpage) {
            this.currpage = cpage;
        },
        handleSizeChange(psize) {
            this.pagesize = psize;
        },
        quitLogin(){
            sessionStorage.clear();
            location.href="login";
        },
    },
    watch: {}
});
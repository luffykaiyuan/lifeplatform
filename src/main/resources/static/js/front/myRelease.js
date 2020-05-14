var vue1 = new Vue({
    el: '#app',
    data: function () {
        return {
            contextPath:'',
            userName:'',
            nickName: '',
            taskKind: '',
            activeNames: [],
            imageUrl: '',
            urls:{
                initUser: '/userInfo/selectUserInfo',
                selectInfo: '/userInfo/selectInfo',
                selectThreeMessage: '/message/selectThreeMessage',
                initTaskType: '/dictInfo/selectDictType',
                initTaskPlace: '/dictInfo/selectDictPlace',

                selectFile: '/file/selectFile',
                selectMyTask: '/taskInfo/selectMyTask',
                updateTask: '/taskInfo/updateTask',
                selectFeedback: '/feedback/selectFeedback',
            },
            hrefs:{
                index: '/taskList',
                login: '/login',
                myRelease: '/myRelease',
                myGet: '/myGet',
                myInfo: '/userInfo',
            },
            taskType:[],
            taskPlace:[],
            messageThreeData:[{
                announceTitle: '',
                announceContent: '',
                imgId: ''
            },{
                announceTitle: '',
                announceContent: '',
                imgId: ''
            },{
                announceTitle: '',
                announceContent: '',
                imgId: ''
            }],
            options: [{
                value: 0,
                label: '全部'
            }, {
                value: 1,
                label: '审核中'
            }, {
                value: 3,
                label: '审核失败'
            }, {
                value: 4,
                label: '待接收'
            }, {
                value: 5,
                label: '已接收'
            }, {
                value: 6,
                label: '已完成'
            }],
            MyAudit: [],
            MyAuditBack: [],
            sureLogin: true,
            dialogVisible: false,
            oneTask: {},
            endInfo: {},
            feedInfo: {},
            value: 0,
            releaseNum: 0,
            doingNum: 0,
            finishNum: 0,
            taskData: [],
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
            operateWidth: 200,
            typeInfo: '',
            placeInfo: '',
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
        this.initThreeMessage();
        this.initUser();
        this.initTaskType();
        this.initTaskPlace();
    },
    filters: {},
    mounted: function () {
    },
    methods: {
        getMyTask(){
            var self = this;
            var url = self.contextPath + self.urls.selectMyTask + "?startName=" + self.nickName;
            self.releaseNum = 0;
            self.doingNum = 0;
            self.finishNum = 0;
            axios.get(url)
                .then(function (res) {
                    self.MyAudit = res.data;
                    for(var i = 0; i < res.data.length; i++){
                        if (self.MyAudit[i].deleteStatus === '-1'){
                            self.MyAudit[i].steps = 'finish ';
                            self.MyAudit[i].deleteStatus = 1;
                            self.releaseNum += 1;
                        }else if (self.MyAudit[i].deleteStatus === '-2'){
                            self.MyAudit[i].steps = 'error';
                            self.MyAudit[i].deleteStatus = 3;
                            self.releaseNum += 1;
                        }else if (self.MyAudit[i].deleteStatus === '0'){
                            self.MyAudit[i].steps = 'finish';
                            self.MyAudit[i].deleteStatus = 4;
                            self.doingNum += 1;
                        }else if (self.MyAudit[i].deleteStatus === '1'){
                            self.MyAudit[i].steps = 'finish';
                            self.MyAudit[i].deleteStatus = 5;
                            self.doingNum += 1;
                        }else if (self.MyAudit[i].deleteStatus === '2'){
                            self.MyAudit[i].steps = 'success';
                            self.MyAudit[i].deleteStatus = 6;
                            self.finishNum += 1;
                        }
                    }
                    self.MyAuditBack = self.MyAudit;
                })
        },
        //获取url中"?"符后的字串
        lookTask(item){
            this.dialogVisible = true;
            this.feedInfo = {};
            for (var i = 0; i < this.taskPlace.length; i++){
                if (parseInt(item.taskPlace) === this.taskPlace[i].id){
                    this.placeInfo = this.taskPlace[i].dictName;
                }
            }
            for (var i = 0; i < this.taskType.length; i++){
                if (parseInt(item.taskType) === this.taskType[i].id){
                    this.typeInfo = this.taskType[i].dictName;
                }
            }
            this.oneTask = item;
            if (this.oneTask.endName){
                var self = this;
                var url = self.contextPath + self.urls.selectInfo + "?nickName=" + this.oneTask.endName;
                axios.get(url)
                    .then(function (res) {
                        self.endInfo = res.data;
                    })
            }
            var url = self.contextPath + self.urls.selectFeedback + "?taskId=" + item.id;
            axios.get(url)
                .then(function (res) {
                    if(res.data){
                        if (res.data.imgId1){
                            res.data.imgId1 = self.contextPath + self.urls.selectFile + "?id=" + res.data.imgId1;
                        }
                        if (res.data.imgId2){
                            res.data.imgId2 = self.contextPath + self.urls.selectFile + "?id=" + res.data.imgId2;
                        }
                    }
                    self.feedInfo = res.data;
                })
        },
        deleteTask(item){
            var self = this;
            this.$confirm('确认删除任务吗？')
                .then(_ => {
                    var url = self.contextPath + self.urls.updateTask;
                    item.deleteStatus = "3";
                    axios.post(url, item)
                        .then(function (res) {
                            self.getMyTask();
                            self.$message({
                                showClose: true,
                                message: '任务已删除！',
                                type: 'success'
                            });
                        })
                })
                .catch(_ => {});
        },
        finishTask(item){
            var self = this;
            this.$confirm('确认任务已完成吗？')
                .then(_ => {
                    var url = self.contextPath + self.urls.updateTask;
                    item.deleteStatus = "2";
                    axios.post(url, item)
                        .then(function (res) {
                            self.getMyTask();
                            self.$message({
                                showClose: true,
                                message: '操作成功！',
                                type: 'success'
                            });
                        })
                })
                .catch(_ => {});
        },
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
        initUser(){
            var self = this;
            var url = self.contextPath + self.urls.initUser + "?loginId=" + self.userName;
            axios.get(url)
                .then(function (res) {
                    self.userForm = res.data;
                    self.imageUrl = self.contextPath + self.urls.selectFile + "?id=" + res.data.imgId;
                    self.nickName = self.userForm.nickName;
                    self.getMyTask();
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
        quitLogin(){
            sessionStorage.clear();
            location.href="login";
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
        initThreeMessage(){
            var self = this;
            var url = self.contextPath + self.urls.selectThreeMessage;
            axios.get(url)
                .then(function (res) {
                    for (let i = 0; i < res.data.length; i++) {
                        res.data[i].imgId = self.contextPath + self.urls.selectFile + "?id=" + res.data[i].imgId;
                    }
                    self.messageThreeData = res.data;
                })
        },
        changeTap(item){
            this.MyAuditBack = [];
            if (item === 0){
                this.MyAuditBack = this.MyAudit;
            }else if(item === 1){
                for (var i = 0; i < this.MyAudit.length; i++){
                    if (this.MyAudit[i].deleteStatus === 1){
                        this.MyAuditBack.push(this.MyAudit[i]);
                    }
                }
            }else if(item === 3){
                for (var i = 0; i < this.MyAudit.length; i++){
                    if (this.MyAudit[i].deleteStatus === 3){
                        this.MyAuditBack.push(this.MyAudit[i]);
                    }
                }
            }else if(item === 4){
                for (var i = 0; i < this.MyAudit.length; i++){
                    if (this.MyAudit[i].deleteStatus === 4){
                        this.MyAuditBack.push(this.MyAudit[i]);
                    }
                }
            }else if(item === 5){
                for (var i = 0; i < this.MyAudit.length; i++){
                    if (this.MyAudit[i].deleteStatus === 5){
                        this.MyAuditBack.push(this.MyAudit[i]);
                    }
                }
            }else{
                for (var i = 0; i < this.MyAudit.length; i++){
                    if (this.MyAudit[i].deleteStatus === 6){
                        this.MyAuditBack.push(this.MyAudit[i]);
                    }
                }
            }
        },
    },
    watch: {}
});
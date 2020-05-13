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
                imgUpload: '',
                initUser: '/userInfo/selectUserInfo',
                selectInfo: '/userInfo/selectInfo',
                selectThreeMessage: '/message/selectThreeMessage',
                initTaskType: '/dictInfo/selectDictType',
                initTaskPlace: '/dictInfo/selectDictPlace',

                selectFile: '/file/selectFile',
                selectMyGet: '/taskInfo/selectMyGet',
                updateTask: '/taskInfo/updateTask',
                insertFeedback: '/feedback/insertFeedback',
                selectFeedback: '/feedback/selectFeedback',
            },
            hrefs:{
                index: '/taskList',
                login: '/login',
                myRelease: '/myRelease',
                myGet: '/myGet',
                myInfo: '/userInfo',
            },
            dialogImageUrl: '',
            taskType:[],
            taskPlace:[],
            MyDoing: [],
            MyFinish: [],
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
            sureLogin: true,
            dialogVisible: false,
            taskVisible: false,
            feedVisible: false,
            oneTask: {},
            endInfo: {},
            startInfo: {},
            feedInfo: {},
            one: {},
            imgNum: 0,
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
            feedFrom:{
                id: '',
                taskId: '',
                nickName: '',
                imgId1: '',
                imgId2: '',
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
        this.urls.imgUpload = contextPath + '/file/imgUpload';

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
            var url = self.contextPath + self.urls.selectMyGet + "?endName=" + self.nickName;
            self.releaseNum = 0;
            self.doingNum = 0;
            self.finishNum = 0;
            axios.get(url)
                .then(function (res) {
                    self.MyDoing = [];
                    self.MyFinish = [];
                    for(var i = 0; i < res.data.length; i++){
                        if (res.data[i].deleteStatus === '1'){
                            res.data[i].steps = 'finish';
                            res.data[i].deleteStatus = 5;
                            self.doingNum += 1;
                            self.MyDoing.push(res.data[i]);
                        }else if (res.data[i].deleteStatus === '2'){
                            res.data[i].steps = 'success';
                            res.data[i].deleteStatus = 6;
                            self.finishNum += 1;
                            self.MyFinish.push(res.data[i]);
                        }
                    }
                })
        },
        //获取url中"?"符后的字串
        lookTask(item){
            this.taskVisible = true;
            this.one = item;
            for (var i = 0; i < this.taskPlace.length; i++){
                if (parseInt(item.taskPlace) === this.taskPlace[i].id){
                    item.taskPlace = this.taskPlace[i].dictName;
                }
            }
            for (var i = 0; i < this.taskType.length; i++){
                if (parseInt(item.taskType) === this.taskType[i].id){
                    item.taskType = this.taskType[i].dictName;
                }
            }
            this.oneTask = item;
            var self = this;
            var url = self.contextPath + self.urls.selectInfo + "?nickName=" + this.oneTask.startName;
            axios.get(url)
                .then(function (res) {
                    self.startInfo = res.data;
                })
            if (this.oneTask.endName){
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
        openFeed(){
            this.feedVisible = true;
            this.feedFrom.nickName = this.one.endName;
            this.feedFrom.taskId = this.one.id;
            this.imgNum = 0;
        },
        submitFeed(){
            var self = this;
            var url = self.contextPath + self.urls.insertFeedback;
            axios.post(url, self.feedFrom)
                .then(function (res) {
                    self.$message({
                        showClose: true,
                        message: '反馈成功！',
                        type: 'success'
                    });
                    self.feedVisible = false;
                    self.taskVisible = false;
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
        handleAvatarSuccess(res, file) {
            var self = this;
            self.dialogImageUrl = URL.createObjectURL(file.raw);
            self.imgNum = self.imgNum + 1;
            if (this.imgNum === 1){
                this.feedFrom.imgId1 = res;
            }else{
                this.feedFrom.imgId2 = res;
            }
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        beforeAvatarUpload(file) {
            if (this.imgNum === 2){
                this.$message.error('最多上传2张图片！');
                return false;
            }
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                return false;
            }

            if (isJPG) {
                return true;
            } else {
                if (isPNG) {
                    return true;
                }
            }
            this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
            return false;
        },
    },
    watch: {}
});
var vue1 = new Vue({
    el: '#app',
    data: function () {
        return {
            contextPath:'',
            flag: '1',
            formLabelWidth: '120',
            urls:{
                initNews: '/news/selectAllNews',
                initTask: '/taskInfo/selectAllTask',
                initUser: '/userInfo/selectAllUser',
                initTaskType: '/dictInfo/selectDictType',
                initTaskPlace: '/dictInfo/selectDictPlace',
                initMessage: '/message/selectAllMessage',
                initSysInfo: '/sysInfo/selectAll',
                initSysRight: '/sysRight/selectAll',

                countDictType: '/taskInfo/countDictType',
                countDictPlace: '/taskInfo/countDictPlace',
                countStartName: '/taskInfo/countStartName',
                countEndName: '/taskInfo/countEndName',

                addDict: '/dictInfo/addDict',
                updateDict: '/dictInfo/updateDict',
                addMessage: '/message/insertMessage',
                updateMessage: '/message/updateMessage',
                addSysRight: '/sysRight/insertSysRight',
                updateSysRight: '/sysRight/updateSysRight',
                addSysInfo: '/sysInfo/insertAdmin',
                updateSysInfo: '/sysInfo/updateAdmin',
            },
            rankDictType: [],
            rankDictPlace: [],
            rankStartName: [],
            rankEndName: [],
            activeIndex: '1',
            activeIndex2: '1',
            taskData:[],
            userData:[],
            taskTypeData:[],
            taskPlaceData:[],
            messageData:[],
            sysInfoData:[],
            sysRightData:[],

            dictFormVisible: false,
            dictSU: '',
            dictForm:{
                dictName:'',
                dictType:'',
                dictOrder:'',
                deleteStatus: ''
            },

            messageFormVisible: false,
            messageSU: '',
            messageForm:{
                announceTitle: '',
                announceContent: '',
            },

            adminFormVisible: false,
            adminSU: '',
            adminForm:{
                sysName: '',
                userName: '',
                password: '',
                taskRight: '',
                userRight: '',
                dictRight: '',
                messageRight: '',
                adminRight: '',
            }
        }
    },
    created: function () {
        var contextPath = document.location.pathname;
        var contextPath = contextPath.split('/')[1];
        var contextPath = "/" + contextPath;
        this.contextPath = contextPath;
        this.initTask();
        this.initUser();
        this.initTaskType();
        this.initTaskPlace();
        this.initMessage();
        this.initSys();
        this.initRankDictType();
        this.initRankDictPlace();
        this.initRankStartName();
        this.initRankEndName();
    },
    filters: {},
    mounted: function () {
    },
    methods: {
        //打开字典操作弹窗
        openDict(){
            this.emptyDictForm();
            this.dictFormVisible = true;
            this.dictSU = 'save';
        },
        //打开编辑窗口
        editDict(row){
            this.emptyDictForm();
            this.dictFormVisible = true;
            this.dictForm = JSON.parse(JSON.stringify(row));
            this.dictSU = 'update';

        },
        //清空字典表单
        emptyDictForm(){
            this.dictForm.dictName = '';
            this.dictForm.dictType = '';
            this.dictForm.dictOrder = '';
            this.dictForm.deleteStatus = '';
        },
        //保存修改字典
        saveDict(){
            var self = this;if (self.dictSU === 'save'){
                var url = self.contextPath + self.urls.addDict;
            }else {
                var url = self.contextPath + self.urls.updateDict;
            }
            axios.post(url, self.dictForm)
                .then(function (res) {
                    self.dictFormVisible = false;
                    self.initTaskPlace();
                    self.initTaskType();
                })
        },

        openMessage(){
            this.emptyDictForm();
            this.messageFormVisible = true;
            this.messageSU = 'save';
        },
        editMessage(row){
            this.emptyMessageForm();
            this.messageFormVisible = true;
            this.messageForm = JSON.parse(JSON.stringify(row));
            this.messageSU = 'update';
        },
        emptyMessageForm(){
            this.messageForm.announceTitle = '';
            this.messageForm.announceContent = '';
        },
        saveMessage(){
            var self = this;if (self.messageSU === 'save'){
                var url = self.contextPath + self.urls.addMessage;
            }else {
                var url = self.contextPath + self.urls.updateMessage;
            }
            axios.post(url, self.messageForm)
                .then(function (res) {
                    self.messageFormVisible = false;
                    self.initMessage();
                })
        },

        openAdmin(){
            this.emptyAdminForm();
            this.adminFormVisible = true;
            this.adminSU = 'save';
        },
        editAdmin(row){
            this.emptyAdminForm();
            this.adminFormVisible = true;
            this.adminForm = JSON.parse(JSON.stringify(row));
            this.adminSU = 'update';
        },
        emptyAdminForm(){
            this.adminForm.sysName = '';
            this.adminForm.userName = '';
            this.adminForm.password = '';
            this.adminForm.taskRight = '';
            this.adminForm.userRight = '';
            this.adminForm.dictRight = '';
            this.adminForm.messageRight = '';
            this.adminForm.adminRight = '';
        },
        saveAdmin(){
            var self = this;if (self.adminSU === 'save'){
                var urlRight = self.contextPath + self.urls.addSysRight;
                var urlInfo = self.contextPath + self.urls.addSysInfo;
            }else {
                var urlRight = self.contextPath + self.urls.updateSysRight;
                var urlInfo = self.contextPath + self.urls.updateSysInfo;
            }
            axios.post(urlInfo, self.adminForm)
                .then(function (res) {
                    self.adminForm.sysId = res.data;
                    axios.post(urlRight, self.adminForm)
                        .then(function (res) {
                            self.adminFormVisible = false;
                            self.initSys();
                        })
                })
        },



        //-------------------------------------------初始化数据
        initTask(){
            var self = this;
            var url = self.contextPath + self.urls.initTask;
            axios.get(url)
                .then(function (res) {
                    self.taskData = res.data;
                })
        },
        initRankDictType(){
            var self = this;
            var url = self.contextPath + self.urls.countDictType;
            axios.get(url)
                .then(function (res) {
                    self.rankDictType = res.data;
                    for (let i = 0; i < self.rankDictType.length; i++) {
                        for (let j = 0; j < self.taskTypeData.length; j++){
                            if (parseInt(self.rankDictType[i].dict) === self.taskTypeData[j].id){
                                self.rankDictType[i].dictName = self.taskTypeData[j].dictName;
                            }
                        }
                    }
                })
        },
        initRankDictPlace(){
            var self = this;
            var url = self.contextPath + self.urls.countDictPlace;
            axios.get(url)
                .then(function (res) {
                    self.rankDictPlace = res.data;
                    for (let i = 0; i < self.rankDictPlace.length; i++) {
                        for (let j = 0; j < self.taskPlaceData.length; j++){
                            if (parseInt(self.rankDictPlace[i].dict) === self.taskPlaceData[j].id){
                                self.rankDictPlace[i].dictName = self.taskPlaceData[j].dictName;
                            }
                        }
                    }
                })
        },
        initRankStartName(){
            var self = this;
            var url = self.contextPath + self.urls.countStartName;
            axios.get(url)
                .then(function (res) {
                    self.rankStartName = res.data;
                })
        },
        initRankEndName(){
            var self = this;
            var url = self.contextPath + self.urls.countEndName;
            axios.get(url)
                .then(function (res) {
                    self.rankEndName = res.data;
                })
        },
        initUser(){
            var self = this;
            var url = self.contextPath + self.urls.initUser;
            axios.get(url)
                .then(function (res) {
                    self.userData = res.data;
                })
        },
        initTaskType(){
            var self = this;
            var url = self.contextPath + self.urls.initTaskType;
            axios.get(url)
                .then(function (res) {
                    self.taskTypeData = res.data;
                })
        },
        initTaskPlace(){
            var self = this;
            var url = self.contextPath + self.urls.initTaskPlace;
            axios.get(url)
                .then(function (res) {
                    self.taskPlaceData = res.data;
                })
        },
        initMessage(){
            var self = this;
            var url = self.contextPath + self.urls.initMessage;
            axios.get(url)
                .then(function (res) {
                    self.messageData = res.data;
                })
        },
        initSys(){
            var self = this;
            var url = self.contextPath + self.urls.initSysInfo;
            axios.get(url)
                .then(function (res) {
                    self.sysInfoData = res.data;
                    axios.get(self.contextPath + self.urls.initSysRight)
                        .then(function (res) {
                            self.sysRightData = res.data;
                            self.bindData();
                        })
                })
        },
        bindData(){
            var self = this;
            for (let i = 0; i < self.sysInfoData.length; i++) {
                for (let j = 0; j < self.sysRightData.length; j++){
                    if (self.sysRightData[j].sysId === self.sysInfoData[i].id){
                        self.sysInfoData[i].taskRight = self.sysRightData[j].taskRight;
                        self.sysInfoData[i].userRight = self.sysRightData[j].userRight;
                        self.sysInfoData[i].dictRight = self.sysRightData[j].dictRight;
                        self.sysInfoData[i].messageRight = self.sysRightData[j].messageRight;
                        self.sysInfoData[i].adminRight = self.sysRightData[j].adminRight;
                        continue;
                    }
                }
            }
        },

        formatterGender(row){
            if (row.userGender === '1'){
                return "男";
            }
            return "女";
        },
        formatterType(row){
            if (row.dictType === '1'){
                return "任务类型";
            }
            return "任务地址";
        },
        formatterTaskRight(row){
            if (row.taskRight === '1'){
                return "有权限";
            }else {
                return "无";
            }
        },
        formatterUserRight(row){
            if (row.userRight === '1'){
                return "有权限";
            }else {
                return "无";
            }
        },
        formatterDictRight(row){
            if (row.dictRight === '1'){
                return "有权限";
            }else {
                return "无";
            }
        },
        formatterMessageRight(row){
            if (row.messageRight === '1'){
                return "有权限";
            }else {
                return "无";
            }
        },
        formatterAdminRight(row){
            if (row.adminRight === '1'){
                return "有权限";
            }else {
                return "无";
            }
        },
        handleSelect(key, keyPath) {
            this.flag = key;
            if (key === "index"){
                location.href="index";
            }else if (key === "taskBack"){
                location.href="taskBack";
            }else if (key === "taskDoing"){
                location.href="taskDoing";
            }else if (key === "userBack"){
                location.href="userBack";
            }else if (key === "typeBack"){
                location.href="typeBack";
            }else if (key === "placeBack"){
                location.href="placeBack";
            }else if (key === "messageBack"){
                location.href="messageBack";
            }else if (key === "adminBack"){
                location.href="adminBack";
            }else if (key === "quitLogin"){
                location.href="adminLogin";
            }
        },
    },
    watch: {}
});
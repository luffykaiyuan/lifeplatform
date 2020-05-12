var vue1 = new Vue({
    el: '#app',
    data: function () {
        return {
            contextPath:'',
            flag: '1',
            formLabelWidth: '120',
            urls:{
                initNews: '/news/selectAllNews',
                initTask: '/taskInfo/selectDoing',
                initUser: '/userInfo/selectAllUser',
                initTaskType: '/dictInfo/selectDictType',
                initTaskPlace: '/dictInfo/selectDictPlace',
                initSysInfo: '/sysInfo/selectAll',
                initSysRight: '/sysRight/selectAll',

                countStartName: '/taskInfo/countStartName',
                countEndName: '/taskInfo/countEndName',

                selectInfo: '/userInfo/selectInfo',
                selectFeedback: '/feedback/selectFeedback',
                selectFile: '/file/selectFile',
            },
            pageSize: 10,
            currpage: 1,
            oneTask: {},
            endInfo: {},
            startInfo: {},
            feedInfo: {},
            one: {},
            taskVisible: false,
            rankDictType: [],
            rankDictPlace: [],
            rankStartName: [],
            rankEndName: [],
            activeIndex: '1',
            taskData:[],
            taskPlace:[],
            taskType:[],
            sysInfoData:[],
            sysRightData:[],        }
    },
    created: function () {
        var contextPath = document.location.pathname;
        var contextPath = contextPath.split('/')[1];
        var contextPath = "/" + contextPath;
        this.contextPath = contextPath;
        this.initTask();
        this.initTaskType();
        this.initTaskPlace();
        this.initSys();
        this.initRankStartName();
        this.initRankEndName();
    },
    filters: {},
    mounted: function () {
    },
    methods: {
        lookMore(row){
            this.taskVisible = true;
            this.one = row;
            for (var i = 0; i < this.taskPlace.length; i++){
                if (parseInt(row.taskPlace) === this.taskPlace[i].id){
                    row.taskPlace = this.taskPlace[i].dictName;
                }
            }
            for (var i = 0; i < this.taskType.length; i++){
                if (parseInt(row.taskType) === this.taskType[i].id){
                    row.taskType = this.taskType[i].dictName;
                }
            }
            this.oneTask = row;
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
            var url = self.contextPath + self.urls.selectFeedback + "?taskId=" + row.id;
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
        //-------------------------------------------初始化数据
        initTask(){
            var self = this;
            var url = self.contextPath + self.urls.initTask;
            axios.get(url)
                .then(function (res) {
                    self.taskData = res.data;
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
        handleCurrentChange(cpage) {
            this.currpage = cpage;
        },
        handleSizeChange(psize) {
            this.pagesize = psize;
        },
    },
    watch: {}
});
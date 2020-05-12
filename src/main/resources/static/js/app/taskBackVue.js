var vue1 = new Vue({
    el: '#app',
    data: function () {
        return {
            contextPath:'',
            flag: '1',
            formLabelWidth: '120',
            urls:{
                initNews: '/news/selectAllNews',
                initTask: '/taskInfo/selectAudit',
                initUser: '/userInfo/selectAllUser',
                selectInfo: '/userInfo/selectInfo',
                initTaskType: '/dictInfo/selectDictType',
                initTaskPlace: '/dictInfo/selectDictPlace',
                initSysInfo: '/sysInfo/selectAll',
                initSysRight: '/sysRight/selectAll',

                countStartName: '/taskInfo/countStartName',
                countEndName: '/taskInfo/countEndName',

                updateTask: '/taskInfo/updateTask',
            },
            pageSize: 10,
            currpage: 1,
            taskVisible: false,
            flagBack: {},
            lookInfo: {},
            rankStartName: '',
            rankEndName: '',
            rankDictType: [],
            rankDictPlace: [],
            taskData:[],
            userData:[],
            taskTypeData:[],
            taskPlaceData:[],
            sysInfoData:[],
            sysRightData:[],
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
        this.initSys();
        this.initRankStartName();
        this.initRankEndName();
    },
    filters: {},
    mounted: function () {
    },
    methods: {
        openMore(row){
            this.taskVisible = true;
            this.flagBack = row;
            for (let i = 0; i < this.taskTypeData.length; i++) {
                if (this.taskTypeData[i].id === row.taskType){
                    row.taskType = this.taskTypeData[i].dictName;
                }
            }
            for (let i = 0; i < this.taskPlaceData.length; i++) {
                if (this.taskPlaceData[i].id === row.taskPlace){
                    row.taskPlace = this.taskPlaceData[i].dictName;
                }
            }
            var self = this;
            var url = self.contextPath + self.urls.selectInfo + "?nickName=" + row.startName;
            axios.get(url)
                .then(function (res) {
                    row.phone = res.data.phone;
                    row.wechatNumber = res.data.wechatNumber;
                    row.qqNumber = res.data.qqNumber;
                    self.lookInfo = row;
                })
        },
        refuseTask(){
            var self = this;
            self.$confirm('此操作将拒绝任务的发布，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var url = self.contextPath + self.urls.updateTask;
                self.flagBack.deleteStatus = "-2";
                axios.post(url, self.flagBack)
                    .then(function (res) {
                        self.$message({
                            message: '操作成功！',
                            type: 'success'
                        });
                        self.taskVisible = false;
                        self.initTask();
                    })
            }).catch(() => {
                self.$message({
                    message: '已取消！',
                    type: 'success'
                });
            });
        },
        passTask(){
            var self = this;
            self.$confirm('此操作将发布任务，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var url = self.contextPath + self.urls.updateTask;
                self.flagBack.deleteStatus = "0";
                axios.post(url, self.flagBack)
                    .then(function (res) {
                        self.$message({
                            message: '操作成功！',
                            type: 'success'
                        });
                        self.taskVisible = false;
                        self.initTask();
                    })
            }).catch(() => {
                self.$message({
                    message: '已取消！',
                    type: 'success'
                });
            });
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
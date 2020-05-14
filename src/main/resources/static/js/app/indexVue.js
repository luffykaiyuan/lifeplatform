var vue1 = new Vue({
    el: '#app',
    data: function () {
        return {
            contextPath:'',
            flag: '1',
            formLabelWidth: '120',
            urls:{
                initTaskType: '/dictInfo/selectDictType',
                initTaskPlace: '/dictInfo/selectDictPlace',
                initSysInfo: '/sysInfo/selectAll',
                initSysRight: '/sysRight/selectAll',

                taskTodayNum: '/taskInfo/taskTodayNum',
                taskAllNum: '/taskInfo/taskAllNum',
                userTodayNum: '/userInfo/userTodayNum',
                userAllNum: '/userInfo/userAllNum',

                selectAllTask: '/taskInfo/selectAllTask',
                selectAllUser: '/userInfo/selectAllUser',
            },
            taskTypeData:[],
            taskPlaceData:[],
            sysInfoData:[],
            sysRightData:[],
            myRight:{},

            taskToday: 0,
            taskAll: 0,
            userToday: 0,
            userAll: 0,
            taskDealList: [],
            taskDoingList: [],
            userList: [],
            timeInfo: [],
            dealLine: [0, 0, 0, 0, 0, 0, 0],
            doingLine: [0, 0, 0, 0, 0, 0, 0],
            userLine: [0, 0, 0, 0, 0, 0, 0],
        }
    },
    created: function () {
        var contextPath = document.location.pathname;
        var contextPath = contextPath.split('/')[1];
        var contextPath = "/" + contextPath;
        this.contextPath = contextPath;
        this.initTaskType();
        this.initTaskPlace();
        this.userName = sessionStorage.getItem("userName");
        this.initSys();

        this.initTaskToday();
        this.initTaskAll();
        this.initUserToday();
        this.initUserAll();

    }
    ,
    filters: {},
    mounted: function () {
        this.getAllTime();
    },
    methods: {
        getAllTaskInfo(){
            var self = this;
            var url = self.contextPath + self.urls.selectAllTask;
            axios.get(url)
                .then(function (res) {
                    let taskDeal = [{}, {}];
                    taskDeal[0].name = '待审核';
                    taskDeal[0].value = 0;
                    taskDeal[0].itemStyle = {color: '#3399ff'};
                    taskDeal[1].name = '已拒绝';
                    taskDeal[1].value = 0;
                    taskDeal[1].itemStyle = {color: '#99ccff'};
                    let taskDoing = [{}, {}, {}];
                    taskDoing[0].name = '待接收';
                    taskDoing[0].value = 0;
                    taskDoing[0].itemStyle = {color: '#3399ff'};
                    taskDoing[1].name = '待完成';
                    taskDoing[1].value = 0;
                    taskDoing[1].itemStyle = {color: '#99ccff'};
                    taskDoing[2].name = '已完成';
                    taskDoing[2].value = 0;
                    taskDoing[2].itemStyle = {color: '#6666ff'};
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].deleteStatus === "-2"){
                            taskDeal[1].value += 1;
                        }else if (res.data[i].deleteStatus === "-1"){
                            taskDeal[0].value += 1;
                        }else if (res.data[i].deleteStatus === "0"){
                            taskDoing[0].value += 1;
                        }else if (res.data[i].deleteStatus === "1"){
                            taskDoing[1].value += 1;
                        }else {
                            taskDoing[2].value += 1;
                        }
                        for (let j = 0; j < self.timeInfo.length; j++){
                            if (res.data[i].addTime === self.timeInfo[j]){
                                if (res.data[i].deleteStatus === "-2" || res.data[i].deleteStatus === "-1"){
                                    self.dealLine[j] += 1;
                                }else{
                                    self.doingLine[j] += 1;
                                }
                                break;
                            }
                        }
                    }
                    self.taskDealList= taskDeal;
                    self.taskDoingList= taskDoing;
                    self.taskDoingAngle();
                    self.taskDealAngle();
                    self.getAllUserInfo();
                })
        },
        getAllUserInfo(){
            var self = this;
            var url = self.contextPath + self.urls.selectAllUser;
            axios.get(url)
                .then(function (res) {
                    let genderInfo = [{}, {}, {}];
                    genderInfo[0].name = '男';
                    genderInfo[0].value = 0;
                    genderInfo[0].itemStyle = {color: '#3399ff'};
                    genderInfo[1].name = '女';
                    genderInfo[1].value = 0;
                    genderInfo[1].itemStyle = {color: '#99ccff'};
                    genderInfo[2].name = '未知';
                    genderInfo[2].value = 0;
                    genderInfo[2].itemStyle = {color: '#6666ff'};
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].userGender === "1"){
                            genderInfo[0].value += 1;
                        }else if (res.data[i].userGender === "2"){
                            genderInfo[1].value += 1;
                        }else {
                            genderInfo[2].value += 1;
                        }
                        for (let j = 0; j < self.timeInfo.length; j++){
                            if (res.data[i].addTime === self.timeInfo[j]){
                                self.userLine[j] += 1;
                                break;
                            }
                        }
                    }
                    console.log(genderInfo)
                    self.userList= genderInfo;
                    self.genderStatusAngle();
                    self.numBasic();
                })
        },
        numBasic() {
            let that = this;
            // 基于准备好的dom(myEchartPillar)，初始化echarts实例
            let myChart = echarts.init(this.$refs.basicInfo);
            //指定图表的配置项和数据，绘制图表
            myChart.setOption({
                title: {
                    text: '平台信息'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['审核中的任务数量', '进行中的任务数量', '新增用户数']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: that.timeInfo
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '审核中的任务数量',
                        type: 'line',
                        stack: '总量',
                        data: that.dealLine,
                        itemStyle: {color: '#3399ff'}
                    },
                    {
                        name: '进行中的任务数量',
                        type: 'line',
                        stack: '总量',
                        data: that.doingLine,
                        itemStyle: {color: '#99ccff'}
                    },
                    {
                        name: '新增用户数',
                        type: 'line',
                        stack: '总量',
                        data: that.userLine,
                        itemStyle: {color: '#6666ff'}
                    },
                ]
            });
            //解决自适应
            setTimeout(function() {
                window.addEventListener("resize", () => {
                    myChart.resize();
                });
            }, 500);
        },

        taskDoingAngle() {
            let that = this;
            // 基于准备好的dom(myEchartPillar)，初始化echarts实例
            let myChart = echarts.init(this.$refs.taskDoing);
            //指定图表的配置项和数据，绘制图表
            myChart.setOption({
                title: {
                    text: '任务进行情况',
                    // subtext: '纯属虚构',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    data: ['待接收', '待完成', '已完成']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: that.taskDoingList
                    }
                ]
            });
            //解决自适应
            setTimeout(function() {
                window.addEventListener("resize", () => {
                    myChart.resize();
                });
            }, 500);
        },
        taskDealAngle() {
            let that = this;
            // 基于准备好的dom(myEchartPillar)，初始化echarts实例
            let myChart = echarts.init(this.$refs.taskDeal);
            //指定图表的配置项和数据，绘制图表
            myChart.setOption({
                title: {
                    text: '任务审核情况',
                    // subtext: '纯属虚构',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    data: ['待审核', '已拒绝']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: that.taskDealList
                    }
                ]
            });
            //解决自适应
            setTimeout(function() {
                window.addEventListener("resize", () => {
                    myChart.resize();
                });
            }, 500);
        },
        genderStatusAngle() {
            let that = this;
            // 基于准备好的dom(myEchartPillar)，初始化echarts实例
            let myChart = echarts.init(this.$refs.genderStatus);
            //指定图表的配置项和数据，绘制图表
            myChart.setOption({
                title: {
                    text: '用户性别情况',
                    // subtext: '纯属虚构',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    data: ['男', '女', '未知']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: that.userList
                    }
                ]
            });
            //解决自适应
            setTimeout(function() {
                window.addEventListener("resize", () => {
                    myChart.resize();
                });
            }, 500);
        },



        //-------------------------------------------初始化数据
        initTaskToday(){
            var self = this;
            var url = self.contextPath + self.urls.taskTodayNum;
            axios.get(url)
                .then(function (res) {
                    self.taskToday = res.data;
                })
        },
        initTaskAll(){
            var self = this;
            var url = self.contextPath + self.urls.taskAllNum;
            axios.get(url)
                .then(function (res) {
                    self.taskAll = res.data;
                })
        },
        initUserToday(){
            var self = this;
            var url = self.contextPath + self.urls.userTodayNum;
            axios.get(url)
                .then(function (res) {
                    self.userToday = res.data;
                })
        },
        initUserAll(){
            var self = this;
            var url = self.contextPath + self.urls.userAllNum;
            axios.get(url)
                .then(function (res) {
                    self.userAll = res.data;
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
            for (let i = 0; i < self.sysInfoData.length; i++) {
                if (this.userName === self.sysInfoData[i].userName){
                    self.myRight = self.sysInfoData[i];
                    break;
                }
            }
        },
        getAllTime(){
            var Date8 = new Date();
            //前一天
            var Date7 = new Date(Date8.getTime() - 24*60*60*1000);
            var str7 = Date7.getFullYear()+"-"+("0" + (Date7.getMonth() + 1)).slice(-2)+"-"+("0" + Date7.getDate()).slice(-2);
            //前两天
            var Date6 = new Date(Date8.getTime() - 48*60*60*1000);
            var str6 = Date6.getFullYear()+"-"+("0" + (Date6.getMonth() + 1)).slice(-2)+"-"+("0" + Date6.getDate()).slice(-2);
            //前三天
            var Date5 = new Date(Date8.getTime() - 72*60*60*1000);
            var str5 = Date5.getFullYear()+"-"+("0" + (Date5.getMonth() + 1)).slice(-2)+"-"+("0" + Date5.getDate()).slice(-2);
            //前四天
            var Date4 = new Date(Date8.getTime() - 96*60*60*1000);
            var str4 = Date4.getFullYear()+"-"+("0" + (Date4.getMonth() + 1)).slice(-2)+"-"+("0" + Date4.getDate()).slice(-2);
            //前五天
            var Date3 = new Date(Date8.getTime() - 120*60*60*1000);
            var str3 = Date3.getFullYear()+"-"+("0" + (Date3.getMonth() + 1)).slice(-2)+"-"+("0" + Date3.getDate()).slice(-2);
            //前六天
            var Date2 = new Date(Date8.getTime() - 144*60*60*1000);
            var str2 = Date2.getFullYear()+"-"+("0" + (Date2.getMonth() + 1)).slice(-2)+"-"+("0" + Date2.getDate()).slice(-2);
            //前七天
            var Date1 = new Date(Date8.getTime() - 168*60*60*1000);
            var str1 = Date1.getFullYear()+"-"+("0" + (Date1.getMonth() + 1)).slice(-2)+"-"+("0" + Date1.getDate()).slice(-2);
            let timeList = [];
            timeList.push(str1);
            timeList.push(str2);
            timeList.push(str3);
            timeList.push(str4);
            timeList.push(str5);
            timeList.push(str6);
            timeList.push(str7);
            this.timeInfo = timeList;
            this.getAllTaskInfo();
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
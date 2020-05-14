var vue1 = new Vue({
    el: '#app',
    data: function () {
        return {
            contextPath:'',
            flag: '1',
            formLabelWidth: '120',
            urls:{
                initTaskType: '/dictInfo/selectDictType',
                initSysInfo: '/sysInfo/selectAll',
                initSysRight: '/sysRight/selectAll',

                countDictType: '/taskInfo/countDictType',

                addDict: '/dictInfo/addDict',
                updateDict: '/dictInfo/updateDict',
            },
            rankDictType: [],
            rankDictPlace: [],
            taskTypeData:[],
            taskPlaceData:[],
            sysInfoData:[],
            sysRightData:[],
            myRight:[],
            userName: '',

            dictFormVisible: false,
            dictSU: '',
            dictForm:{
                dictName:'',
                dictType:'',
                dictOrder:'',
                deleteStatus: ''
            },
        }
    },
    created: function () {
        var contextPath = document.location.pathname;
        var contextPath = contextPath.split('/')[1];
        var contextPath = "/" + contextPath;
        this.contextPath = contextPath;
        this.userName = sessionStorage.getItem("userName");

        this.initTaskType();
        this.initSys();
        this.initRankDictType();
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
            console.log(self.dictForm);
            axios.post(url, self.dictForm)
                .then(function (res) {
                    self.dictFormVisible = false;
                    self.initTaskType();
                })
        },

        //-------------------------------------------初始化数据
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
        initTaskType(){
            var self = this;
            var url = self.contextPath + self.urls.initTaskType;
            axios.get(url)
                .then(function (res) {
                    self.taskTypeData = res.data;
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

        formatterStatus(row){
            if (row.deleteStatus === '1'){
                return "使用中";
            }
            return "暂停";
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
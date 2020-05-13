var vue1 = new Vue({
    el: '#app',
    data: function () {
        return {
            contextPath:'',
            flag: '1',
            formLabelWidth: '120',
            pageSize: 10,
            currpage: 1,
            urls:{
                initNews: '/news/selectAllNews',
                initUser: '/userInfo/selectAllUser',
                initSysInfo: '/sysInfo/selectAll',
                initSysRight: '/sysRight/selectAll',

                selectByNickName: '/user/selectByNickName',
                updateLoginInfo: '/user/updateLoginInfo'
            },
            rankDictType: [],
            rankDictPlace: [],
            rankStartName: [],
            rankEndName: [],
            userData:[],
            sysInfoData:[],
            sysRightData:[],

            dialogVisible: false,
            oldPassData: {
                newPass: ''
            },
            newPassData: {
                newPass: ''
            },
            newPassDataRules: {
                newPass: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    created: function () {
        var contextPath = document.location.pathname;
        var contextPath = contextPath.split('/')[1];
        var contextPath = "/" + contextPath;
        this.contextPath = contextPath;
        this.initUser();
        this.initSys();
    },
    filters: {},
    mounted: function () {
    },
    methods: {
        lookPass(row){
            var self = this;
            var url = self.contextPath + self.urls.selectByNickName + "?nickName=" + row.nickName;
            self.dialogVisible = true;
            axios.get(url)
                .then(function (res) {
                    self.oldPassData = res.data;
                })
        },
        changePass(){
            var self = this;
            var url = self.contextPath + self.urls.updateLoginInfo;
            self.oldPassData.password = self.newPassData.newPass;
            axios.post(url, self.oldPassData)
                .then(function (res) {
                    self.dialogVisible = false;
                    self.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                })
        },
        //-------------------------------------------初始化数据
        initUser(){
            var self = this;
            var url = self.contextPath + self.urls.initUser;
            axios.get(url)
                .then(function (res) {
                    self.userData = res.data;
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
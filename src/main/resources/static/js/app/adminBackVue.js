var vue1 = new Vue({
    el: '#app',
    data: function () {
        return {
            contextPath:'',
            flag: '1',
            formLabelWidth: '120',
            urls:{
                initSysInfo: '/sysInfo/selectAll',
                initSysRight: '/sysRight/selectAll',

                addSysInfo: '/sysInfo/insertAdmin',
                updateSysInfo: '/sysInfo/updateAdmin',
                addSysRight: '/sysRight/insertSysRight',
                updateSysRight: '/sysRight/updateSysRight',
            },
            sysInfoData:[],
            sysRightData:[],

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
        this.initSys();
    },
    filters: {},
    mounted: function () {
    },
    methods: {
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
        deleteAdmin(row){
            this.$confirm('确认删除此管理员吗？')
                .then(_ => {
                    var self = this;
                    var url = self.contextPath + self.urls.updateSysInfo;
                    row.deleteStatus = "0";
                    axios.post(url, row)
                        .then(function (res) {
                            self.$message.success('删除成功');
                            self.initSys();
                        })
                })
                .catch(_ => {});
        },


        //-------------------------------------------初始化数据
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
        changeTap(row){
            var self = this;
            row.sysId = row.id;
            row.id = null;
            axios.post(self.contextPath + self.urls.updateSysRight, row,)
                .then(function (res) {
                    self.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                })
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
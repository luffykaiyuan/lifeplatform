var vue1 = new Vue({
    el: '#app',
    data: function () {
        return {
            contextPath:'',
            flag: '1',
            formLabelWidth: '120',
            urls:{
                initNews: '/news/selectAllNews',
                initMessage: '/message/selectAllMessage',
                initSysInfo: '/sysInfo/selectAll',
                initSysRight: '/sysRight/selectAll',

                addMessage: '/message/insertMessage',
                updateMessage: '/message/updateMessage',
                addSysRight: '/sysRight/insertSysRight',
                updateSysRight: '/sysRight/updateSysRight',
                addSysInfo: '/sysInfo/insertAdmin',
                updateSysInfo: '/sysInfo/updateAdmin',
            },
            messageData:[],
            sysInfoData:[],
            sysRightData:[],

            messageFormVisible: false,
            messageSU: '',
            messageForm:{
                announceTitle: '',
                announceContent: '',
            },
        }
    },
    created: function () {
        var contextPath = document.location.pathname;
        var contextPath = contextPath.split('/')[1];
        var contextPath = "/" + contextPath;
        this.contextPath = contextPath;
        this.initMessage();
        this.initSys();
    },
    filters: {},
    mounted: function () {
    },
    methods: {

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



        //-------------------------------------------初始化数据
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
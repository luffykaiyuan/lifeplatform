var vue1 = new Vue({
    el: '#app',
    data: function () {
        return {
            contextPath:'',
            flag: '1',
            formLabelWidth: '120',
            urls:{
                initMessage: '/message/selectAllMessage',
                selectThreeMessage: '/message/selectThreeMessage',
                initSysInfo: '/sysInfo/selectAll',
                initSysRight: '/sysRight/selectAll',

                addMessage: '/message/insertMessage',
                updateMessage: '/message/updateMessage',
                updateAllMessage: '/message/updateAllMessage',

                imgUpload: '',
                selectFile: '/file/selectFile'
            },
            messageData:[],
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
            sysInfoData:[],
            sysRightData:[],
            imageUrl:'',

            messageFormVisible: false,
            messageSU: '',
            messageForm:{
                announceTitle: '',
                announceContent: '',
                imgId: '',
            },
        }
    },
    created: function () {
        var contextPath = document.location.pathname;
        var contextPath = contextPath.split('/')[1];
        var contextPath = "/" + contextPath;
        this.contextPath = contextPath;
        this.urls.imgUpload = this.contextPath + '/file/imgUpload';

        this.initMessage();
        this.initThreeMessage();
        this.initSys();
    },
    filters: {},
    mounted: function () {
    },
    methods: {

        openMessage(){
            this.emptyMessageForm();
            this.messageFormVisible = true;
            this.messageSU = 'save';
        },
        editMessage(row){
            this.messageFormVisible = true;
            this.imageUrl = '';
            this.messageForm = JSON.parse(JSON.stringify(row));
            this.imageUrl = this.contextPath + this.urls.selectFile + "?id=" + row.imgId;
            this.messageSU = 'update';
        },
        emptyMessageForm(){
            this.messageForm.announceTitle = '';
            this.messageForm.announceContent = '';
            this.messageForm.announceContent = '';
        },
        saveMessage(){
            var self = this;
            if (self.messageSU === 'save'){
                var url = self.contextPath + self.urls.addMessage;
            }else {
                var url = self.contextPath + self.urls.updateMessage;
            }
            axios.post(url, self.messageForm)
                .then(function (res) {
                    self.messageFormVisible = false;
                    self.initMessage();
                    self.initThreeMessage();
                })
        },
        deleteMessage(row){
            this.$confirm('确认删除此公告吗？')
                .then(_ => {
                    var self = this;
                    var url = self.contextPath + self.urls.updateMessage;
                    row.deleteStatus = "0";
                    axios.post(url, row)
                        .then(function (res) {
                            self.$message.success('删除成功');
                        })
                })
                .catch(_ => {});

        },
        saveThree(){
            var self = this;
            var url = self.contextPath + self.urls.updateAllMessage;
            var flag = 0;
            for(var i = 0; i < self.messageData.length; i++){
                if (self.messageData[i].deleteStatus === "2"){
                    flag += 1;
                }
            }
            if (flag === 3){
                axios.post(url, self.messageData)
                    .then(function (res) {
                        self.$message.success('发布成功');
                        self.initMessage();
                        self.initThreeMessage();
                    })
            }else{
                self.$message.error('请确保有3个发布中的公告！');
                return;
            }
        },

        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.messageForm.imgId = res;
        },
        beforeAvatarUpload(file) {
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

        //-------------------------------------------初始化数据
        initMessage(){
            var self = this;
            var url = self.contextPath + self.urls.initMessage;
            axios.get(url)
                .then(function (res) {
                    self.messageData = res.data;
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
var vue1 = new Vue({
    el: '#app',
    data: function () {
        return {
            contextPath:'',
            userName:'',
            taskKind: '',
            urls:{
                initTaskSquare: '/taskInfo/selectAllWaitTask',


                insertTask: '/taskInfo/insertTask',
            },
            sureLogin: true,
            taskSelect: [{
                value: '所有',
                label: '所有'
            }, {
                value: '1',
                label: '跑腿任务'
            }, {
                value: '2',
                label: '学习任务'
            }, {
                value: '3',
                label: '志愿任务'
            }],
            value: '',
            taskData: [],
            insertTaskVisible: false,
            receiveTaskVisible: false,
            taskForm: {
                taskTitle: '',
                taskType: '',
                taskPlace: '',
                taskTime: '',
                taskContent: '',
            },
            taskFormRules: {
                taskTitle: [
                    { required: true, message: '请输入任务标题', trigger: 'blur' },
                    { max: 20, message: '长度在 20 个字符', trigger: 'blur' }
                ],
                taskType: [
                    { required: true, message: '请选择任务类型', trigger: 'change' }
                ],
                taskPlace: [
                    { required: true, message: '请选择任务地区', trigger: 'change' }
                ],
                taskTime: [
                    { type: 'date', required: true, message: '选择截止时间', trigger: 'change' }
                ],
                taskContent: [
                    { required: true, message: '请输入任务内容', trigger: 'blur' },
                    { max: 2000, message: '长度在 2000 个字符', trigger: 'blur' }
                ],
            },
            operateWidth: 200
        }
    },
    created: function () {
        var contextPath = document.location.pathname;
        var contextPath = contextPath.split('/')[1];
        var contextPath = "/" + contextPath;
        this.contextPath = contextPath;
        this.userName = sessionStorage.getItem("userName");
        var flag = this.GetRequest().flag;
        console.log(this.GetRequest().flag);
        if(flag){
            this.handleSelect(flag);
        }
        this.refreshTask();
    },
    filters: {},
    mounted: function () {
    },
    methods: {
        //获取url中"?"符后的字串
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
        //打开任务发布的弹窗
        openInsertTask(){
            var self = this;
            if (!this.userName){
                self.$confirm('您还未登录，是否跳转到登录界面?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    window.location.href = this.contextPath + "/login";
                }).catch(() => {
                    return;
                });
            }else{
                self.insertTaskVisible = true;
            }
        },
        //新增任务
        insertTask(){
            var self = this;
            this.$refs['taskForm'].validate((valid) => {
                if (valid) {
                    var url = self.contextPath + self.urls.insertTask;
                    axios.post(url, self.taskForm,)
                        .then(function (res) {
                            self.insertTaskVisible = false;
                            self.refreshTask();
                            self.$message({
                                showClose: true,
                                message: '发布成功！',
                                type: 'success'
                            });
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //查看任务
        lookTask(row){
            this.receiveTaskVisible = true;
        },
        //刷新数据
        refreshTask(){
            var self = this;
            var url = self.contextPath + self.urls.initTaskSquare;
            axios.get(url)
                .then(function (res) {
                    self.taskData = res.data;
                })
        },
        // 切换表单
        handleSelect(key) {
            this.taskKind = key;
            if (key === 'taskSquare'){
                this.operateWidth = 200;
            }else if (key === 'taskReceive'){
                this.operateWidth = 300;
            }else if (key === 'taskFinish'){
                this.operateWidth = 100;
            }else if (key === 'moreInfo'){
                window.location.href = this.contextPath + "/userInfo?flag=moreInfo";
            }
        },
        //格式化数据
        formatterPlace(row){
            if (row.taskPlace === '1'){
                return "成都东软学院";
            }
            return "未知";
        },
        formatterType(row){
            for (var i = 0; i < this.taskSelect.length; i++){
                if (this.taskSelect[i].value === row.taskType){
                    return this.taskSelect[i].label;
                }
            }
            return "未知";
        },

    },
    watch: {}
});
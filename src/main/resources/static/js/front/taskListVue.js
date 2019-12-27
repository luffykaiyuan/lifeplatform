var vue1 = new Vue({
    el: '#app',
    data: function () {
        return {
            contextPath:'',
            urls:{
                initTask: '/taskInfo/selectAllTask',
                insertTask: '/taskInfo/insertTask',
            },
            sureLogin: true,
            taskSelect: [{
                value: '所有',
                label: '所有'
            }, {
                value: '跑腿任务',
                label: '跑腿任务'
            }, {
                value: '学习任务',
                label: '学习任务'
            }, {
                value: '志愿任务',
                label: '志愿任务'
            }],
            value: '',
            taskData: [],
            insertTaskVisible: false,
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
            }
        }
    },
    created: function () {
        var contextPath = document.location.pathname;
        var contextPath = contextPath.split('/')[1];
        var contextPath = "/" + contextPath;
        this.contextPath = contextPath;
        this.refreshTask();
    },
    filters: {},
    mounted: function () {
    },
    methods: {
        //打开任务发布的弹窗
        openInsertTask(){
            var self = this;
            self.insertTaskVisible = true;
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
        //刷新数据
        refreshTask(){
            var self = this;
            var url = self.contextPath + self.urls.initTask;
            axios.get(url)
                .then(function (res) {
                    self.taskData = res.data;
                })
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClick(row) {
            console.log(row);
        }
    },
    watch: {}
});
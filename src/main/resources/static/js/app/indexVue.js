var vue1 = new Vue({
    el: '#app',
    data: function () {
        return {
            contextPath:'',
            flag: '1',
            formLabelWidth: '120',
            urls:{
                initNews: '/news/selectAllNews',
                initTask: '/taskInfo/selectAllTask',
                initUser: '/userInfo/selectAllUser',
                initTaskType: '/dictInfo/selectDictType',
                initTaskPlace: '/dictInfo/selectDictPlace',

                addDict: '/dictInfo/addDict',
                updateDict: '/dictInfo/updateDict',
            },
            activeIndex: '1',
            activeIndex2: '1',
            taskData:[],
            userData:[],
            taskTypeData:[],

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
        this.initTask();
        this.initUser();
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
            axios.post(url, self.dictForm)
                .then(function (res) {
                    self.dictFormVisible = false;
                    self.initTaskPlace();
                    self.initTaskType();
                })
        },
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
                    self.taskTypeData = res.data;
                })
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
            if (key === '4-1'){
                this.dictForm.dictType = '1';
                this.initTaskType();
            } else if (key === '4-2'){
                this.dictForm.dictType = '2';
                this.initTaskPlace();
            }
        }
    },
    watch: {}
});
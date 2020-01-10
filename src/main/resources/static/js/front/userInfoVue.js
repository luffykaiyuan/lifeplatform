var vue1 = new Vue({
    el: '#app',
    data: function () {
        return {
            contextPath:'',
            userName:'',
            urls:{
                initUserInfo: '/userInfo/selectUserInfo',
                updateUserInfo: '/userInfo/updateUserInfo'
            },
            userForm: {
                phone: '',
                wechatNumber: '',
                qqNumber: '',
                userGender: '',
            }
        }
    },
    created: function () {
        var contextPath = document.location.pathname;
        var contextPath = contextPath.split('/')[1];
        var contextPath = "/" + contextPath;
        this.contextPath = contextPath;
        this.userName = sessionStorage.getItem("userName");
        if (!this.userName){
            window.location.href = this.contextPath + "/login";
        }else {
            var self = this;
            var url = self.contextPath + self.urls.initUserInfo + "?loginId=" + self.userName;
            axios.get(url)
                .then(function (res) {
                    console.log(res);
                    self.userForm = res.data;
                })
        }
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
        onSubmit() {
            var self = this;
            var url = self.contextPath + self.urls.updateUserInfo;
            axios.post(url, self.userForm)
                .then(function (res) {
                    self.$message({
                        showClose: true,
                        message: '修改成功！',
                        type: 'success'
                    });
                })
        },
        // 切换表单
        handleSelect(key, keyPath) {
            this.taskKind = key;
            if (key === 'taskSquare'){
                window.location.href = this.contextPath + "/taskList?flag=taskSquare";
            }else if (key === 'taskReceive'){
                window.location.href = this.contextPath + "/taskList?flag=taskReceive";
            }else if (key === 'taskFinish'){
                window.location.href = this.contextPath + "/taskList?flag=taskFinish";
            }else if (key === 'moreInfo'){

            }
        },
    },
    watch: {}
});
var vue1 = new Vue({
    el: '#app',
    data: function () {
        return {
            contextPath:'',
            userName:'',
            imageUrl:'',
            urls:{
                initUserInfo: '/userInfo/selectUserInfo',
                updateUserInfo: '/userInfo/updateUserInfo',

                imgUpload: '',
                selectFile: '/file/selectFile'
            },
            userForm: {
                imgId: '',
                phone: '',
                wechatNumber: '',
                qqNumber: '',
                userGender: '',
            },
            fileData: {

            }
        }
    },
    created: function () {
        var contextPath = document.location.pathname;
        var contextPath = contextPath.split('/')[1];
        var contextPath = "/" + contextPath;
        this.contextPath = contextPath;
        this.urls.imgUpload = this.contextPath + '/file/imgUpload';
        this.userName = sessionStorage.getItem("userName");
        if (!this.userName){
            window.location.href = this.contextPath + "/login";
        }else {
            var self = this;
            var url = self.contextPath + self.urls.initUserInfo + "?loginId=" + self.userName;
            axios.get(url)
                .then(function (res) {
                    self.userForm = res.data;
                    if (res.data.imgId){
                        self.imageUrl = self.contextPath + self.urls.selectFile + "?id=" + res.data.imgId;
                    }
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
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.userForm.imgId = res;
            this.onSubmit();
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
    },
    watch: {}
});
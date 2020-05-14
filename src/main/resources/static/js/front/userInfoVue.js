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
            hrefs:{
                index: '/taskList',
                login: '/login',
                myRelease: '/myRelease',
                myGet: '/myGet',
                myInfo: '/userInfo',
            },
            userForm: {
                imgId: '',
                phone: '',
                wechatNumber: '',
                qqNumber: '',
                userGender: '',
            },
            passwordForm: {
                oldPassword: '',
                password: '',
                rePassword: '',
            },
            fileData: {},
            key: '1'
        }
    },
    created: function () {
        var contextPath = document.location.pathname;
        var contextPath = contextPath.split('/')[1];
        var contextPath = "/" + contextPath;
        this.contextPath = contextPath;
        this.urls.imgUpload = this.contextPath + '/file/imgUpload';

        this.hrefs.index = this.contextPath + this.hrefs.index;
        this.hrefs.login = this.contextPath + this.hrefs.login;
        this.hrefs.myRelease = this.contextPath + this.hrefs.myRelease;
        this.hrefs.myGet = this.contextPath + this.hrefs.myGet;
        this.hrefs.myInfo = this.contextPath + this.hrefs.myInfo;

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
        changeTap(key, keyPath) {
            this.key = key;
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
        quitLogin(){
            sessionStorage.clear();
            location.href="login";
        },
    },
    watch: {}
});
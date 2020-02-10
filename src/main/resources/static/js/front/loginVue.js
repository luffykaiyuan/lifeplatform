var vue1 = new Vue({
    el: '#app',
    data: function () {
        var validateuserName = (rule, value, callback) => {
            var self = this;
            var url = self.contextPath + self.urls.confirmUser + "?userName=" + self.registerForm.userName;
            if (value === '') {
                callback(new Error('请输入账号'));
            }
            if (value.length > 11) {
                callback(new Error('长度在 11 个字符之内'));
            }
            axios.get(url)
                .then(function (res) {
                    if(res.data){
                        callback(new Error('账号已存在'));
                    }else {
                        callback();
                    }
                })
        };
        var validatePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            }
            if (value.length > 11) {
                callback(new Error('长度在 11 个字符之内'));
            }
            callback();
        };
        var validaterePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            }
            if (value.length > 11) {
                callback(new Error('长度在 11 个字符之内'));
            }
            if (value !== this.registerForm.password) {
                callback(new Error('请确保两次密码相同'));
            }
            callback();
        };
        var validatenickName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入昵称'));
            }
            if (value.length > 11) {
                callback(new Error('长度在 11 个字符之内'));
            }
            callback();
        };
        return {
            contextPath:'',
            urls:{
                loginUrl: '/user/doLogin',

                registerUrl: '/user/insertLoginInfo',
                confirmUser: '/user/confirmUser',
            },
            logORres: true,
            loginForm: {
                userName: '',
                password: '',
            },
            loginFormRules: {
                userName: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
            },
            registerForm: {
                userName: '',
                password: '',
                repassword: '',
                nickName: '',
            },
            registerFormRules: {
                userName: [
                    { validator: validateuserName, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                repassword: [
                    { validator: validaterePassword, trigger: 'blur' }
                ],
                nickName: [
                    { validator: validatenickName, trigger: 'blur' }
                ],
            },
            loginDisabled: false,
            registerDisabled: false,
        }
    },
    created: function () {
        var contextPath = document.location.pathname;
        var contextPath = contextPath.split('/')[1];
        var contextPath = "/" + contextPath;
        this.contextPath = contextPath;
        sessionStorage.clear();
    },
    filters: {},
    mounted: function () {

    },
    methods: {
        //---------------------------------登录相关---------------------------------
        toLogin(){
            this.emptyLoign();
            this.logORres = true;
        },
        emptyLoign(){
            this.loginForm.userName = '';
            this.loginForm.password = '';
            this.$refs['loginForm'].resetFields();
        },
        submitForm(formName) {
            var self = this;
            self.loginDisabled = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var url = self.contextPath + self.urls.loginUrl;
                    axios.post(url, self.loginForm)
                        .then(function (res) {
                            if ('登录成功！' === res.data){
                                sessionStorage.setItem("userName", self.loginForm.userName);
                                location.href="taskList";
                            }else{
                                self.loginDisabled = false;
                                self.$message({
                                    showClose: true,
                                    message: res.data,
                                    type: 'error'
                                });
                            }
                        })
                } else {
                    self.loginDisabled = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        //---------------------------------注册相关---------------------------------
        toRegister() {
            this.emptyRegister();
            this.logORres = false;
        },
        emptyRegister(){
            this.registerForm.userName = '';
            this.registerForm.password = '';
            this.registerForm.repassword = '';
            this.registerForm.nickName = '';
            this.$refs['registerForm'].resetFields();
        },
        doRegister(formName){
            var self = this;
            self.registerDisabled = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var url = self.contextPath + self.urls.registerUrl;
                    axios.post(url, self.registerForm,)
                        .then(function (res) {
                            self.registerDisabled = false;
                            self.logORres = true;
                            self.$message({
                                showClose: true,
                                message: '注册成功！',
                                type: 'success'
                            });
                        })
                } else {
                    self.registerDisabled = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //---------------------------------管理员登录跳转相关---------------------------------
        adminLogin(){
            location.href="adminLogin";
        }
    },
    watch: {}
});
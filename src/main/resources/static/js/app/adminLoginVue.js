var vue1 = new Vue({
    el: '#app',
    data: function () {
        return {
            contextPath:'',
            urls:{
                loginUrl: '/user/adminLogin',
            },
            loginDisabled: false,
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
                            if ('success' === res.data){
                                sessionStorage.setItem("userName", self.loginForm.userName);
                                location.href="index";
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
        toLogin(){
            location.href="login";
        },
    },
    watch: {}
});
var vue1 = new Vue({
    el: '#app',
    data: function () {
        return {
            contextPath:'',
            userName:'',
            urls:{
            },
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        }
    },
    created: function () {
        var contextPath = document.location.pathname;
        var contextPath = contextPath.split('/')[1];
        var contextPath = "/" + contextPath;
        this.contextPath = contextPath;
        this.userName = sessionStorage.getItem("userName");
        console.log(this.GetRequest().flag);
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
            console.log('submit!');
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
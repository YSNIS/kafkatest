var app = new Vue({
    el: '#app',
    data: {
        key: '',
        value: ''
    },
    methods: {
        submitForm: function() {
            let self = this;
            var payload = {
                [this.key]: this.value
            }
            Vue.http.post('/logger', payload).then(function () {
                window.alert('Data successfully sent!')
            }, function () {
                window.alert('Data failed to send!')
            }).finally(function (){
                self.key = '';
                self.value = '';
            });
        }
    }
})

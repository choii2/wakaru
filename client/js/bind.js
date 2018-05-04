var myModel = {
    id: "0",
    user_id: "0",
    contents: "hoge",
    unixtime: 24
};

var myViewModel = new Vue({
    el: '#my_view',
    data: {posts: []},
    created: function(){
        this.fetchData()
    },
    methods: {
        fetchData(){
            self = this;
            console.log(myViewModel)

            var request = window.superagent;
            url = "https://4ihvpi6t63.execute-api.ap-northeast-1.amazonaws.com/dev/post"
            request
                .get(url)
//                .send({user_id:0, text:"ほげ"})
                .end(function(err, res){
                    console.log(res)
                    console.log(res.text);//レスポンス
                    //レスポンスがJSONの場合 
                    console.log(JSON.parse(res.body));//ここにparse済みのオブジェクトが入る
                    self.posts = JSON.parse(res.body)
            });
    
        }
    }
});
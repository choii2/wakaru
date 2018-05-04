var myModel = {
    id: "0",
    user_id: "0",
    contents: "hoge",
    unixtime: 24
};

var myViewModel = new Vue({
    el: '#my_view',
    data: {
        posts: [{
            id: "0",
            user_id: "0",
            contents: "hoge",
            unixtime: 24
        },
        {
            id: "0",
            user_id: "0",
            contents: "hoge",
            unixtime: 24
        },
        {
            id: "0",
            user_id: "0",
            contents: "hoge",
            unixtime: 24
        },
        {
            id: "0",
            user_id: "0",
            contents: "hoge",
            unixtime: 24
        },
        {
            id: "0",
            user_id: "0",
            contents: "hoge",
            unixtime: 24
        }],
        new_post : {
            message: "",
            user_id: 0
        }
    },
    created: function(){
        this.fetchData()
    },
    computed: {
        orderByID: function () {
          return _.orderBy(this.posts, 'id').reverse()
        }
    },
    methods: {
        fetchData(){
            self = this;

            var request = window.superagent;
            url = "https://4ihvpi6t63.execute-api.ap-northeast-1.amazonaws.com/dev/post"
            request
                .get(url)
                .end(function(err, res){
                    console.log(res)
                    console.log(res.text);//レスポンス
                    //レスポンスがJSONの場合
                    console.log(JSON.parse(res.body));//ここにparse済みのオブジェクトが入る
                    self.posts = JSON.parse(res.body)
            });
        },
        post: function(event){
            self = this;

            var request = window.superagent;
            url = "https://4ihvpi6t63.execute-api.ap-northeast-1.amazonaws.com/dev/post"

            request
            .post(url)
            .send({user_id:self.new_post.user_id, text:self.message})
            .end(function(err, res){
                console.log(res)
                console.log(res.text);//レスポンス
                //レスポンスがJSONの場合
                console.log(JSON.parse(res.body));//ここにparse済みのオブジェクトが入る
                console.log(self.posts)

                request
                .get(url)
                .end(function(err, res){
                    console.log(res)
                    console.log(res.text);//レスポンス
                    //レスポンスがJSONの場合
                    console.log(JSON.parse(res.body));//ここにparse済みのオブジェクトが入る
                    self.posts = JSON.parse(res.body)});;
                }
            )
        }
    }
});
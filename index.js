const express = require('express')
const app = express()
const port = 5000

const { User } = require("./models/User");
const bodyParser = require('body-parser');

//application/x-www-form-urlencoded 형태로 되어있는 애들을 분석해서 가져오게 한다.
app.use(bodyParser.urlencoded({extended: true}));

//application/json 형태로 되어있는 애들을 분석해서 가져오게 한다.
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://pmk:pmk@cluster0.yx165.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true //useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))



app.get('/', (req, res) => res.send('Hello World!~~ 안녕하세요'))


app.post('/register', (req, res) => {
    
    //회원 가입 할때 필요한 정보를 가져오면 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body)

    //정보들이 user모델에 저장
    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
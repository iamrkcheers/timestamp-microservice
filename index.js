var express = require('express');
var bodyParser = require('body-parser');
var time = require('strftime');

var app = express();

app.use(bodyParser());

app.get('/',function(req,res){
    res.sendFile('index.html',{root: __dirname});
});

app.use(express.static(__dirname));

app.get('/:query',function(req,res){
    
    var date = 0;
    
    if (!isNaN(req.params.query)) {
        date = (new Date(Number(req.params.query))).getTime();
    }
    else {
        date = (new Date(req.params.query)).getTime();
    }
    
    var valid = date > 0;
    
    if (valid && !isNaN(req.params.query)) {
        res.json({
            'unix' : date,
            'natural' : time('%B %d, %Y',new Date(Number(req.params.query)))
        });
    }
    else if (valid && isNaN(req.params.query)) {
        res.json({
            'unix' : date,
            'natural' : req.params.query
        });
    }
    else
        res.json({
            'unix' : null,
            'natural' : null
        });
    
})

app.listen(8080,function(){
    console.log('server has started ..');
});
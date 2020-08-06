//const request = require("request");
const express= require('express');
const app=express();
// API endpoint to which the http
// request will be made
const bodyParser=require('body-parser');
const exphbs=require('express-handlebars');
const path=require('path');
const abc =require('novelcovid');



app.use(express.static(path.join(__dirname,'public')));
app.engine('handlebars',exphbs({defaultLayout: 'main'}));
app.set('view engine','handlebars');



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
  //abc.states({state : 'india'}).then(resu=>{
    //console.log(resu)
  //})
  abc.countries({sort : 'cases'}).then((result)=>{
    //console.log(result);
    res.render('main',{result : result});
  })

});
app.get('/:id',(req,res)=>{
  abc.countries({sort : 'cases'}).then((result)=>{

      for(var i=0;i< result.length;i++)
      {
        if(result[i].countryInfo._id == req.params.id)
        {
          console.log(result[i]);
          console.log(result[i].countryInfo._id ,req.params.id);
          res.render('main/country',{detail :result[i]})
        }
      }

  });

});


var port = process.env.PORT | 9000;
app.listen(port,()=>{
  console.log(`listening to port `+port);
});

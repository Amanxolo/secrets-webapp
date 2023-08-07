const pool = require("./connections.js");
const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

//-------------FOLLOW Variable-------------------------
//-----------------------------------------------------

//HOME ROUTE :-----------------------------------------

app.get("/",function(req,res){
    pool.getConnection(function(error,con){
        if (error) throw error;

        else{
            con.query("SELECT * FROM users",function(error,result){
                if (error) throw error;
                var follow = result.length;
                res.render('home',{follow:follow});

                con.release();
    
                
            });

        }
        
    });
    
});

//--END----------------------------------------------------

//----------------SIGNUP Variable--------------------------
var sign=0;
//---------------------------------------------------------

//SIGN-UP ROUTE :------------------------------------------
app.get('/signup',function(req,res){
    res.sendFile(__dirname+'/signup.html');

});

app.post('/signup',function(req,res){
    var id = req.body.id;
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.pass;

    pool.getConnection(function(error,con){
        if (error) throw error;

        else{
            con.query("INSERT INTO users VALUES(?,?,?,?)",[id,name,email,pass],function(error,result){
                if (error) throw error;
                sign=1;
                res.redirect("/login");

                con.release();
    
                
            });

        }
        
    });

});

//-------END-------------------------------------------------------------------------


//----------Registration variable-------------------------

var reg=1;

//-----------Authorization variable------------------------
var auth=0;


//LOGIN ROUTE :--------------------------------------------


app.get('/login',function(req,res){
    res.render('login',{reg: reg, sign: sign});
    reg=1;
    sign=0;
});




app.post('/login',function(req,res){
    var email = req.body.email;
    var password = req.body.pass;
    
    pool.getConnection(function(error,con){
        if (error) throw error;
        // con.query("INSERT INTO users VALUES(?,?,?,?)",[id,name,email,mno],function(error,result){
        //     if (error) throw error;
            
        // });
        else{
            con.query("SELECT * FROM users",function(error,result){
                if (error) throw error;
                
                for(i=0;i<result.length;i++){
                    if(result[i].Email===email && result[i].password===password){
                        var flag=1;
                    }
                }
                if(flag===1){
                    auth=1;
                    res.render("dashboard", {email: email});
                    auth=0;
                }
                else{
                    reg=0;
                    res.redirect("/login");
                }

                con.release();
            });
        }
        
    });

    

});

//---END----------------------------------------------------------------------

//--------------------USER DASHBOARD------------------------------------------
app.get("/dashboard",function(req,res){
    if(auth===1){
        res.send("My dashboard!");
    }
    else{
        res.send("You win master wayne");
    }
})
//----------------------------------------------------------------------------

app.listen(7000);
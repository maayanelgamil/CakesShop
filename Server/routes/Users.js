
let express = require('express');
let DBUtilsAzure = require('../utils');
let Constants = require('../Constants');
let router = express.Router();

router.post('/register', function (req,res) {     //Add User
    let username = req.body[0].UserName;
    let password = req.body[0].Password;
    let firstName = req.body[0].FirstName;
    let lastName = req.body[0].LastName;
    let adress = req.body[0].Adress;
    let city = req.body[0].City;
    let country = req.body[0].Country;
    let phone = req.body[0].Phone;
    let mail = req.body[0].Mail;
    let creditCard = req.body[0].CreditCardNumber;
    let isAdmin = req.body[0].isAdmin ? req.body[0].isAdmin : 0;
    let q1 = req.body[0].Question1;
    let q2 = req.body[0].Question2;
    let a1 = req.body[0].Answer1;
    let a2 = req.body[0].Answer2;

    query = DBUtilsAzure.getInsertScript(Constants.usersInsert, [username, password, firstName, lastName, adress, city,
                                                            country, phone, mail, creditCard, isAdmin, q1, q2, a1, a2]);
    DBUtilsAzure.Insert(query).then(function (result) { //insert user's questions and answers
         if (result == true) {
             let c1 = req.body[0].Category1;
             let c2 = req.body[0].Category2;
             let c3 = req.body[0].Category3;
                categoryQuery = DBUtilsAzure.getInsertScript(Constants.userCategoryInsert, [username, c1, c2, c3]);
                DBUtilsAzure.Insert(categoryQuery).then(function (result)
                    {
                             res.send(result);
                     }).catch(function(err){ res.status(400).send(err);});
                }
            else  res.send(false);
        }).catch(function(err){
            res.status(400).send(err);});
    });
//-------------------------------------------------------------------------------------------------------------------
router.delete('/deleteUser', function (req,res) {
        var userId = req.body.UserName;
        if(userId){
        DBUtilsAzure.Delete("DELETE from [Users] WHERE [UserName] = '" + userId + "'").then(function (result) {
            res.status(200).send('Delete succeeded');
        }).catch(function(err){ res.status(400).send(err);});
    }else{
            res.status(400).send('Delete User faild: Since the user name is invalid ');
    }
});
//-------------------------------------------------------------------------------------------------------------------
router.get('/getAll', function (req,res,next) {
    DBUtilsAzure.Select('Select * from Users').then(function (result) {
        res.send(result);
    }).catch(function(err){ res.status(400).send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
router.post('/login', function (req,res,next) {
    let name = req.body.UserName;
    let password = req.body.Password;
    DBUtilsAzure.Select("Select * from Users Where UserName = '" + name + "' AND Password = '" + password + "'").then(function (result) {
        if(result.length >0) {
            var token = req.app.locals.tokens;
            req.app.locals.tokens++;
            req.app.locals.users[name] = token;
            res.send({token: token});
        }
        else
            res.send(null);
    }).catch(function(err){
        console.log(err);
        res.sendStatus(403)});
});
//-------------------------------------------------------------------------------------------------------------------
router.get('/questions/:name', function (req,res,next) {
    let name = req.params.name;
    DBUtilsAzure.Select("Select [Question1],[Question2] from Users Where UserName = '" + name + "'").then(function (result) {
        res.send(result[0]);
    }).catch(function(err){ res.status(400).send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
router.put('/restorePassword', function (req,res,next) {
    let name = req.body.UserName;
    let a1 = req.body.Answer1;
    let a2 = req.body.Answer2;
    DBUtilsAzure.Select("Select [Password] from Users Where UserName = '" + name + "' AND Answer1 = '"+ a1 + "' AND Answer2 = '"+ a2 + "'")
        .then(function (result) {
            if(result[0] == string.empty())
                res.status(400).send();
            else
                res.send(result[0]);
    }).catch(function(err){ res.status(400).send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
router.get('/orders/:name', function (req,res,next) {
    let name = req.params.name;
    DBUtilsAzure.Select("Select * from Orders Where [UserName] = '" + name + "'").then(function (result) {
        res.send(result);
    }).catch(function(err){ res.status(400).send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
router.post('/addToCart', function (req,res,next) {
    let name = req.body.UserName;
    let cake = req.body.CakeID;
    let amount = req.body.Amount;
    let query = DBUtilsAzure.getInsertScript(Constants.insertToCart, [name, cake, amount]);
    DBUtilsAzure.Insert(query).then(function (result) {
        if(result == true)
            res.send(result);
        else
            res.send(false);
    }).catch(function(err){ res.status(400).send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
router.delete('/deleteFromCart', function (req,res) {
    var name = req.body.UserName;
    var cake = req.body.CakeID;
    DBUtilsAzure.Delete("DELETE from [CakesInCarts] WHERE [UserName] = '" + name + "' AND [CakeID] = '" + cake + "'").then(function (result) {
        res.status(200).send('Delete succeeded');
    }).catch(function(err){ res.status(400).send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
router.get('/recommandation/:name', function (req,res) {
    var name = req.params.name;
    var query = Constants.recommendedCakesScript(name);
    DBUtilsAzure.Select(query).then(function (result) {
        if(result.length == 0)
            DBUtilsAzure.Select(Constants.recommendedCakesCategory(name)).then (function (result) {
                res.send(result);
            });
        else
            res.send(result);
    }).catch(function(err){ res.status(400).send(err);});
});

//-------------------------------------------------------------------------------------------------------------------
function checkLogin(req) {
    let token = req.headers["my-token"];
    let user = req.headers["user"];
    if (!token || !user)
        return false;
    let validToken = req.app.locals.users[user];
    if (validToken == token)
        return true;
    else
        return false;
}
//-------------------------------------------------------------------------------------------------------------------

module.exports = router;

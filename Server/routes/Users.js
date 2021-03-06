
let express = require('express');
let DBUtilsAzure = require('../utils');
let Constants = require('../Constants');
let router = express.Router();

router.post('/register', function (req,res) {     //Add User
    let username = req.body.UserName;
    let password = req.body.Password;
    let firstName = req.body.FirstName;
    let lastName = req.body.LastName;
    let adress = req.body.Address;
    let city = req.body.City;
    let country = req.body.Country;
    let phone = req.body.Phone;
    let mail = req.body.Mail;
    let creditCard = req.body.CreditCardNumber;
    let isAdmin = req.body.isAdmin ? req.body.isAdmin : 0;
    let q1 = req.body.Question1;
    let q2 = req.body.Question2;
    let a1 = req.body.Answer1;
    let a2 = req.body.Answer2;

    query = DBUtilsAzure.getInsertScript(Constants.usersInsert, [username, password, firstName, lastName, adress, city,
                                                            country, phone, mail, creditCard, isAdmin, q1, q2, a1, a2]);
    DBUtilsAzure.Insert(query).then(function (result) { //insert user's questions and answers
         if (result == true) {
             let c1 = req.body.Category1.CategotyName;
             let c2 = req.body.Category2.CategotyName;
             let c3 = req.body.Category3.CategotyName;
                categoryQuery = DBUtilsAzure.getInsertScript(Constants.userCategoryInsert, [username, c1, c2, c3]);
                DBUtilsAzure.Insert(categoryQuery).then(function (result)
                    {
                             res.send(result);
                     }).catch(function(err){ res.send(err);});
                }
            else  res.send(false);
        }).catch(function(err){
            res.send(err);});
    });
//-------------------------------------------------------------------------------------------------------------------
router.delete('/deleteUser', function (req,res) {
        var userId = req.body.UserName;
        if(userId){
        DBUtilsAzure.Delete("DELETE from [Users] WHERE [UserName] = '" + userId + "'").then(function (result) {
            res.send('Delete succeeded');
        }).catch(function(err){ res.send(err);});
    }else{
            res.send('Delete User faild: Since the user name is invalid ');
    }
});
//-------------------------------------------------------------------------------------------------------------------
router.get('/getAll', function (req,res,next) {
    DBUtilsAzure.Select('Select * from Users').then(function (result) {
        res.send(result);
    }).catch(function(err){ res.send(err);});
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
        res.send(err)});
});
//-------------------------------------------------------------------------------------------------------------------
router.get('/questions/:name', function (req,res,next) {
    let name = req.params.name;
    DBUtilsAzure.Select("Select [Question1],[Question2] from Users Where UserName = '" + name + "'").then(function (result) {
        res.send(result[0]);
    }).catch(function(err){ res.send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
router.put('/restorePassword', function (req,res,next) {
    let name = req.body.UserName;
    let a1 = req.body.Answer1;
    let a2 = req.body.Answer2;
    DBUtilsAzure.Select("Select [Password] from Users Where UserName = '" + name + "' AND Answer1 = '"+ a1 + "' AND Answer2 = '"+ a2 + "'")
        .then(function (result) {
            if(result.length > 0)
                res.send(result[0]);
            else
                res.send();

        }).catch(function(err){ res.send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
router.get('/orders/:name', function (req,res,next) {
    let name = req.params.name;
    DBUtilsAzure.Select("Select * from Orders Where [UserName] = '" + name + "'").then(function (result) {
        res.send(result);
    }).catch(function(err){ res.send(err);});
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
    }).catch(function(err){ res.send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
router.delete('/deleteFromCart', function (req,res) {
    var name = req.body.UserName;
    var cake = req.body.CakeID;
    DBUtilsAzure.Delete("DELETE from [CakesInCarts] WHERE [UserName] = '" + name + "' AND [CakeID] = '" + cake + "'").then(function (result) {
        res.send('Delete succeeded');
    }).catch(function(err){ res.send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
router.get('/recommandation/logged/:name', function (req,res) {
    var name = req.params.name;
    var query = Constants.recommendedCakesScript(name);
    DBUtilsAzure.Select(query).then(function (result) {
        if(result.length == 0)
            DBUtilsAzure.Select(Constants.recommendedCakesCategory(name)).then (function (result) {
                res.send(result);
            });
        else
            res.send(result);
    }).catch(function(err){ res.send(err);});
});

module.exports = router;

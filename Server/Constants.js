

exports.usersInsert = "INSERT INTO [Users]"+
    "([UserName]"+
    ",[Password]"+
    ",[FirstName]"+
    ",[LastName]"+
    ",[Adress]"+
    ",[City]"+
    ",[Country]"+
    ",[Phone]"+
    ",[Mail]"+
    ",[CreditCardNumber]"+
    ",[isADmin]" +
    ",[Question1]"+
   " ,[Question2]"+
    ",[Answer1]"+
    ",[Answer2])";

exports.userCategoryInsert = "INSERT INTO [dbo].[UsersCategories]"+
    "([UserName]"+
    ",[Category1]"+
    ",[Category2]"+
    ",[Category3])";

exports.insertOrder = "INSERT INTO [dbo].[Orders]"+
    "([UserName]" +
    ",[OrderDate]" +
    ",[ShipmentDate]" +
    ",[Dollar]" +
    ",[TotalPayment])" ;

exports.insertCakesInOrders = "INSERT INTO [dbo].[CakesInOrders]"+
            "([OrderID]"+
            ",[CakeID]"+
            ",[Amount])"+
            "VALUES ";

exports.insertCake = "INSERT INTO [dbo].[Cakes]"+
    "([CakeName]"+
    ",[SuplierID]"+
    ",[Description]"+
    ",[price]"+
    ",[StockAmount])";

exports.insertToCart = "INSERT INTO [dbo].[CakesInCarts]"+
    "([UserName]"+
    ",[CakeID]"+
    ",[Amount])";

exports.updateCakesAmount = function(id, amount){
    var query = 	"UPDATE [dbo].[Cakes] "+
    "SET [StockAmount] = [StockAmount] - " + amount +
    "WHERE CakeID = '" + id + "' ";
    return query;
};

exports.recommendedCakesScript = function(userName){
    var query = "Select * From Cakes Where CakeID IN (Select CakeID From CakesInOrders Where OrderID IN"+
        " (Select OrderID"+
        "  From Orders"+
        "  Where UserName IN"+
        "(Select distinct UserName"+
        "  From Orders"+
        "  Where OrderID IN"+
        "   (Select OrderID"+
        "   From CakesInOrders"+
        "   where CakeID IN (SELECT distinct CakeID"+
        "    From CakesInOrders"+
        "   Where OrderID IN    (Select OrderID"+
        "    From Orders"+
        "    Where UserName = '" + userName + "'))) AND UserName <> '" + userName + "')) And CakeID NOT IN (SELECT distinct CakeID"+
        "   From CakesInOrders    Where OrderID IN"+
        "   (Select OrderID    From Orders"+
        "   Where UserName = '" + userName + "')))";
    return query;
};

exports.recommendedCakesCategory = function (userName) {
    var query = "select * from [Cakes] where [Category] IN" +
    "(Select [Category1] as [Category]  From UsersCategories where UserName = '"+userName+"')"+
    "OR [Category] IN (Select Category2 as CategoryName From UsersCategories where UserName = '"+userName+"')"+
    "OR [Category] IN (Select Category3 as CategoryName From UsersCategories where UserName = '"+userName+"')";
    return query;

};

exports.cakesCategories = function(category){
    var query = "Select * From Cakes Where [Category] = '" + category + "'";
    return query;
};


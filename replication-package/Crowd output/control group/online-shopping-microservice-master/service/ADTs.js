
var itemADT = {
    objectType: String , //{logs,reviews,users,items,shoppingCarts}
    objectId : Number,  // random integer less than 1000000000
    itemId:String,
    itemName: String,
    price:Number,
    rate:Number,
    seller:String,
    status:String,
};

var reviewADT = {
    objectType: String , //{logs,reviews,users,items,shoppingCarts}
    objectId : Number,  // random integer less than 1000000000
    itemId:String,
    comment:String,
    rate:Number,
    userId:String,
}

var shoppingCart = {
    objectType: String , //{logs,reviews,users,items,shoppingCarts}
    objectId : Number,  // random integer less than 1000000000
    itemId:String,
    price:Number,
    userId:String,
}

var logADT ={
    objectType: String , //{logs,reviews,users,items,shoppingCarts}
    objectId : Number,  // random integer less than 1000000000
    itemId:String,
    action:String,
    Date:String,
    userId:String,
}
var userADT ={
    objectType: String , //{logs,reviews,users,items,shoppingCarts}
    objectId : Number,  // random integer less than 1000000000
    firstName:String,
    lastName:String,
    address:String,
    userId:String,
}
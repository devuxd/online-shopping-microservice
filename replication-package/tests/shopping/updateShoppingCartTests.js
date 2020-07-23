// Adding and removing items from the shopping cart are common actions for users, implementing the function to update the shopping cart based on the type of action.
// 1- It finds item based on 'itemId' from database,
// 2- then if the 'flagOfAction' is 'adding', the function fetches the user's shopping cart and adds the new item to the shopping cart,
// then save the shopping cart again in the database.
// 3- It is possible user wants to remove an item from the shopping cart, If the 'flagOfAction' is 'deleting' an item,
// the function fetches the user's shopping cart and remove the item from the shopping cart, then save the shopping cart in the database again.
// 4- if the 'flagOfAction ' is not 'adding' or 'removing' the function should return a 'TypeError' exception with a description.
// 5- Since the user already logged in the system and tried to update the shopping cart,
// the function should store a log from the items the user add or remove from the shopping cart, t
// his log might be useful for future item recommendations. The function may make use of a 3rd party persistence library .
// 6-If any of the input arguments are empty or null, a 'TypeError' exception should be thrown with a description.


let axios = require('axios');
let assert = require('assert');

var shoppingService = require('../../service/shopping_session1_service');
let url = 'http://localhost:3001/shopping_endpoints/updateShoppingCart';

describe('test /shopping_endpoints/updateShoppingCart', function () {


    it('Behavior 1: TODO: check implementation', async function () {
        const obj1 = await axios.post(url, {params: {userId:'eaghayi', itemId:'1', flagOfAction:'removing'}});
        // assert.equal(obj1.data.result, true);

        assert.equal(1,0,'TODO: check implementation');

    });

    it('Behavior 2', async function () {
        const obj1 = await axios.post(url, {params: {userId:'eaghayi', itemId:'1', flagOfAction:'adding'}});
        assert.equal(obj1.data.result, true);
    });

    it('Behavior 3', async function () {
        const obj1 = await axios.post(url, {params: {userId:'eaghayi', itemId:'1', flagOfAction:'removing'}});
        assert.equal(obj1.data.result, true);

    });
    it('Behavior 4', async function () {
        const obj1 = await axios.post(url, {params: {userId:'eaghayi', itemId:'1', flagOfAction:'SOMETHING'}});
        assert.notEqual(obj1.data.result, true);
        assert.equal(obj1.data.result, null);

    });

    it('Behavior 5: TODO: check implementation', async function () {
        const obj1 = await axios.post(url, {params: {userId:'eaghayi', itemId:'1', flagOfAction:'removing'}});
        assert.equal(obj1.data.result, true);

        assert.equal(1,2,'TODO: check implementation');

    });
    it('Behavior 6', async function () {

        const obj = await axios.post(url, {params: {userId:'eaghayi', itemId:'', flagOfAction:'removing'}});
        assert.equal(obj.data.result, null);
        assert.notEqual(obj.data.result, true);
    });
});
// The last step in online purchasing is checking out the shopping cart.
// The information of a cart must be fetched from the database by the information of the user (each userId only has one cart).
// 1-The function should calculate the summation of prices of items in the shopping cart.
// 2-If the summation is zero it shows user does not have any item in the shopping cart,
// the function should return a meaningful response.
// 3-All information of the user like the first name, last name is available in the database that function can fetch them based on 'userId'.
// The function for finalizing the order create an order data type object then store it in the database
// (FYI: a subroutine which is NOT part of this function reads order objects hourly and complete them).
// 4-The function should call 3rd party persistence library for deleting the items in the shopping cart,
// because items in the shopping cart are purchased.
// 5-The function is also responsible for checking the validity of all input arguments
// if one of them is invalid the function a 'TypeError' exception should be thrown with a description.
// 6-Apparently the user already logged in the system then is trying to check out the shopping cart,
// the function should store a log from the items that the user added to the shopping cart, this log is useful for future item recommendations.
// The function may make use of a 3rd party persistence library.

let axios = require('axios');
let assert = require('assert');

var shoppingService = require('../../service/shopping_session1_service');
let url = 'http://localhost:3001/shopping_endpoints/placeOrder';

describe('test /shopping_endpoints/placeOrder', function () {


    it('Behavior 1: TODO: check implementation', async function () {

        assert.equal(1,1, 'TODO: look at the implementation');


    });

    it('Behavior 2:  TODO: check implementation', async function () {
        assert.equal(1,1, 'TODO: look at the implementation');
    });

    it('Behavior 3:  TODO: check implementation', async function () {
        assert.equal(1,1, 'TODO: look at the implementation');
    });

    it('Behavior 4 TODO: check implementation', async function () {
        assert.equal(1,0, 'TODO: look at the implementation');
    });

    it('Behavior 5:', async function () {
        const obj = await axios.post(url, {params: {userId:'', address:"fairfax,va,usa", paymentCardNumber:'1234567890123456', cvv2:'123', zipCode:'22030'}});
        assert.equal(obj.data.result, null);
        assert.notEqual(obj.data.result, true);

    });
    it('Behavior 6: TODO: check implementation', async function () {
        assert.equal(1,1, 'is not implemented');

    });
});
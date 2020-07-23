// A user may want to see his/her shopping cart,
// 1- implementing the function for fetching the user's shopping cart. A shopping cart contains all items that the user added to shopping cart. The function search among shopping carts data types of all users and finds the user's shopping cart based on 'userId'.
// 2-Each user has only one shopping cart, if the function finds more than one or zero shopping cart for the user it should return a meaningful response with a description. The structure of shopping cart object is available in Data Type section.
// 3-The user logged in the system and tried to fetch shopping cart, the function should store a 'log' data type object from the items that the user has in the shopping cart, this log might be useful for future item recommendations. The function may make use of a 3rd party persistence library.
// 4-If 'userId' is empty or null, a 'TypeError' exception should be thrown with a description.

let axios = require('axios');
let assert = require('assert');
let url = 'http://localhost:3001/shopping_endpoints/fetchShoppingCart';

describe('test /shopping_endpoints/fetchShoppingCart', function () {


    it('Behavior 1', async function () {
        const result = await axios.get(url, {params: {userId: 'eaghayi'}});

        assert.equal(result.data.userId, 'eaghayi');
        assert.equal(result.data.itemList.length, 2);

    });
    //
    it('Behavior 2:', async function () {
        const result = await axios.get(url,{params:{ userId:'favazzad'}});// favazzad has two carts, so it should throw error
        assert.equal(result.data.id, "null");

    });

    it('Behavior 3: TODO: check the implementation, it is not implemented in the body of function', async function () {
        const result = await axios.get(url,{params:{ userId:'eaghayi', itemName:'backpack'}});
        assert.equal(0,1,'check the implementation, it is not implemented in the body of function ');

    });
    it('Behavior 4', async function () {
        const result = await axios.get(url,{params:{ userId:''}});
        assert.equal(result.data.id,'null',);

    });
});
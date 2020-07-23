// Users may want to view their purchase history.
// All interaction of users like item they purchased, viewed, or searched are stored in database in the structure of 'log' Data Types.
// 1- This function searches the users' logs data types, then refines and returns items that the user purchased.
// The 'action' property of 'log' data type objects for purchase item is 'purchased'.
// Each item in the log data type objects has a 'action' property which indicates if the item was 'purchased', 'viewed', or 'searched' by the user.
// This function should return the items with the 'purchased' flag.
// 2-If there are no such items, the function returns an empty collection. The function may interact with a 3rd party persistence library to retrieve data.
// 3-If 'userId' is empty or null , a 'TypeError' exception should be thrown with a description.


var axios = require('axios');
var assert = require('assert');
const url='http://localhost:3001/shopping_endpoints/purchasesHistories';

describe('test /shopping_endpoints/purchase histories', function () {


    it('Behavior 1:  refines and returns items that the user purchased', async function () {
        const result = await axios.get(url, {
            params: {
                userId: 'eaghayi'
            }
        });
        // they didnot implemented this behavior at all
        assert.equal(result.data[0].action, "purchased");
        assert.equal(result.data[0].id, 1);
    });
    it('Behavior 2:  function returns an empty collection', async function () {
        const result = await axios.get(url, {
            params: {
                userId: 'noOne'
            }
        });
        // they didnot implemented this behavior at all
        assert.equal(result.data.length, 0);
    });
    it('Behavior 3: userId should not be null or empty', async function () {
        const result = await axios.get(url, {
            params: {
                userId: ''
            }
        });
        assert.equal(result.data[0].id, "null");
    });
});
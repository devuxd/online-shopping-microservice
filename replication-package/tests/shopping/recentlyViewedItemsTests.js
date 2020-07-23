// Users may want to view the list of items that they have previously viewed.
// All interaction of users like item they purchased, viewed , or searched are stored in database in the structure of 'log' Data Types.
// 1- This function searches the items of log data type objects of all users, then refines and returns the items viewed by the user,
// the 'action' property of 'log' data type objects in the database for viewed items is 'viewed'.
// Each item in the log data type objects has a flag ('action' property) which indicates if the item was 'purchased', 'viewed', or 'searched' by the user.
// 2-If there are no such items, it returns an empty collection. The function may make use of a 3rd party persistence library.
// 3-The function should check the validity of the input arguments. If 'userId' is empty or nu , a 'TypeError' exception should be thrown with a description.


var axios = require('axios');
var assert = require('assert');
const url='http://localhost:3001/shopping_endpoints/recentlyViewedItems';

describe('test /shopping_endpoints/recently Viewed Items', function () {


    it('Behavior 1:  refines and returns items that the user viewed', async function () {
        const result = await axios.get(url, {
            params: {
                userId: 'eaghayi'
            }
        });
        // they didnot implemented this behavior at all

        assert(result.data.length>0);
        assert(result.data[0].action =="viewed" || result.data[0].action =="purchased" );
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
// A user may write a review of an item, implementing the function to add a new review for the item.
// 1- The function adds a review ADT to the list of reviews, and persist the updated item to the database.
// The function interacts with a persistence library to store the data.
// 2-The function should also check the validity of the input arguments. If any of the input arguments are empty or null, a 'TypeError ' exception should be thrown with a description.


let axios = require('axios');
let assert = require('assert');
let url = 'http://localhost:3001/shopping_endpoints/reviewAnItem';

describe('test /shopping_endpoints/reviewAnItem', function () {


    it('Behavior 1:', async function () {1
        const obj1 = await axios.post(url, {params: {userId:'eaghayi', itemId:'1', comment:'recomend it', rate:'3'}});

        assert.equal(obj1.data.result.comment, 'recomend it');

    });
    it('Behavior 2', async function () {
        const obj1 = await axios.post(url, {params: {userId:null, itemId:'', comment:'', rate:''}});
        assert.equal(obj1.data.result, null);
        assert.notEqual(obj1.data.result, true);
        const obj = await axios.post(url, {params: {userId:'eaghayi', itemId:'1', comment:'not bad', rate:null}});
        assert.equal(obj.data.result, null);
        assert.notEqual(obj.data.result, true);
    });
});
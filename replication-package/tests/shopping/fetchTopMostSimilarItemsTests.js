// A user may compare a browsed item with other similar items,
// 1- implementing the function to find similar items with a browsed item. The function should search among the items in the store that their name includes the name of the browsed item,
// 2-if similar items are more than 20 items, The function only returns top 20 items that have rating higher rating (ex: there exist 35 similar items, The function should only return the 20 items which higher rating),
// 3- if the function could not find any similar item it returns empty collection.
// 4- The user already logged in the system and tried to comparing items, the function should store a log from the items that the user have seen, this can be useful for future item recommendations.The function may make use of a 3rd party persistence library.
// 5- The function should also check the validity of input arguments, the function should check the information of the user, information of the item to not be empty or null, if it is invalid a 'TypeError' exception should be thrown with a description.


var axios = require('axios');
var assert = require('assert');


describe('test /shopping_endpoints/Fetch Top Most Similar', function () {


    it('Behavior 1:  return best match results', async function () {
        const result = await axios.get('http://localhost:3001/shopping_endpoints/fetchTopMostSimilarItems', {
            params: {
                userId: 'eaghayi',
                itemName: 'backpack2'
            }
        });
        // they didnot implemented this behavior at all
        assert.equal(result.data[0].name, 'backpack2');
    });

    it('Behavior 2:  TODO: is not implemented. similar items are more than 20 items', async function () {
        const result = await axios.get('http://localhost:3001/shopping_endpoints/fetchTopMostSimilarItems', {
            params: {
                userId: 'eaghayi',
                itemName: 'backpack'
            }
        });
        // they didnot implemented this behavior at all
        assert.equal(0, 1);
    });
    it('Behavior 3: could not find any similar item it returns empty collection', async function () {
        const result = await axios.get('http://localhost:3001/shopping_endpoints/fetchTopMostSimilarItems', {
            params: {
                userId: 'eaghayi',
                itemName: 'itemNotFound'
            }
        });
        assert.equal(result.data.length, 0);
    });
    it('Behavior 4: store a \'log\' data type object  from the items that the user searched', async function () {
        const result = await axios.get('http://localhost:3001/shopping_endpoints/fetchTopMostSimilarItems', {
            params: {
                userId: 'eaghayi',
                itemName: 'backpack'
            }
        });
        assert.equal(result.data[0].id, 1);
    });
    it('Behavior 5: illegal argument, userId or itemName is null', async function () {
        const result = await axios.get('http://localhost:3001/shopping_endpoints/fetchTopMostSimilarItems', {
            params: {
                userId: "",
                itemName: 'backpack'
            }
        });
        assert.equal(result.data[0].id, 'null', 'check userId');
        const result2 = await axios.get('http://localhost:3001/shopping_endpoints/fetchTopMostSimilarItems', {
            params: {
                userId: 'eaghayi',
                itemName: ""
            }
        });
        assert.equal(result2.data[0].id, 'null', 'check item name');
    });
});

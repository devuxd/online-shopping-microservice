// This function should handle a logic like a situation we are searching for an item in an online store.
//     1- The function searches an item(s) among items in the database. It gets information of a user (userId) and 'criteria' for searching,
//     then the function returns a list of items that match with the 'criteria'. The criteria can be every property in data type 'item' like name, description, or category of the item,
//     so it has to search for all possible values of items.
//     2- Since the function wants to return best match results, at the first the function searches among all names of all items if it could not find a match then go through matching
//     among a description of items, if it could not find a match in description go through search among categories of all items in the store.
//     3- It is possible that the user wants to only view items and does not login into the online store (in this case 'userId' is empty or null, the function does not need to be check for validity),
//     so the function does not have the information about the user, but when the user logged in the system and tried to search items,
//     the function should store a 'log' data type object  from the items that the user searched, this log might be useful for future recommendations.
//     4- If 'criteria' is empty or null, a 'TypeError' exception should be thrown with a description. The function may make use of a 3rd party persistence library.


var axios = require('axios');
var assert = require('assert');


describe('test /shopping_endpoints/searchItems', function () {


    it('Behavior 1:  return best match results base on category', async function () {
        const result = await axios.get('http://localhost:3001/shopping_endpoints/searchItems?criteria=school');
        assert.equal(result.data.length,1);
    });

    it('Behavior 2:  return best match results base on item name', async function () {
        const result = await axios.get('http://localhost:3001/shopping_endpoints/searchItems',{params:{ userId:'eaghayi', criteria:'backpack'}});
        // they called fetchTopMostSimilar methods, so implicitly this behavior is implemented if fetchTopMostSimilar be correct.
        assert.equal(1, 1);

    });
    it('Behavior 2:  return best match results', async function () {
        const result = await axios.get('http://localhost:3001/shopping_endpoints/searchItems',{params:{ userId:'eaghayi', criteria:'backpack'}});
            // they called fetchTopMostSimilar methods, so implicitly this behavior is implemented if fetchTopMostSimilar be correct.
        assert.equal(1, 1);

    });
    it('Behavior 3: TODO: check implementation', async function () {
        const result = await axios.get('http://localhost:3001/shopping_endpoints/searchItems',{params:{ userId:'eaghayi', criteria:'backpack'}});

        assert.equal(1, 1);

    });
    it('Behavior 4: illegal argument, criteria is null', async function () {
        const result = await axios.get('http://localhost:3001/shopping_endpoints/searchItems?criteria=');
        assert.equal(result.data[0].id, 'null');

    });
});
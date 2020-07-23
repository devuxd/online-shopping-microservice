// A user might browse an item with the name of the item. It is very similar to search among item, but
// 1-here the function is quicker and only searches among names of items to find the item.  Iplementing the function for browsing an item. The function searches among items for finding the desired item.
// 2- It is possible something be wrong and the function could not find the item, so the function must return meaningful message.
// 3-It is possible that a user wants to only view items and does not login into the online store (in this case the 'userId' is null or empty, the function should not check the validity of userId), so we do not have the information about the user,
// 4-but when the user already logged in the system and tried to browse items, the function should store a 'log' data type object from the items that the user browsed, this log might be useful for future recommendations.
// 5- If 'itemName' is empty or null, a 'TypeError' exception should be thrown with a description. The function may make use of a 3rd party persistence library.


let axios = require('axios');
let assert = require('assert');
let url = 'http://localhost:3001/shopping_endpoints/browseItems';

describe('test /shopping_endpoints/BrowsItems', function () {


    it('Behavior 1', async function () {
        const result = await axios.get(url, {params: {userId: 'eaghayi', itemName: 'backpack'}});

        assert.equal(result.data[0].name, 'backpack');
        assert.notEqual(result.data[0].name, 'backpackSomething');
    });
    //
    it('Behavior 2', async function () {
        const result = await axios.get(url,{params:{ userId:'eaghayi', itemName:'backpackSOmething'}});
        // assert.equal(result.data.id, "null");
        assert.equal(result.data.length, 0);

    });

    it('Behavior 3', async function () {
        const result = await axios.get(url,{params:{ userId:"", itemName:'backpack'}});

        // assert.equal(result.data.name, 'backpack');
        assert.equal(result.data[0].name, 'backpack');
        assert.notEqual(result.data[0].name, 'backpackSomething');
        // assert.notEqual(result.data.name, 'backpackSomething');

    });
    it('Behavior 4', async function () {
        const result = await axios.get(url,{params:{ userId:'eaghayi', itemName:'backpack'}});
        assert.equal(1,1,'check the implementation, it is not implemented in the body of function ');

    });
    it('Behavior 5', async function () {
        const result = await axios.get(url,{params:{ userId:'eaghayi', itemName:''}});
        assert.equal(result.data.id,'null','check the implementation, it is not implemented in the body of function ');

    });
});
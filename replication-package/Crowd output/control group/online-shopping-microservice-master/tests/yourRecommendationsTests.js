var express = require('express'); // (npm install --save express)
var axios = require('axios');
var assert = require('assert');


describe('test /service/yourRecommendations', function () {


    it('illegal argument', async function () {
        const result = await axios.get('http://localhost:3000/service/yourRecommendations', {params: {userId: ''}});
        assert.equal(result.data[0].id,'null');

    });
    it('return items correctly', async function () {
        const result = await axios.get('http://localhost:3000/service/yourRecommendations', {params: {userId: 'eaghayi'}});
        assert.equal(result.data[0].itemId,'2');
        assert.equal(result.data[0].userId,'eaghayi');
        assert.notEqual(result.data[0].userId, 'tlatoza');
        //assert.equal(result.data[0].userId, 'tlatoza');

    });





});
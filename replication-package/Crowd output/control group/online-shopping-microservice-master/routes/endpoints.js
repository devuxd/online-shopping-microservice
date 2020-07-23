var express = require('express');
var router = express.Router();
var service = require('../service/microservice');
var testEnvironment = true;

router.get('/', function (req, res, next) {
    res.send('List of endpoints: yourRecommendations ');
});

router.get('/yourRecommendations', async (req, res, next) => {

    try {

        const itemList = await service.yourRecommendations(req.query.userId);
        res.json(itemList);
    } catch (e) {
        //this will eventually be handled by your error handling middleware
        if (e instanceof TypeError || e.message == 'Illegal Argument Exception') {
            const nullObjects = [{
                name: 'null',
                description: 'null',
                id: 'null',
                status: 'null',
                groupId: 'null',
                price: 'null',
                seller: 'null',
                rate: 'null',
                reviews: {},

            }];
            res.send(nullObjects);
        } else {

            console.log('exception: ', e.message);
            next(e);
        }
    }

});

router.get('/searchItems', async (req, res, next) => {
//     the endpoint address is "/searchItems". The URL query parameters are: "userId" , "criteria"
    try {

        const itemList = await service.searchItems(req.query.userId, req.query.criteria);
        res.json(itemList);
    } catch (e) {
        if (e instanceof TypeError && e.message == 'No criteria provided!') {
            res.status(400);
            res.send(e.message);
        } else if (e instanceof TypeError && e.message == 'No items found in the DB') {
            res.status(400);
            res.send({});
        }
    }//end try catch

});

router.get('/browseItems', async (req, res, next) => {
    // the endpoint address is "/browseItems", the URL query parameters are: "userId" , "itemName"    try {
    try {
        const item = await service.browseItems(req.query.userId, req.query.itemName);
        if(item){
            res.json(item);

        }else {
            res.send("The item was not found!);
        }
    } catch
        (e) {
        if (e instanceof TypeError && e.message == 'No item name provided!') {
            res.status(400);
            res.send(e.message);
        } else if (e instanceof TypeError && e.message == 'No items found in the DB') {
            res.status(400);
            res.send({});
        }
    }//end try catch

});

router.get('/purchasesHistories', async (req, res, next) => {
//    The endpoint address should be "/purchasesHistories". URL query parameter: "userId"
    try {
        const logList = await service.purchasesHistories(req.query.userId);
        res.json(logList);
    } catch (e) {
        if (e instanceof TypeError || e.message == 'Illegal Argument Exception') {
            res.status(400);
            res.send(e.message);
        }

    }//end try catch
});

router.get('/recentlyViewedItems', async (req, res, next) => {
//    The endpoint address should be "/recentlyViewedItems". URL query parameter: "userId"
    try {
        const logList = await service.recentlyViewedItems(req.query.userId);
        res.json(logList);
    } catch (e) {
        if (e instanceof TypeError || e.message == 'Illegal Argument Exception') {
            res.status(400);
            res.send(e.message);
        }

    }//end try catch
});

module.exports = router;

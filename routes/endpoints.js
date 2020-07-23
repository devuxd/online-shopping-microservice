
var express = require('express');
var router = express.Router();
var service = require('../service/microservice');
var testEnvironment = true;

router.get('/', function(req, res, next) {
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

router.get('/searchItem', async (req, res, next) => {
    try {
        const {userId, criteria} = req.query
        if (!criteria) res.status(400).send('Bad request parameters. Criteria is required')

        if (userId){
            await service.logUserAction(userId, "searched_items")
        }
        const searchItemsList = await service.searchItemsByCriterias(criteria)

        return res.json(searchItemsList)
    } catch (error) {
        console.log("error in searching items ", error.message)
        res.send(error.message)
    }
})

router.get('/browseItems', async (req, res, next) => {
    try {
        const { userId, itemName } = req.query
        if (!itemName) res.status(400).send('Bad request parameters. itemName is required')

        if (userId) {
            await service.logUserAction(userId, "browsed_items")
        }
        const searchItemsList = await service.searchItemsByName(itemName)

        return res.json(searchItemsList)
    } catch (error) {
        console.log("error in browsing items ", error.message)
        res.send(error.message)
    }
})


router.get('/fetchShoppingCart', async (req, res, next) => {
    try {
        const {userId} = req.query

        if (!userId) return res.status(400).send('Bad request parameters. userId is required')
        await service.logUserAction(userId, "viewed_cart")
        const shoppingCart = await service.fetchShoppingCart(userId) 
        return res.json(shoppingCart)
    } catch(error) {
        console.log("error in fetching shooping cart", error.message)
        res.send(error.message)
    }
})

router.get('fetchTopMostSimilarItems', async (req, res, next) => {
    try {
        const {userId, itemName } = req.query
        if(!itemName) return res.status(400).send('Bad request parameters. userId is required')
        if(userId) await service.logUserAction(userId, "similar_items")

        const similarItems   = await service.fetchSimilarItems(userId, itemName)
        return res.json(similarItems)

    } catch(error) {
        console.log("error in fetching similar items", error.message)
        res.send(error.message)
    }
})

module.exports = router;

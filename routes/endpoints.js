
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



module.exports = router;


var express = require('express');
var router = express.Router();
var service = require('../service/microservice');
var testEnvironment = true;
router.post('/addTodo', function (req, res) {
    res.send(service.addTodo(req.body.todo));
});

router.get('/browseItems', async (req, res, next) => {

    try {

        const itemList = await service.browseItems(req.query.userInfo,req.query.itemName);
        res.json(itemList);
    } catch (e) {
        //this will eventually be handled by your error handling middleware
        if (e instanceof TypeError || e.message == 'Illegal Argument Exception') {
            const nullItems = [{
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
            res.send(nullItems);
        } else {

            console.log('exception: ', e.message);
            next(e);
        }
    }

    // res.send(service.addTodo(req.body.todo));
});



module.exports = router;

// var express = require('express');
// var router = express.Router();

var firebaseUtil = require('../util/firebaseUtil');
var testEnvironment = true;

function FetchObjectImplementation(objectId) {

    if (testEnvironment) {

        if (objectId == 234) {
            const todo = {
                title: 'commit code',
                description: 'be sure to commit unit tests',
                dueDate: '02-25-2018',
                dataStoreId: "schoolworkds",
                userId: 'eaghayi',
                id: '234',
                status: 'in-progress',
                groupId: 'work',
                createdTime: '1:30pm',
                createdDate: '02/25/2018',
                priority: 1,
                address: '',
                repeat: ''
            };


            return todo;
        }
        else {
            //var resp;
            // Promise.resolve(null).then(function(value) {
            //     console.log(value); // "Success"
            //     resp= value;
            // });
            return null;

        }

    } else {

        const todo = firebaseUtil.fetchObjectDao(objectId);
        if (todo === undefined || todo === {}) {
            return null;
        } else return todo;
    }
}

function FetchAllObjectsImplementation(userId, res) {
    if (testEnvironment) {
        if (userId === 'eaghayi') {
            const todoList = [{
                title: 'commit code',
                description: 'be sure to commit unit tests',
                dueDate: '02/25/2018',
                dataStoreId: "schoolworkds",
                userId: 'eaghayi',
                id: '1',
                status: 1,
                groupId: 'school',
                createdTime: '1:30pm',
                createdDate: '02/25/2018',
                priority: 3,
                address: '',
                repeat: ''
            }, {
                title: 'push code',
                description: 'be sure to push unit tests',
                dueDate: '02/25/2018',
                dataStoreId: "schoolworkds",
                userId: 'eaghayi',
                id: '2',
                status: 2,
                groupId: 'school',
                createdTime: '1:30pm',
                createdDate: '02/25/2018',
                priority: 3,
                address: '',
                repeat: ''
            }];


            return todoList;
        } else {
            return [];
        }

    } else {
        const listOFTodos = firebaseUtil.fetchAllTodosDAO("emadaghayi").on('value', function (snapshot) {
            res.send(snapshot.val());
        });

        return listOFTodos;
    }
}

// function SaveObject(todo) {


async function SaveObjectImplementation(todo) {
    if (testEnvironment) {

        return todo;
    } else {
        await  firebaseUtil.saveObjectDAO(todo.title, todo.description, todo.dueDate, todo.dataStoreId, todo.userId, todo.id,
            todo.status, todo.groupId, todo.priority, todo.address, todo.repeat);
        return "Saved";
    }
}

async function UpdateObjectImplementation(todo) {
    if (testEnvironment) {

        return todo;
    } else {
        await firebaseUtil.updateObjectDAO(todo);
        return "updated";
    }
}

async function DeleteObjectImplementation(todo) {
    if (testEnvironment) {

        return todo;
    } else {
        const firebasePromise = await firebaseUtil.deleteObjectDao(todo.id);

        var result = await  firebasePromise;

        return result;
    }
}




function browseItems(userInfo,itemName) {
    if (!userInfo || !itemName) {
        throw new TypeError('Illegal Argument Exception');
    }

    var _todo = FetchObjectImplementation(id);

    if (_todo == null)
        return null;
    else
        return _todo;

}



module.exports = {
    addTodo: addTodo,
    updateTodo: updateTodo,
    deleteTodo: deleteTodo,
    SaveObjectImplementation: SaveObjectImplementation,
    UpdateObjectImplementation: UpdateObjectImplementation,
    fetchTodo: fetchTodo,
    FetchObjectImplementation: FetchObjectImplementation,

    DeleteObjectImplementation: DeleteObjectImplementation,
    fetchAllTodos: fetchAllTodos,
    fetchAllTodosFromDB: fetchAllTodosFromDB,
    FetchAllObjectsImplementation: FetchAllObjectsImplementation,
    createGroup: createGroup,
    getAllTodoOfaGroup: getAllTodoOfaGroup,
    updatePriorityOfaTodo: updatePriorityOfaTodo,
    fetchTodosBasedOnStatus: fetchTodosBasedOnStatus,
    markTodoAsDone: markTodoAsDone,
    remindOnDueDate: remindOnDueDate,
    markTodoAsArchived: markTodoAsArchived,
    checkDateFormat: checkDateFormat
};


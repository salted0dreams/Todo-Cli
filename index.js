const mongoose = require("mongoose");
const colors = require("colors");
const db = mongoose.connect("mongodb://localhost:27017/todos", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// import the model
const Todo = require("./models/todo");

// List all todos
const listTodos = () => {
    Todo.find().then((todos) => {
        if (todos.length == 0) {
            console.info("No Todos Found".red);
            // db.close();
        } else {
            todos.forEach((todo) => {
                if (todo.status) {
                    console.info(
                        `Title: ${todo.title.green.bold}\nDescription: ${todo.description.yellow.bold}\nId: ${todo._id.bold} `
                    );
                    // db.close();
                } else {
                    console.info(
                        `Title: ${todo.title.red.bold}\nDescription: ${todo.description.yellow.bold}\nId: ${todo._id.bold}`
                    );
                    // db.close();
                }
            });
        }
    });
};

// Find a todo
const findTodo = (title) => {
    const search = new RegExp(title, "i");
    Todo.find({ $or: [{ title: search }] }).then((todo) => {
        if (todo.status) {
            console.info("Todo Found".green.bold);
            console.log(
                `Title: ${todo.title.green.bold} Description: ${todo.description.yellow.bold} Status: ${todo.status.bold}`
            );
        }
    });
};

// add a todo
const addTodo = (todo) => {
    Todo.create(todo).then((todo) => {
        console.info("New Todo Added".green.bold);
        // db.close();
    });
};

// update a todo
const updateTodo = (_id, todo) => {
    Todo.updateOne({ _id }, todo).then((todo) => {
        console.info("Todo Updated".green.bold);
        // db.close();
    });
};

// remove a todo
const removeTodo = (_id) => {
    Todo.findByIdAndDelete({ _id }).then((todo) => {
        console.info("Todo Removed".red.bold);
        // db.close();
    });
};

const markDone = (_id) => {
    Todo.findById({ _id }).then((todo) => {
        todo.status = true;
        todo.save();
        console.info("Todo Marked Done".green.bold);
        // db.close();
    });
};


module.exports = {
    addTodo,
    findTodo,
    updateTodo,
    removeTodo,
    listTodos,
    markDone
};

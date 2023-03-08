#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
const { addTodo, findTodo, updateTodo, removeTodo, listTodos, markDone } = require('./index');
const prompt = inquirer.createPromptModule();

// Todo Questions
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Todo Title'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Todo Description'
    },
    {
        type: 'input',
        name: 'status',
        message: 'Todo Status'
    }
];

program
    .version('1.0.0')
    .description('Todo Management System')

// Add Command
program
    .command('add')
    .alias('a')
    .description('Add a todo')
    .action(() => {
        prompt(questions).then(answers => addTodo(answers));
    });

// Find Command
program
    .command('find <title>')
    .alias('f')
    .description('Find a todo')
    .action(title => findTodo(title));

// Update Command
program
    .command('update <_id>')
    .alias('u')
    .description('Update a todo')
    .action(_id => {
        prompt(questions).then(answers => updateTodo(_id, answers));
    });

program
    .command('done <_id>')
    .alias('d')
    .description('Mark a todo as done')
    .action(_id => markDone(_id));

// Remove Command
program
    .command('remove <_id>')
    .alias('r')
    .description('Remove a todo')
    .action(_id => removeTodo(_id));

// List Command
program
    .command('list')
    .alias('l')
    .description('List all todos')
    .action(() => listTodos());

program.parse(process.argv);

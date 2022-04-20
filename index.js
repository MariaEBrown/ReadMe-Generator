const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const questions = () =>
    inquirer.prompt([
        {
            type: "input",
            name: "author",
            message: "What is the author's name?"
        },
        {
            type: "input",
            name: "username",
            message: "what is your GitHub username?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address"
        },
        {
            type: "input",
            name: "title",
            message: "What is your project title?"
        },
        {
            type: "input",
            name: "description",
            message: "Please write a brief description of your project:"
        },
        {
            type: "list",
            name: "license",
            message: "What kind of license should your project have?",
            choices: [ "MIT","APACHE 2.0","GPL 3.0", "BSD 3", "None"]


        },
        {
            type: "input",
            name: "contribute",
            message: "What does the user need to know about contributing to the repo?"
        },

    ]);

    function generateMD(data){

    return`# ${data.title}
${data.badge}
${data.description}
${data.author}
## Table of Contents:
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
### Installation:
In order to install the necessary dependencies, open the consoleand run the following:
 \`\`\`${data.installations}\`\`\`
### Usage:
${data.usage}
### License:
This project is licensed under:
${data.license}
### Contributing:
${data.contribute}
### Questions:
If you have any questions contact me on [Github](https://github.com/${data.username})`

}

    questions()
    .then((data) => writeFileAsync('generateREADME.md',
    generateMD(data)))
        .then(() => console.log('Sucessfully wrote to README.md'))
        .catch((err) => console.error(err));


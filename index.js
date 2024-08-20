import inquirer from 'inquirer';
import fs from 'fs';

// Create an array of questions for user input
const questions = [
    {
        name: 'appName',
        message: 'What is the name of your application?',
        type: 'input'
    },
    {
        name: 'appDescription',
        message: 'What is the description of your application?',
        type: 'input'
    },
    {
        name: 'appInstallationInstructions',
        message: 'Provide installation instructions for your application:',
        type: 'input'
    },
    {
        name: 'appUsage',
        message: 'Provide instructions and examples for using the application:',
        type: 'input'
    },
    {
        name: 'appLicense',
        message: 'Choose a license:',
        type: 'list',
        choices: [
            'MIT',
            'Apache 2.0',
            'GPL 3.0',
            'BSD 3-Clause',
            'None'
        ]
    },
        {
            name: 'appContributing',
            message: 'Who has contribruted to the creation of this app?',
            type: 'input'
        },
        {
            name: 'appTests',
            message: 'What tests are required? If so what are they?',
            type: 'input'
        },
        {
            name: 'github',
            message: 'What is the name of your github account?',
            type: 'input'
        },
        {
            name: 'email',
            message: 'What is your email address?',
            type: 'input'
        },
];

// Map license choices to badge URLs
const licenseBadges = {
    'MIT': '![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)',
    'Apache 2.0': '![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)',
    'GPL 3.0': '![License: GPL 3.0](https://img.shields.io/badge/License-GPL%20v3-blue.svg)',
    'BSD 3-Clause': '![License: BSD 3-Clause](https://img.shields.io/badge/License-BSD%203--Clause-orange.svg)',
    'None': ''
};

// Function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('README file has been generated!');
        }
    });
}

// Function to initialize app
async function init() {
    try {
        const answers = await inquirer.prompt(questions);

        // Determine the license badge based on user choice
        const licenseBadge = licenseBadges[answers.appLicense] || '';

        // Construct README content
        const readmeContent = `
${licenseBadge}

# ${answers.appName}

## Description
Provide a brief description of your application.

## Installation
${answers.appInstallationInstructions}

## Usage
${answers.appUsage}

## License
This project is licensed under the ${answers.appLicense} license.

## Contributing
${answers.appContributing} have all contributed to this project.

## Testing
${answers.appTests}

## Questions
Here is a link to my github account: [${answers.github}](https://github.com/${answers.github})
You can also contact me at ${answers.email}.

`;

        // Write content to README file
        writeToFile('README.md', readmeContent);
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

// Function call to initialize app
init();
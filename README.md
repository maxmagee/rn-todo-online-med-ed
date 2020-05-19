# ToDo Challenge Submission For OnlineMedEd

This is my submission for the React Native Software Engineer challenge for [OnlineMedEd](https://onlinemeded.org).

## Requirement Definitions
- Users should be able to perform CRUD operations on task items.
- Users should be able mark a task item as complete.
- Users should be able to view a list of task items.
- Each task item should have the following properties associated with it:
  - Name
  - Description
  - Target Completion Date
  - Completion Date

## Development Environment Setup
  - Install Node.js using your preferred method.
  - Install the Expo CLI globally
    -  `npm install -g expo-cli`
 -  (Optional) Configure VSCode ESLint and Prettier
    -  Install the ESLint VSCode extension.
    -  Install the Prettier - Code formatter extension.
    -  Update your VSCode User Settings to match the settings found in [my gist](https://gist.github.com/maxmagee/4ad6f079b1aa1c61608cb81c6263a1e4).
 -  Within the repository, run the following commands in Terminal:
    -  `npm install`
    -  `npm start`
    -  It will eventually prompt you to run on a device or simulator. Type `i` and press `enter`.
       -  This will launch an iPhone simulator (provided you're using a Mac).
       -  This application was originally optimized for an iPhone 11 Pro.
          -  Ideally other device sizes and Android will be supported when you're executing this.
    -  You should be able to make changes and save to see them appear.

## Tech Stack Used
  - [React Native](https://reactnative.dev) - Write in JavaScript and render in native code. Powered by React.
  - [Expo](https://expo.io) - Tools and libraries used to hasten React Native development.
  - [React Navigation v4](https://reactnavigation.org/docs/4.x/getting-started) - Library to assist with app-like navigation.
  - [Firebase](https://console.firebase.google.com) - NoSQL cloud real-time database used to sync JSON data.
  - [Redux](https://redux.js.org) - A library to handle application state.
  - [ESLint](https://eslint.org) - Tool to automatically find and fix errors in JavaScript code.
  - [Prettier](https://prettier.io) - Automatic code-formatting to maintain consistent style across the codebase.
  

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

## My Functionality
- Sort tasks by date or priority 
- Create tasks with an optional description and priority.
- Complete tasks.
- Edit active tasks.
- Delete active tasks.
- Reactivate completed tasks.

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
    -  You should be able to make changes and save to see them appear.

## Tech Stack Used
  - [React Native](https://reactnative.dev) - Write in JavaScript and render in native code. Powered by React.
  - [Expo](https://expo.io) - Tools and libraries used to hasten React Native development.
  - [Redux](https://redux.js.org) - A library to handle application state.
  - [React Navigation v4](https://reactnavigation.org/docs/4.x/getting-started) - Library to assist with app-like navigation.
  - [React Hook Form](https://react-hook-form.com) - A library to more easily manage forms.
  - [ESLint](https://eslint.org) - Tool to automatically find and fix errors in JavaScript code.
  - [Prettier](https://prettier.io) - Automatic code-formatting to maintain consistent style across the codebase.
  
## Notes
This application was developed targeting the iPhone 11 Pro form factor. I also verified the appearance and functionality on an iPhone SE simulator.

Given more time I would have begun to work on the following:
- Add unit tests.
- Add some animation to task items when completing or reactivating them.
- Android support.
  - I am aware there are difference in platform capabilities and design philosophy. A developer can use `Platform.OS` to determine the operating system for example.
  - Given the time constraints, I chose to focus on features rather than cross-platform deployment.
- Local Data Persistance
- Firebase Integration For Cloud Database
  - I have a personal project where I demonstrate how I've approached that in the past here: [rn-shop](https://github.com/maxmagee/rn-shop).

This application uses the newer 'hook-based' functional component approach, but I've also made an application with 'class-based' components. A good example would be my partial re-creation of the Chick-fil-A app, [chicken](https://github.com/maxmagee/chicken)

Thank you for your time and consideration for the position. I'm eager to move forward in the process.
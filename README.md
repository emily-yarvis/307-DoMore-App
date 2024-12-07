# 307-DoMore-App

### What is DoMore? ###

The DoMore app is a to-do app made by students for students. This app aims to provide you with organizational tools that allow you to have all of your tasks in one place. They can have both their daily todos, like chores and shopping, and have all of their assignments or work tasks. Users are able to organize tasks by sections, tags, and due dates. This allows users to organize their tasks as efficiently as possible. 

Link to our App: https://thankful-stone-03264d61e.5.azurestaticapps.net/

Current Functionality Implemented: You can add categories and add lists and add tasks (after selecting a list) however delete functionality is currently broken.
### Important Notes ###

We were unfortunately unable to restore our delete functionality. All of our other intended functions should work (creating tasks, lists, categories, etc.). Additionally, tags exist in the backend but will not be on the frontend, this is intentional as we did not have enough time to implement the organization that we had planned to use the tags for.

## Before Contributing: ##
The code should follow the Prettier JavaScript style conventions. In order to ensure all contributors follow the style guidelines, it is important to follow the steps below before contributing. 

>[!NOTE]
>The steps below were written with Visual Studio Code in mind, the steps may varry for other IDEs

1. Install the following plugins to your IDE to ensure the code guidelines are followed:
   1. Prettier
   2. Prettier ESLint
  
2. Setup format on save by following these steps. You can access the original help article here: https://blog.yogeshchavan.dev/automatically-format-code-on-file-save-in-visual-studio-code-using-prettier
   1. Press `Control + Shift + P` (Windows) or `Command + Shift + P` (Mac) to open the command palette and
   2. type `setting`
   3. select `Preferences: Open User Settings` 
   4. Search for `format on save` and check the checkbox to enable
3. In the root of your repo, run:

    `npm install --save-dev --save-exact-prettier`
4. In `307-DoMore-App/packages/react-frontend` run:

   `npm install vite`
5. In `307-DoMore-App/packages/express-backend` run:

   `npm install express`

   `npm install mongoose`

**You are now ready to contribute to the DoMore app!**

## Diagrams and more! ##
### UI Prototypes ###

Our complete prototype can be found on Figma here: https://www.figma.com/design/XkSwBRTfl32DkecdycqiK6/DoMore--?node-id=31-2167&node-type=frame

Here are a few prototypes from Figma:

<img src="https://github.com/user-attachments/assets/a9171c7e-1ae4-4544-aba1-6d1e9481c03c" alt="Main page" width="500"/>
<img src="https://github.com/user-attachments/assets/276bd41b-2edf-4c07-b6a1-146553b6e80a" alt="Create new task popup" width="500"/>

### Sequence Diagram ###
![IMG_0507](https://github.com/user-attachments/assets/f9383d1b-fea3-46f0-a40c-85918a1e235f)

### UML Diagrams ###
You can find our UML diagrams [here](UML.md)

## Contributors: ##
1. Rishabh Jhamnani
2. Emily Yarvis
3. Shona Cain
4. Rianna Lei



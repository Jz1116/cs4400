# GT Covid19 Testing Application
## Install Guide (Include instructions to setup the app and run the app)
### Pre-requisites:
There is no required configuration of software and hardware that the customer must have before the installation process.

### Dependent libraries that must be installed:
Install node:\
In order to enable the software to function, node shall be installed. 
1. Navigate to this link, https://nodejs.org/en/download/, and the screen would show different installer types for LTS Version (LTS Version should be sufficient)
    1. If you are a Windows user, click **Windows Installer**
    2. If you are a Mac user, click **macOS Installer**
2. As the download of the installer completes, click the installer package and follow the instruction
    1. During the process, you must agree to the terms of the software license agreement
    2. You need to select a destination to install the software
        1. For Mac users, the default Macintosh HD would be sufficient
    3. After the installation completes, you can move the Node.js installer to the Trash
3. Node.js installation completes.

### Download instructions:
We would give our Github repo to our client, so they can get access to the project. 
1. In order to download the project to their local laptop/desktop, they need to navigate to the Github repo, https://github.com/Jz1116/cs4400. 
2. There is a green download button with the text displaying “Code”. Click the button, and it would appear a dropdown with three download methods: Clone, Open with Github Desktop, Download ZIP
3. Select your preferred download method to download the project on your computer

### Installation of actual application
In order to let the actual application work, the dependencies for the frontend shall be installed.
1. Open the terminal on your computer
2. Navigate to the client folder of the project in your terminal
3. Type `npm install` in the terminal to install the dependencies
4. After that, type `npm run-script build` to build the frontend
5. Frontend installation completes

Then, the dependencies for the backend shall be installed
1. Open the terminal on your computer
2. Navigate to the server folder of the project in your terminal
3. Type `npm install` in the terminal to install the dependencies

The server also needs a .env file. Since this file contains private information for connecting to the sql database in mysql workbench (such as username, password, port number, etc), it is not included in the Github repo. The client can contact us through email to get the file, and he/she should put the .env file **under the server folder**.

### Run instructions:
After completing all the above instructions, he/she can type `npm start` in the terminal under the server folder.

### Brief Description
In the project, we make a responsive web application with React on the frontend and Node.js on the backend. We connect the backend with the database within MySQL Workbench in our local desktop, so that we are able to use the stored procedures that we have already implemented in phase 3. 

### Work Distribution
ChengShuang Yue works on the frontend design of the web pages. Yihua Xu and Zirui Wang work on implementing the basic logic for various functionalities. Zhen Jiang works on implementing the frontend web pages, set up the backend routing logic, and connect frontend and backend. 

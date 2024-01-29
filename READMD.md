## Building The App For Production

At first, you have to install mongodb on your server or local machine
 ### `sudo apt install mongodb`
    Or you can use docker (visit docker site).

Then, you have to install nodejs and npm on your server or local machine
 ### `sudo apt install node`
 ### `sudo apt install npm`
    Or you can use docker (visit docker site).

also you have to install this package
 ### `sudo npm i nodemon -g`   
 ### `sudo npm i cross-env -g`   

 ### Creating a `.env` file
    After the installation of dependencies completed successfully, you must copy the content of `.env.example` file into a new file and name it `.env` (`cp .env.example .env`).\
    After that, you have to do some editings depending on your needs.
    1. First line is the full API base URL. You have to specify whether it is in `http` or `https`.
    2. Second line is API base URL without protocol (it must be the same as first line, but remove the `http://` or `https://`).
    3. Third line is the URL to match engine. **Do not** change it unless the URL of match engine has changed (**do not specify the protocol**).
    4. Do not change the 4th and 5th lines.
    5. The 6th and 7th lines are for body background color of website in dark mode and light mode respectively. Change them as you want.
    6. The 8th and 9th lines are for title and meta tag of website respectively. Change them as you want.
    

## Available Scripts
In the project directory, you can run:

### `npm start`
Build app and run it in production mode

### `npm run dev`
Run app in development mode
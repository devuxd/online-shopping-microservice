# online-shopping-microservice
This project is a Backend that contains REST APIs for handling basic logic of prototype of online store like Amazon. 
## How to contribute
clone the repository, edit and push the repository. The list to tasks (open issues) are avialbe in Issues tab, please fix them. 
Please be very clear on your commit messages.
## Project structure
This reposirotory provides a list of HTTP request for consumers. 
1. HTTP requests are implemented in "endpoints.js" file.
2. Logic are implemented in "microsrvice.js" file.
3. Tests are plased under directory "tests".
4. "FirebaseWrapper.js" is an interface for Firebase to create, read, update, delete objects. Each types of objects are stored in a specific path. for example: an item are stored under path "items", logs object are stored under path "logs".


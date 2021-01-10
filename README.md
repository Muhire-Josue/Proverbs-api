### API BASE URL

##### Local: http://localhost:3000

### Requirements

- `Nodejs v10-13` - a JavaScript run-time environment that executes JavaScript code outside of a browser
- `POSTGRES` - a database management system for data persistence
- `.env.example` - contains all the variable environment for this project

### SETUP

First clone it to your machine:

```
https://github.com/Muhire-Josue/Proverbs-api.git
```

```
Create a file called .env, copy all environment variables from .ENV.EXAMPLE and fill in their respective values (this will allow you to connect to the database among other things)
```

Open it using your favorite IDE,
I used ([vs code](https://code.visualstudio.com/download))

Install all necessary node modules

```
npm install
```

Create a database

```
npm run create-db
```

Run the migrations (to map the models to the database relations)

```
npm run migrations
```

To start the app

```
npm run dev
```

To run tests

```
npm test
```

### API ENDPOINTS

| API                                  | Methods | Description                |
| ------------------------------------ | ------- | -------------------------- |
| `/`                                  | GET     | Welcome message            |
| `/user`                              | POST    | Choose a name              |
| `/proverb/add`                       | POST    | Post a proverb             |
| `/proverb/edit/:proverbId`           | PUT     | Edit a proverb             |
| `/proverbs`                          | GET     | Get all proverbs           |
| `/proverbs/mine`                     | GET     | Get all your proverbs      |
| `/proverbs/:postedBy`                | GET     | Get all proverbs of a user |
| `/proverb/:proverId`                 | GET     | Get a proverb by id        |
| `/proverb/:proverId`                 | DELETE  | Delete a proverb           |
| `/proverb/like`                      | POST    | like and unlike a proverb  |
| `/proverb/comment`                   | GET     | Comment a proverb          |
| `/proverb/comment/edit`              | PUT     | Edit a comment             |
| `/proverb/comment/delete/:commentId` | DELETE  | Delete a comment           |

### How can it be manually tested

- using [postman](https://www.getpostman.com/downloads/)

### Technologies used

- `YARN` - a package manager for the JavaScript programming language
- `Git` - version-control system for tracking changes in source code during software development

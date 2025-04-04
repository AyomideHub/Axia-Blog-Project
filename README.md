## Blog Platform (handles the backend flow for blog application)##

**Description:**

Develop a blogging platform where users can write, edit, and delete blog posts. 
Other users can read and comment on blog posts. 
Implement user roles, such as admins and regular users.

**Features:**

User registration and login
CRUD operations for blog posts
Comment system for blog posts
User roles and permissions

## LOCAL SETUP ##
1. To run this project create a .env file and set the following variables
```
MONGO_URI=
JWT_SECRET=
COOKIES_SECRET=

```

2. Run the command below in the terminal to install the dependenies 
```
npm install

```

3. Run the command below in the terminal to start the server
```
npm run dev

```

## End Point ##
1. Register
```
POST /api/v1/auth/register

```
```json
{
    "fullname": " ",
    "email": " ",
    "password": " "
   
}
```

2. Login
```
POST /api/v1/auth/login

```
```json
{
    "email": " ",
    "password": " "
   
}
```

3. Logout
```
POST /api/v1/auth/login

```

4. Create posts
```
POST /api/v1/posts

```

```json
{
    "title": " ",
    "content": " ",
    "Category": " "
   
}
```

5. Get A posts
```
GET /api/v1/posts/:id

```
6. Update A posts
```
PATCH /api/v1/posts/:id

```
7. Delete A posts
```
DELETE /api/v1/posts/:id

```
8. Get All posts
```
GET /api/v1/posts

```
9. Queries
```
GET /api/v1/tasks?

title,
category,
sort - Category, createdAt
order - asc, dsc
page,
limit,

```

10. create a comment 
```
POST /api/v1/comments

```
```json
{
    "content": " ",
    "postId": " ",
    "parentCommentId": " " // Or empty if it has no parent comment 
}

```

11. get a single comment
```
GET /api/v1/comments/:id

```

12. delete a comment 
```
DELETE /api/v1/comments/:id

```
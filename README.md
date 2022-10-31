# Blog App
This is an api for a blog app

## Requirements
##### 1 User should be able to registe
##### 2 User should be able Login
##### 3 User authentication using JWT
##### 4 User should be able to create blop post
##### 5 User should be able to get all blog post
##### 6 User should be able to get a post by id
##### 7 User should be able to update the state of a post
##### 8 User should be able update the body of a post
##### 9 User should be able to get all their post
##### 10 User should be able to delete their blog post
##
## Setup

* Install Nodejs, mongoDB
* Pull this repo
* Update env with .env
* run ``` npm run start:dev ```

# Base URL


# Models
## User
Fields | data Type | constraints
---| --- | --- |
id | ObjectId | required
first_name | String | required
last_name | String | required
email | String | required
password | String | required

## Blog Post
Fields | data Type | constraints
---| --- | --- |
title | String | required
description | String | required
tags | String | required
author | ObjectId | required
state | String | required, enum ["draft", "published"]
read_count | Number | required
reading_time | Number | required
body | String | required
timestamps | dateTime | required

## APIs

### SignUp User
* Route:  /user/signup
* Method: POST
* Body: 
```
{
  "first_name": "bill",
  "last_name": "harry"
}
```

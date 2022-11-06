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
* run ``` npm run start:dev ``` for development
* run ```npm run start:prod``` for production

# Base URL


***


# Models
***

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
  "last_name": "harry",
  "email": "billharry@gmail.com",
  "password": "123456789"
}
```
* Responses

Success
```
{
	"status": true,
	"newUser": {
		"first_name": "bill",
		"last_name": "harry",
		"email": "billharry@gmail.com",
		"password": "$2b$10$xlLjHDlADIMV7cCrAS0O7uH2tkoVPKAaih39kKWzEnzyA6YhhovtK",
		"_id": "635edf28d6d8fd8348343ce6",
		"__v": 0
	}
}
```

***

### Login User
* Route: /user/login
* Method: POST
* Body: 

```
{
  "email": "billharry@gmail.com",
  "password": "123456789"
}
```
* Responses

Success
```
{
	"status": true,
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNWVkZjI4ZDZkOGZkODM0ODM0M2NlNiIsImlhdCI6MTY2NzI0MDMzMiwiZXhwIjoxNjY3Mjc2MzMyfQ.ZbSNObnUxADiNQlqHetE_rmGW-qPl-8nzGLmYy_ysL0"
}
```

***

### Create Blog Post
* Route: /post
* Method: POST
* Header
    * Authorizaton: Bearer ${token}
* Body:

```
{
  "title": "Life of peace",
  "description": "don't even know how to go about exams",
  "tags": "fufilment, joy healing, enjoyment",
  "body": "I finally went to seychelles hurray!!!! "
}
```

* Response

Success
```
{
	"status": true,
	"newPost": {
		"title": "life of peace",
		"description": "don't even know how to go about exams",
		"tags": [
			"fufilment",
			"joy",
			"healing",
			"enjoyment"
		],
		"author": "635edf28d6d8fd8348343ce6",
		"state": "draft",
		"read_count": 0,
		"body": "I finally went to seychelles hurray!!!! I am using my week break from work to spoil myself me and my homies you wont even believe it..... Full gist loading the world aroun us id shete fjeud dhdidxdhjdu dhdhd s sd dj djd jd jd d dele dyeke d fjd jd jedmndnjd gdtrewhskj ddhd djdd dh dhd hd hd fhf jg gjg gjg fjd dhd dhg gj fhd ddj ggd gk gjg k d fd h dhfbfdhf hg fhf hg",
		"_id": "63601724db705f507919c201",
		"createdAt": "2022-10-31T18:42:44.070Z",
		"updatedAt": "2022-10-31T18:42:44.070Z",
		"reading_time": 1,
		"__v": 0
	}
}
```

***

### Update Post State
* Route: /post/state/:id
* Method: PATCH
* Header
    * Authorizaton: Bearer ${token}
* Body:

```
{
  "state": "published"
}
```
* Response

Success

```
{
	"status": true,
	"post": {
		"_id": "635f06b584c3c0513e8cb392",
		"title": "sweet life",
		"description": "don't even know how to go about exams",
		"tags": [
			"fufilment",
			"joy"
		],
		"author": {
			"first_name": "bill"
		},
		"state": "published",
		"read_count": 0,
		"body": "I finally went to seychelles hurray!!!! I am using my week break from work to spoil myself me and my homies you wont even believe it..... Full gist loading",
		"createdAt": "2022-10-30T23:20:21.251Z",
		"updatedAt": "2022-10-31T21:33:17.132Z",
		"reading_time": 1,
		"__v": 0
	}
}

```

***

### Update Post
* Route: /post/:id
* Method: PATCH
* Header
    * Authorizaton: Bearer ${token}
* Body:

```
{
  "body": "AltSchool africa is the best in africa"
  "title": "tech life",
  "description": "don't even know how to go about exams",
  "tags": "fufilment"
}
```

* Response

Success
```
{
	"status": true,
	"post": {
		"_id": "635edf89d6d8fd8348343cf0",
		"title": "tech life",
		"description": "don't even know how to go about exams",
		"tags": [
			"fufilment"
		],
		"author": {
			"first_name": "bill"
		},
		"state": "published",
		"read_count": 0,
		"body": "AltSchool africa is the best in africa",
		"createdAt": "2022-10-30T20:33:13.165Z",
		"updatedAt": "2022-10-31T18:40:27.300Z",
		"reading_time": 1,
		"__v": 0
	}
}
```

***

### Get Post By Id
* Route: /post/:id
* Method: GET
* Response

Success
```
{
	"status": true,
	"post": {
		"_id": "635e803007526ad682ef2063",
		"title": "business thoughts",
		"description": "thinking of starting a cloth busines",
		"tags": [
			"business"
		],
		"author": {
			"_id": "635e787cb8bf0baa21185cbd",
			"first_name": "Oge",
			"last_name": "Amadi",
			"email": "ogeamadi@gmail.com"
		},
		"state": "published",
		"read_count": 8,
		"body": "I finally went to seychelles hurray!!!! I am using my week break from work to spoil myself me and my homies you wont even believe it..... Full gist loading",
		"createdAt": "2022-10-30T13:46:24.848Z",
		"updatedAt": "2022-10-31T21:46:55.273Z",
		"reading_time": 1
	}
}
```


*** 

### Get Posts By User
* Route: /post/me
* Method: GET
* Header
    * Authorizaton: Bearer ${token}
* Query Params
    * page default(1)
    * limit default(10)
    * state
* Response

```
  {
	"status": true,
	"numberOfPost": 6,
	"page": 1,
	"posts": [
		{
			"_id": "635f06b584c3c0513e8cb392",
			"title": "sweet life",
			"description": "don't even know how to go about exams",
			"tags": [
				"fufilment",
				"joy"
			],
			"author": "635edf28d6d8fd8348343ce6",
			"state": "published",
			"read_count": 0,
			"body": "I finally went to seychelles hurray!!!! I am using my week break from work to spoil myself me and my homies you wont even believe it..... Full gist loading",
			"createdAt": "2022-10-30T23:20:21.251Z",
			"updatedAt": "2022-10-31T21:33:17.132Z",
			"reading_time": 1,
			"__v": 0
		},
		{
			"_id": "635f07d20db0328705ede442",
			"title": "life",
			"description": "don't even know how to go about exams",
			"tags": [
				"fufilment",
				"joy",
				"healing"
			],
			"author": "635edf28d6d8fd8348343ce6",
			"state": "draft",
			"read_count": 0,
			"body": "I finally went to seychelles hurray!!!! I am using my week break from work to spoil myself me and my homies you wont even believe it..... Full gist loading",
			"createdAt": "2022-10-30T23:25:06.899Z",
			"updatedAt": "2022-10-30T23:25:06.899Z",
			"reading_time": 1,
			"__v": 0
		}
 }
```

***

### Delete Post
* Route: /post/:id
* Method: GET
* Header
    * Authorizaton: Bearer ${token}
* Response

Success
```
{
	"status": true,
	"msg": null
}
```

***
### Get All Posts
* Route: post/
* Method: GET
* Query Param
    * page (default 1)
    * limit (default 20)
    * author
    * title
    * tags
    * sort (-read_count || read_count || -reading_time || reading_time || -timestamp || timestamp )

* Responses

Success
```
{
	"status": true,
	"page": 1,
	"numberOfPosts": 3,
	"posts": [
		{
			"_id": "635e803007526ad682ef2063",
			"title": "business thoughts",
			"description": "thinking of starting a cloth busines",
			"tags": [
				"business"
			],
			"author": "635e787cb8bf0baa21185cbd",
			"state": "published",
			"read_count": 7,
			"body": "I finally went to seychelles hurray!!!! I am using my week break from work to spoil myself me and my homies you wont even believe it..... Full gist loading",
			"createdAt": "2022-10-30T13:46:24.848Z",
			"updatedAt": "2022-10-31T19:37:59.120Z",
			"reading_time": 1,
			"__v": 0
		},
		{
			"_id": "635e80e007526ad682ef206f",
			"title": "joy at last",
			"description": "almost done with assignment",
			"tags": [
				"happy"
			],
			"author": "635e787cb8bf0baa21185cbd",
			"state": "published",
			"read_count": 3,
			"body": "I finally went to seychelles hurray!!!! I am using my week break from work to spoil myself me and my homies you wont even believe it..... Full gist loading",
			"createdAt": "2022-10-30T13:49:20.857Z",
			"updatedAt": "2022-10-30T20:24:26.131Z",
			"reading_time": 1,
			"__v": 0
		},
		{
			"_id": "63601724db705f507919c201",
			"title": "life of peace",
			"description": "don't even know how to go about exams",
			"tags": [
				"fufilment",
				"joy",
				"healing",
				"enjoyment"
			],
			"author": "635edf28d6d8fd8348343ce6",
			"state": "published",
			"read_count": 0,
			"body": "I finally went to seychelles hurray!!!! I am using my week break from work to spoil myself me and my homies you wont even believe it..... Full gist loading the world aroun us id shete fjeud dhdidxdhjdu dhdhd s sd dj djd jd jd d dele dyeke d fjd jd jedmndnjd gdtrewhskj ddhd djdd dh dhd hd hd fhf jg gjg gjg fjd dhd dhg gj fhd ddj ggd gk gjg k d fd h dhfbfdhf hg fhf hg",
			"createdAt": "2022-10-31T18:42:44.070Z",
			"updatedAt": "2022-10-31T18:46:05.087Z",
			"reading_time": 1,
			"__v": 0
		}
	]
}
```

***
###Tests
* To run test
     * run ```npm run test```
	

***
### Contributor

**Victoria Igbobi Chinecherem**










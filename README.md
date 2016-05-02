# Social Authentication Skeleton App

A NodeJS skeleton application providing social authentication workflow.

## Installation

Download / Clone and run `npm install`.

Create a configuration file using `npm run config`. This will create a file named `config.created.js` inside the `config` folder. Rename this file to `config.js` to actually use it.


## Running the Server / Workflow

Start the server using `npm start`.

Open a browser using the URL given in the command line.

Select a authentication provider, and log in using it.

When authentication is successful, you will end up at `/login/callback?token=<sometoken>`.

Use the token provided in the query string and continue from there.


## Batteries Excluded

This is just a skeleton application. There are a few pieces missing you need to provide yourself.

- Implement User Crud Operations
- Store, manipulate and use the token

## Creating Applications

To use Facebook, Google, etc. to authenticate users, you need to create Apps / Projects at

- [Facebook](https://developers.facebook.com/apps)
- [Google](https://console.developers.google.com/project). 
  - make sure the the Google+ API is enabled
  - note: enabling the Google+ API does not have immediate effect ... you may have to way a few minutes. Patience is a virtue, you know ;)


## Token Examples

* `iat` : issued at. The time the token was issued at. Numeric Date value.
* `exp` : expiration. The time the token will expire. Numeric Date value.

### Facebook

```json
{ 
  "displayName": "John Doe", 
  "firstName": "John", 
  "lastName": "Doe", 
  "emails": [ { "value": "john@doe.com" } ], 
  "gender": "male", 
  "authDisplayName": "John Doe", 
  "authProvider": "facebook", 
  "authId": "12345678901234567", 
  "authProfileUrl": "https://www.facebook.com/app_scoped_user_id/12345678901234567/", 
  "iat": 1456910119, 
  "exp": 1456910129 
}
```

### Google

```json
{ 
  "displayName": "John Doe", 
  "firstName": "John", 
  "lastName": "Doe", 
  "emails": [], 
  "gender": "male", 
  "authDisplayName": "John Doe", 
  "authProvider": "google", 
  "authId": "123456789012345678901", 
  "authProfileUrl": "https://plus.google.com/+JohnDoe", 
  "iat": 1456912683, 
  "exp": 1456912693 
}
```


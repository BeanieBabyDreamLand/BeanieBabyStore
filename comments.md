# Code Review I

## Workflow
```
	- Git Merges don't mean you are a bad person
	- README
		- Include name/description of app
		- Inlcude steps for installing/running locally
		- Inlcude link to deployed app
	- Good (semantic) commit msgs
		- Type of commit (feature, test, refactor, bugfix, style, etc...)
		- Subject of committed code
		- Present tense descriotion of the committed code
		- ex FEATURE:(auth) Users can now log in using Google 3rd party Oauth
	- Ticketing 
		- Break out of User stories and give Specific tasks
		- Good ticket should encompass (15mins - 2hrs of estimated work)
```

## Models
```
	- Nice job teaching Dan about Decimals
	- Test your validators
	- Make sure you include belongsTo/Has(One/Many) pairs going in both directions in your associations
	- Good job avoiding Sequelize.ARRAY
```

## Routes
```
	- Good job using the conventional stati: 200 Get, 201 for PUT/POST, 204 for DELETE
	- Add Eager Loading, use req.params or just rewrite some routes

```



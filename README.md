# JavaScript fetch() Lab

## Overview

In this lab, you'll use `fetch()` to get remote data from and write data to GitHub.

## Introduction

We're going to use `fetch` to get data from GitHub, fork a repository, and post issues to our forked repository.

Using `fetch` to get remote data after using `XMLHttpRequest` is a little like riding in a convertible with the top down after spending your whole life walking like a sucker.

![mean girls](http://i.giphy.com/4CP58gxwbBy2Q.gif)

Getting data from the GitHub API with `fetch` is super simple. If we're just trying to `GET` some JSON, we can do this:

```js
fetch('https://api.github.com/repos/jquery/jquery/commits')
  .then(resp => resp.json())
  .then(json => console.log(json));
```

Keeping in mind that we can use the `json` method of the `Body` mixin to render our response as JSON, and that each `then` passes its return value to the next `then` as an argument.

### Authentication Token

https://developer.github.com/v3/oauth/#3-use-the-access-token-to-access-the-api

GitHub's API uses [OAuth2](https://developer.github.com/v3/oauth/) for authorization. Setting up the full OAuth2 authorization code grant workflow is beyond the scope of this lab, but it is described well in the GitHub [docs](https://developer.github.com/v3/oauth/), and I highly recommend you give it a read.

Fortunately, GitHub also allows you to generate your own personal authorization token that we can use to give us authorized access to the API.

If you already have a personal token that you've been using to make API requests, you can keep using that one. Otherwise, you'll need to generate a new one.

To start, go to https://github.com/settings/tokens and click "Generate new token." Name it something like "Learn.co", and check `repo` scope. Once you generate the token, make sure to copy and paste it somewhere, because once you leave that page, you won't be able to see it again.

Using the token to [access the API](https://developer.github.com/v3/oauth/#3-use-the-access-token-to-access-the-api) is a simple matter of creating an `Authorization` header with our request.

We need to provide our authorization token in order to list our own repositories with this API, so let's add our `Authorization` header (don't forget to assign your token to `const token`).

```js
const token = 'YOUR_TOKEN_HERE';

fetch('https://api.github.com/user/repos', {
  headers: {
    Authorization: `token ${token}`
  }
}).then(res => res.json()).then(json => console.log(json));
```

We just pass the desired headers as part of a second `options` argument to `fetch` and we are in business. Easy as that!

### Getting Past GET

While `GET` operations are straightforward, when we're building out full applications, we often need to use other HTTP verbs, such as `POST`, to write data as well as read it. Luckily, it's very easy to `POST` with `fetch` as well.

Let's look at an example of posting a new comment to a commit with the GitHub API. Replace the commit with a commit from one of your repositories, and use your token if you want to try this out.

```js
const token = 'YOUR_TOKEN_HERE';
const postData = {
  body: 'Great stuff'
};

fetch('https://api.github.com/repos/:your_ghname/:your_repo/commits/:sha/comments', {
  method: 'POST',
  body: JSON.stringify(postData),
  headers: {
    Authorization: `token ${token}`
  }
}).then(res => console.log(res));
```

Here we created an object called `postData` that we will pass as a JSON string using `JSON.stringify` in the request `body`. We're also setting the method to `'POST'`, and finally using our `Authorization` header like we did before, since any write action is going to require authorization.

All of these additional settings go in that `options` argument, which is just an object that we can pass as the second argument to `fetch`.

Finally, we can examine the response in our `then` function just the same as we did with a `GET` request.

**Top-tip:** Make sure you read the API documentation carefully! They will often specify which fields are required and which are optional, as well as the format of the request body. GitHub expects JSON data in the body, but another API might want form data (which you can create with `new FormData()` or XML or something else. Always read the docs!

## Instructions

We're going to be making an app to allow us to fork a repo and create issues on that fork. The basic HTML and JavaScript are provided in `index.html` and `index.js`. Your job will be to follow the instructions and complete the code to make it work. Don't forget to run it in the browser to see it in action, and run the tests to make sure they pass!

#### NOTICE !!

This lab will be using [Handlebars](http://handlebarsjs.com/) for rendering content in the view. Please review their documentation if you are unfamiliar with it.

You will also need to read the GitHub API documentation to see how each function works.

**Note:** Running it will require that you return your personal token in `getToken()`, however, the tests will **not** pass if you leave your token there, so before you commit and push, make sure you set `return ''` in the `getToken` function. NEVER give out your token or check it into GitHub!

1. Fork [learn-co-curriculum/javascript-fetch-lab](https://github.com/learn-co-curriculum/javascript-fetch-lab) repository in the `forkRepo` function. Display the JSON result in the `results` div by calling `showResults`. [GitHub Forks API](https://developer.github.com/v3/repos/forks/)

2. In `showResults`, render the `repo-template` Handlebars template. Modify the template to include the repository full name and html url.

    * you can set the Handlebars to have access to the JSON using this in the showResults() function
```JavaScript
const template = Handlebars.compile(document.getElementById('issues-template').innerHTML)
document.getElementById('issues').innerHTML = template(json)
```

3. Navigate to your forked repository (using the link in your template!) and enable Issues by clicking on the `Settings` tab and checking `Issues`. They will probably be turned off by default, and the next step won't work so well if they are disabled!

4. Create a new issue for your forked repository with the `createIssue` function. Use the `title` and `body` values from the provided form. When the issue is created, read all issues for the repository with `getIssues`, and display the results in the `issues` div by calling `showIssues`. [GitHub Issues API](https://developer.github.com/v3/issues/)

5. In `showIssues`, render the `issues-template` Handlebars template with the collection of issues. Each issue should display title, link to url, and body of the issue.

    * Iterating over a collection in Handlebars looks like this
```html
<ul>
  {{#each this}}
      <li>
          <h4>{{ name }}}</a></h4>
          <p>{{ age }}</p>
      </li>
  {{/each}}
</ul>
```

6. Load it up and watch it work!

![fetch()](http://missmonet.net/wp-content/uploads/2014/04/so-fetch-gretchen-xmas-gif.gif)

## Resources

- [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [GitHub API](https://developer.github.com/v3/)
- [Handlebars](http://handlebarsjs.com)

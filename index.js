function getIssues() {
  const repo = "eckmLJE/javascript-fetch-lab";
  const url = "https://api.github.com/repos/" + repo + "/issues";
  return fetch(url, {
    method: "get",
    headers: {
      Authorization: `token ${getToken()}`
    }
  })
    .then(res => res.json())
    .then(json => showIssues(json));
}

function showIssues(json) {
  console.log(json);
  issuesBox().innerHTML = ""
  json.forEach(issue => {
    let p = `Title: ${issue.title} | Body: ${issue.body}`
    issuesBox().innerHTML += p
  })
}

function getFormData() {
  let title = document.getElementById("title").value;
  let body = document.getElementById("body").value;
  return { title, body };
}

function createIssue() {
  // const repo = document.getElementById("repo").innerText;
  const repo = "eckmLJE/javascript-fetch-lab";
  const url = "https://api.github.com/repos/" + repo + "/issues";
  fetch(url, {
    method: "post",
    body: JSON.stringify(getFormData()),
    headers: {
      Authorization: `token ${getToken()}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
}

function showResults(json) {
  const resultsView = `<div>
  <h3><a id="repo" href="https://www.github.com/${json.full_name}">${
    json.full_name
  }</a></h3>
  </div>`;
  resultsBox().innerHTML = resultsView;
}

function forkRepo() {
  const repo = "learn-co-curriculum/javascript-fetch-lab";
  const url = "https://api.github.com/repos/" + repo + "/forks";
  return fetch(url, {
    method: "post",
    headers: {
      Authorization: `token ${getToken()}`
    }
  })
    .then(res => res.json())
    .then(json => showResults(json));
}

function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  return "";
}

function resultsBox() {
  return document.getElementById("results");
}

function issuesBox() {
  return document.getElementById("issues");
}

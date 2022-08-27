
//Save api url in a data bucket
const APIURL = "https://api.github.com/users/";

//Grab the tags from html and save in a data bucket
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

//This is the default user
getUser("geekiedj");

//Declaring async function to fetch data from api
async function getUser(username) {
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();
    createUserCard(respData);
    getRepos(username);
}

//Functionality to search for username and repository
async function getRepos(username) {
  const resp = await fetch(APIURL + username + "/repos");
  const respData = await resp.json();
  addReposToCard(respData);
}

//Functionality to add repository to card from the api
function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");
  repos.forEach((repo) => {
          const repoEl = document.createElement("a");
          repoEl.classList.add("repo");
          repoEl.href = repo.html_url;
          repoEl.target = "_blank";
          repoEl.innerText = repo.name;
          reposEl.appendChild(repoEl);
      });
}

//Embedding and structuring how the result will be displayed using the suggestion mode the API supports
function createUserCard(user) {
  const cardHTML = `
      <div class="card">
          <div>
              <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
          </div>
          <div class="user-info">
              <h2>${user.name}</h2>
              <p>${user.bio}</p>
              <ul class="info">
                  <li><strong>Followers :</strong>${user.followers}</li>
                  <li><strong>Following :</strong>${user.following}</li>
                  <li><strong>Repos :</strong>${user.public_repos}</li>
                  <li><strong>Twitter :</strong> ${user.twitter_username}</li>
                  <li><strong>Location :</strong>${user.location}</li>
              </ul>
              <div id="repos"></div>
          </div>
      </div>
  `;

  //embedding the card html into the html so that it displays in the html
  main.innerHTML = cardHTML;
}

//Event listener for submitting search
form.addEventListener("submit", (e) => {
  //prevents page from reloading
  e.preventDefault();
  const user = search.value;
  if (user) {
      getUser(user);
      search.value = "";
  }
});
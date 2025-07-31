const input = document.getElementById("user-input");
const searchbtn = document.getElementById("search-btn");
const userProfilePicture = document.getElementById("user-image");
const userFullName = document.getElementById("user-fullname");
const userFollowers = document.getElementById("followers-count");
const userRepoCount = document.getElementById("repo-count");
const userLocation = document.getElementById("location");

searchbtn.addEventListener("click", (e) => {
  e.preventDefault();
  const getGitHubUser = function (username) {
    const gitHubUsers = fetch(`https://api.github.com/users/${username}`);
    gitHubUsers
      .then((users) => users.json())
      .then((user) => {
        userProfilePicture.src = user.avatar_url;
        userFullName.textContent = user.name;
        userFollowers.textContent = user.followers;
        userRepoCount.textContent = user.public_repos;
        userLocation.textContent = user.location;
      });
  };
  const inputUserValue = input.value.trim();
  getGitHubUser(inputUserValue);
  input.value = "";
});

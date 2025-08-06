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
        document.body.style.backgroundImage = `url(${user.avatar_url})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center";
        document.body.style.transition = "background-image 0.1s ease-in-out";
      });
  };
  const inputUserValue = input.value.trim();
  getGitHubUser(inputUserValue);
  input.value = "";
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const searchQuery = document.getElementById('search').value;
      const usersResponse = await fetch(`https://api.github.com/search/users?q=${searchQuery}`);
      const usersData = await usersResponse.json();
      displayUsers(usersData.items);
    });
  
    function displayUsers(users) {
      userList.innerHTML = '';
      users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" />
          <a href="${user.html_url}" target="_blank">${user.login}</a>
        `;
        userItem.addEventListener('click', async function () {
          const reposResponse = await fetch(`https://api.github.com/users/${user.login}/repos`);
          const reposData = await reposResponse.json();
          displayRepos(reposData);
        });
        userList.appendChild(userItem);
      });
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = '';
      repos.forEach(repo => {
        const repoItem = document.createElement('li');
        repoItem.textContent = repo.name;
        reposList.appendChild(repoItem);
      });
    }
  });
  
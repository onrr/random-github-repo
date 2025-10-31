fetch("languages.json")
  .then((response) => response.json())
  .then((data) => {
    const select = document.getElementById("language");

    data.forEach((lang) => {
      const option = document.createElement("option");
      option.value = lang.value;
      option.textContent = lang.title;
      select.appendChild(option);
    });
  });

async function getRandomRepo() {
  const lang = document.getElementById("language").value;
  const resultDiv = document.querySelector(".result");
  resultDiv.style.backgroundColor = "rgb(233 236 239)";
  resultDiv.style.border = "0";
  resultDiv.innerHTML = "<p>Loading, please wait..</p>";

  try {
    const page = Math.floor(Math.random() * 10) + 1;
    const response = await fetch(
      `https://api.github.com/search/repositories?q=language:${lang}&sort=stars&page=${page}&per_page=20`
    );

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      resultDiv.innerHTML = "<p>Error fetching repositories</p>";
      resultDiv.style.backgroundColor = "rgb(255 201 201)";
      return;
    }

    const randomRepo =
      data.items[Math.floor(Math.random() * data.items.length)];

    resultDiv.style.border = "2px solid #444";
    resultDiv.style.backgroundColor = "#fff";
    resultDiv.innerHTML = `
        <a href="${randomRepo.html_url}" target="_blank">
            <h2>${randomRepo.name}</h2>
            <p>${randomRepo.description || "-"}</p>
            <div class="stats">
                <span>💻 ${
                  randomRepo.language.toLocaleString("en-US") || "-"
                }</span>
                <span>⭐ ${
                  randomRepo.watchers.toLocaleString("en-US") + " Stars" || "-"
                }</span>
                <span>🔀 ${
                  randomRepo.forks_count.toLocaleString("en-US") + " Forks" ||
                  "-"
                }</span>
            </div>
        </a>`;
  } catch (error) {
    console.error(error);
  }
}

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


const toggleButton = document.querySelector("#toggle-theme");
const body = document.body;

const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  body.classList.add("dark");
  toggleButton.textContent = "☀️";
}

toggleButton.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    toggleButton.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    toggleButton.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});

async function getRandomRepo() {
  const lang = document.getElementById("language").value;
  const resultDiv = document.querySelector(".result");
  resultDiv.classList.remove("error");
  resultDiv.classList.remove("active");
  resultDiv.innerHTML = "<p>Loading, please wait..</p>";

  try {
    const page = Math.floor(Math.random() * 10) + 1;
    const response = await fetch(
      `https://api.github.com/search/repositories?q=language:${lang}&sort=stars&page=${page}&per_page=20`
    );

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      resultDiv.classList.add("error");
      resultDiv.innerHTML = "<p>Error fetching repositories</p>";
      return;
    }

    const randomRepo =
      data.items[Math.floor(Math.random() * data.items.length)];

    resultDiv.classList.add("active");
    resultDiv.innerHTML = `
        <a href="${randomRepo.html_url}" target="_blank">
            <div class="info">
              <h2>${randomRepo.name}</h2>
              <p>${randomRepo.description || "-"}</p>
            </div>
            <div class="stats">
              <span>💻 ${
                randomRepo.language.toLocaleString("en-US") || "-"
              }</span>
              <span>⭐ ${
                randomRepo.watchers.toLocaleString("en-US") + " Stars" || "-"
              }</span>
              <span>🔀 ${
                randomRepo.forks_count.toLocaleString("en-US") + " Forks" || "-"
              }</span>
            </div>
        </a>`;
  } catch (error) {
    console.error(error);
  }
}

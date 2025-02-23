document.addEventListener("DOMContentLoaded", function () {
    loadSurahList();
});

function showHome() {
    document.getElementById("homeSection").style.display = "block";
    document.getElementById("quranSection").style.display = "none";
}

function showQuran() {
    document.getElementById("homeSection").style.display = "none";
    document.getElementById("quranSection").style.display = "block";
}

async function loadSurahList() {
    const response = await fetch("quran.json");
    const quranData = await response.json();
    const surahSelect = document.getElementById("surahSelect");

    quranData.forEach((surah, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = surah.name;
        surahSelect.appendChild(option);
    });
}

async function loadSurah() {
    const response = await fetch("quran.json");
    const quranData = await response.json();
    const surahSelect = document.getElementById("surahSelect");
    const selectedIndex = surahSelect.value;
    const versesDiv = document.getElementById("verses");

    if (selectedIndex === "") {
        versesDiv.innerHTML = "";
        return;
    }

    let surah = quranData[selectedIndex];
    versesDiv.innerHTML = `<h2>${surah.name}</h2>`;
    surah.verses.forEach((ayah, index) => {
        versesDiv.innerHTML += `<p><strong>${index + 1}.</strong> ${ayah}</p>`;
    });
}
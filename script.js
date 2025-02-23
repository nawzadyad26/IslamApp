document.addEventListener("DOMContentLoaded", function () {
    const surahSelect = document.getElementById("surahSelect");
    const surahName = document.getElementById("surahName");
    const versesContainer = document.getElementById("verses");
    const quranSection = document.getElementById("quranSection");

    const apiURL = "https://api.alquran.cloud/v1/quran/ku.mokhtarsaeedraman";

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            if (!data || !data.data || !data.data.surahs) {
                console.error("Fehler beim Laden der API-Daten.");
                return;
            }

            let surahs = data.data.surahs;

            surahs.forEach(surah => {
                let option = document.createElement("option");
                option.value = surah.number;
                option.textContent = `سورة ${surah.englishName} - ${surah.name}`;
                surahSelect.appendChild(option);
            });

            loadSurah(1, surahs);

            surahSelect.addEventListener("change", function () {
                loadSurah(this.value, surahs);
            });

        })
        .catch(error => console.error("Fehler beim Laden der API:", error));

    function loadSurah(surahNumber, surahs) {
        let surah = surahs.find(s => s.number == surahNumber);
        if (!surah) return;

        surahName.textContent = `📖 سورة ${surah.englishName} - ${surah.name}`;
        versesContainer.innerHTML = "";

        surah.ayahs.forEach(ayah => {
            let p = document.createElement("p");
            p.textContent = `${ayah.numberInSurah}. ${ayah.text}`;
            versesContainer.appendChild(p);
        });
    }
});

function showQuran() {
    document.getElementById("quranSection").classList.remove("hidden");
}
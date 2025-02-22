document.addEventListener("DOMContentLoaded", function () {
    const surahSelect = document.getElementById("surahSelect");
    const surahName = document.getElementById("surahName");
    const versesContainer = document.getElementById("verses");

    // API mit Koran auf Kurdisch
    const apiURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/kur-mokhtarsaeedraman.json";

    fetch(apiURL)
        .then(response => response.json())
        .then(quranData => {
            const surahs = {};
            quranData.quran.forEach(ayah => {
                if (!surahs[ayah.surah]) {
                    surahs[ayah.surah] = [];
                }
                surahs[ayah.surah].push(`${ayah.ayah}: ${ayah.text}`);
            });

            // Fülle das Dropdown mit Suren-Namen
            Object.keys(surahs).forEach(surahNumber => {
                let option = document.createElement("option");
                option.value = surahNumber;
                option.textContent = `سورة ${surahNumber}`;
                surahSelect.appendChild(option);
            });

            // Standardmäßig erste Surah laden
            loadSurah(1, surahs);

            // Event Listener für Dropdown
            surahSelect.addEventListener("change", function () {
                loadSurah(this.value, surahs);
            });

        });

    function loadSurah(surahNumber, surahs) {
        surahName.textContent = `سورة ${surahNumber}`;
        versesContainer.innerHTML = "";

        surahs[surahNumber].forEach(ayah => {
            let p = document.createElement("p");
            p.textContent = ayah;
            versesContainer.appendChild(p);
        });
    }
});
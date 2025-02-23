fetch('quran.json')
    .then(response => response.json())
    .then(data => {
        const surahSelect = document.getElementById('surahSelect');

        // Suren in das Dropdown-Menü einfügen
        data.forEach((surah, index) => {
            let option = document.createElement('option');
            option.value = index;
            option.textContent = surah.name;  // Name der Surah einfügen
            surahSelect.appendChild(option);
        });

        // Standardmäßig die erste Surah laden
        showSurah(0, data);
    })
    .catch(error => console.error("Fehler beim Laden des Quran:", error));

function showSurah(index, data) {
    const versesContainer = document.getElementById('verses');
    versesContainer.innerHTML = '';  // Vorherige Verse löschen

    let surah = data[index];  // Surah anhand des Index holen

    // Surah-Name anzeigen
    document.getElementById('surahName').textContent = surah.name;

    // Alle Verse der Surah anzeigen
    surah.verses.forEach((verse, i) => {
        let verseElement = document.createElement('p');
        verseElement.innerHTML = `
            <strong>آیه ${i + 1}:</strong><br>
            <span dir="rtl">${verse.arabic}</span><br>
            <em>${verse.translation}</em>
        `;
        versesContainer.appendChild(verseElement);
    });
}

// Event Listener für das Dropdown-Menü
document.getElementById('surahSelect').addEventListener('change', function () {
    fetch('quran.json')
        .then(response => response.json())
        .then(data => {
            showSurah(this.value, data);
        })
        .catch(error => console.error("Fehler beim Laden der Surah:", error));
});
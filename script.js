fetch('quran.json')
    .then(response => response.json())
    .then(data => {
        const surahSelect = document.getElementById('surahSelect');
        
        // Dropdown-Menü mit Suren füllen
        data.forEach((surah, index) => {
            let option = document.createElement('option');
            option.value = index;
            option.textContent = surah.name;  // Name der Surah einfügen
            surahSelect.appendChild(option);
        });

        // Standardmäßig erste Surah laden
        showSurah(0, data);
    })
    .catch(error => console.error("Fehler beim Laden des Quran:", error));

function showSurah(index, data) {
    const surahContainer = document.getElementById('verses');
    surahContainer.innerHTML = '';  // Vorherige Verse löschen

    let surah = data[index];  // Surah anhand des Index holen

    // Surah-Name anzeigen
    document.getElementById('surahName').textContent = surah.name;

    // Alle Verse der Surah anzeigen
    surah.verses.forEach((verse, i) => {
        let verseElement = document.createElement('p');
        verseElement.innerHTML = `<strong>Vers ${i + 1}:</strong><br><span dir="rtl">${verse.arabic}</span><br><em>${verse.translation}</em>`;
        surahContainer.appendChild(verseElement);
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
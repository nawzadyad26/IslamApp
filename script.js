fetch('quran.json')
    .then(response => response.json())
    .then(data => {
        const surahSelect = document.getElementById('surahSelect');

        // Dropdown-Menü mit Suren füllen
        data.forEach((surah, index) => {
            let option = document.createElement('option');
            option.value = index;
            option.textContent = `${surah.name}`;
            surahSelect.appendChild(option);
        });

        // Wenn eine Surah ausgewählt wird, diese anzeigen
        surahSelect.addEventListener('change', function() {
            showSurah(this.value, data);
        });

        // Standardmäßig die erste Surah anzeigen
        showSurah(0, data);
    })
    .catch(error => console.error("Fehler beim Laden des Quran:", error));

function showSurah(index, data) {
    const versesContainer = document.getElementById('verses');
    versesContainer.innerHTML = '';  // Vorherige Verse löschen

    const surah = data[index];  // Holen der Surah basierend auf dem Index
    const surahName = document.getElementById('surahName');
    surahName.textContent = surah.name;  // Surah Name setzen

    // Alle Verse der ausgewählten Surah anzeigen
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
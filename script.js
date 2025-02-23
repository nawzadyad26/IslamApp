fetch('quran.json')
    .then(response => response.json())
    .then(data => {
        const surahSelect = document.getElementById('surahSelect');

        // Überprüfen, ob Daten geladen wurden
        if (!data.surahs) {
            console.error("Fehler: Keine Suren-Daten gefunden.");
            return;
        }

        // Dropdown-Menü mit Suren füllen
        data.surahs.forEach((surah, index) => {
            let option = document.createElement('option');
            option.value = index;
            option.textContent = `${index + 1}. ${surah.name}`;
            surahSelect.appendChild(option);
        });

        // Standardmäßig erste Sure laden
        showSurah(0, data);
    })
    .catch(error => console.error("Fehler beim Laden des Quran:", error));

function showSurah(index, data) {
    const surahContainer = document.getElementById('surahContainer');
    surahContainer.innerHTML = '';

    let surah = data.surahs[index];

    surah.ayahs.forEach(ayah => {
        let ayahElement = document.createElement('p');
        ayahElement.innerHTML = `<strong>${ayah.number}</strong> ${ayah.text}`;
        surahContainer.appendChild(ayahElement);
    });
}

// Event Listener für Dropdown-Menü
document.getElementById('surahSelect').addEventListener('change', function () {
    fetch('quran.json')
        .then(response => response.json())
        .then(data => {
            showSurah(this.value, data);
        });
});
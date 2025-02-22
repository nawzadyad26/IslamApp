// Quran-Daten aus quran.json laden und anzeigen
fetch("quran.json")
    .then(response => response.json())
    .then(data => {
        const quranContainer = document.getElementById("quran-container");
        quranContainer.innerHTML = ""; // Vorherigen Text entfernen

        data.forEach(surah => {
            const surahElement = document.createElement("div");
            surahElement.innerHTML = `<h2>${surah.surah_number}. ${surah.surah_name}</h2>`;
            
            surah.ayahs.forEach(ayah => {
                const ayahElement = document.createElement("p");
                ayahElement.innerHTML = `<strong>${ayah.ayah_number}.</strong> ${ayah.text}`;
                surahElement.appendChild(ayahElement);
            });

            quranContainer.appendChild(surahElement);
        });
    })
    .catch(error => console.error("Fehler beim Laden des Korans:", error));

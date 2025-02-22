document.addEventListener("DOMContentLoaded", function () {
    const suraAuswahl = document.getElementById("sura-auswahl");
    const verseContainer = document.getElementById("verse-container");

    // Quran-Daten laden
    fetch("quran.json")
        .then(response => response.json())
        .then(data => {
            // Dropdown mit Suren befüllen
            data.suras.forEach((sura, index) => {
                let option = document.createElement("option");
                option.value = index;
                option.textContent = `${sura.name} (${sura.translation})`;
                suraAuswahl.appendChild(option);
            });

            // Erste Sura anzeigen
            ladeSura(0, data);
        });

    // Event-Listener für Dropdown-Änderung
    suraAuswahl.addEventListener("change", function () {
        fetch("quran.json")
            .then(response => response.json())
            .then(data => {
                ladeSura(this.value, data);
            });
    });

    // Funktion zum Laden einer Sura
    function ladeSura(index, data) {
        verseContainer.innerHTML = ""; // Vorherige Verse löschen
        let sura = data.suras[index];

        sura.verses.forEach(verse => {
            let p = document.createElement("p");
            p.innerHTML = `<strong>${verse.number}.</strong> ${verse.text} <br> <em>${verse.translation}</em>`;
            verseContainer.appendChild(p);
        });
    }
});
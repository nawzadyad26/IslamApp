document.addEventListener("DOMContentLoaded", function () {
    const suraAuswahl = document.getElementById("sura-auswahl");
    const verseContainer = document.getElementById("verse-container");

    fetch("quran.json")
        .then(response => response.json())
        .then(data => {
            data.suras.forEach((sura, index) => {
                let option = document.createElement("option");
                option.value = index;
                option.textContent = `${sura.name} (${sura.translation})`;
                suraAuswahl.appendChild(option);
            });

            ladeSura(0, data);
        });

    suraAuswahl.addEventListener("change", function () {
        fetch("quran.json")
            .then(response => response.json())
            .then(data => {
                ladeSura(this.value, data);
            });
    });

    function ladeSura(index, data) {
        verseContainer.innerHTML = "";  
        let sura = data.suras[index];

        if (!sura.verses || sura.verses.length === 0) {
            verseContainer.innerHTML = "<p>Keine Verse verfügbar</p>";
            return;
        }

        sura.verses.forEach(verse => {
            let p = document.createElement("p");
            p.innerHTML = `<strong>${verse.number}.</strong> ${verse.text} <br> <em>${verse.translation}</em>`;
            verseContainer.appendChild(p);
        });
    }
});
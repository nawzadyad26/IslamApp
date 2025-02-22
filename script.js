// Quran-Daten laden
async function ladeQuran() {
    try {
        const response = await fetch('quran.json');
        const data = await response.json();
        zeigeSuren(data.suras);
    } catch (error) {
        console.error("Fehler beim Laden des Quran:", error);
    }
}

// Suren in die Auswahlbox laden
function zeigeSuren(suren) {
    const suraAuswahl = document.getElementById('sura-auswahl');
    suraAuswahl.innerHTML = '';

    suren.forEach(sura => {
        const option = document.createElement('option');
        option.value = sura.nummer;
        option.textContent = `${sura.nummer}. ${sura.name} (${sura.transliteration})`;
        suraAuswahl.appendChild(option);
    });

    // Zeige die erste Sure standardmäßig
    zeigeSura(suren[0]);
}

// Eine Sure anzeigen
function zeigeSura(sura) {
    const suraName = document.getElementById('sura-name');
    const verseContainer = document.getElementById('verse-container');

    suraName.textContent = `${sura.nummer}. ${sura.name} - ${sura.transliteration}`;
    verseContainer.innerHTML = '';

    sura.verse.forEach(vers => {
        const verseElement = document.createElement('p');
        verseElement.innerHTML = `<strong>${vers.nummer}</strong> ${vers.arabisch}<br><em>${vers.kurdisch}</em>`;
        verseContainer.appendChild(verseElement);
    });
}

// Eventlistener für Suren-Auswahl
document.getElementById('sura-auswahl').addEventListener('change', async function () {
    const response = await fetch('quran.json');
    const data = await response.json();
    const gewaehlteSuraNummer = parseInt(this.value);
    const gewaehlteSura = data.suras.find(sura => sura.nummer === gewaehlteSuraNummer);
    
    if (gewaehlteSura) {
        zeigeSura(gewaehlteSura);
    }
});

// Lade den Quran beim Start
ladeQuran();
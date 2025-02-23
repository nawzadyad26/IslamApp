const quranData = [
    {
        "name": "الفاتحة",
        "verses": [
            "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
            "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
            "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
            "مَٰلِكِ يَوْمِ ٱلدِّينِ",
            "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
            "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
            "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ"
        ]
    },
    {
        "name": "البقرة",
        "verses": [
            "الم",
            "ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ فِيهِ هُدًۭى لِّلْمُتَّقِينَ",
            "ٱلَّذِينَ يُؤْمِنُونَ بِٱلْغَيْبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقْنَٰهُمْ يُنفِقُونَ",
            "وَٱلَّذِينَ يُؤْمِنُونَ بِمَآ أُنزِلَ إِلَيْكَ وَمَآ أُنزِلَ مِن قَبْلِكَ وَبِٱلءَاخِرَةِ هُمْ يُوقِنُونَ",
            "أُو۟لَٰئِكَ عَلَىٰ هُدًۭى مِّن رَّبِّهِمْ ۖ وَأُو۟لَٰئِكَ هُمُ ٱلْمُفْلِحُونَ"
        ]
    }
];

function loadSurahList() {
    const surahSelect = document.getElementById("surahSelect");
    quranData.forEach((surah, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = surah.name;
        surahSelect.appendChild(option);
    });
}

function loadSurah() {
    const surahSelect = document.getElementById("surahSelect");
    const selectedIndex = surahSelect.value;
    const versesDiv = document.getElementById("verses");

    if (selectedIndex === "") {
        versesDiv.innerHTML = "";
        return;
    }

    let surah = quranData[selectedIndex];
    versesDiv.innerHTML = `<h2>${surah.name}</h2>`;
    surah.verses.forEach((ayah, index) => {
        versesDiv.innerHTML += `<p><strong>${index + 1}.</strong> ${ayah}</p>`;
    });
}

document.addEventListener("DOMContentLoaded", function () {
    loadSurahList();
});
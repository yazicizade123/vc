// JSON dosyasını dahil edelim
const wordsData = require('kelimeler.json');

// DOM elementlerini seçelim
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const inpWord = document.getElementById("inp-word");
const container = document.querySelector(".container");
const searchContainer = document.querySelector(".search-container");

// Arama butonuna ve giriş kutusuna dinleyiciler ekleyelim
btn.addEventListener("click", searchWord);
inpWord.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchWord();
    }
});

// Kelime arama fonksiyonu
function searchWord() {
    console.log("Arama yapılıyor"); // Bu satırı ekledik
    container.classList.remove("hidden");
    let word = inpWord.value.toLowerCase(); // Kullanıcının girdiği kelimeyi küçük harfe çeviriyoruz

    // Kelimeyi arayalım
    const wordData = wordsData.find(item => item.word.toLowerCase() === word);
    
    if (wordData) {
        // Kelime bulunduysa, veriyi kullanarak HTML'i güncelleyelim
        result.innerHTML = `
            <div class="word">
                <h3>${word}</h3>
                <button onclick="playSound()">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="details">
                <p>${wordData.partOfSpeech}</p>
                <p>/${wordData.phonetic}/</p>
            </div>
            <p class="word-meaning">${wordData.definition}</p>
            <p class="word-example">${wordData.example || ""}</p>`;
        sound.setAttribute("src", wordData.audio); // Ses dosyasının URL'sini belirle
    } else {
        // Kelime bulunamadıysa, hata mesajını göster
        result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    }
}

// Ses çalma fonksiyonu
function playSound() {
    sound.play();
}

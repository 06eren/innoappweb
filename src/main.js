/**
 * Bu dosya, projenin ana giriş noktasıdır (entry point).
 * Gerekli tüm CSS ve JavaScript modüllerini içeri aktarır ve uygulamayı başlatır.
 */

// 1. Projenin tüm stillerini içeren CSS dosyasını içeri aktar.
// Bu satır, Vite'ın Tailwind CSS'i ve özel stillerinizi işlemesini sağlar.
import './style.css';

// 2. Tüm arayüz mantığını içeren ui.js dosyasından initUI fonksiyonunu içeri aktar.
import { initUI } from './ui.js';

console.log("initUI tipi:", typeof initUI);

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded OK");
    initUI();
});


console.log("initUI tipi:", typeof initUI);


// 3. HTML dokümanı tamamen yüklendiğinde ve hazır olduğunda aşağıdaki kodları çalıştır.
// Bu, JavaScript'in henüz var olmayan HTML elemanlarına erişmeye çalışmasını önler.
document.addEventListener('DOMContentLoaded', () => {
    
    // 4. Sayfadaki tüm ikonları (data-lucide) SVG formatına dönüştür.
    // Bu fonksiyon, Lucide Icons kütüphanesinden gelir.
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // 5. Tüm arayüz etkileşimlerini (menüler, sayfa geçişleri, SSS akordiyonu vb.) 
    // başlatan ana fonksiyonu çağır.
    initUI();
});

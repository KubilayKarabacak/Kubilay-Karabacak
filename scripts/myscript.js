var cevaplar = [];

function sepeteEkle(isim, fiyat) {
    var sepet = JSON.parse(localStorage.getItem('sepet')) || [];
    var bulundu = false;

    for (var i = 0; i < sepet.length; i++) {
        if (sepet[i].isim === isim) {
            sepet[i].adet += 1;
            bulundu = true;
            break;
        }
    }

    if (!bulundu) {
        sepet.push({ isim: isim, fiyat: fiyat, adet: 1 });
    }

    localStorage.setItem('sepet', JSON.stringify(sepet));
    navbarSepetGuncelle();
    alert(isim + ' sepete eklendi!');
}

function navbarSepetGuncelle() {
    var sepet = JSON.parse(localStorage.getItem('sepet')) || [];
    var adetToplam = 0;

    for (var i = 0; i < sepet.length; i++) {
        adetToplam += sepet[i].adet;
    }

    var eleman = document.getElementById('sepet-sayisi');
    if (eleman) {
        eleman.textContent = adetToplam;
    }
}

function sepetiGuncelle() {
    var sepet = JSON.parse(localStorage.getItem('sepet')) || [];
    var icerik = document.getElementById('sepet-icerik');
    var toplamEl = document.getElementById('sepet-toplam');

    if (!icerik) return;

    if (sepet.length === 0) {
        icerik.innerHTML = '<p class="sepet-bos">Sepetiniz şu an boş.</p>';
        if (toplamEl) toplamEl.textContent = '';
        return;
    }

    var html = '<table class="sepet-tablo">';
    html += '<tr><th>Ürün Adı</th><th>Adet</th><th>Birim Fiyat</th><th>Toplam</th><th>İşlem</th></tr>';

    var genelToplam = 0;
    for (var i = 0; i < sepet.length; i++) {
        var araToplam = sepet[i].fiyat * sepet[i].adet;
        genelToplam += araToplam;
        html += '<tr>';
        html += '<td>' + sepet[i].isim + '</td>';
        html += '<td>' + sepet[i].adet + '</td>';
        html += '<td>' + sepet[i].fiyat + ' TL</td>';
        html += '<td>' + araToplam + ' TL</td>';
        html += '<td><button class="sil-btn" data-index="' + i + '">Kaldır</button></td>';
        html += '</tr>';
    }

    html += '</table>';
    icerik.innerHTML = html;

    if (toplamEl) {
        toplamEl.textContent = 'Genel Toplam: ' + genelToplam + ' TL';
    }

    var silBtnler = document.querySelectorAll('.sil-btn');
    for (var j = 0; j < silBtnler.length; j++) {
        silBtnler[j].addEventListener('click', function() {
            urunSil(parseInt(this.dataset.index));
        });
    }
}

function urunSil(index) {
    var sepet = JSON.parse(localStorage.getItem('sepet')) || [];
    sepet.splice(index, 1);
    localStorage.setItem('sepet', JSON.stringify(sepet));
    sepetiGuncelle();
    navbarSepetGuncelle();
}

function cevapSec(soruNo, cevap) {
    cevaplar[soruNo] = cevap;

    var mevcutSoru = document.getElementById('soru-' + soruNo);
    var sonrakiSoru = document.getElementById('soru-' + (soruNo + 1));

    if (mevcutSoru) mevcutSoru.classList.add('gizli');

    if (sonrakiSoru) {
        sonrakiSoru.classList.remove('gizli');
    } else {
        var tavsiye = 'Catan';

        if (cevaplar[2] === 'kelime') {
            tavsiye = 'Scrabble';
        } else if (cevaplar[0] === 'fazla' && cevaplar[1] === 'uzun') {
            tavsiye = 'Risk';
        } else if (cevaplar[2] === 'aile' && cevaplar[1] !== 'uzun') {
            tavsiye = 'Monopoly';
        } else if (cevaplar[1] === 'kisa') {
            tavsiye = 'Cluedo';
        } else if (cevaplar[1] === 'uzun') {
            tavsiye = 'Ticket to Ride';
        }

        var sonucDiv = document.getElementById('sonuc');
        var tavsiyeEl = document.getElementById('tavsiye-metni');

        if (tavsiyeEl) tavsiyeEl.textContent = 'Size en uygun oyun: ' + tavsiye + '!';
        if (sonucDiv) sonucDiv.classList.remove('gizli');
    }
}

function quizSifirla() {
    cevaplar = [];
    var tumSorular = document.querySelectorAll('.soru');
    for (var i = 0; i < tumSorular.length; i++) {
        if (i === 0) {
            tumSorular[i].classList.remove('gizli');
        } else {
            tumSorular[i].classList.add('gizli');
        }
    }
    var sonucDiv = document.getElementById('sonuc');
    if (sonucDiv) sonucDiv.classList.add('gizli');
}

function formuDogrula(e) {
    e.preventDefault();

    var ad = document.getElementById('ad').value.trim();
    var email = document.getElementById('email').value.trim();
    var mesaj = document.getElementById('mesaj').value.trim();
    var gecerli = true;

    document.getElementById('ad-hata').textContent = '';
    document.getElementById('email-hata').textContent = '';
    document.getElementById('mesaj-hata').textContent = '';

    if (ad.length < 2) {
        document.getElementById('ad-hata').textContent = 'Ad Soyad en az 2 karakter olmalıdır.';
        gecerli = false;
    }

    if (!email.includes('@') || !email.includes('.')) {
        document.getElementById('email-hata').textContent = 'Geçerli bir e-posta adresi giriniz.';
        gecerli = false;
    }

    if (mesaj.length < 10) {
        document.getElementById('mesaj-hata').textContent = 'Mesaj en az 10 karakter olmalıdır.';
        gecerli = false;
    }

    if (gecerli) {
        alert('Mesajınız başarıyla gönderildi. Teşekkürler!');
        document.getElementById('iletisim-formu').reset();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    navbarSepetGuncelle();

    var hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('acik');
        });
    }

    if (document.getElementById('sepet-icerik')) {
        sepetiGuncelle();
    }

    var iletisimFormu = document.getElementById('iletisim-formu');
    if (iletisimFormu) {
        iletisimFormu.addEventListener('submit', formuDogrula);
    }

    var sepetBtnler = document.querySelectorAll('.sepete-ekle');
    for (var i = 0; i < sepetBtnler.length; i++) {
        sepetBtnler[i].addEventListener('click', function() {
            sepeteEkle(this.dataset.isim, parseInt(this.dataset.fiyat));
        });
    }

    var quizBtnler = document.querySelectorAll('.quiz-btn');
    for (var j = 0; j < quizBtnler.length; j++) {
        quizBtnler[j].addEventListener('click', function() {
            cevapSec(parseInt(this.dataset.soru), this.dataset.cevap);
        });
    }

    var sifirlaBtn = document.getElementById('quiz-sifirla');
    if (sifirlaBtn) {
        sifirlaBtn.addEventListener('click', quizSifirla);
    }

    var detayBtn = document.getElementById('detay-ekle');
    if (detayBtn) {
        detayBtn.addEventListener('click', function() {
            sepeteEkle(this.dataset.isim, parseInt(this.dataset.fiyat));
        });
    }

    var temizleBtn = document.getElementById('sepet-temizle');
    if (temizleBtn) {
        temizleBtn.addEventListener('click', function() {
            if (confirm('Sepeti tamamen boşaltmak istediğinize emin misiniz?')) {
                localStorage.removeItem('sepet');
                sepetiGuncelle();
                navbarSepetGuncelle();
            }
        });
    }

    var onaylaBtn = document.getElementById('sepet-onayla');
    if (onaylaBtn) {
        onaylaBtn.addEventListener('click', function() {
            var sepet = JSON.parse(localStorage.getItem('sepet')) || [];
            if (sepet.length === 0) {
                alert('Sepetiniz boş!');
            } else {
                alert('Siparişiniz alındı! Teşekkürler.');
                localStorage.removeItem('sepet');
                sepetiGuncelle();
                navbarSepetGuncelle();
            }
        });
    }
});

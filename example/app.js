document.readyState == 'loading' ? document.addEventListener('DOMContentLoaded', ready) : ready();

  function ready(){
    var removeButon = document.getElementsByClassName('btn-danger');
    for (var i = 0; i < removeButon.length; i++) {
        var button = removeButon[i]
        button.addEventListener('click', removeUrun);
    }

    var adetBilgisi = document.getElementsByClassName('sepet-adet-input');
    for (var i = 0; i < adetBilgisi.length; i++) {
        var input = adetBilgisi[i];
        input.addEventListener('change', adetDegisim);
    }

    var sepetButon = document.getElementsByClassName('urunbtn')
    for (var i = 0; i < sepetButon.length; i++) {
        var button = sepetButon[i];
        button.addEventListener('click', sepeteTikla);
    }

    document.getElementsByClassName('satinalbtn')[0].addEventListener('click', satinAlTikla);
}

 function satinAlTikla(){
    alert('Tesekkur eder, yine bekleriz');
    var sepetUrunler = document.getElementsByClassName('sepet-urunler')[0];
    while (sepetUrunler.hasChildNodes()) {
        sepetUrunler.removeChild(sepetUrunler.firstChild)
    }
    sepetiGuncelle();
}

 function removeUrun(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    sepetiGuncelle();
}

 function adetDegisim(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    sepetiGuncelle();
}

 function sepeteTikla() {
    var button = event.target;
    var urun = button.parentElement.parentElement;
    var isim = urun.getElementsByClassName('urun')[0].innerText;
    var img = urun.getElementsByClassName('urunimg')[0].src;
    var fiyat = urun.getElementsByClassName('urunfiyat')[0].innerText;
    sepeteEkle(isim, fiyat, img);
    sepetiGuncelle();
}

    function sepeteEkle(isim, fiyat, img) {
    var sepetRow = document.createElement('div');
    sepetRow.classList.add('sepet-row');
    var sepetUrunler = document.getElementsByClassName('sepet-urunler')[0];
    var urunIsim = sepetUrunler.getElementsByClassName('sepet-urun-isim');
    for (var i = 0; i < urunIsim.length; i++) {
        if (urunIsim[i].innerText == isim) {
            alert('Sepette zaten mevcut!!!')
            return
        }
    }
    var sepetContents = `
        <div class="sepet-urun sepet-sutun">
            <img class="sepet-urun-img" src="${img}" width="100" height="100">
            <span class="sepet-urun-isim">${isim}</span>
        </div>
        <span class="sepet-fiyat sepet-sutun">${fiyat}</span>
        <div class="sepet-adet sepet-sutun">
            <input class="sepet-adet-input" type="number" value="1">
            <button class="btn btn-danger" type="button">Sepetten Çıkar</button>
        </div>`;
    sepetRow.innerHTML = sepetContents;
    sepetUrunler.append(sepetRow);
    sepetRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeUrun);
    sepetRow.getElementsByClassName('sepet-adet-input')[0].addEventListener('change', adetDegisim);
}

 function sepetiGuncelle() {
    var urunBolgesi = document.getElementsByClassName('sepet-urunler')[0];
    var sepetRows = urunBolgesi.getElementsByClassName('sepet-row');
    var toplam = 0;
    for (var i = 0; i < sepetRows.length; i++) {;
        var sepetRow = sepetRows[i];
        var ucret = sepetRow.getElementsByClassName('sepet-fiyat')[0];
        var adett = sepetRow.getElementsByClassName('sepet-adet-input')[0];
        var fiyat = parseFloat(ucret.innerText.replace('TL', ''));
        var adet  = adett.value;
        toplam = toplam + (fiyat * adet);
    }
    toplam = Math.round(toplam * 100) / 100;
    document.getElementsByClassName('sepet-toplam-fiyat')[0].innerText = toplam + ' TL ';
}
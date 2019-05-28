(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Obsługa zdarzeń wstrzymywania i wznawiania działania oprogramowania Cordova
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Załadowano oprogramowanie Cordova. Wykonaj tutaj wszystkie wymagane kroki inicjowania tego oprogramowania.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    };

    function onPause() {
        // TODO: Ta aplikacja została zawieszona, Zapisz tutaj stan aplikacji.
    };

    function onResume() {
        // TODO: Ta aplikacja została ponownie aktywowana. Przywróć tutaj stan aplikacji.
    };
})();

// Funkcja obsługuje proces wyświetlenia menu.
function menuFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
};

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};

// funkcja ustawia w dropdown wybraną wartość przez użytkownika
function getItem() {
    $(".dropdown-menu a").click(function () {
        $(this).parents(".dropdown").find('.btn').html($(this).text());
        $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
    });
}

// funkcja wyświetla lub nie wyświetla danego diva.
function displayShow(idElement, bool) {
    x = document.getElementById(idElement);
    if (bool === 'true') {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function getData() {
    $(".form_datetime").datetimepicker({ format: 'yyyy-mm-dd' });
}

// plik javaScript do definowania funkcji
// metody objete w funkcjach jss 
function logIn() {
    $(".log-in").click(function () {
        $(".signIn").addClass("active-dx");
        $(".signUp").addClass("inactive-sx");
        $(".signUp").removeClass("active-sx");
        $(".signIn").removeClass("inactive-dx");
    });
}

function signIn() {
    $(".back").click(function () {
        $(".signUp").addClass("active-sx");
        $(".signIn").addClass("inactive-dx");
        $(".signIn").removeClass("active-dx");
        $(".signUp").removeClass("inactive-sx");
    });
}

// Funkcja sprawdza połączenie z internetem
function internetConnection() {
    var networkState = navigator.connection.type;
    if (networkState == 'none') {
        return "false";
    }
    else {
        return "true";
    }
}

// Metoda wykonuje zapytanie na api z quantor.pl.
function searchOffer() { 
   var e = document.getElementById("transaction");
   var transactionQuantor = e.options[e.selectedIndex].value;
   var f = document.getElementById("currency");
   var currencyQuantor = f.options[f.selectedIndex].value;
   if (this.internetConnection() === "true") {
       let xmlHttp = new XMLHttpRequest();
       xmlHttp.open("POST", "https://quantor.pl/api/cantormap", true); // false for synchronous request
       xmlHttp.setRequestHeader("X-AUTH-TOKEN", "zuBtJ6gS7Vh7Wrcf");
       xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
       xmlHttp.setRequestHeader("User-Agent", "PostmanRuntime/7.11.0");
       xmlHttp.setRequestHeader("Accept", "*/*");
       xmlHttp.setRequestHeader("Cache-Control", "no-cache");
       xmlHttp.setRequestHeader("Postman-Token", "174e13cd-4edf-4598-9953-169b3f1f2eab,430aecde-2f62-4b3e-a8cf-024b7d64a687");
       xmlHttp.setRequestHeader("Host", "quantor.pl");
       xmlHttp.setRequestHeader("cookie", "device_view=full");
       xmlHttp.setRequestHeader("accept-encoding", "gzip, deflate");
       xmlHttp.setRequestHeader("content-length", "33");
       xmlHttp.setRequestHeader("Connection", "keep-alive");
       xmlHttp.timeout = 5000;
   
       xmlHttp.addEventListener('load', function () {
           if (this.status === 200) {
               var dane = JSON.parse(this.responseText);
               createTable(dane, transactionQuantor);
               alert("rozpoczynam sortowanie");
               sortTable(transactionQuantor);
               alert("koncze sortowanie");
           }
           else {
               alert('Połączenie zakończyło się statusem ' + this.status);
           }
       });
   
       xmlHttp.addEventListener('error', function (e) {
           alert('Wystąpił błąd połączenia');
       });
   
       xmlHttp.addEventListener('timeout', function () {
           alert('Upłynął czas zapytania, proszę spróbować ponownie za chwilę');
       });
   
       xmlHttp.send("currency=" + currencyQuantor+"&transaction="+transactionQuantor);
   }
   else {
       alert("Brak dostępu do internetu");
   }
    
    //var dataFile = '{"rates":[{"saleValue": "4.610", "street": "Mickiewicza 46", "lat": "50.05762", "lot": "19.93839", "name": "Kantor Groszek", "postalCode": "31-044"},{"saleValue": "4.3530", "street": "Grodzka 46", "lat": "50.05762", "lot": "19.93839", "name": "Kantor Grodzka", "postalCode": "31-044"},{"saleValue": "4.7430", "street": "Wiejska 6", "lat": "50.05762", "lot": "19.93839", "name": "Kantor Wiejska", "postalCode": "31-044"}],"total":3}';
    //createTable(JSON.parse(dataFile), transactionQuantor);
    //sortTable(transactionQuantor);
}

// Metoda tworzy tabele z danymi uzyskanymi z quantor.pl
// Na wejściu metoda otrzymuje zmienną "dane" zawierającą odpowiedź z serwisu quantor.pl oraz typ transkacji dla jakiej została uzyskana.
function createTable(dane, transactionQuantor) {
    document.getElementById('indexId').innerHTML = "";
    var body = document.getElementsByTagName('body')[0];
    var tbl = document.createElement('table');
    tbl.setAttribute('id', "tableCurrency");
    tbl.style.width = '75%';
    tbl.style.margin = 'auto';
    tbl.setAttribute("class", "table table-striped table-dark");
    var tbdy = document.createElement('tbody');
    //koniec tworzenia tabeli
    // tutaj dodawany jest nagłówek tabel
    var trNav = document.createElement('tr');
    createTableElementTH(trNav, 'Kantor');
    createTableElementTH(trNav, 'Ulica');
    createTableElementTH(trNav, 'Kurs');
    tbdy.appendChild(trNav);
    // konieć dodawania nagłowka tabeli
    for (var step = 0; step < dane.rates.length; step++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 3; j++) {
            if ((dane.rates[step].saleValue) != 0) { // sprawdzenie czy w pliku JSON jest wartość 0 (dla sprzedaży)
                if ((dane.rates[step].purchaseValue) != 0) { // sprawdzenie czy w pliku JSON jest wartość 0 (dla kupna)
                    if (j == 0) {
                        createTableElementTD(tr, dane.rates[step].name);
                    }
                    if (j == 1) {
                        createTableElementTD(tr, dane.rates[step].street);
                    }
                    else if (j == 2) {
                        if (transactionQuantor === 'sale') { // warunek sprawdza dla jakiej transakcji ma czytac zmienną z pliku JSON
                            createTableElementTD(tr, dane.rates[step].saleValue);
                        }
                        else {
                            createTableElementTD(tr, dane.rates[step].purchaseValue);
                        }
                    }
                }
                else {
                    j = 3;
                }
            }
            else {
                j = 3;
            }
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl);
}

// Metoda tworzy tytuły nagłówkowe dla odpowiednich kolumn.
// Na wejściu metoda otrzymuje element nadrzędny tabeli oraz nazwę kolumny.
function createTableElementTH(elementTR, name) {
    var thNav = document.createElement('th');
    thNav.appendChild(document.createTextNode(name));
    thNav.setAttribute("style", "text-align:center");
    elementTR.appendChild(thNav);
}

// Metoda uzupełnia dane w odpowiedniej kolumnie.
// Na wejściu metoda otrzymuje element nadrzędny tabeli (wiersz) oraz wartość do wpisania.
function createTableElementTD(elementTR, value) {
    var td = document.createElement('td');
    td.appendChild(document.createTextNode(value));
    td.setAttribute("style", "text-align:center");
    elementTR.appendChild(td);
}


function sortTable(transaction) {
    var table, rows, switching, i, x, y, shouldSwitch;
    var counter = 0;
    table = document.getElementById("tableCurrency");
    switching = true;
    while (switching) {
        counter++;
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            alert(rows.length);
            x = rows[i].getElementsByTagName("TD")[2];
            y = rows[i + 1].getElementsByTagName("TD")[2];
            if (transaction === "sale") { // warunek sortowania dla transkacji sprzedaj
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
            else {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]); // pierwsza wartość oznacza wstawiany element a druga że przed nim ma zostać wstawiona
            switching = true;
            alert("posortowałem " + counter);
        }
    }
    alert("ilosć operacji: " + counter);
}
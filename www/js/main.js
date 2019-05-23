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
        xmlHttp.timeout = 4000;

        xmlHttp.addEventListener('load', function () {
            if (this.status === 200) {
                alert('Wynik połączenia:' + this.responseText);
            }
            else {
                alert('Połączenie zakończyło się statusem ' + this.status);
            }
        });

        xmlHttp.addEventListener('error', function (e) {
            alert('Wystąpił błąd połączenia, proszę spróbować ponownie za chwilę');
        });

        xmlHttp.addEventListener('timeout', function () {
            alert('Upłynął czas zapytania, proszę spróbować ponownie za chwilę');
        });

        xmlHttp.send("currency=" + currencyQuantor+"&transaction="+transactionQuantor);
    }
    else {
        alert("Brak dostępu do internetu");
    }
    
}


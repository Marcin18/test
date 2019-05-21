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

// funkcja obsługuje proces kliknięcia w menu wyszukiwania
function expand() {
  $(".search").toggleClass("close");
  $(".input").toggleClass("square");
  if ($('.search').hasClass('close')) {
    $('input').focus();
  } else {
    $('input').blur();
  }
}
$('button').on('click', expand);

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
var url = 'somePage.html'; //A local page

function test() {
    //var xmlHttp = new XMLHttpRequest();
    //xmlHttp.open("POST", "https://quantor.pl/api/cantormap", true); // false for synchronous request
    //xmlHttp.setRequestHeader("X-AUTH-TOKEN", "zuBtJ6gS7Vh7Wrcf");
    //xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //
    //xmlHttp.addEventListener('load', function () {
    //    if (this.status === 200) {
    //        alert('Wynik połączenia:');
    //    }
    //});
    //
    //xmlHttp.addEventListener('error', function (e) {
    //    alert('Wystąpił błąd połączenia')
    //});
    //
    //xmlHttp.send("currency=EUR&transaction=purchase");

    let xhr = new XMLHttpRequest();

    //typ połączenia, url, czy połączenie asynchroniczne
    xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true);

    xhr.addEventListener('load', function () {
        if (this.status === 200) {
            const json = JSON.parse(this.responseText);
            alert(this.responseText);
        }
    })

    xhr.send();

}


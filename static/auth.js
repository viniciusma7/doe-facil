document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("tipoDeConta")) {
        document.getElementById("userDropdown").classList.remove('d-none');
        document.getElementById("userDropdown").classList.add('d-block');
    }
});

function login() {
    let email = document.getElementById("emailLogin");

    if (email.value == "pj@gmail.com") {
        localStorage.setItem("tipoDeConta", "pj");
    } else {
        localStorage.setItem("tipoDeConta", "pf");
    }

    window.location.href = "tela_campanha.html";
}

function verificarLogin() {
    if (localStorage.getItem("tipoDeConta")){
        window.location.href = "doar.html";
    } else {
        window.location.href = "login.html";
    }
}

function logOff() {
    if (localStorage.getItem("tipoDeConta")) {
        localStorage.removeItem("tipoDeConta");
        window.location.href = "index.html";
    }
}

function levarPerfil() {
    if (localStorage.getItem("tipoDeConta")) {
        if (localStorage.getItem("tipoDeConta") === "pj") {
            window.location.href = "perfil_pj.html";
        } else if (localStorage.getItem("tipoDeConta") === "pf") {
            window.location.href = "perfil_pf.html";
        }
    } else {
        window.location.href = "login.html";
    }
}
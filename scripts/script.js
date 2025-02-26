let intervaloId;
let tempoDecorridoEmSegundos = 1500;

function alterarModo(modo, cor, tempo) {
    document.body.style.backgroundColor = cor;
    document.querySelectorAll(".modos button").forEach(btn => btn.classList.remove("ativo"));
    document.getElementById(modo).classList.add("ativo");
    zerar();
    tempoDecorridoEmSegundos = tempo;
    mostrarTempo();
}

function iniciarOuPausar() {
    const botao = document.querySelector(".btn-start");
    if (intervaloId) {
        clearInterval(intervaloId);
        intervaloId = null;
        botao.textContent = "START";
    } else {
        intervaloId = setInterval(contagemRegressiva, 1000);
        botao.textContent = "PAUSE";
    }
}

function contagemRegressiva() {
    if (tempoDecorridoEmSegundos <= 0) {
        clearInterval(intervaloId);
        alert('Tempo finalizado!');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

function zerar() {
    clearInterval(intervaloId);
    document.querySelector(".btn-start").textContent = "START";
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'});
    document.querySelector(".timer").textContent = tempoFormatado;
}

document.querySelector("#foco").addEventListener("click", function() {
    alterarModo("foco", "#cc6666", 1500);
});

document.querySelector("#pausa-curta").addEventListener("click", function() {
    alterarModo("pausa-curta", "#66cccc", 300);
});

document.querySelector("#pausa-longa").addEventListener("click", function() {
    alterarModo("pausa-longa", "#66cc99", 900);
});

document.querySelector(".btn-start").addEventListener("click", iniciarOuPausar);
mostrarTempo();
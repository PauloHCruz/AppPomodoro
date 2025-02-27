let intervaloId;
let tempoDecorridoEmSegundos = 1500;
const ciclo = [
    {modo: "foco", cor:"#cc6666", tempo:1500},
    {modo: "pausa-curta", cor:"#66cccc", tempo:300},
    {modo: "foco", cor:"#cc6666", tempo:1500},
    {modo: "pausa-curta", cor:"#66cccc", tempo:300},
    {modo: "foco", cor:"#cc6666", tempo:1500},
    {modo: "pausa-curta", cor:"#66cccc", tempo:300},
    {modo: "foco", cor:"#cc6666", tempo:1500},
    {modo: "pausa-longa", cor:"#66cc99", tempo:900}    
];
let cicloAtual = 0;
let cicloAguardandoStart = false;

function alterarModo(modo, cor, tempo) {
    document.body.style.backgroundColor = cor;
    document.querySelectorAll(".modos button").forEach(btn => btn.classList.remove("ativo"));
    document.getElementById(modo).classList.add("ativo");
    zerar();
    tempoDecorridoEmSegundos = tempo;
    mostrarTempo();
    cicloAguardandoStart = false;
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

function avancarCiclo(){
    cicloAtual = (cicloAtual + 1) % ciclo.length;
    const {modo, cor, tempo} = ciclo[cicloAtual];
    alterarModo(modo, cor, tempo);
    cicloAguardandoStart = true;

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

document.querySelector(".btn-start").addEventListener("click", function () {
    if(cicloAguardandoStart){
        iniciarOuPausar();
        cicloAguardandoStart = false;
    }else{
        iniciarOuPausar()
    }

});

document.querySelector("#avancar").addEventListener("click", function(){
    avancarCiclo()
})

function resetarTimer(){
    clearInterval(intervaloId);
    const {tempo} = ciclo[cicloAtual];
    tempoDecorridoEmSegundos = tempo;
    mostrarTempo();
    document.querySelector(".btn-start").textContent = "START";
    intervaloId = null;
}

document.querySelector("#reset").addEventListener("click", function(){
    resetarTimer();
})
mostrarTempo();
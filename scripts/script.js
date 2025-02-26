function alternarModo(modo,cor){
    document.body.style.backgroundColor = cor;
    document.querySelectorAll(".modos button").forEach(btn => btn.classList.remove("ativo"));
    document.getElementById(modo).classList.add("ativo");
}

document.querySelector("#foco").addEventListener("click",function(){
    alternarModo("foco","#cc6666");
});

document.querySelector("#pausa-curta").addEventListener("click",function(){
    alternarModo("pausa-curta","#66cccc")
});

document.querySelector("#pausa-longa").addEventListener("click",function(){
    alternarModo("pausa-longa","#66cc99")
});
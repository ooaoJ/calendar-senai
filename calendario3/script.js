const dataAtual = document.querySelector(".data-atual"),
diasTag = document.querySelector(".dias"),
passarProximoIcone = document.querySelectorAll(".icones i");

let data = new Date(),
anoAtual = data.getFullYear(),
mesAtual = data.getMonth(),
diaAtual = data.getDate();

console.log(anoAtual, mesAtual);

const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const atualizarCalendario = () => {
    let primeiroDiaDoMes = new Date(anoAtual, mesAtual, 1).getDay(), // primeiro dia do mês atual
    ultimaDataDoMes = new Date(anoAtual, mesAtual + 1, 0).getDate(), // última data do mês atual
    ultimoDiaDoMes = new Date(anoAtual, mesAtual, ultimaDataDoMes).getDay(), // último dia do mês atual
    ultimoDiaMesPassado = new Date(anoAtual, mesAtual, 0).getDate(); // último dia do mês passado
    let listTag = "";

    for (let i = primeiroDiaDoMes; i > 0; i--) {
        listTag += `<li class="inativo fadeIn" id="prev${ultimoDiaMesPassado - i + 1}" onclick="selectDay(${ultimoDiaMesPassado - i + 1}, ${mesAtual === 0 ? 12 : mesAtual}, ${mesAtual === 0 ? anoAtual - 1 : anoAtual})">${ultimoDiaMesPassado - i + 1}</li>`;
    }
    for (let i = 1; i <= ultimaDataDoMes; i++) {
        let classeDiaAtual = i === data.getDate() && mesAtual === new Date().getMonth() && anoAtual === new Date().getFullYear() ? "diaAtual" : "";
        listTag += `<li class="${classeDiaAtual} fadeIn" id="day${i}" onclick="selectDay(${i}, ${mesAtual + 1}, ${anoAtual})">${i}</li>`;
    }
    for (let i = ultimoDiaDoMes + 1, dia = 1; i <= 6; i++, dia++) {
        listTag += `<li class="inativo fadeIn" id="next${dia}" onclick="selectDay(${dia}, ${mesAtual === 11 ? 1 : mesAtual + 2}, ${mesAtual === 11 ? anoAtual + 1 : anoAtual})">${dia}</li>`;
    }
    dataAtual.innerHTML = `${meses[mesAtual]} ${anoAtual}`;
    diasTag.innerHTML = listTag;
};

atualizarCalendario();

passarProximoIcone.forEach(icon => {
    icon.addEventListener("click", () => {
        if (icon.id === "before") {
            mesAtual--;
            if (mesAtual < 0) {
                mesAtual = 11;
                anoAtual--;
            }
        } else {
            mesAtual++;
            if (mesAtual > 11) {
                mesAtual = 0;
                anoAtual++;
            }
        }
        atualizarCalendario();
    });
});

function selectDay(dia, mes, ano) {
    document.getElementById('selectDayText').innerHTML = `Dia selecionado: ${dia} / ${mes} / ${ano}`;
    document.getElementById('selectDayText').className = 'fadeIn'
}
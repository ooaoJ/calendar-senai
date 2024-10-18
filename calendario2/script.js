const dataAtual = document.querySelector(".data-atual"),
      diasTag = document.querySelector(".dias"),
      passarProximoIcone = document.querySelectorAll(".icones i");
let data = new Date(),
    anoAtual = data.getFullYear(),
    mesAtual = data.getMonth();
const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const atualizarCalendario = () => {
    let primeiroDiaDoMes = new Date(anoAtual, mesAtual, 1).getDay(),
        ultimaDataDoMes = new Date(anoAtual, mesAtual + 1, 0).getDate(),
        ultimoDiaDoMes = new Date(anoAtual, mesAtual, ultimaDataDoMes).getDay(),
        ultimoDiaMesPassado = new Date(anoAtual, mesAtual, 0).getDate(),
        listTag = "";
    for (let i = primeiroDiaDoMes; i > 0; i--)
        listTag += `<li class="inativo" onclick="selectDay(${ultimoDiaMesPassado - i + 1}, ${mesAtual || 12}, ${mesAtual ? anoAtual : anoAtual - 1})">${ultimoDiaMesPassado - i + 1}</li>`;
    for (let i = 1; i <= ultimaDataDoMes; i++)
        listTag += `<li class="${i === data.getDate() && mesAtual === data.getMonth() && anoAtual === data.getFullYear() ? "diaAtual" : ""}" onclick="selectDay(${i}, ${mesAtual + 1}, ${anoAtual})">${i}</li>`;
    for (let i = ultimoDiaDoMes + 1, dia = 1; i <= 6; i++, dia++)
        listTag += `<li class="inativo" onclick="selectDay(${dia}, ${mesAtual === 11 ? 1 : mesAtual + 2}, ${mesAtual === 11 ? anoAtual + 1 : anoAtual})">${dia}</li>`;
    dataAtual.innerHTML = `${meses[mesAtual]} ${anoAtual}`;
    diasTag.innerHTML = listTag;
};
passarProximoIcone.forEach(icon => 
    icon.addEventListener("click", () => {
        mesAtual = icon.id === "before" ? (mesAtual || 12) - 1 : (mesAtual + 1) % 12;
        anoAtual += mesAtual === 11 && icon.id === "before" ? -1 : mesAtual === 0 && icon.id !== "before" ? 1 : 0;
        atualizarCalendario();
    })
);
function selectDay(dia, mes, ano) {
    document.getElementById('selectDayText').innerHTML = `Dia selecionado: ${dia} / ${mes} / ${ano}`;
}
atualizarCalendario();
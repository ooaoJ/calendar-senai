const dataAtual = document.querySelector(".data-atual"),
diasTag = document.querySelector(".dias"),
    passarProximoIcone = document.querySelectorAll(".icones i");

let data = new Date(),
    anoAtual = data.getFullYear(),
    mesAtual = data.getMonth(),
    diaAtual = data.getDate();

const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const atualizarCalendario = () => {
    diasTag.classList.add('fadeOut');

    let primeiroDiaDoMes = new Date(anoAtual, mesAtual, 1).getDay(),
        ultimaDataDoMes = new Date(anoAtual, mesAtual + 1, 0).getDate(),
        ultimoDiaMesPassado = new Date(anoAtual, mesAtual, 0).getDate();

    let listTag = "";

    for (let i = primeiroDiaDoMes; i > 0; i--) {
        listTag += `<li class="inativo fadeIn" id="prev${ultimoDiaMesPassado - i + 1}" onclick="openModal(${ultimoDiaMesPassado - i + 1}, ${mesAtual === 0 ? 12 : mesAtual}, ${mesAtual === 0 ? anoAtual - 1 : anoAtual})">${ultimoDiaMesPassado - i + 1}</li>`;
    }

    for (let i = 1; i <= ultimaDataDoMes; i++) {
        let classeDiaAtual = i === diaAtual && mesAtual === new Date().getMonth() && anoAtual === new Date().getFullYear() ? "diaAtual" : "";
        listTag += `<li class="${classeDiaAtual} fadeIn" id="day${i}" onclick="openModal(${i}, ${mesAtual + 1}, ${anoAtual})">${i}</li>`;
    }

    const diasExtras = 42 - (primeiroDiaDoMes + ultimaDataDoMes);
    for (let i = 1; i <= diasExtras; i++) {
        listTag += `<li class="inativo fadeIn" id="next${i}" onclick="openModal(${i}, ${mesAtual === 11 ? 1 : mesAtual + 2}, ${mesAtual === 11 ? anoAtual + 1 : anoAtual})">${i}</li>`;
    }

    dataAtual.innerHTML = `${meses[mesAtual]} ${anoAtual}`;
    diasTag.innerHTML = listTag;

    diasTag.classList.remove('fadeOut');
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

function openMenu() {
    let linha1 = document.getElementById('linha1'),
        linha2 = document.getElementById('linha2'),
        linha3 = document.getElementById('linha3'),
        menu = document.getElementById('menu');

    if (menu.classList.contains('menu-aberto')) {
        menu.classList.remove('menu-aberto');
        linha1.style.transform = 'rotate(0deg) translateY(0)';
        linha2.style.opacity = '1';
        linha3.style.transform = 'rotate(0deg) translateY(0)';
    } else {
        menu.classList.add('menu-aberto');
        linha1.style.transform = 'rotate(45deg) translateY(12px)';
        linha2.style.opacity = '0';
        linha3.style.transform = 'rotate(-45deg) translateY(-15px)';
    }
}

function mudarTema(){
    let tema = document.getElementById('tema-link');
    let temaText = document.getElementById('tema');
    if (tema.href.includes("css/styles.css")) {
        tema.href = "css/whiteMode.css";
        temaText.innerHTML = 'Tema escuro';
    } else {
        tema.href = "css/styles.css";
        temaText.innerHTML = 'Tema claro';
    }
}

const atualizarTituloSemanal = (mes, ano) => {
    document.querySelector("#calendarioSemanal .data-atual").innerHTML = `${meses[mes]} ${ano}`;
};

const preencherSemanal = () => {
    let diasSemanaisTag = document.querySelector("#calendarioSemanal .dias");
    let dataSelecionada = new Date(anoAtual, mesAtual, diaAtual);
    let primeiroDiaDaSemana = dataSelecionada.getDate() - dataSelecionada.getDay();

    diasSemanaisTag.innerHTML = "";

    for (let i = 0; i < 7; i++) {
        let diaAtualSemana = new Date(dataSelecionada.setDate(primeiroDiaDaSemana + i));
        let classeDiaAtual = (diaAtualSemana.getDate() === data.getDate() && diaAtualSemana.getMonth() === data.getMonth() && diaAtualSemana.getFullYear() === data.getFullYear()) ? "diaAtual" : ""; 
        diasSemanaisTag.innerHTML += `<li class="${classeDiaAtual}">${diaAtualSemana.getDate()}</li>`;
    }
    
    atualizarTituloSemanal(mesAtual, anoAtual); 
};

document.getElementById("beforeSemanal").addEventListener("click", () => {
    diaAtual -= 7;
    let novaData = new Date(anoAtual, mesAtual, diaAtual);
    anoAtual = novaData.getFullYear();
    mesAtual = novaData.getMonth();
    diaAtual = novaData.getDate();
    preencherSemanal();
});

document.getElementById("afterSemanal").addEventListener("click", () => {
    diaAtual += 7;
    let novaData = new Date(anoAtual, mesAtual, diaAtual);
    anoAtual = novaData.getFullYear();
    mesAtual = novaData.getMonth();
    diaAtual = novaData.getDate();
    preencherSemanal();
});

function mudarFormato() {
    let calendarioMensal = document.getElementById('calendario');
    let calendarioSemanal = document.getElementById('calendarioSemanal');

    if (calendarioSemanal.style.display === 'none') {
        calendarioMensal.style.display = 'none';
        calendarioSemanal.style.display = 'block';
        document.getElementById('formato').innerHTML = 'Calendário Mensal';
        preencherSemanal();
    } else {
        calendarioMensal.style.display = 'block';
        calendarioSemanal.style.display = 'none';
        document.getElementById('formato').innerHTML = 'Calendário Semanal';
    }
}

function openModal(dia, mes, ano){
    let modal = document.getElementById('modal');

    modal.style.display = 'flex';

    document.getElementById('dayModalAction').textContent = `${dia}/${mes}/${ano}`;
    document.getElementById('data_evento').value = `${ano}-${mes}-${dia}`;

    carregarEventos();
}

function closeModal(){
    let modal = document.getElementById('modal');
    let modalAction = document.getElementById('modalAction');
    
    modal.style.display = 'none';
    modalAction.style.display = 'none';
}

function addEventModal(){
    let modal = document.getElementById('modal');
    let modalAction = document.getElementById('modalAction')

    modal.style.display = 'none';
    modalAction.style.display = 'flex';
    console.log(document.getElementById('data_evento').value)
}
function carregarEventos(data) {
    data = document.getElementById('data_evento').value;

    const params = new URLSearchParams({ data: data });
    
    fetch(`php/getEvent.php?${params.toString()}`)
        .then(response => response.json())
        .then(events => {
            const eventContainer = document.querySelector('.eventContainer');
            eventContainer.innerHTML = '';
            events.forEach(event => {
                const eventDiv = document.createElement('div');
                eventDiv.textContent = `${event.titulo} - ${event.data_evento}`;
                eventContainer.appendChild(eventDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar eventos:', error));
}

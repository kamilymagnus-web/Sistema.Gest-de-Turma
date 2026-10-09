const QTD_ALUNOS = 5;
const QTD_ATIVIDADES = 4;

let nomes = [];
let notas = [];      // notas[i] é a linha do aluno i (vazia até salvar as notas)
let medias = [];
let situacoes = [];

// ===== Elementos da página =====
const inputNome = document.getElementById("nomeAluno");
const listaAlunos = document.getElementById("listaAlunos");
const selectAluno = document.getElementById("alunoNota");
const corpoTabela = document.getElementById("corpoTabela");
const inputBusca = document.getElementById("buscaAluno");
const resultadoBusca = document.getElementById("resultadoBusca");
const visualizacaoMatriz = document.getElementById("visualizacaoMatriz");

// ===== Funções auxiliares =====
function criarCelula(tag, texto) {
    let celula = document.createElement(tag);
    celula.textContent = texto;
    return celula;
}

function montarTextoNotas(indice) {
    let texto = "";
    for (let j = 0; j < QTD_ATIVIDADES; j++) {
        texto = texto + notas[indice][j];
        if (j < QTD_ATIVIDADES - 1) {
            texto = texto + " | ";
        }
    }
    return texto;
}

function dadosCompletos() {
    if (nomes.length < QTD_ALUNOS) {
        alert("Cadastre os " + QTD_ALUNOS + " alunos primeiro.");
        return false;
    }
    for (let i = 0; i < QTD_ALUNOS; i++) {
        if (notas[i].length < QTD_ATIVIDADES) {
            alert("Falta registrar as notas de " + nomes[i] + ".");
            return false;
        }
    }
    return true;
}
// ===== Etapa 1: cadastro de alunos =====
function adicionarAluno() {
    let nome = inputNome.value.trim();

    if (nome === "") {
        alert("Digite o nome do aluno.");
        return;
    }
    if (nomes.length >= QTD_ALUNOS) {
        alert("A turma já tem " + QTD_ALUNOS + " alunos.");
        return;
    }
    for (let i = 0; i < nomes.length; i++) {
        if (nomes[i].toLowerCase() === nome.toLowerCase()) {
        alert("Esse aluno já foi cadastrado.");
        return;
        }
    }
    nomes.push(nome);
    notas.push([]);
    
    inputNome.value = "";
    inputNome.focus();
    
    atualizarListaAlunos();
    atualizarSelect();
    atualizarMatriz();
}
function atualizarListaAlunos() {
    listaAlunos.innerHTML = "";
    for (let i = 0; i < nomes.length; i++) {
        let item = document.createElement("li");
        item.textContent = nomes[i];
        if (notas[i].length === QTD_ATIVIDADES) {
            item.textContent = nomes[i] + " (notas salvas)";
        }
        listaAlunos.appendChild(item);
    }
}

function atualizarSelect() {
    selectAluno.innerHTML = '<option value="">Selecione um aluno</option>';
    for (let i = 0; i < nomes.length; i++) {
        let opcao = document.createElement("option");
        opcao.value = i;
        opcao.textContent = nomes[i];
        selectAluno.appendChild(opcao);
    }
}
// ===== Etapas 2 e 3: matriz de notas com validação =====
function salvarNotas() {
    if (selectAluno.value === "") {
        alert("Selecione um aluno.");
        return;
    }
    let indice = Number(selectAluno.value);
    let linha = [];

    for (let j = 0; j < QTD_ATIVIDADES; j++) {
        let campo = document.getElementById("nota" + (j + 1));

        if (campo.value === "") {
            alert("Preencha a nota da Atividade " + (j + 1) + ".");
            return;
        }
    
        let nota = Number(campo.value);

        if (isNaN(nota) || nota < 0 || nota > 10) {
            alert("Nota inválida na Atividade " + (j + 1) + ". Digite um valor entre 0 e 10.");
            return;
        }
        linha.push(nota);
    }
    notas[indice] = linha;
    for (let j = 0; j < QTD_ATIVIDADES; j++) {
        document.getElementById("nota" + (j + 1)).value = "";
    }
    selectAluno.value = "";
    atualizarListaAlunos();
    atualizarMatriz();
}
// ===== Etapas 4 e 5: médias e situações =====
function calcularMedias() {
    medias = [];
    situacoes = [];
    for (let i = 0; i < QTD_ALUNOS; i++) {
        let soma = 0;
        for (let j = 0; j < QTD_ATIVIDADES; j++) {
            soma = soma + notas[i][j];
        }
        let media = soma / QTD_ATIVIDADES;
        medias.push(media);

        let situacao;
        if (media >= 7) {
            situacao = "APROVADO";
        } else if (media >= 5) {
            situacao = "RECUPERAÇÃO";
        } else {
            situacao = "REPROVADO";
        }
        situacoes.push(situacao);
    }
}
// ===== Etapa 6: relatório =====
function preencherTabela() {
    corpoTabela.innerHTML = "";

    for (let i = 0; i < QTD_ALUNOS; i++) {
        let linha = document.createElement("tr");
        linha.appendChild(criarCelula("td", nomes[i]));

        for (let j = 0; j < QTD_ATIVIDADES; j++) {
            linha.appendChild(criarCelula("td", notas[i][j].toFixed(1)));
        }

        linha.appendChild(criarCelula("td", medias[i].toFixed(1)));
        linha.appendChild(criarCelula("td", situacoes[i]));
        corpoTabela.appendChild(linha);
    }
}

// ===== Etapa 7: estatísticas =====
function preencherEstatisticas() {
  let aprovados = 0;
  let recuperacao = 0;
  let reprovados = 0;
  let somaMedias = 0;
 
  let maiorMedia = medias[0];
  let menorMedia = medias[0];
 
  for (let i = 0; i < QTD_ALUNOS; i++) {
    if (situacoes[i] === "APROVADO") {
      aprovados++;
    } else if (situacoes[i] === "RECUPERAÇÃO") {
      recuperacao++;
    } else {
      reprovados++;
    }
 
    somaMedias = somaMedias + medias[i];
 
    if (medias[i] > maiorMedia) {
      maiorMedia = medias[i];
    }
    if (medias[i] < menorMedia) {
      menorMedia = medias[i];
    }
  }
 
  let mediaGeral = somaMedias / QTD_ALUNOS;
 
  document.getElementById("totalAprovados").textContent = aprovados;
  document.getElementById("totalRecuperacao").textContent = recuperacao;
  document.getElementById("totalReprovados").textContent = reprovados;
  document.getElementById("mediaGeral").textContent = mediaGeral.toFixed(1);
  document.getElementById("maiorMedia").textContent = maiorMedia.toFixed(1);
  document.getElementById("menorMedia").textContent = menorMedia.toFixed(1);
}
 
// ===== Etapa 8: destaque =====
function preencherDestaque() {
  let indiceDestaque = 0;
 
  for (let i = 1; i < QTD_ALUNOS; i++) {
    if (medias[i] > medias[indiceDestaque]) {
      indiceDestaque = i;
    }
  }
 
  document.getElementById("nomeDestaque").textContent = nomes[indiceDestaque];
  document.getElementById("mediaDestaque").textContent =
    "Média: " + medias[indiceDestaque].toFixed(1);
}
 
// ===== Etapa 9: desempenho por atividade =====
function preencherAtividades() {
  let mediasAtividades = [];
 
  for (let j = 0; j < QTD_ATIVIDADES; j++) {
    let soma = 0;
    for (let i = 0; i < QTD_ALUNOS; i++) {
      soma = soma + notas[i][j];
    }
 
    let mediaAtiv = soma / QTD_ALUNOS;
    mediasAtividades.push(mediaAtiv);
    document.getElementById("mediaAtividade" + (j + 1)).textContent = mediaAtiv.toFixed(1);
  }
 
  let indiceMelhor = 0;
  for (let j = 1; j < QTD_ATIVIDADES; j++) {
    if (mediasAtividades[j] > mediasAtividades[indiceMelhor]) {
      indiceMelhor = j;
    }
  }
 
  document.getElementById("melhorAtividade").textContent =
    "Atividade " + (indiceMelhor + 1) + " (média " + mediasAtividades[indiceMelhor].toFixed(1) + ")";
}
 
// Botão "Gerar relatório": roda as etapas 4 a 9
function gerarRelatorio() {
  if (!dadosCompletos()) {
    return;
  }
  calcularMedias();
  preencherTabela();
  preencherEstatisticas();
  preencherDestaque();
  preencherAtividades();
}
 
// ===== Etapa 10: consulta de aluno =====
function escreverResultado(textos) {
  resultadoBusca.innerHTML = "";
  for (let i = 0; i < textos.length; i++) {
    let p = document.createElement("p");
    p.textContent = textos[i];
    resultadoBusca.appendChild(p);
  }
}
 
function buscarAluno() {
  let busca = inputBusca.value.trim();
 
  if (busca === "") {
    alert("Digite o nome do aluno.");
    return;
  }
  if (!dadosCompletos()) {
    return;
  }
 
  calcularMedias();
 
  let posicao = -1;
  for (let i = 0; i < QTD_ALUNOS; i++) {
    if (nomes[i].toLowerCase() === busca.toLowerCase()) {
      posicao = i;
    }
  }
 
  if (posicao === -1) {
    escreverResultado(["Aluno não encontrado."]);
  } else {
    escreverResultado([
      "Aluno encontrado!",
      "Nome: " + nomes[posicao],
      "Notas: " + montarTextoNotas(posicao),
      "Média: " + medias[posicao].toFixed(1),
      "Situação: " + situacoes[posicao]
    ]);
  }
}
 
// ===== Visualização da matriz =====
function atualizarMatriz() {
  let tabela = document.createElement("table");
 
  let cabecalho = document.createElement("tr");
  cabecalho.appendChild(criarCelula("th", "Aluno"));
  for (let j = 0; j < QTD_ATIVIDADES; j++) {
    cabecalho.appendChild(criarCelula("th", "Ativ. " + (j + 1)));
  }
  tabela.appendChild(cabecalho);
 
  for (let i = 0; i < nomes.length; i++) {
    let linha = document.createElement("tr");
    linha.appendChild(criarCelula("td", nomes[i]));
 
    for (let j = 0; j < QTD_ATIVIDADES; j++) {
      let valor = "-";
      if (notas[i][j] !== undefined) {
        valor = notas[i][j].toFixed(1);
      }
      linha.appendChild(criarCelula("td", valor));
    }
    tabela.appendChild(linha);
  }
 
  visualizacaoMatriz.innerHTML = "";
  visualizacaoMatriz.appendChild(tabela);
}
 
// ===== Eventos =====
document.getElementById("btnAdicionarAluno").addEventListener("click", adicionarAluno);
document.getElementById("btnSalvarNotas").addEventListener("click", salvarNotas);
document.getElementById("btnGerarRelatorio").addEventListener("click", gerarRelatorio);
document.getElementById("btnBuscarAluno").addEventListener("click", buscarAluno);
 
inputNome.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    adicionarAluno();
  }
});
inputBusca.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    buscarAluno();
  }
});
 
atualizarMatriz();








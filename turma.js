const prompt = require ("prompt-sync")();

const QTD_ALUNOS = 5;
const QTD_ATIVIDADES = 4;

// ===== ETAPAS 1 a 3: cadastro (acontece uma vez) =====
let nomes = [];

for (let i = 0; i < QTD_ALUNOS; i++) {
    let nome = prompt("Nome do aluno " + (i + 1) + ": ");
    nomes.push(nome);
}

let notas = [];

for (let i = 0; i < QTD_ALUNOS; i++) {
    console.log("Notas de " + nomes[i]);
    let linha = [];

    for (let j = 0; j < QTD_ATIVIDADES; j++) {
        let nota = Number(prompt("Atividade " + (j + 1) + ": "));

        while (nota < 0 || nota > 10) {
            console.log("Nota inválida!");
            nota = Number(prompt("Digite novamente uma nota entre 0 e 10: "));
        }
        linha.push(nota);
    }
    notas.push(linha);
}
// ===== ETAPAS 4 e 5: médias e situações =====
let medias = [];
let situacoes = [];

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
// ===== ETAPA 7: estatísticas =====
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
// ===== ETAPA 8: destaque (só calcula o índice) =====
let indiceDestaque = 0;

for (let i = 1; i < QTD_ALUNOS; i++) {
    if (medias[i] > medias[indiceDestaque]) {
        indiceDestaque = i;
    }
}
// ===== ETAPA 9: médias das atividades (só calcula) =====
let mediasAtividades = [];

for (let j = 0; j < QTD_ATIVIDADES; j++) {
    let soma = 0;
    for (let i = 0; i < QTD_ALUNOS; i++) {
        soma = soma + notas[i][j];
    }
    mediasAtividades.push(soma / QTD_ALUNOS);
}

let indiceMelhorAtividade = 0;

for (let j = 1; j < QTD_ATIVIDADES; j++) {
    if (mediasAtividades[j] > mediasAtividades[indiceMelhorAtividade]) {
        indiceMelhorAtividade = j;
    }
}

// ===== ETAPA 11: menu =====
let opcao = -1;
while (opcao !== 0) {
    console.log("========= SISTEMA DA TURMA =========");
    console.log("1 - Exibir todos os alunos");
    console.log("2 - Consultar aluno");
    console.log("3 - Exibir estatísticas da turma");
    console.log("4 - Exibir médias das atividades");
    console.log("5 - Exibir destaque da turma");
    console.log("0 - Encerrar");

    opcao = Number(prompt("Escolha uma opção: "));

    if (opcao === 1) {
        console.log("======= RELATÓRIO DA TURMA =======");
        for (let i = 0; i < QTD_ALUNOS; i++) {
            let textoNotas = "";
            for (let j = 0; j < QTD_ATIVIDADES; j++) {
                textoNotas = textoNotas + notas[i][j];
                if (j < QTD_ATIVIDADES - 1) {
                    textoNotas = textoNotas + " | ";
                }
            }
            console.log("Aluno: " + nomes[i]);
            console.log("Notas: " + textoNotas);
            console.log("Média: " + medias[i].toFixed(1) + " - " + situacoes[i]);
            console.log("-".repeat(28));
        }
    } else if (opcao === 2) {
        let busca = prompt("Digite o nome do aluno: ") || "";
        let posicao = -1;

        for (let i = 0; i < QTD_ALUNOS; i++) {
            if (nomes[i].toLowerCase() === busca.toLowerCase()) {
                posicao = i;
            }
        }
        if (posicao === -1) {
        console.log("Aluno não encontrado.");
        } else {
            console.log("Aluno encontrado!");
            console.log("Nome: " + nomes[posicao]);
                
            let textoNotas = "";
            for (let j = 0; j < QTD_ATIVIDADES; j++) {
                textoNotas = textoNotas + notas[posicao][j];
                if (j < QTD_ATIVIDADES - 1) {
                    textoNotas = textoNotas + " | ";
                }
            }
            console.log("Notas: " + textoNotas);
            console.log("Média: " + medias[posicao].toFixed(1));
            console.log("Situação: " + situacoes[posicao]);
        }
    } else if (opcao === 3) {
        console.log("Aprovados: " + aprovados);
        console.log("Recuperação: " + recuperacao);
        console.log("Reprovados: " + reprovados);
        console.log("Média geral: " + mediaGeral.toFixed(1));
        console.log("Maior média: " + maiorMedia.toFixed(1));
        console.log("Menor média: " + menorMedia.toFixed(1));
    } else if (opcao === 4) {
        for (let j = 0; j < QTD_ATIVIDADES; j++) {
            console.log("Atividade " + (j + 1) + ": média " + mediasAtividades[j].toFixed(1));
        }
        console.log("Melhor desempenho: Atividade " + (indiceMelhorAtividade + 1));
    } else if (opcao === 5) {
        console.log("Destaque da turma:");
        console.log(nomes[indiceDestaque]);
        console.log("Média: " + medias[indiceDestaque].toFixed(1));
    } else if (opcao === 0) {
        console.log("Encerrando o sistema...");
    } else {
        console.log("Opção inválida!");
    }   
}








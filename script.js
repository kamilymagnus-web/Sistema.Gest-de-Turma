const QTD_ALUNOS = 5;
const QTD_ATIVIDADES = 4;

let nomes = [];

for (let i = 0; i < QTD_ALUNOS; i++) {
    let nome = prompt("Nome do aluno " + (i + 1) + ": ");
    nomes.push(nome);
}
console.log(nomes);

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
console.log(notas);

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
    console.log(medias);
    console.log(situacoes);

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

        let indiceDestaque = 0;
        
        for (let i = 1; i < QTD_ALUNOS; i++) {
            if (medias[i] > medias[indiceDestaque]) {
                indiceDestaque = i;
            }
        }    
        console.log("Destaque da turma:");
        console.log(nomes[indiceDestaque]);
        console.log("Média: " + medias[indiceDestaque].toFixed(1));

        let mediasAtividades = [];

        for (let j = 0; j < QTD_ATIVIDADES; j++) {   
                let soma = 0;
                for (let i = 0; i < QTD_ALUNOS; i++) {      
                    soma = soma + notas[i][j];
                }
        
                let mediaAtiv = soma / QTD_ALUNOS;
                mediasAtividades.push(mediaAtiv);
                console.log("Atividade " + (j + 1) + ": média " + mediaAtiv.toFixed(1));
            }    
            let indiceMelhorAtividade = 0;
                
            for (let j = 1; j < QTD_ATIVIDADES; j++) {
                if (mediasAtividades[j] > mediasAtividades[indiceMelhorAtividade]) {
                    indiceMelhorAtividade = j;
                }
            }   
            console.log("Melhor desempenho: Atividade " + (indiceMelhorAtividade + 1));




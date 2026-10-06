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
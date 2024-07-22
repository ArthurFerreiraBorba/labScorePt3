let quantidadeMateris = 1

const getInput = async (title, inputLabel, failmsg, validator) =>
  Swal.fire({
    title,
    input: "text",
    inputLabel,
    showCancelButton: true,
    inputValidator: 
       (value) => {
          if (!value) return failmsg;
          if(validator) return validator(value);
        },
  });

function carregarDadosAluno() {

  let nome =  localStorage.getItem("nome")
  let idade =  localStorage.getItem("idade")
  let serie =  localStorage.getItem("serie")
  let escola =  localStorage.getItem("escola")
  let materia =  localStorage.getItem("materiaFavorita")
  let cep =  localStorage.getItem("cep")
  let rua =  localStorage.getItem("rua")
  let cidade =  localStorage.getItem("cidade")
  let estado =  localStorage.getItem("estado")

  if(nome && idade && serie && escola && materia && cep && rua && cidade && estado)  {
    document.getElementById("nome-aluno").innerText = nome
    document.getElementById("idade-aluno").innerText = idade
    document.getElementById("serie-aluno").innerText = serie
    document.getElementById("escola-aluno").innerText = escola
    document.getElementById("materia-aluno").innerText = materia
  } else {
    localStorage.clear()
    window.location = "http://127.0.0.1:5500/login.html"
  }

  let notasMateria
  
  do {

    notasMateria = JSON.parse(localStorage.getItem(`materia${quantidadeMateris}`))
    
    if (notasMateria) {

      let media = calcularMedia(notasMateria.notas);

      let tbody = document.getElementById("tbody-notas");
      let htmlnotas = `<tr><th>${notasMateria.nome}</th>`;
      notasMateria.notas.forEach((nota) => htmlnotas += `<td>${nota.toFixed(1).toString().replace(".",",")}</td>`);
      htmlnotas += `<td>${media.toString().replace(".",",")}</td></tr>`;

      tbody.innerHTML += htmlnotas;

      quantidadeMateris++
    }
  } while (notasMateria)

  atualizarMedias();
}

// calcular a media das notas
const calcularMedia = (notas) => {
  let soma = notas.reduce(
    (acumulador, valorAtual) => acumulador + valorAtual,
    0
  );
  if(soma == 0) return;
  return (soma / notas.length).toFixed(1);
}

// adicionar uma nova linha na tabela
const adicionarMateria = async (event) => {
  event.preventDefault(); // Arruma o bug duplo ao executar a funcao

  let novaMateria = {
    nome: "",
    notas: []
  }

  novaMateria.nome = (
    await getInput("Qual o nome da materia deseja adicionar?", "Matéria", "Matéria não informada!")
  )?.value;
  if(!novaMateria.nome) return;

  let nota;
  let i = 0;

  while (i < 4) {
    //nota = parseFloat(prompt(`digite a nota ${i + 1} da materia ${nome}:`));
    nota = (
        await getInput(`Digite a nota ${i + 1} da matéria ${novaMateria.nome}:`, "Nota", "Nota não informada!",(value) => {
            if (isNaN(value) || value < 0 || value > 10)
              return "Nota inválida! Insira um valor valido entre 0 e 10.";
          })
      )?.value
    if(!nota) continue;
    nota = parseFloat(nota.replace(",","."));
    novaMateria.notas.push(nota);
    i++;    
  }

  let media = calcularMedia(novaMateria.notas);

  let tbody = document.getElementById("tbody-notas");
  let htmlnotas = `<tr><th>${novaMateria.nome}</th>`;
  novaMateria.notas.forEach((nota) => htmlnotas += `<td>${nota.toFixed(1).toString().replace(".",",")}</td>`);
  htmlnotas += `<td>${media.toString().replace(".",",")}</td></tr>`;

  tbody.innerHTML += htmlnotas;

  localStorage.setItem(`materia${quantidadeMateris}`, JSON.stringify(novaMateria))
  quantidadeMateris++

  // Atualiza a média geral
  atualizarMedias();
}

const atualizarMedias = () => {
  let todasNotas = [];
  let medias = document.querySelectorAll("#tbody-notas tr td:last-child");
  medias.forEach((td) => todasNotas.push(parseFloat(td.textContent)));

  let mediaGeral = calcularMedia(todasNotas)?.toString().replace(".",",");
  document.getElementById("media-geral").textContent = mediaGeral;

  let maiorMedia = Math.max(...todasNotas)?.toFixed(1).toString().replace(".",",");
  document.getElementById("maior-media").textContent = maiorMedia;
}

document
  .querySelector("#addLinha")
  .addEventListener("click", adicionarMateria);

//window.onload = obterDadosAluno; // executa as perguntas ao carregar a pagina

window.onload = () => {
  carregarDadosAluno();
};

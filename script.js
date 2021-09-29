var etapas = [
  {
    titulo: "VEREADOR",
    numeros: 5,
    canditatos: [
      {
        numero: "38111",
        nome: "Shinji",
        partido: "EVA",
        fotos: [
          {
            Url:
              "https://4.bp.blogspot.com/-4_k5GOzmu50/TzX7HvYxopI/AAAAAAAAYCQ/6dqIGLMYzHI/s1600/shinji+ikari.jpg",
            legenda: "Vereador"
          }
        ]
      },
      {
        numero: "77222",
        nome: "Dianho",
        partido: "Guri",
        fotos: [
          {
            Url:
              "https://loja.qodcosmetics.com/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/d/i/dianho_pom_1.jpg",
            legenda: "Vereador"
          }
        ]
      }
    ]
  },
  {
    titulo: "PREFEITO",
    numeros: 2,
    canditatos: [
      {
        numero: "99",
        nome: "Bonoro",
        partido: "TAOK",
        vice: "Tiririca",
        fotos: [
          {
            Url: "https://pbs.twimg.com/media/C0cXuJ2WgAE9fAt.jpg",
            legenda: "Prefeito"
          },

          {
            Url:
              "https://www.institutousiminas.com/wp-content/gallery/tyr/tiririca-2.jpg",
            legenda: "Vice-prefeito",
            small: true
          }
        ]
      },
      {
        numero: "84",
        nome: "Phzin",
        partido: "PJR",
        vice: "Bielzin",
        fotos: [
          {
            Url:
              "https://pbs.twimg.com/profile_images/852878340079964160/VE-5Euui_400x400.jpg",
            legenda: "Prefeito"
          },
          {
            Url:
              "https://ep01.epimg.net/cultura/imagenes/2017/09/12/actualidad/1505207783_546587_1505207918_noticia_normal.jpg",
            legenda: "Vice-prefeito",
            small: true
          }
        ]
      }
    ]
  }
];
var seuVotoPara = document.querySelector(".d-1-1 span");
var cargo = document.querySelector(".d-1-2 span");
var descricao = document.querySelector(".d-1-4");
var aviso = document.querySelector(".d-2");
var lateral = document.querySelector(".d-1-rigth");
var numeros = document.querySelector(".d-1-3");

var etapaAtual = 0;
var numero = "";
var votoBranco = false;
var votos = [];

function comecarEtapa() {
  var etapa = etapas[etapaAtual];
  var numeroHtml = "";
  numero = "";
  votoBranco = false;

  for (var i = 0; i < etapa.numeros; i++) {
    if (i === 0) {
      numeroHtml += "<div class='numero pisca'></div>";
    } else {
      numeroHtml += "<div class='numero'></div>";
    }
  }

  seuVotoPara.style.display = "none";
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = "";
  aviso.style.display = "none";
  lateral.innerHTML = "";
  numeros.innerHTML = numeroHtml;
}

function atualizaInterFace() {
  var etapa = etapas[etapaAtual];
  var candidato = etapa.canditatos.filter((item) => {
    if (item.numero === numero) {
      return true;
    } else {
      return false;
    }
  });
  if (candidato.length > 0) {
    candidato = candidato[0];
    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    descricao.innerHTML = `Nome ${candidato.nome}<br/>Partido: ${candidato.partido}`;
    var fotosHtml = "";
    for (var i in candidato.fotos) {
      if (candidato.fotos[i].small) {
        fotosHtml += `<div class="d-1-image small">
        <img src="${candidato.fotos[i].Url}">${candidato.fotos[i].legenda}</div>`;
      } else {
        fotosHtml += `<div class="d-1-image">
        <img src="${candidato.fotos[i].Url}">${candidato.fotos[i].legenda}</div>`;
      }
    }
    lateral.innerHTML = fotosHtml;
  } else {
    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    descricao.innerHTML = "<div class='aviso--grande pisca'>VOTO NULO</div>";
  }
}

function clicou(n) {
  var elnumero = document.querySelector(".numero.pisca");
  if (elnumero !== null) {
    elnumero.innerHTML = n;
    numero = `${numero}${n}`;

    elnumero.classList.remove("pisca");
    if (elnumero.nextElementSibling !== null) {
      elnumero.nextElementSibling.classList.add("pisca");
    } else {
      atualizaInterFace();
    }
  }
}
function branco() {
  if (numero === "") {
    votoBranco = true;
    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    numeros.innerHTML = "";
    descricao.innerHTML =
      "<div class='aviso--grande pisca'>VOTO EM BRANCO</div>";
    lateral.innerHTML = "";
  } else {
    alert("Para votar em BRANCO, não pode ter digitado nenhum número!");
  }
}
function corrige() {
  comecarEtapa();
}
function confirma() {
  var etapa = etapas[etapaAtual];
  var votoConfirmado = false;

  if (votoBranco === true) {
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: "branco"
    });
  } else if (numero.length === etapa.numeros) {
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: numero
    });
  }

  if (votoConfirmado) {
    etapaAtual++;
    if (etapas[etapaAtual] !== undefined) {
      comecarEtapa();
    } else {
      document.querySelector(".tela").innerHTML =
        "<div class='aviso--gigante pisca'>FIM</div>";
      console.log(votos);
    }
  }
}

comecarEtapa();
/* Dados de EXEMPLO para o protótipo. Substituir por API/CMS na fase 2.
   Jogos, preços, parceiros e notícias são fictícios. */
window.TUTB = {
  info: {
    nome: "Tradição Uniformizada Torcida Bicolor",
    sigla: "TUTB",
    apelido: "Terror Bicolor",
    lema: "O Poder que Vem do Norte",
    fundacao: "1989-06-16",
    clube: "Paysandu Sport Club",
    sede: "Av. Almirante Barroso, 654, Loja 13 — Estádio da Curuzu, Belém-PA",
    redes: {
      instagram: "https://www.instagram.com/tutboficial/",
      x: "https://x.com/tutbnarede",
      facebook: "https://www.facebook.com/OPODERQUEVEMDONORTE/"
    }
  },

  jogos: [
    { id: "j1", adversario: "Clube do Remo", sigla: "REM", competicao: "Clássico Re-Pa (exemplo)", data: "2026-10-26T16:00:00-03:00", local: "Estádio da Curuzu", mando: "casa" },
    { id: "j2", adversario: "Ceará", sigla: "CEA", competicao: "Copa Verde (exemplo)", data: "2026-11-02T19:00:00-03:00", local: "Arena Castelão, Fortaleza", mando: "fora", caravana: "c1" },
    { id: "j3", adversario: "Manaus FC", sigla: "MAN", competicao: "Copa Verde (exemplo)", data: "2026-11-09T20:30:00-03:00", local: "Mangueirão, Belém", mando: "casa" },
    { id: "j4", adversario: "Goiás", sigla: "GOI", competicao: "Amistoso (exemplo)", data: "2026-11-16T16:00:00-03:00", local: "Serrinha, Goiânia", mando: "fora", caravana: "c2" }
  ],
  resultados: [
    { adversario: "Águia de Marabá", placar: "3 x 1", competicao: "Exemplo", data: "2026-10-12" },
    { adversario: "Tuna Luso", placar: "1 x 1", competicao: "Exemplo", data: "2026-10-05" },
    { adversario: "Castanhal", placar: "2 x 0", competicao: "Exemplo", data: "2026-09-28" }
  ],
  tabela: [
    { pos: 1, time: "Paysandu", pj: 10, v: 7, e: 2, d: 1, sg: 11, pts: 23, nosso: true },
    { pos: 2, time: "Remo", pj: 10, v: 6, e: 2, d: 2, sg: 7, pts: 20 },
    { pos: 3, time: "Ceará", pj: 10, v: 5, e: 3, d: 2, sg: 5, pts: 18 },
    { pos: 4, time: "Manaus", pj: 10, v: 4, e: 3, d: 3, sg: 1, pts: 15 },
    { pos: 5, time: "Goiás", pj: 10, v: 3, e: 4, d: 3, sg: 0, pts: 13 },
    { pos: 6, time: "Tuna Luso", pj: 10, v: 2, e: 3, d: 5, sg: -6, pts: 9 }
  ],

  planos: [
    { id: "bonde", nome: "Bonde", preco: 19.9, periodo: "mês", destaque: false,
      beneficios: ["Carteirinha digital", "Rede Desconto", "Prioridade nas caravanas"] },
    { id: "tradicao", nome: "Tradição", preco: 199.0, periodo: "ano", destaque: true,
      beneficios: ["Tudo do Bonde", "Camisa oficial do ano", "10% off na loja", "Voto em assembleia"] },
    { id: "fundador", nome: "Curuzu Raiz", preco: 399.0, periodo: "ano", destaque: false,
      beneficios: ["Tudo do Tradição", "Kit faixa + bandeira", "20% off na loja", "Acesso à sede em dias de jogo"] }
  ],

  produtos: [
    { id: "p1", nome: "Camisa Oficial 2026", cat: "Camisas", preco: 129.9, cores: ["#1E9BE0", "#FFFFFF"], tamanhos: ["P", "M", "G", "GG", "XG"], estoque: 40 },
    { id: "p2", nome: "Camisa Listrada Curuzu", cat: "Camisas", preco: 119.9, cores: ["#FFFFFF", "#1E9BE0"], tamanhos: ["P", "M", "G", "GG"], estoque: 25 },
    { id: "p3", nome: "Camisa Noite Bicolor", cat: "Camisas", preco: 119.9, cores: ["#06182B", "#1E9BE0"], tamanhos: ["M", "G", "GG"], estoque: 0 },
    { id: "p4", nome: "Moletom Poder do Norte", cat: "Agasalhos", preco: 219.9, cores: ["#0B5E99", "#FFFFFF"], tamanhos: ["P", "M", "G", "GG"], estoque: 12 },
    { id: "p5", nome: "Boné TUTB 1989", cat: "Acessórios", preco: 69.9, cores: ["#06182B", "#F5C542"], tamanhos: ["Único"], estoque: 30 },
    { id: "p6", nome: "Bandeira 1,5 m", cat: "Acessórios", preco: 89.9, cores: ["#1E9BE0", "#FFFFFF"], tamanhos: ["Único"], estoque: 18 },
    { id: "p7", nome: "Cachecol Bicolor", cat: "Acessórios", preco: 49.9, cores: ["#1E9BE0", "#FFFFFF"], tamanhos: ["Único"], estoque: 50 },
    { id: "p8", nome: "Camisa Infantil", cat: "Camisas", preco: 89.9, cores: ["#1E9BE0", "#FFFFFF"], tamanhos: ["4", "6", "8", "10", "12"], estoque: 20 }
  ],

  caravanas: [
    { id: "c1", jogo: "j2", saida: "2026-11-01T06:00:00-03:00", ponto: "Sede — Curuzu", preco: 280, vagas: 46, reservadas: 31, transporte: "Ônibus leito" },
    { id: "c2", jogo: "j4", saida: "2026-11-14T22:00:00-03:00", ponto: "Sede — Curuzu", preco: 520, vagas: 46, reservadas: 46, transporte: "Ônibus executivo" }
  ],

  parceiros: [
    { id: "d1", nome: "Açaí da Pedreira", cat: "Alimentação", desconto: "15%", bairro: "Pedreira" },
    { id: "d2", nome: "Barbearia Lobo Bicolor", cat: "Beleza", desconto: "20%", bairro: "Marco" },
    { id: "d3", nome: "Academia Curuzu Fit", cat: "Saúde", desconto: "Matrícula grátis", bairro: "São Brás" },
    { id: "d4", nome: "Farmácia Ver-o-Peso", cat: "Saúde", desconto: "10%", bairro: "Cidade Velha" },
    { id: "d5", nome: "Oficina Celeste Motos", cat: "Serviços", desconto: "12%", bairro: "Marambaia" },
    { id: "d6", nome: "Restaurante Maniçoba & Cia", cat: "Alimentação", desconto: "10%", bairro: "Umarizal" },
    { id: "d7", nome: "Ótica Visão do Norte", cat: "Saúde", desconto: "25% em armações", bairro: "Nazaré" },
    { id: "d8", nome: "Estamparia Arquibancada", cat: "Serviços", desconto: "15%", bairro: "Jurunas" }
  ],

  noticias: [
    { id: "n1", titulo: "Campanha do agasalho arrecada 2 toneladas", cat: "Social", data: "2026-10-14",
      resumo: "Bondes de todos os bairros entregaram doações para três abrigos de Belém.",
      corpo: "A campanha reuniu associados de diversos bairros, que organizaram pontos de coleta durante quatro semanas. As doações foram triadas na sede e entregues a abrigos da capital. A diretoria agradece a cada bicolor que participou. (Texto de exemplo.)" },
    { id: "n2", titulo: "Caravana para Fortaleza: vagas abertas", cat: "Caravanas", data: "2026-10-10",
      resumo: "Ônibus leito com saída da Curuzu. Sócios têm prioridade até sexta.",
      corpo: "As reservas podem ser feitas pelo app da TUTB, na aba Caravanas. É obrigatório apresentar documento com foto e a carteirinha digital no embarque. Siga o código de conduta da torcida. (Texto de exemplo.)" },
    { id: "n3", titulo: "Novo mosaico para o clássico", cat: "Festa", data: "2026-10-06",
      resumo: "Ensaios na sede às quintas. Traga sua bandeira e venha cantar.",
      corpo: "A equipe de festa prepara um mosaico inédito para o próximo clássico. Voluntários podem se inscrever na sede. Lembrete: sinalizadores e objetos proibidos não fazem parte da nossa festa. (Texto de exemplo.)" },
    { id: "n4", titulo: "Escolinha de bateria abre turma", cat: "Bateria", data: "2026-09-29",
      resumo: "Aulas gratuitas para associados e filhos de associados, a partir de 10 anos.",
      corpo: "A bateria da TUTB abre nova turma com aulas de caixa, repique, surdo e tamborim. Inscrições na sede ou pelo app. (Texto de exemplo.)" }
  ],

  // Letras ORIGINAIS escritas para o protótipo — substituir pelos cantos da torcida.
  letras: [
    { titulo: "Poder do Norte", texto: "Lá do Norte vem o canto\nQue faz a Curuzu tremer\nÉ azul, é branco, é manto\nBicolor até morrer de viver!" },
    { titulo: "Desde 89", texto: "Desde oitenta e nove\nNinguém nos para não\nNa chuva ou no sol de Belém\nTUTB no coração" },
    { titulo: "Caravana", texto: "Pega a estrada, bicolor\nO ônibus vai lotar\nOnde o Papão for jogar\nA TUTB vai estar" }
  ],

  conduta: [
    "Paz no estádio: violência não representa a TUTB.",
    "Respeito a mulheres, crianças, idosos e PcD na arquibancada.",
    "Zero discriminação: racismo, homofobia e xenofobia são expulsão.",
    "Sem sinalizadores e objetos proibidos pelo Estatuto do Torcedor.",
    "Carteirinha e documento com foto em caravanas e na sede.",
    "Cuide do patrimônio: faixas e instrumentos são de todos."
  ],

  historia: [
    { ano: "Anos 80", texto: "Um radialista paraense apelida o Paysandu de \"Terror da Curuzu\". O nome pega na arquibancada." },
    { ano: "1989", texto: "Em 16 de junho, Gersinho e amigos bicolores fundam a Terror Bicolor para apoiar o Papão de um jeito diferente." },
    { ano: "1991", texto: "Com o título da Série B pelo Paysandu, a torcida cresce e passa a figurar entre as maiores do país." },
    { ano: "1992", texto: "Começam as alianças com grandes torcidas do Sudeste e do Sul." },
    { ano: "Hoje", texto: "Registrada como Tradição Uniformizada Torcida Bicolor, mantém a sigla TUTB, bondes nos bairros e subsedes fora do Pará." }
  ],

  subsedes: ["Belém — Sede Curuzu", "Ananindeua", "Abaetetuba", "Castanhal", "Marabá", "Curitiba-PR", "São Paulo-SP"]
};

/* Desenha uma camisa/produto em SVG com as cores do item (arte original, sem fotos). */
window.TUTB.svgProduto = function (p) {
  const [a, b] = p.cores;
  if (p.cat === "Acessórios") {
    return `<svg viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" fill="${b === "#FFFFFF" ? "#0C2540" : "#0C2540"}"/>
      <rect x="18" y="38" width="84" height="44" rx="8" fill="${a}"/><rect x="18" y="52" width="84" height="16" fill="${b}"/>
      <text x="60" y="65" text-anchor="middle" font-family="Bebas Neue,Impact" font-size="14" fill="${a}">TUTB</text></svg>`;
  }
  return `<svg viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" fill="#0C2540"/>
    <path d="M40 18 L52 14 Q60 22 68 14 L80 18 L102 32 L92 50 L84 46 V104 H36 V46 L28 50 L18 32 Z" fill="${a}" stroke="rgba(0,0,0,.25)"/>
    <path d="M36 58 H84 V70 H36 Z" fill="${b}"/>
    <text x="60" y="88" text-anchor="middle" font-family="Bebas Neue,Impact" font-size="16" fill="${b}">TUTB</text></svg>`;
};

window.TUTB.brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
window.TUTB.dataCurta = (iso) => new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }).replace(".", "");
window.TUTB.dataHora = (iso) => new Date(iso).toLocaleString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
window.TUTB.proximoJogo = () => window.TUTB.jogos.filter(j => new Date(j.data) > new Date()).sort((x, y) => new Date(x.data) - new Date(y.data))[0];

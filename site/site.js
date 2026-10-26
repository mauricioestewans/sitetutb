/* TUTB — site institucional */
(() => {
  const D = window.TUTB;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const toast = (msg) => { const t = $("#toast"); t.textContent = msg; t.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("on"), 2600); };

  // ---------- menu ----------
  const menu = $("#menu"), mBtn = $("#menu-btn");
  const fechaMenu = () => { menu.classList.remove("aberto"); mBtn.setAttribute("aria-expanded", "false"); };
  mBtn.addEventListener("click", () => { const ab = menu.classList.toggle("aberto"); mBtn.setAttribute("aria-expanded", ab); });
  menu.querySelectorAll(".tem-sub > button").forEach(b => b.addEventListener("click", () => {
    const li = b.parentElement, ab = !li.classList.contains("aberto");
    menu.querySelectorAll(".tem-sub").forEach(x => { x.classList.remove("aberto"); x.firstElementChild.setAttribute("aria-expanded", "false"); });
    li.classList.toggle("aberto", ab); b.setAttribute("aria-expanded", ab);
  }));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) { fechaMenu(); menu.querySelectorAll(".tem-sub").forEach(x => x.classList.remove("aberto")); } });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") fechaMenu(); });

  // ---------- redes ----------
  const redes = [["Instagram", D.info.redes.instagram], ["X / Twitter", D.info.redes.x], ["Facebook", D.info.redes.facebook]];
  $("#redes").innerHTML = redes.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener">${n}</a>`).join("");
  $("#redes-topo").innerHTML = redes.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener">${n}</a>`).join("");
  $("#sede").textContent = $("#sede2").textContent = D.info.sede;
  $("#ano").textContent = new Date().getFullYear();

  // ---------- banner ----------
  const slides = [
    { bg: "linear-gradient(115deg,#7ACDF3 25%,#35AAE6)", t: "Defender o Paysandu, a nossa *única meta*", p: "Desde 1989 empurrando o Papão. O Poder que Vem do Norte: festa, bateria e paz na arquibancada.", a: [["Associe-se", "#associe", "btn--ouro"], ["Nossa história", "#historia", "btn--claro"]] },
    { bg: "linear-gradient(115deg,#9BDAF7 20%,#1E9BE0)", t: "Caravana é com a TUTB", p: "Onde o Paysandu jogar, a gente vai junto. Reserve sua vaga pelo app.", a: [["Ver agenda", "#agenda", "btn--ouro"], ["Abrir app", "../app/index.html#/caravanas", "btn--claro"]] },
    { bg: "linear-gradient(115deg,#7ACDF3 30%,#FFD200 140%)", t: "Vista o manto bicolor", p: "Camisas, bandeiras e acessórios. Sócio tem desconto na loja.", a: [["Ir à loja", "#loja", "btn--ouro"]] }
  ];
  $("#slides").innerHTML = slides.map((s, i) => `<div class="slide ${i ? "" : "on"}" style="background:${s.bg}" role="group" aria-roledescription="slide" aria-label="${i + 1} de ${slides.length}" ${i ? 'aria-hidden="true"' : ""}>
      <img class="slide__arte" src="../shared/emblem.svg" alt="">
      <div class="wrap"><p class="sobre">TUTB · Paysandu</p><${i ? "h2" : "h1"} class="titulo slide__titulo">${esc(s.t).replace(/\*(.+?)\*/, "<em>$1</em>")}</${i ? "h2" : "h1"}><p>${esc(s.p)}</p>
      <div class="acoes">${s.a.map(([l, h, c]) => `<a class="btn ${c}" href="${h}">${l}</a>`).join("")}</div></div></div>`).join("");
  $("#pontos").innerHTML = slides.map((_, i) => `<button aria-label="Slide ${i + 1}" class="${i ? "" : "on"}"></button>`).join("");
  let atual = 0, timer;
  const vai = (n) => {
    atual = (n + slides.length) % slides.length;
    document.querySelectorAll(".slide").forEach((s, i) => { s.classList.toggle("on", i === atual); s.setAttribute("aria-hidden", i !== atual); });
    document.querySelectorAll("#pontos button").forEach((b, i) => b.classList.toggle("on", i === atual));
  };
  const auto = () => { clearInterval(timer); if (!matchMedia("(prefers-reduced-motion: reduce)").matches) timer = setInterval(() => vai(atual + 1), 6500); };
  $("#pontos").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { vai([...b.parentElement.children].indexOf(b)); auto(); } });
  $("#inicio").addEventListener("mouseenter", () => clearInterval(timer));
  $("#inicio").addEventListener("mouseleave", auto);
  auto();

  // ---------- próximo jogo ----------
  const pj = D.proximoJogo();
  const escudo = (nosso, sigla) => nosso ? `<div class="esc"><img src="../shared/emblem.svg" alt=""></div>` : `<div class="esc esc--deles">${esc(sigla)}</div>`;
  if (pj) {
    const casa = pj.mando === "casa";
    $("#proximo").innerHTML = `<p class="jogo__comp">Próximo jogo · ${esc(pj.competicao)}</p>
      <div class="jogo__times"><div class="t">${escudo(casa, pj.sigla)}${casa ? "Paysandu" : esc(pj.adversario)}</div><div class="jogo__x">X</div><div class="t">${escudo(!casa, pj.sigla)}${casa ? esc(pj.adversario) : "Paysandu"}</div></div>
      <div class="contagem" id="contagem"></div>
      <p class="jogo__local">📍 ${esc(pj.local)} · ${D.dataHora(pj.data)}</p>`;
    const tick = () => {
      let s = Math.max(0, (new Date(pj.data) - new Date()) / 1000);
      const d = Math.floor(s / 86400); s -= d * 86400; const h = Math.floor(s / 3600); s -= h * 3600; const m = Math.floor(s / 60); s = Math.floor(s - m * 60);
      $("#contagem").innerHTML = [[d, "dias"], [h, "horas"], [m, "min"], [s, "seg"]].map(([v, l]) => `<div><b>${String(v).padStart(2, "0")}</b><small>${l}</small></div>`).join("");
    };
    tick(); setInterval(tick, 1000);
  } else {
    $("#proximo").innerHTML = `<p class="jogo__comp">Agenda</p><h3 style="font-size:2rem">Sem jogos marcados</h3><p class="jogo__local">A agenda aparece aqui assim que a tabela sair.</p>`;
  }
  $("#agenda-lista").innerHTML = D.jogos.filter(j => new Date(j.data) > new Date()).map(j => {
    const dt = new Date(j.data);
    return `<li><div class="dia"><b>${dt.getDate()}</b><small>${dt.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "")}</small></div>
      <p><b>${j.mando === "casa" ? "Paysandu x " + esc(j.adversario) : esc(j.adversario) + " x Paysandu"}</b><br><small>${esc(j.competicao)} · ${dt.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}${j.caravana ? " · 🚌 caravana" : ""}</small></p></li>`;
  }).join("") || "<li>Sem jogos marcados.</li>";

  // ---------- notícias ----------
  const icoCat = { Social: "🤝", Caravanas: "🚌", Festa: "🎉", Bateria: "🥁" };
  const corCat = { Social: "#35AAE6", Caravanas: "#7ACDF3", Festa: "#FFD200", Bateria: "#1E9BE0" };
  const cats = ["Todas", ...new Set(D.noticias.map(n => n.cat))];
  const renderNoticias = (cat) => {
    $("#filtro-noticias").innerHTML = cats.map(c => `<button role="tab" aria-selected="${c === cat}" class="${c === cat ? "on" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
    $("#grid-noticias").innerHTML = D.noticias.filter(n => cat === "Todas" || n.cat === cat).map(n => `
      <button class="card noticia" data-noticia="${n.id}">
        <div class="noticia__capa" style="background:${corCat[n.cat] || "#0B5E99"}">${icoCat[n.cat] || "📰"}</div>
        <div class="noticia__corpo"><div><span class="chip">${esc(n.cat)}</span> <small class="aviso-demo">${new Date(n.data).toLocaleDateString("pt-BR")}</small></div>
          <h3>${esc(n.titulo)}</h3><p>${esc(n.resumo)}</p><span class="mais">Leia mais →</span></div>
      </button>`).join("");
  };
  renderNoticias("Todas");
  $("#filtro-noticias").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) renderNoticias(b.dataset.cat); });

  const modal = $("#modal");
  const abreModal = (html) => { $("#modal-corpo").innerHTML = html; modal.showModal(); };
  $("#modal-x").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });
  $("#grid-noticias").addEventListener("click", (e) => {
    const b = e.target.closest("[data-noticia]"); if (!b) return;
    const n = D.noticias.find(x => x.id === b.dataset.noticia);
    abreModal(`<div class="noticia__capa" style="background:${corCat[n.cat]}">${icoCat[n.cat] || "📰"}</div>
      <div class="modal__corpo"><span class="chip">${esc(n.cat)}</span> <small class="aviso-demo">${new Date(n.data).toLocaleDateString("pt-BR")}</small>
      <h2>${esc(n.titulo)}</h2><p><b>${esc(n.resumo)}</b></p><p>${esc(n.corpo)}</p></div>`);
  });
  $("#link-priv").addEventListener("click", (e) => {
    e.preventDefault();
    abreModal(`<div class="modal__corpo"><h2>Política de privacidade</h2>
      <p>Coletamos apenas os dados necessários para associação, pedidos e contato (nome, CPF, e-mail, telefone), conforme a LGPD (Lei 13.709/2018). Os dados não são vendidos nem compartilhados com terceiros fora da operação (pagamento e entrega). Você pode pedir acesso, correção ou exclusão a qualquer momento pelo formulário de contato.</p>
      <p class="aviso-demo">Texto-modelo — revisar com assessoria jurídica antes de publicar.</p></div>`);
  });

  // ---------- história ----------
  $("#linha-tempo").innerHTML = D.historia.map(h => `<li class="revela"><b>${esc(h.ano)}</b><p>${esc(h.texto)}</p></li>`).join("");
  const anos = new Date().getFullYear() - 1989 - (new Date() < new Date(new Date().getFullYear(), 5, 16) ? 1 : 0);
  document.querySelector('[data-conta="35"]').dataset.conta = anos;
  document.querySelector('[data-conta="7"]').dataset.conta = D.subsedes.length;

  // ---------- planos ----------
  $("#planos").innerHTML = D.planos.map(p => `<div class="card plano ${p.destaque ? "dest" : ""} revela">
      ${p.destaque ? '<span class="chip chip--ouro">Mais escolhido</span>' : ""}
      <h3>${esc(p.nome)}</h3><div class="preco">${D.brl(p.preco)} <small>/ ${p.periodo}</small></div>
      <ul>${p.beneficios.map(b => `<li>${esc(b)}</li>`).join("")}</ul>
      <a class="btn btn--bloco ${p.destaque ? "btn--ouro" : "btn--claro"}" href="../app/index.html#/socio/cadastro/${p.id}">Associar no app</a></div>`).join("");

  // ---------- loja ----------
  $("#grid-loja").innerHTML = D.produtos.filter(p => p.estoque).slice(0, 4).map(p => `<a class="card prod revela" href="../app/index.html#/loja/${p.id}">${D.svgProduto(p)}
      <div><h3>${esc(p.nome)}</h3><b>${D.brl(p.preco)}</b></div></a>`).join("");

  // ---------- subsedes, conduta, cantos, parceiros ----------
  $("#lista-subsedes").innerHTML = D.subsedes.map(s => `<li>${esc(s)}</li>`).join("");
  $("#lista-conduta").innerHTML = D.conduta.map(c => `<li>${esc(c)}</li>`).join("");
  $("#lista-cantos").innerHTML = D.letras.map((l, i) => `<details class="canto" ${i ? "" : "open"}><summary>${esc(l.titulo)}</summary><pre>${esc(l.texto)}</pre></details>`).join("");
  $("#lista-parceiros").innerHTML = D.parceiros.map(p => `<div class="card parc revela"><div class="logo">${esc(p.nome.split(" ").filter(w => w.length > 2).slice(0, 2).map(w => w[0]).join(""))}</div>
      <h3>${esc(p.nome)}</h3><small>${esc(p.cat)} · ${esc(p.bairro)}</small><span class="chip chip--ok">${esc(p.desconto)}</span></div>`).join("");

  // links que pré-preenchem o assunto do contato
  document.addEventListener("click", (e) => { const a = e.target.closest("[data-assunto]"); if (a) $("#c-assunto").value = a.dataset.assunto; });

  // ---------- contato ----------
  const marca = (el, msg) => { const c = el.closest(".campo"); c.classList.toggle("invalido", !!msg); c.querySelector(".erro").textContent = msg || ""; };
  $("#form-contato").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target, v = Object.fromEntries(new FormData(f));
    const erros = {
      nome: v.nome.trim().length < 2 ? "Informe seu nome" : "",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email) ? "" : "E-mail inválido",
      assunto: v.assunto ? "" : "Escolha um assunto",
      msg: v.msg.trim().length < 10 ? "Escreva pelo menos 10 caracteres" : ""
    };
    Object.entries(erros).forEach(([k, m]) => marca(f.elements[k], m));
    if (Object.values(erros).some(Boolean)) return;
    // Protótipo: em produção, enviar para a API/serviço de e-mail da torcida.
    f.reset(); $("#form-status").textContent = "Mensagem registrada (protótipo — nada foi enviado).";
    toast("Mensagem enviada! Obrigado, bicolor 💙");
  });

  // ---------- animações de entrada + contadores ----------
  const io = "IntersectionObserver" in window ? new IntersectionObserver((ents) => ents.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add("vis");
    if (en.target.dataset.conta) {
      const fim = +en.target.dataset.conta, ini = fim > 1000 ? 1950 : 0, t0 = performance.now();
      const passo = (t) => { const k = Math.min(1, (t - t0) / 1200); en.target.textContent = Math.round(ini + (fim - ini) * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(passo); };
      requestAnimationFrame(passo);
    }
    io.unobserve(en.target);
  }), { threshold: .15 }) : null;
  document.querySelectorAll(".revela, [data-conta]").forEach(el => io ? io.observe(el) : el.classList.add("vis"));
})();

/* TUTB — app da torcida (PWA). Roteamento por hash, estado em localStorage. */
(() => {
  const D = window.TUTB;
  const $ = (s, el = document) => el.querySelector(s);
  const tela = $("#tela");

  // ---------- estado ----------
  const CHAVE = "tutb-app-v1";
  const padrao = { socio: null, carrinho: [], reservas: [], pedidos: [] };
  let st;
  try { st = { ...padrao, ...JSON.parse(localStorage.getItem(CHAVE) || "{}") }; } catch { st = { ...padrao }; }
  const salvar = () => { try { localStorage.setItem(CHAVE, JSON.stringify(st)); } catch {} atualizarBadge(); };

  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const toast = (msg) => { const t = $("#toast"); t.textContent = msg; t.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("on"), 2400); };
  const atualizarBadge = () => { const n = st.carrinho.reduce((a, i) => a + i.qtd, 0); const b = $("#badge"); b.hidden = !n; b.textContent = n; };

  // status do sócio: calculado sempre pela data de validade (corrige a dor "plano anual aparece vencido")
  const statusSocio = () => {
    if (!st.socio) return null;
    const dias = Math.ceil((new Date(st.socio.validade) - new Date()) / 864e5);
    return { ativo: dias >= 0, dias };
  };
  const desconto = () => {
    if (!statusSocio()?.ativo) return 0;
    return { bonde: 0, tradicao: .10, fundador: .20 }[st.socio.plano] || 0;
  };

  // ---------- componentes ----------
  const escudoNosso = `<div class="escudo"><img src="../shared/emblem.svg" alt=""></div>`;
  const escudoDeles = (sigla) => `<div class="escudo escudo--deles">${esc(sigla)}</div>`;

  const heroJogo = (j) => {
    if (!j) return `<div class="hero card"><p class="hero__comp">Agenda</p><h2>Sem jogos marcados</h2><p class="sub">Assim que a tabela sair, avisamos aqui.</p></div>`;
    const casa = j.mando === "casa";
    return `<section class="hero">
      <p class="hero__comp">${esc(j.competicao)}</p>
      <div class="placar">
        <div class="time">${casa ? escudoNosso : escudoDeles(j.sigla)}<span>${casa ? "Paysandu" : esc(j.adversario)}</span></div>
        <div class="vs">X</div>
        <div class="time">${casa ? escudoDeles(j.sigla) : escudoNosso}<span>${casa ? esc(j.adversario) : "Paysandu"}</span></div>
      </div>
      <div class="contagem" data-alvo="${j.data}"></div>
      <p class="hero__local">📍 ${esc(j.local)} · ${D.dataHora(j.data)}</p>
      ${j.caravana ? `<a class="btn btn--claro btn--bloco" href="#/caravanas">🚌 Reservar caravana</a>` : `<a class="btn btn--claro btn--bloco" href="#/jogos">Ver agenda completa</a>`}
    </section>`;
  };

  const tickContagem = () => {
    document.querySelectorAll(".contagem[data-alvo]").forEach(el => {
      let s = Math.max(0, (new Date(el.dataset.alvo) - new Date()) / 1000);
      const d = Math.floor(s / 86400); s -= d * 86400;
      const h = Math.floor(s / 3600); s -= h * 3600;
      const m = Math.floor(s / 60); s = Math.floor(s - m * 60);
      el.innerHTML = [[d, "dias"], [h, "horas"], [m, "min"], [s, "seg"]].map(([v, l]) => `<div><b>${String(v).padStart(2, "0")}</b><small>${l}</small></div>`).join("");
    });
  };
  setInterval(tickContagem, 1000);

  const cardNoticia = (n) => `<a class="card noticia-card" href="#/noticias/${n.id}">
      <span class="chip">${esc(n.cat)}</span> <small class="aviso-demo">${D.dataCurta(n.data)}</small>
      <h3>${esc(n.titulo)}</h3><p>${esc(n.resumo)}</p></a>`;

  const itemJogo = (j) => `<div class="card item">
      <div class="item__data"><b>${new Date(j.data).getDate()}</b><small>${new Date(j.data).toLocaleDateString("pt-BR", { month: "short" }).replace(".", "")}</small></div>
      <div><h3>${j.mando === "casa" ? "Paysandu x " + esc(j.adversario) : esc(j.adversario) + " x Paysandu"}</h3>
      <p>${esc(j.competicao)} · ${new Date(j.data).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</p><p>📍 ${esc(j.local)}</p></div>
      <div class="item__fim">${j.mando === "casa" ? '<span class="chip">Casa</span>' : '<span class="chip chip--ouro">Fora</span>'}</div>
    </div>`;

  // QR de DEMONSTRAÇÃO: padrão determinístico a partir do nº de sócio. Em produção, usar QR assinado no servidor.
  const qrDemo = (seed) => {
    let h = 0; for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    const rnd = () => (h = (h * 1664525 + 1013904223) >>> 0) / 4294967296;
    const N = 25; let r = "";
    const olho = (x, y) => `<rect x="${x}" y="${y}" width="7" height="7" fill="#06182B"/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" fill="#fff"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3" fill="#06182B"/>`;
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const emOlho = (x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9);
      if (!emOlho && rnd() > .52) r += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
    }
    return `<svg viewBox="-1 -1 ${N + 2} ${N + 2}" role="img" aria-label="QR code de demonstração"><rect x="-1" y="-1" width="${N + 2}" height="${N + 2}" fill="#fff"/><g fill="#06182B">${r}</g>${olho(0, 0)}${olho(N - 7, 0)}${olho(0, N - 7)}</svg>`;
  };

  // ---------- telas ----------
  const T = {};

  T.inicio = () => {
    const s = statusSocio();
    return `
      <p class="sub" style="margin:0">Fala, bicolor${st.socio ? " " + esc(st.socio.nome.split(" ")[0]) : ""}! 💙🤍</p>
      <h1 class="pagina">${esc(D.info.meta)}</h1>
      ${heroJogo(D.proximoJogo())}
      <div class="atalhos">
        <a class="atalho" href="#/socio"><span>⭐</span>Seja sócio</a>
        <a class="atalho" href="#/caravanas"><span>🚌</span>Caravanas</a>
        <a class="atalho" href="#/descontos"><span>🏷️</span>Descontos</a>
        <a class="atalho" href="#/letras"><span>🥁</span>Cantos</a>
      </div>
      ${s ? `<a class="card status-linha" href="#/carteirinha" style="text-decoration:none;color:inherit">
          <span>Sua carteirinha</span>${s.ativo ? `<span class="chip chip--ok">Ativa · ${s.dias} dias</span>` : `<span class="chip chip--alerta">Vencida</span>`}</a>`
        : `<a class="card status-linha" href="#/socio" style="text-decoration:none;color:inherit"><span>Ainda não é sócio?</span><span class="chip chip--ouro">Associe-se →</span></a>`}
      <div class="sec"><h2>Notícias</h2><a href="#/noticias">Ver todas</a></div>
      <div class="lista">${D.noticias.slice(0, 3).map(cardNoticia).join("")}</div>
      <div class="sec"><h2>Destaques da loja</h2><a href="#/loja">Loja</a></div>
      <div class="grade">${D.produtos.slice(0, 2).map(cardProduto).join("")}</div>`;
  };

  T.jogos = (aba = "agenda") => {
    const futuros = D.jogos.filter(j => new Date(j.data) > new Date());
    const corpo = {
      agenda: futuros.length ? `<div class="lista">${futuros.map(itemJogo).join("")}</div>` : vazio("📅", "Sem jogos marcados", "A agenda aparece aqui quando a tabela sair."),
      resultados: `<div class="lista">${D.resultados.map(r => `<div class="card item"><div><h3>Paysandu ${esc(r.placar)} ${esc(r.adversario)}</h3><p>${esc(r.competicao)} · ${D.dataCurta(r.data)}</p></div></div>`).join("")}</div>`,
      tabela: `<div class="card tabela-wrap"><table><thead><tr><th>#</th><th>Time</th><th>PJ</th><th>V</th><th>E</th><th>D</th><th>SG</th><th>Pts</th></tr></thead>
        <tbody>${D.tabela.map(t => `<tr class="${t.nosso ? "nosso" : ""}"><td>${t.pos}</td><td>${esc(t.time)}</td><td>${t.pj}</td><td>${t.v}</td><td>${t.e}</td><td>${t.d}</td><td>${t.sg}</td><td><b>${t.pts}</b></td></tr>`).join("")}</tbody></table></div>`
    }[aba];
    return `<h1 class="pagina">Jogos</h1>
      <div class="seg" role="tablist">${["agenda", "resultados", "tabela"].map(a => `<button role="tab" class="${a === aba ? "on" : ""}" data-seg="${a}">${a[0].toUpperCase() + a.slice(1)}</button>`).join("")}</div>
      ${corpo}<p class="aviso-demo" style="margin-top:1rem">Dados de exemplo. Em produção, integrar a um provedor de dados esportivos licenciado.</p>`;
  };

  T.socio = () => {
    const s = statusSocio();
    return `<h1 class="pagina">Seja sócio</h1>
      <p class="sub">Faça parte da maior torcida do Norte. Escolha seu plano.</p>
      ${s?.ativo ? `<div class="card status-linha"><span>Você já é sócio <b>${esc(planoNome(st.socio.plano))}</b></span><a class="chip chip--ok" href="#/carteirinha">Carteirinha</a></div>` : ""}
      <div class="lista" style="margin-top:1rem">${D.planos.map(p => `
        <div class="card plano ${p.destaque ? "dest" : ""}">
          ${p.destaque ? '<span class="chip chip--ouro">Mais escolhido</span>' : ""}
          <h3>${esc(p.nome)}</h3>
          <div class="preco">${D.brl(p.preco)} <small>/ ${p.periodo}</small></div>
          <ul>${p.beneficios.map(b => `<li>${esc(b)}</li>`).join("")}</ul>
          <a class="btn btn--bloco ${p.destaque ? "btn--ouro" : ""}" href="#/socio/cadastro/${p.id}">Quero esse</a>
        </div>`).join("")}</div>`;
  };
  const planoNome = (id) => D.planos.find(p => p.id === id)?.nome || id;

  T.cadastro = (planoId) => {
    const p = D.planos.find(x => x.id === planoId) || D.planos[1];
    return `<h1 class="pagina">Cadastro</h1>
      <p class="sub">Plano <b>${esc(p.nome)}</b> — ${D.brl(p.preco)} / ${p.periodo}</p>
      <form id="form-socio" class="card" style="padding:1.2rem" novalidate>
        <input type="hidden" name="plano" value="${p.id}">
        <div class="campo"><label for="nome">Nome completo</label><input id="nome" name="nome" autocomplete="name" required minlength="5"><span class="erro"></span></div>
        <div class="campo"><label for="cpf">CPF</label><input id="cpf" name="cpf" inputmode="numeric" placeholder="000.000.000-00" required><span class="erro"></span></div>
        <div class="campo"><label for="nasc">Data de nascimento</label><input id="nasc" name="nasc" type="date" required><span class="erro"></span></div>
        <div class="campo"><label for="tel">WhatsApp</label><input id="tel" name="tel" inputmode="tel" placeholder="(91) 90000-0000" required><span class="erro"></span></div>
        <div class="campo"><label for="bonde">Bonde / subsede</label><select id="bonde" name="bonde" required><option value="">Escolha…</option>${D.subsedes.map(s => `<option>${esc(s)}</option>`).join("")}</select><span class="erro"></span></div>
        <label style="display:flex;gap:.6rem;font-size:.85rem;margin-bottom:1rem;align-items:flex-start"><input type="checkbox" name="conduta" required style="margin-top:.2rem"> <span>Li e aceito o <a href="#/conduta">código de conduta</a> da TUTB.</span></label>
        <button class="btn btn--bloco btn--ouro" type="submit">Pagar ${D.brl(p.preco)} (simulado)</button>
        <p class="aviso-demo" style="text-align:center">Protótipo: nenhum pagamento é cobrado e os dados ficam só neste aparelho.</p>
      </form>`;
  };

  const validaCPF = (v) => {
    const c = v.replace(/\D/g, ""); if (c.length !== 11 || /^(\d)\1+$/.test(c)) return false;
    const dv = (n) => { let s = 0; for (let i = 0; i < n; i++) s += +c[i] * (n + 1 - i); const r = (s * 10) % 11; return r === 10 ? 0 : r; };
    return dv(9) === +c[9] && dv(10) === +c[10];
  };

  T.carteirinha = () => {
    if (!st.socio) return vazio("🪪", "Sem carteirinha ainda", "Associe-se para liberar a carteirinha digital, descontos e prioridade nas caravanas.", `<a class="btn btn--ouro" href="#/socio">Ver planos</a>`);
    const s = statusSocio(), so = st.socio;
    return `<h1 class="pagina">Carteirinha</h1>
      <div class="cartao">
        <div class="cartao__top"><img src="../shared/emblem.svg" alt=""><b>TUTB</b></div><div class="cartao__lema">${esc(D.info.meta)}</div>
        <div class="cartao__nome"><strong>${esc(so.nome)}</strong><span>Sócio ${esc(planoNome(so.plano))} · Nº ${esc(so.numero)} · ${esc(so.bonde)}</span></div>
      </div>
      <div class="card status-linha">
        <span>Validade: <b>${new Date(so.validade).toLocaleDateString("pt-BR")}</b></span>
        ${s.ativo ? `<span class="chip chip--ok">Ativa · faltam ${s.dias} dias</span>` : `<span class="chip chip--alerta">Vencida</span>`}
      </div>
      ${s.ativo ? "" : `<a class="btn btn--bloco btn--ouro" style="margin-top:1rem" href="#/socio/cadastro/${so.plano}">Renovar agora</a>`}
      <div class="qr-box">${qrDemo(so.numero)}<small>Mostre na portaria, na caravana ou no parceiro</small></div>
      <p class="aviso-demo" style="margin-top:.8rem">QR de demonstração. CPF guardado mascarado: ${esc(so.cpf)}.</p>
      <button class="btn btn--ghost btn--bloco" style="margin-top:1rem" id="sair">Remover dados deste aparelho</button>`;
  };

  const cardProduto = (p) => `<a class="card produto" href="#/loja/${p.id}">${D.svgProduto(p)}
      <div><h3>${esc(p.nome)}</h3><b>${D.brl(p.preco)}</b>${p.estoque ? "" : '<span class="chip chip--alerta">Esgotado</span>'}</div></a>`;

  T.loja = (cat = "Todos") => {
    const cats = ["Todos", ...new Set(D.produtos.map(p => p.cat))];
    const lista = D.produtos.filter(p => cat === "Todos" || p.cat === cat);
    const d = desconto();
    return `<h1 class="pagina">Loja</h1>
      ${d ? `<p class="sub">Seu desconto de sócio: <b>${d * 100}%</b> aplicado no carrinho.</p>` : `<p class="sub">Sócio Tradição tem 10% off. <a href="#/socio">Saiba mais</a></p>`}
      <div class="filtros">${cats.map(c => `<button data-cat="${esc(c)}" class="${c === cat ? "on" : ""}">${esc(c)}</button>`).join("")}</div>
      <div class="grade">${lista.map(cardProduto).join("")}</div>`;
  };

  T.produto = (id) => {
    const p = D.produtos.find(x => x.id === id);
    if (!p) return vazio("🤔", "Produto não encontrado", "", `<a class="btn" href="#/loja">Voltar à loja</a>`);
    return `<div class="detalhe-img">${D.svgProduto(p)}</div>
      <h1 class="pagina" style="margin-top:1rem">${esc(p.nome)}</h1>
      <div class="preco" style="font-size:2rem">${D.brl(p.preco)}</div>
      ${p.estoque ? `<p class="sub">${p.estoque < 15 ? `Restam só ${p.estoque} unidades` : "Em estoque"}</p>` : `<span class="chip chip--alerta">Esgotado</span>`}
      <p style="margin:1rem 0 .2rem;font-weight:600">Tamanho</p>
      <div class="tamanhos">${p.tamanhos.map((t, i) => `<button data-tam="${esc(t)}" class="${p.tamanhos.length === 1 ? "on" : ""}" ${p.estoque ? "" : "disabled"}>${esc(t)}</button>`).join("")}</div>
      <button class="btn btn--bloco btn--ouro" id="add" data-id="${p.id}" ${p.estoque ? "" : "disabled"}>${p.estoque ? "Adicionar ao carrinho" : "Avise-me quando chegar"}</button>`;
  };

  T.carrinho = () => {
    if (!st.carrinho.length) return vazio("🛒", "Carrinho vazio", "Escolha seu manto e vista a camisa da TUTB.", `<a class="btn" href="#/loja">Ir para a loja</a>`);
    const sub = st.carrinho.reduce((a, i) => a + D.produtos.find(p => p.id === i.id).preco * i.qtd, 0);
    const d = desconto(), desc = sub * d, frete = sub - desc >= 250 ? 0 : 19.9;
    return `<h1 class="pagina">Carrinho</h1>
      <div class="lista">${st.carrinho.map((i, idx) => { const p = D.produtos.find(x => x.id === i.id); return `
        <div class="card linha-carrinho">${D.svgProduto(p)}
          <div><b style="font-size:.9rem">${esc(p.nome)}</b><br><small class="aviso-demo">Tam. ${esc(i.tam)} · ${D.brl(p.preco)}</small></div>
          <div class="qtd"><button data-q="${idx}" data-d="-1" aria-label="Menos">−</button><span>${i.qtd}</span><button data-q="${idx}" data-d="1" aria-label="Mais">+</button></div>
        </div>`; }).join("")}</div>
      <div class="card totais">
        <div><span>Subtotal</span><span>${D.brl(sub)}</span></div>
        ${d ? `<div class="desc"><span>Desconto sócio (${d * 100}%)</span><span>− ${D.brl(desc)}</span></div>` : ""}
        <div><span>Frete</span><span>${frete ? D.brl(frete) : "Grátis"}</span></div>
        <div class="total"><span>Total</span><span>${D.brl(sub - desc + frete)}</span></div>
      </div>
      <div class="campo"><label for="entrega">Entrega</label><select id="entrega"><option>Retirar na sede (Curuzu)</option><option>Entrega em Belém e região</option><option>Correios — todo o Brasil</option></select></div>
      <button class="btn btn--bloco btn--ouro" id="finalizar" data-total="${(sub - desc + frete).toFixed(2)}">Finalizar com Pix (simulado)</button>`;
  };

  T.pedidoOk = (id) => `<div class="sucesso"><div class="ico">✓</div><h1 class="pagina">Pedido confirmado!</h1>
      <p class="sub">Pedido <b>#${esc(id)}</b>. Você recebe o aviso quando estiver pronto.</p>
      <a class="btn" href="#/">Voltar ao início</a></div>`;

  T.caravanas = () => `<h1 class="pagina">Caravanas</h1>
      <p class="sub">Onde o Papão for, a TUTB vai junto. Sócio tem prioridade.</p>
      <div class="lista">${D.caravanas.map(c => {
        const j = D.jogos.find(x => x.id === c.jogo), livres = c.vagas - c.reservadas - (st.reservas.includes(c.id) ? 1 : 0);
        const minha = st.reservas.includes(c.id), pct = Math.min(100, (c.vagas - livres) / c.vagas * 100);
        return `<div class="card" style="padding:1rem">
          <span class="chip chip--ouro">${esc(j.competicao)}</span>
          <h3 style="font-size:1.6rem;margin:.5rem 0 .2rem">${esc(j.adversario)} x Paysandu</h3>
          <p class="sub" style="margin:0">📍 ${esc(j.local)}<br>🕒 Saída ${D.dataHora(c.saida)} · ${esc(c.ponto)}<br>🚌 ${esc(c.transporte)} · <b>${D.brl(c.preco)}</b></p>
          <div class="barra"><i class="${livres <= 0 ? "cheia" : ""}" style="width:${pct}%"></i></div>
          <small class="aviso-demo">${livres > 0 ? `${livres} vagas livres de ${c.vagas}` : "Lotada — entre na lista de espera"}</small>
          <button class="btn btn--bloco ${minha ? "btn--ghost" : ""}" style="margin-top:.8rem" data-reserva="${c.id}" ${livres <= 0 && !minha ? "data-espera" : ""}>
            ${minha ? "✓ Reservado — cancelar" : livres > 0 ? "Reservar vaga" : "Lista de espera"}</button>
        </div>`; }).join("")}</div>`;

  T.descontos = (q = "", cat = "Todas") => {
    const cats = ["Todas", ...new Set(D.parceiros.map(p => p.cat))];
    const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    const lista = D.parceiros.filter(p => (cat === "Todas" || p.cat === cat) && norm(p.nome + " " + p.bairro).includes(norm(q)));
    return `<h1 class="pagina">Rede Desconto</h1>
      <p class="sub">Mostre a carteirinha ativa nos parceiros. ${statusSocio()?.ativo ? "✅ Sua carteirinha está ativa." : `<a href="#/socio">Associe-se para usar.</a>`}</p>
      <div class="busca"><input id="busca" type="search" placeholder="Buscar parceiro ou bairro" value="${esc(q)}" aria-label="Buscar parceiro"></div>
      <div class="filtros">${cats.map(c => `<button data-pcat="${esc(c)}" class="${c === cat ? "on" : ""}">${esc(c)}</button>`).join("")}</div>
      <div class="lista" id="lista-parc">${lista.length ? lista.map(p => `<div class="card item"><div><h3>${esc(p.nome)}</h3><p>${esc(p.cat)} · ${esc(p.bairro)}</p></div><div class="item__fim"><span class="chip chip--ok">${esc(p.desconto)}</span></div></div>`).join("")
        : `<div class="vazio"><p>Nenhum parceiro encontrado para “${esc(q)}”.</p></div>`}</div>
      <a class="btn btn--ghost btn--bloco" style="margin-top:1rem" href="../site/index.html#parceiros">Tenho um negócio — quero ser parceiro</a>`;
  };

  T.noticias = () => `<h1 class="pagina">Notícias</h1><div class="lista">${D.noticias.map(cardNoticia).join("")}</div>`;
  T.noticia = (id) => {
    const n = D.noticias.find(x => x.id === id);
    if (!n) return vazio("📰", "Notícia não encontrada", "");
    return `<article class="artigo"><div class="capa"></div><p style="margin-top:1rem"><span class="chip">${esc(n.cat)}</span> <small class="aviso-demo">${new Date(n.data).toLocaleDateString("pt-BR")}</small></p>
      <h1>${esc(n.titulo)}</h1><p><b>${esc(n.resumo)}</b></p><p>${esc(n.corpo)}</p>
      <button class="btn btn--ghost" id="compartilhar">Compartilhar</button></article>`;
  };

  T.mais = () => `<h1 class="pagina">Mais</h1>
      <div class="card menu-mais">
        <a href="#/noticias"><span>📰</span>Notícias</a>
        <a href="#/letras"><span>🥁</span>Letras dos cantos</a>
        <a href="#/conduta"><span>🕊️</span>Código de conduta</a>
        <a href="#/descontos"><span>🏷️</span>Rede Desconto</a>
        <a href="#/suporte"><span>💬</span>Suporte</a>
        <a href="../site/index.html"><span>🌐</span>Site da TUTB</a>
      </div>
      <div class="card" style="padding:1rem;margin-top:1rem">
        <h3 style="font-size:1.4rem">Sobre a TUTB</h3>
        <p class="sub" style="margin:.4rem 0 0">${esc(D.info.nome)} · fundada em 16/06/1989 · ${esc(D.info.sede)}</p>
      </div>
      <div class="lema-bloco"><img src="../shared/emblem.svg" alt="">${esc(D.info.meta)}</div>
      <p class="aviso-demo" style="margin-top:1rem;text-align:center">Protótipo v0.2 · dados de exemplo</p>`;

  T.letras = () => `<h1 class="pagina">Cantos</h1><p class="sub">Aprende e solta a voz na arquibancada.</p>
      ${D.letras.map((l, i) => `<details class="card letra" ${i ? "" : "open"}><summary>${esc(l.titulo)}</summary><pre>${esc(l.texto)}</pre></details>`).join("")}
      <p class="aviso-demo">Letras provisórias escritas para o protótipo — substituir pelos cantos oficiais.</p>`;

  T.conduta = () => `<h1 class="pagina">Código de conduta</h1><p class="sub">Festa, paz e respeito. É assim que a TUTB faz história.</p>
      <div class="lista">${D.conduta.map((c, i) => `<div class="card item"><div class="item__data"><b>${i + 1}</b></div><div><p style="color:var(--texto);font-size:.95rem;margin:0">${esc(c)}</p></div></div>`).join("")}</div>`;

  T.suporte = () => `<h1 class="pagina">Suporte</h1><p class="sub">Problema com plano, pedido ou carteirinha? Abra um chamado — respondemos por aqui.</p>
      <form id="form-sup" class="card" style="padding:1.2rem" novalidate>
        <div class="campo"><label for="assunto">Assunto</label><select id="assunto" required><option value="">Escolha…</option><option>Plano de sócio / validade</option><option>Pedido da loja</option><option>Caravana</option><option>Outro</option></select><span class="erro"></span></div>
        <div class="campo"><label for="msg">Mensagem</label><textarea id="msg" required minlength="10"></textarea><span class="erro"></span></div>
        <button class="btn btn--bloco" type="submit">Enviar chamado</button>
      </form>
      ${(st.chamados || []).length ? `<div class="sec"><h2>Seus chamados</h2></div><div class="lista">${st.chamados.map(c => `<div class="card item"><div><h3>#${esc(c.id)} · ${esc(c.assunto)}</h3><p>${esc(c.msg)}</p></div><div class="item__fim"><span class="chip">Aberto</span></div></div>`).join("")}</div>` : ""}`;

  function vazio(ico, tit, txt, cta = "") { return `<div class="vazio"><div class="ico">${ico}</div><h2>${tit}</h2><p>${txt}</p>${cta}</div>`; }

  // ---------- roteador ----------
  const rotas = [
    [/^\/$/, () => T.inicio(), "inicio"],
    [/^\/jogos$/, () => T.jogos(), "jogos"],
    [/^\/socio$/, () => T.socio(), "carteirinha"],
    [/^\/socio\/cadastro\/(\w+)$/, (m) => T.cadastro(m[1]), "carteirinha"],
    [/^\/carteirinha$/, () => T.carteirinha(), "carteirinha"],
    [/^\/loja$/, () => T.loja(), "loja"],
    [/^\/loja\/(\w+)$/, (m) => T.produto(m[1]), "loja"],
    [/^\/carrinho$/, () => T.carrinho(), "loja"],
    [/^\/pedido\/(\w+)$/, (m) => T.pedidoOk(m[1]), "loja"],
    [/^\/caravanas$/, () => T.caravanas(), "inicio"],
    [/^\/descontos$/, () => T.descontos(), "mais"],
    [/^\/noticias$/, () => T.noticias(), "inicio"],
    [/^\/noticias\/(\w+)$/, (m) => T.noticia(m[1]), "inicio"],
    [/^\/mais$/, () => T.mais(), "mais"],
    [/^\/letras$/, () => T.letras(), "mais"],
    [/^\/conduta$/, () => T.conduta(), "mais"],
    [/^\/suporte$/, () => T.suporte(), "mais"]
  ];
  const raizes = ["/", "/jogos", "/carteirinha", "/loja", "/mais"];

  function render() {
    const rota = location.hash.replace(/^#/, "") || "/";
    let html = vazio("🧭", "Página não encontrada", "", `<a class="btn" href="#/">Início</a>`), aba = "inicio";
    for (const [re, fn, a] of rotas) { const m = rota.match(re); if (m) { html = fn(m); aba = a; break; } }
    tela.innerHTML = html;
    document.querySelectorAll(".abas a").forEach(a => a.classList.toggle("ativa", a.dataset.aba === aba));
    $("#voltar").hidden = raizes.includes(rota);
    window.scrollTo(0, 0); tela.focus({ preventScroll: true }); tickContagem();
  }
  window.addEventListener("hashchange", render);
  $("#voltar").addEventListener("click", () => history.length > 1 ? history.back() : (location.hash = "#/"));

  // ---------- interações (delegação) ----------
  tela.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.seg) { tela.innerHTML = T.jogos(b.dataset.seg); return; }
    if (b.dataset.cat) { tela.innerHTML = T.loja(b.dataset.cat); return; }
    if (b.dataset.pcat) { tela.innerHTML = T.descontos($("#busca").value, b.dataset.pcat); return; }
    if (b.dataset.tam) { b.parentElement.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b)); return; }
    if (b.id === "add") {
      const tam = $(".tamanhos button.on")?.dataset.tam;
      if (!tam) { toast("Escolha um tamanho"); return; }
      const ex = st.carrinho.find(i => i.id === b.dataset.id && i.tam === tam);
      ex ? ex.qtd++ : st.carrinho.push({ id: b.dataset.id, tam, qtd: 1 });
      salvar(); toast("Adicionado ao carrinho 🛒"); return;
    }
    if (b.dataset.q !== undefined) {
      const i = st.carrinho[+b.dataset.q]; i.qtd += +b.dataset.d;
      if (i.qtd <= 0) st.carrinho.splice(+b.dataset.q, 1);
      salvar(); render(); return;
    }
    if (b.id === "finalizar") {
      const id = String(Date.now()).slice(-6);
      st.pedidos.push({ id, itens: st.carrinho, total: +b.dataset.total, data: new Date().toISOString() });
      st.carrinho = []; salvar(); location.hash = "#/pedido/" + id; return;
    }
    if (b.dataset.reserva) {
      const id = b.dataset.reserva;
      if (st.reservas.includes(id)) { st.reservas = st.reservas.filter(r => r !== id); toast("Reserva cancelada"); }
      else if (b.hasAttribute("data-espera")) { toast("Você entrou na lista de espera"); return; }
      else if (!statusSocio()?.ativo) { toast("Caravanas exigem sócio ativo"); location.hash = "#/socio"; return; }
      else { st.reservas.push(id); toast("Vaga reservada! 🚌"); }
      salvar(); render(); return;
    }
    if (b.id === "sair") { st = { ...padrao }; salvar(); toast("Dados removidos"); render(); return; }
    if (b.id === "compartilhar") {
      const dados = { title: "TUTB", text: $(".artigo h1").textContent, url: location.href };
      navigator.share ? navigator.share(dados).catch(() => {}) : (navigator.clipboard?.writeText(location.href), toast("Link copiado"));
    }
  });

  tela.addEventListener("input", (e) => {
    if (e.target.id === "busca") {
      const pos = e.target.selectionStart, cat = $("[data-pcat].on")?.dataset.pcat || "Todas";
      tela.innerHTML = T.descontos(e.target.value, cat);
      const i = $("#busca"); i.focus(); i.setSelectionRange(pos, pos);
    }
    if (e.target.id === "cpf") {
      const d = e.target.value.replace(/\D/g, "").slice(0, 11);
      e.target.value = d.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    if (e.target.id === "tel") {
      const d = e.target.value.replace(/\D/g, "").slice(0, 11);
      e.target.value = d.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
    }
  });

  const marcaErro = (el, msg) => { const c = el.closest(".campo"); if (!c) return; c.classList.toggle("invalido", !!msg); c.querySelector(".erro").textContent = msg || ""; };

  tela.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    if (f.id === "form-socio") {
      const v = Object.fromEntries(new FormData(f));
      const idade = (Date.now() - new Date(v.nasc)) / 31557600000;
      const erros = {
        nome: v.nome.trim().split(/\s+/).length < 2 ? "Informe nome e sobrenome" : "",
        cpf: validaCPF(v.cpf) ? "" : "CPF inválido",
        nasc: !v.nasc ? "Informe a data" : idade < 0 || idade > 120 ? "Data inválida" : "",
        tel: v.tel.replace(/\D/g, "").length < 10 ? "Telefone incompleto" : "",
        bonde: v.bonde ? "" : "Escolha seu bonde"
      };
      Object.entries(erros).forEach(([k, m]) => marcaErro(f.elements[k], m));
      if (!v.conduta) { toast("Aceite o código de conduta"); return; }
      if (Object.values(erros).some(Boolean)) { toast("Confira os campos destacados"); return; }
      const plano = D.planos.find(p => p.id === v.plano);
      const base = statusSocio()?.ativo ? new Date(st.socio.validade) : new Date();
      const validade = new Date(base); plano.periodo === "ano" ? validade.setFullYear(validade.getFullYear() + 1) : validade.setMonth(validade.getMonth() + 1);
      const cpf = v.cpf.replace(/\D/g, "");
      st.socio = {
        nome: v.nome.trim(), cpf: `***.${cpf.slice(3, 6)}.***-${cpf.slice(9)}`, bonde: v.bonde, plano: v.plano,
        numero: st.socio?.numero || "89" + String(Math.floor(Math.random() * 1e6)).padStart(6, "0"),
        inicio: new Date().toISOString(), validade: validade.toISOString()
      };
      salvar(); toast("Bem-vindo à TUTB! 💙"); location.hash = "#/carteirinha";
    }
    if (f.id === "form-sup") {
      const assunto = $("#assunto").value, msg = $("#msg").value.trim();
      marcaErro($("#assunto"), assunto ? "" : "Escolha o assunto");
      marcaErro($("#msg"), msg.length >= 10 ? "" : "Descreva com pelo menos 10 caracteres");
      if (!assunto || msg.length < 10) return;
      st.chamados = [...(st.chamados || []), { id: String(Date.now()).slice(-5), assunto, msg }];
      salvar(); toast("Chamado aberto ✔"); render();
    }
  });

  // PWA
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(() => {});

  atualizarBadge(); render();
})();

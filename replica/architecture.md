# Arquitetura e design — TUTB

## Fase 1 (este entregável): protótipo front-end sem build
```
shared/brand.css   tokens de design (cores, tipo, raio, sombra) + componentes comuns
shared/emblem.svg  emblema ORIGINAL provisório (substituir pelo oficial da TUTB)
shared/data.js     dados de exemplo: jogos, planos, produtos, parceiros, notícias, caravanas
app/               PWA mobile (index.html + app.js + manifest + sw.js), roteamento por hash, estado em localStorage
site/              site institucional (index.html + site.js), uma página com seções âncora
```
Abrir `site/index.html` ou `app/index.html` direto no navegador, ou servir a pasta raiz
(`npx serve .`) para o service worker funcionar.

## Fase 2 (produção) — recomendação
- Supabase (Postgres + Auth + Storage) para sócios, pedidos, notícias (CMS simples).
- Pagamentos: Mercado Pago (Pix + cartão) — padrão no Brasil.
- Carteirinha: QR assinado no servidor (JWT curto) validado por app do portão.
- Site: Next.js ou Astro na Vercel; app: manter PWA ou empacotar com Capacitor para lojas.

## Design tokens (v0.2 — celeste + caveira amarela)
| papel | cor | uso |
| --- | --- | --- |
| --fundo | #7ACDF3 | fundo das páginas (azul celeste) |
| --fundo-forte | #35AAE6 | cabeçalho, heróis, rodapé |
| --celeste | #1E9BE0 | marca |
| --superficie | #FFFFFF | cartões |
| --texto | #0A2233 | texto e contornos (o preto da caveira) |
| --texto-2 | #2D4B60 | texto secundário |
| --amarelo | #FFD200 | caveira, botões principais, faixa do lema |
Contraste (WCAG): texto/fundo 9.2:1 · texto-2/fundo 5.2:1 · texto/amarelo 11.2:1 · texto/fundo-forte 6.2:1.
Links usam a cor do texto com sublinhado (celeste-escuro sobre o fundo daria só 3.3:1).
Lema em destaque: "Defender o Paysandu, a nossa única meta" (faixa amarela no app e no site).
Tipografia: "Bebas Neue" (títulos, OFL) + "Inter" (texto, OFL).

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

## Design tokens
| papel | cor | uso |
| --- | --- | --- |
| --celeste | #1E9BE0 | primária (azul do Paysandu) |
| --celeste-700 | #0B5E99 | hover/pressed |
| --noite | #06182B | fundo escuro |
| --noite-2 | #0C2540 | cartões |
| --branco | #FFFFFF | texto sobre escuro |
| --ouro | #F5C542 | destaques (estrela/títulos) |
| --alerta | #E5484D | erro/vencido |
| --ok | #2EBD85 | ativo |
Contraste: branco sobre --noite ≈ 17:1; branco sobre --celeste-700 ≈ 6.7:1 (botões usam celeste-700 para texto branco em AA).
Tipografia: "Bebas Neue" (títulos, Google Fonts, OFL) + "Inter" (texto, OFL).

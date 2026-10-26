# TUTB — App + Site (protótipo)

App e site para a **Tradição Uniformizada Torcida Bicolor (TUTB / Terror Bicolor)**, torcida
do Paysandu fundada em 16/06/1989. Referências funcionais: app da Mancha Alvi Verde e site
da Gaviões da Fiel (clean-room: só funcionalidades e padrões de UX, nada copiado).

## Rodar
```bash
python -m http.server 5173
```
- Site: http://localhost:5173/site/
- App:  http://localhost:5173/app/  (melhor no celular ou em modo mobile do DevTools; instalável como PWA)

## Estrutura
| pasta | conteúdo |
| --- | --- |
| `replica/` | pesquisa e engenharia reversa: `recon.md`, `features.csv`, `architecture.md` |
| `shared/` | tokens de design (`brand.css`), emblema provisório (`emblem.svg`), dados de exemplo (`data.js`) |
| `app/` | PWA: início, jogos/tabela, sócio + cadastro, carteirinha com QR, loja + carrinho, caravanas, Rede Desconto, notícias, cantos, conduta, suporte |
| `site/` | institucional: banner, próximo jogo, notícias, história, ideologia, social, associe-se, loja, diretoria/subsedes, conduta/cantos, parceiros, contato, privacidade |

## Antes de publicar
1. Trocar `shared/emblem.svg` pelo escudo oficial da TUTB (com autorização). Não usar o escudo do Paysandu sem licença do clube.
2. Substituir dados de exemplo em `shared/data.js` (jogos, preços, parceiros, notícias, letras, diretoria).
3. Fase 2: backend (Supabase), pagamento (Mercado Pago/Pix), QR da carteirinha assinado no servidor, envio real do formulário de contato.
4. Revisar a política de privacidade (LGPD) com assessoria jurídica.

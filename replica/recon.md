# Recon map — App + Site para a TUTB (Terror Bicolor / Paysandu)

Clean-room: estudamos **funcionalidades e padrões de UX** do app da Mancha Alvi Verde
e do site da Gaviões da Fiel. Nenhum código, logo, imagem, texto ou fonte desses
produtos foi copiado. Logos/escudos da TUTB e do Paysandu **não** foram usados —
o projeto usa um emblema original provisório até a torcida fornecer o oficial.

## 1. Escopo

| item | decisão |
| --- | --- |
| Produto A | App mobile (PWA instalável) — referência funcional: app "ManchaAlviVerde" (iOS) |
| Produto B | Site institucional — referência estrutural: gavioes.com.br |
| Slice | App: sócio + carteirinha, loja, jogos/tabela, caravanas, Rede Desconto, notícias. Site: institucional + notícias + associe-se + loja + agenda + contato |
| Para quem | TUTB — Tradição Uniformizada Torcida Bicolor (Paysandu Sport Club, Belém-PA) |

## 2. Pesquisa sobre a torcida

| fato | fonte |
| --- | --- |
| Fundada em 16/06/1989, em Belém, por amigos liderados por "Gersinho" | grsctutb.blogspot.com, organizadasbrasil.com |
| Nome inspirado no apelido "Terror da Curuzu", dado ao Paysandu por um radialista nos anos 80 | @OCantoOficial (X) |
| Hoje registrada como **Tradição Uniformizada Torcida Bicolor** (mantém a sigla TUTB) | organizadasbrasil.com, Diário do Pará |
| Lema: "O Poder que Vem do Norte" | facebook.com/OPODERQUEVEMDONORTE |
| Sede: Av. Almirante Barroso, 654, Loja 13 — Estádio da Curuzu, Belém-PA | organizadasbrasil.com |
| Cresceu após o título da Série B de 1991; alianças com Mancha Verde, Força Jovem (Vasco), Jovem do Grêmio, Galoucura, Jovem do Bahia | blog TUTB |
| Organização por bairros e "bondes"; subsedes (ex.: Curitiba, Abaetetuba) | organizadasbrasil, Instagram @tutb_curitiba |
| Redes: @tutboficial (IG), @tutbnarede (X), site opoderquevemdonorte.com | organizadasbrasil.com |
| Contexto sensível: punições e episódios de violência noticiados; em 2023 fez protesto de ausência | dol.com.br, diariodopara.com.br |

**Implicação de produto:** o conteúdo destaca responsabilidade social, festa,
pertencimento e regras de conduta (paz no estádio) — ponto que também aparece na
Gaviões ("Responsabilidade Social", "Ideologia").

## 3. Fontes de referência

| fonte | o que deu |
| --- | --- |
| apps.apple.com/app/id1622076177 (ManchaAlviVerde) | sócio, loja, tabelas/jogos, carteirinha, campeonato interno, Rede Desconto, home redesenhada |
| Avaliações da App Store | dores: plano anual aparecendo vencido, suporte só via WhatsApp sem resposta, menu que não abre |
| gavioes.com.br | menu: Quem somos, Associe-se, Diretoria, Estatuto, Subsedes, Ideologia, Responsabilidade social, Letras, Carnaval, Clube (títulos/origens), Multimídia, Notícias, Contato/Anuncie, Loja; home com banner, notícias, parceiros |

## 4. Inventário de telas

### App (A)
| ID | tela | rota | propósito | componentes | estados |
| --- | --- | --- | --- | --- | --- |
| A01 | Início | #/ | próximo jogo, atalhos, notícias | hero de jogo, grid de atalhos, card notícia | com/sem jogo |
| A02 | Jogos & Tabela | #/jogos | calendário e classificação | abas, lista de jogos, tabela | vazio |
| A03 | Sócio (planos) | #/socio | escolher plano | cards de plano, CTA | já sócio |
| A04 | Cadastro sócio | #/socio/cadastro | formulário | inputs, validação | erro, sucesso |
| A05 | Carteirinha | #/carteirinha | carteira digital com QR | cartão, QR, validade | sem sócio, vencido, ativo |
| A06 | Loja | #/loja | produtos | grid, filtro, badge carrinho | vazio |
| A07 | Produto | #/loja/:id | detalhe, tamanho | galeria, seletor | esgotado |
| A08 | Carrinho | #/carrinho | revisar e finalizar | lista, totais | vazio, concluído |
| A09 | Caravanas | #/caravanas | viagens para jogos fora | lista, vagas, reservar | lotada |
| A10 | Rede Desconto | #/descontos | parceiros com desconto | busca, categorias, cards | sem resultado |
| A11 | Notícias | #/noticias | feed | lista | — |
| A12 | Notícia | #/noticias/:id | leitura | artigo | — |
| A13 | Mais / Perfil | #/mais | conduta, letras, suporte, sobre | lista de links | — |
| A14 | Letras | #/letras | cantos da torcida | acordeão | — |

### Site (W)
| ID | seção | propósito |
| --- | --- | --- |
| W01 | Header + menu com dropdowns | navegação (padrão Gaviões) |
| W02 | Hero/banner rotativo | campanha do momento |
| W03 | Próximo jogo + contagem regressiva | agenda |
| W04 | Notícias (grid + modal) | conteúdo |
| W05 | Quem somos / História (linha do tempo) | institucional |
| W06 | Ideologia + Responsabilidade social | reputação |
| W07 | Diretoria / Subsedes (bondes) | estrutura |
| W08 | Associe-se (planos) | conversão — leva ao app |
| W09 | Loja (vitrine) | vendas |
| W10 | Parceiros + Seja parceiro | receita |
| W11 | Contato / Anuncie (formulário) | contato |
| W12 | Rodapé (redes, privacidade) | — |

## 5. Fluxos
```
F01 Torcedor vira sócio:   A03 -> A04 -> A05            (3 toques)
F02 Compra na loja:        A06 -> A07 -> A08 -> concluir (4 toques)
F03 Reserva caravana:      A01 -> A09 -> reservar        (2 toques)
F04 Usa desconto parceiro: A10 -> busca -> mostra carteirinha
F05 Visitante do site se associa: W08 -> app A03
F06 Empresa quer anunciar: W10 -> W11
edge: plano vencido (dor real das avaliações) mostra data clara e botão renovar;
      suporte com formulário + status, não só WhatsApp.
```

## 6. Componentes
Botão (primário/secundário/ghost), card, chip/filtro, abas, tab bar inferior,
header, toast, modal, input/select com erro, badge, acordeão, QR, contagem regressiva, carrossel.

## 7. Modelo de dados inferido
```
Member   id, nome, cpf(mascarado), nascimento, bairro/bonde, plano, inicio, validade, status (ativo|vencido)   conf: alta (carteirinha)
Plan     id, nome, preço, periodicidade, benefícios[]                                                          conf: alta
Product  id, nome, categoria, preço, tamanhos[], estoque                                                       conf: alta
Order    id, itens[], total, status                                                                            conf: média
Match    id, adversário, competição, data, local, mando, placar?                                               conf: alta
Caravan  id, match_id, saída, preço, vagas, reservadas                                                         conf: média (palpite)
Partner  id, nome, categoria, desconto, endereço                                                               conf: alta (Rede Desconto)
News     id, título, data, resumo, corpo, categoria                                                            conf: alta
```

## 8. O que não se clona (skip)
- Marca, logos, fotos e textos da Mancha e da Gaviões.
- Escudo do Paysandu (marca registrada do clube) — usar só com autorização.
- Placar ao vivo/tabela oficial: exige provedor de dados licenciado; aqui é dado de exemplo.
- Pagamento real: protótipo simula; produção exige gateway (Mercado Pago/Stripe/Pix).

## 9. Tamanho
14 telas de app, 12 seções de site, 6 fluxos, 8 entidades. Partes difíceis:
pagamentos/Pix, carteirinha antifraude (QR assinado no servidor), dados de jogos.
**Tamanho: M.** Este entregável é o protótipo funcional front-end (dados locais).

# eFinance — Protótipo da tela NFS-e

Protótipo visual e navegável para apresentação à Carla, baseado nos mockups aprovados da nova tela de Nota Fiscal de Serviço e nas duas capturas de tela do fluxo atual "Gerar Nota Serviço".

## Como abrir

1. Extraia o ZIP inteiro em uma pasta.
2. Abra **index.html** no Chrome ou Edge, com dois cliques. Não precisa instalar nada.
3. Alternativamente, abra **index-unico.html**: versão que funciona como um único arquivo, sem outros recursos.
4. Para melhor fidelidade, use zoom do navegador em 100%. Em resoluções menores, a barra de ações quebra em linhas mantendo todos os botões visíveis, e a tabela se ajusta à largura disponível sem uma barra horizontal adicional.

## Roteiro da apresentação

1. **Tela principal:** mostre a barra com **Ver selecionados**, seguido de **Gerar NFS-e**, e a tabela com as colunas Data Término de Montagem, Data Término Liberação Futura e Fin Processado.
2. **Gerar NFS-e:** selecione um contrato na lista e clique em Gerar NFS-e. Se nenhum estiver marcado, o protótipo escolhe o contrato de Fernanda Martins Rocha (cód. 27447) apenas para facilitar a demonstração.
3. **Seleção de itens:** na primeira etapa, os itens 3, 4 e 5 vêm selecionados. O item 9 entra automaticamente. Desmarque o item 5 para demonstrar que o item 9 sai; selecione o 5 novamente para que ele volte.
4. **Dados da NFS-e:** clique em Próximo. Apresente Emitente, Dt. Emissão, IBS/CBS, Cód. Serviço NFS-e, Tipo Trib. ISS, Item NBS, informações adicionais e a grade Opção/Ambiente/Valores. Selecione Emitente e Item NBS de exemplo e use Ok para simular a preparação (não transmite).
5. **Tributos Federais:** clique no botão visível, destacado imediatamente após Histórico na barra de ações, **ou** abra diretamente na segunda etapa de Gerar NFS-e, usando o botão Tributos Federais antes de Ok. Mostre Situação tributária, Tipo de retenção, PIS/COFINS/CSLL, CP, IR, Outras Retenções e botão Salvar. Campos de valor são calculados automaticamente com base em alíquota e base de cálculo demonstrativas.
   Ao salvar ou fechar Tributos Federais, se aberto durante a geração, o protótipo retorna automaticamente à etapa 2 com os campos já preenchidos.
6. **Regra do Item 7:** no filtro Itens escolha "07 - Contratado - Franquia". A linha do cliente KA CLIENTE 29214 ficará com seleção desabilitada, pois o término da montagem está em branco. Ao voltar para --Todos--, a restrição específica deixa de valer.
7. **Outras ações:** teste busca, filtros, seleção múltipla, totalizadores, histórico, download demonstrativo, pré-visualização e impressão.

## Estrutura

- `index.html` — marcação principal e componentes.
- `styles.css` — identidade visual, barra, grid, formulários, modal e ajustes de resolução.
- `app.js` — dados demonstrativos, estados, seleção, fluxo de geração, tributos e interações.
- `index-unico.html` — versão portátil com todo o CSS, JS e marca incorporados.
- `assets/marca-efinance.png` — recorte da identidade visual de referência, usado localmente.
- `preview/` — capturas das principais telas para apresentar rapidamente.
- `MAPEAMENTO_INTERACOES.md` — resumo do que está clicável e das limitações.
- `MANUAL_FUNCIONAL_NFSE.md` — documentação integral exibida na Ajuda.

## Botão Ajuda — manual funcional integrado

O botão **Ajuda** abre uma janela central que segue a identidade visual do eFinance. Há um menu lateral com 11 assuntos e um campo de pesquisa com filtragem local. Os tópicos incluem a proposta da tela, ações da barra, filtros, todas as colunas e origens, a exceção do Item 7, a seleção conjunta de 3/4/5 com item 9 automático, o fluxo Gerar NFS-e, Tributos Federais, os quatro totalizadores, exclusões, critérios de aceite e pendências técnicas. O conteúdo separa as decisões do produto dos exemplos simulados no protótipo.

O manual funciona offline tanto na versão separada quanto em `index-unico.html`. O texto completo também acompanha o pacote em `MANUAL_FUNCIONAL_NFSE.md`.

## Observações essenciais

**Isto é um protótipo, não uma versão operacional do eFinance.** Não consulta SQL Server, não conecta à TecnoSpeed ou às APIs municipais/nacionais, não autoriza/cancela NFS-e, não envia e-mails e não modifica dados de produção.

Os nomes, valores e datas são apenas exemplos de apresentação, derivados das referências visuais. **Combos de ISS, NBS e Tributos Federais contêm valores ilustrativos** até serem informadas as opções e regras exatas do portal municipal utilizado. A inclusão automática do item 9 e a trava do item 7 foram implementadas para representar as decisões do mapeamento funcional.

O botão **Salvar** em Tributos Federais mantém alterações em memória enquanto a página está aberta. Recarregar a página restaura o estado da demonstração.

## Ajustes de apresentação (revisão)

- Botão **Tributos Federais** agora aparece sempre junto a **Histórico**, com estilo destacado e sem ser encoberto pela barra de filtros.
- Botões da barra superior distribuem-se em até duas linhas conforme a largura do navegador, sem ficarem cortados.
- Removida a **rolagem horizontal adicional** da grade e a rolagem concorrente na paginação. Apenas a área de contratos pode ter rolagem vertical quando não couberem todas as linhas.
- O acesso a Tributos Federais permanece disponível também na etapa 2 do fluxo Gerar NFS-e.

## Barra de ações
Os comandos possuem o mesmo alinhamento vertical e mesmo espaçamento entre todos os botões; os grupos de ações não criam separações artificiais. Em telas menores, os comandos se reorganizam para não serem cortados.
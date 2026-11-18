# eFinance — Protótipo da tela NFS-e

Protótipo estático e navegável para apresentação da proposta da nova tela **NFS-e — Nota Fiscal de Serviço**. Os dados exibidos são fictícios e as operações fiscais são simuladas.

## Execução local

Abra `index.html` no navegador Chrome ou Edge. Não há dependências, necessidade de build ou backend.

## Publicação na Vercel

Importe este repositório na Vercel, usando:

- **Framework Preset:** Other
- **Root Directory:** diretório raiz do repositório
- **Build Command:** não configurar
- **Output Directory:** `.`

A entrada da aplicação é `index.html`. O projeto utiliza `styles.css`, `app.js` e `assets/marca-efinance.png`, todos relativos à raiz. Não é necessário fazer upload de ZIP.

## Estrutura de arquivos

- `index.html` — interface principal da aplicação.
- `styles.css` — identidade visual, layout e responsividade.
- `app.js` — dados demonstrativos, navegação e interações.
- `assets/marca-efinance.png` — logo sem sino.
- `MANUAL_FUNCIONAL_NFSE.md` — documentação completa que também aparece no botão Ajuda.
- `MAPEAMENTO_INTERACOES.md` — lista das ações de interface e regras simuladas.

## Revisão funcional de 18/11/2026

- FIN com apenas **Aberto / Fechado**, default **Fechado** no perfil Carla e configuração por empresa.
- Consulta exclui contrato sem FIN e sem Data Término Liberação Futura, simultaneamente.
- Item 07 usa liberação futura como trava provisória: regra final pendente de validação do Financeiro.
- Geração com múltiplos clientes mostra soma dos valores por item em modo somente leitura; Renegociar permite editar um contrato e salvar sem emitir.
- **Gerar Lote** disponível para CPF, desabilitado quando há CNPJ na seleção.
- Status por item: Gerada, Não Gerada, Pendente de Transmissão, Cancelada e Arquivada; sem Gerada Parcialmente.
- Combo Itens apenas 01–09, filtro Pessoa CPF/CNPJ, quatro opções de data para pesquisa.
- Transmitir com Item 07 preparado abre Tributos Federais antes de continuar.
- **Excluir** removido e **Arquivar Nota** restaurado.
- Cabeçalhos ajustados, tooltip dos valores editados, contador Total da Busca efetivo.
- **Ajuda** e mapeamento revisados. Operações fiscais e logs continuam demonstrativos.

## Histórico da apresentação (versões anteriores)

- Cabeçalho do módulo identificado como **Fiscal — Nota Fiscal de Serviço Eletrônica**.

- Edição independente de **% Venda** e **Valor** na primeira etapa de Gerar NFS-e, recalculando os somatórios da seleção.
- **Total Selecionado (Item)** exibe a **quantidade de contratos marcados** que atendem aos filtros (ex.: quatro contratos com Item 03 = **4**); não soma valores em reais. **Total a Emitir (Item)** permanece a soma monetária dos itens elegíveis, respeitando o combo **Itens** e filtros (Item 03 nos 16 contratos de exemplo = R$ 121,68).
- **Total (Valor Venda)** soma os valores reais da coluna Valor Venda dos contratos retornados pelos filtros (R$ 3.262.669,79 na amostra inicial), sem usar o valor estático anterior.
- **Total (Valor Venda Selecionado)** soma os valores da coluna Valor Venda apenas dos contratos marcados e que correspondem aos filtros; inicia em R$ 0,00 e atualiza automaticamente ao marcar/desmarcar.
- Cabeçalho ajustado para **Kasabella 1 - Loja 352**, avatar **CA**.
- A coluna **Itens Enviados p/ NFS-e** exibe **código e descrição completa**; o item **09 - Reserva** aparece marcado em azul, sem “(Auto)”, mantendo a regra de inclusão automática com 3/4/5.
- Listagem de emitentes de referência e exemplos com código e descrição para IBS/CBS, Serviço NFS-e, ISS e NBS na segunda etapa.
- Remoção da grade de ambientes e do atalho de Tributos Federais da segunda etapa. **Tributos Federais** permanece na barra superior.
- Remoção do botão **Pré-visualizar DANFSe** da barra.
- Filtro **FIN**, com as seis opções do print de referência, mantendo o filtro **Itens** para a regra especial do Item 7.
- Botão **Impostos** ao lado de **Tributos Federais**, exibindo em leitura os valores salvos por contrato no formulário de tributos.
- Botão **Log Geração Notas** entre Impostos e Imprimir, com acompanhamento de lotes simulados, estados de autorização/rejeição e respectivos retornos/motivos.
- Remoção da coluna **E./S.** na listagem NFS-e.
- **Tributos Federais** sem os campos editáveis de base de PIS/COFINS, CSLL, CP e IR: a base é calculada sobre o valor dos itens selecionados/preparados, e **Outras Retenções** fica à direita.
- Manual interativo **Ajuda** e documentação de apoio atualizados.

Os estados FIN e os dados da emissão são ilustrativos; nenhuma comunicação fiscal ocorre. O estado é mantido em memória e reinicia quando a página é recarregada.

## Funcionalidades demonstradas

- Filtros, seleção de contratos, tabela e totalizadores.
- **Gerar NFS-e:** fluxo de seleção dos itens e informações fiscais.
- **Tributos Federais:** formulário demonstrativo de PIS/COFINS/CSLL, CP, IR e retenções.
- Regra do **Item 7:** exigir preenchimento da Data Término de Montagem somente quando Item 7 estiver selecionado no combo.
- Seleção dos itens 3, 4 e 5 incluindo automaticamente o item 9.
- **Ajuda:** manual completo com busca e navegação por seções.

## Importante

Este repositório é uma **proposta visual/funcional**, não o sistema eFinance em produção. Nenhum botão emite ou transmite documentos fiscais reais. Cálculos tributários, estados e arquivos de demonstração não constituem integração validada com prefeitura ou TecnoSpeed. Confira as pendências técnicas em `MANUAL_FUNCIONAL_NFSE.md`.

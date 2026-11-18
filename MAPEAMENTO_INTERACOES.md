# Mapeamento de interações NFS-e — revisão 18/11/2026

Este é um **protótipo de apresentação**, sem conexão fiscal. Fonte detalhada: MANUAL_FUNCIONAL_NFSE.md.

| Recurso | Regra implementada na demonstração |
|---|---|
| FIN | Aberto / Fechado; Carla inicia Fechado; outros perfis têm valor de bootstrap configurável. |
| Consulta | Exclui contratos com FIN não feito E Data Término Liberação Futura vazia. |
| Item 07 | Só quando selecionado no combo, exige data de Término Liberação Futura para selecionar contrato. Regra provisória, Financeiro precisa confirmar. |
| Status | Gerada, Não Gerada, Pendente de Transmissão, Cancelada, Arquivada; estado por item. |
| Combo Itens | 01 a 09, sem Todos; filtra situação, habilitação e Total a Emitir do item. |
| Pessoa | Pessoa Física (CPF 11 dígitos) / Jurídica (CNPJ 14 dígitos), com identificadores fictícios. |
| Data do filtro | Data de Emissão, Data de Venda, Data Término de Montagem, Data Término Liberação Futura. |
| Gerar NFS-e (um contrato) | Edita % e Valor dos itens, com tooltip original/alterado; segunda aba de parâmetros fiscais. |
| Gerar NFS-e (vários contratos) | Soma valores dos itens de todos os contratos selecionados e bloqueia edição. |
| Gerar Lote | Somente com CPF, botão desabilitado se existir qualquer CNPJ na seleção. |
| Renegociar | Apenas um contrato, primeira aba de itens, Salvar sem preparar ou transmitir. |
| Regra automática | 3+4+5 inclui 9 - Reserva, sem duplicação, marcado na mesma cor. |
| Controle por item | Apenas itens preparados avançam para Pendente; outros seguem Não Gerada, sem Gerada Parcialmente. |
| Transmitir | Abre Tributos Federais para revisão antes do Item 07 preparado; sem Item 07 transmite diretamente na simulação. |
| Arquivar Nota / Excluir | Arquivar restaurado; Excluir removido. |
| Tributos Federais | Base automática dos itens, alíquotas configuráveis e Outras Retenções à direita. |
| Impostos | Leitura dos tributos salvos por contrato, sem inventar códigos ou ICMS. |
| Log Geração Notas | Lotes fictícios: Status, Cliente, Contrato, Emitente, Itens Gerados, Retorno e motivo da rejeição. |
| Total Selecionado (Item) | Conta os contratos marcados nos filtros, em todas as páginas. |
| Total a Emitir (Item) | Soma monetária do item escolhido para contratos elegíveis Não Gerada. |
| Total da Busca (Item) | Quantidade de registros retornados, sem total fictício. |
| Total (Valor Venda) | Soma da coluna Valor da Venda do conjunto filtrado. |
| Total (Valor Venda Selecionado) | Soma da coluna Valor da Venda apenas nos contratos marcados. |
| Colunas | Empresa; Loja; Cód. Cliente; Cliente/Tomador; Tipo de Venda; Contrato; Status NFS-e; Data da Venda; Pedidos; Valor da Venda; Itens da NFS-e; Data Término de Montagem; Data Término Liberação Futura; FIN Processado. |

**Riscos e pendências:** regra real do Financeiro para Item 07, política de FIN das demais empresas, fonte de CPF/CNPJ e emissor, persistência e autorização de lotes, retenções tributárias oficiais e testes integrados. Os dados do protótipo são fictícios e não representam notas autorizadas.

# Mapeamento de interações — protótipo NFS-e

Este material descreve o comportamento implementado **somente na demonstração**. Não há integração fiscal, persistência em servidor nem transmissão real.

| Elemento | Comportamento demonstrativo |
|---|---|
| Ver selecionados | Filtra os contratos marcados. |
| Gerar NFS-e | Abre a etapa de itens e, após **Próximo**, o formulário de emissão. |
| % Venda / Valor | Ambos podem ser editados individualmente no passo de seleção; o somatório atualizado considera os itens marcados. Um campo não recalcula o outro automaticamente. |
| Itens 3, 4 e 5 | Quando selecionados simultaneamente, o item 9 é acrescentado automaticamente, sem duplicidade. |
| Combo Itens = 7 | Bloqueia a marcação do contrato se Data Término de Montagem estiver vazia. A trava não afeta outros itens. |
| Emitente | Lista de prestadores exibidos nos prints da tela original, inclusive LB SERVICOS DE MONTAGENS. |
| IBS/CBS | Código demonstrativo `TESTE001 - Teste - Simulado`. |
| Cód. Serviço NFS-e | `140601 - Instalação e montagem de aparelhos, máquinas e equipamentos`. |
| Tipo Trib. ISS | `01 - Tributável dentro do município`. |
| Item NBS | `101040000 - Serviços de montagem e de edificação de construções pré-fabricadas`. |
| Dados da emissão | Emitente, IBS/CBS, Serviço, ISS, NBS e data devem estar preenchidos para confirmar. Não há grid de ambientes nem botão Tributos Federais nessa etapa. |
| Ok | Prepara os itens e dados na memória do navegador. Não transmite documento. |
| FIN | Combo com --Todos--, Aberto - Todos, Aberto - Não enviado, Aberto - Enviado sem fin, Fechado - Enviado com fin e Em substituição. O conjunto é fictício para demonstrar o filtro. |
| Tributos Federais | Abre formulário com as opções tributárias e alíquotas, sem campos editáveis de base. A base vem da soma dos valores dos itens gerados/selecionados do contrato. |
| Salvar Tributos Federais | Salva as alíquotas e configurações **por contrato** nesta sessão; valores são calculados sobre a base automática dos itens. Fechar sem salvar descarta a edição do modal. |
| Impostos | Abre tabela somente leitura com PIS/COFINS próprios e retidos, CSLL, IR, CP e outras retenções conforme os tributos federais salvos. Sem dados salvos, mostra aviso. |
| Colunas não deriváveis dos tributos | Exibem “—” em Impostos; não são preenchidas com ICMS ou valores inventados. |
| Outras Retenções | Campo reposicionado na terceira coluna (lado direito) da tela Tributos Federais. |
| Coluna E./S. | Removida da listagem NFS-e, preservando o restante. |
| Log Geração Notas | Botão entre Impostos e Imprimir: exibe Status, Cliente, Contrato, Emitente, Itens Gerados e Retorno. Exibe motivos de rejeição, identificação do lote e data de geração. |
| Preparação de NFS-e | Registra no log local o estado Preparada, vinculando o contrato, emitente e os itens. |
| Transmitir | Com contratos selecionados, **simula** um lote e atualiza os logs com autorizações/rejeições fictícias ou pendência de preparação. Sem transmissão real. |
| Status | Mostra as 12 opções aprovadas e filtra os registros fictícios. |
| Fin Processado | Exibe check/alerta e tooltip de data/hora de finalização do exemplo. |
| Loja, busca e datas | Filtram os registros fictícios. |
| Paginação | Funciona na lista exibida. |
| Redefinir Valor da NFS-e | Altera valor da venda somente em memória. |
| Transmitir / Reenviar NFS-e por e-mail | Mostram avisos, sem comunicação externa. |
| DANFSe | Abre documento auxiliar ilustrativo; **Pré-visualizar DANFSe** foi removido. |
| Cancelar / Excluir | Alteram apenas os dados locais mediante confirmação. |
| Inutilizar Número | Somente aviso; aplicabilidade municipal a validar. |
| Downloads | Exporta JSON demonstrativo, não XML fiscal. |
| Histórico | Eventos locais ilustrativos. |
| Imprimir | Impressão do navegador. |
| Ajuda | Manual pesquisável que descreve fluxos, origens das colunas, somatórios, FIN, regras Item 7/9 e impostos. |

## Limitações e validações pendentes

- Os exemplos de emitente, IBS/CBS, ISS, serviço e NBS devem ser confrontados com os cadastros e o portal municipal antes de uso real.
- A base é derivada do somatório dos valores dos itens selecionados/preparados; em Tributos Federais, os quatro campos de base (PIS/COFINS, CSLL, CP, IR) foram retirados. As alíquotas e os valores são demonstrativos; o cálculo exibido em Impostos é `base × alíquota / 100`.
- Os logs e motivos de rejeição são inteiramente fictícios e não representam consultas ou retornos de emissão fiscal reais.
- FIN é um filtro da demonstração e **não** deve ser derivado automaticamente do sinalizador **Fin Processado** na implementação.
- As alterações de % Venda/Valor e de tributos estão em memória, por contrato, durante a sessão.
- Não há APIs de prefeitura, NFSe Nacional, TecnoSpeed, armazenamento real, autenticação ou emissão/transmissão efetiva.

## Layout e navegação

Barra compacta de ações, mantendo apenas **Ajuda** afastado à direita. A tabela principal não cria uma segunda barra horizontal. O modal **Impostos** possui rolagem interna quando necessário para exibir todas as colunas.

A versão textual completa dos critérios funcionais está em `MANUAL_FUNCIONAL_NFSE.md`.

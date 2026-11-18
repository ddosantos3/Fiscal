# Mapeamento Funcional — Nova Tela NFS-e

**Módulo:** Fiscal — Nota Fiscal de Serviço Eletrônica  
**Revisão:** 18/11/2026 — alinhamento funcional da equipe  
**Situação:** protótipo navegável, sem backend fiscal ou transmissão real

## 1. Proposta e limites

Tela exclusiva para consultar contratos elegíveis à NFS-e, selecionar itens em momentos independentes, preparar notas individuais e em lote, renegociar valores, acompanhar a geração e conferir tributos. Preservar a identidade do eFinance sem herdar comandos exclusivos da NF-e.

O protótipo usa dados e CPF/CNPJ fictícios. FIN, regras de autorização, tabelas de origem, códigos tributários, descontos/deduções e integração com prefeitura/TecnoSpeed exigem especificação e homologação antes de produção. O Item 07 tem uma condição provisória de liberação futura, ainda não validada pelo Financeiro.

## 2. Barra de ações

| Botão | Comportamento |
|---|---|
| Ver selecionados | Alterna consulta completa e contratos marcados. |
| Gerar NFS-e | Abre seleção de itens e, após Próximo, parâmetros de emissão. Consolida valores de vários contratos sem permitir edição no modal coletivo. |
| Gerar Lote | Prepara notas dos contratos CPF marcados. Desabilitado quando não há seleção ou qualquer CNPJ está selecionado. Usa lote demonstrativo. |
| Renegociar | Exige um contrato marcado; abre apenas a primeira aba (itens e valores), permite ajuste e Salvar, sem segunda aba e sem emissão. |
| Transmitir | Simula transmissão dos contratos marcados e atualiza o Log. Se houver Item 07 preparado, exige antes conferência em Tributos Federais para cada contrato pertinente; cancelar a conferência interrompe o envio. |
| DANFSe | Documento auxiliar ilustrativo, sem valor fiscal. |
| Reenviar NFS-e e XML por e-mail | Apenas aviso; não realiza reenvio externo. |
| Forçar Nova Consulta | Atualiza os dados locais. |
| Cancelar NFS-e | Simula cancelamento dos contratos selecionados com confirmação. |
| Inutilizar Número | Apenas aviso; aplicabilidade municipal depende de avaliação. |
| Arquivar Nota | Marca notas selecionadas como Arquivada, com confirmação. |
| Downloads | Exportação JSON demonstrativa; não gera XML fiscal válido. |
| Redefinir Valor da NFS-e | Edita Valor Venda somente nesta sessão de demonstração. |
| Histórico | Histórico de exemplo por contrato. |
| Tributos Federais | Edita alíquotas/retenções, com base calculada pelo valor dos itens e botão Salvar. |
| Impostos | Exibe os tributos federais salvos por contrato; valores de demonstração e demais colunas sem fonte exibidas como indisponíveis. |
| Log Geração Notas | Mostra Status, Cliente, Contrato, Emitente, Itens Gerados e Retorno, incluindo motivo de rejeição, lote, data e paginação. |
| Imprimir | Impressão do navegador. |
| Ajuda | Manual funcional integrado, organizado por temas. |

**Removidos da nova tela:** Excluir, Pré-visualizar DANFSe, CC-e, Gerar Nota NF-e, Dados NF-e, Volumes, Mensagens NF-e, Gerar Devolução, Gerar Nota Avulsa, Logs Rece. Federal, Aplicar Desconto, Alt. Cliente e os controles exclusivos da NF-e. O recurso de Arquivar Nota foi restaurado.

## 3. Filtros e regras da consulta

- **FIN:** somente Aberto e Fechado. No perfil **Carla/Kasabella**, o default é **Fechado** para carregar contratos finalizados. Para outras empresas, o default é configurável por perfil (o comportamento inicial demonstrativo para outros perfis é Aberto, sujeito a validação).
- **Elegibilidade base:** excluir contrato somente quando **FIN não processado E Data Término Liberação Futura vazia** ocorrerem simultaneamente; depois aplicar os demais filtros.
- **Status:** exclusivamente Gerada, Não Gerada, Pendente de Transmissão, Cancelada e Arquivada. Gerada substitui a nomenclatura anterior Autorizada da listagem.
- **Itens:** somente 01 a 09. A opção Todos foi removida. O filtro determina o item avaliado na consulta, sua situação e o valor a emitir.
- **Pessoa:** --Todas--, Pessoa Física e Pessoa Jurídica, classificadas pela presença de CPF (11 dígitos) ou CNPJ (14 dígitos) no cadastro. No protótipo, identificadores são fictícios.
- **Loja:** filtra estabelecimento. **Buscar por:** cliente, contrato e código.
- **Período > Filtrar Por:** Data de Emissão, Data de Venda, Data Término de Montagem e Data Término Liberação Futura. Os campos de/até aplicam limites ao campo escolhido. A Data de Emissão só existe após preparação. A escolha nominal de 1/3/6/12 meses permanece ilustrativa até integração de período real.

## 4. Colunas e fontes funcionais

Todas as **14 colunas** da grid exibem um tooltip nativo ao pousar o mouse sobre o **título da coluna**. A nomenclatura foi mantida conforme a definição funcional, incluindo as abreviações. As três telas de origem abaixo são **referências para o desenvolvedor localizar as informações**; não constituem identificação confirmada de tabelas, campos SQL ou procedures.

| Coluna exibida | Tooltip do título | Informação apresentada / referência funcional |
|---|---|---|
| Emp | Código da empresa | Código da empresa vinculada ao contrato. |
| Loja | Código da loja | Código da loja vinculada ao contrato. |
| Cód. | Código | Código cadastral do cliente. |
| Cliente | Nome do cliente | Nome do tomador/cliente do contrato; cadastro do cliente. |
| Tipo Venda | Tipo de Venda | Classificação da venda no Comercial. |
| Contrato | Número do contrato | Identificador do contrato registrado no Comercial. |
| Status | Status da Nota | Situação da NFS-e para o item selecionado no filtro. |
| Data Venda | Data da Venda | Data comercial do registro da venda. |
| Pedidos | Número dos Pedidos | Números dos pedidos vinculados ao contrato. |
| Valor Venda | Valor da Venda | Valor financeiro/comercial da venda. |
| Itens Enviados P/ gerar NFS-e | Itens enviados para gerar NFS-e, com código e descrição | Código e descrição dos itens preparados/enviados por contrato. |
| **Térm.Prog.** | **Data do término da Programação** | Data de término da montagem/programação, proveniente da tela **Gerenciamento de Montagem/Assist. Técnica**. Apresentar em DD/MM/AAAA, sem horário. |
| **Término Lib.** | **Data término do processo de liberação** | Data de término da liberação, proveniente de **Comercial > Gerenciamento de Contratos Futuros**. Apresentar em DD/MM/AAAA, sem horário. |
| **F.P.** | **Status do processo de finalização** | Indicador de FIN processado, com check ou alerta, proveniente de **Comercial > Contratos Realizados**. O tooltip da **célula** mantém a data/hora em que o FIN foi concluído, quando disponível. |

### Referências obrigatórias para busca de informações

1. **Gerenciamento de Montagem/Assist. Técnica:** consultar a origem da data de término da programação/montagem para **Térm.Prog.**.
2. **Comercial > Contratos Realizados:** consultar o processo de finalização financeira, seu status e data/hora, para **F.P.**.
3. **Comercial > Gerenciamento de Contratos Futuros:** consultar a data de término da liberação para **Término Lib.**.

As demais colunas devem continuar utilizando suas origens cadastrais, comerciais e fiscais já existentes. A equipe de desenvolvimento precisa identificar os campos/tabelas reais, o vínculo empresa/loja/contrato e os critérios de dados ausentes. **A alteração de nomenclatura não modifica as regras de seleção, filtragem, lote, renegociação ou tributação já aprovadas.**


## 5. Seleção e Item 07

A seleção de itens não depende de selecionar o contrato pai ou todos os itens simultaneamente. O mesmo contrato pode ter emissões em momentos diferentes.

**Item 07 — regra provisória:** somente ao escolher o Item 07 no combo Itens, bloquear o checkbox de contratos sem **Data Término Liberação Futura**. Essa data é hipótese funcional para a liberação financeira; a equipe deve confirmar a regra efetiva do Financeiro antes da implementação real. Outros itens não usam essa trava especial.

**Inclusão automática:** marcar itens 03, 04 e 05 faz incluir o **09 - Reserva** uma única vez, com checkbox azul e descrição sem “(Auto)”. Não permitir desmarcar a Reserva isoladamente enquanto os três itens estiverem marcados.

**Emissões parciais:** manter situação fiscal **por item**, em vez de promover automaticamente o contrato/segunda nota a Gerada Parcialmente. Item não preparado continua **Não Gerada**; item preparado fica **Pendente de Transmissão**; autorizado fica **Gerada**; cancelamento/arquivamento seguem estado do item. O filtro Status exibe o estado do Item escolhido.

## 6. Gerar NFS-e, Gerar Lote e Renegociar

**Gerar NFS-e — etapa 1:** exibir checkbox, código/descrição do item, fornecedor, % Venda, Valor e total selecionado. Um contrato permite editar % e Valor independentemente, sem recálculo automático entre eles. Passar o mouse sobre o Valor mostra o original e eventual valor alterado.

**Mais de um cliente:** usar os contratos selecionados e somar os valores do mesmo item em todos eles. Os campos de % e Valor ficam **somente leitura**. O total da etapa é a soma dos itens escolhidos de todos os contratos. Não somar percentuais de clientes como se fossem um único percentual.

**Etapa 2:** Emitente, IBS/CBS, Cód. Serviço NFS-e, Tipo Trib. ISS, Item NBS com descrição, Data Emissão e Informações Adicionais / Fisco. Não incluir grade de ambientes nem botão Tributos Federais nessa aba. O exemplo NBS é **101040000 — Serviços de montagem e de edificação de construções pré-fabricadas**. Códigos do mockup são demonstrativos e devem ser validados com o município.

**Gerar Lote:** somente contratos PF/CPF podem compor o lote. Se qualquer cliente PJ/CNPJ estiver marcado, o botão fica desabilitado. As notas preparadas ficam associadas ao lote simulado e podem ser acompanhadas no Log.

**Renegociar:** um único contrato, apenas a aba de itens, valores editáveis e botão Salvar. Não abrir parâmetros fiscais nem gerar NFS-e.

## 7. Tributos Federais e revisão na transmissão

Tela com Situação tributária PIS/COFINS, Tipo de retenção PIS/COFINS, alíquotas de PIS/COFINS próprios e retidos, CSLL, CP, IR, Outras Retenções e Salvar.

Não exibir campos de entrada de bases de PIS/COFINS, CSLL, CP ou IR. A base demonstrativa é calculada pela **soma do valor dos itens preparados/selecionados no contrato**; os valores são calculados como base × alíquota / 100, sem representar apuração fiscal oficial. **Outras Retenções** fica à direita.

Ao clicar **Transmitir**, se houver Item **07** preparado no lote, abrir a janela Tributos Federais antes da continuidade. Em vários contratos com Item 07, revisar cada um. Sem Item 07 preparado, não abrir essa janela. Fechar a revisão sem salvar interrompe a transmissão simulada.

## 8. Impostos e Log Geração Notas

**Impostos:** consultar as alíquotas/valores federais salvos por contrato (PIS, COFINS, CSLL, IR, CP e demais retenções quando aplicáveis). Sem salvamento, exibir aviso. Campos não derivados da configuração de tributos não devem receber ICMS ou valores inventados.

**Log Geração Notas:** colunas Status, Cliente, Contrato, Emitente, Itens Gerados, Retorno (autorizada, rejeitada, pendente, motivo de rejeição). Registrar preparação, número do lote e data, com paginação. Os logs do protótipo são **fictícios**; prefeitura e prestador de API não são consultados.

## 9. Totalizadores do rodapé

| Indicador | Regra |
|---|---|
| Total Selecionado (Item) | **Quantidade inteira** de contratos marcados que atendem aos filtros, incluindo outras páginas; quatro contratos = 4, não valor monetário. |
| Total a Emitir (Item) | **Soma em reais do item escolhido** para todos os contratos Não Gerada elegíveis e retornados pelos filtros, selecionados ou não. Não existe opção Todos. |
| Total da Busca (Item) | **Quantidade efetiva** de registros filtrados carregados, não o número fictício 416. |
| Total (Valor Venda) | Soma em reais da coluna Valor da Venda dos registros retornados pelos filtros, incluindo páginas não visíveis. |
| Total (Valor Venda Selecionado) | Soma em reais da coluna Valor da Venda apenas dos contratos marcados que correspondem à consulta. Não ratear pelo item. |

Somar valores monetários em centavos para evitar imprecisão. Os 16 registros da amostra histórica tinham Item 03 totalizando R$ 121,68 sem filtro FIN; **o total inicial muda com FIN Fechado e novos critérios de elegibilidade**. Não tratar exemplos estáticos como dados fiscais.

## 10. Critérios de aceite e pontos pendentes

1. Default FIN Fechado no perfil Carla, FIN com apenas Aberto/Fechado; default de outros perfis configurável.
2. Sem FIN e sem liberação futura, contrato fora da consulta.
3. Item 07 bloqueado sem liberação futura apenas na demonstração; confirmar gatilho definitivo no Financeiro.
4. Geração múltipla soma valores por item sem permitir edição; edição individual mantém tooltip original/alterado.
5. Gerar Lote habilita somente com seleção CPF; CNPJ bloqueia. Renegociar abre somente aba de itens e salva sem emitir.
6. Status restritos às cinco situações; controle por item, sem Gerada Parcialmente.
7. Filtros de data, Pessoa e Item implementados; Excluir removido e Arquivar Nota presente.
8. Transmitir com Item 07 exige revisão tributária; sem 07, não exige.
9. Ajuda e manual sincronizados; preservar testes de filtros, seleção, tributos e cálculos.
10. Conferir os 14 títulos e tooltips da grid, preservar as datas em DD/MM/AAAA e validar as referências de origem em Gerenciamento de Montagem/Assist. Técnica, Comercial > Contratos Realizados e Comercial > Gerenciamento de Contratos Futuros.

**Pendente para produção:** regra real do FIN/Item 07; tipos e dados de cliente; seleção em lote versus restrição de CNPJ; eventos e retornos reais de prefeitura; persistência por item/documento; autorização, cancelamento, segurança, concorrência, auditoria, integração e homologação tributária.

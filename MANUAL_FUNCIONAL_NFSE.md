# MAPEAMENTO FUNCIONAL — NOVA TELA NFS-e

**Módulo:** Fiscal — Nota Fiscal de Serviço Eletrônica (NFS-e)

**Finalidade:** Documentar a proposta funcional, as ações, as colunas e suas origens, os totalizadores, as regras de seleção, o fluxo de emissão e o formulário Tributos Federais, conforme as definições e mockups fornecidos.

**Situação:** Material de especificação funcional e protótipo demonstrativo. Dados e integrações reais ainda dependem de implementação/homologação.

---

## Sumário

1. [Visão geral](#overview)
2. [Botões e ações](#buttons)
3. [Filtros e pesquisa](#filters)
4. [Colunas e origem dos dados](#columns)
5. [Regras de seleção](#selection)
6. [Gerar NFS-e](#generation)
7. [Tributos Federais](#taxes)
8. [Totalizadores e rodapé](#totals)
9. [O que foi removido](#removed)
10. [Integrações e aceite](#validation)
11. [Protótipo x produção](#demo)

---

<a id="overview"></a>

## 1. Visão geral

*Objetivo, escopo e proposta da nova tela.*

Fiscal · Nota Fiscal de Serviço Eletrônica

**Manual funcional da nova tela NFS-e**

Centralizar a consulta, seleção e preparação de notas de serviço em uma tela exclusiva, sem misturar comandos específicos de NF-e, preservando a identidade visual do eFinance.

- Tela exclusiva NFS-e
- Informações integradas
- Seleção independente
- Tributos Federais

### Proposta funcional

01

#### Localizar contratos

Filtrar por loja, status, item, cliente, contrato e período.

02

#### Conferir informações

Ver montagem, liberação futura, situação financeira e itens associados.

03

#### Selecionar e preparar

Selecionar itens individualmente, aplicar a exceção do item 7 e compor os itens da NFS-e.

04

#### Configurar tributos

Preencher as configurações federais conforme campos e regras do portal da prefeitura.

### O que muda

* Criação de uma tela independente para **NFS-e**; a tela existente de NF-e permanece preservada.
* Novas colunas com informações de Pós-Venda, Contratos Futuros e Comercial.
* Remoção de comandos e filtros que não fazem parte do fluxo de NFS-e.
* Inclusão do botão **Gerar NFS-e** e do formulário **Tributos Federais**.
* Novos indicadores de quantidade de itens e manutenção da soma de Valor Venda.

**Escopo do protótipo:** a interface e as interações são demonstrativas. A emissão fiscal, o banco de dados, os serviços da prefeitura e as permissões reais não estão conectados.

---

<a id="buttons"></a>

## 2. Botões e ações

*O que faz cada botão da barra superior.*

## Botões da tela principal

Os comandos abaixo aparecem na ordem prevista no mockup aprovado, mantendo o padrão de ícones, bordas e cores do eFinance.

| Botão | Função proposta | No protótipo |
| --- | --- | --- |
| **Ver selecionados** | Alternar entre todos os registros encontrados e apenas os contratos marcados. | Filtra localmente. |
| **Gerar NFS-e** | Iniciar a seleção de itens e a configuração dos dados de emissão da nota de serviço. | Abre duas etapas com dados de exemplo. |
| **Transmitir** | Enviar documentos preparados à integração responsável pela autorização fiscal. | Mensagem simulada; não transmite. |
| **DANFSe** | Acessar o documento auxiliar da Nota Fiscal de Serviço. | Abre documento ilustrativo. |
| **Reenviar NFS-e e XML por e-mail** | Reenviar os documentos fiscais ao destinatário. | Somente demonstração; não envia e-mail. |
| **Forçar Nova Consulta** | Atualizar a situação dos documentos junto à integração fiscal. | Atualiza a visualização local. |
| **Pré-visualizar DANFSe** | Consultar o documento auxiliar antes de imprimir. | Abre prévia ilustrativa. |
| **Cancelar NFS-e** | Solicitar cancelamento conforme regras do município ou ambiente nacional aplicável. | Altera estado local após confirmação. |
| **Inutilizar Número** | Comando mantido no desenho, sujeito à confirmação de aplicabilidade para NFS-e. | Exibe aviso informativo. |
| **Excluir** | Remover registros quando a situação e as permissões permitirem. | Remove apenas da sessão local. |
| **Downloads** | Disponibilizar arquivos dos documentos fiscais. | Exporta JSON demonstrativo, não XML fiscal. |
| **Redefinir Valor da NFS-e** | Redefinir valor usado no fluxo, observando regras de negócio existentes. | Atualiza o valor em memória. |
| **Histórico** | Consultar movimentações e eventos do registro. | Exibe histórico ilustrativo. |
| **Tributos Federais** | Abrir o cadastro de PIS/COFINS/CSLL, CP, IR e outras retenções. | Abre formulário com Salvar local. |
| **Imprimir** | Imprimir os documentos disponíveis. | Aciona a impressão do navegador. |
| **Ajuda** | Abrir este manual funcional da tela NFS-e. | Manual navegável e pesquisável. |

**Ordem e posicionamento:** **Ver selecionados** vem antes de **Gerar NFS-e**; **Tributos Federais** fica após **Histórico**; **Imprimir** e **Ajuda** permanecem no fim da barra, com espaçamento uniforme.

---

<a id="filters"></a>

## 3. Filtros e pesquisa

*Combos, pesquisa textual, datas e paginação.*

## Filtros e pesquisa

A tela disponibiliza filtros necessários à identificação dos contratos e itens candidatos à emissão.

| Controle | Funcionamento |
| --- | --- |
| **Loja** | Restringe os registros à loja selecionada. |
| **Status** | Consulta registros segundo a situação da emissão (por exemplo, Não Geradas, Emitidas e Canceladas). |
| **Itens** | Seleciona um item específico do contrato ou todos; ao escolher o **Item 7** ativa a trava especial de montagem. |
| **Buscar por** | Permite localizar pelo cliente; no protótipo, também por contrato ou código do cliente. |
| **Período** | Define a abrangência temporal da pesquisa. |
| **Filtrar Por** | Indica a data usada como referência da consulta; o protótipo oferece Data Venda, Data Término de Montagem e Data Término Liberação Futura. |
| **de / até** | Delimitam a data inicial e final. |
| **Aplicar Filtro** | Executa a consulta conforme os critérios informados. |
| **Paginação** | Navega pelas páginas; seleção e totalizadores devem considerar o conjunto filtrado e não somente o que está visível na página. |

### Tipos de venda não disponíveis

**AT Com Custo** e **AT Sem Custo** devem sair das opções de pesquisa destinadas à NFS-e. Os demais tipos seguem as regras existentes.

**Importante:** a exclusão desses tipos das opções de pesquisa não confirma, por si só, a remoção de registros históricos. Esse ponto permanece sujeito à validação técnica.

---

<a id="columns"></a>

## 4. Colunas e origem dos dados

*Significado das colunas e localização das informações.*

## Colunas da listagem

As três colunas novas têm origens funcionais definidas. Para as colunas herdadas, o mapeamento aponta o dado apresentado; a tabela e o campo SQL exatos ainda dependem de confirmação técnica.

| Coluna | O que apresenta | Origem funcional |
| --- | --- | --- |
| **Emp** | Código da empresa. | Cadastro empresarial existente (mapeamento técnico a confirmar). |
| **Loja** | Código do estabelecimento. | Cadastro da loja (mapeamento técnico a confirmar). |
| **Cód.** | Código do cliente. | Cadastro do cliente já utilizado pelo eFinance. |
| **Cliente** | Nome do cliente associado. | Cadastro do cliente já utilizado pelo eFinance. |
| **Tipo Venda** | Modalidade da venda. | Dados comerciais já utilizados na listagem. |
| **Contrato** | Identificação do contrato. | Registro de contrato existente. |
| **Status** | Situação da emissão da NFS-e. | Controle fiscal / retorno da integração de emissão (detalhamento a confirmar). |
| **Data Venda** | Data de realização da venda. | Registro de venda existente. |
| **Pedidos** | Pedidos associados à venda/contrato. | Vínculo com pedidos existentes. |
| **Valor Venda** | Valor financeiro da venda. | Registro comercial da venda. |
| **Itens Enviados p/ NFS-e** | Itens encaminhados à composição da NFS-e. | Controle de itens da emissão; persistência exata a confirmar. |
| **E./S.** | Indicador de entrada/saída preservado da tela original. | Campo existente na listagem; origem a confirmar. |
| **Data Término de Montagem** Nova | Data efetiva de conclusão da montagem, no formato **DD/MM/AAAA**, sem horário. | **Pós-Venda** — conclusão da montagem vinculada ao contrato. |
| **Data Término Liberação Futura** Nova | Data de término da liberação futura, no formato **DD/MM/AAAA**, sem horário. | **Gerenciamento de Contratos Futuros** — campo **Término Lib.** do contrato. |
| **Fin Processado** Nova | Check azul quando processado e triângulo de alerta quando pendente. Na finalização, o tooltip mostra data e hora. | **Comercial > Contratos Realizados** — situação do processamento financeiro. |

### Regras de apresentação das novas colunas

* Montagem não concluída ou sem data: apresentar **célula vazia** (no protótipo, traço indicativo).
* Liberação futura sem data: apresentar **célula vazia**.
* **Fin Processado:** ao passar o mouse ou focalizar o indicador finalizado, exibir **Data Fin: 11/11/2026 23:41:08** como exemplo de data/hora.
* Essas colunas apenas consultam dados de origem; **não alteram** os processos de Pós-Venda, Contratos Futuros e Comercial.

---

<a id="selection"></a>

## 5. Regras de seleção

*Independência, Item 7 e composição 3 + 4 + 5 + 9.*

## Regras de seleção dos itens

R1

### Remover a trava do registro pai

Cada item poderá ser selecionado individualmente, inclusive em momentos distintos para o mesmo contrato. A seleção de um item não obriga selecionar os demais e não deve bloquear seleções posteriores.

**Resultado:** flexibilidade para emitir itens de um contrato em momentos diferentes, preservando as validações fiscais necessárias.

R2

### Exceção exclusiva do combo Itens = 7

**Somente quando o combo Itens estiver com o Item 7 selecionado**, o sistema deverá consultar a coluna **Data Término de Montagem**, que recebe a conclusão da montagem do Pós-Venda.

| Seleção no combo | Data Término de Montagem | Seleção do contrato |
| --- | --- | --- |
| **Item 7** | Vazia | Bloqueada |
| **Item 7** | Preenchida | Permitida |
| **Qualquer outro item** | Vazia ou preenchida | Esta trava específica **não se aplica**. |

**Mensagem de bloqueio:** “Não é possível selecionar este contrato para o Item 7, pois a montagem ainda não foi concluída.”

R3

### Inclusão automática do Item 9

Quando os **itens 3, 4 e 5** forem selecionados conjuntamente, a tela de Itens Selecionados deve apresentar também o **item 9 — Reserva**, sem duplicações.

Selecionados**03 · 04 · 05**

→

Resultado esperado**03 · 04 · 05 · 09**

Os itens continuam identificados e vinculados ao contrato de origem, para conferência antes da emissão.

Comportamento em seleção parcial ou ao desmarcar itens: **precisa ser validado**. Neste protótipo, ao deixar de selecionar 3, 4 ou 5, a inclusão automática do item 9 deixa de ser aplicada.

R4

### Seleção independente da emissão

Remover travas da seleção **não** significa dispensar validações fiscais, permissões, situação do documento ou controle contra emissão duplicada.

---

<a id="generation"></a>

## 6. Gerar NFS-e

*As duas etapas de Gerar Nota Serviço.*

## Fluxo do botão Gerar NFS-e

O botão **Gerar NFS-e** fica imediatamente após **Ver selecionados**. A janela segue as duas telas da funcionalidade Gerar Nota Serviço já utilizadas no sistema.

**Etapa 1**

### Selecionar itens

Apresenta a relação de itens do contrato com colunas **Itens**, **Fornecedor**, **% Venda** e **Valor**. Permite selecionar ou desmarcar os itens pertinentes, inclusive a regra automática do item 9.

**Rodapé da etapa:** **% Selecionado** e **Total selec.** calculados com base nos itens marcados. **Próximo** avança para os dados de emissão; **Fechar** encerra a janela.

| Item | Descrição |
| --- | --- |
| 01 | Produto |
| 02 | Transporte/Armazenamento |
| 03 | Coordenação |
| 04 | Supervisão de Montagem |
| 05 | Instalação/Assistência |
| 06 | Layout/Medição/Conferência |
| 07 | Contratado - Franquia |
| 08 | Financeira |
| 09 | Reserva (inclusão automática na combinação 3, 4 e 5) |

**Etapa 2**

### Gerar Nota Fiscal de Serviço

Após **Próximo**, exibir os dados necessários à preparação da nota, conforme o mockup de referência.

| Campo | Finalidade |
| --- | --- |
| Emitente | Selecionar o prestador/loja responsável pela emissão. |
| Dt. Emissão | Informar data da emissão. |
| IBS/CBS | Selecionar configuração relacionada aos novos tributos, conforme integração. |
| Cód. Serviço NFS-e | Informar classificação municipal do serviço. |
| Tipo Trib. ISS | Selecionar tratamento tributário do ISS. |
| Item NBS | Informar classificação NBS do serviço. |
| Informação Adicional | Texto adicional apresentado no documento, quando aplicável. |
| Informação p/ o fisco | Observações destinadas ao fisco, quando aplicável. |
| Opção / Ambiente | Seleção do ambiente/forma conforme configuração exibida na tela. |
| Total à Vista / Total a Prazo | Valores associados à opção/ambiente apresentado. |

**Botões:** **Tributos Federais** abre o formulário fiscal; **Ok** confirma a preparação; **Fechar** encerra a janela.

**No protótipo:** Emitente, NBS e ambiente são validados antes da confirmação. **Ok não transmite** documentos; o botão Transmitir da tela principal representa a etapa própria de transmissão.

---

<a id="taxes"></a>

## 7. Tributos Federais

*Combos, bases, alíquotas, retenções e Salvar.*

## Janela Tributos Federais

O botão fica ao lado de **Histórico** e abre uma janela exclusiva, com a identidade visual do eFinance e os mesmos tipos de campos do print de referência.

#### Situação tributária PIS/COFINS

Combo com a classificação tributária. Exemplo exibido: **01 — Operação Tributável com Alíquota Básica**.

#### Tipo de retenção PIS/COFINS

Combo para definir retenção. Exemplos de referência: **0 — Não Retidos** e **3 — PIS/COFINS/CSLL Retidos**.

### Campos do formulário

| Grupo | Campos e comportamento |
| --- | --- |
| **PIS/COFINS** | Base de cálculo PIS/COFINS; alíquota e valor de PIS — Apuração Própria; alíquota e valor de COFINS — Apuração Própria. |
| **Retenções de PIS/COFINS** | Alíquota e valor de PIS — Retido; alíquota e valor de COFINS — Retido; preenchimento vinculado ao tipo de retenção. |
| **CSLL** | Base de cálculo, alíquota e valor, com exigência condicionada às regras de retenção aplicáveis. |
| **CP — Contribuição Previdenciária** | Checkbox de habilitação, base de cálculo, alíquota e valor. |
| **IR — Imposto de Renda** | Checkbox de habilitação, base de cálculo, alíquota e valor. |
| **Outras Retenções** | Campo destinado ao valor de outras retenções. |

### Exemplo ilustrativo do print aprovado

| Tributo | Base | Alíquota | Valor |
| --- | --- | --- | --- |
| PIS | R$ 1.000,00 | 0,65% | R$ 6,50 |
| COFINS | R$ 1.000,00 | 3,00% | R$ 30,00 |
| CSLL | R$ 1.000,00 | 1,00% | R$ 10,00 |
| IR | R$ 1.000,00 | 1,50% | R$ 15,00 |

### Salvar e validação

* Manter apenas o botão **Salvar** no rodapé, com **X** no cabeçalho para fechar a janela.
* Salvar os tributos associados ao registro/contrato correspondente.
* Aplicar obrigatoriedades, dependências entre campos e cálculos conforme as regras do **portal da prefeitura** adotado na integração.
* Não apresentar opção **Fechar** no rodapé.

**Pendente de homologação funcional:** o município/portal de referência, a lista completa dos combos, as exigências de preenchimento e os cálculos oficiais precisam ser confirmados. Os valores e opções deste protótipo são demonstrativos, não uma implementação tributária validada.

---

<a id="totals"></a>

## 8. Totalizadores e rodapé

*O que soma cada indicador e como é calculado.*

## Totalizadores no rodapé

Os três primeiros indicadores mostram **quantidade de itens**. O quarto mostra **valor monetário da venda**.

#### Total Selecionado (Item)

Quantidade de itens correspondentes aos registros selecionados. Deve considerar a composição automática aplicável (por exemplo, o item 9), sem duplicidade.

#### Total a Emitir (Item)

Quantidade de itens elegíveis à emissão da NFS-e, de acordo com os critérios de elegibilidade que deverão ser definidos com o desenvolvimento.

#### Total da Busca (Item)

Quantidade de itens retornados pelos filtros da pesquisa, considerando o conjunto completo, não só a página visível.

#### Total (Valor Venda)

Soma do campo Valor Venda dos registros abrangidos pela consulta, exibida em moeda brasileira (R$).

### Regras de consistência

* O critério de contagem é **item**, e não simplesmente quantidade de linhas ou contratos.
* Reaplicar os cálculos após filtros, seleção e inclusão automática de itens, conforme a finalidade de cada indicador.
* Os totais devem refletir todo o conjunto filtrado, mesmo quando há várias páginas.
* Evitar contar um mesmo item duas vezes ao incluir automaticamente o item 9.

**Valores do protótipo:** os exemplos 32 itens a emitir, 416 itens na busca e R$ 78.018.029,38 representam dados de demonstração. A regra exata de elegibilidade do total a emitir e a abrangência monetária precisam ser confirmadas no backend.

---

<a id="removed"></a>

## 9. O que foi removido

*Botões, combos e tipos de venda excluídos.*

## Elementos retirados da tela NFS-e

A interface deve ficar exclusiva para Nota Fiscal de Serviço, sem misturar ações pertinentes apenas à NF-e.

### Botões removidos

Gerar NotaDados NF-eVolumesMensagensGerar DevoluçãoGerar Nota AvulsaLogs Rece. FederalCC-eAplicar DescontoAlt. Cliente

**Observação:** o comando antigo **Gerar Nota** foi substituído no novo fluxo pelo botão específico **Gerar NFS-e**.

### Combos removidos

Natureza da OperaçãoEntrada/SaídaTipo NotaTipo de Contrato

### Tipos de venda retirados da pesquisa

AT Com CustoAT Sem Custo

**Não regressão:** retirar comandos da **nova tela NFS-e** não deve remover ou alterar os recursos equivalentes onde continuam necessários, especialmente na tela atual de NF-e.

---

<a id="validation"></a>

## 10. Integrações e aceite

*Origens, testes de aceite e decisões pendentes.*

## Integrações previstas

| Módulo de origem | Informação consumida | Uso na NFS-e |
| --- | --- | --- |
| **Pós-Venda** | Conclusão da montagem. | Coluna Data Término de Montagem e trava especial do Item 7. |
| **Gerenciamento de Contratos Futuros** | Campo Término Lib. | Coluna Data Término Liberação Futura. |
| **Comercial > Contratos Realizados** | Situação e data/hora de finalização financeira. | Indicador Fin Processado e tooltip. |
| **Integração NFS-e / Prefeitura** | Situação fiscal, campos e regras tributárias. | Emissão, consulta, cancelamento, tributos, documentos e retornos. |

### Critérios de aceite

1. Nova tela NFS-e independente, preservando a tela atual de NF-e.
2. Botões, filtros, tipos de venda e colunas conforme o mapeamento.
3. Datas de montagem e liberação futura no formato **DD/MM/AAAA**, sem horário.
4. Fin Processado exibindo check/alerta e data/hora de finalização no tooltip.
5. Itens selecionáveis individualmente, mesmo quando pertencem ao mesmo contrato.
6. Combo **Itens = 7**: seleção bloqueada quando a data de montagem está vazia.
7. Combo diferente de 7: a trava especial de montagem não é aplicada.
8. Seleção 3 + 4 + 5 compõe 3 + 4 + 5 + 9 sem duplicidade.
9. Gerar NFS-e apresenta seleção de itens seguida dos dados da emissão.
10. Tributos Federais abre com campos e dependências exigidos pelo portal da prefeitura.
11. Salvar Tributos Federais mantém os dados vinculados ao registro.
12. Totalizadores consistentes com filtros, paginação e itens selecionados.
13. Permissões e regras fiscais preexistentes preservadas.

### Questões ainda abertas

* Mapear tabelas/campos e relacionamentos SQL para as três novas colunas.
* Validar seleção parcial dos itens 3, 4 e 5 e a remoção automática do item 9.
* Definir mecanismos contra duplicidade de emissão em momentos distintos.
* Definir critério exato de **Total a Emitir** e abrangência de **Valor Venda**.
* Validar aplicabilidade do botão **Inutilizar Número** para NFS-e.
* Confirmar portal municipal, combos, regras de retenção, obrigatoriedades e cálculos oficiais.
* Definir persistência e recuperação dos tributos e permissões de alteração.

---

<a id="demo"></a>

## 11. Protótipo x produção

*O que já funciona e o que é demonstrativo.*

## O que esta demonstração representa

O protótipo foi construído para validar o fluxo funcional e a proposta visual com a equipe, incluindo a apresentação à Carla.

#### Disponível nesta versão

* Busca, filtros e seleção de contratos.
* Janela Gerar NFS-e em duas etapas.
* Inclusão automática do item 9.
* Exceção do Item 7.
* Tributos Federais com Salvar local.
* Histórico, prévias e outras ações ilustrativas.
* Manual funcional integrado à Ajuda.

#### Não integrado

* Banco de dados e autenticação do eFinance.
* Consultas reais aos módulos de origem.
* Emissão, autorização e cancelamento fiscal.
* APIs municipais/nacionais e TecnoSpeed.
* Regras tributárias homologadas.
* Envio de e-mails e documentos oficiais.
* Persistência permanente dos tributos.

### Roteiro sugerido para a apresentação

1. Apresentar os filtros, as novas colunas e as quatro somatórias.
2. Selecionar um contrato e abrir **Gerar NFS-e**.
3. Demonstrar a seleção 3 + 4 + 5 e a inclusão automática do 9.
4. Avançar até o formulário de emissão e abrir **Tributos Federais**.
5. Mostrar os combos, retenções e **Salvar**.
6. Voltar à listagem, selecionar o **Item 7** e mostrar o bloqueio quando a montagem está vazia.
7. Abrir **Ajuda** para revisar decisões aprovadas e pendências.

**Uso demonstrativo:** nomes, dados, valores, arquivos e processos desta interface são exemplos. Ações locais não significam que a operação foi executada no ambiente de produção.

---
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
8. [Impostos](#impostos)
9. [Log Geração Notas](#generation-logs)
10. [Totalizadores e rodapé](#totals)
11. [O que foi removido](#removed)
12. [Integrações e aceite](#validation)
13. [Protótipo x produção](#demo)

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
| **Transmitir** | Enviar lotes de NFS-e à integração fiscal na implementação real. | Simula lote dos contratos selecionados e registra os retornos no Log Geração Notas. |
| **DANFSe** | Acessar o documento auxiliar da Nota Fiscal de Serviço. | Abre documento ilustrativo. |
| **Reenviar NFS-e e XML por e-mail** | Reenviar os documentos fiscais ao destinatário. | Somente demonstração; não envia e-mail. |
| **Forçar Nova Consulta** | Atualizar a situação dos documentos junto à integração fiscal. | Atualiza a visualização local. |
| **Cancelar NFS-e** | Solicitar cancelamento conforme regras do município ou ambiente nacional aplicável. | Altera estado local após confirmação. |
| **Inutilizar Número** | Comando mantido no desenho, sujeito à confirmação de aplicabilidade para NFS-e. | Exibe aviso informativo. |
| **Excluir** | Remover registros quando a situação e as permissões permitirem. | Remove apenas da sessão local. |
| **Downloads** | Disponibilizar arquivos dos documentos fiscais. | Exporta JSON demonstrativo, não XML fiscal. |
| **Redefinir Valor da NFS-e** | Redefinir valor usado no fluxo, observando regras de negócio existentes. | Atualiza o valor em memória. |
| **Histórico** | Consultar movimentações e eventos do registro. | Exibe histórico ilustrativo. |
| **Tributos Federais** | Abrir o cadastro de PIS/COFINS/CSLL, CP, IR e outras retenções. | Abre formulário com Salvar local. |
| **Impostos** | Consultar os tributos federais salvos do contrato na tabela de impostos. | Consulta read-only, sem inventar registros de ICMS. |
| **Log Geração Notas** | Consultar o andamento dos lotes e o retorno de autorização/rejeição de cada nota, com o motivo de rejeição. | Consulta local com exemplos de lote e resultados simulados. |
| **Imprimir** | Imprimir os documentos disponíveis. | Aciona a impressão do navegador. |
| **Ajuda** | Abrir este manual funcional da tela NFS-e. | Manual navegável e pesquisável. |

**Ordem e posicionamento:** **Ver selecionados** vem antes de **Gerar NFS-e**; **Tributos Federais**, **Impostos** e **Log Geração Notas** ficam após **Histórico**; **Imprimir** e **Ajuda** permanecem no fim da barra, com espaçamento uniforme.

---

<a id="filters"></a>

## 3. Filtros e pesquisa

*Combos, pesquisa textual, datas e paginação.*

## Filtros e pesquisa

A tela disponibiliza filtros necessários à identificação dos contratos e itens candidatos à emissão.

| Controle | Funcionamento |
| --- | --- |
| **Loja** | Restringe os registros à loja selecionada. |
| **Status** | Filtra pela situação do documento fiscal; **--Todos--** remove esse filtro. O protótipo inicia com **Não Geradas**. |
| **Itens** | Seleciona um item específico do contrato ou **--Todos--**; atualiza os somatórios monetários de Total Selecionado e Total a Emitir. Ao escolher o **Item 7**, ativa também a trava especial de montagem. |
| **FIN** | Opções --Todos--; Aberto - Todos; Aberto - Não enviado; Aberto - Enviado sem fin; Fechado - Enviado com fin; Em substituição. Estados demonstrativos independentes do indicador Fin Processado. |
| **Buscar por** | Permite localizar pelo cliente; no protótipo, também por contrato ou código do cliente. |
| **Período** | Define a abrangência temporal da pesquisa. |
| **Filtrar Por** | Indica a data usada como referência da consulta; o protótipo oferece Data Venda, Data Término de Montagem e Data Término Liberação Futura. |
| **de / até** | Delimitam a data inicial e final. |
| **Aplicar Filtro** | Executa a consulta conforme os critérios informados. |
| **Paginação** | Navega pelas páginas; seleção e totalizadores devem considerar o conjunto filtrado e não somente o que está visível na página. |

### Opções do combo Status

O combo apresenta as opções abaixo, na ordem da tela de referência:

- --Todos--
- Não Geradas
- Geradas Parcialmente
- Pendente de Transmissão
- Transmitindo
- Aguardando Resposta
- Autorizada
- Inutilizada
- Denegada
- Cancelada
- Nota de Entrada
- Arquivada

**Comportamento no protótipo:** o filtro inicial permanece em **Não Geradas**. Selecionar **--Todos--** apresenta todos os registros demonstrativos; escolher um status sem registros correspondentes retorna uma busca vazia. A presença da opção na interface não implica implementação de regras fiscais específicas para esse status.

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
| **Itens Enviados p/ NFS-e** | Código e descrição completa de cada item preparado para a NFS-e, por exemplo **03 - Coordenação**, **04 - Supervisão de Montagem**, **05 - Instalação/Assistência** e **09 - Reserva**. Exibição em linhas na mesma célula e texto integral ao passar o mouse. | Códigos dos itens preparados por contrato, com descrições obtidas do mesmo catálogo da etapa **Gerar NFS-e**; persistência definitiva a confirmar. |
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

Quando os **itens 3, 4 e 5** forem selecionados conjuntamente, a tela de Itens Selecionados deve apresentar também o **item 9 — Reserva**, sem duplicações. **O item 09 aparece marcado na mesma cor azul dos demais itens, sem o sufixo “(Auto)”**. Enquanto 3, 4 e 5 estiverem selecionados, não é possível remover o item 9 dessa composição: uma tentativa de desmarcá-lo será revertida.

Selecionados**03 · 04 · 05**

→

Resultado esperado**03 · 04 · 05 · 09**

Os itens continuam identificados e vinculados ao contrato de origem, para conferência antes da emissão. Após preparar a NFS-e, a coluna **Itens Enviados p/ NFS-e** mostrará o código e a descrição de cada item, em vez de somente os códigos.

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

Apresenta a relação de itens do contrato com colunas **Itens**, **Fornecedor**, **% Venda** e **Valor**. Permite selecionar ou desmarcar os itens pertinentes, editar individualmente **% Venda** e **Valor** e aplicar a regra automática do item 9. No protótipo, cada valor digitado atualiza o somatório correspondente, mas mudar o percentual não altera automaticamente o valor monetário (essa relação depende da regra real de negócio). Os valores editados são mantidos por contrato durante a sessão.

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
| 09 | Reserva |

**Etapa 2**

### Gerar Nota Fiscal de Serviço

Após **Próximo**, exibir os dados necessários à preparação da nota, conforme o mockup de referência.

| Campo | Finalidade |
| --- | --- |
| Emitente | Selecionar o prestador/loja da lista da tela original (por exemplo, LB SERVICOS DE MONTAGENS). |
| Dt. Emissão | Informar data da emissão. |
| IBS/CBS | Selecionar **TESTE001 - Teste - Simulado** no exemplo demonstrativo. |
| Cód. Serviço NFS-e | **140601 - Instalação e montagem de aparelhos, máquinas e equipamentos**. |
| Tipo Trib. ISS | **01 - Tributável dentro do município**. |
| Item NBS | **101040000 - Serviços de montagem e de edificação de construções pré-fabricadas**. |
| Informação Adicional | Texto adicional apresentado no documento, quando aplicável. |
| Informação p/ o fisco | Observações destinadas ao fisco, quando aplicável. |

**Botões:** **Ok** confirma a preparação simulada; **Fechar** encerra a janela. O botão **Tributos Federais** permanece apenas na barra principal. Foram removidos da segunda etapa os controles de ambientes e o combo de itens.

**No protótipo:** Emitente, IBS/CBS, Cód. Serviço NFS-e, Tipo Trib. ISS, NBS e data são validados antes da confirmação. **Ok não transmite** documentos; o botão Transmitir da tela principal representa a etapa própria de transmissão.

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
| **PIS/COFINS** | Alíquotas e valores calculados sobre a base automática formada pelos itens, inclusive os valores editados. |
| **Retenções de PIS/COFINS** | Alíquota e valor de PIS — Retido; alíquota e valor de COFINS — Retido; preenchimento vinculado ao tipo de retenção. |
| **CSLL** | Alíquota e valor calculados automaticamente sobre a mesma base de itens, quando a retenção estiver habilitada. |
| **CP — Contribuição Previdenciária** | Checkbox de habilitação, alíquota e valor calculado sobre a base automática. |
| **IR — Imposto de Renda** | Checkbox de habilitação, alíquota e valor calculado sobre a base automática. |
| **Outras Retenções** | Campo de valor preservado, reposicionado no canto direito da janela. |

### Base de cálculo automática a partir dos itens

Foram retirados os campos editáveis **Base de cálculo PIS/COFINS**, **CSLL - Base de Cálculo**, **CP - Base de Cálculo** e **IR - Base de Cálculo**. A nova base é a **soma dos valores dos itens preparados para a NFS-e**; antes da confirmação da emissão, a demonstração utiliza os itens atualmente selecionados (inclusive o item 9 automático).

**Exemplo demonstrativo:** itens 3 = R$ 9,36; 4 = R$ 7,49; 5 = R$ 17,78; 9 = R$ 0,00. **Base = R$ 34,63**. PIS 0,65% = aproximadamente R$ 0,23; COFINS 3% = R$ 1,04. Quando um valor de item for alterado, a base acompanha o valor preparado/selecionado para o contrato.

A base é informativa e não pode ser digitada; as alíquotas e demais configurações continuam editáveis. A regra exata de incidência, possíveis exclusões e deduções para cada tributo deve ser homologada com a prefeitura antes da implementação fiscal real.

### Salvar e validação

* Manter apenas o botão **Salvar** no rodapé, com **X** no cabeçalho para fechar a janela.
* Salvar alíquotas, retenções e outras configurações associadas ao contrato; bases e valores são calculados automaticamente a partir dos itens.
* Aplicar obrigatoriedades, dependências entre campos e cálculos conforme as regras do **portal da prefeitura** adotado na integração.
* Não apresentar opção **Fechar** no rodapé.

**Pendente de homologação funcional:** o município/portal de referência, a lista completa dos combos, as exigências de preenchimento e os cálculos oficiais precisam ser confirmados. Os valores e opções deste protótipo são demonstrativos, não uma implementação tributária validada.

---

<a id="impostos"></a>

## 8. Impostos

A tela **Impostos** é aberta pelo botão situado imediatamente à direita de **Tributos Federais** na barra principal. Ela mostra, para o contrato ativo, os dados salvos na janela de Tributos Federais.

* **Sem salvamento:** mostrar aviso de ausência de tributos federais salvos, sem criar imposto fictício.
* **Após Salvar:** exibir PIS/COFINS de apuração própria, retenções quando aplicáveis, CSLL, IR, CP e outras retenções, conforme os campos habilitados/preenchidos.
* **Base, alíquota e valor:** a base é calculada pela soma dos itens gerados/selecionados do contrato; os valores exibidos seguem `base × alíquota / 100`, de forma demonstrativa.
* **Demais campos da grade:** os que não derivam do formulário de Tributos Federais devem aparecer como **—**; não criar ICMS ou códigos tributários sem dados.
* **Persistência:** local, em memória, vinculada ao contrato, até recarregar a página. A janela de consulta é somente leitura.

**Validação futura:** a ligação com os tributos fiscais efetivos e o tratamento tributário do município exigem homologação própria.

---

<a id="generation-logs"></a>

## 9. Log Geração Notas

O botão **Log Geração Notas** é exibido entre **Impostos** e **Imprimir**. A janela acompanha o andamento da geração em lotes e apresenta as colunas:

| Coluna | Informação |
| --- | --- |
| **Status** | Estado do processo: Preparada, Aguardando preparação/resposta, Autorizada ou Rejeitada. |
| **Cliente** | Nome do cliente do registro processado. |
| **Contrato** | Número do contrato do registro. |
| **Emitente** | Prestador de serviço selecionado para a emissão. |
| **Itens Gerados** | Códigos dos itens incluídos na nota, inclusive o item 9 quando automático. |
| **Retorno** | Confirmação de autorização ou mensagem detalhada da rejeição, incluindo seu motivo, quando houver. |

A janela exibe **data de geração, identificação de lote e paginação**. Ao preparar uma NFS-e, o protótipo registra a etapa Preparada. Ao acionar **Transmitir** com um ou mais contratos selecionados, simula um lote e mostra os respectivos retornos. Os primeiros registros são exemplos fictícios de Autorizada, Rejeitada e Aguardando Resposta.

**Atenção:** os resultados atuais, inclusive autorizações e motivos de rejeição, são **simulados**. Na implementação real, deverão ser consultados e persistidos os protocolos, erros e resultados retornados pela integração com a prefeitura, associados ao lote e à nota correspondente. O protótipo não transmite notas nem comprova autorização fiscal.

---

<a id="totals"></a>

## 10. Totalizadores e rodapé

*O que soma cada indicador e como é calculado.*

## Totalizadores no rodapé

O rodapé apresenta **cinco totalizadores**. Os dois primeiros mostram **somas monetárias dos itens (R$)**, o terceiro conserva a quantidade da busca e os dois últimos exibem somas da coluna **Valor Venda** para toda a consulta e somente para os contratos selecionados.

#### Total Selecionado (Item)

**Soma em reais** dos valores dos itens dos contratos **marcados na consulta atual**. Quando o combo **Itens** estiver em **03 - Coordenação**, soma somente o valor do item 3 dos contratos selecionados. No exemplo de um contrato com valor de R$ 9,36, retorna **9,36**, e não 1. Com **--Todos--**, soma os valores de todos os itens dos contratos marcados, sem duplicação.

#### Total a Emitir (Item)

**Soma em reais** dos valores dos itens de **todos os contratos elegíveis para emissão (status Não Gerada)** retornados pelos filtros, independentemente de estarem selecionados. No exemplo com os **16 registros demonstrativos** e o Item 03, soma **R$ 121,68**. Com **--Todos--**, soma todos os itens de todos os contratos elegíveis; com 01, apenas os valores do Item 01; e assim para 02 a 09.

#### Total da Busca (Item)

Quantidade de itens retornados pelos filtros da pesquisa, considerando o conjunto completo, não só a página visível.

#### Total (Valor Venda)

**Soma real, em reais, dos valores da coluna Valor Venda** de todos os contratos efetivamente retornados pelos filtros, incluindo outras páginas. No conjunto inicial dos 16 contratos demonstrativos, o resultado é **R$ 3.262.669,79**. O valor deve ser recalculado após filtros e alterações no valor de venda.

#### Total (Valor Venda Selecionado)

**Soma em reais da coluna Valor Venda somente dos contratos marcados no checkbox**, desde que correspondam aos filtros da consulta. Não se limita à página aberta e recalcula imediatamente quando o usuário marca ou desmarca contratos, aplica filtros ou altera o valor de uma venda.

- **Nenhum contrato marcado:** R$ 0,00.
- **Somente o contrato de Daniel Ferreira Mendes marcado:** R$ 60.400,00, correspondente ao Valor Venda desse contrato na demonstração.
- **Vários contratos marcados:** soma única dos valores de venda desses contratos, sem duplicar valores pela quantidade de itens.
- **Combo Itens:** determina quais itens são somados em Total Selecionado (Item) e Total a Emitir (Item), mas **não rateia a coluna Valor Venda do contrato**. A escolha do Item 07 mantém as travas de seleção da montagem.

Na implementação real, a fonte do Valor Venda deve ser a mesma exibida na coluna da listagem, para garantir consistência entre linha, seleção e rodapé.

### Regras de consistência

* Os dois primeiros totalizadores representam **valores monetários de itens**, não quantidades de registros ou checkboxes.
* O combo **Itens** define a composição: 01 a 09 soma somente o respectivo item; **--Todos--** soma todos os itens, cada um apenas uma vez, inclusive a Reserva.
* **Total Selecionado** considera contratos marcados que correspondem à consulta atual; **Total a Emitir** considera contratos Não Gerada retornados pelos filtros, selecionados ou não. Quando o **Item 07** estiver selecionado, o total a emitir exclui contratos sem **Data Término de Montagem**, conforme a trava de seleção existente.
* Recalcular após filtros, seleção de contratos, troca do item e alteração do valor de qualquer item.
* Os totais contemplam todos os registros filtrados carregados na aplicação, não só a página visível.
* **Total (Valor Venda Selecionado)** considera apenas os contratos marcados e que correspondem à consulta atual, utilizando o Valor Venda uma vez por contrato.
* Acumular centavos inteiros para preservar precisão monetária e impedir dupla contagem do Item 09.

**Valores do protótipo:** os 16 contratos carregados apresentam valores demonstrativos individualizados do Item 03 que totalizam **R$ 121,68**; um contrato demonstra o valor unitário **R$ 9,36**. O número **416 na busca** permanece um indicador ilustrativo da referência visual, sem representar 416 contratos realmente carregados. Já o **Total (Valor Venda)** é calculado sobre os 16 registros existentes e começa em **R$ 3.262.669,79**, deixando de usar o valor fictício fixo de R$ 78.018.029,38. Os dois primeiros totalizadores somam somente os registros demonstrativos existentes. O backend deverá fornecer os valores de cada item por contrato e o conjunto completo, incluindo os resultados de outras páginas.

---

<a id="removed"></a>

## 11. O que foi removido

*Botões, combos e tipos de venda excluídos.*

## Elementos retirados da tela NFS-e

A interface deve ficar exclusiva para Nota Fiscal de Serviço, sem misturar ações pertinentes apenas à NF-e.

### Botões removidos

Gerar Nota, Dados NF-e, Volumes, Mensagens, Gerar Devolução, Gerar Nota Avulsa, Logs Rece. Federal, CC-e, Aplicar Desconto, Alt. Cliente e Pré-visualizar DANFSe.

**Observação:** o comando antigo **Gerar Nota** foi substituído no novo fluxo pelo botão específico **Gerar NFS-e**.

### Combos removidos

Natureza da Operação, Entrada/Saída, Tipo Nota e Tipo de Contrato.

### Coluna removida

**E./S.** foi removida da tabela exclusiva de NFS-e.

### Tipos de venda retirados da pesquisa

AT Com CustoAT Sem Custo

**Não regressão:** retirar comandos da **nova tela NFS-e** não deve remover ou alterar os recursos equivalentes onde continuam necessários, especialmente na tela atual de NF-e.

---

<a id="validation"></a>

## 12. Integrações e aceite

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
10. A primeira etapa de emissão permite editar % Venda e Valor, sem perder a seleção automática.
11. A segunda etapa não exibe ambientes nem o botão Tributos Federais e apresenta os combos com códigos e descrições.
12. O combo FIN apresenta as seis opções definidas.
13. Tributos Federais apresenta os campos de referência da prefeitura e salva no contrato.
14. Impostos mostra os valores salvos do contrato, sem dados fiscais inventados.
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

## 13. Protótipo x produção

*O que já funciona e o que é demonstrativo.*

## O que esta demonstração representa

O protótipo foi construído para validar o fluxo funcional e a proposta visual com a equipe, incluindo a apresentação à Carla.

#### Disponível nesta versão

* Busca, filtros e seleção de contratos.
* Janela Gerar NFS-e em duas etapas.
* Inclusão automática do item 9.
* Exceção do Item 7.
* Tributos Federais com base calculada automaticamente pelos itens e janela Impostos para consulta.
* Log Geração Notas com exemplos de autorização, rejeição e lote simulado.
* Filtro FIN e edição de % Venda e Valor por item.
* Histórico, DANFSe e outras ações ilustrativas.
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
4. Avançar ao formulário de emissão e conferir os códigos (inclusive NBS com descrição).
5. Na barra principal, preencher **Tributos Federais**, conferir a base automática, clicar **Salvar** e consultar os valores na janela **Impostos**.
6. Preparar uma NFS-e e abrir **Log Geração Notas**; simular um lote pelo botão **Transmitir** para acompanhar status e retorno.
6. Voltar à listagem, selecionar o **Item 7** e mostrar o bloqueio quando a montagem está vazia.
7. Abrir **Ajuda** para revisar decisões aprovadas e pendências.

**Uso demonstrativo:** nomes, dados, valores, arquivos e processos desta interface são exemplos. Ações locais não significam que a operação foi executada no ambiente de produção.

---
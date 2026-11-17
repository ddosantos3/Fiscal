# Mapeamento de interações — protótipo para demonstração

| Elemento | Comportamento nesta versão |
|---|---|
| Ver selecionados | Alterna a lista entre todos e apenas os registros marcados. |
| Gerar NFS-e | Abre a seleção de itens e depois o formulário de emissão, espelhando os dois prints fornecidos. |
| Seleção itens 3, 4 e 5 | Inclui automaticamente o item 9; retirar um desses itens remove a inclusão automática. |
| Próximo | Abre "Gerar Nota Fiscal de Serviço". |
| Emitente, IBS/CBS, Serviço, ISS, NBS e Data | Campos editáveis com opções de demonstração. |
| Ok | Valida Emitente, NBS e Ambiente, registra os itens preparados no estado local e não faz transmissão. |
| Tributos Federais (barra superior) | Botão destacado imediatamente ao lado de Histórico e sempre visível; abre janela com os campos do print e cálculos demonstrativos de PIS, COFINS, CSLL, CP e IR. |
| Tributos Federais (Gerar NFS-e, etapa 2) | Abre a mesma janela sem perder os dados da emissão; ao salvar ou fechar retorna à etapa 2. |
| Salvar Tributos Federais | Salva o formulário apenas em memória, por contrato, até recarregar. |
| Filtro Itens = 7 | Impede seleção de contrato com Data Término de Montagem vazia. |
| Fin Processado | Mostra check/alerta e informação financeira de exemplo ao passar o mouse. |
| Loja, Status, busca e datas | Filtram a tabela de registros fictícios. |
| Paginação | Funciona no conjunto de dados carregado. |
| Redefinir Valor da NFS-e | Alteração local de valor para visualização. |
| Transmitir, Reenviar | Apenas notificação explicando que a integração é simulada. |
| DANFSe e Pré-visualizar | Abrem documento auxiliar ilustrativo, sem validade fiscal. |
| Downloads | Exporta os dados demonstrativos em JSON (não em XML fiscal). |
| Histórico | Apresenta eventos ilustrativos. |
| Cancelar, Excluir | Alteram somente o estado local após confirmação. |
| Inutilizar Número | Somente aviso; depende de análise de aplicabilidade no fluxo municipal. |
| Imprimir | Usa a impressão do próprio navegador. |
| Ajuda | Abre manual funcional interativo com 11 assuntos, menu lateral e pesquisa. Explica os 16 botões, filtros, todas as colunas e origens, Item 7, seleção 3/4/5 + 9, emissão, tributos, totalizadores, exclusões, critérios de aceite e limitações do protótipo. |

## Escopo não implementado

- Autenticação, autorização, permissões reais e integração com a infraestrutura eFinance.
- Consultas efetivas às telas Pós-Venda, Gerenciamento de Contratos Futuros e Comercial >> Contratos Realizados.
- Persistência de documentos, XML, cálculo tributário oficial, emissão, cancelamento, consulta de protocolo e retorno das prefeituras.
- Cadastros oficiais de NBS, serviços municipais, ISS, regime e suas regras de obrigatoriedade.
- Envio de e-mail, geração real de DANFSe e inutilização fiscal.

Os comportamentos definitivos de cada botão podem ser refinados depois que forem fornecidos os fluxos operacionais.

## Layout e rolagem

Barra de ações responsiva, sem corte de botões. A grade se adapta à largura do navegador e não cria segunda rolagem horizontal; quando necessário, os registros usam somente rolagem vertical.

## Manual funcional dentro do sistema

O botão **Ajuda** abre uma janela com o título **Ajuda — Manual funcional NFS-e**. A navegação é feita por menu lateral e pesquisa por palavra-chave (incluindo termos sem acento). O conteúdo completo também está disponível em `MANUAL_FUNCIONAL_NFSE.md`.

As informações sobre a origem de cada coluna separam os módulos funcionais confirmados (Pós-Venda; Gerenciamento de Contratos Futuros; Comercial > Contratos Realizados) do mapeamento técnico de tabelas/campos ainda não confirmado. Campos e cálculos tributários dependentes do portal municipal estão identificados como pendência.

**Teste da interface:** abertura e fechamento da Ajuda, troca de assuntos, filtro da pesquisa com e sem resultados, continuidade dos fluxos Gerar NFS-e e Tributos Federais.
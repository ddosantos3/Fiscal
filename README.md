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

## Funcionalidades demonstradas

- Filtros, seleção de contratos, tabela e totalizadores.
- **Gerar NFS-e:** fluxo de seleção dos itens e informações fiscais.
- **Tributos Federais:** formulário demonstrativo de PIS/COFINS/CSLL, CP, IR e retenções.
- Regra do **Item 7:** exigir preenchimento da Data Término de Montagem somente quando Item 7 estiver selecionado no combo.
- Seleção dos itens 3, 4 e 5 incluindo automaticamente o item 9.
- **Ajuda:** manual completo com busca e navegação por seções.

## Importante

Este repositório é uma **proposta visual/funcional**, não o sistema eFinance em produção. Nenhum botão emite ou transmite documentos fiscais reais. Cálculos tributários, estados e arquivos de demonstração não constituem integração validada com prefeitura ou TecnoSpeed. Confira as pendências técnicas em `MANUAL_FUNCIONAL_NFSE.md`.


/**
 * eFinance — Protótipo local NFS-e.
 * Dados e ações são demonstrativos. Nenhuma chamada externa, emissão fiscal,
 * persistência em banco ou comunicação com prefeitura acontece neste código.
 */
'use strict';

const ICON_PATHS = {
  menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  star:'<path d="m12 2 3.1 6.4 7.1 1-5.1 5 .9 7.1-6-3.3-6 3.3.9-7.1-5.1-5 7.1-1Z"/>',
  'star-filled':'<path d="m12 2 3.1 6.4 7.1 1-5.1 5 .9 7.1-6-3.3-6 3.3.9-7.1-5.1-5 7.1-1Z" fill="currentColor"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  info:'<circle cx="12" cy="12" r="10"/><path d="M12 11v6M12 7h.01"/>',
  mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7 10-7"/>',
  calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M7 2v4M17 2v4M3 10h18M8 14h2M14 14h2M8 18h2"/>',
  check:'<path d="m4 12 5 5L20 6"/>',
  layers:'<path d="m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5"/>',
  send:'<path d="m22 2-7 20-4-9-9-4 20-7ZM11 13l11-11"/>',
  printer:'<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6zM18 12h.01"/>',
  refresh:'<path d="M20 11a8 8 0 0 0-14-5L3 9M3 3v6h6M4 13a8 8 0 0 0 14 5l3-3M21 21v-6h-6"/>',
  'x-circle':'<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6m0-6 6 6"/>',
  'circle-off':'<circle cx="12" cy="12" r="10"/><path d="M4.9 4.9 19.1 19.1"/>',
  trash:'<path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15M10 10v7M14 10v7"/>',
  download:'<path d="M12 3v13m-5-5 5 5 5-5M4 17v4h16v-4"/>',
  edit:'<path d="M12 20h9M16 4l4 4-11 11H5v-4L16 4Z"/>',
  help:'<circle cx="12" cy="12" r="10"/><path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 5M12 17h.01"/>',
  filter:'<path d="M4 4h16l-6 7v7l-4 2v-9L4 4Z"/>',
  binoculars:'<path d="M5 3h4v6H5zM15 3h4v6h-4zM5 9l-3 8a4 4 0 0 0 8 0V9m9 0 3 8a4 4 0 0 1-8 0V9M10 12h4"/>',
  alert:'<path d="m12 3 10 18H2L12 3ZM12 9v5M12 17h.01"/>',
  save:'<path d="M4 3h13l3 3v15H4zM7 3v6h9V3M7 21v-8h10v8"/>',
  file:'<path d="M6 2h8l5 5v15H6zM14 2v5h5M9 12h7M9 16h7"/>',
  arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>'
};
function icon(name, size=16) {return `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${ICON_PATHS[name] || ICON_PATHS.file}</svg>`;}
function applyIcons(root=document){root.querySelectorAll('[data-icon]').forEach(el => {el.innerHTML=icon(el.dataset.icon)});}
function escapeHtml(value){return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
const decimal = (v, digits=2)=>new Intl.NumberFormat('pt-BR',{minimumFractionDigits:digits,maximumFractionDigits:digits}).format(Number(v)||0);
const money = v => decimal(v,2);
const parseNumber = s => Number(String(s ?? '0').replace(/\./g,'').replace(',','.')) || 0;
const today = '2026-11-17'; // Referência temporal fixa da apresentação e dos mockups.
const rows = [
  ['28251','Mariana Oliveira Ribeiro','Normal','3531379-1','16/11/2026','595352-595352',1716.92,'15/11/2026','17/11/2026',353],
  ['32569','Renato Almeida Costa','Eventos','3531378','16/11/2026','595338-595338',489.00,'15/11/2026','17/11/2026',353],
  ['31037','Daniel Ferreira Mendes','Curto Prazo','3531377-1','14/11/2026','0-0',60400.00,'14/11/2026','16/11/2026',353],
  ['30774','Marcela Teixeira Nogueira','Curto Prazo','3531375-1','13/11/2026','0-0',515000.00,'13/11/2026','15/11/2026',353],
  ['27580','Bruno Lima Carvalho','Normal','3531376','13/11/2026','0-0',9758.01,'13/11/2026','15/11/2026',353],
  ['27447','Fernanda Martins Rocha','Eventos','3531372','12/11/2026','595229-595229',468.10,'12/11/2026','14/11/2026',353],
  ['29214','Karina Azevedo Santos','Eventos','','12/11/2026','592601-592601',2192.52,'','14/11/2026',353],
  ['31513','Márcio Andrade Pires','Curto Prazo','3531374','12/11/2026','595291-595292',58500.00,'12/11/2026','14/11/2026',353],
  ['6181','Roberto Silveira Batista','Normal','35203505','12/11/2026','0-0',14000.00,'12/11/2026','14/11/2026',352],
  ['6214','Filipe Moreira Campos','Curto Prazo','35203506-1','12/11/2026','0-0',440000.00,'12/11/2026','14/11/2026',352],
  ['32547','Camila Duarte Barbosa','Eventos','3531371','12/11/2026','595301-595302',2756.24,'12/11/2026','14/11/2026',353],
  ['32401','William Oliveira Freitas','Curto Prazo','3531368-2','11/11/2026','0-0',350000.00,'11/11/2026','13/11/2026',353],
  ['32429','Giovana Castro Almeida','Curto Prazo','3531363','11/11/2026','595250-595252',450000.00,'11/11/2026','13/11/2026',353],
  ['32455','Lucas Pereira Monteiro','Curto Prazo','3531369','11/11/2026','0-0',69789.00,'11/11/2026','13/11/2026',353],
  ['32264','João Victor Cardoso','Curto Prazo','3531367','11/11/2026','0-0',1285000.00,'12/11/2026','13/11/2026',353],
  ['20396','Maria Eduarda Fonseca','Normal','3531364','11/11/2026','595173-595173',2600.00,'12/11/2026','13/11/2026',353]
].map((r,i)=>({id:`demo-${i+1}`,emp:1,code:r[0],client:r[1],saleType:r[2],contract:r[3],saleDate:r[4],orders:r[5],value:r[6],montage:r[7],future:r[8],store:r[9],status:'Nao Gerada',fin:i!==6,finDate:i===6?'':'11/11/2026 23:41:08',sentItems:[]}));
// Demonstração: CPF/CNPJ fictícios para validar regras PF/PJ.
const DEMO_DOC_TYPES=['PF','PJ','PF','PF','PJ','PF','PF','PF','PJ','PF','PF','PJ','PF','PF','PJ','PF'];
rows.forEach((r,i)=>{
 r.docId=DEMO_DOC_TYPES[i]==='PJ'?('00000000000000'+(i+1)).slice(-14):('00000000000'+(i+1)).slice(-11);
 r.finStage=r.fin?'Fechado':'Aberto';
 r.itemStatus=Object.fromEntries([1,2,3,4,5,6,7,8,9].map(id=>[id,'Nao Gerada']));
 r.issuedItems=[];r.issueDate='';
});
// Uma linha com FIN feito sem liberação futura demonstra a trava provisória do Item 07.
rows[8].future='';
const FIN_PROFILE_DEFAULTS={carla:'Fechado',other:'Aberto'};
const COMPANY_PROFILE=document.body.dataset.companyProfile||'other';
const INITIAL_FIN=window.NFSE_COMPANY_CONFIG?.defaultFin||FIN_PROFILE_DEFAULTS[COMPANY_PROFILE]||'Aberto';
// O padrão de FIN fora da empresa Carla é configurável e depende da regra de negócio.
const itemCatalog=[
  {id:1,name:'Produto',provider:'FA FORNECEDOR',pct:29.448836,value:137.85},
  {id:2,name:'Transporte/Armazenamento',provider:'M. FORNECEDOR 3 T 1',pct:2.651357,value:12.41},
  {id:3,name:'Coordenação',provider:'KC FORNECEDOR 4',pct:1.999573,value:9.36},
  {id:4,name:'Supervisão de Montagem',provider:'KC FORNECEDOR 4',pct:1.600085,value:7.49},
  {id:5,name:'Instalação/Assistência',provider:'KC FORNECEDOR 4',pct:3.798334,value:17.78},
  {id:6,name:'Layout/Medição/Conferência',provider:'KG FORNECEDOR 353',pct:10.023499,value:46.92},
  {id:7,name:'Contratado - Franquia',provider:'KA FORNECEDOR 2',pct:50.478317,value:236.29},
  {id:8,name:'Financeira',provider:'Kasabella',pct:0,value:0},
  {id:9,name:'Reserva',provider:'MA FORNECEDOR 5',pct:0,value:0},
];
// Valores de exemplo por contrato: 16 registros do item 03 totalizam R$ 121,68.
// O contrato demo-3 conserva o valor R$ 9,36 mostrado no modal aprovado.
// Não são dados fiscais reais; o somatório é calculado a partir desta base de linhas.
const DEMO_ITEM_03_VALUES=[8.12,6.48,9.36,5.24,7.89,9.36,4.50,7.95,6.90,8.35,7.60,9.14,6.72,8.05,6.44,9.58];
rows.forEach((row,index)=>{row.itemValues={3:DEMO_ITEM_03_VALUES[index]};});
// Resolve a descrição na mesma fonte usada pela seleção de itens; mantém os códigos como dados internos.
function describeSentItem(code){
  const id=Number.parseInt(String(code),10);
  const item=itemCatalog.find(entry=>entry.id===id);
  return item?`${String(item.id).padStart(2,'0')} - ${item.name}`:String(code);
}
const taxDefaults={situation:'01',retention:'3',pis:0.65,cofins:3,pisRet:0.65,cofinsRet:3,csllRate:1,cp:false,cpRate:0,ir:true,irRate:1.5,other:0};
const state={selected:new Set(),page:1,pageSize:16,selectedOnly:false,modal:null,taxReturn:null,taxDraft:null,generationLogs:[],logPage:1,logPageSize:10,logBatchSequence:2,step:1,activeRow:null,itemSelection:new Set([3,4,5]),itemEdits:{},taxes:{},generationMode:'normal',renegDraft:null,generationRowIds:[],pendingTaxQueue:[],batchMode:false,genForm:{emitter:'LB SERVICOS DE MONTAGENS',date:today,ibscbs:'TESTE001 - Teste - Simulado',service:'140601 - Instalação e montagem de aparelhos, máquinas e equipamentos',iss:'01 - Tributável dentro do município',nbs:'101040000 - Serviços de montagem e de edificação de construções pré-fabricadas',extra:'(1) Esta NFS-e foi emitida com respaldo na Lei nº 14.097/2005; (2) Documento emitido por ME ou EPP optante pelo Simples Nacional;',fisco:'',env:true},search:'',searchType:'client',searchStart:'',searchEnd:'',searchField:'saleDate',filterItem:'3',filterStore:'',filterStatus:'Nao Gerada',filterFin:INITIAL_FIN,filterPerson:'',period:'3'};
// Histórico ilustrativo: dados inventados exclusivamente para a demonstração, sem vínculo com prefeitura.
state.generationLogs=[
  {id:'demo-log-1',lot:'DEMO-001',generatedAt:'16/11/2026 10:15',status:'Autorizada',recordId:rows[0].id,client:rows[0].client,contract:rows[0].contract,emitter:'LB SERVICOS DE MONTAGENS',items:['03','04','05','09'],returnMessage:'Autorizada (simulação) — NFS-e processada para demonstração.'},
  {id:'demo-log-2',lot:'DEMO-001',generatedAt:'16/11/2026 10:15',status:'Rejeitada',recordId:rows[1].id,client:rows[1].client,contract:rows[1].contract,emitter:'DA SERVICOS DE MONTAGENS',items:['03','04','05'],returnMessage:'Rejeitada (simulação) — serviço municipal incompatível com o cadastro do emitente (motivo fictício).'},
  {id:'demo-log-3',lot:'DEMO-001',generatedAt:'16/11/2026 10:15',status:'Aguardando resposta',recordId:rows[2].id,client:rows[2].client,contract:rows[2].contract,emitter:'G5 SERVICOS DE MONTAGENS',items:['03','04'],returnMessage:'Processamento pendente (simulação) — aguardando retorno do lote.'}
];

const $ = id => document.getElementById(id);
const root=$('modal-root');
function toast(message,type='success'){
  const el=document.createElement('div');el.className=`toast ${type}`;el.textContent=message;$('toast-container').append(el);
  el.addEventListener('click',()=>el.remove());setTimeout(()=>el.remove(),4800);
}
function dateValue(dateBR){const p=String(dateBR||'').split('/');return p.length===3?`${p[2]}-${p[1]}-${p[0]}`:'';}
function personType(row){const d=String(row.docId||'').replace(/\D/g,'');return d.length===11?'PF':d.length===14?'PJ':'';}
function currentRowStatus(row){return row.itemStatus?.[Number(state.filterItem)]||row.status||'Nao Gerada';}
function getFilteredRows(){
 return rows.filter(r=>{
  if(!r.fin&&!r.future)return false;
  if(state.selectedOnly&&!state.selected.has(r.id))return false;
  if(state.filterStore&&String(r.store)!==state.filterStore)return false;
  if(state.filterStatus&&currentRowStatus(r)!==state.filterStatus)return false;
  if(state.filterFin&&(r.fin?'Fechado':'Aberto')!==state.filterFin)return false;
  if(state.filterPerson&&personType(r)!==state.filterPerson)return false;
  const field=state.searchType==='contract'?r.contract:state.searchType==='code'?r.code:r.client;
  if(state.search&&!String(field).toLowerCase().includes(state.search.toLowerCase()))return false;
  const key=state.searchField==='dataMontagem'?'montage':state.searchField==='dataLiberacao'?'future':
   state.searchField==='dataEmissao'?'issueDate':'saleDate';
  const value=dateValue(r[key]);
  if(state.searchStart&&(!value||value<state.searchStart))return false;
  if(state.searchEnd&&(!value||value>state.searchEnd))return false;
  return true;
 });
}
function activeRow(){return rows.find(r=>r.id===state.activeRow) || rows.find(r=>r.code==='27447') || rows[0];}
function isRowLocked(r){return state.filterItem==='7'&&!r.future;}
// Valores monetários por item e por contrato; edições prevalecem sobre a amostra.
function itemForContract(row,id){
  const item=itemCatalog.find(entry=>entry.id===Number(id));
  if(!item||!row)return null;
  const seed=Object.prototype.hasOwnProperty.call(row.itemValues||{},item.id)
    ?row.itemValues[item.id]:item.value;
  const edit=state.itemEdits[row.id]?.[item.id]||{};
  return {...item,value:seed,...edit};
}
function sumItemValues(contracts,filterItem=state.filterItem){
  const ids=filterItem?[Number(filterItem)]:itemCatalog.map(item=>item.id);
  // Centavos inteiros evitam erro de ponto flutuante em valores monetários.
  const cents=contracts.reduce((contractSum,row)=>contractSum+ids.reduce((itemSum,id)=>{
    const item=itemForContract(row,id);
    return itemSum+(item?Math.round(Math.max(0,Number(item.value)||0)*100):0);
  },0),0);
  return cents/100;
}
function footerTotals(filtered){
  const defaultView = false;
  const selectedVisible=filtered.filter(row=>state.selected.has(row.id));
  // Total Selecionado (Item): quantidade de registros/contratos marcados
  // que pertencem ao conjunto filtrado, independentemente da página atual.
  // Não é um somatório monetário nem a contagem de subitens 01–09.
  $('total-selected').textContent=String(selectedVisible.length);
  // Total a Emitir: valores de todos os contratos elegíveis da consulta,
  // independentemente da página atual; não se limita às linhas marcadas.
  const eligible=filtered.filter(row=>currentRowStatus(row)==='Nao Gerada'&&!isRowLocked(row));
  $('total-emit').textContent=money(sumItemValues(eligible));
  $('total-found').textContent=String(filtered.length);
  // Total de vendas em reais: soma dos contratos efetivamente retornados,
  // em centavos inteiros para evitar imprecisões acumuladas.
  const saleCents=filtered.reduce((sum,row)=>sum+Math.round((Number(row.value)||0)*100),0);
  $('total-sale').textContent=money(saleCents/100);
  // Somente contratos marcados e presentes na consulta atual; não soma Valor dos itens.
  // A coluna Valor Venda representa o contrato, portanto não é rateada pelo combo Itens.
  const selectedSaleCents=selectedVisible.reduce((sum,row)=>sum+Math.round((Number(row.value)||0)*100),0);
  $('total-sale-selected').textContent=money(selectedSaleCents/100);
}
function renderTable(){
  const filtered=getFilteredRows();const totalPages=Math.max(1,Math.ceil(filtered.length/state.pageSize));
  if(state.page>totalPages)state.page=totalPages;
  const segment=filtered.slice((state.page-1)*state.pageSize,state.page*state.pageSize);
  $('records-body').innerHTML=segment.map(r=>{
    const locked=isRowLocked(r),sel=state.selected.has(r.id);
    const tooltip=r.fin?`Data FIN: ${r.finDate}`:'Financeiro pendente de processamento';
    const itemLabels=(r.sentItems||[]).map(describeSentItem);
    const itemLabelsHtml=itemLabels.map(value=>`<span class="sent-item-label">${escapeHtml(value)}</span>`).join('');
    return `<tr class="${sel?'is-selected ':''}${locked?'is-locked':''}" data-row-id="${r.id}">
      <td><input type="checkbox" data-select-row="${r.id}" aria-label="Selecionar contrato ${escapeHtml(r.contract||r.code)}" ${sel?'checked':''} ${locked?'disabled title="Item 07: liberação futura ausente (validação do financeiro pendente)"':''} /></td>
      <td>${r.emp}</td><td>${r.store}</td><td>${escapeHtml(r.code)}</td><td title="${personType(r)==='PJ'?'CNPJ':'CPF'} fictício: ${escapeHtml(r.docId)}">${escapeHtml(r.client)}</td><td>${escapeHtml(r.saleType)}</td><td>${escapeHtml(r.contract)}</td><td>${currentRowStatus(r)==='Nao Gerada'?'Não Gerada':escapeHtml(currentRowStatus(r))}</td><td>${r.saleDate}</td><td>${escapeHtml(r.orders)}</td><td class="money">${money(r.value)}</td><td class="sent-items-column" title="${escapeHtml(itemLabels.join(' | '))}">${itemLabelsHtml}</td><td>${r.montage||'—'}</td><td>${r.future||'—'}</td>
      <td><button class="status-mark ${r.fin?'':'warning'}" type="button" aria-label="${escapeHtml(tooltip)}" title="${escapeHtml(tooltip)}" data-action="fin-info" data-record="${r.id}">${icon(r.fin?'check':'alert',20)}</button></td>
    </tr>`;
  }).join('');
  $('empty-state').hidden=filtered.length!==0;
  $('select-all').checked=segment.length>0&&segment.every(r=>state.selected.has(r.id)||isRowLocked(r))&&segment.some(r=>!isRowLocked(r));
  $('select-all').indeterminate=segment.some(r=>state.selected.has(r.id))&&!$('select-all').checked;
  $('page-number').textContent=state.page;$('page-total').textContent=totalPages;
  $('result-count').textContent=filtered.length?`Resultado ${(state.page-1)*state.pageSize+1} - ${Math.min(filtered.length,state.page*state.pageSize)} de ${defaultResultCount(filtered)}`:'Resultado 0 de 0';
  footerTotals(filtered);
  $('item7-note').hidden=state.filterItem!=='7';
  const btn=document.querySelector('[data-action="selected"]');btn.classList.toggle('tool-primary',state.selectedOnly);btn.setAttribute('aria-pressed',String(state.selectedOnly));
  const batch=document.querySelector('[data-action="generate-batch"]');
  if(batch){
    const picked=rows.filter(row=>state.selected.has(row.id));
    const hasCnpj=picked.some(row=>personType(row)==='PJ');
    batch.disabled=!picked.length||hasCnpj;
    batch.title=!picked.length?'Selecione contratos para o lote':hasCnpj?
     'Gerar Lote indisponível: seleção contém CNPJ':'Gerar lote demonstrativo com os CPF selecionados';
  }
}
function defaultResultCount(filtered){return filtered.length;}
function chooseRow(rid,checked){
  const r=rows.find(x=>x.id===rid);if(!r)return;
  if(checked&&isRowLocked(r)){toast('Item 07: liberação futura ausente (regra financeira provisória a validar).','warning');return;}
  if(checked){state.selected.add(rid);state.activeRow=rid;}else state.selected.delete(rid);
  renderTable();
}
function resetSelectionOnItemChange(){
  if(state.filterItem==='7'){
    const locked=rows.filter(r=>isRowLocked(r)&&state.selected.has(r.id));
    locked.forEach(r=>state.selected.delete(r.id));
    if(locked.length)toast(`${locked.length} contrato(s) desmarcado(s): liberação futura ausente no Item 07.`,'warning');
  }
}
function demoTarget(alsoSelect=false){
  const target=rows.find(r=>state.selected.has(r.id))||rows.find(r=>r.code==='27447');
  if(alsoSelect&&!state.selected.size){state.selected.add(target.id);renderTable();toast('Contrato Fernanda Martins Rocha selecionado como exemplo para a apresentação.','warning');}
  state.activeRow=target.id;return target;
}
function openModal(name, rowId=null){if(rowId)state.activeRow=rowId;if(name!=='tax'||state.taxReturn!=='transmission')state.taxReturn=null;state.modal=name;state.taxDraft=name==='tax'?(state.taxes[activeRow().id]?{...state.taxes[activeRow().id]}:{...taxDefaults}):null;renderModal();}
function closeModal(){
  state.modal=null;state.taxReturn=null;state.taxDraft=null;state.renegDraft=null;state.pendingTaxQueue=[];root.innerHTML='';document.body.style.overflow='';
}
function modalMarkup(title,body,footer='',cls='',tabs='',header=true){
  return `<div class="modal-backdrop" role="presentation"><div class="modal ${cls}" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}">
    <header class="modal-header"><span>${icon(cls.includes('tax-modal')?'layers':'file',24)} ${escapeHtml(title)}</span><button class="modal-close" type="button" data-modal-action="close" aria-label="Fechar janela">×</button></header>
    ${tabs}<div class="modal-content">${body}</div><footer class="modal-footer">${footer}</footer>
    </div></div>`;
}
function button(label,action,cls='',symbol=''){return `<button type="button" class="action-button ${cls}" data-modal-action="${action}">${symbol?icon(symbol):''}${escapeHtml(label)}</button>`;}
function autoItem9(){return [3,4,5].every(id=>state.itemSelection.has(id));}
function selectedItemIds(){const ids=new Set(state.itemSelection);if(autoItem9())ids.add(9);return ids;}
function generationTabs(){if(state.generationMode==='renegotiate')return '<div class="modal-tabs"><button type="button" class="active">Renegociar valores de itens</button></div>';return `<div class="modal-tabs"><button type="button" class="${state.step===1?'active':''}" data-modal-action="tab-items">Gerar NFS-e - Selecione os itens que serão enviados para NFS-e.</button><button type="button" class="${state.step===2?'active':''}" data-modal-action="tab-data">Gerar Nota Fiscal de Serviço</button></div>`;}

function generationTargets(){
 const targets=rows.filter(row=>state.generationRowIds.includes(row.id));
 return targets.length?targets:[activeRow()];
}
function itemValueTooltip(id){
 const targets=generationTargets();
 if(targets.length>1)return 'Total consolidado de '+targets.length+' contratos. Edicao bloqueada.';
 const row=targets[0],origin=row.itemValues?.[id]??itemCatalog.find(i=>i.id===id)?.value??0;
 const item=itemCatalog.find(i=>i.id===id);
 const current=state.generationMode==='renegotiate'?getItemValue(item).value:itemForContract(row,id).value;
 return 'Valor original: R$ '+money(origin)+(origin!==current?' | Valor alterado: R$ '+money(current):'');
}

function getItemValue(i){
 const targets=generationTargets();
 if(targets.length===1){
   const original=itemForContract(targets[0],i.id);
   return state.generationMode==='renegotiate'?{...original,...(state.renegDraft?.[i.id]||{})}:original;
 }
 const cents=targets.reduce((s,row)=>s+Math.round(itemForContract(row,i.id).value*100),0);
 return {...i,pct:0,value:cents/100};
}

function recalcGenerationSummary(){
  const picked=selectedItemIds();
  const items=itemCatalog.map(getItemValue).filter(i=>picked.has(i.id));
  const pct=generationTargets().length>1?null:items.reduce((sum,i)=>sum+i.pct,0);
  const amount=items.reduce((sum,i)=>sum+i.value,0);
  const p=document.querySelector('[data-summary-pct]'),v=document.querySelector('[data-summary-value]');
  if(p)p.textContent=pct===null?'—':decimal(pct,6);
  if(v)v.textContent=money(amount);
}

function changeItemValue(id,key,raw,commit=false){
 if(generationTargets().length>1){toast('Seleção múltipla: valores consolidados somente para leitura.','warning');renderModal();return;}
  const txt=String(raw??'').trim();
  const valid=/^\d+(?:[.,]\d+)?$|^\d{1,3}(?:\.\d{3})+(?:,\d+)?$/.test(txt);
  if(!valid){if(commit){toast('Informe um número válido e não negativo.','warning');renderModal();}return;}
  const numeric=parseNumber(txt);
  if(!Number.isFinite(numeric)||numeric<0||(key==='pct'&&numeric>100)){
    if(commit){toast('O percentual deve estar entre 0 e 100 e o valor não pode ser negativo.','warning');renderModal();}
    return;
  }
  if(state.generationMode==='renegotiate'){
    if(!state.renegDraft)state.renegDraft={};
    state.renegDraft[id]={...(state.renegDraft[id]||{}),[key]:numeric};
  }else{
    const keyRow=generationTargets()[0].id;
    if(!state.itemEdits[keyRow])state.itemEdits[keyRow]={};
    state.itemEdits[keyRow][id]={...state.itemEdits[keyRow][id],[key]:numeric};
    footerTotals(getFilteredRows());
  }
  if(commit)renderModal();else recalcGenerationSummary();
}

function generationBody(){
  if(state.step===2&&state.generationMode!=='renegotiate')return generationForm();
  const ids=selectedItemIds();
  const values=itemCatalog.map(getItemValue).filter(i=>ids.has(i.id));
  const multi=generationTargets().length>1;
  const pct=multi?null:values.reduce((s,i)=>s+i.pct,0),total=values.reduce((s,i)=>s+i.value,0);
  const tbody=itemCatalog.map(base=>{
    const i=getItemValue(base),isAuto=i.id===9&&autoItem9();
    return `<tr class="${ids.has(i.id)?'':'muted'}">
     <td><input type="checkbox" data-gen-item="${i.id}" aria-label="Selecionar item ${i.id}" ${ids.has(i.id)?'checked':''} ${isAuto?'title="Selecionado automaticamente pela combinação dos itens 3, 4 e 5"':''}></td>
     <td>${String(i.id).padStart(2,'0')} - ${escapeHtml(i.name)}</td>
     <td>${escapeHtml(i.provider)}</td>
     <td><input class="gen-editable" type="text" inputmode="decimal" data-gen-item-value="${i.id}" data-gen-value-key="pct" aria-label="Percentual de venda do item ${i.id}" value="${multi?'—':decimal(i.pct,6)}" ${multi?'disabled':''} title="${escapeHtml(itemValueTooltip(i.id))}"></td>
     <td><input class="gen-editable" type="text" inputmode="decimal" data-gen-item-value="${i.id}" data-gen-value-key="value" aria-label="Valor do item ${i.id}" value="${money(i.value)}" ${multi?'disabled':''} title="${escapeHtml(itemValueTooltip(i.id))}"></td>
    </tr>`;
  }).join('');
  return `<table class="generation-items-table" aria-label="Itens para NFS-e"><thead><tr><th><input type="checkbox" id="gen-select-all" aria-label="Selecionar todos" ${ids.size===9?'checked':''}></th><th>Itens</th><th>Fornecedor</th><th>% Venda</th><th>Valor</th></tr></thead><tbody>${tbody}</tbody></table>
    <div class="generation-item-summary"><span>% Selecionado</span><output data-summary-pct>${pct===null?'—':decimal(pct,6)}</output><span>Total selec.</span><output data-summary-value>${money(total)}</output></div>
    <div class="auto-note">${multi?'Valores consolidados de '+generationTargets().length+' contratos; edição desabilitada.':state.generationMode==='renegotiate'?'Salve as alterações sem acessar a segunda aba ou emitir nota.':'Selecionar 3, 4 e 5 inclui o item 9. Itens não escolhidos permanecem Não Gerada.'} Passe o mouse no campo Valor para consultar alterações.</div>`;
}
const EMITTER_OPTIONS=["DB SERVICOS DE MONTAGENS","DA SERVICOS DE MONTAGENS","G5 SERVICOS DE MONTAGENS","G6 SERVICOS DE MONTAGENS","LA SERVICOS DE MONTAGENS","LB SERVICOS DE MONTAGENS","RA SERVICOS DE MONTAGENS","GABRIEL A - ASSESSORIA EM MOVEIS PLANEJADOS LTDA","KASABELLA ASSESSORIA E SERVICOS LTDA","GABRIEL B - ASSESSORIA EM MOVEIS PLANEJADOS LTDA","GABRIEL C - ASSESSORIA EM MOVEIS PLANEJADOS LTDA","GD - ASSESSORIA EM MOVEIS PLANEJADOS LTDA","D&D A - ASSESSORIA EM MOVEIS PLANEJADOS LTDA","D&D B - ASSESSORIA EM MOVEIS PLANEJADOS LTDA","IN - ASSESSORIA EM MOVEIS PLANEJADOS LTDA","PLANEJA - ASSESSORIA EM MOVEIS PLANEJADOS LTDA","BENTO - ASSESSORIA EM MOVEIS PLANEJADOS LTDA","SALVADOR APOIO ADMINISTRATIVO LTDA","SOUSA APOIO ADMINISTRATIVO LTDA","ED INSTALACAO DE MOVEIS LTDA - ME","PEDREIRA AMARAL INSTALACOES E SERVICOS LTDA","USMARI SERVICOS DE MONTAGEM LTDA","GA LOJA 353 LTDA - GA LOJA 353"];
const FISCAL_OPTIONS={"ibscbs":["TESTE001 - Teste - Simulado"],"service":["140601 - Instalação e montagem de aparelhos, máquinas e equipamentos"],"iss":["01 - Tributável dentro do município"],"nbs":["101040000 - Serviços de montagem e de edificação de construções pré-fabricadas"]};
function generationForm(){
  const v=state.genForm;
  const options=(list,selected)=>`<option value="">--Selecione--</option>`+list.map(x=>`<option value="${escapeHtml(x)}" ${x===selected?'selected':''}>${escapeHtml(x)}</option>`).join('');
  return `<div class="gen-form gen-form-compact">
  <div class="gen-fields"><div class="gen-stack">
    <label for="gen-emitter">Emitente</label><select id="gen-emitter" data-gen-field="emitter">${options(EMITTER_OPTIONS,v.emitter)}</select>
    <label for="gen-ibscbs">IBS/CBS</label><select id="gen-ibscbs" data-gen-field="ibscbs">${options(FISCAL_OPTIONS.ibscbs,v.ibscbs)}</select>
    <label for="gen-service">Cód. Serviço NFS-e</label><select id="gen-service" data-gen-field="service">${options(FISCAL_OPTIONS.service,v.service)}</select>
    <label for="gen-iss">Tipo Trib. ISS</label><select id="gen-iss" data-gen-field="iss">${options(FISCAL_OPTIONS.iss,v.iss)}</select>
    <label for="gen-nbs">Item NBS</label><select id="gen-nbs" data-gen-field="nbs">${options(FISCAL_OPTIONS.nbs,v.nbs)}</select>
  </div><div class="gen-date-field"><label for="gen-date">Dt. Emissão</label><input type="date" id="gen-date" data-gen-field="date" value="${escapeHtml(v.date)}"></div></div>
  <div class="gen-text-group"><label for="gen-extra">Informação Adicional:</label><textarea id="gen-extra" data-gen-field="extra">${escapeHtml(v.extra)}</textarea></div>
  <div class="gen-text-group"><label for="gen-fisco">Informação p/ o fisco:</label><textarea id="gen-fisco" data-gen-field="fisco">${escapeHtml(v.fisco)}</textarea></div>
  <div class="hint-box">Campos demonstrativos conforme os prints. Códigos e condições fiscais precisam ser validados na integração real; nenhuma NFS-e é emitida por este protótipo.</div>
  </div>`;
}
function generationModal(){
  const footer=state.generationMode==='renegotiate'?`${button('Salvar','save-renegotiation')}${button('Fechar','close')}`:state.step===1?`${button('Próximo','next')}${button('Fechar','close')}`:`${button('Ok','confirm-generation')}${button('Fechar','close')}`;
  return modalMarkup(state.generationMode==='renegotiate'?'Renegociar':'Gerar NFS-e',generationBody(),footer,'generation',generationTabs());
}
function taxForActive(){const row=activeRow();return state.taxDraft?{...state.taxDraft}:state.taxes[row.id]?{...state.taxes[row.id]}:{...taxDefaults};}
function taxValue(base,rate){return money(base*rate/100);}
function taxInput(field,value,disabled=false){return `<input type="text" inputmode="decimal" data-tax-field="${field}" value="${escapeHtml(value)}" ${disabled?'disabled':''}>`;}
function taxPct(field,val,disabled=false){return taxInput(field,`${decimal(val,2)} %`,disabled);}
function contractSelectedItems(row=activeRow()){
 if(Array.isArray(row.generatedItems)&&row.generatedItems.length)return row.generatedItems;
 const ids=selectedItemIds();
 return itemCatalog.filter(i=>ids.has(i.id)).map(i=>itemForContract(row,i.id));
}
function getTaxBase(row=activeRow()){
 const sum=contractSelectedItems(row).reduce((s,i)=>s+Math.max(0,Number(i.value)||0),0);
 return Math.round((sum+Number.EPSILON)*100)/100;
}
function taxModal(){
 const t=taxForActive(),ret=t.retention==='3',base=getTaxBase(),cp=!!t.cp,ir=!!t.ir;
 const items=contractSelectedItems().map(i=>String(i.id).padStart(2,'0')).join(', ')||'nenhum';
 const label=(name,input,required=false)=>`<label><span>${name}${required?' <small>*</small>':''}</span>${input}</label>`;
 const pct=(name,key,value,disabled=false,required=false)=>label(name,taxPct(key,value,disabled),required);
 const val=(value)=>label('Valor',taxInput('_readonly',money(value),true));
 const row=(title,rateKey,rate,enabled,checkId)=>{
  return `<tr class="tax-row-compact row-divider">
    <td class="tax-kind"><label class="tax-checkbox"><input type="checkbox" data-tax-check="${checkId}" ${enabled?'checked':''}><span>${title}</span></label></td>
    <td>${pct('Alíquota',rateKey,enabled?rate:0,!enabled)}</td>
    <td>${val(enabled?base*rate/100:0)}</td>
  </tr>`;
 };
 const rates=`<div class="tax-rate-list">
  ${pct('Alíquota PIS - Ap. Própria','pis',t.pis)}
  ${pct('Alíquota COFINS - Ap. Própria','cofins',t.cofins)}
  ${pct('Alíquota PIS - Retido','pisRet',ret?t.pisRet:0,!ret,ret)}
  ${pct('Alíquota COFINS - Retido','cofinsRet',ret?t.cofinsRet:0,!ret,ret)}
 </div>`;
 const amounts=`<div class="tax-rate-list">
  ${val(base*t.pis/100)}
  ${val(base*t.cofins/100)}
  ${val(ret?base*t.pisRet/100:0)}
  ${val(ret?base*t.cofinsRet/100:0)}
 </div>`;
 const content=`<div class="tax-subtitle">PIS/COFINS/CSLL</div>
  <div class="tax-top">
   <label for="tax-situation">Situação tributária PIS/COFINS
     <select id="tax-situation" data-tax-select="situation">
       <option value="01" ${t.situation==='01'?'selected':''}>01 - Operação Tributável com Alíquota Básica</option>
       <option value="02" ${t.situation==='02'?'selected':''}>02 - Operação Tributável com Alíquota Diferenciada</option>
       <option value="04" ${t.situation==='04'?'selected':''}>04 - Operação Tributável Monofásica</option>
       <option value="06" ${t.situation==='06'?'selected':''}>06 - Operação Tributável a Alíquota Zero</option>
     </select>
   </label>
   <label for="tax-retention">Tipo de retenção PIS/COFINS
     <select id="tax-retention" data-tax-select="retention">
       <option value="0" ${!ret?'selected':''}>0 - PIS/COFINS/CSLL Não Retidos</option>
       <option value="3" ${ret?'selected':''}>3 - PIS/COFINS/CSLL Retidos</option>
     </select>
   </label>
  </div>
  <div class="tax-base-note"><strong>Base de cálculo automática:</strong> R$ ${money(base)} <span>• Itens considerados: ${escapeHtml(items)}. A base usa o valor dos itens preparados/selecionados para este contrato.</span></div>
  <div class="tax-layout"><table><tbody>
    <tr><td class="tax-kind"><strong>PIS/COFINS</strong><p>Alíquotas aplicadas sobre a base automática.</p></td><td>${rates}</td><td>${amounts}</td></tr>
    <tr class="tax-row-compact row-divider"><td class="tax-kind"><strong>CSLL</strong><p>${ret?'Retenção habilitada pelo combo.':'Retenção não habilitada.'}</p></td><td>${pct('Alíquota','csllRate',ret?t.csllRate:0,!ret,ret)}</td><td>${val(ret?base*t.csllRate/100:0)}</td></tr>
    ${row('CP - Contribuição Previdenciária','cpRate',t.cpRate,cp,'cp')}
    ${row('IR - Imposto de Renda','irRate',t.irRate,ir,'ir')}
    <tr class="tax-row-compact row-divider"><td class="spacer-cell"></td><td class="spacer-cell"></td><td class="tax-other-right">${label('Outras Retenções',taxInput('other',money(t.other)))}</td></tr>
  </tbody></table></div>
  <p class="tax-note">Os campos de base foram retirados: o valor é derivado automaticamente dos itens. Cálculos e classificações fiscais continuam demonstrativos até homologação das regras da prefeitura.</p>`;
 return modalMarkup('Tributos Federais',content,button('Salvar','save-taxes','','save'),'tax-modal');
}
function impostosModal(){
  const r=activeRow(),t=state.taxes[r.id],base=getTaxBase(r);
  if(!t){
    return modalMarkup('Impostos',`<div class="impostos-empty"><h3>Sem tributos federais salvos</h3><p>Selecione o contrato e preencha <b>Tributos Federais</b>, depois clique em <b>Salvar</b>. Os valores aparecerão aqui para consulta.</p><p>Este painel apresenta dados locais e demonstrativos, não impostos apurados em produção.</p></div>`,button('Fechar','close'),'impostos-modal');
  }
  const data=[];
  const add=(title,base,rate,amount)=>{
    data.push({title,base,rate,amount});
  };
  add('PIS - Ap. Própria',base,t.pis,base*t.pis/100);
  add('COFINS - Ap. Própria',base,t.cofins,base*t.cofins/100);
  if(t.retention==='3'){
    add('PIS - Retido',base,t.pisRet,base*t.pisRet/100);
    add('COFINS - Retido',base,t.cofinsRet,base*t.cofinsRet/100);
    add('CSLL',base,t.csllRate,base*t.csllRate/100);
  }
  if(t.ir)add('IR',base,t.irRate,base*t.irRate/100);
  if(t.cp)add('CP',base,t.cpRate,base*t.cpRate/100);
  if(t.other>0)add('Outras Retenções',null,null,t.other);
  const body=`<div class="impostos-description">Contrato <strong>${escapeHtml(r.contract||r.code)}</strong> · Valores dos <strong>Tributos Federais salvos</strong> nesta sessão (demonstrativos). Campos não aplicáveis exibidos como “—”.</div>
    <div class="impostos-table-wrap"><table class="impostos-table" aria-label="Impostos federais do contrato"><thead><tr>
      <th>Cód.</th><th>Imposto</th><th>Mod.</th><th>S.T.</th><th>% Acréscimo</th><th>% Redução</th><th>Valor Base</th><th>Valor Imposto</th><th>% Oper. Prop.</th><th>Valor Oper. Própria</th><th>% Alíquota</th><th>% Imposto</th><th>% Diferimento</th><th>Motivo Desoneração</th><th>Destaca</th>
    </tr></thead><tbody>${data.map((x,i)=>`<tr>
      <td>${i+1}</td><td>${escapeHtml(x.title)}</td><td>—</td><td>—</td><td>—</td><td>—</td>
      <td class="num">${x.base===null?'—':money(x.base)}</td>
      <td class="num">${money(x.amount)}</td><td>—</td><td>—</td>
      <td class="num">${x.rate===null?'—':decimal(x.rate,2)}</td><td>—</td><td>—</td><td>—</td><td>—</td>
    </tr>`).join('')}</tbody></table></div>
    <p class="impostos-notice">Os valores são calculados exclusivamente para apresentação (base × alíquota / 100); não substituem as regras fiscais da prefeitura.</p>`;
  return modalMarkup('Impostos',body,button('Fechar','close'),'impostos-modal');
}

function generationLogsModal(){
 const total=state.generationLogs.length,pageSize=state.logPageSize,maxPage=Math.max(1,Math.ceil(total/pageSize));
 state.logPage=Math.min(Math.max(1,state.logPage),maxPage);
 const from=(state.logPage-1)*pageSize,shown=state.generationLogs.slice(from,from+pageSize);
 const newest=state.generationLogs[0],date=newest?.generatedAt||'—';
 const list=shown.map(l=>{
  const statusClass=l.status==='Autorizada'?'ok':l.status==='Rejeitada'?'rejected':'pending';
  return `<tr>
    <td><span class="log-status ${statusClass}">${escapeHtml(l.status)}</span><small class="log-lot" title="Identificação do lote">Lote ${escapeHtml(l.lot)}</small></td>
    <td>${escapeHtml(l.client)}</td><td>${escapeHtml(l.contract||'—')}</td><td>${escapeHtml(l.emitter||'—')}</td>
    <td>${escapeHtml((l.items||[]).join(', ')||'—')}</td><td class="log-return" title="${escapeHtml(l.returnMessage)}">${escapeHtml(l.returnMessage)}</td>
  </tr>`;
 }).join('');
 const body=`<div class="log-section-heading">Logs geração de notas</div>
 <div class="log-summary"><span><b>Gerado em:</b> ${escapeHtml(date)}</span><span class="log-demo-banner">Registros simulados — não consultam prefeitura ou integração fiscal</span></div>
 <div class="log-table-shell"><table class="generation-logs-table" aria-label="Log de geração de notas por lote">
 <thead><tr><th>Status</th><th>Cliente</th><th>Contrato</th><th>Emitente</th><th>Itens Gerados</th><th>Retorno</th></tr></thead>
 <tbody>${list||'<tr><td colspan="6" class="log-empty">Nenhum registro de lote nesta sessão.</td></tr>'}</tbody></table></div>
 <div class="log-pagination"><div class="log-pagination-actions">
   <button type="button" data-modal-action="logs-first" ${state.logPage===1?'disabled':''} title="Primeira página">«</button>
   <button type="button" data-modal-action="logs-prev" ${state.logPage===1?'disabled':''} title="Página anterior">‹</button>
   <span>Página <b>${state.logPage}</b> de ${maxPage}</span>
   <button type="button" data-modal-action="logs-next" ${state.logPage===maxPage?'disabled':''} title="Próxima página">›</button>
   <button type="button" data-modal-action="logs-last" ${state.logPage===maxPage?'disabled':''} title="Última página">»</button>
   <button type="button" data-modal-action="logs-refresh" title="Atualizar lista local">${icon('refresh',14)}</button>
 </div><span>Resultado ${total?from+1:0} - ${Math.min(total,from+pageSize)} de ${total}</span></div>`;
 return modalMarkup('Log Geração Notas',body,button('Fechar','close'),'generation-logs-modal');
}

// Manual funcional contextual — nova tela NFS-e.
// Conteúdo derivado das definições de produto e dos mockups aprovados.
// As origens técnicas ainda não confirmadas são identificadas explicitamente.
const HELP_GROUPS = [
  {
    id:'overview', title:'Visão geral', icon:'info', kicker:'01 · Introdução',
    subtitle:'Objetivo, escopo e proposta da nova tela.',
    html:`
      <div class="help-hero"><span class="help-eyebrow">Fiscal · Nota Fiscal de Serviço Eletrônica</span><h2>Manual funcional da nova tela NFS-e</h2><p>Centralizar a consulta, seleção e preparação de notas de serviço em uma tela exclusiva, sem misturar comandos específicos de NF-e, preservando a identidade visual do eFinance.</p><div class="help-hero-tags"><span>Tela exclusiva NFS-e</span><span>Informações integradas</span><span>Seleção independente</span><span>Tributos Federais</span></div></div>
      <h3>Proposta funcional</h3>
      <div class="help-card-grid">
        <div class="help-info-card"><span class="help-card-icon">01</span><h4>Localizar contratos</h4><p>Filtrar por loja, status, item, cliente, contrato e período.</p></div>
        <div class="help-info-card"><span class="help-card-icon">02</span><h4>Conferir informações</h4><p>Ver montagem, liberação futura, situação financeira e itens associados.</p></div>
        <div class="help-info-card"><span class="help-card-icon">03</span><h4>Selecionar e preparar</h4><p>Selecionar itens individualmente, aplicar a exceção do item 7 e compor os itens da NFS-e.</p></div>
        <div class="help-info-card"><span class="help-card-icon">04</span><h4>Configurar tributos</h4><p>Preencher as configurações federais conforme campos e regras do portal da prefeitura.</p></div>
      </div>
      <h3>O que muda</h3>
      <ul class="help-bullets"><li>Criação de uma tela independente para <b>NFS-e</b>; a tela existente de NF-e permanece preservada.</li><li>Novas colunas com informações de Pós-Venda, Contratos Futuros e Comercial.</li><li>Remoção de comandos e filtros que não fazem parte do fluxo de NFS-e.</li><li>Inclusão do botão <b>Gerar NFS-e</b> e do formulário <b>Tributos Federais</b>.</li><li>Novos indicadores de quantidade de itens e manutenção da soma de Valor Venda.</li></ul>
      <div class="help-notice"><b>Escopo do protótipo:</b> a interface e as interações são demonstrativas. A emissão fiscal, o banco de dados, os serviços da prefeitura e as permissões reais não estão conectados.</div>
    `
  },
  {
    id:'buttons', title:'Botões e ações', icon:'layers', kicker:'02 · Comandos',
    subtitle:'O que faz cada botão da barra superior.',
    html:`
      <h2>Botões da tela principal</h2><p>Os comandos abaixo aparecem na ordem prevista no mockup aprovado, mantendo o padrão de ícones, bordas e cores do eFinance.</p>
      <div class="help-table-wrap"><table class="help-table"><thead><tr><th>Botão</th><th>Função proposta</th><th>No protótipo</th></tr></thead><tbody>
        <tr><td><b>Ver selecionados</b></td><td>Alternar entre todos os registros encontrados e apenas os contratos marcados.</td><td>Filtra localmente.</td></tr>
        <tr><td><b>Gerar NFS-e</b></td><td>Preparar NFS-e dos contratos selecionados; com múltiplos clientes soma os valores dos itens, sem edição.</td><td>Controle por item, duas etapas e histórico local.</td></tr>
<tr><td><b>Gerar Lote</b></td><td>Gerar lote de contratos Pessoa Física selecionados.</td><td>Desabilitado quando há CNPJ na seleção; agrega as preparações.</td></tr>
<tr><td><b>Renegociar</b></td><td>Ajustar valores de itens de um único contrato.</td><td>Abre apenas a primeira etapa, permite salvar sem emissão.</td></tr>
        <tr><td><b>Transmitir</b></td><td>Transmitir lotes e revisar tributos antes de transmitir o Item 07.</td><td>Para Item 07 preparado, abre Tributos Federais antes da transmissão simulada.</td></tr>
        <tr><td><b>DANFSe</b></td><td>Acessar o documento auxiliar da Nota Fiscal de Serviço.</td><td>Abre documento ilustrativo.</td></tr>
        <tr><td><b>Reenviar NFS-e e XML por e-mail</b></td><td>Reenviar os documentos fiscais ao destinatário.</td><td>Somente demonstração; não envia e-mail.</td></tr>
        <tr><td><b>Forçar Nova Consulta</b></td><td>Atualizar a situação dos documentos junto à integração fiscal.</td><td>Atualiza a visualização local.</td></tr>
        <tr><td><b>Cancelar NFS-e</b></td><td>Solicitar cancelamento conforme regras do município ou ambiente nacional aplicável.</td><td>Altera estado local após confirmação.</td></tr>
        <tr><td><b>Inutilizar Número</b></td><td>Comando mantido no desenho, sujeito à confirmação de aplicabilidade para NFS-e.</td><td>Exibe aviso informativo.</td></tr>
        <tr><td><b>Arquivar Nota</b></td><td>Arquivar as notas selecionadas.</td><td>Altera somente os status locais, mediante confirmação.</td></tr>
        <tr><td><b>Downloads</b></td><td>Disponibilizar arquivos dos documentos fiscais.</td><td>Exporta JSON demonstrativo, não XML fiscal.</td></tr>
        <tr><td><b>Redefinir Valor da NFS-e</b></td><td>Redefinir valor usado no fluxo, observando regras de negócio existentes.</td><td>Atualiza o valor em memória.</td></tr>
        <tr><td><b>Histórico</b></td><td>Consultar movimentações e eventos do registro.</td><td>Exibe histórico ilustrativo.</td></tr>
        <tr><td><b>Tributos Federais</b></td><td>Abrir o cadastro de PIS/COFINS/CSLL, CP, IR e outras retenções.</td><td>Abre formulário com Salvar local.</td></tr>
        <tr><td><b>Impostos</b></td><td>Consultar em tabela os tributos federais salvos para o contrato, separando apuração própria e retenções.</td><td>Consulta local e somente leitura; não exibe ICMS fictício.</td></tr>
        <tr><td><b>Log Geração Notas</b></td><td>Acompanhar notas preparadas, autorizadas, rejeitadas ou aguardando resposta em lotes, com cliente, contrato, emitente, itens e retorno.</td><td>Histórico de lotes fictícios, com simulação de preparação e transmissão.</td></tr>
        <tr><td><b>Imprimir</b></td><td>Imprimir os documentos disponíveis.</td><td>Aciona a impressão do navegador.</td></tr>
        <tr><td><b>Ajuda</b></td><td>Abrir este manual funcional da tela NFS-e.</td><td>Manual navegável e pesquisável.</td></tr>
      </tbody></table></div>
      <div class="help-notice"><b>Ordem e posicionamento:</b> <b>Ver selecionados</b> vem antes de <b>Gerar NFS-e</b>; <b>Tributos Federais</b>, <b>Impostos</b> e <b>Log Geração Notas</b> ficam após <b>Histórico</b>; <b>Imprimir</b> e <b>Ajuda</b> permanecem no fim da barra, com espaçamento uniforme.</div>
    `
  },
  {
    id:"filters", title:"Filtros e pesquisa", icon:"search", kicker:"03 · Consulta",
    subtitle:"FIN, status, item, CPF/CNPJ e datas.",
    html:"\n<h2>Filtros da consulta NFS-e</h2>\n<p><b>Regra da consulta:</b> excluir contratos que estejam simultaneamente <b>sem FIN processado</b> e <b>sem Data Término Liberação Futura</b>. Um contrato que tenha ao menos uma dessas informações pode ser consultado, sujeito aos filtros aplicados.</p>\n<div class=\"help-table-wrap\"><table class=\"help-table\"><thead><tr><th>Filtro</th><th>Regra</th></tr></thead><tbody>\n<tr><td><b>FIN</b></td><td>Combos exclusivos <b>Aberto</b> e <b>Fechado</b>. No perfil <b>Carla/Kasabella</b> a tela inicia em <b>Fechado</b>, exibindo contratos finalizados. Para outras empresas o default é configurável por perfil; a demonstração assume Aberto, sujeito a validação.</td></tr>\n<tr><td><b>Status</b></td><td>Somente <b>Gerada</b>, <b>Não Gerada</b>, <b>Pendente de Transmissão</b>, <b>Cancelada</b> e <b>Arquivada</b>. Gerada substitui o nome anterior Autorizada na listagem; a situação é controlada por item.</td></tr>\n<tr><td><b>Itens</b></td><td>Somente itens <b>01 a 09</b>, sem opção Todos. O protótipo começa no Item 03. O item escolhido define a situação mostrada para o contrato e o somatório Total a Emitir.</td></tr>\n<tr><td><b>Pessoa</b></td><td><b>--Todas-- / Pessoa Física / Pessoa Jurídica</b>. Usa o campo CPF (11 dígitos) ou CNPJ (14 dígitos) vinculado ao cliente. Os identificadores da demonstração são fictícios.</td></tr>\n<tr><td><b>Loja</b></td><td>Restringe ao estabelecimento selecionado.</td></tr>\n<tr><td><b>Buscar por</b></td><td>Consulta por nome do cliente, contrato ou código do cliente.</td></tr>\n<tr><td><b>Período / Filtrar Por</b></td><td>Data de Emissão, Data de Venda, Data Término de Montagem ou Data Término Liberação Futura. Emissão só tem data quando a NFS-e foi preparada; as datas precisam vir das origens funcionais indicadas.</td></tr>\n<tr><td><b>de / até</b></td><td>Aplica intervalo sobre o campo de data escolhido, sem confundir data de venda e de emissão.</td></tr>\n</tbody></table></div>\n<div class=\"help-notice help-warning\"><b>Item 07:</b> bloqueio provisório quando Data Término Liberação Futura estiver vazia. O gatilho final do Financeiro precisa ser validado antes da implementação real.</div>\n"
  },
  {
    id:'columns', title:'Colunas e origem dos dados', icon:'file', kicker:'04 · Listagem', subtitle:'Cabeçalhos, tooltips e telas de referência.',
    html:"<h2>Colunas da grid de NFS-e</h2>\n<p>Os nomes da grid seguem a nomenclatura acordada na revisão. <b>Passe o mouse sobre cada título de coluna</b> para ler sua descrição. As telas e caminhos abaixo são <b>referências funcionais para o desenvolvimento localizar a origem dos dados</b>; o nome de tabela, campos SQL e relacionamentos ainda precisam ser identificados na base real.</p>\n<div class=\"help-table-wrap\"><table class=\"help-table\"><thead><tr><th>Coluna</th><th>Tooltip do cabeçalho</th><th>Informação / referência para consulta</th></tr></thead><tbody>\n<tr><td><b>Emp</b></td><td>Código da empresa</td><td>Empresa vinculada ao contrato; cadastro empresarial.</td></tr>\n<tr><td><b>Loja</b></td><td>Código da loja</td><td>Loja vinculada ao contrato; cadastro de estabelecimentos.</td></tr>\n<tr><td><b>Cód.</b></td><td>Código</td><td>Código de cadastro do cliente.</td></tr>\n<tr><td><b>Cliente</b></td><td>Nome do cliente</td><td>Nome cadastral do cliente/tomador. CPF/CNPJ fictício aparece no tooltip da célula do protótipo.</td></tr>\n<tr><td><b>Tipo Venda</b></td><td>Tipo de Venda</td><td>Modalidade da venda, conforme operação Comercial.</td></tr>\n<tr><td><b>Contrato</b></td><td>Número do contrato</td><td>Identificação do contrato, registrada no Comercial.</td></tr>\n<tr><td><b>Status</b></td><td>Status da Nota</td><td>Status da NFS-e referente ao item filtrado; controle por item.</td></tr>\n<tr><td><b>Data Venda</b></td><td>Data da Venda</td><td>Data comercial em que a venda foi registrada.</td></tr>\n<tr><td><b>Pedidos</b></td><td>Número dos Pedidos</td><td>Pedidos associados ao contrato.</td></tr>\n<tr><td><b>Valor Venda</b></td><td>Valor da Venda</td><td>Valor comercial do contrato/venda.</td></tr>\n<tr><td><b>Itens Enviados P/ gerar NFS-e</b></td><td>Itens enviados para gerar NFS-e, com código e descrição</td><td>Itens preparados/enviados por contrato, identificados por código e descrição.</td></tr>\n<tr><td><b>Térm.Prog.</b></td><td>Data do término da Programação</td><td>Consultar <b>Gerenciamento de Montagem/Assist. Técnica</b>, origem informada das datas de término da montagem/programação. Exibir somente DD/MM/AAAA.</td></tr>\n<tr><td><b>Término Lib.</b></td><td>Data término do processo de liberação</td><td>Consultar <b>Comercial &gt; Gerenciamento de Contratos Futuros</b>, data de término da liberação, somente DD/MM/AAAA.</td></tr>\n<tr><td><b>F.P.</b></td><td>Status do processo de finalização</td><td>Consultar <b>Comercial &gt; Contratos Realizados</b>, FIN processado (check/alerta), mantendo tooltip na célula com data/hora do FIN quando finalizado.</td></tr>\n</tbody></table></div>\n<div class=\"help-notice\"><b>Referências principais para buscar as informações:</b> (1) Gerenciamento de Montagem/Assist. Técnica, (2) Comercial &gt; Contratos Realizados e (3) Comercial &gt; Gerenciamento de Contratos Futuros. Não representam nomes de tabelas confirmados; validar a origem técnica com desenvolvimento.</div>"
  },
  {
    id:"selection", title:"Regras de seleção", icon:"check", kicker:"05 · Regras de negócio",
    subtitle:"Contratos independentes, FIN e Item 07.",
    html:"\n<h2>Seleção e status por item</h2>\n<div class=\"help-rule-block\"><span class=\"help-rule-num\">R1</span><div><h3>Sem dependência do contrato pai</h3><p>É permitido emitir itens de um mesmo contrato em momentos distintos. A seleção de um item não exige a seleção de todos.</p></div></div>\n<div class=\"help-rule-block\"><span class=\"help-rule-num\">R2</span><div><h3>Item 07 — bloqueio financeiro provisório</h3><p>A trava especial é ativada apenas quando o combo Itens estiver em <b>07 - Contratado - Franquia</b>. Na demonstração, contratos sem <b>Data Término Liberação Futura</b> não podem ser selecionados nesse filtro. A regra efetiva do FIN deve ser confirmada com o Financeiro, pois a liberação futura foi apresentada como hipótese.</p></div></div>\n<div class=\"help-rule-block\"><span class=\"help-rule-num\">R3</span><div><h3>Combinação 03 + 04 + 05 → 09</h3><p>Selecionar os itens 3, 4 e 5 inclui automaticamente o <b>09 - Reserva</b>, marcado em azul sem sufixo (Auto). Enquanto a combinação estiver marcada, a Reserva não pode ser desmarcada isoladamente.</p></div></div>\n<div class=\"help-rule-block\"><span class=\"help-rule-num\">R4</span><div><h3>Não Gerada por item, não por contrato parcialmente processado</h3><p>Somente os itens preparados mudam para <b>Pendente de Transmissão</b>. Quando autorizados passam para <b>Gerada</b>; itens não selecionados continuam <b>Não Gerada</b>, sem atribuir automaticamente <b>Gerada Parcialmente</b> à segunda emissão. Os status exibidos dependem do item escolhido no filtro.</p></div></div>\n<div class=\"help-notice\"><b>Regra geral da busca:</b> registros sem FIN e também sem liberação futura devem ser excluídos. O FIN inicia Fechado no perfil Carla.</div>\n"
  },
  {
    id:"generation", title:"Gerar NFS-e", icon:"send", kicker:"06 · Emissão e renegociação",
    subtitle:"Emissão individual, lote e renegociação.",
    html:"\n<h2>Fluxos de geração da NFS-e</h2>\n<div class=\"help-step\"><b>1</b><div><h3>Gerar NFS-e</h3><p>Abre a etapa de seleção dos itens 01 a 09, com fornecedor, percentual e valor. Para um contrato, o valor pode ser alterado e um tooltip apresenta o valor original e o ajustado. Em seguida, a segunda aba coleta Emitente, IBS/CBS, código de serviço, Tipo Trib. ISS, Item NBS e data de emissão.</p></div></div>\n<div class=\"help-step\"><b>2</b><div><h3>Vários contratos selecionados</h3><p>Na primeira etapa, o campo Valor é a <b>soma dos valores daquele item em todos os contratos selecionados</b>; edição de porcentagem ou valor fica bloqueada para evitar modificar vários contratos de forma ambígua. O total dos itens selecionados é a soma consolidada. Percentuais não são somados, pois não representam um percentual único de lote.</p></div></div>\n<div class=\"help-step\"><b>3</b><div><h3>Gerar Lote — somente CPF</h3><p>O botão é habilitado quando há contratos selecionados e <b>nenhum deles possui CNPJ</b>. Se existir Pessoa Jurídica na seleção, o botão permanece desabilitado. A preparação associa os documentos ao lote demonstrativo e registra os itens por cliente.</p></div></div>\n<div class=\"help-step\"><b>4</b><div><h3>Renegociar</h3><p>Exige exatamente <b>um contrato selecionado</b>, abre apenas a aba de itens, permite editar valores e salvar os ajustes, <b>sem abrir a segunda aba</b>, preparar nota ou transmitir documento.</p></div></div>\n<div class=\"help-step\"><b>5</b><div><h3>Controle das próximas emissões</h3><p>A emissão de alguns itens não marca automaticamente os demais como parcialmente gerados. Cada item permanece em <b>Não Gerada</b> até ser preparado ou autorizado, conforme seu próprio histórico.</p></div></div>\n<div class=\"help-notice help-warning\"><b>Transmitir com Item 07:</b> antes da transmissão demonstrativa, abrir Tributos Federais para os contratos que tiverem o item 07 preparado. Somente ao salvar e revisar os tributos o lote prossegue. Fechar a revisão interrompe a transmissão. Sem Item 07, o fluxo não exige essa janela.</div>\n"
  },
  {
    id:'taxes', title:'Tributos Federais', icon:'layers', kicker:'07 · Configuração tributária',
    subtitle:'Combos, bases, alíquotas, retenções e Salvar.',
    html:`
      <h2>Janela Tributos Federais</h2><p>O botão fica ao lado de <b>Histórico</b> e abre uma janela exclusiva, com a identidade visual do eFinance e os mesmos tipos de campos do print de referência.</p>
      <div class="help-two-cols"><div class="help-info-card"><h4>Situação tributária PIS/COFINS</h4><p>Combo com a classificação tributária. Exemplo exibido: <b>01 — Operação Tributável com Alíquota Básica</b>.</p></div><div class="help-info-card"><h4>Tipo de retenção PIS/COFINS</h4><p>Combo para definir retenção. Exemplos de referência: <b>0 — Não Retidos</b> e <b>3 — PIS/COFINS/CSLL Retidos</b>.</p></div></div>
      <h3>Campos do formulário</h3>
      <div class="help-table-wrap"><table class="help-table"><thead><tr><th>Grupo</th><th>Campos e comportamento</th></tr></thead><tbody>
        <tr><td><b>PIS/COFINS</b></td><td>Alíquotas e valores de PIS/COFINS — Apuração Própria, com base apurada automaticamente a partir dos itens selecionados/preparados.</td></tr>
        <tr><td><b>Retenções de PIS/COFINS</b></td><td>Alíquota e valor de PIS — Retido; alíquota e valor de COFINS — Retido; preenchimento vinculado ao tipo de retenção.</td></tr>
        <tr><td><b>CSLL</b></td><td>Alíquota e valor calculados sobre a base automática quando a retenção for aplicável.</td></tr>
        <tr><td><b>CP — Contribuição Previdenciária</b></td><td>Checkbox de habilitação, alíquota e valor calculado com a base automática.</td></tr>
        <tr><td><b>IR — Imposto de Renda</b></td><td>Checkbox de habilitação, alíquota e valor calculado com a base automática.</td></tr>
        <tr><td><b>Outras Retenções</b></td><td>Campo de valor posicionado no <b>canto direito</b> do formulário.</td></tr>
      </tbody></table></div>
      <h3>Base de cálculo automática</h3><p>Os campos editáveis <b>Base de cálculo PIS/COFINS</b>, <b>CSLL - Base de Cálculo</b>, <b>CP - Base de Cálculo</b> e <b>IR - Base de Cálculo</b> foram removidos. A base decorre da <b>soma dos valores dos itens preparados para o contrato</b>; antes da preparação, o protótipo usa os itens selecionados na etapa de geração, incluindo o item 9 quando aplicável.</p>
      <div class="help-notice">Exemplo: itens 3 (R$ 9,36), 4 (R$ 7,49), 5 (R$ 17,78) e 9 (R$ 0,00) somam <b>R$ 34,63</b>. Alíquota PIS de 0,65% resulta em aproximadamente R$ 0,23. Se o valor de um item for editado, a base e os resultados demonstrativos devem acompanhar o novo valor. A base é exibida apenas como informação, não como campo editável.</div>
      <p>Em produção, deverão ser validadas as exclusões/deduções legais eventualmente aplicáveis à base de cada tributo. A implementação atual não representa uma apuração fiscal homologada.</p>
      <h3>Salvar e validação</h3><ul class="help-bullets"><li>Manter apenas o botão <b>Salvar</b> no rodapé, com <b>X</b> no cabeçalho para fechar a janela.</li><li>Salvar alíquotas, opções de retenção e outras retenções associadas ao registro/contrato; a base e os valores são calculados a partir dos itens no momento da consulta.</li><li>Aplicar obrigatoriedades, dependências entre campos e cálculos conforme as regras do <b>portal da prefeitura</b> adotado na integração.</li><li>Não apresentar opção <b>Fechar</b> no rodapé.</li></ul>
      <div class="help-notice help-warning"><b>Pendente de homologação funcional:</b> o município/portal de referência, a lista completa dos combos, as exigências de preenchimento e os cálculos oficiais precisam ser confirmados. Os valores e opções deste protótipo são demonstrativos, não uma implementação tributária validada.</div>
    `
  },
  {
    id:'impostos', title:'Impostos', icon:'layers', kicker:'08 · Consulta tributária',
    subtitle:'Conferência dos tributos federais salvos por contrato.',
    html:`
      <h2>Janela Impostos</h2>
      <p>Ao lado de <b>Tributos Federais</b>, o botão <b>Impostos</b> abre uma tabela apenas para consulta. A lista considera o contrato selecionado e os valores efetivamente <b>salvos</b> no formulário de Tributos Federais durante a sessão.</p>
      <ul class="help-bullets"><li>Exibe PIS e COFINS de apuração própria, suas retenções quando configuradas, CSLL, IR, CP e outras retenções quando aplicáveis.</li><li>Exibe base automática obtida dos itens, alíquota e valor demonstrativo calculado por base × alíquota / 100, sem campo editável de base.</li><li>Colunas como Mod., S.T., desoneração e destaque ficam com <b>—</b> quando não se aplicam aos dados disponíveis, sem inventar informações de ICMS.</li><li>Sem tributos salvos, mostra um aviso em vez de criar valores fiscais fictícios.</li><li>Fechar a janela não altera os tributos; reabrir mostra a última configuração salva enquanto a página estiver carregada.</li></ul>
      <div class="help-notice help-warning">Essa visualização não realiza apuração oficial e não substitui o cálculo ou o leiaute exigidos pela prefeitura.</div>
    `
  },
  {
    id:'generation-logs', title:'Log Geração Notas', icon:'file', kicker:'09 · Acompanhamento por lotes',
    subtitle:'Status, emitentes, itens e retornos dos lotes.',
    html:`
      <h2>Log Geração Notas — acompanhamento de lotes</h2>
      <p>Na barra principal, <b>Log Geração Notas</b> fica entre <b>Impostos</b> e <b>Imprimir</b>. Abre a janela de consulta dos registros gerados em lotes, preservando o padrão visual do eFinance.</p>
      <div class="help-table-wrap"><table class="help-table"><thead><tr><th>Coluna</th><th>Informação</th></tr></thead><tbody>
        <tr><td><b>Status</b></td><td>Preparada, Aguardando preparação/resposta, Autorizada ou Rejeitada, conforme retorno do processo.</td></tr>
        <tr><td><b>Cliente</b></td><td>Nome do cliente associado ao contrato processado.</td></tr>
        <tr><td><b>Contrato</b></td><td>Identificação do contrato vinculado aos itens do lote.</td></tr>
        <tr><td><b>Emitente</b></td><td>Prestador selecionado na preparação da NFS-e.</td></tr>
        <tr><td><b>Itens Gerados</b></td><td>Códigos dos itens incluídos na geração do documento, inclusive inclusão automática do item 9.</td></tr>
        <tr><td><b>Retorno</b></td><td>Mensagem de autorização, pendência ou rejeição, incluindo o motivo da rejeição fornecido pela integração fiscal quando existir.</td></tr>
      </tbody></table></div>
      <h3>Fluxo esperado</h3><ol class="help-numbered">
        <li>O usuário prepara itens no <b>Gerar NFS-e</b>; a preparação entra no acompanhamento do lote.</li>
        <li>Ao transmitir um lote, os registros são associados a uma identificação de lote e ficam acompanháveis até obter resultado.</li>
        <li>Se a prefeitura autorizar a nota, o campo Retorno apresentará essa informação. Em caso de rejeição, exibirá a causa retornada para correção.</li>
        <li>O histórico dispõe de paginação, data e identificação do lote; a implementação real precisará consultar e persistir os retornos oficiais.</li>
      </ol>
      <div class="help-notice help-warning"><b>Protótipo:</b> os lotes iniciais, as autorizações, rejeições e motivos exibidos são fictícios. <b>Transmitir</b> apenas simula resultados localmente, sem chamar TecnoSpeed, prefeitura ou NFS-e Nacional.</div>
    `
  },
  {
    id:'totals', title:'Totalizadores e rodapé', icon:'filter', kicker:'10 · Indicadores',
    subtitle:'O que soma cada indicador e como é calculado.',
    html:`
      <h2>Totalizadores no rodapé</h2><p>O rodapé apresenta <b>cinco indicadores</b>: quantidade de contratos marcados, valor monetário dos itens a emitir, quantidade na busca, total da coluna Valor Venda e total da coluna Valor Venda apenas dos contratos marcados.</p>
      <div class="help-card-grid help-total-grid">
        <div class="help-info-card"><h4>Total Selecionado (Item)</h4><p><b>Quantidade de contratos/registros marcados</b> nos checkboxes da listagem que correspondem à consulta atual, incluindo seleções em outras páginas. Não soma valores em reais nem conta os subitens de cada contrato. Exemplo: com o combo <b>03 - Coordenação</b> e quatro contratos marcados, apresenta <b>4</b>. Sem marcações, apresenta <b>0</b>.</p></div>
        <div class="help-info-card"><h4>Total a Emitir (Item)</h4><p><b>Soma em reais</b> do item escolhido nos contratos elegíveis, estejam marcados ou não. A opção Todos foi removida. FIN inicia Fechado no perfil Carla, por isso a soma reflete apenas os contratos realmente filtrados.</p></div>
        <div class="help-info-card"><h4>Total da Busca (Item)</h4><p>Quantidade de itens retornados pelos filtros da pesquisa, considerando o conjunto completo, não só a página visível.</p></div>
        <div class="help-info-card"><h4>Total (Valor Venda)</h4><p><b>Soma real da coluna Valor Venda</b> de todos os contratos retornados pela consulta (não apenas a página atual). Recalcula quando os filtros ou valores de venda mudam. Os 16 contratos demonstrativos somam <b>R$ 3.262.669,79</b>.</p></div>
        <div class="help-info-card"><h4>Total (Valor Venda Selecionado)</h4><p><b>Soma real da coluna Valor Venda dos contratos marcados</b> que correspondem à consulta atual, em todas as páginas. Exemplo: marcando apenas o contrato de Daniel Ferreira Mendes, o resultado é <b>R$ 60.400,00</b>. Sem contratos marcados, exibe <b>R$ 0,00</b>. O combo <b>Itens</b> não rateia o Valor Venda do contrato: ele define o item considerado no <b>Total a Emitir</b>, enquanto <b>Total Selecionado</b> conta os contratos marcados.</p></div>
      </div>
      <h3>Regras de consistência</h3><ul class="help-bullets"><li><b>Total Selecionado (Item)</b> conta os registros marcados (inteiro, sem símbolo monetário). <b>Total a Emitir (Item)</b> continua sendo somatório monetário dos itens elegíveis.</li><li>Combo <b>Itens = 01 a 09</b>: Total a Emitir soma apenas o item escolhido. Não existe Todos. Total Selecionado permanece como <b>quantidade de contratos marcados</b>.</li><li>Recalcular o contador ao filtrar ou marcar/desmarcar contratos; alterações monetárias não mudam a quantidade. Recalcular os somatórios monetários ao trocar de item ou alterar valores.</li><li>O <b>Total (Valor Venda Selecionado)</b> acompanha os checkboxes dos contratos e os filtros, sem depender da página atual e sem multiplicar o Valor Venda pela quantidade de itens do contrato.</li><li>Os totais devem contemplar todos os contratos filtrados, não somente a página atual.</li><li><b>Total Selecionado</b> conta os contratos marcados de todo o conjunto filtrado, não somente da página atual. <b>Total a Emitir</b> considera todos os contratos Não Gerada que atendam aos filtros, independentemente de estarem marcados; na escolha do <b>Item 07</b>, exclui contratos sem Data Término Liberação Futura, conforme hipótese provisória do Financeiro.</li><li>Somar em centavos inteiros para evitar divergências de arredondamento.</li></ul>
      <div class="help-notice help-neutral"><b>Dados demonstrativos:</b> na amostra original, os 16 contratos totalizavam R$ 121,68 no Item 03 antes dos novos filtros. Com FIN Fechado por padrão, as somas são calculadas apenas sobre os registros filtrados; Total da Busca usa a quantidade efetiva. Já <b>Total (Valor Venda)</b> soma os contratos efetivamente carregados: <b>R$ 3.262.669,79</b> no cenário inicial. O contador de selecionados e o valor a emitir utilizam somente os contratos efetivamente carregados no protótipo, sem simular registros inexistentes. O backend real deve fornecer os valores por item/contrato e o conjunto completo paginado.</div>
    `
  },
  {
    id:'removed', title:'O que foi removido', icon:'trash', kicker:'11 · Simplificação',
    subtitle:'Botões, combos e tipos de venda excluídos.',
    html:`
      <h2>Elementos retirados da tela NFS-e</h2><p>A interface deve ficar exclusiva para Nota Fiscal de Serviço, sem misturar ações pertinentes apenas à NF-e.</p>
      <h3>Botões removidos</h3><div class="help-chip-list"><span>Gerar Nota</span><span>Dados NF-e</span><span>Volumes</span><span>Mensagens</span><span>Gerar Devolução</span><span>Gerar Nota Avulsa</span><span>Logs Rece. Federal</span><span>CC-e</span><span>Aplicar Desconto</span><span>Alt. Cliente</span><span>Pré-visualizar DANFSe</span><span>Excluir</span><span>Coluna E./S.</span></div>
      <p><b>Observação:</b> o comando antigo <b>Gerar Nota</b> foi substituído no novo fluxo pelo botão específico <b>Gerar NFS-e</b>.</p>
      <h3>Combos removidos</h3><div class="help-chip-list"><span>Natureza da Operação</span><span>Entrada/Saída</span><span>Tipo Nota</span><span>Tipo de Contrato</span></div>
      <h3>Tipos de venda retirados da pesquisa</h3><div class="help-chip-list"><span>AT Com Custo</span><span>AT Sem Custo</span></div>
      <div class="help-notice"><b>Não regressão:</b> retirar comandos da <b>nova tela NFS-e</b> não deve remover ou alterar os recursos equivalentes onde continuam necessários, especialmente na tela atual de NF-e.</div>
    `
  },
  {
    id:"validation", title:"Integrações e aceite", icon:"check", kicker:"12 · Implementação", subtitle:"Telas de referência e critérios de aceite.",
    html:"<h2>Telas de origem: referência para localizar dados</h2>\n<p>Para o desenvolvimento encontrar campos e regras da grid, consultar as telas funcionais abaixo antes de definir procedures, joins e mapeamentos SQL. A tela de NFS-e ainda é um protótipo de apresentação.</p>\n<div class=\"help-table-wrap\"><table class=\"help-table\"><thead><tr><th>Caminho de referência</th><th>Dados a identificar</th></tr></thead><tbody>\n<tr><td><b>Gerenciamento de Montagem/Assist. Técnica</b></td><td>Data de término da montagem/programação, exibida na coluna <b>Térm.Prog.</b>.</td></tr>\n<tr><td><b>Comercial &gt; Contratos Realizados</b></td><td>Estado de finalização financeira, indicador <b>F.P.</b> e data/hora do FIN no tooltip da célula.</td></tr>\n<tr><td><b>Comercial &gt; Gerenciamento de Contratos Futuros</b></td><td>Data de término da liberação, exibida na coluna <b>Término Lib.</b>.</td></tr>\n<tr><td><b>Cadastros comerciais e de cliente</b></td><td>Dados das demais colunas, identificadores do contrato, empresa, loja, pedidos, CPF/CNPJ e valor de venda.</td></tr>\n<tr><td><b>Integração NFS-e / prefeitura</b></td><td>Status e retorno de emissão, tributos e eventos por item e lote.</td></tr>\n</tbody></table></div>\n<h3>Critérios de aceite e homologação</h3>\n<ol class=\"help-numbered\">\n<li>Apresentar os <b>14 cabeçalhos</b> com nomes aprovados, cada um com tooltip ao passar o mouse sobre o título.</li>\n<li>Exibir <b>Térm.Prog.</b> e <b>Término Lib.</b> apenas como datas, sem horário; manter data/hora do FIN no tooltip da célula de <b>F.P.</b>.</li>\n<li>Validar que Térm.Prog. busca dados no Gerenciamento de Montagem/Assist. Técnica, F.P. em Comercial &gt; Contratos Realizados e Término Lib. em Comercial &gt; Gerenciamento de Contratos Futuros.</li>\n<li>Preservar as regras anteriores de FIN, filtro Itens/Status, CPF/CNPJ, Item 07, Gerar Lote, Renegociar, impostos e controle por item.</li>\n<li>Conferir formatos, registros sem data, permissões e consistência entre telas no ambiente real.</li>\n</ol>\n<div class=\"help-notice help-warning\">As três telas são referências funcionais fornecidas para investigação; tabelas, campos físicos e regra definitiva do Item 07 ainda precisam ser confirmados antes da implantação real.</div>"
  },
  {
    id:'demo', title:'Protótipo x produção', icon:'alert', kicker:'13 · Apresentação',
    subtitle:'O que já funciona e o que é demonstrativo.',
    html:`
      <h2>O que esta demonstração representa</h2><p>O protótipo foi construído para validar o fluxo funcional e a proposta visual com a equipe, incluindo a apresentação à Carla.</p>
      <div class="help-two-cols"><div class="help-info-card"><h4>Disponível nesta versão</h4><ul class="help-bullets"><li>Busca, filtros e seleção de contratos.</li><li>Janela Gerar NFS-e em duas etapas.</li><li>Inclusão automática do item 9.</li><li>Exceção do Item 7.</li><li>Tributos Federais com base automática dos itens e Impostos em leitura.</li><li>Log Geração Notas com rastreamento demonstrativo por lote e motivos de rejeição.</li><li>Filtro FIN e edição de percentuais e valores por item.</li><li>Histórico, DANFSe e outras ações ilustrativas.</li><li>Manual funcional integrado à Ajuda.</li></ul></div><div class="help-info-card"><h4>Não integrado</h4><ul class="help-bullets"><li>Banco de dados e autenticação do eFinance.</li><li>Consultas reais aos módulos de origem.</li><li>Emissão, autorização e cancelamento fiscal.</li><li>APIs municipais/nacionais e TecnoSpeed.</li><li>Regras tributárias homologadas.</li><li>Envio de e-mails e documentos oficiais.</li><li>Persistência permanente dos tributos.</li></ul></div></div>
      <h3>Roteiro sugerido para a apresentação</h3><ol class="help-numbered"><li>Apresentar os filtros, as novas colunas e os cinco totalizadores do rodapé, inclusive Valor Venda Selecionado.</li><li>Selecionar um contrato e abrir <b>Gerar NFS-e</b>.</li><li>Demonstrar a seleção 3 + 4 + 5 e a inclusão automática do 9.</li><li>Avançar até o formulário de emissão e conferir Emitente, códigos e Item NBS.</li><li>Na barra principal, abrir <b>Tributos Federais</b> e conferir a base automática dos itens.</li><li>Mostrar os combos, retenções e <b>Salvar</b>. Depois abrir <b>Impostos</b> e confirmar os mesmos valores salvos.</li><li>Abrir <b>Log Geração Notas</b> para acompanhar os retornos dos lotes; demonstrar a simulação do botão Transmitir.</li><li>Voltar à listagem, selecionar o <b>Item 7</b> e mostrar o bloqueio quando a montagem está vazia.</li><li>Abrir <b>Ajuda</b> para revisar decisões aprovadas e pendências.</li></ol>
      <div class="help-notice help-warning"><b>Uso demonstrativo:</b> nomes, dados, valores, arquivos e processos desta interface são exemplos. Ações locais não significam que a operação foi executada no ambiente de produção.</div>
    `
  }
];
let currentHelpSection='overview';
function helpModal(){
  const nav=HELP_GROUPS.map(g=>`<button type="button" class="help-nav-link ${g.id===currentHelpSection?'active':''}" data-help-nav="${g.id}" title="${escapeHtml(g.subtitle)}" aria-current="${g.id===currentHelpSection?'page':'false'}"><span class="help-nav-icon">${icon(g.icon,16)}</span><span>${escapeHtml(g.title)}</span></button>`).join('');
  const articles=HELP_GROUPS.map(g=>`<article class="help-article" data-help-article="${g.id}" ${g.id===currentHelpSection?'':'hidden'}><div class="help-article-heading"><span class="help-kicker">${escapeHtml(g.kicker)}</span><p>${escapeHtml(g.subtitle)}</p></div><div class="help-document">${g.html}</div></article>`).join('');
  const content=`<div class="help-shell"><aside class="help-sidebar"><div class="help-sidebar-top"><label for="help-search">Pesquisar no manual</label><div class="help-search-wrap">${icon('search',17)}<input id="help-search" type="search" placeholder="Buscar botão, regra, coluna..." autocomplete="off" aria-label="Pesquisar no manual"></div><div class="help-search-count" id="help-search-count">${HELP_GROUPS.length} assuntos disponíveis</div></div><nav class="help-nav" aria-label="Seções do manual">${nav}</nav><div class="help-sidebar-foot"><span class="help-foot-indicator"></span><span>Documentação funcional · NFS-e</span></div></aside><main class="help-reader" id="help-reader" tabindex="-1">${articles}<div id="help-empty" class="help-empty" hidden>Nenhum assunto encontrado. Tente outro termo.</div></main></div>`;
  const footer=`<div class="help-footer-left">${icon('info',14)} <span>Manual da proposta funcional · dados de demonstração</span></div>${button('Fechar','close','light')}`;
  return modalMarkup('Ajuda — Manual funcional NFS-e',content,footer,'help-modal');
}
function selectHelpSection(id){
  const target=document.querySelector(`[data-help-article="${id}"]`);
  if(!target||target.hidden && !document.querySelector(`[data-help-nav="${id}"]:not([hidden])`))return;
  currentHelpSection=id;
  document.querySelectorAll('[data-help-nav]').forEach(el=>{const active=el.dataset.helpNav===id;el.classList.toggle('active',active);el.setAttribute('aria-current',active?'page':'false');});
  document.querySelectorAll('[data-help-article]').forEach(el=>{el.hidden=el.dataset.helpArticle!==id;});
  const reader=document.getElementById('help-reader');if(reader)reader.scrollTop=0;
}
function searchHelp(raw){
  const query=String(raw||'').trim().toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const links=[...document.querySelectorAll('[data-help-nav]')];
  let matches=0, first=null;
  links.forEach(link=>{
    const group=HELP_GROUPS.find(g=>g.id===link.dataset.helpNav);
    const source=`${group.title} ${group.subtitle} ${document.querySelector(`[data-help-article="${group.id}"]`).textContent}`.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const visible=source.includes(query);
    link.hidden=!visible;
    if(visible){matches++;if(!first)first=group.id;}
  });
  document.getElementById('help-search-count').textContent=query?`${matches} assunto${matches===1?'':'s'} encontrado${matches===1?'':'s'}`:`${HELP_GROUPS.length} assuntos disponíveis`;
  const empty=document.getElementById('help-empty');empty.hidden=matches!==0;
  if(matches===0){document.querySelectorAll('[data-help-article]').forEach(el=>el.hidden=true);return;}
  const keep=links.find(link=>link.dataset.helpNav===currentHelpSection&&!link.hidden);
  selectHelpSection(keep?currentHelpSection:first);
}

function simpleModal(){
 const r=activeRow();let title='',body='',footer=button('Fechar','close','light');const mode=state.modal;
 if(mode==='history'){title='Histórico de NFS-e';body=`<div class="info-content"><h3>Histórico do contrato ${escapeHtml(r.contract||r.code)}</h3><p>12/11/2026 — Contrato disponível para emissão.</p><p>11/11/2026 — Finalização financeira: ${escapeHtml(r.finDate||'Não registrada')}.</p><div class="hint-box">Histórico ilustrativo, sem consulta ao banco de dados.</div></div>`;}
 else if(mode==='preview'||mode==='danfse'){title=mode==='preview'?'Pré-visualizar DANFSe':'DANFSe';body=`<div class="preview-sheet"><h3>DOCUMENTO AUXILIAR DA NFS-e</h3><div class="sheet-info"><span><b>Prestador</b><br>KA EMPRESA 1 LTDA</span><span><b>Identificação</b><br>DEMONSTRAÇÃO</span></div><p><b>Cliente:</b> ${escapeHtml(r.client)}</p><p><b>Contrato:</b> ${escapeHtml(r.contract||r.code)}</p><p><b>Valor dos serviços:</b> R$ ${money(r.value)}</p><div class="hint-box">Prévia ilustrativa: este documento não representa uma NFS-e autorizada.</div></div>`;}
 else if(mode==='redefine'){title='Redefinir Valor da NFS-e';body=`<div class="info-content"><h3>Contrato ${escapeHtml(r.contract||r.code)}</h3><p>Informe um valor para fins de demonstração. Nenhum registro real será alterado.</p><div class="input-line"><label for="redefine-input"><b>Novo valor:</b></label><input id="redefine-input" inputmode="decimal" value="${money(r.value)}"></div></div>`;footer=button('Salvar','save-redefine')+button('Fechar','close','light');}
 
 else {title='Informações';body=`<div class="info-content">Protótipo local para apresentação da nova tela NFS-e à equipe.</div>`;}
 return modalMarkup(title,body,footer,'compact');
}
function renderModal(){
  if(!state.modal){closeModal();return;}
  root.innerHTML=state.modal==='generation'?generationModal():state.modal==='tax'?taxModal():state.modal==='impostos'?impostosModal():state.modal==='generation-logs'?generationLogsModal():state.modal==='help'?helpModal():simpleModal();
  const close=root.querySelector('.modal-close');if(close)close.focus({preventScroll:true});
}
function saveTaxes(){
  const t=taxForActive();
  if(['pis','cofins','pisRet','cofinsRet','csllRate','cpRate','irRate','other'].some(k=>!Number.isFinite(t[k])||t[k]<0)){toast('Preencha valores válidos e não negativos.','error');return;}
  const row=activeRow();state.taxes[row.id]={...t};
  const reviewPending=state.pendingTaxQueue.length>0||state.taxReturn==='transmission';
  const remaining=[...state.pendingTaxQueue];closeModal();
  toast('Tributos Federais conferidos e salvos para '+(row.contract||row.code)+' (simulação).');
  if(reviewPending){
    if(remaining.length){
      state.pendingTaxQueue=remaining.slice(1);
      state.taxReturn='transmission';
      state.activeRow=remaining[0];openModal('tax',remaining[0]);
    }else{state.taxReturn=null;simulateBatchTransmission();}
  }
}

function logPreparedGeneration(row,lotOverride=null){
 const sequence=state.logBatchSequence++;
 state.generationLogs.unshift({
  id:'prep-'+sequence+'-'+row.id,lot:lotOverride||'DEMO-'+String(sequence).padStart(3,'0'),generatedAt:new Date().toLocaleString('pt-BR'),
  status:'Preparada',recordId:row.id,client:row.client,contract:row.contract||row.code,
  emitter:row.generationParameters?.emitter||state.genForm.emitter,items:[...(row.sentItems||[])],
  returnMessage:'Itens preparados para envio. Aguardando transmissão demonstrativa.'
 });
 state.logPage=1;
}
function simulateBatchTransmission(){
 const selected=rows.filter(r=>state.selected.has(r.id));
 if(!selected.length){toast('Selecione os contratos para simular a transmissão.','warning');return;}
 const seq=state.logBatchSequence++,lot='DEMO-'+String(seq).padStart(3,'0');
 const stamp=new Date().toLocaleString('pt-BR');
 selected.forEach((r,i)=>{
  const prepared=Array.isArray(r.generatedItems)&&r.generatedItems.length>0;
  const status=!prepared?'Aguardando preparação':i%2===0?'Autorizada':'Rejeitada';
  const message=!prepared?'Contrato ainda não preparado para transmissão; use Gerar NFS-e.':
   status==='Autorizada'?'NFS-e autorizada (simulação; sem envio à prefeitura).':
   'NFS-e rejeitada (simulação): inconsistência no serviço do emitente (motivo fictício).';
  if(prepared){
   r.issuedItems=r.issuedItems||[];
   r.generatedItems.forEach(item=>{
    r.itemStatus[item.id]=status==='Autorizada'?'Gerada':'Nao Gerada';
    if(status==='Autorizada'&&!r.issuedItems.includes(item.id))r.issuedItems.push(item.id);
   });
   // A situação de cada item é independente. Restantes não gerados permanecem Não Gerada.
   r.status=Object.values(r.itemStatus).some(v=>v==='Nao Gerada')?'Nao Gerada':
     Object.values(r.itemStatus).some(v=>v==='Pendente de Transmissão')?'Pendente de Transmissão':'Gerada';
   r.generatedItems=[];
  }
  const attrs={lot,generatedAt:stamp,status,recordId:r.id,client:r.client,contract:r.contract||r.code,
    emitter:r.generationParameters?.emitter||'Não informado',items:[...(r.sentItems||[])],returnMessage:message};
  const log=state.generationLogs.find(x=>x.recordId===r.id&&x.status==='Preparada');
  if(log)Object.assign(log,attrs);else state.generationLogs.unshift({id:'batch-'+seq+'-'+r.id,...attrs});
 });
 state.logPage=1;renderTable();
 toast('Lote '+lot+' simulado. Consulte Log Geração Notas para os resultados fictícios.','warning');
}
function startTransmission(){
 const selected=rows.filter(r=>state.selected.has(r.id));
 if(!selected.length){toast('Selecione contratos para a transmissão demonstrativa.','warning');return;}
 // Apenas itens 07 preparados exigem revisão das retenções antes do envio.
 const item7=selected.filter(r=>r.generatedItems?.some(i=>i.id===7)&&r.itemStatus?.[7]==='Pendente de Transmissão');
 if(item7.length){
  state.pendingTaxQueue=item7.map(r=>r.id);
  state.taxReturn='transmission';
  const first=state.pendingTaxQueue.shift();
  state.activeRow=first;
  openModal('tax',first);
  toast('Item 07 detectado: confira Tributos Federais antes de transmitir. Regra definitiva a validar.','warning');
  return;
 }
 simulateBatchTransmission();
}
function dateBRFromISO(iso){const p=String(iso||'').split('-');return p.length===3?`${p[2]}/${p[1]}/${p[0]}`:'';}
function prepareSelectedGeneration(){
 const targets=generationTargets(),ids=selectedItemIds();
 if(!ids.size){toast('Selecione ao menos um item.','warning');return;}
 const sharedLot=state.batchMode?'DEMO-'+String(state.logBatchSequence++).padStart(3,'0'):null;
 targets.forEach(row=>{
  const items=itemCatalog.filter(i=>ids.has(i.id)).map(i=>itemForContract(row,i.id));
  row.generatedItems=items.map(i=>({id:i.id,pct:i.pct,value:i.value}));
  row.sentItems=items.map(i=>String(i.id).padStart(2,'0'));
  row.itemStatus=row.itemStatus||{};
  items.forEach(i=>row.itemStatus[i.id]='Pendente de Transmissão');
  itemCatalog.filter(i=>!ids.has(i.id)).forEach(i=>row.itemStatus[i.id]=row.itemStatus[i.id]||'Nao Gerada');
  row.issueDate=dateBRFromISO(state.genForm.date);
  row.generationParameters={...state.genForm};
  row.status=Object.values(row.itemStatus).some(status=>status==='Nao Gerada')?'Nao Gerada':'Pendente de Transmissão';
  logPreparedGeneration(row,sharedLot);
 });
 state.batchMode=false;state.generationMode='normal';
 closeModal();renderTable();
 toast(targets.length+' contrato(s) preparado(s). Itens não preparados permanecem Não Gerada; sem emissão fiscal real.');
}
function modalAction(action){
 if(action==='close'){closeModal();return;}
 if(action.startsWith('logs-')){
  const max=Math.max(1,Math.ceil(state.generationLogs.length/state.logPageSize));
  if(action==='logs-first')state.logPage=1;
  else if(action==='logs-prev')state.logPage=Math.max(1,state.logPage-1);
  else if(action==='logs-next')state.logPage=Math.min(max,state.logPage+1);
  else if(action==='logs-last')state.logPage=max;
  renderModal();return;
 }
 if(action==='tab-items'){state.step=1;renderModal();return;}
 if(action==='tab-data'){if(state.generationMode==='renegotiate')return;if(selectedItemIds().size){state.step=2;renderModal();}else toast('Selecione ao menos um item.','warning');return;}
 if(action==='next'){if(state.generationMode==='renegotiate')return;if(!selectedItemIds().size){toast('Selecione ao menos um item para continuar.','warning');return;}state.step=2;renderModal();return;}
 if(action==='save-renegotiation'){
  if(state.generationMode!=='renegotiate')return;
  const row=generationTargets()[0];
  state.itemEdits[row.id]={...(state.itemEdits[row.id]||{}),...(state.renegDraft||{})};
  state.renegDraft=null;closeModal();renderTable();
  toast('Valores renegociados salvos apenas nesta sessão, sem emissão.');return;
 }
 if(action==='save-taxes'){saveTaxes();return;}
 if(action==='confirm-generation'){
  if(state.generationMode==='renegotiate')return;
  if(!state.genForm.emitter){toast('Selecione o Emitente.','warning');return;}
  if(!state.genForm.ibscbs||!state.genForm.service||!state.genForm.iss||!state.genForm.nbs||!state.genForm.date){
   toast('Preencha IBS/CBS, serviço, ISS, NBS e data de emissão.','warning');return;
  }
  prepareSelectedGeneration();return;
 }
 if(action==='save-redefine'){
   const val=parseNumber($('redefine-input').value);if(val<0){toast('Valor inválido.','error');return;}
   activeRow().value=val;closeModal();renderTable();toast('Valor atualizado somente na sessão de demonstração.');return;
 }
}
function updateTaxesFromInputs(field,raw){
  const t=taxForActive();
  if(field==='situation'||field==='retention')t[field]=raw;
  else if(field==='cp'||field==='ir')t[field]=Boolean(raw);
  else {if(!/^(?:\s*[\d.,]+\s*%?\s*)$/.test(raw)){toast('Use números no formato 1.000,00 ou 0,65 %.','warning');renderModal();return;}t[field]=parseNumber(raw.replace('%',''));}
  state.taxDraft=t;renderModal();
}
function setGenerationItem(id,checked){
  if(id===9&&autoItem9()){
    // O item 9 permanece selecionado enquanto 3, 4 e 5 estiverem marcados.
    // Recria o checkbox marcado (em azul) se o usuário tentar desmarcá-lo.
    renderModal();
    return;
  }
  if(checked)state.itemSelection.add(id);else state.itemSelection.delete(id);
  renderModal();
}
function onGlobalAction(action,el){
  switch(action){
    case 'selected':state.selectedOnly=!state.selectedOnly;state.page=1;renderTable();return;
    case 'generate':{
      demoTarget(true);state.generationMode='normal';state.renegDraft=null;state.batchMode=false;
      state.generationRowIds=rows.filter(r=>state.selected.has(r.id)).map(r=>r.id);
      state.itemSelection=new Set([3,4,5]);state.step=1;openModal('generation');return;
    }
    case 'generate-batch':{
      const selected=rows.filter(r=>state.selected.has(r.id));
      if(!selected.length||selected.some(r=>personType(r)==='PJ')){
        toast('Gerar Lote exige ao menos um CPF e não admite CNPJ na seleção.','warning');return;
      }
      state.generationMode='normal';state.renegDraft=null;state.batchMode=true;
      state.generationRowIds=selected.map(r=>r.id);
      state.itemSelection=new Set([3,4,5]);state.step=1;state.activeRow=selected[0].id;
      openModal('generation');return;
    }
    case 'renegotiate':{
      const selected=rows.filter(r=>state.selected.has(r.id));
      if(selected.length!==1){toast('Renegociar exige exatamente um contrato selecionado.','warning');return;}
      state.activeRow=selected[0].id;state.generationRowIds=[selected[0].id];
      state.generationMode='renegotiate';state.renegDraft={};state.batchMode=false;state.step=1;
      state.itemSelection=new Set([3,4,5]);openModal('generation');return;
    }
    case 'tax':demoTarget(false);openModal('tax');return;
    case 'impostos':demoTarget(false);openModal('impostos');return;
    case 'generation-logs':state.logPage=1;openModal('generation-logs');return;
    case 'transmit':startTransmission();return;
    case 'resend':toast('Reenvio de NFS-e e XML: simulado; nenhum e-mail foi enviado.','warning');return;
    case 'refresh':renderTable();toast('Consulta da listagem atualizada localmente.');return;
    case 'cancel':{
      const selected=rows.filter(r=>state.selected.has(r.id));if(!selected.length){toast('Selecione um contrato para simular o cancelamento.','warning');return;}
      if(window.confirm(`Simular cancelamento de ${selected.length} registro(s)? Esta ação afeta apenas o protótipo.`)){
        selected.forEach(r=>{r.status='Cancelada';itemCatalog.forEach(i=>r.itemStatus[i.id]='Cancelada');});state.selected.clear();renderTable();toast('Cancelamento simulado. Nenhuma nota real foi cancelada.');
      }return;}
    case 'archive':{
      const selected=rows.filter(r=>state.selected.has(r.id));
      if(!selected.length){toast('Selecione uma nota para arquivar.','warning');return;}
      if(window.confirm('Arquivar '+selected.length+' nota(s) apenas neste protótipo?')){
        selected.forEach(r=>{r.status='Arquivada';itemCatalog.forEach(i=>r.itemStatus[i.id]='Arquivada');});
        state.selected.clear();renderTable();toast('Notas arquivadas na sessão de demonstração.');
      }return;
    }
    case 'invalidate':toast('Inutilização de número NFS-e: aplicabilidade depende do município. Apenas demonstração.','warning');return;
    case 'download':{
      const listed=rows.filter(r=>state.selected.has(r.id));const data=listed.length?listed:getFilteredRows();
      const blob=new Blob([JSON.stringify({tipo:'NFS-e - DADOS DEMONSTRATIVOS',data},null,2)],{type:'application/json;charset=utf-8'});
      const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='nfse-demonstracao.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),500);toast('Arquivo de demonstração gerado (JSON local, não é XML fiscal).');return;
    }
    case 'fin-info':{
      const r=rows.find(x=>x.id===el.dataset.record);toast(r?.fin?`Financeiro processado em ${r.finDate}`:'Financeiro ainda não processado.');return;}
    case 'first-page':state.page=1;renderTable();return;
    case 'prev-page':state.page=Math.max(1,state.page-1);renderTable();return;
    case 'next-page':state.page+=1;renderTable();return;
    case 'last-page':state.page=Math.max(1,Math.ceil(getFilteredRows().length/state.pageSize));renderTable();return;
    case 'apply-filter':state.page=1;renderTable();toast('Filtros aplicados à listagem de demonstração.');return;
    case 'print':window.print();return;
    case 'history':case 'danfse':case 'redefine':case 'help':openModal(action);return;
    case 'menu':case 'favorites':case 'info':case 'messages':case 'calendar':case 'global-search':case 'home':toast('Comando do cabeçalho ilustrativo — sem navegação externa.','warning');return;
  }
}
function bindEvents(){
 document.addEventListener('click',e=>{
   const ma=e.target.closest('[data-modal-action]');if(ma){modalAction(ma.dataset.modalAction);return;}
   const helpNav=e.target.closest('[data-help-nav]');if(helpNav){selectHelpSection(helpNav.dataset.helpNav);return;}
   const a=e.target.closest('[data-action]');if(a){onGlobalAction(a.dataset.action,a);return;}
   if(e.target.classList.contains('modal-backdrop')){closeModal();return;}
 });
 document.addEventListener('input',e=>{
   const el=e.target;
   if(el.matches('[data-gen-item-value]'))changeItemValue(Number(el.dataset.genItemValue),el.dataset.genValueKey,el.value,false);
 });
 document.addEventListener('change',e=>{
   const el=e.target;
   if(el.matches('[data-select-row]')){chooseRow(el.dataset.selectRow,el.checked);return;}
   if(el.id==='select-all'){
     const list=getFilteredRows().slice((state.page-1)*state.pageSize,state.page*state.pageSize);
     let blocked=0;list.forEach(r=>{if(isRowLocked(r)){blocked++;return;}if(el.checked)state.selected.add(r.id);else state.selected.delete(r.id);});renderTable();if(blocked&&state.filterItem==='7')toast(`${blocked} registro(s) sem liberação futura não puderam ser selecionados (regra provisória).`,'warning');return;
   }
   if(el.matches('[data-gen-item-value]')){changeItemValue(Number(el.dataset.genItemValue),el.dataset.genValueKey,el.value,true);return;}
   if(el.matches('[data-gen-item]')){setGenerationItem(Number(el.dataset.genItem),el.checked);return;}
   if(el.id==='gen-select-all'){
     state.itemSelection=el.checked?new Set(itemCatalog.map(i=>i.id)):new Set();renderModal();return;
   }
   if(el.matches('[data-gen-field]')){state.genForm[el.dataset.genField]=el.value;return;}
   if(el.matches('[data-tax-select]')){updateTaxesFromInputs(el.dataset.taxSelect,el.value);return;}
   if(el.matches('[data-tax-check]')){updateTaxesFromInputs(el.dataset.taxCheck,el.checked);return;}
   if(el.matches('[data-tax-field]')){const k=el.dataset.taxField;if(k!=='_readonly')updateTaxesFromInputs(k,el.value);return;}

   if(el.id==='loja')state.filterStore=el.value;
   if(el.id==='status')state.filterStatus=el.value;
   if(el.id==='fin-filter')state.filterFin=el.value;
   if(el.id==='person-filter')state.filterPerson=el.value;
   if(el.id==='item-filter'){state.filterItem=el.value;resetSelectionOnItemChange();}
   if(el.id==='search-type')state.searchType=el.value;
   if(el.id==='start-date')state.searchStart=el.value;
   if(el.id==='end-date')state.searchEnd=el.value;
   if(el.id==='date-field')state.searchField=el.value;
   if(el.id==='periodo')state.period=el.value;
   if(['loja','status','fin-filter','person-filter','item-filter'].includes(el.id)){state.page=1;renderTable();}
 });
 $('search-input').addEventListener('input',e=>{state.search=e.target.value.trim();state.page=1;renderTable()});
 $('search-input').addEventListener('keydown',e=>{if(e.key==='Enter'){state.page=1;renderTable();}});
 document.addEventListener('input',e=>{if(e.target.id==='help-search'){searchHelp(e.target.value);return;}if(e.target.matches('[data-gen-field]')&&e.target.tagName==='TEXTAREA')state.genForm[e.target.dataset.genField]=e.target.value;});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&state.modal)closeModal();});
}
if($('fin-filter'))$('fin-filter').value=state.filterFin;
if($('item-filter'))$('item-filter').value=state.filterItem;
applyIcons();bindEvents();renderTable();


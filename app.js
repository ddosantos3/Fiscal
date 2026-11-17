
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
// Fases FIN fictícias para demonstrar o filtro; independentes do indicador "Fin Processado".
const FIN_DEMO_STATUS=["Aberto - Não enviado","Aberto - Enviado sem fin","Fechado - Enviado com fin","Fechado - Enviado com fin","Aberto - Não enviado","Fechado - Enviado com fin","Em substituição","Aberto - Enviado sem fin","Fechado - Enviado com fin","Fechado - Enviado com fin","Aberto - Não enviado","Fechado - Enviado com fin","Fechado - Enviado com fin","Em substituição","Aberto - Enviado sem fin","Fechado - Enviado com fin"];
rows.forEach((r,i)=>{r.finStage=FIN_DEMO_STATUS[i]||'Aberto - Não enviado';});
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
const taxDefaults={situation:'01',retention:'3',base:1000,pis:0.65,cofins:3,pisRet:0.65,cofinsRet:3,csllBase:1000,csllRate:1,cp:false,cpBase:0,cpRate:0,ir:true,irBase:1000,irRate:1.5,other:0};
const state={selected:new Set(),page:1,pageSize:16,selectedOnly:false,modal:null,taxReturn:null,taxDraft:null,step:1,activeRow:null,itemSelection:new Set([3,4,5]),itemEdits:{},taxes:{},genForm:{emitter:'LB SERVICOS DE MONTAGENS',date:today,ibscbs:'TESTE001 - Teste - Simulado',service:'140601 - Instalação e montagem de aparelhos, máquinas e equipamentos',iss:'01 - Tributável dentro do município',nbs:'101040000 - Serviços de montagem e de edificação de construções pré-fabricadas',extra:'(1) Esta NFS-e foi emitida com respaldo na Lei nº 14.097/2005; (2) Documento emitido por ME ou EPP optante pelo Simples Nacional;',fisco:'',env:true},search:'',searchType:'client',searchStart:'',searchEnd:'',searchField:'saleDate',filterItem:'',filterStore:'',filterStatus:'Nao Gerada',filterFin:'',period:'3'};
const $ = id => document.getElementById(id);
const root=$('modal-root');
function toast(message,type='success'){
  const el=document.createElement('div');el.className=`toast ${type}`;el.textContent=message;$('toast-container').append(el);
  el.addEventListener('click',()=>el.remove());setTimeout(()=>el.remove(),4800);
}
function dateValue(dateBR){const p=String(dateBR||'').split('/');return p.length===3?`${p[2]}-${p[1]}-${p[0]}`:'';}
function getFilteredRows(){
  return rows.filter(r=>{
    if(state.selectedOnly&&!state.selected.has(r.id))return false;
    if(state.filterStore&&String(r.store)!==state.filterStore)return false;
    if(state.filterStatus&&r.status!==state.filterStatus)return false;
    if(state.filterFin==='Aberto - Todos'&&!r.finStage.startsWith('Aberto -'))return false;
    if(state.filterFin&&state.filterFin!=='Aberto - Todos'&&r.finStage!==state.filterFin)return false;
    const field=state.searchType==='contract'?r.contract:state.searchType==='code'?r.code:r.client;
    if(state.search && !String(field).toLowerCase().includes(state.search.toLowerCase()))return false;
    const chosenField=state.searchField==='dataMontagem'?'montage':state.searchField==='dataLiberacao'?'future':'saleDate';
    const value=dateValue(r[chosenField]);
    if(state.searchStart&&(!value||value<state.searchStart))return false;
    if(state.searchEnd&&(!value||value>state.searchEnd))return false;
    return true;
  });
}
function activeRow(){return rows.find(r=>r.id===state.activeRow) || rows.find(r=>r.code==='27447') || rows[0];}
function isRowLocked(r){return state.filterItem==='7'&&!r.montage;}
function footerTotals(filtered){
  const defaultView = !state.selectedOnly&&!state.search&&!state.searchStart&&!state.searchEnd&&!state.filterStore&&state.filterStatus==='Nao Gerada'&&!state.filterFin;
  const selectedVisible=rows.filter(r=>state.selected.has(r.id));
  const selectedCount=selectedVisible.reduce((sum,r)=>sum+(r.sentItems.length||1),0);
  $('total-selected').textContent=selectedCount;
  $('total-emit').textContent=defaultView?'32':filtered.filter(r=>r.status==='Nao Gerada').length;
  $('total-found').textContent=defaultView?'416':filtered.length;
  $('total-sale').textContent=defaultView?'78.018.029,38':money(filtered.reduce((sum,r)=>sum+r.value,0));
}
function renderTable(){
  const filtered=getFilteredRows();const totalPages=Math.max(1,Math.ceil(filtered.length/state.pageSize));
  if(state.page>totalPages)state.page=totalPages;
  const segment=filtered.slice((state.page-1)*state.pageSize,state.page*state.pageSize);
  $('records-body').innerHTML=segment.map(r=>{
    const locked=isRowLocked(r),sel=state.selected.has(r.id);
    const tooltip=r.fin?`Data Fin: ${r.finDate}`:'Financeiro pendente de processamento';
    return `<tr class="${sel?'is-selected ':''}${locked?'is-locked':''}" data-row-id="${r.id}">
      <td><input type="checkbox" data-select-row="${r.id}" aria-label="Selecionar contrato ${escapeHtml(r.contract||r.code)}" ${sel?'checked':''} ${locked?'disabled title="Item 7: montagem não concluída"':''} /></td>
      <td>${r.emp}</td><td>${r.store}</td><td>${escapeHtml(r.code)}</td><td>${escapeHtml(r.client)}</td><td>${escapeHtml(r.saleType)}</td><td>${escapeHtml(r.contract)}</td><td>${r.status==='Nao Gerada'?'Não Gerada':escapeHtml(r.status)}</td><td>${r.saleDate}</td><td>${escapeHtml(r.orders)}</td><td class="money">${money(r.value)}</td><td>${escapeHtml(r.sentItems.join(', '))}</td><td>S</td><td>${r.montage||'—'}</td><td>${r.future||'—'}</td>
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
}
function defaultResultCount(filtered){return !state.selectedOnly&&!state.search&&!state.searchStart&&!state.searchEnd&&!state.filterStore&&state.filterStatus==='Nao Gerada'&&!state.filterFin?416:filtered.length;}
function chooseRow(rid,checked){
  const r=rows.find(x=>x.id===rid);if(!r)return;
  if(checked&&isRowLocked(r)){toast('Item 7: não é possível selecionar este contrato, pois a montagem ainda não foi concluída.','warning');return;}
  if(checked){state.selected.add(rid);state.activeRow=rid;}else state.selected.delete(rid);
  renderTable();
}
function resetSelectionOnItemChange(){
  if(state.filterItem==='7'){
    const locked=rows.filter(r=>isRowLocked(r)&&state.selected.has(r.id));
    locked.forEach(r=>state.selected.delete(r.id));
    if(locked.length)toast(`${locked.length} contrato(s) desmarcado(s): montagem não concluída para o Item 7.`,'warning');
  }
}
function demoTarget(alsoSelect=false){
  const target=rows.find(r=>state.selected.has(r.id))||rows.find(r=>r.code==='27447');
  if(alsoSelect&&!state.selected.size){state.selected.add(target.id);renderTable();toast('Contrato Fernanda Martins Rocha selecionado como exemplo para a apresentação.','warning');}
  state.activeRow=target.id;return target;
}
function openModal(name, rowId=null){if(rowId)state.activeRow=rowId;state.taxReturn=null;state.modal=name;state.taxDraft=name==='tax'?(state.taxes[activeRow().id]?{...state.taxes[activeRow().id]}:{...taxDefaults}):null;renderModal();}
function closeModal(){
  state.modal=null;state.taxReturn=null;state.taxDraft=null;root.innerHTML='';document.body.style.overflow='';
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
function generationTabs(){return `<div class="modal-tabs"><button type="button" class="${state.step===1?'active':''}" data-modal-action="tab-items">Gerar NFS-e - Selecione os itens que serão enviados para NFS-e.</button><button type="button" class="${state.step===2?'active':''}" data-modal-action="tab-data">Gerar Nota Fiscal de Serviço</button></div>`;}
function getItemValue(i){
  const changes=state.itemEdits[activeRow().id]?.[i.id]||{};
  return {...i,...changes};
}

function recalcGenerationSummary(){
  const picked=selectedItemIds();
  const items=itemCatalog.map(getItemValue).filter(i=>picked.has(i.id));
  const pct=items.reduce((sum,i)=>sum+i.pct,0);
  const amount=items.reduce((sum,i)=>sum+i.value,0);
  const p=document.querySelector('[data-summary-pct]'),v=document.querySelector('[data-summary-value]');
  if(p)p.textContent=decimal(pct,6);
  if(v)v.textContent=money(amount);
}

function changeItemValue(id,key,raw,commit=false){
  const txt=String(raw??'').trim();
  const valid=/^\d+(?:[.,]\d+)?$|^\d{1,3}(?:\.\d{3})+(?:,\d+)?$/.test(txt);
  if(!valid){if(commit){toast('Informe um número válido e não negativo.','warning');renderModal();}return;}
  const numeric=parseNumber(txt);
  if(!Number.isFinite(numeric)||numeric<0||(key==='pct'&&numeric>100)){
    if(commit){toast('O percentual deve estar entre 0 e 100 e o valor não pode ser negativo.','warning');renderModal();}
    return;
  }
  const keyRow=activeRow().id;
  if(!state.itemEdits[keyRow])state.itemEdits[keyRow]={};
  state.itemEdits[keyRow][id]={...state.itemEdits[keyRow][id],[key]:numeric};
  if(commit)renderModal();else recalcGenerationSummary();
}

function generationBody(){
  if(state.step===2)return generationForm();
  const ids=selectedItemIds();
  const values=itemCatalog.map(getItemValue).filter(i=>ids.has(i.id));
  const pct=values.reduce((s,i)=>s+i.pct,0),total=values.reduce((s,i)=>s+i.value,0);
  const tbody=itemCatalog.map(base=>{
    const i=getItemValue(base),isAuto=i.id===9&&autoItem9();
    return `<tr class="${ids.has(i.id)?'':'muted'} ${isAuto?'is-auto':''}">
     <td><input type="checkbox" data-gen-item="${i.id}" aria-label="Selecionar item ${i.id}" ${ids.has(i.id)?'checked':''} ${isAuto?'disabled title="Incluído automaticamente"':''}></td>
     <td>${String(i.id).padStart(2,'0')} - ${escapeHtml(i.name)}${isAuto?' <span class="auto-indicator">(Auto)</span>':''}</td>
     <td>${escapeHtml(i.provider)}</td>
     <td><input class="gen-editable" type="text" inputmode="decimal" data-gen-item-value="${i.id}" data-gen-value-key="pct" aria-label="Percentual de venda do item ${i.id}" value="${decimal(i.pct,6)}"></td>
     <td><input class="gen-editable" type="text" inputmode="decimal" data-gen-item-value="${i.id}" data-gen-value-key="value" aria-label="Valor do item ${i.id}" value="${money(i.value)}"></td>
    </tr>`;
  }).join('');
  return `<table class="generation-items-table" aria-label="Itens para NFS-e"><thead><tr><th><input type="checkbox" id="gen-select-all" aria-label="Selecionar todos" ${ids.size===9?'checked':''}></th><th>Itens</th><th>Fornecedor</th><th>% Venda</th><th>Valor</th></tr></thead><tbody>${tbody}</tbody></table>
    <div class="generation-item-summary"><span>% Selecionado</span><output data-summary-pct>${decimal(pct,6)}</output><span>Total selec.</span><output data-summary-value>${money(total)}</output></div>
    <div class="auto-note">Selecionar os itens 3, 4 e 5 inclui automaticamente o item 9. % Venda e Valor são editáveis independentemente neste protótipo.</div>`;
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
  const footer=state.step===1?`${button('Próximo','next')}${button('Fechar','close')}`:`${button('Ok','confirm-generation')}${button('Fechar','close')}`;
  return modalMarkup('Gerar NFS-e',generationBody(),footer,'generation',generationTabs());
}
function taxForActive(){const row=activeRow();return state.taxDraft?{...state.taxDraft}:state.taxes[row.id]?{...state.taxes[row.id]}:{...taxDefaults};}
function taxValue(base,rate){return money(base*rate/100);}
function taxInput(field,value,disabled=false){return `<input type="text" inputmode="decimal" data-tax-field="${field}" value="${escapeHtml(value)}" ${disabled?'disabled':''}>`;}
function taxPct(field,val,disabled=false){return taxInput(field,`${decimal(val,2)} %`,disabled);}
function taxModal(){
  const t=taxForActive(),ret=t.retention==='3',cpi=!!t.cp,iri=!!t.ir;
  const label=(text,field,content,required=false)=>`<label><span>${text}${required?' <small>*</small>':''}</span>${content}</label>`;
  const taxRow=(text,field,base,rate,checked,checkKey,divider=false)=>`<tr class="tax-row-compact ${divider?'row-divider':''}">
    <td><div class="tax-field"><label class="tax-checkbox"><input type="checkbox" data-tax-check="${checkKey}" ${checked?'checked':''}><span>${text} - Base de Cálculo</span></label>${taxInput(field,decimal(base),!checked)}</div></td>
    <td>${label('Alíquota',checkKey==='cp'?'cpRate':'irRate',taxPct(checkKey==='cp'?'cpRate':'irRate',rate,!checked))}</td>
    <td>${label('Valor','',taxInput('_readonly',taxValue(base,rate),true))}</td></tr>`;
  const taxContent=`<div class="tax-subtitle">PIS/COFINS/CSLL</div><div class="tax-top">
    <label for="tax-situation">Situação tributária PIS/COFINS<select id="tax-situation" data-tax-select="situation"><option value="01" ${t.situation==='01'?'selected':''}>01 - Operação Tributável com Alíquota Básica</option><option value="02" ${t.situation==='02'?'selected':''}>02 - Operação Tributável com Alíquota Diferenciada</option><option value="04" ${t.situation==='04'?'selected':''}>04 - Operação Tributável Monofásica</option><option value="06" ${t.situation==='06'?'selected':''}>06 - Operação Tributável a Alíquota Zero</option></select></label>
    <label for="tax-retention">Tipo de retenção PIS/COFINS<select id="tax-retention" data-tax-select="retention"><option value="0" ${!ret?'selected':''}>0 - PIS/COFINS/CSLL Não Retidos</option><option value="3" ${ret?'selected':''}>3 - PIS/COFINS/CSLL Retidos</option></select></label></div>
    <div class="tax-layout"><table><tbody>
      <tr><td>${label('Base de cálculo PIS/COFINS','base',taxInput('base',money(t.base)),true)}</td>
      <td class="rate-cell"><div class="tax-rate-list">
        ${label('Alíquota PIS - Ap. Própria','pis',taxPct('pis',t.pis))}
        ${label('Alíquota COFINS - Ap. Própria','cofins',taxPct('cofins',t.cofins))}
        ${label('Alíquota PIS - Retido','pisRet',taxPct('pisRet',ret?t.pisRet:0,!ret),ret)}
        ${label('Alíquota COFINS - Retido','cofinsRet',taxPct('cofinsRet',ret?t.cofinsRet:0,!ret),ret)}
      </div></td>
      <td class="value-cell"><div class="tax-rate-list">
        ${label('Valor','',taxInput('_readonly',taxValue(t.base,t.pis),true))}
        ${label('Valor','',taxInput('_readonly',taxValue(t.base,t.cofins),true))}
        ${label('Valor','',taxInput('_readonly',ret?taxValue(t.base,t.pisRet):'0,00',true))}
        ${label('Valor','',taxInput('_readonly',ret?taxValue(t.base,t.cofinsRet):'0,00',true))}
      </div></td></tr>
      <tr class="tax-row-compact row-divider"><td>${label('CSLL - Base de Cálculo','csllBase',taxInput('csllBase',money(ret?t.csllBase:0),!ret),ret)}</td><td>${label('Alíquota','csllRate',taxPct('csllRate',ret?t.csllRate:0,!ret),ret)}</td><td>${label('Valor','',taxInput('_readonly',ret?taxValue(t.csllBase,t.csllRate):'0,00',true))}</td></tr>
      ${taxRow('CP','cpBase',t.cpBase,t.cpRate,cpi,'cp',true)}
      ${taxRow('IR','irBase',t.irBase,t.irRate,iri,'ir',true)}
      <tr class="tax-row-compact row-divider"><td>${label('Outras Retenções','other',taxInput('other',money(t.other)))}</td><td class="spacer-cell"></td><td class="spacer-cell"></td></tr>
    </tbody></table></div>
    <p class="tax-note">Valores e combos demonstrativos com base nos prints enviados. Na integração real, obedecer às regras e opções do portal da prefeitura.</p>`;
  return modalMarkup('Tributos Federais',taxContent,button('Salvar','save-taxes','','save'),'tax-modal');
}
function impostosModal(){
  const r=activeRow(),t=state.taxes[r.id];
  if(!t){
    return modalMarkup('Impostos',`<div class="impostos-empty"><h3>Sem tributos federais salvos</h3><p>Selecione o contrato e preencha <b>Tributos Federais</b>, depois clique em <b>Salvar</b>. Os valores aparecerão aqui para consulta.</p><p>Este painel apresenta dados locais e demonstrativos, não impostos apurados em produção.</p></div>`,button('Fechar','close'),'impostos-modal');
  }
  const data=[];
  const add=(title,base,rate,amount)=>{
    data.push({title,base,rate,amount});
  };
  add('PIS - Ap. Própria',t.base,t.pis,t.base*t.pis/100);
  add('COFINS - Ap. Própria',t.base,t.cofins,t.base*t.cofins/100);
  if(t.retention==='3'){
    add('PIS - Retido',t.base,t.pisRet,t.base*t.pisRet/100);
    add('COFINS - Retido',t.base,t.cofinsRet,t.base*t.cofinsRet/100);
    add('CSLL',t.csllBase,t.csllRate,t.csllBase*t.csllRate/100);
  }
  if(t.ir)add('IR',t.irBase,t.irRate,t.irBase*t.irRate/100);
  if(t.cp)add('CP',t.cpBase,t.cpRate,t.cpBase*t.cpRate/100);
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
        <tr><td><b>Gerar NFS-e</b></td><td>Iniciar a seleção de itens e a configuração dos dados de emissão da nota de serviço.</td><td>Abre duas etapas com dados de exemplo.</td></tr>
        <tr><td><b>Transmitir</b></td><td>Enviar documentos preparados à integração responsável pela autorização fiscal.</td><td>Mensagem simulada; não transmite.</td></tr>
        <tr><td><b>DANFSe</b></td><td>Acessar o documento auxiliar da Nota Fiscal de Serviço.</td><td>Abre documento ilustrativo.</td></tr>
        <tr><td><b>Reenviar NFS-e e XML por e-mail</b></td><td>Reenviar os documentos fiscais ao destinatário.</td><td>Somente demonstração; não envia e-mail.</td></tr>
        <tr><td><b>Forçar Nova Consulta</b></td><td>Atualizar a situação dos documentos junto à integração fiscal.</td><td>Atualiza a visualização local.</td></tr>
        <tr><td><b>Cancelar NFS-e</b></td><td>Solicitar cancelamento conforme regras do município ou ambiente nacional aplicável.</td><td>Altera estado local após confirmação.</td></tr>
        <tr><td><b>Inutilizar Número</b></td><td>Comando mantido no desenho, sujeito à confirmação de aplicabilidade para NFS-e.</td><td>Exibe aviso informativo.</td></tr>
        <tr><td><b>Excluir</b></td><td>Remover registros quando a situação e as permissões permitirem.</td><td>Remove apenas da sessão local.</td></tr>
        <tr><td><b>Downloads</b></td><td>Disponibilizar arquivos dos documentos fiscais.</td><td>Exporta JSON demonstrativo, não XML fiscal.</td></tr>
        <tr><td><b>Redefinir Valor da NFS-e</b></td><td>Redefinir valor usado no fluxo, observando regras de negócio existentes.</td><td>Atualiza o valor em memória.</td></tr>
        <tr><td><b>Histórico</b></td><td>Consultar movimentações e eventos do registro.</td><td>Exibe histórico ilustrativo.</td></tr>
        <tr><td><b>Tributos Federais</b></td><td>Abrir o cadastro de PIS/COFINS/CSLL, CP, IR e outras retenções.</td><td>Abre formulário com Salvar local.</td></tr>
        <tr><td><b>Impostos</b></td><td>Consultar em tabela os tributos federais salvos para o contrato, separando apuração própria e retenções.</td><td>Consulta local e somente leitura; não exibe ICMS fictício.</td></tr>
        <tr><td><b>Imprimir</b></td><td>Imprimir os documentos disponíveis.</td><td>Aciona a impressão do navegador.</td></tr>
        <tr><td><b>Ajuda</b></td><td>Abrir este manual funcional da tela NFS-e.</td><td>Manual navegável e pesquisável.</td></tr>
      </tbody></table></div>
      <div class="help-notice"><b>Ordem e posicionamento:</b> <b>Ver selecionados</b> vem antes de <b>Gerar NFS-e</b>; <b>Tributos Federais</b> e <b>Impostos</b> ficam após <b>Histórico</b>; <b>Imprimir</b> e <b>Ajuda</b> permanecem no fim da barra, com espaçamento uniforme.</div>
    `
  },
  {
    id:'filters', title:'Filtros e pesquisa', icon:'search', kicker:'03 · Consulta',
    subtitle:'Combos, pesquisa textual, datas e paginação.',
    html:`
      <h2>Filtros e pesquisa</h2><p>A tela disponibiliza filtros necessários à identificação dos contratos e itens candidatos à emissão.</p>
      <div class="help-table-wrap"><table class="help-table"><thead><tr><th>Controle</th><th>Funcionamento</th></tr></thead><tbody>
        <tr><td><b>Loja</b></td><td>Restringe os registros à loja selecionada.</td></tr>
        <tr><td><b>Status</b></td><td>Filtra pela situação do documento fiscal. Use <b>--Todos--</b> para consultar todas as situações. O protótipo apresenta dados fictícios inicialmente em <b>Não Geradas</b>.</td></tr>
        <tr><td><b>Itens</b></td><td>Seleciona um item específico do contrato ou todos; ao escolher o <b>Item 7</b> ativa a trava especial de montagem.</td></tr>
        <tr><td><b>FIN</b></td><td>--Todos--; Aberto - Todos; Aberto - Não enviado; Aberto - Enviado sem fin; Fechado - Enviado com fin; Em substituição. No protótipo, são situações fictícias para filtro, independentes do indicador Fin Processado.</td></tr>
        <tr><td><b>Buscar por</b></td><td>Permite localizar pelo cliente; no protótipo, também por contrato ou código do cliente.</td></tr>
        <tr><td><b>Período</b></td><td>Define a abrangência temporal da pesquisa.</td></tr>
        <tr><td><b>Filtrar Por</b></td><td>Indica a data usada como referência da consulta; o protótipo oferece Data Venda, Data Término de Montagem e Data Término Liberação Futura.</td></tr>
        <tr><td><b>de / até</b></td><td>Delimitam a data inicial e final.</td></tr>
        <tr><td><b>Aplicar Filtro</b></td><td>Executa a consulta conforme os critérios informados.</td></tr>
        <tr><td><b>Paginação</b></td><td>Navega pelas páginas; seleção e totalizadores devem considerar o conjunto filtrado e não somente o que está visível na página.</td></tr>
      </tbody></table></div>
      <h3>Opções do combo Status</h3><p>A tela apresenta as opções abaixo, na mesma ordem definida no eFinance. <b>--Todos--</b> remove o filtro de status.</p><ul class="help-status-list"><li>Não Geradas</li><li>Geradas Parcialmente</li><li>Pendente de Transmissão</li><li>Transmitindo</li><li>Aguardando Resposta</li><li>Autorizada</li><li>Inutilizada</li><li>Denegada</li><li>Cancelada</li><li>Nota de Entrada</li><li>Arquivada</li></ul><p><b>Nota:</b> as opções representam o filtro da interface; o protótipo não executa transições fiscais reais.</p>
      <h3>Tipos de venda não disponíveis</h3><p><b>AT Com Custo</b> e <b>AT Sem Custo</b> devem sair das opções de pesquisa destinadas à NFS-e. Os demais tipos seguem as regras existentes.</p>
      <div class="help-notice help-neutral"><b>Importante:</b> a exclusão desses tipos das opções de pesquisa não confirma, por si só, a remoção de registros históricos. Esse ponto permanece sujeito à validação técnica.</div>
    `
  },
  {
    id:'columns', title:'Colunas e origem dos dados', icon:'file', kicker:'04 · Listagem',
    subtitle:'Significado das colunas e localização das informações.',
    html:`
      <h2>Colunas da listagem</h2><p>As três colunas novas têm origens funcionais definidas. Para as colunas herdadas, o mapeamento aponta o dado apresentado; a tabela e o campo SQL exatos ainda dependem de confirmação técnica.</p>
      <div class="help-table-wrap"><table class="help-table"><thead><tr><th>Coluna</th><th>O que apresenta</th><th>Origem funcional</th></tr></thead><tbody>
        <tr><td><b>Emp</b></td><td>Código da empresa.</td><td>Cadastro empresarial existente (mapeamento técnico a confirmar).</td></tr>
        <tr><td><b>Loja</b></td><td>Código do estabelecimento.</td><td>Cadastro da loja (mapeamento técnico a confirmar).</td></tr>
        <tr><td><b>Cód.</b></td><td>Código do cliente.</td><td>Cadastro do cliente já utilizado pelo eFinance.</td></tr>
        <tr><td><b>Cliente</b></td><td>Nome do cliente associado.</td><td>Cadastro do cliente já utilizado pelo eFinance.</td></tr>
        <tr><td><b>Tipo Venda</b></td><td>Modalidade da venda.</td><td>Dados comerciais já utilizados na listagem.</td></tr>
        <tr><td><b>Contrato</b></td><td>Identificação do contrato.</td><td>Registro de contrato existente.</td></tr>
        <tr><td><b>Status</b></td><td>Situação da emissão da NFS-e.</td><td>Controle fiscal / retorno da integração de emissão (detalhamento a confirmar).</td></tr>
        <tr><td><b>Data Venda</b></td><td>Data de realização da venda.</td><td>Registro de venda existente.</td></tr>
        <tr><td><b>Pedidos</b></td><td>Pedidos associados à venda/contrato.</td><td>Vínculo com pedidos existentes.</td></tr>
        <tr><td><b>Valor Venda</b></td><td>Valor financeiro da venda.</td><td>Registro comercial da venda.</td></tr>
        <tr><td><b>Itens Enviados p/ NFS-e</b></td><td>Itens encaminhados à composição da NFS-e.</td><td>Controle de itens da emissão; persistência exata a confirmar.</td></tr>
        <tr><td><b>E./S.</b></td><td>Indicador de entrada/saída preservado da tela original.</td><td>Campo existente na listagem; origem a confirmar.</td></tr>
        <tr class="help-accent-row"><td><b>Data Término de Montagem</b> <span class="help-label-new">Nova</span></td><td>Data efetiva de conclusão da montagem, no formato <b>DD/MM/AAAA</b>, sem horário.</td><td><b>Pós-Venda</b> — conclusão da montagem vinculada ao contrato.</td></tr>
        <tr class="help-accent-row"><td><b>Data Término Liberação Futura</b> <span class="help-label-new">Nova</span></td><td>Data de término da liberação futura, no formato <b>DD/MM/AAAA</b>, sem horário.</td><td><b>Gerenciamento de Contratos Futuros</b> — campo <b>Término Lib.</b> do contrato.</td></tr>
        <tr class="help-accent-row"><td><b>Fin Processado</b> <span class="help-label-new">Nova</span></td><td>Check azul quando processado e triângulo de alerta quando pendente. Na finalização, o tooltip mostra data e hora.</td><td><b>Comercial &gt; Contratos Realizados</b> — situação do processamento financeiro.</td></tr>
      </tbody></table></div>
      <h3>Regras de apresentação das novas colunas</h3><ul class="help-bullets"><li>Montagem não concluída ou sem data: apresentar <b>célula vazia</b> (no protótipo, traço indicativo).</li><li>Liberação futura sem data: apresentar <b>célula vazia</b>.</li><li><b>Fin Processado:</b> ao passar o mouse ou focalizar o indicador finalizado, exibir <b>Data Fin: 11/11/2026 23:41:08</b> como exemplo de data/hora.</li><li>Essas colunas apenas consultam dados de origem; <b>não alteram</b> os processos de Pós-Venda, Contratos Futuros e Comercial.</li></ul>
    `
  },
  {
    id:'selection', title:'Regras de seleção', icon:'check', kicker:'05 · Regras de negócio',
    subtitle:'Independência, Item 7 e composição 3 + 4 + 5 + 9.',
    html:`
      <h2>Regras de seleção dos itens</h2><div class="help-rule-block"><span class="help-rule-num">R1</span><div><h3>Remover a trava do registro pai</h3><p>Cada item poderá ser selecionado individualmente, inclusive em momentos distintos para o mesmo contrato. A seleção de um item não obriga selecionar os demais e não deve bloquear seleções posteriores.</p><p><b>Resultado:</b> flexibilidade para emitir itens de um contrato em momentos diferentes, preservando as validações fiscais necessárias.</p></div></div>
      <div class="help-rule-block"><span class="help-rule-num">R2</span><div><h3>Exceção exclusiva do combo Itens = 7</h3><p><b>Somente quando o combo Itens estiver com o Item 7 selecionado</b>, o sistema deverá consultar a coluna <b>Data Término de Montagem</b>, que recebe a conclusão da montagem do Pós-Venda.</p>
      <div class="help-table-wrap"><table class="help-table"><thead><tr><th>Seleção no combo</th><th>Data Término de Montagem</th><th>Seleção do contrato</th></tr></thead><tbody>
        <tr><td><b>Item 7</b></td><td>Vazia</td><td><span class="help-status-no">Bloqueada</span></td></tr>
        <tr><td><b>Item 7</b></td><td>Preenchida</td><td><span class="help-status-yes">Permitida</span></td></tr>
        <tr><td><b>Qualquer outro item</b></td><td>Vazia ou preenchida</td><td>Esta trava específica <b>não se aplica</b>.</td></tr>
      </tbody></table></div>
      <div class="help-notice help-warning"><b>Mensagem de bloqueio:</b> “Não é possível selecionar este contrato para o Item 7, pois a montagem ainda não foi concluída.”</div>
      </div></div>
      <div class="help-rule-block"><span class="help-rule-num">R3</span><div><h3>Inclusão automática do Item 9</h3><p>Quando os <b>itens 3, 4 e 5</b> forem selecionados conjuntamente, a tela de Itens Selecionados deve apresentar também o <b>item 9 — Reserva</b>, sem duplicações.</p>
      <div class="help-selection-demo"><div><span>Selecionados</span><strong>03 · 04 · 05</strong></div><span class="help-selection-arrow">→</span><div><span>Resultado esperado</span><strong>03 · 04 · 05 · 09</strong></div></div>
      <p>Os itens continuam identificados e vinculados ao contrato de origem, para conferência antes da emissão.</p><p class="help-small">Comportamento em seleção parcial ou ao desmarcar itens: <b>precisa ser validado</b>. Neste protótipo, ao deixar de selecionar 3, 4 ou 5, a inclusão automática do item 9 deixa de ser aplicada.</p>
      </div></div>
      <div class="help-rule-block"><span class="help-rule-num">R4</span><div><h3>Seleção independente da emissão</h3><p>Remover travas da seleção <b>não</b> significa dispensar validações fiscais, permissões, situação do documento ou controle contra emissão duplicada.</p></div></div>
    `
  },
  {
    id:'generation', title:'Gerar NFS-e', icon:'send', kicker:'06 · Fluxo de emissão',
    subtitle:'As duas etapas de Gerar Nota Serviço.',
    html:`
      <h2>Fluxo do botão Gerar NFS-e</h2><p>O botão <b>Gerar NFS-e</b> fica imediatamente após <b>Ver selecionados</b>. A janela segue as duas telas da funcionalidade Gerar Nota Serviço já utilizadas no sistema.</p>
      <div class="help-step"><b>Etapa 1</b><div><h3>Selecionar itens</h3><p>Apresenta a relação de itens do contrato com colunas <b>Itens</b>, <b>Fornecedor</b>, <b>% Venda</b> e <b>Valor</b>. Permite selecionar ou desmarcar itens, editar <b>% Venda</b> e <b>Valor</b> individualmente e aplicar a inclusão automática do item 9. Os dois valores são independentes (a alteração de um não recalcula o outro sem regra de negócio aprovada).</p><p><b>Rodapé da etapa:</b> <b>% Selecionado</b> e <b>Total selec.</b> calculados com base nos itens marcados. <b>Próximo</b> avança para os dados de emissão; <b>Fechar</b> encerra a janela.</p></div></div>
      <div class="help-table-wrap"><table class="help-table"><thead><tr><th>Item</th><th>Descrição</th></tr></thead><tbody>
        <tr><td>01</td><td>Produto</td></tr><tr><td>02</td><td>Transporte/Armazenamento</td></tr><tr><td>03</td><td>Coordenação</td></tr><tr><td>04</td><td>Supervisão de Montagem</td></tr><tr><td>05</td><td>Instalação/Assistência</td></tr><tr><td>06</td><td>Layout/Medição/Conferência</td></tr><tr><td>07</td><td>Contratado - Franquia</td></tr><tr><td>08</td><td>Financeira</td></tr><tr><td>09</td><td>Reserva (inclusão automática na combinação 3, 4 e 5)</td></tr>
      </tbody></table></div>
      <div class="help-step"><b>Etapa 2</b><div><h3>Gerar Nota Fiscal de Serviço</h3><p>Após <b>Próximo</b>, exibir os dados necessários à preparação da nota, conforme o mockup de referência.</p>
      <div class="help-table-wrap"><table class="help-table"><thead><tr><th>Campo</th><th>Finalidade</th></tr></thead><tbody>
        <tr><td>Emitente</td><td>Selecionar entre os emitentes do print de referência (exemplo: LB SERVICOS DE MONTAGENS).</td></tr>
        <tr><td>Dt. Emissão</td><td>Informar data da emissão.</td></tr>
        <tr><td>IBS/CBS</td><td>Exemplo parametrizado: TESTE001 - Teste - Simulado; código demonstrativo, sujeito à integração.</td></tr>
        <tr><td>Cód. Serviço NFS-e</td><td>140601 - Instalação e montagem de aparelhos, máquinas e equipamentos.</td></tr>
        <tr><td>Tipo Trib. ISS</td><td>01 - Tributável dentro do município.</td></tr>
        <tr><td>Item NBS</td><td>101040000 - Serviços de montagem e de edificação de construções pré-fabricadas.</td></tr>
        <tr><td>Informação Adicional</td><td>Texto adicional apresentado no documento, quando aplicável.</td></tr>
        <tr><td>Informação p/ o fisco</td><td>Observações destinadas ao fisco, quando aplicável.</td></tr>
      </tbody></table></div><p><b>Botões:</b> <b>Ok</b> confirma a preparação simulada; <b>Fechar</b> encerra. O botão Tributos Federais fica somente na barra principal. A segunda etapa não contém a grade de ambientes nem combo adicional de itens.</p></div></div>
      <div class="help-notice"><b>No protótipo:</b> Emitente, IBS/CBS, código de serviço, tipo ISS, NBS e data são validados antes da confirmação. <b>Ok não transmite</b> documentos; o botão Transmitir da tela principal representa a etapa própria de transmissão.</div>
    `
  },
  {
    id:'taxes', title:'Tributos Federais', icon:'layers', kicker:'07 · Configuração tributária',
    subtitle:'Combos, bases, alíquotas, retenções e Salvar.',
    html:`
      <h2>Janela Tributos Federais</h2><p>O botão fica ao lado de <b>Histórico</b> e abre uma janela exclusiva, com a identidade visual do eFinance e os mesmos tipos de campos do print de referência.</p>
      <div class="help-two-cols"><div class="help-info-card"><h4>Situação tributária PIS/COFINS</h4><p>Combo com a classificação tributária. Exemplo exibido: <b>01 — Operação Tributável com Alíquota Básica</b>.</p></div><div class="help-info-card"><h4>Tipo de retenção PIS/COFINS</h4><p>Combo para definir retenção. Exemplos de referência: <b>0 — Não Retidos</b> e <b>3 — PIS/COFINS/CSLL Retidos</b>.</p></div></div>
      <h3>Campos do formulário</h3>
      <div class="help-table-wrap"><table class="help-table"><thead><tr><th>Grupo</th><th>Campos e comportamento</th></tr></thead><tbody>
        <tr><td><b>PIS/COFINS</b></td><td>Base de cálculo PIS/COFINS; alíquota e valor de PIS — Apuração Própria; alíquota e valor de COFINS — Apuração Própria.</td></tr>
        <tr><td><b>Retenções de PIS/COFINS</b></td><td>Alíquota e valor de PIS — Retido; alíquota e valor de COFINS — Retido; preenchimento vinculado ao tipo de retenção.</td></tr>
        <tr><td><b>CSLL</b></td><td>Base de cálculo, alíquota e valor, com exigência condicionada às regras de retenção aplicáveis.</td></tr>
        <tr><td><b>CP — Contribuição Previdenciária</b></td><td>Checkbox de habilitação, base de cálculo, alíquota e valor.</td></tr>
        <tr><td><b>IR — Imposto de Renda</b></td><td>Checkbox de habilitação, base de cálculo, alíquota e valor.</td></tr>
        <tr><td><b>Outras Retenções</b></td><td>Campo destinado ao valor de outras retenções.</td></tr>
      </tbody></table></div>
      <h3>Exemplo ilustrativo do print aprovado</h3><div class="help-table-wrap"><table class="help-table"><thead><tr><th>Tributo</th><th>Base</th><th>Alíquota</th><th>Valor</th></tr></thead><tbody>
        <tr><td>PIS</td><td>R$ 1.000,00</td><td>0,65%</td><td>R$ 6,50</td></tr>
        <tr><td>COFINS</td><td>R$ 1.000,00</td><td>3,00%</td><td>R$ 30,00</td></tr>
        <tr><td>CSLL</td><td>R$ 1.000,00</td><td>1,00%</td><td>R$ 10,00</td></tr>
        <tr><td>IR</td><td>R$ 1.000,00</td><td>1,50%</td><td>R$ 15,00</td></tr>
      </tbody></table></div>
      <h3>Salvar e validação</h3><ul class="help-bullets"><li>Manter apenas o botão <b>Salvar</b> no rodapé, com <b>X</b> no cabeçalho para fechar a janela.</li><li>Salvar os tributos associados ao registro/contrato correspondente.</li><li>Aplicar obrigatoriedades, dependências entre campos e cálculos conforme as regras do <b>portal da prefeitura</b> adotado na integração.</li><li>Não apresentar opção <b>Fechar</b> no rodapé.</li></ul>
      <div class="help-notice help-warning"><b>Pendente de homologação funcional:</b> o município/portal de referência, a lista completa dos combos, as exigências de preenchimento e os cálculos oficiais precisam ser confirmados. Os valores e opções deste protótipo são demonstrativos, não uma implementação tributária validada.</div>
    `
  },
  {
    id:'impostos', title:'Impostos', icon:'layers', kicker:'08 · Consulta tributária',
    subtitle:'Conferência dos tributos federais salvos por contrato.',
    html:`
      <h2>Janela Impostos</h2>
      <p>Ao lado de <b>Tributos Federais</b>, o botão <b>Impostos</b> abre uma tabela apenas para consulta. A lista considera o contrato selecionado e os valores efetivamente <b>salvos</b> no formulário de Tributos Federais durante a sessão.</p>
      <ul class="help-bullets"><li>Exibe PIS e COFINS de apuração própria, suas retenções quando configuradas, CSLL, IR, CP e outras retenções quando aplicáveis.</li><li>Exibe base de cálculo, alíquota e valor calculado demonstrativamente com base × alíquota / 100.</li><li>Colunas como Mod., S.T., desoneração e destaque ficam com <b>—</b> quando não se aplicam aos dados disponíveis, sem inventar informações de ICMS.</li><li>Sem tributos salvos, mostra um aviso em vez de criar valores fiscais fictícios.</li><li>Fechar a janela não altera os tributos; reabrir mostra a última configuração salva enquanto a página estiver carregada.</li></ul>
      <div class="help-notice help-warning">Essa visualização não realiza apuração oficial e não substitui o cálculo ou o leiaute exigidos pela prefeitura.</div>
    `
  },
  {
    id:'totals', title:'Totalizadores e rodapé', icon:'filter', kicker:'08 · Indicadores',
    subtitle:'O que soma cada indicador e como é calculado.',
    html:`
      <h2>Totalizadores no rodapé</h2><p>Os três primeiros indicadores mostram <b>quantidade de itens</b>. O quarto mostra <b>valor monetário da venda</b>.</p>
      <div class="help-card-grid help-total-grid">
        <div class="help-info-card"><h4>Total Selecionado (Item)</h4><p>Quantidade de itens correspondentes aos registros selecionados. Deve considerar a composição automática aplicável (por exemplo, o item 9), sem duplicidade.</p></div>
        <div class="help-info-card"><h4>Total a Emitir (Item)</h4><p>Quantidade de itens elegíveis à emissão da NFS-e, de acordo com os critérios de elegibilidade que deverão ser definidos com o desenvolvimento.</p></div>
        <div class="help-info-card"><h4>Total da Busca (Item)</h4><p>Quantidade de itens retornados pelos filtros da pesquisa, considerando o conjunto completo, não só a página visível.</p></div>
        <div class="help-info-card"><h4>Total (Valor Venda)</h4><p>Soma do campo Valor Venda dos registros abrangidos pela consulta, exibida em moeda brasileira (R$).</p></div>
      </div>
      <h3>Regras de consistência</h3><ul class="help-bullets"><li>O critério de contagem é <b>item</b>, e não simplesmente quantidade de linhas ou contratos.</li><li>Reaplicar os cálculos após filtros, seleção e inclusão automática de itens, conforme a finalidade de cada indicador.</li><li>Os totais devem refletir todo o conjunto filtrado, mesmo quando há várias páginas.</li><li>Evitar contar um mesmo item duas vezes ao incluir automaticamente o item 9.</li></ul>
      <div class="help-notice help-neutral"><b>Valores do protótipo:</b> os exemplos 32 itens a emitir, 416 itens na busca e R$ 78.018.029,38 representam dados de demonstração. A regra exata de elegibilidade do total a emitir e a abrangência monetária precisam ser confirmadas no backend.</div>
    `
  },
  {
    id:'removed', title:'O que foi removido', icon:'trash', kicker:'09 · Simplificação',
    subtitle:'Botões, combos e tipos de venda excluídos.',
    html:`
      <h2>Elementos retirados da tela NFS-e</h2><p>A interface deve ficar exclusiva para Nota Fiscal de Serviço, sem misturar ações pertinentes apenas à NF-e.</p>
      <h3>Botões removidos</h3><div class="help-chip-list"><span>Gerar Nota</span><span>Dados NF-e</span><span>Volumes</span><span>Mensagens</span><span>Gerar Devolução</span><span>Gerar Nota Avulsa</span><span>Logs Rece. Federal</span><span>CC-e</span><span>Aplicar Desconto</span><span>Alt. Cliente</span><span>Pré-visualizar DANFSe</span></div>
      <p><b>Observação:</b> o comando antigo <b>Gerar Nota</b> foi substituído no novo fluxo pelo botão específico <b>Gerar NFS-e</b>.</p>
      <h3>Combos removidos</h3><div class="help-chip-list"><span>Natureza da Operação</span><span>Entrada/Saída</span><span>Tipo Nota</span><span>Tipo de Contrato</span></div>
      <h3>Tipos de venda retirados da pesquisa</h3><div class="help-chip-list"><span>AT Com Custo</span><span>AT Sem Custo</span></div>
      <div class="help-notice"><b>Não regressão:</b> retirar comandos da <b>nova tela NFS-e</b> não deve remover ou alterar os recursos equivalentes onde continuam necessários, especialmente na tela atual de NF-e.</div>
    `
  },
  {
    id:'validation', title:'Integrações e aceite', icon:'check', kicker:'10 · Implementação',
    subtitle:'Origens, testes de aceite e decisões pendentes.',
    html:`
      <h2>Integrações previstas</h2><div class="help-table-wrap"><table class="help-table"><thead><tr><th>Módulo de origem</th><th>Informação consumida</th><th>Uso na NFS-e</th></tr></thead><tbody>
        <tr><td><b>Pós-Venda</b></td><td>Conclusão da montagem.</td><td>Coluna Data Término de Montagem e trava especial do Item 7.</td></tr>
        <tr><td><b>Gerenciamento de Contratos Futuros</b></td><td>Campo Término Lib.</td><td>Coluna Data Término Liberação Futura.</td></tr>
        <tr><td><b>Comercial &gt; Contratos Realizados</b></td><td>Situação e data/hora de finalização financeira.</td><td>Indicador Fin Processado e tooltip.</td></tr>
        <tr><td><b>Integração NFS-e / Prefeitura</b></td><td>Situação fiscal, campos e regras tributárias.</td><td>Emissão, consulta, cancelamento, tributos, documentos e retornos.</td></tr>
      </tbody></table></div>
      <h3>Critérios de aceite</h3><ol class="help-numbered">
        <li>Nova tela NFS-e independente, preservando a tela atual de NF-e.</li><li>Botões, filtros, tipos de venda e colunas conforme o mapeamento.</li>
        <li>Datas de montagem e liberação futura no formato <b>DD/MM/AAAA</b>, sem horário.</li><li>Fin Processado exibindo check/alerta e data/hora de finalização no tooltip.</li>
        <li>Itens selecionáveis individualmente, mesmo quando pertencem ao mesmo contrato.</li><li>Combo <b>Itens = 7</b>: seleção bloqueada quando a data de montagem está vazia.</li>
        <li>Combo diferente de 7: a trava especial de montagem não é aplicada.</li><li>Seleção 3 + 4 + 5 compõe 3 + 4 + 5 + 9 sem duplicidade.</li>
        <li>Gerar NFS-e apresenta seleção de itens seguida dos dados da emissão.</li><li>Tributos Federais abre com campos e dependências exigidos pelo portal da prefeitura.</li>
        <li>Salvar Tributos Federais mantém os dados vinculados ao registro.</li><li>Totalizadores consistentes com filtros, paginação e itens selecionados.</li>
        <li>Permissões e regras fiscais preexistentes preservadas.</li>
      </ol>
      <h3>Questões ainda abertas</h3><ul class="help-bullets"><li>Mapear tabelas/campos e relacionamentos SQL para as três novas colunas.</li><li>Validar seleção parcial dos itens 3, 4 e 5 e a remoção automática do item 9.</li><li>Definir mecanismos contra duplicidade de emissão em momentos distintos.</li><li>Definir critério exato de <b>Total a Emitir</b> e abrangência de <b>Valor Venda</b>.</li><li>Validar aplicabilidade do botão <b>Inutilizar Número</b> para NFS-e.</li><li>Confirmar portal municipal, combos, regras de retenção, obrigatoriedades e cálculos oficiais.</li><li>Definir persistência e recuperação dos tributos e permissões de alteração.</li></ul>
    `
  },
  {
    id:'demo', title:'Protótipo x produção', icon:'alert', kicker:'11 · Apresentação',
    subtitle:'O que já funciona e o que é demonstrativo.',
    html:`
      <h2>O que esta demonstração representa</h2><p>O protótipo foi construído para validar o fluxo funcional e a proposta visual com a equipe, incluindo a apresentação à Carla.</p>
      <div class="help-two-cols"><div class="help-info-card"><h4>Disponível nesta versão</h4><ul class="help-bullets"><li>Busca, filtros e seleção de contratos.</li><li>Janela Gerar NFS-e em duas etapas.</li><li>Inclusão automática do item 9.</li><li>Exceção do Item 7.</li><li>Tributos Federais com Salvar local e Impostos em leitura.</li><li>Filtro FIN e edição de percentuais e valores por item.</li><li>Histórico, DANFSe e outras ações ilustrativas.</li><li>Manual funcional integrado à Ajuda.</li></ul></div><div class="help-info-card"><h4>Não integrado</h4><ul class="help-bullets"><li>Banco de dados e autenticação do eFinance.</li><li>Consultas reais aos módulos de origem.</li><li>Emissão, autorização e cancelamento fiscal.</li><li>APIs municipais/nacionais e TecnoSpeed.</li><li>Regras tributárias homologadas.</li><li>Envio de e-mails e documentos oficiais.</li><li>Persistência permanente dos tributos.</li></ul></div></div>
      <h3>Roteiro sugerido para a apresentação</h3><ol class="help-numbered"><li>Apresentar os filtros, as novas colunas e as quatro somatórias.</li><li>Selecionar um contrato e abrir <b>Gerar NFS-e</b>.</li><li>Demonstrar a seleção 3 + 4 + 5 e a inclusão automática do 9.</li><li>Avançar até o formulário de emissão e conferir Emitente, códigos e Item NBS.</li><li>Na barra principal, abrir <b>Tributos Federais</b>.</li><li>Mostrar os combos, retenções e <b>Salvar</b>. Depois abrir <b>Impostos</b> e confirmar os mesmos valores salvos.</li><li>Voltar à listagem, selecionar o <b>Item 7</b> e mostrar o bloqueio quando a montagem está vazia.</li><li>Abrir <b>Ajuda</b> para revisar decisões aprovadas e pendências.</li></ol>
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
  root.innerHTML=state.modal==='generation'?generationModal():state.modal==='tax'?taxModal():state.modal==='impostos'?impostosModal():state.modal==='help'?helpModal():simpleModal();
  const close=root.querySelector('.modal-close');if(close)close.focus({preventScroll:true});
}
function saveTaxes(){
  const t=taxForActive();
  if(['base','pis','cofins','pisRet','cofinsRet','csllBase','csllRate','cpBase','cpRate','irBase','irRate','other'].some(k=>!Number.isFinite(t[k])||t[k]<0)){toast('Preencha valores válidos e não negativos.','error');return;}
  const row=activeRow();state.taxes[row.id]={...t};closeModal();toast(`Tributos Federais salvos no protótipo para o contrato ${row.contract||row.code}.`);
}
function modalAction(action){
 if(action==='close'){closeModal();return;}
 if(action==='tab-items'){state.step=1;renderModal();return;}
 if(action==='tab-data'){if(selectedItemIds().size){state.step=2;renderModal();}else toast('Selecione ao menos um item.','warning');return;}
 if(action==='next'){if(!selectedItemIds().size){toast('Selecione ao menos um item para continuar.','warning');return;}state.step=2;renderModal();return;}
 if(action==='save-taxes'){saveTaxes();return;}
 if(action==='confirm-generation'){
   if(!state.genForm.emitter){toast('Selecione o Emitente para continuar.','warning');$('gen-emitter').focus();return;}
   if(!state.genForm.ibscbs||!state.genForm.service||!state.genForm.iss||!state.genForm.nbs||!state.genForm.date){toast('Preencha IBS/CBS, Cód. Serviço NFS-e, Tipo Trib. ISS, Item NBS e a data de emissão.','warning');return;}
   const r=activeRow();r.sentItems=[...selectedItemIds()].sort((a,b)=>a-b).map(id=>String(id).padStart(2,'0'));
   r.generatedItems=itemCatalog.map(getItemValue).filter(i=>selectedItemIds().has(i.id)).map(i=>({id:i.id,pct:i.pct,value:i.value}));
   r.generationParameters={...state.genForm};
   r.status='Nao Gerada';closeModal();renderTable();toast(`NFS-e preparada para demonstração: itens ${r.sentItems.join(', ')}. Nenhuma nota foi transmitida.`);return;
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
  if(id===9&&autoItem9())return;
  if(checked)state.itemSelection.add(id);else state.itemSelection.delete(id);
  renderModal();
}
function onGlobalAction(action,el){
  switch(action){
    case 'selected':state.selectedOnly=!state.selectedOnly;state.page=1;renderTable();return;
    case 'generate':demoTarget(true);state.itemSelection=new Set([3,4,5]);state.step=1;openModal('generation');return;
    case 'tax':demoTarget(false);openModal('tax');return;
    case 'impostos':demoTarget(false);openModal('impostos');return;
    case 'transmit':toast('Transmitir: ação demonstrativa, sem comunicação com a prefeitura.','warning');return;
    case 'resend':toast('Reenvio de NFS-e e XML: simulado; nenhum e-mail foi enviado.','warning');return;
    case 'refresh':renderTable();toast('Consulta da listagem atualizada localmente.');return;
    case 'cancel':{
      const selected=rows.filter(r=>state.selected.has(r.id));if(!selected.length){toast('Selecione um contrato para simular o cancelamento.','warning');return;}
      if(window.confirm(`Simular cancelamento de ${selected.length} registro(s)? Esta ação afeta apenas o protótipo.`)){
        selected.forEach(r=>r.status='Cancelada');state.selected.clear();renderTable();toast('Cancelamento simulado. Nenhuma nota real foi cancelada.');
      }return;}
    case 'remove':{
      if(!state.selected.size){toast('Selecione um contrato para excluir na demonstração.','warning');return;}
      if(window.confirm('Excluir os registros selecionados apenas deste protótipo?')){
        const keep=rows.filter(r=>!state.selected.has(r.id));rows.splice(0,rows.length,...keep);state.selected.clear();renderTable();toast('Registros removidos da visualização local.');
      }return;}
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
     let blocked=0;list.forEach(r=>{if(isRowLocked(r)){blocked++;return;}if(el.checked)state.selected.add(r.id);else state.selected.delete(r.id);});renderTable();if(blocked&&state.filterItem==='7')toast(`${blocked} registro(s) sem montagem concluída não puderam ser selecionados.`,'warning');return;
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
   if(el.id==='item-filter'){state.filterItem=el.value;resetSelectionOnItemChange();}
   if(el.id==='search-type')state.searchType=el.value;
   if(el.id==='start-date')state.searchStart=el.value;
   if(el.id==='end-date')state.searchEnd=el.value;
   if(el.id==='date-field')state.searchField=el.value;
   if(el.id==='periodo')state.period=el.value;
   if(['loja','status','fin-filter','item-filter'].includes(el.id)){state.page=1;renderTable();}
 });
 $('search-input').addEventListener('input',e=>{state.search=e.target.value.trim();state.page=1;renderTable()});
 $('search-input').addEventListener('keydown',e=>{if(e.key==='Enter'){state.page=1;renderTable();}});
 document.addEventListener('input',e=>{if(e.target.id==='help-search'){searchHelp(e.target.value);return;}if(e.target.matches('[data-gen-field]')&&e.target.tagName==='TEXTAREA')state.genForm[e.target.dataset.genField]=e.target.value;});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&state.modal)closeModal();});
}
applyIcons();bindEvents();renderTable();


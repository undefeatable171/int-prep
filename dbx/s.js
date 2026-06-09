
let active = "All";
 
function renderNodes(nodes, path) {
  return nodes.map((n, i) => {
    const id = `${path}-${i}`;
    return `
      <div class="node">
        <div class="node-q" onclick="event.stopPropagation();toggleNode('${id}')">↳ ${n.q}</div>
        <div class="node-a" id="node-${id}">
          ${n.a}
          ${n.children.length ? renderNodes(n.children, id) : ''}
        </div>
      </div>
    `;
  }).join('');
}

function render() {
  const tabsEl = document.getElementById('tabs');
  tabsEl.innerHTML = cats.map(c =>
    `<button class="cat-tab${c===active?' active':''}" onclick="setcat('${c}')">${c}</button>`
  ).join('');

  const filtered = active==="All" ? qs : qs.filter(q=>q.cat===active);

  const el = document.getElementById('qlist');
  el.innerHTML = filtered.map((q,i)=>{
    const idx = qs.indexOf(q);
    return `
    <div class="q-card" onclick="toggle(${idx})">
      <div class="q-header">
        <span class="q-text">${i+1}. ${q.q}</span>
        <span class="q-arrow">▶</span>
      </div>
      <div class="q-body">
        <div class="answer">${q.answer}</div>
	<div class="tip-box">${q.tip}</div>
	
        ${renderNodes(q.children, idx)}
      </div>
    </div>`;
  }).join('');
  Prism.highlightAll();
}


function setcat(c){ active=c; render(); }

function toggle(i){ document.getElementsByClassName('q-card')[i].classList.toggle('open'); }

function toggleNode(id){
  const el = document.getElementById(`node-${id}`);
  el.style.display = el.style.display==='block' ? 'none' : 'block';
}

render();

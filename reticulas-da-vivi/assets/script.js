async function loadData() {
  const r = await fetch("data/reticulas.json");
  return await r.json();
}

async function loadList() {
  const data = await loadData();
  const box = document.getElementById("list");

  data.forEach(item => {
    box.innerHTML += `
      <a class="card" href="item.html?id=${item.id}">
        <h2>${item.nome}</h2>
        <p>${item.descricao}</p>
      </a>
    `;
  });
}

async function loadItem() {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  const data = await loadData();
  const item = data.find(x => x.id == id);

  if (!item) {
    document.getElementById("itemBox").innerHTML = "Item não encontrado";
    return;
  }

  document.getElementById("itemBox").innerHTML = `
    <h1>${item.nome}</h1>
    <p>${item.descricao}</p>

    <textarea id="cod">${item.codigo}</textarea>

    <button onclick="copiar()">Copiar código</button>
  `;
}

function copiar() {
  let campo = document.getElementById("cod");
  navigator.clipboard.writeText(campo.value);
  alert("Copiado!");
}

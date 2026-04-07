const API = "http://localhost:8080";

/* =========================
   LOGIN ADMINISTRATIVO
========================= */

function fazerLogin() {
  const usuario = document.getElementById("usuarioAdmin").value;
  const senha = document.getElementById("senhaAdmin").value;
  const mensagem = document.getElementById("mensagemLogin");

  if (usuario === "admin" && senha === "admin@123") {
    localStorage.setItem("logadoAdmin", "true");
    window.location.href = "admin.html";
  } else {
    mensagem.innerText = "Usuário ou senha inválidos.";
  }
}

function verificarLogin() {
  const logado = localStorage.getItem("logadoAdmin");

  if (logado !== "true") {
    window.location.href = "login.html";
  }
}

function logout() {
  localStorage.removeItem("logadoAdmin");
  window.location.href = "login.html";
}


/* =========================
   CLIENTES
========================= */

function limparFormularioCliente() {
  document.getElementById("clienteId").value = "";
  document.getElementById("nomeCliente").value = "";
  document.getElementById("cpfCliente").value = "";
  document.getElementById("dataNascimentoCliente").value = "";
  document.getElementById("idiomaCliente").value = "";
  document.getElementById("enderecoCliente").value = "";
  document.getElementById("bairroCliente").value = "";
  document.getElementById("cidadeCliente").value = "";
  document.getElementById("telefoneCliente").value = "";
  document.getElementById("emailCliente").value = "";
  document.getElementById("mensagemCliente").innerText = "";
}

function salvarCliente() {
  const id = document.getElementById("clienteId").value;

  const cliente = {
    nome: document.getElementById("nomeCliente").value,
    cpf: document.getElementById("cpfCliente").value,
    dataNascimento: document.getElementById("dataNascimentoCliente").value,
    idioma: document.getElementById("idiomaCliente").value,
    endereco: document.getElementById("enderecoCliente").value,
    bairro: document.getElementById("bairroCliente").value,
    cidade: document.getElementById("cidadeCliente").value,
    telefone: document.getElementById("telefoneCliente").value,
    email: document.getElementById("emailCliente").value
  };

  const metodo = id ? "PUT" : "POST";
  const url = id ? `${API}/clientes/${id}` : `${API}/clientes`;

  fetch(url, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente)
  })
    .then(response => response.json())
    .then(() => {
      document.getElementById("mensagemCliente").innerText = id
        ? "Cliente atualizado com sucesso!"
        : "Cliente cadastrado com sucesso!";
      limparFormularioCliente();
      listarClientes();
    })
    .catch(() => {
      document.getElementById("mensagemCliente").innerText = "Erro ao salvar cliente.";
    });
}

function listarClientes() {
  const tabela = document.getElementById("tabelaClientes");
  if (!tabela) return;

  fetch(`${API}/clientes`)
    .then(response => response.json())
    .then(clientes => {
      tabela.innerHTML = "";

      clientes.forEach(cliente => {
        tabela.innerHTML += `
          <tr>
            <td>${cliente.id ?? ""}</td>
            <td>${cliente.nome ?? ""}</td>
            <td>${cliente.cpf ?? ""}</td>
            <td>${cliente.cidade ?? ""}</td>
            <td>${cliente.telefone ?? ""}</td>
            <td>${cliente.email ?? ""}</td>
            <td>
              <button class="btn-tabela" onclick="editarCliente(${cliente.id})">Editar</button>
              <button class="btn-tabela btn-excluir" onclick="excluirCliente(${cliente.id})">Excluir</button>
            </td>
          </tr>
        `;
      });
    });
}

function buscarClientePorId() {
  const id = document.getElementById("buscarClienteId").value;
  if (!id) return;

  fetch(`${API}/clientes/${id}`)
    .then(response => response.json())
    .then(cliente => {
      const tabela = document.getElementById("tabelaClientes");
      tabela.innerHTML = `
        <tr>
          <td>${cliente.id ?? ""}</td>
          <td>${cliente.nome ?? ""}</td>
          <td>${cliente.cpf ?? ""}</td>
          <td>${cliente.cidade ?? ""}</td>
          <td>${cliente.telefone ?? ""}</td>
          <td>${cliente.email ?? ""}</td>
          <td>
            <button class="btn-tabela" onclick="editarCliente(${cliente.id})">Editar</button>
            <button class="btn-tabela btn-excluir" onclick="excluirCliente(${cliente.id})">Excluir</button>
          </td>
        </tr>
      `;
    })
    .catch(() => {
      document.getElementById("mensagemCliente").innerText = "Cliente não encontrado.";
    });
}

function buscarClientePorNome() {
  const nome = document.getElementById("buscarClienteNome").value;
  if (!nome) return;

  fetch(`${API}/clientes/buscar/${nome}`)
    .then(response => response.json())
    .then(clientes => {
      const tabela = document.getElementById("tabelaClientes");
      tabela.innerHTML = "";

      clientes.forEach(cliente => {
        tabela.innerHTML += `
          <tr>
            <td>${cliente.id ?? ""}</td>
            <td>${cliente.nome ?? ""}</td>
            <td>${cliente.cpf ?? ""}</td>
            <td>${cliente.cidade ?? ""}</td>
            <td>${cliente.telefone ?? ""}</td>
            <td>${cliente.email ?? ""}</td>
            <td>
              <button class="btn-tabela" onclick="editarCliente(${cliente.id})">Editar</button>
              <button class="btn-tabela btn-excluir" onclick="excluirCliente(${cliente.id})">Excluir</button>
            </td>
          </tr>
        `;
      });
    });
}

function editarCliente(id) {
  fetch(`${API}/clientes/${id}`)
    .then(response => response.json())
    .then(cliente => {
      document.getElementById("clienteId").value = cliente.id ?? "";
      document.getElementById("nomeCliente").value = cliente.nome ?? "";
      document.getElementById("cpfCliente").value = cliente.cpf ?? "";
      document.getElementById("dataNascimentoCliente").value = cliente.dataNascimento ?? "";
      document.getElementById("idiomaCliente").value = cliente.idioma ?? "";
      document.getElementById("enderecoCliente").value = cliente.endereco ?? "";
      document.getElementById("bairroCliente").value = cliente.bairro ?? "";
      document.getElementById("cidadeCliente").value = cliente.cidade ?? "";
      document.getElementById("telefoneCliente").value = cliente.telefone ?? "";
      document.getElementById("emailCliente").value = cliente.email ?? "";
    });
}

function excluirCliente(id) {
  if (!confirm("Deseja realmente excluir este cliente?")) return;

  fetch(`${API}/clientes/${id}`, { method: "DELETE" })
    .then(() => listarClientes())
    .catch(() => alert("Erro ao excluir cliente."));
}

/* =========================
   PASSEIOS
========================= */

function limparFormularioPasseio() {
  document.getElementById("passeioId").value = "";
  document.getElementById("nomePasseio").value = "";
  document.getElementById("descricaoPasseio").value = "";
  document.getElementById("localPasseio").value = "";
  document.getElementById("cidadePasseio").value = "";
  document.getElementById("tipoPasseio").value = "";
  document.getElementById("guiaPasseio").value = "";
  document.getElementById("dataInicioPasseio").value = "";
  document.getElementById("dataFimPasseio").value = "";
  document.getElementById("horarioInicioPasseio").value = "";
  document.getElementById("horarioFimPasseio").value = "";
  document.getElementById("precoAdultoPasseio").value = "";
  document.getElementById("precoCriancaPasseio").value = "";
  document.getElementById("destaquePasseio").value = "true";
  document.getElementById("mensagemPasseio").innerText = "";
}

function salvarPasseio() {
  const id = document.getElementById("passeioId").value;

  const passeio = {
    nomePasseio: document.getElementById("nomePasseio").value,
    descricao: document.getElementById("descricaoPasseio").value,
    localPasseio: document.getElementById("localPasseio").value,
    cidade: document.getElementById("cidadePasseio").value,
    tipo: document.getElementById("tipoPasseio").value,
    guia: document.getElementById("guiaPasseio").value,
    dataInicio: document.getElementById("dataInicioPasseio").value,
    dataFim: document.getElementById("dataFimPasseio").value,
    horarioInicio: document.getElementById("horarioInicioPasseio").value,
    horarioFim: document.getElementById("horarioFimPasseio").value,
    precoAdulto: document.getElementById("precoAdultoPasseio").value,
    precoCrianca: document.getElementById("precoCriancaPasseio").value,
    destaque: document.getElementById("destaquePasseio").value === "true"
  };

  const metodo = id ? "PUT" : "POST";
  const url = id ? `${API}/passeios/${id}` : `${API}/passeios`;

  fetch(url, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(passeio)
  })
    .then(response => response.json())
    .then(() => {
      document.getElementById("mensagemPasseio").innerText = id
        ? "Passeio atualizado com sucesso!"
        : "Passeio cadastrado com sucesso!";
      limparFormularioPasseio();
      listarPasseios();
    })
    .catch(() => {
      document.getElementById("mensagemPasseio").innerText = "Erro ao salvar passeio.";
    });
}

function listarPasseios() {
  const tabela = document.getElementById("tabelaPasseios");
  if (!tabela) return;

  fetch(`${API}/passeios`)
    .then(response => response.json())
    .then(passeios => {
      tabela.innerHTML = "";

      passeios.forEach(passeio => {
        tabela.innerHTML += `
          <tr>
            <td>${passeio.id ?? ""}</td>
            <td>${passeio.nomePasseio ?? ""}</td>
            <td>${passeio.cidade ?? ""}</td>
            <td>${passeio.tipo ?? ""}</td>
            <td>${passeio.guia ?? ""}</td>
            <td>R$ ${passeio.precoAdulto ?? ""}</td>
            <td>${passeio.destaque ? "Sim" : "Não"}</td>
            <td>
              <button class="btn-tabela" onclick="editarPasseio(${passeio.id})">Editar</button>
              <button class="btn-tabela btn-excluir" onclick="excluirPasseio(${passeio.id})">Excluir</button>
            </td>
          </tr>
        `;
      });
    });
}

function buscarPasseioPorId() {
  const id = document.getElementById("buscarPasseioId").value;
  if (!id) return;

  fetch(`${API}/passeios/${id}`)
    .then(response => response.json())
    .then(passeio => {
      const tabela = document.getElementById("tabelaPasseios");
      tabela.innerHTML = `
        <tr>
          <td>${passeio.id ?? ""}</td>
          <td>${passeio.nomePasseio ?? ""}</td>
          <td>${passeio.cidade ?? ""}</td>
          <td>${passeio.tipo ?? ""}</td>
          <td>${passeio.guia ?? ""}</td>
          <td>R$ ${passeio.precoAdulto ?? ""}</td>
          <td>${passeio.destaque ? "Sim" : "Não"}</td>
          <td>
            <button class="btn-tabela" onclick="editarPasseio(${passeio.id})">Editar</button>
            <button class="btn-tabela btn-excluir" onclick="excluirPasseio(${passeio.id})">Excluir</button>
          </td>
        </tr>
      `;
    })
    .catch(() => {
      document.getElementById("mensagemPasseio").innerText = "Passeio não encontrado.";
    });
}

function buscarPasseioPorNome() {
  const nome = document.getElementById("buscarPasseioNome").value;
  if (!nome) return;

  fetch(`${API}/passeios/buscar/nome/${nome}`)
    .then(response => response.json())
    .then(passeios => {
      const tabela = document.getElementById("tabelaPasseios");
      tabela.innerHTML = "";

      passeios.forEach(passeio => {
        tabela.innerHTML += `
          <tr>
            <td>${passeio.id ?? ""}</td>
            <td>${passeio.nomePasseio ?? ""}</td>
            <td>${passeio.cidade ?? ""}</td>
            <td>${passeio.tipo ?? ""}</td>
            <td>${passeio.guia ?? ""}</td>
            <td>R$ ${passeio.precoAdulto ?? ""}</td>
            <td>${passeio.destaque ? "Sim" : "Não"}</td>
            <td>
              <button class="btn-tabela" onclick="editarPasseio(${passeio.id})">Editar</button>
              <button class="btn-tabela btn-excluir" onclick="excluirPasseio(${passeio.id})">Excluir</button>
            </td>
          </tr>
        `;
      });
    });
}

function editarPasseio(id) {
  fetch(`${API}/passeios/${id}`)
    .then(response => response.json())
    .then(passeio => {
      document.getElementById("passeioId").value = passeio.id ?? "";
      document.getElementById("nomePasseio").value = passeio.nomePasseio ?? "";
      document.getElementById("descricaoPasseio").value = passeio.descricao ?? "";
      document.getElementById("localPasseio").value = passeio.localPasseio ?? "";
      document.getElementById("cidadePasseio").value = passeio.cidade ?? "";
      document.getElementById("tipoPasseio").value = passeio.tipo ?? "";
      document.getElementById("guiaPasseio").value = passeio.guia ?? "";
      document.getElementById("dataInicioPasseio").value = passeio.dataInicio ?? "";
      document.getElementById("dataFimPasseio").value = passeio.dataFim ?? "";
      document.getElementById("horarioInicioPasseio").value = passeio.horarioInicio ?? "";
      document.getElementById("horarioFimPasseio").value = passeio.horarioFim ?? "";
      document.getElementById("precoAdultoPasseio").value = passeio.precoAdulto ?? "";
      document.getElementById("precoCriancaPasseio").value = passeio.precoCrianca ?? "";
      document.getElementById("destaquePasseio").value = String(passeio.destaque);
    });
}

function excluirPasseio(id) {
  if (!confirm("Deseja realmente excluir este passeio?")) return;

  fetch(`${API}/passeios/${id}`, { method: "DELETE" })
    .then(() => listarPasseios())
    .catch(() => alert("Erro ao excluir passeio."));
}

/* =========================
   VENDAS
========================= */

function limparFormularioVenda() {
  document.getElementById("vendaId").value = "";
  document.getElementById("dataVenda").value = "";
  document.getElementById("quantidadeVenda").value = "";
  document.getElementById("tipoIngressoVenda").value = "ADULTO";
  document.getElementById("valorTotalVenda").value = "";
  document.getElementById("statusPagamentoVenda").value = "PENDENTE";
  document.getElementById("clienteIdVenda").value = "";
  document.getElementById("passeioIdVenda").value = "";
  document.getElementById("mensagemVenda").innerText = "";
}

function salvarVenda() {
  const id = document.getElementById("vendaId").value;

  const venda = {
    dataVenda: document.getElementById("dataVenda").value,
    quantidade: parseInt(document.getElementById("quantidadeVenda").value),
    tipoIngresso: document.getElementById("tipoIngressoVenda").value,
    valorTotal: parseFloat(document.getElementById("valorTotalVenda").value),
    statusPagamento: document.getElementById("statusPagamentoVenda").value,
    cliente: {
      id: parseInt(document.getElementById("clienteIdVenda").value)
    },
    passeio: {
      id: parseInt(document.getElementById("passeioIdVenda").value)
    }
  };

  const metodo = id ? "PUT" : "POST";
  const url = id ? `${API}/vendas/${id}` : `${API}/vendas`;

  fetch(url, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(venda)
  })
    .then(response => response.json())
    .then(() => {
      document.getElementById("mensagemVenda").innerText = id
        ? "Venda atualizada com sucesso!"
        : "Venda cadastrada com sucesso!";
      limparFormularioVenda();
      listarVendas();
    })
    .catch(() => {
      document.getElementById("mensagemVenda").innerText = "Erro ao salvar venda.";
    });
}

function listarVendas() {
  const tabela = document.getElementById("tabelaVendas");
  if (!tabela) return;

  fetch(`${API}/vendas`)
    .then(response => response.json())
    .then(vendas => {
      tabela.innerHTML = "";

      vendas.forEach(venda => {
        tabela.innerHTML += `
          <tr>
            <td>${venda.id ?? ""}</td>
            <td>${venda.dataVenda ?? ""}</td>
            <td>${venda.quantidade ?? ""}</td>
            <td>${venda.tipoIngresso ?? ""}</td>
            <td>R$ ${venda.valorTotal ?? ""}</td>
            <td>${venda.statusPagamento ?? ""}</td>
            <td>${venda.cliente?.id ?? ""}</td>
            <td>${venda.passeio?.id ?? ""}</td>
            <td>
              <button class="btn-tabela" onclick="editarVenda(${venda.id})">Editar</button>
              <button class="btn-tabela btn-excluir" onclick="excluirVenda(${venda.id})">Excluir</button>
            </td>
          </tr>
        `;
      });
    });
}

function buscarVendaPorId() {
  const id = document.getElementById("buscarVendaId").value;
  if (!id) return;

  fetch(`${API}/vendas/${id}`)
    .then(response => response.json())
    .then(venda => {
      const tabela = document.getElementById("tabelaVendas");
      tabela.innerHTML = `
        <tr>
          <td>${venda.id ?? ""}</td>
          <td>${venda.dataVenda ?? ""}</td>
          <td>${venda.quantidade ?? ""}</td>
          <td>${venda.tipoIngresso ?? ""}</td>
          <td>R$ ${venda.valorTotal ?? ""}</td>
          <td>${venda.statusPagamento ?? ""}</td>
          <td>${venda.cliente?.id ?? ""}</td>
          <td>${venda.passeio?.id ?? ""}</td>
          <td>
            <button class="btn-tabela" onclick="editarVenda(${venda.id})">Editar</button>
            <button class="btn-tabela btn-excluir" onclick="excluirVenda(${venda.id})">Excluir</button>
          </td>
        </tr>
      `;
    })
    .catch(() => {
      document.getElementById("mensagemVenda").innerText = "Venda não encontrada.";
    });
}

function buscarVendaPorStatus() {
  const status = document.getElementById("buscarVendaStatus").value;
  if (!status) return;

  fetch(`${API}/vendas/buscar/status/${status}`)
    .then(response => response.json())
    .then(vendas => {
      const tabela = document.getElementById("tabelaVendas");
      tabela.innerHTML = "";

      vendas.forEach(venda => {
        tabela.innerHTML += `
          <tr>
            <td>${venda.id ?? ""}</td>
            <td>${venda.dataVenda ?? ""}</td>
            <td>${venda.quantidade ?? ""}</td>
            <td>${venda.tipoIngresso ?? ""}</td>
            <td>R$ ${venda.valorTotal ?? ""}</td>
            <td>${venda.statusPagamento ?? ""}</td>
            <td>${venda.cliente?.id ?? ""}</td>
            <td>${venda.passeio?.id ?? ""}</td>
            <td>
              <button class="btn-tabela" onclick="editarVenda(${venda.id})">Editar</button>
              <button class="btn-tabela btn-excluir" onclick="excluirVenda(${venda.id})">Excluir</button>
            </td>
          </tr>
        `;
      });
    });
}

function editarVenda(id) {
  fetch(`${API}/vendas/${id}`)
    .then(response => response.json())
    .then(venda => {
      document.getElementById("vendaId").value = venda.id ?? "";
      document.getElementById("dataVenda").value = venda.dataVenda ?? "";
      document.getElementById("quantidadeVenda").value = venda.quantidade ?? "";
      document.getElementById("tipoIngressoVenda").value = venda.tipoIngresso ?? "ADULTO";
      document.getElementById("valorTotalVenda").value = venda.valorTotal ?? "";
      document.getElementById("statusPagamentoVenda").value = venda.statusPagamento ?? "PENDENTE";
      document.getElementById("clienteIdVenda").value = venda.cliente?.id ?? "";
      document.getElementById("passeioIdVenda").value = venda.passeio?.id ?? "";
    });
}

function excluirVenda(id) {
  if (!confirm("Deseja realmente excluir esta venda?")) return;

  fetch(`${API}/vendas/${id}`, { method: "DELETE" })
    .then(() => listarVendas())
    .catch(() => alert("Erro ao excluir venda."));
}
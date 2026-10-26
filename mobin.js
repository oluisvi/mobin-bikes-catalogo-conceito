(() => {
  var product = {
    id: "ouxi-q8",
    name: "OUXI Q8",
    label: "FAT BIKE ELÉTRICA",
    facts: [["Motor", "1.000 W"], ["Autonomia anunciada", "até 50 km"], ["Marchas", "Shimano · 7"], ["Pneus", "Fat · 20 × 4 pol."]],
    description: "O anúncio consultado apresenta a OUXI Q8 com motor de 1.000 W, autonomia anunciada de até 50 km e câmbio Shimano de 7 marchas. Versão, condições, preço e disponibilidade precisam ser confirmados diretamente com a Mobin."
  };
  var bikeSvg = '<svg viewBox="0 0 640 340" role="img" aria-label="Ilustração conceitual de uma fat bike elétrica"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="150" cy="240" r="67" stroke-width="20"/><circle cx="490" cy="240" r="67" stroke-width="20"/><path d="M150 240 238 130l92 110H150l95-64 63-107h82l58 107H333" stroke-width="12"/><path d="M300 115h63M246 127l-42-18M480 178h38M240 128l-22-35M321 240l33-58" stroke-width="11"/><path d="M350 145c23-26 63-35 89-10l18 36h-98z" fill="currentColor" opacity=".18" stroke-width="8"/><path d="M302 98h40" stroke-width="13"/></g></svg>';
  var $ = function(s, r) { return (r || document).querySelector(s); };
  var $$ = function(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var wa = "https://wa.me/5527998598570";
  var inquiry = function(t) { return wa + "?text=" + encodeURIComponent(t); };
  var selected = false, saved = false, timer;

  function toast(message) {
    var node = $("#toast");
    node.textContent = message;
    node.classList.add("show");
    clearTimeout(timer);
    timer = setTimeout(function() { node.classList.remove("show"); }, 2500);
  }

  function renderCard() {
    var query = $("#catalogSearch").value.trim().toLocaleLowerCase("pt-BR");
    var matches = !query || (product.name + " " + product.label + " fat bike elétrica").toLocaleLowerCase("pt-BR").includes(query);
    $("#filterCount").textContent = matches ? "1 MODELO NO ANÚNCIO" : "0 MODELOS";
    if (!matches) {
      $("#catalog").innerHTML = '<p class="empty-state">Não encontrei esse termo no modelo disponível neste conceito.</p>';
      return;
    }
    var facts = product.facts.map(function(pair) {
      return '<div class="spec"><span>' + pair[0] + '</span><strong>' + pair[1] + '</strong></div>';
    }).join("");
    $("#catalog").innerHTML = '<article class="card reveal" data-id="' + product.id + '">' +
      '<div class="card-media concept-bike">' + bikeSvg + '<span class="card-topline">FICHA DE ANÚNCIO / VALIDAR</span></div>' +
      '<div class="card-meta"><span class="tag">MOBIN / ' + product.label + '</span><button class="heart ' + (saved ? "saved" : "") + '" id="saveModel" aria-label="' + (saved ? "Remover modelo salvo" : "Salvar modelo") + '" aria-pressed="' + saved + '">' + (saved ? "♥" : "♡") + '</button></div>' +
      '<div class="card-info"><div><h3>' + product.name + '</h3><div class="subtitle">Uma opção anunciada pela loja</div></div><div class="price">Consultar</div></div>' +
      '<div class="specs">' + facts + '</div>' +
      '<div class="card-foot"><button class="inspect" id="detailsBtn">Ver detalhes <span>↗</span></button><button class="card-cta" id="selectBtn">' + (selected ? "Selecionada ✓" : "Adicionar") + '</button></div></article>';
    $("#saveModel").addEventListener("click", function() { saved = !saved; renderCard(); toast(saved ? "Modelo salvo" : "Modelo removido dos salvos"); });
    $("#detailsBtn").addEventListener("click", openDetails);
    $("#selectBtn").addEventListener("click", function() { selected = !selected; paintSelection(); renderCard(); toast(selected ? "Adicionado à sua seleção" : "Removido da sua seleção"); });
  }

  function paintSelection() {
    $("#bagCount").textContent = selected ? "1" : "0";
    $("#cartTotalCount").textContent = selected ? "(1)" : "(0)";
    $("#cartItems").innerHTML = selected
      ? '<div class="drawer-basket"><strong>' + product.name + '</strong><small>' + product.label + ' · preço e disponibilidade sob consulta</small><button class="remove-selection" id="removeSelection">Remover</button></div>'
      : '<p class="drawer-note">Sua seleção está vazia. Explore o modelo e adicione-o para consultar com a equipe.</p>';
    $("#cartContact").href = inquiry(selected ? "Olá, Mobin! Tenho interesse na OUXI Q8. Podem confirmar versão, preço e disponibilidade?" : "Olá, Mobin! Quero conhecer as bikes elétricas disponíveis.");
    $("#removeSelection")?.addEventListener("click", function() { selected = false; paintSelection(); renderCard(); });
  }

  function openDetails() {
    var facts = product.facts.map(function(pair) { return "<div>" + pair[0] + "<b>" + pair[1] + "</b></div>"; }).join("");
    $("#modalContent").innerHTML = '<div class="modal-grid"><div class="modal-bike concept-bike">' + bikeSvg + '</div><div><span class="eyebrow">MOBIN / ' + product.label + '</span><h2 id="modalTitle">' + product.name + '</h2><p>' + product.description + '</p><div class="modal-specs">' + facts + '<div>Preço<b>Sob consulta</b></div><div>Disponibilidade<b>Confirme com a loja</b></div></div><p class="fine">Dados transcritos de anúncio público da loja e sujeitos a validação. Autonomia e desempenho variam conforme uso e condições do trajeto.</p><a class="product-source" href="' + inquiry("Olá, Mobin! Quero confirmar os detalhes da OUXI Q8.") + '" target="_blank" rel="noreferrer">Perguntar sobre a OUXI Q8 ↗</a><button class="primary modal-add" id="modalSelect">' + (selected ? "Remover da seleção" : "Adicionar à seleção") + ' ↗</button></div></div>';
    $("#modalBack").classList.add("open");
    $("#modalBack").setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    $("#modalClose").focus();
    $("#modalSelect").addEventListener("click", function() {
      selected = !selected;
      paintSelection();
      renderCard();
      closeModal();
      if (selected) openDrawer();
    });
  }

  function closeModal() {
    $("#modalBack").classList.remove("open");
    $("#modalBack").setAttribute("aria-hidden", "true");
    if (!$("#cartPanel").classList.contains("open")) document.body.classList.remove("no-scroll");
  }
  function openDrawer() {
    $("#cartPanel").classList.add("open");
    $("#scrim").classList.add("on");
    $("#cartPanel").setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    $("#cartClose").focus();
  }
  function closeDrawer() {
    $("#cartPanel").classList.remove("open");
    $("#scrim").classList.remove("on");
    $("#cartPanel").setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }
  function setTheme(next) {
    document.body.dataset.theme = next;
    localStorage.setItem("mobin-theme", next);
    $$(".concept-option").forEach(function(button) {
      var active = button.dataset.themeChoice === next;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }
  $$(".concept-option").forEach(function(button) { button.addEventListener("click", function() { setTheme(button.dataset.themeChoice); }); });
  $$(".filter").forEach(function(button) { button.addEventListener("click", function() {
    $$(".filter").forEach(function(item) { var active = item === button; item.classList.toggle("active", active); item.setAttribute("aria-pressed", String(active)); });
    $("#catalogSearch").value = "";
    renderCard();
  }); });
  $("#catalogSearch").addEventListener("input", renderCard);
  $("#searchBtn").addEventListener("click", function() { $("#colecao").scrollIntoView({behavior:"smooth"}); $("#catalogSearch").focus(); });
  $("#cartBtn").addEventListener("click", openDrawer);
  $("#cartClose").addEventListener("click", closeDrawer);
  $("#scrim").addEventListener("click", closeDrawer);
  $("#modalClose").addEventListener("click", closeModal);
  $("#modalBack").addEventListener("click", function(event) { if (event.target === event.currentTarget) closeModal(); });
  $("#compareTrigger").addEventListener("click", function() {
    $("#compareItems").innerHTML = '<div class="compare-item"><b>Comparação de modelos</b>Este conceito tem uma ficha pública identificada. Com o catálogo oficial da Mobin, podemos reunir outras opções e comparar os dados validados.</div>';
    $("#comparePanel").classList.add("open");
  });
  $("#compareClose").addEventListener("click", function() { $("#comparePanel").classList.remove("open"); });
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") { closeDrawer(); closeModal(); $("#comparePanel").classList.remove("open"); }
    if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) { event.preventDefault(); $("#catalogSearch").focus(); }
  });
  var savedTheme = localStorage.getItem("mobin-theme") || "cidade";
  setTheme(savedTheme);
  renderCard();
  paintSelection();
})();

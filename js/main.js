(function () {
  var PHONE = "5571984292208";
  var messages = {
    agenda:
      "Olá, Joice! Vi sua tabela de preços e gostaria de agendar um horário de manicure e pedicure a domicílio.",
    combo:
      "Olá, Joice! Gostaria de reservar o combo Spa dos Pés + Manicure (promocional R$ 50,00).",
    servico:
      "Olá, Joice! Gostaria de agendar um serviço individual de manicure ou pedicure a domicílio."
  };

  function waUrl(key) {
    var text = messages[key] || messages.agenda;
    return "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(text);
  }

  document.documentElement.classList.add("js");

  document.querySelectorAll("[data-wa]").forEach(function (el) {
    el.setAttribute("href", waUrl(el.getAttribute("data-wa")));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  var nav = document.getElementById("site-nav");
  var progress = document.getElementById("progress");
  var toTop = document.getElementById("to-top");
  var toggle = document.querySelector(".nav-toggle");
  var panel = document.getElementById("nav-panel");

  function onScroll() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (progress && docHeight > 0) {
      progress.style.width = (scrollTop / docHeight) * 100 + "%";
    }
    if (nav) nav.classList.toggle("is-scrolled", scrollTop > 24);
    if (toTop) toTop.classList.toggle("is-visible", scrollTop > 480);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("menu-open", open);
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setMenu(!nav.classList.contains("is-open"));
    });
  }

  if (panel) {
    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setMenu(false);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 900) setMenu(false);
  });

  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  document.querySelectorAll(".faq-list").forEach(function (list) {
    list.querySelectorAll(".faq-item").forEach(function (item) {
      var button = item.querySelector(".faq-question");
      if (!button) return;
      button.addEventListener("click", function () {
        var wasOpen = item.classList.contains("is-open");
        list.querySelectorAll(".faq-item.is-open").forEach(function (openItem) {
          openItem.classList.remove("is-open");
          var openButton = openItem.querySelector(".faq-question");
          if (openButton) openButton.setAttribute("aria-expanded", "false");
        });
        if (!wasOpen) {
          item.classList.add("is-open");
          button.setAttribute("aria-expanded", "true");
        }
      });
    });
  });

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();

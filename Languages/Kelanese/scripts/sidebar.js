fetch("../partials/toc.html")
  .then(res => res.text())
  .then(html => {
    const sidebar = document.getElementById("sidebar-container");
    sidebar.innerHTML = html;

    const currentPage =
      location.pathname.split("/").pop().replace(".html", "");

    const links = [...sidebar.querySelectorAll("a")];

    // -------------------------
    // 1. Highlight active TOC link
    // -------------------------
    let currentIndex = -1;

    links.forEach((link, i) => {
      if (link.dataset.page === currentPage) {
        link.classList.add("active");
        currentIndex = i;
      }
    });

    // -------------------------
    // 2. Previous / Next buttons
    // -------------------------
    const prevBtn = document.querySelector(".chapter-nav-btn.prev");
    const nextBtn = document.querySelector(".chapter-nav-btn.next");

    if (currentIndex > 0) {
      prevBtn.href = links[currentIndex - 1].href;
    } else {
      prevBtn.style.opacity = "0.4";
      prevBtn.style.pointerEvents = "none";
    }

    if (currentIndex !== -1 && currentIndex < links.length - 1) {
      nextBtn.href = links[currentIndex + 1].href;
    } else {
      nextBtn.style.opacity = "0.4";
      nextBtn.style.pointerEvents = "none";
    }

    // -------------------------
    // 3. Highlight top navbar
    // -------------------------
    document.querySelectorAll(".nav-links a").forEach(link => {
      if (link.href === location.href) {
        link.classList.add("active");
      }
    });

    const body = document.body;
    const h1 = document.querySelector(".chapter-header h1");
    const subtitle = document.querySelector(".chapter-subtitle");

    if (h1 && body.dataset.chapter && body.dataset.title) {
    h1.textContent =
        `Chapter ${body.dataset.chapter} · ${body.dataset.title}`;
    }

    if (subtitle && body.dataset.subtitle) {
    subtitle.textContent = body.dataset.subtitle;
    }

    // -------------------------
    // 5. Hierarchical section TOC (current chapter only)
    // -------------------------
    if (currentIndex !== -1) {
    const activeLink = links[currentIndex];

    const sections = document.querySelectorAll(
        ".chapter-content section[id]"
    );

    if (sections.length) {
        const sectionList = document.createElement("div");
        sectionList.className = "toc-subsections";

        sections.forEach(section => {
        const h2 = section.querySelector("h2");
        if (!h2) return;

        const a = document.createElement("a");
        a.href = `#${section.id}`;
        a.textContent = h2.textContent;
        a.className = "toc-subsection";

        sectionList.appendChild(a);
        });

        activeLink.insertAdjacentElement("afterend", sectionList);
    }
    }

    const subsectionLinks =
    document.querySelectorAll(".toc-subsection");

    if (content && sections.length && subsectionLinks.length) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            subsectionLinks.forEach(link =>
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${entry.target.id}`
            )
            );
        }
        });
    }, { root: content, threshold: 0.4 });

    sections.forEach(s => observer.observe(s));
    }

  });

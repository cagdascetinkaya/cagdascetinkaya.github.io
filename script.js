document.addEventListener("DOMContentLoaded", function () {
    const blogContainer = document.getElementById("blogContainer");
    if (!blogContainer) return;

    // ── Unsplash üzerinden otomatik görsel bulma ──
    // Etiketlere göre anahtar kelime eşleştirmesi
    const tagImageKeywords = {
        "education": "education classroom",
        "technology": "technology laptop",
        "science": "science laboratory",
        "competition": "award trophy",
        "teknofest": "aerospace technology",
        "game-based-learning": "gaming controller",
        "guide": "book reading",
        "interactive": "digital interactive",
        "personal": "journal writing",
        "introduction": "hello welcome",
        "coding": "programming code",
        "research": "research data",
        "ai": "artificial intelligence"
    };

    function getAutoImageUrl(post) {
        // 1. Eğer yazıda görsel varsa onu kullan
        if (post.image && post.image.trim() !== "") return post.image;

        // 2. Etiketlerden anahtar kelime bul ve Unsplash'tan çek
        if (post.tags && post.tags.length > 0) {
            for (const tag of post.tags) {
                const keyword = tagImageKeywords[tag.toLowerCase()];
                if (keyword) {
                    const encoded = encodeURIComponent(keyword);
                    return `https://source.unsplash.com/800x400/?${encoded}`;
                }
            }
            // Hiçbir eşleşme yoksa ilk etiketi kullan
            return `https://source.unsplash.com/800x400/?${encodeURIComponent(post.tags[0])}`;
        }

        // 3. Başlıktan çek
        const titleWords = post.title.split(" ").slice(0, 3).join(" ");
        return `https://source.unsplash.com/800x400/?${encodeURIComponent(titleWords)}`;
    }

    // ── Tarih formatlama ──
    function formatDate(dateStr) {
        try {
            const d = new Date(dateStr);
            if (isNaN(d)) return dateStr;
            const months = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
        } catch {
            return dateStr;
        }
    }

    // ── Blog kartı oluştur ──
    function createBlogCard(post, index) {
        const imageUrl = getAutoImageUrl(post);
        const postUrl = post.link ? post.link : `detay.html?id=${index}`;
        const targetAttr = post.link ? 'target="_blank"' : '';
        const isDownload = post.link ? true : false;
        const formattedDate = formatDate(post.date);
        const readTime = post.readTime || Math.max(2, Math.ceil((post.body || "").split(" ").length / 200));

        // Etiketler HTML
        const badgeTags = (post.tags || [])
            .slice(0, 2)
            .map(t => `<span class="tag">${t}</span>`)
            .join("");

        const miniTags = (post.tags || [])
            .slice(0, 3)
            .map(t => `<span class="mini-tag">#${t}</span>`)
            .join("");

        // İndirme ikonu
        const downloadIcon = isDownload
            ? `<a href="${post.link}" target="_blank" class="blog-card-download" title="Download">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                   <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                   <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                 </svg>
               </a>`
            : "";

        return `
        <div class="col-md-6 col-lg-4 blog-card-col" data-tags="${(post.tags || []).join(",")}">
            <div class="blog-card">
                <div class="blog-card-image-wrapper">
                    ${post.image || !post.link
                        ? `<img src="${imageUrl}" alt="${post.title}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'blog-card-placeholder\\'><svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'48\\' height=\\'48\\' fill=\\'currentColor\\' viewBox=\\'0 0 16 16\\'><path d=\\'M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z\\'/><path d=\\'M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z\\'/></svg></div>'">`
                        : `<div class="blog-card-placeholder">
                             <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                               <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zM11.5 3A1.5 1.5 0 0 1 10 1.5V0H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-1.5z"/>
                             </svg>
                           </div>`
                    }
                    <div class="blog-card-badge">${badgeTags}</div>
                    ${downloadIcon}
                </div>
                <div class="blog-card-body">
                    <div class="blog-card-meta">
                        <span>📅 ${formattedDate}</span>
                        <span class="dot"></span>
                        <span>☕ ${readTime} min read</span>
                    </div>
                    <h5 class="blog-card-title">
                        <a href="${postUrl}" ${targetAttr}>${post.title}</a>
                    </h5>
                    <p class="blog-card-summary">${post.summary}</p>
                    <div class="blog-card-footer">
                        <a href="${postUrl}" ${targetAttr} class="blog-card-read-more">
                            ${isDownload ? "Download" : "Read More"} 
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                            </svg>
                        </a>
                        <div class="blog-card-tags">${miniTags}</div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    // ── Filtre sistemi ──
    function createFilterButtons(posts) {
        const allTags = new Set();
        posts.forEach(p => (p.tags || []).forEach(t => allTags.add(t)));

        if (allTags.size === 0) return "";

        let html = '<div class="blog-filters" id="blogFilters">';
        html += '<button class="blog-filter-btn active" data-filter="all">All</button>';
        allTags.forEach(tag => {
            html += `<button class="blog-filter-btn" data-filter="${tag}">${tag}</button>`;
        });
        html += "</div>";
        return html;
    }

    function setupFilters() {
        const filterBtns = document.querySelectorAll(".blog-filter-btn");
        filterBtns.forEach(btn => {
            btn.addEventListener("click", function () {
                filterBtns.forEach(b => b.classList.remove("active"));
                this.classList.add("active");

                const filter = this.getAttribute("data-filter");
                const cards = document.querySelectorAll(".blog-card-col");

                cards.forEach((card, i) => {
                    const tags = card.getAttribute("data-tags") || "";
                    if (filter === "all" || tags.includes(filter)) {
                        card.style.display = "";
                        // Animasyonu yeniden tetikle
                        card.style.animation = "none";
                        card.offsetHeight; // reflow
                        card.style.animation = `blogCardIn 0.5s ease forwards`;
                        card.style.animationDelay = `${i * 0.05}s`;
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        });
    }

    // ── Yükleme skeleton'ı ──
    function showSkeletons() {
        let html = "";
        for (let i = 0; i < 3; i++) {
            html += '<div class="col-md-6 col-lg-4"><div class="blog-skeleton"></div></div>';
        }
        blogContainer.innerHTML = html;
    }

    // ── Ana yükleme ──
    showSkeletons();

    fetch("blog.json")
        .then(res => res.json())
        .then(data => {
            const posts = data.posts;

            if (!posts || posts.length === 0) {
                blogContainer.innerHTML = `
                    <div class="col-12 blog-empty-state">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.272.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"/>
                        </svg>
                        <h5>No blog posts yet</h5>
                        <p>Check back soon for new content!</p>
                    </div>`;
                return;
            }

            // Filtre butonlarını ekle
            const filterSection = document.getElementById("blogFilters");
            if (!filterSection) {
                blogContainer.insertAdjacentHTML("beforebegin", createFilterButtons(posts));
            }

            // Kartları oluştur
            blogContainer.innerHTML = "";
            posts.forEach((post, index) => {
                blogContainer.innerHTML += createBlogCard(post, index);
            });

            // Filtreleri aktif et
            setupFilters();
        })
        .catch(error => {
            console.error("Blog yükleme hatası:", error);
            blogContainer.innerHTML = `
                <div class="col-12 blog-empty-state">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                    </svg>
                    <h5>Could not load blog posts</h5>
                    <p>Please try again later.</p>
                </div>`;
        });
});

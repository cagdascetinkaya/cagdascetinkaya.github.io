document.addEventListener("DOMContentLoaded", function() {
    const blogContainer = document.getElementById("blogContainer");

    fetch('blog.json')
        .then(response => response.json())
        .then(data => {
            const posts = data.posts;

            if (!posts || posts.length === 0) {
                blogContainer.innerHTML = '<div class="col-12 text-center text-muted">Henüz blog yazısı eklenmedi.</div>';
                return;
            }

            // Yazıları listele
            posts.forEach((post, index) => {
                const blogCard = `
                <div class="col-md-4">
                    <div class="card h-100 border-0 shadow-sm hover-card">
                        ${post.image ? `<img src="${post.image}" class="card-img-top" alt="${post.title}" style="height: 200px; object-fit: cover;">` : '<div class="bg-secondary text-white d-flex align-items-center justify-content-center" style="height: 200px;">Görsel Yok</div>'}

                        <div class="card-body">
                            <div class="small text-muted mb-2">${post.date}</div>
                            <h5 class="card-title fw-bold">
                                <a href="detay.html?id=${index}" class="text-decoration-none text-dark stretched-link">${post.title}</a>
                            </h5>
                            <p class="card-text text-secondary small">${post.summary}</p>
                        </div>
                    </div>
                </div>
                `;
                blogContainer.innerHTML += blogCard;
            });
        })
        .catch(error => console.error('Hata:', error));
});
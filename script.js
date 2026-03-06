document.addEventListener("DOMContentLoaded", function() {
    const postContainer = document.getElementById('blogContainer');

    if (!postContainer) return;

    // Grid (yan yana) yapısını iptal edip, tek sütun (alt alta) yapıyoruz
    postContainer.className = "col-lg-10 mx-auto fade-in-up"; 

    fetch('blog.json')
        .then(response => response.json())
        .then(async (posts) => {
            postContainer.innerHTML = ''; 

            // Ana Akordeon (Açılır Liste) Kapsayıcısını oluştur
            const accordionDiv = document.createElement('div');
            accordionDiv.className = 'accordion shadow-sm rounded-4 overflow-hidden';
            accordionDiv.id = 'blogAccordion';
            postContainer.appendChild(accordionDiv);

            // Her bir yazı için döngü (i değişkeni ID'leri ayırmak için)
            for (let i = 0; i < posts.length; i++) {
                const post = posts[i];
                try {
                    const postResponse = await fetch(`posts/${post.fileName}`);
                    if (!postResponse.ok) throw new Error("Dosya bulunamadı");
                    
                    let markdownText = await postResponse.text();
                    
                    // .md içindeki varsayılan h1 başlığını siliyoruz (Çünkü artık butonda yazacak)
                    markdownText = markdownText.replace(/^#\s+(.*)\n/, ''); 
                    
                    const htmlContent = marked.parse(markdownText);
                    const collapseId = `collapse_${i}`;
                    
                    // JSON'da resim veya başlık unutulursa diye yedek veriler
                    const postTitle = post.title || "İsimsiz Yazı";
                    const postImage = post.image || "img/blog64.png"; 

                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'accordion-item'; 
                    
                    // Açılır kapanır buton ve içerik HTML'i
                    itemDiv.innerHTML = `
                        <h2 class="accordion-header">
                        <button class="accordion-button collapsed bg-white py-3 d-flex align-items-center shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}">
                            
                            <img src="${postImage}" class="rounded-3 me-3 object-fit-cover" style="width: 64px; height: 64px;" alt="Post Thumbnail">
                            
                            <div class="text-start">
                                <h4 class="mb-0 fw-bold rajdhani-bold text-dark fs-4">${postTitle}</h4>
                            </div>
                            
                        </button>
                        </h2>
                        
                        <div id="${collapseId}" class="accordion-collapse collapse" data-bs-parent="#blogAccordion">
                        <div class="accordion-body bg-soft-gray p-4 markdown-body text-dark">
                            ${htmlContent}
                        </div>
                        </div>
                    `;
                    accordionDiv.appendChild(itemDiv);
                } catch (err) {
                    console.error("Yazı yüklenemedi:", post.fileName, err);
                }
            }
        })
        .catch(err => console.error("blog.json okunamadı:", err));
});
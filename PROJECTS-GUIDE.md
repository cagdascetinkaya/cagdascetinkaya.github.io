# 🚀 Proje Ekleme Rehberi / How to Add Projects

Bu rehber, portföy sitesinin "Sample Projects" bölümüne yeni proje eklemeyi açıklar.

---

## 📁 Proje Kartı Yapısı

Her proje kartı `index.html` dosyasındaki `#projectsContainer` içinde yer alır. Aşağıdaki HTML şablonunu kullanarak yeni proje ekleyebilirsin:

```html
<!-- Yeni Proje -->
<div class="col-md-6">
    <div class="project-card-simple h-100">
        <h5 class="fw-bold text-dark mb-2">Proje Adı</h5>
        <p class="text-secondary small mb-3">Projenin kısa açıklaması (1-2 cümle).</p>
        <div class="d-flex flex-wrap gap-1 mb-3">
            <span class="badge bg-primary bg-opacity-10 text-primary small">Node.js</span>
            <span class="badge bg-primary bg-opacity-10 text-primary small">Socket.io</span>
            <!-- İstediğin kadar teknoloji badge'i ekle -->
        </div>
        <a href="https://github.com/cagdascetinkaya/REPO-ADI" target="_blank" class="project-github-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="me-1" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/></svg>
            View on GitHub
        </a>
    </div>
</div>
```

---

## 📝 Adım Adım Yeni Proje Ekleme

### 1. `index.html` dosyasını aç

### 2. `#projectsContainer` bölümünü bul
`Ctrl+F` / `Cmd+F` ile `projectsContainer` araması yap.

### 3. `<!-- Coming Soon -->` yorumunun **hemen üstüne** yeni proje kartını ekle

```
    ...mevcut projeler...

    <!-- YENİ PROJE BURAYA -->
    <div class="col-md-6">
        <div class="project-card-simple h-100">
            ...
        </div>
    </div>

    <!-- Coming Soon -->
    <div class="col-md-6">
        ...
    </div>
```

### 4. Bilgileri güncelle:
| Alan | Açıklama |
|------|----------|
| `<h5>` | Proje adı |
| `<p>` | Kısa açıklama (1-2 cümle) |
| `.badge` | Kullanılan teknolojiler |
| `href` | GitHub repo URL'si |

### 5. Kaydet ve test et

---

## 🏷️ Teknoloji Badge'leri

Sık kullanılan badge örnekleri:

```html
<span class="badge bg-primary bg-opacity-10 text-primary small">Node.js</span>
<span class="badge bg-primary bg-opacity-10 text-primary small">Socket.io</span>
<span class="badge bg-primary bg-opacity-10 text-primary small">Express</span>
<span class="badge bg-primary bg-opacity-10 text-primary small">MongoDB</span>
<span class="badge bg-primary bg-opacity-10 text-primary small">Bootstrap 5</span>
<span class="badge bg-primary bg-opacity-10 text-primary small">JavaScript</span>
<span class="badge bg-primary bg-opacity-10 text-primary small">HTML5</span>
<span class="badge bg-primary bg-opacity-10 text-primary small">CSS3</span>
<span class="badge bg-primary bg-opacity-10 text-primary small">REST API</span>
<span class="badge bg-primary bg-opacity-10 text-primary small">WebSocket</span>
```

---

## 🎨 Kart Tasarımı Notları

- Kartlar `col-md-6` grid kullandığı için satıra **2 kart** sığar
- Ekran daraldığında her kart tam genişlik olur (responsive)
- Kartların sol kenarında mavi accent çizgi (`border-left: 4px solid #1e4a8b`) bulunur
- Hover'da kart hafifçe yukarı kayar (`translateY(-4px)`)
- "Coming Soon" kartı her zaman en sonda kalmalı

---

## ⚠️ Dikkat Edilecekler

1. GitHub link `href="#"` olan kartları gerçek repo URL'leri ile güncelle
2. `target="_blank"` yeni sekmede açılmasını sağlar
3. Her proje kartı `h-100` class'ına sahip olmalı (eşit yükseklik için)
4. Teknoloji badge sayısını 4-5 ile sınırla (okunabilirlik için)

---

## 🗑️ "Coming Soon" Kartını Kaldırma

Yeterli proje eklendikten sonra "Coming Soon" kartını kaldırmak istersen, `<!-- Coming Soon -->` yorumundan `</div>` kapanışına kadar olan bloğu sil.

---

## 📋 Mevcut Projeler (Güncellenmesi Gereken)

| # | Proje Adı | GitHub URL | Durum |
|---|-----------|-----------|-------|
| 1 | Real-Time Chat App | `href="#"` → güncelle | ⏳ |
| 2 | Quiz Battle Platform | `href="#"` → güncelle | ⏳ |
| 3 | Classroom Dashboard | `href="#"` → güncelle | ⏳ |

Her projenin `href="#"` kısmını gerçek GitHub repository linki ile değiştir:
```
https://github.com/cagdascetinkaya/repo-adi
```

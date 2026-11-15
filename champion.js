/* Champion-style portfolio: shared logic for index.html (EN) and tr.html (TR). */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const TR = document.documentElement.lang === 'tr';
const t = (en, tr) => TR ? tr : en;

/* ---------- icon set (original line glyphs, 24×24) ---------- */
const G = {
  flask:'<path d="M9 3h6M10 3v6L4.5 18.5A1.5 1.5 0 0 0 5.8 21h12.4a1.5 1.5 0 0 0 1.3-2.5L14 9V3"/><path d="M7 15h10"/>',
  book:'<path d="M2 5c3-1.5 6.5-1.5 10 1 3.5-2.5 7-2.5 10-1v14c-3-1.5-6.5-1.5-10 1-3.5-2.5-7-2.5-10-1z"/><path d="M12 6v14"/>',
  code:'<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
  bars:'<path d="M3 21h18M6 18v-7M11 18V5M16 18v-9M20 18v-4"/>',
  pen:'<path d="M4 20l4-1L19 8l-3-3L5 16z"/><path d="M14 7l3 3"/>',
  shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  grid:'<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 9h18M9 9v11"/>',
  bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  nodes:'<circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="6" r="2.6"/><circle cx="18" cy="18" r="2.6"/><path d="M8.3 10.8l7.4-3.6M8.3 13.2l7.4 3.6"/>',
  bell:'<path d="M2 20c4 0 5-14 10-14s6 14 10 14"/><path d="M2 20h20M12 6v14" opacity=".6"/>',
  key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M15 8l2 2"/>',
  lens:'<circle cx="12" cy="12" r="4"/><path d="M2 12h4M18 12h4M12 2v4M12 18v4M5 5l2.5 2.5M16.5 16.5 19 19"/>',
  dna:'<path d="M7 3c0 6 10 6 10 12s-10 6-10 6M17 3c0 6-10 6-10 12"/><path d="M8 7h8M8 17h8M10 12h4"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>'
};
const svg = (k, sw = 1.8) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${G[k]}</svg>`;
const ARROW = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 11 11 5M6 5h5v5"/></svg>';

/* ---------- content (EN / TR) ---------- */
const AXES = [
  {k:t('Research','Araştırma'), icon:'flask', v:3, d:t('Inoculation theory, misconception-based teaching, scale development.','Aşılama kuramı, kavram yanılgısı temelli öğretim, ölçek geliştirme.')},
  {k:t('Teaching','Öğretim'),  icon:'book',  v:3, d:t('Science education, gifted education, culturally responsive materials.','Fen eğitimi, üstün yetenekliler eğitimi, kültüre duyarlı materyaller.')},
  {k:t('Code','Kod'),          icon:'code',  v:2, d:t('HTML/CSS, JavaScript, Node.js & Socket.io real-time apps.','HTML/CSS, JavaScript, Node.js ve Socket.io ile gerçek zamanlı uygulamalar.')},
  {k:t('Data','Veri'),         icon:'bars',  v:3, d:t('Quantitative analysis, hypothesis testing, SPSS/AMOS, LISREL, R.','Nicel analiz, hipotez testleri, SPSS/AMOS, LISREL, R.')},
  {k:t('Design','Tasarım'),    icon:'pen',   v:2, d:t('Photoshop, Illustrator, Affinity; game-based learning design.','Photoshop, Illustrator, Affinity; oyun tabanlı öğrenme tasarımı.')}
];
const K = {p:t('Passive','Pasif'), a:t('Ability','Yetenek'), u:t('Ultimate','Ulti'), m:t('Mastered','Ustalaşıldı')};
const ABILITIES = [
  {key:'P', kind:K.p, cls:'pas', icon:'shield', name:t('Misconception Hunter','Yanılgı Avcısı'), tech:t('Science Education · Inoculation Theory','Fen Eğitimi · Aşılama Kuramı'), rank:3, max:3, lvl:K.m,
   d:t('Pre-emptively exposes learners to weakened forms of misinformation, granting lasting resistance to science denial. Misconceptions encountered nearby are identified, named and turned into teaching moments.',
       'Öğrencileri yanlış bilginin zayıflatılmış hâlleriyle önceden karşılaştırarak bilim inkârına karşı kalıcı direnç kazandırır. Yakında karşılaşılan kavram yanılgıları tespit edilir, adlandırılır ve öğretim fırsatına dönüştürülür.')},
  {key:'Q', kind:K.a, icon:'grid', name:t('Markup Weave','İşaret Örgüsü'), tech:'HTML5 · CSS3 · Bootstrap 5', rank:5, max:5, lvl:t('Advanced · 95%','İleri Düzey · %95'),
   d:t('Weaves semantic structure and responsive layouts at speed, shaping any idea into an accessible interface across every screen size.',
       'Anlamsal yapıyı ve duyarlı yerleşimleri hızla örer; her fikri her ekran boyutunda erişilebilir bir arayüze dönüştürür.')},
  {key:'W', kind:K.a, icon:'bolt', name:t('Script Surge','Betik Dalgası'), tech:'JavaScript (ES6+)', rank:4, max:5, lvl:t('Experienced · 85%','Deneyimli · %85'),
   d:t('Channels modern JavaScript to bring static pages to life: interactive simulations, quizzes and dynamic content that respond to every learner.',
       'Modern JavaScript ile durağan sayfalara can verir: her öğrenciye yanıt veren etkileşimli simülasyonlar, quizler ve dinamik içerikler.')},
  {key:'E', kind:K.a, icon:'nodes', name:t('Socket Link','Soket Bağı'), tech:'Node.js · Socket.io', rank:4, max:5, lvl:t('Intermediate · 75%','Orta Düzey · %75'),
   d:t('Links every student in the room through a real-time server. Teachers act as mission control while the whole class plays, solves and learns together.',
       'Sınıftaki herkesi gerçek zamanlı bir sunucu üzerinden birbirine bağlar. Öğretmen görev kontrolü yönetirken tüm sınıf birlikte oynar, çözer ve öğrenir.')},
  {key:'R', kind:K.u, cls:'ult', icon:'bell', name:t('Hypothesis Test','Hipotez Testi'), tech:'SPSS / AMOS · LISREL · R Studio', rank:3, max:3, lvl:K.m,
   d:t('Unleashes the full force of quantitative research: scale development, structural equation modelling and hypothesis testing reveal what truly works in the classroom, visualised for all to see.',
       'Nicel araştırmanın tüm gücünü serbest bırakır: ölçek geliştirme, yapısal eşitlik modellemesi ve hipotez testleri sınıfta gerçekten neyin işe yaradığını ortaya çıkarır ve herkesin görebileceği biçimde görselleştirir.')}
];
const ITEMS = [['Gi','Git / GitHub'],['VS','VS Code'],['Sp','SPSS / Amos'],['Li','LISREL'],['R','R Studio'],['Ps','Adobe Photoshop'],['Ai','Adobe Illustrator'],['Af','Affinity'],['Th','Thunkable'],['As','AppSheet']];
const RELEASES = 'https://github.com/cagdascetinkaya/cagdascetinkaya.github.io/releases';
const DEGREES = [
  {rk:'I', t:t("Bachelor's",'Lisans'), u:t('Boğaziçi University','Boğaziçi Üniversitesi'), y:'2009 – 2014', img:'img/lis.webp', abs:null},
  {rk:'II', t:t("Master's",'Yüksek Lisans'), u:t('Akdeniz University','Akdeniz Üniversitesi'), y:'2016 – 2019', img:'img/yl.png', link:RELEASES,
   abs:t("This master's thesis examines the relationship between multiculturalism and education through the lens of Turkey's social structure and linguistic diversity. It addresses the distribution of ethnic identities in Turkey from a social sciences perspective while also discussing the effects of language development on cognitive processes. The work presents concrete data on the ways in which the people of the Akçakale region use Turkish and Arabic together and on local dialect differences. Its appendices include astronomy-themed lesson plans and achievement tests designed to measure students' gains in science, forming an interdisciplinary framework that spans cultural anthropology and educational methodology.",
         "Bu yüksek lisans tezi, Türkiye'nin toplumsal yapısı ve dilsel çeşitliliği perspektifinden çokkültürlülük ile eğitim arasındaki ilişkiyi incelemektedir. Çalışma, Türkiye'deki etnik kimliklerin dağılımını sosyal bilimler perspektifinden ele alırken dil gelişiminin bilişsel süreçler üzerindeki etkilerini de tartışmaktadır. Özellikle Akçakale bölgesindeki insanların Türkçe ve Arapçayı birlikte kullanma biçimleri ve yerel ağız farklılıkları hakkında somut veriler sunmaktadır. Ekleri ise astronomi temalı ders planları ve öğrencilerin fen bilimlerindeki kazanımlarını ölçmeye yönelik başarı testleri içermekte; böylece hem kültürel antropolojiyi hem de eğitim metodolojisini kapsayan disiplinler arası bir çerçeve oluşturmaktadır.")},
  {rk:'III', t:t('Ph.D.','Doktora'), u:t('Mersin University','Mersin Üniversitesi'), y:'2020 – 2024', img:'img/dr.webp', link:RELEASES,
   abs:t('This study examines the effectiveness of inoculation theory in combating misinformation and science denial, with a focus on climate change. It compares active and passive inoculation methods to help individuals build resilience against disinformation, and covers the Turkish adaptation and educational use of the digital game “Huysuz Dayı” (Cranky Uncle), which teaches players to identify logical fallacies and sophistry. Findings show that both methods improve the ability to defend scientific facts, while gamification makes learning more enjoyable and memorable. The study emphasizes the critical importance of developing critical-thinking habits in the digital media age.',
         'Bu çalışma, özellikle iklim değişikliği odağında yanlış bilgi ve bilim inkârcılığıyla mücadelede aşılama kuramının etkinliğini incelemektedir. Araştırma, bireylerin dezenformasyona karşı dayanıklılık geliştirmesine yardımcı olmak için aktif ve pasif aşılama yöntemlerini karşılaştırmakta; katılımcılara mantık yanlışlıklarını ve safsatayı tanımayı öğreten “Huysuz Dayı” (Cranky Uncle) adlı dijital oyunun Türkçe uyarlamasını ve eğitimsel kullanımını ele almaktadır. Bulgular, her iki yöntemin de bilimsel gerçekleri savunma becerisini geliştirdiğini, oyunlaştırmanın ise öğrenmeyi daha eğlenceli ve akılda kalıcı kıldığını göstermektedir. Çalışma, dijital medya çağında eleştirel düşünme alışkanlıkları geliştirmenin kritik önemini vurgulamaktadır.')}
];
const PUBS = [
  [t("The Effect of Using Culturally Responsive and Differentiated Concept Cartoons on 6th Grade Students' Conceptual Understanding, Scientific Process Skills, and Attitudes",
     'Kültüre Duyarlı ve Farklılaştırılmış Kavram Karikatürleri Kullanımının 6. Sınıf Öğrencilerinin Kavramsal Anlamalarına, Bilimsel Süreç Becerilerine ve Tutumlarına Etkisi'),
   'https://dergipark.org.tr/tr/pub/turkegitimdergisi/article/1034271'],
  [t('Scale development: Assessment of gifted preschoolers’ characteristics that are predictors of their academic success in the future',
     'Ölçek geliştirme: Üstün yetenekli okul öncesi çocukların gelecekteki akademik başarılarının yordayıcısı olan özelliklerinin değerlendirilmesi'),
   'https://un-pub.eu/ojs/index.php/JESET/article/view/5818'],
  [t('Exploring revenge as a mediator between bullying and victimisation in gifted and talented students',
     'Üstün yetenekli öğrencilerde zorbalık ve mağduriyet arasında intikamın aracı rolünün incelenmesi'),
   'https://cipp.ug.edu.pl/Exploring-revenge-as-a-mediator-between-bullying-and-victimisation-in-gifted-and,76539,0,2.html'],
  [t('Investigating the Preschool Training for Gifted and Talented Students on Gifted School Teachers View',
     'Üstün Yetenekli Okul Öğretmenlerinin Görüşlerine Göre Üstün Yetenekli Öğrencilere Yönelik Okul Öncesi Eğitimin İncelenmesi'),
   'https://dergipark.org.tr/en/pub/jegys/article/433811']
];
const PROJECTS = [
  {n:t('Digital Enigma','Dijital Enigma'), icon:'key', c:['#0ac8b9','#06263a'], tags:t(['Real-time','Cryptology','Classroom'],['Gerçek zamanlı','Kriptoloji','Sınıf']), url:'https://github.com/cagdascetinkaya/cryptology',
   d:t('A real-time web application designed to teach students cryptology and encryption topics in a fun and interactive way.',
       'Öğrencilere kriptoloji ve şifreleme konularını eğlenceli ve etkileşimli bir şekilde öğretmek için tasarlanmış gerçek zamanlı bir web uygulaması.')},
  {n:t('Optical Station','Optik İstasyonu'), icon:'lens', c:['#5fa8ff','#0b1d3d'], tags:t(['Real-time','Optics','Multiplayer'],['Gerçek zamanlı','Optik','Çok oyunculu']), url:'https://github.com/cagdascetinkaya/Optical-Station',
   d:t('A real-time educational platform that transforms complex optics topics into an engaging, multiplayer virtual laboratory experience for students.',
       'Karmaşık optik konularını öğrenciler için ilgi çekici, çok oyunculu bir sanal laboratuvar deneyimine dönüştüren gerçek zamanlı eğitim platformu.')},
  {n:t('Bioinformatic Crisis','Biyoinformatik Kriz'), icon:'dna', c:['#b67cff','#1b0b33'], tags:t(['Escape room','DNA','Collaborative'],['Kaçış odası','DNA','İş birliği']), url:'https://github.com/cagdascetinkaya/bioinformatic-crisis',
   d:t('An escape-room style collaborative learning game. Teachers act as Mission Control, while students play as agents decoding binary and ASCII-to-DNA sequences.',
       'Kaçış odası tarzında, iş birliğine dayalı bir öğrenme oyunu. Öğretmenler Görev Kontrol, öğrenciler ise ajan rolünde ikili kodları ve ASCII’den DNA’ya dizileri çözer.')},
  {n:t('Portfolio Website','Portfolyo Web Sitesi'), icon:'globe', c:['#c8aa6e','#2a1e08'], tags:['HTML5','CSS3','Vanilla JS'], url:'https://github.com/cagdascetinkaya/cagdascetinkaya.github.io',
   d:t('This personal academic portfolio: hand-built with HTML, CSS and vanilla JavaScript, and now dressed in hextech gold.',
       'Bu kişisel akademik portfolyo: HTML, CSS ve saf JavaScript ile elde yazıldı, şimdi de hextech altınına büründü.')}
];
const QUOTES = TR ? [
  ['Eğitim, dünyayı değiştirmek için kullanabileceğiniz en güçlü silahtır.','Nelson Mandela'],
  ['Sürprizleri (Easter Egg) severim.','özellikle 7 ile ilişkili olanları'],
  ['Harika iş yapmanın tek yolu, yaptığınız işi sevmektir.','Steve Jobs'],
  ['Araştırma, herkesin gördüğünü görmek ve kimsenin düşünmediğini düşünmektir.','Albert Szent-Györgyi'],
  ['Yarın ölecekmişsin gibi yaşa. Sonsuza kadar yaşayacakmışsın gibi öğren.','Mahatma Gandhi']
] : [
  ['Education is the most powerful weapon which you can use to change the world.','Nelson Mandela'],
  ['I like Easter eggs.','especially the ones related to the number 7'],
  ['The only way to do great work is to love what you do.','Steve Jobs'],
  ['Research is to see what everybody else has seen, and to think what nobody else has thought.','Albert Szent-Györgyi'],
  ['Live as if you were to die tomorrow. Learn as if you were to live forever.','Mahatma Gandhi']
];
const QUIPS = t(['Hehe!','Psst… 7?','Science!',"Trust me, I'm a doctor.",'Boo!','Pop quiz!'],
                ['Hehe!','Psst… 7?','Bilim!','Bana güven, ben doktorum.','Böö!','Sürpriz quiz!']);
const UI = {
  download:t('Download Thesis','Tezi İndir'), na:t('Thesis abstract: N/A','Tez özeti: Yok'),
  github:t('View on GitHub',"GitHub'da İncele"), untitled:t('Untitled','Başlıksız'), loading:t('Loading…','Yükleniyor…'),
  postErr:t('This chronicle could not be loaded.','Bu yazı yüklenemedi.'),
  blogErr:t('Chronicles could not be loaded. (If you opened this file directly, run it from a web server.)','Yazılar yüklenemedi. (Dosyayı doğrudan açtıysanız bir web sunucusu üzerinden çalıştırın.)'),
  sending:t('Sending…','Gönderiliyor…'), send:t('Send Message','Mesaj Gönder'),
  ok:t('Message sent successfully!','Mesajınız başarıyla gönderildi!'), err:t('Something went wrong. Please try again.','Bir hata oluştu. Lütfen tekrar deneyin.'),
  of:t('of','/'), nameplate:t('The Curious Educator','Meraklı Eğitimci')
};

/* ---------- hero: background, sigil, sparks and the mischievous scholar ---------- */
const CHARACTER = `
<svg viewBox="0 0 300 380" aria-hidden="true">
  <defs>
    <radialGradient id="cSkin" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#f3c9a8"/><stop offset=".7" stop-color="#dca582"/><stop offset="1" stop-color="#b47b59"/></radialGradient>
    <linearGradient id="cRobe" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d3b6b"/><stop offset="1" stop-color="#0a1428"/></linearGradient>
    <radialGradient id="cPotion" cx=".5" cy=".7" r=".7"><stop offset="0" stop-color="#e6fffd"/><stop offset=".45" stop-color="#0ac8b9"/><stop offset="1" stop-color="#03606b"/></radialGradient>
    <linearGradient id="cLens" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a5a78"/><stop offset=".5" stop-color="#05080c"/><stop offset="1" stop-color="#0d2230"/></linearGradient>
    <clipPath id="cEyeL"><ellipse cx="114" cy="146" rx="16" ry="15"/></clipPath>
    <clipPath id="cEyeR"><ellipse cx="186" cy="148" rx="16" ry="14"/></clipPath>
  </defs>

  <!-- robe, collar and gem -->
  <path d="M60 380c4-74 42-118 90-118s86 44 90 118Z" fill="url(#cRobe)" stroke="#c8aa6e" stroke-width="2.5"/>
  <path d="M150 290v90" stroke="#c8aa6e" stroke-width="2"/>
  <path d="M96 296c-10 26-14 52-14 84M204 296c10 26 14 52 14 84" stroke="#785a28" stroke-width="1.5" fill="none"/>
  <path d="M150 262 100 246 88 280 138 292Z" fill="#132a50" stroke="#c8aa6e" stroke-width="2" stroke-linejoin="round"/>
  <path d="M150 262 200 246 212 280 162 292Z" fill="#132a50" stroke="#c8aa6e" stroke-width="2" stroke-linejoin="round"/>
  <path d="M150 300l13 13-13 13-13-13Z" fill="#c8aa6e"/><circle class="glow" cx="150" cy="313" r="5" fill="#0ac8b9"/>

  <!-- ears -->
  <ellipse cx="64" cy="166" rx="14" ry="21" fill="#dca582"/><path d="M60 156c6 3 8 11 5 19" stroke="#a86f50" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="236" cy="166" rx="14" ry="21" fill="#c98f6c"/><path d="M240 156c-6 3-8 11-5 19" stroke="#a86f50" stroke-width="2.5" fill="none" stroke-linecap="round"/>

  <!-- head, buzz cut, cowlick -->
  <ellipse cx="150" cy="158" rx="86" ry="90" fill="url(#cSkin)"/>
  <path d="M66 140c2-50 38-74 84-74s82 24 84 74c-14-32-44-48-84-48s-70 16-84 48Z" fill="#3a2c26" opacity=".5"/>
  <path d="M146 72C138 58 150 44 168 46c-9 5-9 13-3 20Z" fill="#2b2320"/>

  <!-- brows: one up, one scheming -->
  <path class="brow-l" d="M90 124c8-17 30-23 46-12" stroke="#2a1f1b" stroke-width="8" stroke-linecap="round" fill="none"/>
  <path class="brow-r" d="M164 134c12-6 30-8 44 0" stroke="#2a1f1b" stroke-width="8" stroke-linecap="round" fill="none"/>

  <!-- eyes peeking over the shades -->
  <g clip-path="url(#cEyeL)">
    <ellipse cx="114" cy="146" rx="16" ry="15" fill="#fff"/>
    <g class="pupil" data-cx="114" data-cy="148"><circle cx="114" cy="148" r="8" fill="#2a1a12"/><circle cx="111" cy="145" r="2.6" fill="#fff"/></g>
    <rect class="lid" x="94" y="106" width="40" height="27" fill="#e2ab88" stroke="#2a1f1b" stroke-width="3"/>
  </g>
  <ellipse cx="114" cy="146" rx="16" ry="15" fill="none" stroke="#2a1f1b" stroke-width="3"/>
  <g clip-path="url(#cEyeR)">
    <ellipse cx="186" cy="148" rx="16" ry="14" fill="#fff"/>
    <g class="pupil" data-cx="186" data-cy="152"><circle cx="186" cy="152" r="8" fill="#2a1a12"/><circle cx="183" cy="149" r="2.6" fill="#fff"/></g>
    <g transform="rotate(9 186 146)"><rect class="lid" x="164" y="116" width="44" height="29" fill="#d9a07e" stroke="#2a1f1b" stroke-width="3"/></g>
  </g>
  <ellipse cx="186" cy="148" rx="16" ry="14" fill="none" stroke="#2a1f1b" stroke-width="3"/>

  <!-- nose -->
  <ellipse cx="150" cy="180" rx="13" ry="10" fill="#c98a68"/><ellipse cx="146" cy="176" rx="4" ry="3" fill="#f8dac4" opacity=".75"/>

  <!-- sunglasses slid down the nose -->
  <g transform="rotate(-5 150 186)">
    <path d="M92 178h50c2 12-3 22-14 24h-24c-10-2-14-12-12-24Z" fill="url(#cLens)"/>
    <path d="M158 178h50c2 12-2 22-12 24h-24c-11-2-16-12-14-24Z" fill="url(#cLens)"/>
    <path d="M88 177h56l6 3 6-3h56" stroke="#05080c" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M90 178 68 168M210 178l22-10" stroke="#05080c" stroke-width="4" stroke-linecap="round"/>
    <path d="M100 185c6-3 12-3 18-2M166 185c6-3 12-3 18-2" stroke="#7fd6e0" stroke-width="2" stroke-linecap="round" opacity=".8"/>
  </g>

  <!-- big fluffy beard -->
  <path d="M66 182c2 30 10 56 30 74 8 10 14 12 20 12 6 8 14 12 22 10 4 6 8 8 12 8s8-2 12-8c8 2 16-2 22-10 6 0 12-2 20-12 20-18 28-44 30-74-8 16-20 26-36 30-12-10-30-14-48-14s-36 4-48 14c-16-4-28-14-36-30Z" fill="#2a1f1b"/>
  <path d="M96 236c6 10 12 16 20 20M204 236c-6 10-12 16-20 20M150 262v12" stroke="#43332c" stroke-width="2.5" stroke-linecap="round" fill="none"/>

  <!-- lopsided grin + curly mustache -->
  <path d="M120 218c16 14 46 14 68-8-2 20-22 34-40 34-16 0-26-10-28-26Z" fill="#5a2018"/>
  <path d="M122 220c18 10 44 8 64-8l-2 8c-18 12-42 14-60 5Z" fill="#fff"/>
  <path d="M138 238c6-6 20-6 26-2-4 5-20 7-26 2Z" fill="#e06a6a"/>
  <path d="M106 210c-10 2-16-4-16-12 4 6 10 6 14 4 12-10 30-12 46-4 16-8 34-6 46 4 4 2 10 2 14-4 0 8-6 14-16 12-14 6-30 4-44 0-14 4-30 6-44 0Z" fill="#1a120f"/>

  <!-- arm + bubbling flask -->
  <path d="M222 322c14-14 24-30 28-50" stroke="#16305a" stroke-width="22" stroke-linecap="round" fill="none"/>
  <path d="M238 284l22 6" stroke="#c8aa6e" stroke-width="4" stroke-linecap="round"/>
  <rect x="243" y="186" width="14" height="26" rx="3" fill="#cfe9f0" fill-opacity=".35" stroke="#e8fbff" stroke-width="2"/>
  <rect x="241" y="178" width="18" height="10" rx="3" fill="#a07850"/>
  <circle cx="250" cy="236" r="25" fill="#cfe9f0" fill-opacity=".22" stroke="#e8fbff" stroke-width="2.5"/>
  <path class="glow" d="M226 238a24 24 0 0 0 48 0c-8 4-16 4-24 0s-16-4-24 0Z" fill="url(#cPotion)"/>
  <ellipse cx="241" cy="224" rx="4" ry="8" fill="#fff" opacity=".55"/>
  <ellipse cx="250" cy="266" rx="16" ry="12" fill="#dca582"/><ellipse cx="236" cy="258" rx="6" ry="9" fill="#e8b593"/>
  <circle class="bub" cx="250" cy="176" r="4" fill="#9ff5ee"/>
  <circle class="bub" cx="246" cy="176" r="3" fill="#9ff5ee" style="animation-delay:.7s"/>
  <g class="bub" style="animation-delay:1.4s"><circle cx="252" cy="172" r="8" fill="none" stroke="#9ff5ee" stroke-width="1.5"/><text x="252" y="176" text-anchor="middle" font-size="10" font-weight="700" fill="#9ff5ee" font-family="Cinzel, serif">7</text></g>
  <circle class="bub" cx="254" cy="176" r="2.5" fill="#9ff5ee" style="animation-delay:2s"/>
</svg>`;

function buildHero(){
  const hero = document.createElement('div');
  hero.className = 'hero';
  hero.innerHTML = `
  <div class="hero-bg"></div>
  <svg class="sigil" viewBox="0 0 400 400" fill="none" stroke="#7fd6e0" aria-hidden="true">
    <g class="spin"><circle cx="200" cy="200" r="190" stroke-width=".6" stroke-dasharray="2 6"/><circle cx="200" cy="200" r="172" stroke-width=".8"/><g id="ticks"></g></g>
    <g class="spin-r"><circle cx="200" cy="200" r="140" stroke-width=".6" stroke-dasharray="30 8 4 8"/>
      <polygon points="200,70 312.6,265 87.4,265" stroke-width=".7" opacity=".7"/><polygon points="200,330 87.4,135 312.6,135" stroke-width=".7" opacity=".7"/></g>
    <circle cx="200" cy="200" r="108" stroke-width=".5" opacity=".6"/>
  </svg>
  <canvas id="sparks" aria-hidden="true"></canvas>
  <div class="champ" id="portrait" role="img" aria-label="${esc(UI.nameplate)}">
    <span class="say" id="say" aria-live="polite"></span>
    <span class="rune r1">${svg('flask', 1.6)}</span>
    <span class="rune r2">${svg('book', 1.6)}</span>
    <span class="rune r3">${svg('code', 1.8)}</span>
    <div class="frame">${CHARACTER}</div>
    <span class="nameplate">${esc(UI.nameplate)}</span>
  </div>`;
  $('.head').after(hero);

  let ticks = '';
  for (let i = 0; i < 72; i++) { const a = i * 5 * Math.PI/180, l = i % 6 ? 6 : 14;
    ticks += `<line x1="${200 + 172*Math.cos(a)}" y1="${200 + 172*Math.sin(a)}" x2="${200 + (172-l)*Math.cos(a)}" y2="${200 + (172-l)*Math.sin(a)}" stroke-width=".7"/>`; }
  $('#ticks').innerHTML = ticks;
}
buildHero();

/* character behaviour: eyes follow the pointer, random blinks, quips on click, 7-click easter egg */
(function(){
  const champ = $('#portrait'), art = $('.frame svg', champ), pupils = $$('.pupil', champ), say = $('#say');
  const look = (x, y) => {
    const r = art.getBoundingClientRect(); if (!r.width) return;
    const s = r.width / 300;
    pupils.forEach(p => {
      const ex = r.left + p.dataset.cx * s, ey = r.top + p.dataset.cy * s, dx = x - ex, dy = y - ey, d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 260) * 5;
      p.style.transform = `translate(${(dx / d * k).toFixed(2)}px, ${(dy / d * k).toFixed(2)}px)`;
    });
  };
  if (!reduced) {
    addEventListener('pointermove', e => { if (e.pointerType === 'mouse') look(e.clientX, e.clientY); }, {passive:true});
    // idle glances for touch screens
    setInterval(() => { if (!matchMedia('(hover:hover)').matches) { const r = art.getBoundingClientRect(); look(r.left + Math.random() * r.width, r.top + Math.random() * r.height); } }, 2600);
    const blink = () => { champ.classList.add('blink'); setTimeout(() => champ.classList.remove('blink'), 140); setTimeout(blink, 2500 + Math.random() * 3500); };
    setTimeout(blink, 2000);
  }
  let n = 0, timer, sayTimer, last = -1;
  champ.addEventListener('click', () => {
    let i; do { i = Math.floor(Math.random() * QUIPS.length); } while (i === last && QUIPS.length > 1); last = i;
    say.textContent = QUIPS[i]; say.classList.add('on');
    clearTimeout(sayTimer); sayTimer = setTimeout(() => say.classList.remove('on'), 1300);
    n++; champ.style.transform = `scale(${1 - n * 0.015})`; setTimeout(() => champ.style.transform = '', 110);
    if (n >= 7) { n = 0; document.body.style.transition = 'filter .8s ease'; document.body.style.filter = 'invert(1) hue-rotate(180deg) blur(2px)'; setTimeout(() => location.href = 'secret.html', 800); }
    clearTimeout(timer); timer = setTimeout(() => n = 0, 1500);
  });
})();

/* drifting sparks */
(function(){
  if (reduced) return;
  const c = $('#sparks'), x = c.getContext('2d'); let W, H;
  const size = () => { const r = devicePixelRatio || 1; W = c.clientWidth; H = c.clientHeight; c.width = W*r; c.height = H*r; x.setTransform(r,0,0,r,0,0); };
  const spawn = y => ({x: Math.random()*W, y: y ?? H + 10, r: Math.random()*1.8 + .4, s: Math.random()*.5 + .15, w: Math.random()*Math.PI*2, h: Math.random() < .25 ? '200,170,110' : '120,220,235'});
  size(); addEventListener('resize', size);
  const dots = Array.from({length: 70}, () => spawn(Math.random()*H));
  (function tick(){
    x.clearRect(0,0,W,H);
    for (const d of dots) {
      d.y -= d.s; d.w += .02; d.x += Math.sin(d.w)*.3;
      if (d.y < -10) Object.assign(d, spawn());
      const a = Math.max(0, Math.min(1, d.y / H)) * .9;
      x.beginPath(); x.fillStyle = `rgba(${d.h},${a})`; x.shadowBlur = 8; x.shadowColor = `rgba(${d.h},.9)`;
      x.arc(d.x, d.y, d.r, 0, Math.PI*2); x.fill();
    }
    requestAnimationFrame(tick);
  })();
})();

/* ---------- tabs + hash routing ---------- */
const TABS = $$('.tab').map(b => b.dataset.tab);
function go(name, push = true){
  if (!TABS.includes(name)) name = 'overview';
  document.body.dataset.tab = name;
  $$('.tab').forEach(b => b.setAttribute('aria-selected', b.dataset.tab === name));
  $$('.panel').forEach(p => p.classList.toggle('on', p.id === 'p-' + name));
  $('#stage').scrollTop = 0;
  if (push && location.hash !== '#' + name) history.replaceState(null, '', '#' + name);
  if (name === 'chronicles') loadBlog();
}
$$('.tab').forEach(b => b.addEventListener('click', () => go(b.dataset.tab)));
$('.tabs').addEventListener('keydown', e => {
  if (!['ArrowLeft','ArrowRight'].includes(e.key)) return;
  const i = TABS.indexOf(document.body.dataset.tab);
  const n = TABS[(i + (e.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length];
  go(n); $(`.tab[data-tab="${n}"]`).focus();
});
addEventListener('hashchange', () => go(location.hash.slice(1), false));

function selectable(container, items, render, onPick){
  container.innerHTML = items.map(render).join('');
  const btns = $$('[data-i]', container);
  const pick = i => { btns.forEach((b, j) => b.setAttribute('aria-selected', i === j)); onPick(i); };
  btns.forEach((b, i) => b.addEventListener('click', () => pick(i)));
  return pick;
}

/* ---------- overview: concentric ring chart ---------- */
(function ring(){
  const cx = 150, cy = 150, R = [[34,51],[56,73],[78,95]];
  const FILL = ['#0ac8b9','#3fa9bd','#a9dbe2'], EMPTY = '#0c2632';
  const P = (r, a) => [cx + r * Math.cos(a * Math.PI/180), cy + r * Math.sin(a * Math.PI/180)];
  const arc = (r0, r1, a0, a1) => {
    const [x0,y0]=P(r1,a0),[x1,y1]=P(r1,a1),[x2,y2]=P(r0,a1),[x3,y3]=P(r0,a0);
    return `M${x0} ${y0}A${r1} ${r1} 0 0 1 ${x1} ${y1}L${x2} ${y2}A${r0} ${r0} 0 0 0 ${x3} ${y3}Z`;
  };
  let s = `<svg viewBox="0 0 300 300" role="img" aria-label="${esc(AXES.map(a => `${a.k} ${a.v}/3`).join(', '))}">
    <circle cx="150" cy="150" r="110" fill="none" stroke="#0c2632" stroke-width="2"/>
    <circle cx="150" cy="150" r="22" fill="#0ac8b9"/><circle cx="150" cy="150" r="12" fill="#0a323c"/><circle cx="150" cy="150" r="7" fill="#0ac8b9"/>`;
  AXES.forEach((ax, k) => {
    const mid = -90 + 72 * k;
    s += `<g class="axis" data-k="${k}" tabindex="0">`;
    R.forEach(([r0, r1], j) => { s += `<path class="seg" data-on="${j < ax.v ? FILL[j] : ''}" fill="${EMPTY}" d="${arc(r0, r1, mid - 33, mid + 33)}"/>`; });
    s += `<path d="${arc(24, 148, mid - 36, mid + 36)}" fill="transparent"/>`;
    const [ix, iy] = P(128, mid);
    s += `<g class="ico" transform="translate(${ix - 11} ${iy - 11})"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${G[ax.icon]}</svg></g></g>`;
  });
  s += '</svg>';
  const wrap = $('#ring');
  wrap.insertAdjacentHTML('afterbegin', s);
  const segs = $$('.seg', wrap);
  const light = () => segs.forEach(p => { if (p.dataset.on) p.setAttribute('fill', p.dataset.on); });
  reduced ? light() : segs.forEach((p, i) => p.dataset.on && setTimeout(() => p.setAttribute('fill', p.dataset.on), 250 + i * 45));
  const tip = $('#tip');
  const show = g => {
    const ax = AXES[g.dataset.k], wr = wrap.getBoundingClientRect(), r = $('.ico', g).getBoundingClientRect();
    tip.innerHTML = `<b>${esc(ax.k)} <em>${ax.v}/3</em></b>${esc(ax.d)}`;
    tip.style.left = (r.left + r.width/2 - wr.left) + 'px';
    tip.style.top = (r.top - wr.top) + 'px';
    tip.classList.add('on'); g.classList.add('hot');
  };
  const hide = g => { tip.classList.remove('on'); g.classList.remove('hot'); };
  $$('.axis', wrap).forEach(g => {
    g.addEventListener('mouseenter', () => show(g)); g.addEventListener('mouseleave', () => hide(g));
    g.addEventListener('focus', () => show(g)); g.addEventListener('blur', () => hide(g));
  });
})();

/* rotating quote */
(function(){
  const el = $('#quote'); let i = 0;
  const put = () => { const [q, a] = QUOTES[i]; el.innerHTML = `“${esc(q)}”<small>— ${esc(a)}</small>`; };
  put();
  if (!reduced) setInterval(() => { el.style.opacity = 0; setTimeout(() => { i = (i + 1) % QUOTES.length; put(); el.style.opacity = 1; }, 500); }, 6000);
})();

/* ---------- abilities ---------- */
const abDetail = $('#abDetail');
selectable($('#abRow'), ABILITIES,
  (a, i) => `<button class="ab ${a.cls || ''}" role="tab" data-i="${i}" aria-selected="false" aria-label="${a.key}: ${esc(a.name)}"><span class="ab-ico">${svg(a.icon)}</span><span class="ab-key">${a.key}</span></button>`,
  i => { const a = ABILITIES[i];
    abDetail.innerHTML = `<div class="kind">${esc(a.kind)} · ${a.key}</div><h3>${esc(a.name)}</h3><div class="tech">${esc(a.tech)}</div>
      <p>${esc(a.d)}</p><div class="ranks">${Array.from({length:a.max}, (_, j) => `<i class="${j < a.rank ? 'f' : ''}"></i>`).join('')}<span>${esc(a.lvl)}</span></div>`;
    abDetail.animate?.([{opacity:0, transform:'translateY(6px)'}, {opacity:1, transform:'none'}], {duration:250, easing:'ease-out'});
  })(0);
$('#items').innerHTML = ITEMS.map(([m, n]) => `<div class="item"><b>${m}</b><span>${esc(n)}</span></div>`).join('');

/* ---------- mastery ---------- */
const msDetail = $('#msDetail');
selectable($('#msRow'), DEGREES,
  (d, i) => `<button class="ms" role="tab" data-i="${i}" aria-selected="false"><span class="crest"><img src="${d.img}" alt="" loading="lazy"><span class="rk">${d.rk}</span></span><h4>${esc(d.t)}</h4><small>${esc(d.u)}</small></button>`,
  i => { const d = DEGREES[i];
    msDetail.innerHTML = `<span class="yrs">${d.y}</span><h3>${esc(d.t)} — ${esc(d.u)}</h3>` +
      (d.abs ? `<p>${esc(d.abs)}</p><a class="btn sm" href="${d.link}" target="_blank" rel="noopener">${UI.download} ${ARROW}</a>` : `<p style="margin:0">${UI.na}</p>`);
  })(2);
$('#pubs').innerHTML = PUBS.map(([title, u]) => `<li><a href="${u}" target="_blank" rel="noopener"><span>${esc(title)}</span>${ARROW}</a></li>`).join('');

/* ---------- projects (skins carousel) ---------- */
(function(){
  let cur = 0;
  const art = (p, big) => `<svg ${big ? 'class="big"' : ''} viewBox="0 0 24 24" fill="none" stroke="${p.c[0]}" stroke-width="${big ? 1 : 1.5}" stroke-linecap="round" stroke-linejoin="round" style="color:${p.c[0]}" aria-hidden="true">${G[p.icon]}</svg>`;
  const bg = p => `radial-gradient(circle at 50% 50%, ${p.c[0]}33, ${p.c[1]} 65%)`;
  const pad = n => String(n).padStart(2, '0');
  const pick = selectable($('#skStrip'), PROJECTS,
    (p, i) => `<button class="sk-th" role="tab" data-i="${i}" aria-selected="false"><div class="t-art" style="background:${bg(p)}">${art(p)}</div><span>${esc(p.n)}</span></button>`,
    i => { cur = i; const p = PROJECTS[i];
      const a = $('#skArt'); a.style.background = bg(p);
      a.innerHTML = `<svg viewBox="0 0 200 200" style="position:absolute;width:120%;opacity:.35" fill="none" stroke="${p.c[0]}"><circle cx="100" cy="100" r="90" stroke-dasharray="2 5"/><circle cx="100" cy="100" r="70" stroke-width=".6"/><circle cx="100" cy="100" r="50" stroke-dasharray="20 6" stroke-width=".6"/></svg>${art(p, true)}`;
      $('#skInfo').innerHTML = `<span class="num">${pad(i + 1)} / ${pad(PROJECTS.length)}</span><h3>${esc(p.n)}</h3><p>${esc(p.d)}</p>
        <div class="tags">${p.tags.map(tag => `<span>${esc(tag)}</span>`).join('')}</div>
        <div><a class="btn sm" href="${p.url}" target="_blank" rel="noopener">${UI.github} ${ARROW}</a></div>`;
    });
  pick(0);
  $('#skPrev').onclick = () => pick((cur + PROJECTS.length - 1) % PROJECTS.length);
  $('#skNext').onclick = () => pick((cur + 1) % PROJECTS.length);
})();

/* ---------- chronicles (blog.json + markdown posts) ---------- */
let blogLoaded = false; const postCache = {};
async function loadBlog(){
  if (blogLoaded) return; blogLoaded = true;
  const list = $('#chrList'), reader = $('#reader');
  try {
    const posts = await (await fetch('blog.json')).json();
    const open = async (i, scroll = true) => {
      const p = posts[i];
      reader.innerHTML = `<h1 class="r-title">${esc(p.title || UI.untitled)}</h1><div class="r-date">${esc(p.date || '')}</div><div class="md"><p class="sub">${UI.loading}</p></div>`;
      try {
        if (!postCache[p.fileName]) {
          const r = await fetch('posts/' + p.fileName); if (!r.ok) throw new Error(r.status);
          const md = (await r.text()).replace(/^#\s+.*\n/, '');
          while (!window.marked) await new Promise(res => setTimeout(res, 50));
          postCache[p.fileName] = marked.parse(md);
        }
        $('.md', reader).innerHTML = postCache[p.fileName];
      } catch (e) { $('.md', reader).innerHTML = `<p>${UI.postErr}</p>`; }
      if (scroll && matchMedia('(max-width:960px)').matches) reader.scrollIntoView({behavior: reduced ? 'auto' : 'smooth', block:'start'});
    };
    selectable(list, posts,
      (p, i) => `<button class="chr-item" role="tab" data-i="${i}" aria-selected="false"><b>${esc(p.title || UI.untitled)}</b><time>${esc(p.date || '')}</time></button>`,
      i => open(i));
    $$('[data-i]', list).forEach((b, j) => b.setAttribute('aria-selected', j === 0));
    await open(0, false);
  } catch (e) {
    blogLoaded = false;
    reader.innerHTML = `<p class="sub">${UI.blogErr}</p>`;
  }
}

/* ---------- contact modal ---------- */
const modal = $('#contact'); let lastFocus;
const openModal = () => { lastFocus = document.activeElement; modal.classList.add('on'); setTimeout(() => $('input', modal).focus(), 50); };
const closeModal = () => { modal.classList.remove('on'); lastFocus?.focus(); };
$$('[data-open="contact"]').forEach(b => b.addEventListener('click', openModal));
$$('[data-close]', modal).forEach(b => b.addEventListener('click', closeModal));
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('on')) closeModal(); });
$('#contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  const f = e.target, btn = $('#submitBtn'), msg = $('#formMsg');
  btn.disabled = true; btn.textContent = UI.sending; msg.className = 'msg';
  try {
    const r = await fetch(f.action, {method:'POST', body:new FormData(f), headers:{Accept:'application/json'}});
    if (!r.ok) throw 0;
    f.reset(); msg.className = 'msg ok'; msg.textContent = UI.ok;
  } catch { msg.className = 'msg err'; msg.textContent = UI.err; }
  btn.disabled = false; btn.textContent = UI.send;
});

/* ---------- first-visit hint pointing to the classic view ---------- */
(function(){
  const hint = $('#hint'); if (!hint) return;
  const KEY = 'cc-classic-hint';
  let seen = false; try { seen = localStorage.getItem(KEY) === '1'; } catch {}
  if (seen) return;
  const dismiss = () => { hint.classList.remove('on'); try { localStorage.setItem(KEY, '1'); } catch {} };
  setTimeout(() => hint.classList.add('on'), 1800);
  setTimeout(dismiss, 14000);
  $('button', hint).addEventListener('click', dismiss);
  $('a', hint).addEventListener('click', dismiss);
})();

go(location.hash.slice(1) || 'overview', false);
})();

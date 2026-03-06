document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const scrollTopBtn = document.querySelector('.scroll-top');
  const progressBar = document.querySelector('.reading-progress-bar');

  /* ========== SEARCH INDEX ========== */
  const searchData = [
    { id:'01', title:'Temel Kavramlar', desc:'Siber güvenlik, bilgi güvenliği, CIA Triad ve hacker türleri.', keywords:'cia triad white hat black hat grey hat güvenlik siber temel kavram', url:'01-temel-kavramlar.html', icon:'🛡️' },
    { id:'02', title:'Temel Bilgisayar Bilgisi', desc:'CPU, RAM, HDD, SSD, BIOS, UEFI ve dosya sistemleri.', keywords:'cpu ram hdd ssd bios uefi ntfs fat32 ext4 donanım bilgisayar', url:'02-bilgisayar-bilgisi.html', icon:'💻' },
    { id:'03', title:'İşletim Sistemleri', desc:'Windows, Linux ve Kali Linux. Temel komutlar ve güvenlik araçları.', keywords:'windows linux kali ubuntu terminal komut registry işletim sistemi', url:'03-isletim-sistemleri.html', icon:'🖥️' },
    { id:'04', title:'Networking', desc:'IP, DNS, DHCP, TCP/UDP, protokoller ve ağ analiz araçları.', keywords:'ip dns dhcp tcp udp subnetting wireshark ağ network protokol router switch', url:'04-networking.html', icon:'🌐' },
    { id:'05', title:'Programlama', desc:'Python, C, JavaScript, Bash. Exploit yazma ve otomasyon.', keywords:'python c javascript bash programlama exploit otomasyon script port scanner', url:'05-programlama.html', icon:'👨‍💻' },
    { id:'06', title:'Web Teknolojileri', desc:'HTML, CSS, JavaScript, HTTP request yapısı. Web\'in temelleri.', keywords:'html css javascript http get post status code header web teknoloji', url:'06-web-teknolojileri.html', icon:'🌍' },
    { id:'07', title:'Web Güvenliği', desc:'SQL Injection, XSS, CSRF, IDOR, File Upload. OWASP Top 10.', keywords:'sql injection xss csrf idor owasp file upload web güvenlik zafiyet', url:'07-web-guvenligi.html', icon:'🕷️' },
    { id:'08', title:'Penetration Testing', desc:'Keşif, tarama, exploitation, yetki yükseltme, raporlama.', keywords:'nmap metasploit burp suite nikto pentest penetration testing sızma testi', url:'08-penetration-testing.html', icon:'🎯' },
    { id:'09', title:'Adli Bilişim', desc:'Adli kopya, disk analizi, log inceleme, veri kurtarma.', keywords:'forensics autopsy ftk imager disk analiz log veri kurtarma adli bilişim', url:'09-adli-bilisim.html', icon:'🔬' },
    { id:'10', title:'Malware Analizi', desc:'Trojan, Virus, Worm, Ransomware, Spyware. Ghidra, IDA Pro.', keywords:'malware trojan virus worm ransomware spyware rootkit ghidra ida pro analiz', url:'10-malware-analizi.html', icon:'🦠' },
    { id:'11', title:'Sosyal Mühendislik', desc:'Phishing, Spear Phishing, Pretexting, Baiting. Psikolojik saldırılar.', keywords:'phishing spear pretexting baiting tailgating sosyal mühendislik social engineering', url:'11-sosyal-muhendislik.html', icon:'🎭' },
    { id:'12', title:'Kriptografi', desc:'Encryption, hashing, AES, RSA, SHA. Simetrik ve asimetrik şifreleme.', keywords:'aes rsa sha md5 des şifreleme encryption hashing kriptografi simetrik asimetrik', url:'12-kriptografi.html', icon:'🔑' },
    { id:'13', title:'Bulut Güvenliği', desc:'AWS, Azure, Google Cloud. Paylaşılan sorumluluk modeli.', keywords:'aws azure google cloud bulut güvenlik saas paas iaas', url:'13-bulut-guvenligi.html', icon:'☁️' },
    { id:'14', title:'Mobil Güvenlik', desc:'Android ve iOS güvenliği. APK/IPA analizi, Frida.', keywords:'android ios mobil güvenlik apk ipa frida owasp mobile', url:'14-mobil-guvenlik.html', icon:'📱' },
    { id:'15', title:'Kablosuz Ağ Güvenliği', desc:'WPA/WPA2/WPA3 protokolleri ve Aircrack-ng.', keywords:'wpa wpa2 wpa3 wep wifi kablosuz aircrack deauth wireless', url:'15-kablosuz-ag.html', icon:'📶' },
    { id:'16', title:'CTF & Pratik', desc:'Hack The Box, TryHackMe, OWASP WebGoat. Gerçek öğrenme.', keywords:'ctf hack the box tryhackme webgoat picoctf capture the flag pratik', url:'16-ctf-pratik.html', icon:'🏁' },
    { id:'17', title:'Siber Güvenlik Kariyerleri', desc:'Pentester, Security Analyst, SOC Analyst, Malware Analyst.', keywords:'kariyer pentester security analyst soc malware analyst forensics meslek', url:'17-kariyer.html', icon:'💼' },
    { id:'18', title:'Sertifikalar', desc:'Security+, CEH, OSCP, CISSP. Kariyerinizi güçlendirin.', keywords:'security+ ceh oscp cissp comptia sertifika certification', url:'18-sertifikalar.html', icon:'📜' },
    { id:'19', title:'Araç Kütüphanesi', desc:'Network, Exploitation, Web, Parola Kırma, OSINT araçları.', keywords:'nmap metasploit burp hashcat john wireshark sqlmap dirb araç tool', url:'19-arac-kutuphanesi.html', icon:'🧰' },
    { id:'20', title:'Kaynaklar', desc:'Öğrenme platformları, kitaplar, YouTube kanalları, topluluklar.', keywords:'kaynak platform kitap youtube kanal topluluk öğrenme eğitim', url:'20-kaynaklar.html', icon:'📚' }
  ];

  // Detect if on sub page
  const isSubPage = location.pathname.includes('/pages/');
  const pagePrefix = isSubPage ? '' : 'pages/';

  /* ========== MOBILE MENU ========== */
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => mobileNav.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !mobileNav.contains(e.target)) mobileNav.classList.remove('open');
    });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));
  }

  /* ========== HEADER SCROLL & PROGRESS ========== */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (header) header.classList.toggle('scrolled', window.scrollY > 20);
        if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
        if (progressBar) {
          const h = document.documentElement.scrollHeight - window.innerHeight;
          progressBar.style.width = h > 0 ? (window.scrollY / h * 100) + '%' : '0%';
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ========== SCROLL TOP ========== */
  if (scrollTopBtn) scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ========== FADE IN ========== */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => obs.observe(el));
  }

  /* ========== ACCORDION ========== */
  document.querySelectorAll('.accordion-header').forEach(h => {
    h.addEventListener('click', () => {
      const item = h.parentElement;
      const body = item.querySelector('.accordion-body');
      const isOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.accordion-item').forEach(o => {
        if (o !== item) { o.classList.remove('open'); const b = o.querySelector('.accordion-body'); if (b) b.style.maxHeight = null; }
      });
      if (isOpen) { item.classList.remove('open'); body.style.maxHeight = null; }
      else { item.classList.add('open'); body.style.maxHeight = body.scrollHeight + 'px'; }
    });
  });

  /* ========== TYPING EFFECT ========== */
  const typingEl = document.querySelector('.typing-text');
  if (typingEl) {
    const phrases = ['Siber Güvenlik Dünyası', 'Ethical Hacking', 'Penetration Testing', 'Bug Bounty Hunting', 'Digital Forensics', 'Malware Analysis'];
    let pi = 0, ci = 0, del = false, spd = 80;
    (function type() {
      const cur = phrases[pi];
      if (del) { typingEl.textContent = cur.substring(0, --ci); spd = 40; }
      else { typingEl.textContent = cur.substring(0, ++ci); spd = 80; }
      if (!del && ci === cur.length) { spd = 2000; del = true; }
      else if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; spd = 400; }
      setTimeout(type, spd);
    })();
  }

  /* ========== COUNTER ANIMATION ========== */
  document.querySelectorAll('.counter').forEach(el => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !e.target.dataset.counted) {
          e.target.dataset.counted = '1';
          const t = parseInt(e.target.dataset.target), s = e.target.dataset.suffix || '';
          let c = 0; const inc = t / 125;
          (function u() { c += inc; if (c >= t) { e.target.textContent = t + s; return; } e.target.textContent = Math.floor(c) + s; requestAnimationFrame(u); })();
        }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
  });

  /* ========== SECTION CARDS CLICK ========== */
  document.querySelectorAll('.section-card[data-href]').forEach(card => {
    card.addEventListener('click', () => { window.location.href = card.dataset.href; });
  });

  /* ========== SEARCH SYSTEM ========== */
  const searchBtn = document.querySelector('.search-toggle');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchInput = document.querySelector('.search-input');
  const searchResults = document.querySelector('.search-results');
  const searchClose = document.querySelector('.search-close');
  const searchCount = document.querySelector('.search-count');

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.add('open');
    setTimeout(() => searchInput && searchInput.focus(), 200);
  }
  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('open');
    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.innerHTML = '';
    if (searchCount) searchCount.textContent = '';
  }

  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  if (searchOverlay) {
    searchOverlay.addEventListener('click', (e) => { if (e.target === searchOverlay) closeSearch(); });
  }

  // Keyboard shortcut: Ctrl+K or /
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName))) {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape') closeSearch();
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      if (!q) {
        searchResults.innerHTML = '<div class="search-empty">Aramak istediğiniz konuyu yazın...</div>';
        searchCount.textContent = '';
        return;
      }
      const terms = q.split(/\s+/);
      const matches = searchData.filter(item => {
        const hay = (item.title + ' ' + item.desc + ' ' + item.keywords).toLowerCase();
        return terms.every(t => hay.includes(t));
      });
      searchCount.textContent = matches.length + ' sonuç bulundu';
      if (!matches.length) {
        searchResults.innerHTML = '<div class="search-empty">Sonuç bulunamadı. Farklı anahtar kelimeler deneyin.</div>';
        return;
      }
      searchResults.innerHTML = matches.map(m => {
        const highlight = (txt) => {
          let r = txt;
          terms.forEach(t => { if (t.length > 1) r = r.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + ')','gi'),'<mark>$1</mark>'); });
          return r;
        };
        return `<a href="${pagePrefix}${m.url}" class="search-result-item">
          <span class="search-result-icon">${m.icon}</span>
          <div class="search-result-info">
            <span class="search-result-title">${highlight(m.title)}</span>
            <span class="search-result-desc">${highlight(m.desc)}</span>
          </div>
          <span class="search-result-id">${m.id}</span>
        </a>`;
      }).join('');
    });
  }

  /* ========== BOOKMARK SYSTEM ========== */
  const BOOKMARK_KEY = 'cybersec_bookmarks';
  function getBookmarks() {
    try { return JSON.parse(localStorage.getItem(BOOKMARK_KEY)) || []; } catch { return []; }
  }
  function saveBookmarks(arr) { localStorage.setItem(BOOKMARK_KEY, JSON.stringify(arr)); }

  const bookmarkBtn = document.querySelector('.bookmark-btn');
  if (bookmarkBtn) {
    const pageId = bookmarkBtn.dataset.page;
    const bmarks = getBookmarks();
    if (bmarks.includes(pageId)) bookmarkBtn.classList.add('bookmarked');
    bookmarkBtn.addEventListener('click', () => {
      let bm = getBookmarks();
      if (bm.includes(pageId)) { bm = bm.filter(b => b !== pageId); bookmarkBtn.classList.remove('bookmarked'); }
      else { bm.push(pageId); bookmarkBtn.classList.add('bookmarked'); }
      saveBookmarks(bm);
    });
  }

  // Show bookmark indicators on landing page cards
  document.querySelectorAll('.section-card[data-page]').forEach(card => {
    const bmarks = getBookmarks();
    if (bmarks.includes(card.dataset.page)) card.classList.add('bookmarked');
  });

  /* ========== COMMENT SYSTEM ========== */
  const COMMENT_PREFIX = 'cybersec_comments_';
  const commentSection = document.querySelector('.comment-section');
  if (commentSection) {
    const pageKey = commentSection.dataset.page;
    const form = commentSection.querySelector('.comment-form');
    const nameInput = form.querySelector('.comment-name');
    const textInput = form.querySelector('.comment-text');
    const ratingContainer = form.querySelector('.star-rating');
    const commentList = commentSection.querySelector('.comment-list');
    const commentCounter = commentSection.querySelector('.comment-count');
    let selectedRating = 0;

    // Remember username
    const savedName = localStorage.getItem('cybersec_username');
    if (savedName && nameInput) nameInput.value = savedName;

    // Star rating
    if (ratingContainer) {
      const stars = ratingContainer.querySelectorAll('.star');
      stars.forEach(star => {
        star.addEventListener('mouseenter', () => {
          const val = parseInt(star.dataset.value);
          stars.forEach(s => s.classList.toggle('hover', parseInt(s.dataset.value) <= val));
        });
        star.addEventListener('mouseleave', () => {
          stars.forEach(s => s.classList.remove('hover'));
        });
        star.addEventListener('click', () => {
          selectedRating = parseInt(star.dataset.value);
          stars.forEach(s => s.classList.toggle('active', parseInt(s.dataset.value) <= selectedRating));
        });
      });
    }

    function getComments() {
      try { return JSON.parse(localStorage.getItem(COMMENT_PREFIX + pageKey)) || []; } catch { return []; }
    }
    function saveComments(arr) { localStorage.setItem(COMMENT_PREFIX + pageKey, JSON.stringify(arr)); }

    function renderComments() {
      const comments = getComments();
      commentCounter.textContent = comments.length;
      if (!comments.length) {
        commentList.innerHTML = '<div class="no-comments">Henüz yorum yok. İlk yorumu sen yap! 🚀</div>';
        return;
      }
      commentList.innerHTML = comments.map((c, i) => {
        const initial = c.name.charAt(0).toUpperCase();
        const stars = c.rating ? '★'.repeat(c.rating) + '☆'.repeat(5 - c.rating) : '';
        const date = new Date(c.date);
        const timeAgo = getTimeAgo(date);
        // Escape HTML to prevent XSS
        const safeName = escapeHtml(c.name);
        const safeText = escapeHtml(c.text);
        return `<div class="comment-item fade-in visible">
          <div class="comment-avatar" style="background:${getAvatarColor(c.name)}">${initial}</div>
          <div class="comment-body">
            <div class="comment-meta">
              <span class="comment-author">${safeName}</span>
              ${stars ? '<span class="comment-stars">' + stars + '</span>' : ''}
              <span class="comment-date">${timeAgo}</span>
            </div>
            <p class="comment-text">${safeText}</p>
            <button class="comment-delete" data-index="${i}" title="Yorumu sil">🗑️</button>
          </div>
        </div>`;
      }).join('');

      // Delete handlers
      commentList.querySelectorAll('.comment-delete').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.index);
          const comms = getComments();
          comms.splice(idx, 1);
          saveComments(comms);
          renderComments();
        });
      });
    }

    function escapeHtml(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }

    function getAvatarColor(name) {
      const colors = ['#06b6d4','#10b981','#8b5cf6','#ef4444','#f59e0b','#ec4899','#3b82f6'];
      let hash = 0;
      for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
      return colors[Math.abs(hash) % colors.length];
    }

    function getTimeAgo(date) {
      const now = new Date();
      const diff = Math.floor((now - date) / 1000);
      if (diff < 60) return 'az önce';
      if (diff < 3600) return Math.floor(diff / 60) + ' dk önce';
      if (diff < 86400) return Math.floor(diff / 3600) + ' saat önce';
      if (diff < 604800) return Math.floor(diff / 86400) + ' gün önce';
      return date.toLocaleDateString('tr-TR');
    }

    // Submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = nameInput.value.trim();
      const text = textInput.value.trim();
      if (!name || !text) return;
      if (name.length > 50 || text.length > 1000) return;
      localStorage.setItem('cybersec_username', name);
      const comms = getComments();
      comms.unshift({ name, text, rating: selectedRating, date: new Date().toISOString() });
      saveComments(comms);
      textInput.value = '';
      selectedRating = 0;
      if (ratingContainer) ratingContainer.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
      renderComments();
    });

    renderComments();
  }

  /* ========== PAGE VISIT COUNTER ========== */
  const VISIT_KEY = 'cybersec_visits';
  function trackVisit() {
    try {
      const visits = JSON.parse(localStorage.getItem(VISIT_KEY)) || {};
      const page = location.pathname.split('/').pop() || 'index.html';
      visits[page] = (visits[page] || 0) + 1;
      visits._total = (visits._total || 0) + 1;
      localStorage.setItem(VISIT_KEY, JSON.stringify(visits));
    } catch { /* silent */ }
  }
  trackVisit();
});

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const scrollTopBtn = document.querySelector('.scroll-top');
  const progressBar = document.querySelector('.reading-progress-bar');
  const isSubPage = location.pathname.includes('/pages/');
  const pagePrefix = isSubPage ? '' : 'pages/';

  /* ═══════════ SEARCH DATA ═══════════ */
  const searchData = [
    { id:'01', title:'Temel Kavramlar', desc:'Siber güvenlik, bilgi güvenliği, CIA Triad ve hacker türleri.', keywords:'cia triad white hat black hat grey hat güvenlik siber temel kavram gizlilik bütünlük erişilebilirlik', url:'01-temel-kavramlar.html', icon:'�', color:'var(--accent-cyan)' },
    { id:'02', title:'Temel Bilgisayar Bilgisi', desc:'CPU, RAM, HDD, SSD, BIOS, UEFI ve dosya sistemleri.', keywords:'cpu ram hdd ssd bios uefi ntfs fat32 ext4 donanım bilgisayar hardware', url:'02-bilgisayar-bilgisi.html', icon:'💻', color:'var(--accent-green)' },
    { id:'03', title:'İşletim Sistemleri', desc:'Windows, Linux ve Kali Linux. Temel komutlar ve güvenlik araçları.', keywords:'windows linux kali ubuntu terminal komut registry işletim sistemi powershell bash chmod', url:'03-isletim-sistemleri.html', icon:'🖥️', color:'var(--accent-purple)' },
    { id:'04', title:'Networking', desc:'IP, DNS, DHCP, TCP/UDP, protokoller ve ağ analiz araçları.', keywords:'ip dns dhcp tcp udp subnetting wireshark ağ network protokol router switch mac address osi model', url:'04-networking.html', icon:'🌐', color:'var(--accent-orange)' },
    { id:'05', title:'Programlama', desc:'Python, C, JavaScript, Bash. Exploit yazma ve otomasyon.', keywords:'python c javascript bash programlama exploit otomasyon script port scanner coding', url:'05-programlama.html', icon:'👨‍💻', color:'var(--accent-blue)' },
    { id:'06', title:'Web Teknolojileri', desc:'HTML, CSS, JavaScript, HTTP request yapısı ve web temelleri.', keywords:'html css javascript http get post status code header web teknoloji request response cookie session', url:'06-web-teknolojileri.html', icon:'🌍', color:'var(--accent-pink)' },
    { id:'07', title:'Web Güvenliği', desc:'SQL Injection, XSS, CSRF, IDOR, File Upload. OWASP Top 10.', keywords:'sql injection xss csrf idor owasp file upload web güvenlik zafiyet vulnerability sqli', url:'07-web-guvenligi.html', icon:'🕷️', color:'var(--accent-red)' },
    { id:'08', title:'Penetration Testing', desc:'Keşif, tarama, exploitation, yetki yükseltme, raporlama.', keywords:'nmap metasploit burp suite nikto pentest penetration testing sızma testi exploit privilege escalation', url:'08-penetration-testing.html', icon:'🎯', color:'var(--accent-cyan)' },
    { id:'09', title:'Adli Bilişim', desc:'Adli kopya, disk analizi, log inceleme, veri kurtarma.', keywords:'forensics autopsy ftk imager disk analiz log veri kurtarma adli bilişim digital evidence', url:'09-adli-bilisim.html', icon:'🔬', color:'var(--accent-purple)' },
    { id:'10', title:'Malware Analizi', desc:'Trojan, Virus, Worm, Ransomware, Spyware. Ghidra, IDA Pro.', keywords:'malware trojan virus worm ransomware spyware rootkit ghidra ida pro analiz reverse engineering', url:'10-malware-analizi.html', icon:'🦠', color:'var(--accent-red)' },
    { id:'11', title:'Sosyal Mühendislik', desc:'Phishing, Spear Phishing, Pretexting, Baiting, Tailgating.', keywords:'phishing spear pretexting baiting tailgating sosyal mühendislik social engineering psikoloji', url:'11-sosyal-muhendislik.html', icon:'🎭', color:'var(--accent-orange)' },
    { id:'12', title:'Kriptografi', desc:'Encryption, hashing, AES, RSA, SHA. Simetrik ve asimetrik şifreleme.', keywords:'aes rsa sha md5 des şifreleme encryption hashing kriptografi simetrik asimetrik diffie hellman', url:'12-kriptografi.html', icon:'🔑', color:'var(--accent-green)' },
    { id:'13', title:'Bulut Güvenliği', desc:'AWS, Azure, Google Cloud. Paylaşılan sorumluluk modeli.', keywords:'aws azure google cloud bulut güvenlik saas paas iaas container docker kubernetes', url:'13-bulut-guvenligi.html', icon:'☁️', color:'var(--accent-blue)' },
    { id:'14', title:'Mobil Güvenlik', desc:'Android ve iOS güvenliği. APK/IPA analizi, Frida.', keywords:'android ios mobil güvenlik apk ipa frida owasp mobile root jailbreak', url:'14-mobil-guvenlik.html', icon:'📱', color:'var(--accent-pink)' },
    { id:'15', title:'Kablosuz Ağ Güvenliği', desc:'WPA/WPA2/WPA3 protokolleri ve Aircrack-ng testleri.', keywords:'wpa wpa2 wpa3 wep wifi kablosuz aircrack deauth wireless handshake', url:'15-kablosuz-ag.html', icon:'📶', color:'var(--accent-cyan)' },
    { id:'16', title:'CTF & Pratik', desc:'Hack The Box, TryHackMe, OWASP WebGoat. Gerçek öğrenme.', keywords:'ctf hack the box tryhackme webgoat picoctf capture the flag pratik yarışma', url:'16-ctf-pratik.html', icon:'🏁', color:'var(--accent-green)' },
    { id:'17', title:'Siber Güvenlik Kariyerleri', desc:'Pentester, Security Analyst, SOC Analyst, Malware Analyst.', keywords:'kariyer pentester security analyst soc malware analyst forensics meslek iş maaş', url:'17-kariyer.html', icon:'💼', color:'var(--accent-purple)' },
    { id:'18', title:'Sertifikalar', desc:'Security+, CEH, OSCP, CISSP. Kariyerinizi güçlendirin.', keywords:'security+ ceh oscp cissp comptia sertifika certification ejpt pnpt', url:'18-sertifikalar.html', icon:'📜', color:'var(--accent-orange)' },
    { id:'19', title:'Araç Kütüphanesi', desc:'Network, Exploitation, Web, Parola Kırma, OSINT araçları.', keywords:'nmap metasploit burp hashcat john wireshark sqlmap dirb gobuster araç tool recon', url:'19-arac-kutuphanesi.html', icon:'🧰', color:'var(--accent-cyan)' },
    { id:'20', title:'Kaynaklar', desc:'Öğrenme platformları, kitaplar, YouTube kanalları, topluluklar.', keywords:'kaynak platform kitap youtube kanal topluluk öğrenme eğitim udemy coursera', url:'20-kaynaklar.html', icon:'📚', color:'var(--accent-green)' }
  ];

  /* ═══════════ MOBILE MENU ═══════════ */
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => mobileNav.classList.toggle('open'));
    document.addEventListener('click', e => {
      if (!menuToggle.contains(e.target) && !mobileNav.contains(e.target)) mobileNav.classList.remove('open');
    });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));
  }

  /* ═══════════ SCROLL / PROGRESS ═══════════ */
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
  if (scrollTopBtn) scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ═══════════ FADE IN ═══════════ */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => obs.observe(el));
  }

  /* ═══════════ ACCORDION ═══════════ */
  document.querySelectorAll('.accordion-header').forEach(h => {
    h.addEventListener('click', () => {
      const item = h.parentElement, body = item.querySelector('.accordion-body'), isOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.accordion-item').forEach(o => {
        if (o !== item) { o.classList.remove('open'); const b = o.querySelector('.accordion-body'); if (b) b.style.maxHeight = null; }
      });
      if (isOpen) { item.classList.remove('open'); body.style.maxHeight = null; }
      else { item.classList.add('open'); body.style.maxHeight = body.scrollHeight + 'px'; }
    });
  });

  /* ═══════════ TYPING EFFECT ═══════════ */
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

  /* ═══════════ COUNTER ═══════════ */
  document.querySelectorAll('.counter').forEach(el => {
    const obs = new IntersectionObserver(entries => {
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

  /* ═══════════ SECTION CARDS ═══════════ */
  document.querySelectorAll('.section-card[data-href]').forEach(card => {
    card.addEventListener('click', () => { window.location.href = card.dataset.href; });
  });

  /* ═══════════════════════════════════════
     COMMAND PALETTE SEARCH (Spotlight-style)
     ═══════════════════════════════════════ */
  const searchBtn = document.querySelector('.search-toggle');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchInput = document.querySelector('.search-input');
  const searchResults = document.querySelector('.search-results');
  const searchClose = document.querySelector('.search-close');
  let selectedIdx = -1;

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => { if (searchInput) { searchInput.value = ''; searchInput.focus(); } }, 150);
    showRecent();
  }

  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('open');
    document.body.style.overflow = '';
    selectedIdx = -1;
  }

  function showRecent() {
    if (!searchResults) return;
    const recent = getRecentSearches();
    if (recent.length) {
      searchResults.innerHTML = '<div class="search-section-label">Son Aramalar</div>' +
        recent.map(id => {
          const item = searchData.find(s => s.id === id);
          if (!item) return '';
          return buildResultHTML(item);
        }).filter(Boolean).join('');
    } else {
      searchResults.innerHTML = '<div class="search-section-label">Popüler Bölümler</div>' +
        [searchData[0], searchData[6], searchData[7], searchData[4], searchData[11]].map(m => buildResultHTML(m)).join('');
    }
  }

  function buildResultHTML(m, terms) {
    const hl = (txt) => {
      if (!terms || !terms.length) return txt;
      let r = txt;
      terms.forEach(t => { if (t.length > 1) r = r.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark>$1</mark>'); });
      return r;
    };
    return `<a href="${pagePrefix}${m.url}" class="search-result-item" data-id="${m.id}">
      <span class="search-result-icon" style="background:${m.color}20;color:${m.color}">${m.icon}</span>
      <div class="search-result-info">
        <span class="search-result-title">${hl(m.title)}</span>
        <span class="search-result-desc">${hl(m.desc)}</span>
      </div>
      <span class="search-result-num">${m.id}</span>
    </a>`;
  }

  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  if (searchOverlay) searchOverlay.addEventListener('click', e => { if (e.target === searchOverlay) closeSearch(); });

  // Keyboard
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName))) {
      e.preventDefault(); openSearch();
    }
    if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('open')) closeSearch();
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      selectedIdx = -1;
      if (!q) { showRecent(); return; }

      const terms = q.split(/\s+/);
      const scored = searchData.map(item => {
        const hay = (item.title + ' ' + item.desc + ' ' + item.keywords).toLowerCase();
        let score = 0;
        terms.forEach(t => {
          if (item.title.toLowerCase().includes(t)) score += 10;
          else if (item.keywords.toLowerCase().includes(t)) score += 5;
          else if (hay.includes(t)) score += 2;
        });
        return { item, score };
      }).filter(s => s.score > 0).sort((a, b) => b.score - a.score);

      if (!scored.length) {
        searchResults.innerHTML = `<div class="search-empty">
          <div class="search-empty-icon">🔍</div>
          <p>"<strong>${escapeHtml(searchInput.value.trim())}</strong>" için sonuç bulunamadı</p>
          <span>Farklı anahtar kelimeler deneyin</span>
        </div>`;
        return;
      }

      searchResults.innerHTML = `<div class="search-section-label">${scored.length} sonuç</div>` +
        scored.map(s => buildResultHTML(s.item, terms)).join('');
    });

    // Arrow key navigation
    searchInput.addEventListener('keydown', e => {
      const items = searchResults ? searchResults.querySelectorAll('.search-result-item') : [];
      if (!items.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIdx = Math.min(selectedIdx + 1, items.length - 1);
        updateSelection(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIdx = Math.max(selectedIdx - 1, 0);
        updateSelection(items);
      } else if (e.key === 'Enter' && selectedIdx >= 0 && items[selectedIdx]) {
        e.preventDefault();
        saveRecentSearch(items[selectedIdx].dataset.id);
        items[selectedIdx].click();
      }
    });
  }

  function updateSelection(items) {
    items.forEach((el, i) => el.classList.toggle('selected', i === selectedIdx));
    if (items[selectedIdx]) items[selectedIdx].scrollIntoView({ block: 'nearest' });
  }

  // Click on result saves to recent
  if (searchResults) {
    searchResults.addEventListener('click', e => {
      const item = e.target.closest('.search-result-item');
      if (item && item.dataset.id) saveRecentSearch(item.dataset.id);
    });
  }

  // Recent searches (localStorage)
  function getRecentSearches() {
    try { return JSON.parse(localStorage.getItem('cybersec_recent')) || []; } catch { return []; }
  }
  function saveRecentSearch(id) {
    const recent = getRecentSearches().filter(r => r !== id);
    recent.unshift(id);
    localStorage.setItem('cybersec_recent', JSON.stringify(recent.slice(0, 5)));
  }

  /* ═══════════════════════════════════════
     BOOKMARK SYSTEM
     ═══════════════════════════════════════ */
  const BOOKMARK_KEY = 'cybersec_bookmarks';
  function getBookmarks() { try { return JSON.parse(localStorage.getItem(BOOKMARK_KEY)) || []; } catch { return []; } }
  function saveBookmarks(arr) { localStorage.setItem(BOOKMARK_KEY, JSON.stringify(arr)); }

  const bookmarkBtn = document.querySelector('.bookmark-btn');
  if (bookmarkBtn) {
    const pageId = bookmarkBtn.dataset.page;
    if (getBookmarks().includes(pageId)) bookmarkBtn.classList.add('bookmarked');
    bookmarkBtn.addEventListener('click', () => {
      let bm = getBookmarks();
      const adding = !bm.includes(pageId);
      bm = adding ? [...bm, pageId] : bm.filter(b => b !== pageId);
      saveBookmarks(bm);
      bookmarkBtn.classList.toggle('bookmarked', adding);
      showToast(adding ? '🔖 Yer işaretine eklendi' : '❌ Yer işaretinden çıkarıldı');
    });
  }

  document.querySelectorAll('.section-card[data-page]').forEach(card => {
    if (getBookmarks().includes(card.dataset.page)) card.classList.add('bookmarked');
  });

  /* ═══════════════════════════════════════
     NOTES SYSTEM (localStorage)
     ═══════════════════════════════════════ */
  const COMMENT_PREFIX = 'cybersec_comments_';
  const commentSection = document.querySelector('.comment-section');

  if (commentSection) {
    const pageKey = commentSection.dataset.page;
    const form = commentSection.querySelector('.comment-form');
    const nameInput = form.querySelector('.comment-name');
    const textInput = form.querySelector('.comment-text');
    const ratingBox = form.querySelector('.star-rating');
    const commentList = commentSection.querySelector('.comment-list');
    const commentCounter = commentSection.querySelector('.comment-count');
    let selectedRating = 0;

    // Remember username in cookie
    const savedName = localStorage.getItem('cybersec_username');
    if (savedName && nameInput) nameInput.value = savedName;

    // Star rating
    if (ratingBox) {
      const stars = ratingBox.querySelectorAll('.star');
      stars.forEach(star => {
        star.addEventListener('mouseenter', () => {
          const val = +star.dataset.value;
          stars.forEach(s => s.classList.toggle('hover', +s.dataset.value <= val));
        });
        star.addEventListener('mouseleave', () => stars.forEach(s => s.classList.remove('hover')));
        star.addEventListener('click', () => {
          selectedRating = +star.dataset.value;
          stars.forEach(s => s.classList.toggle('active', +s.dataset.value <= selectedRating));
        });
      });
    }

    function getComments() { try { return JSON.parse(localStorage.getItem(COMMENT_PREFIX + pageKey)) || []; } catch { return []; } }
    function saveComments(arr) { localStorage.setItem(COMMENT_PREFIX + pageKey, JSON.stringify(arr)); }

    function renderComments() {
      const comments = getComments();
      commentCounter.textContent = comments.length;
      if (!comments.length) {
        commentList.innerHTML = '<div class="no-comments"><div class="no-comments-icon">�</div><p>Henüz not yok</p><span>İlk notu sen ekle!</span></div>';
        return;
      }
      commentList.innerHTML = comments.map((c, i) => {
        const initial = c.name.charAt(0).toUpperCase();
        const starsHtml = c.rating ? '<span class="comment-stars">' + '★'.repeat(c.rating) + '☆'.repeat(5 - c.rating) + '</span>' : '';
        return `<div class="comment-item">
          <div class="comment-avatar" style="background:${avatarColor(c.name)}">${initial}</div>
          <div class="comment-body">
            <div class="comment-meta">
              <span class="comment-author">${escapeHtml(c.name)}</span>
              ${starsHtml}
              <span class="comment-date">${timeAgo(new Date(c.date))}</span>
            </div>
            <p class="comment-msg">${escapeHtml(c.text)}</p>
          </div>
          <button class="comment-delete" data-index="${i}" title="Sil">×</button>
        </div>`;
      }).join('');

      commentList.querySelectorAll('.comment-delete').forEach(btn => {
        btn.addEventListener('click', () => {
          const comms = getComments();
          comms.splice(+btn.dataset.index, 1);
          saveComments(comms);
          renderComments();
          showToast('🗑️ Not silindi');
        });
      });
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = nameInput.value.trim(), text = textInput.value.trim();
      if (!name || !text || name.length > 50 || text.length > 1000) return;
      localStorage.setItem('cybersec_username', name);
      const comms = getComments();
      comms.unshift({ name, text, rating: selectedRating, date: new Date().toISOString() });
      saveComments(comms);
      textInput.value = '';
      selectedRating = 0;
      if (ratingBox) ratingBox.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
      renderComments();
      showToast('✅ Notunuz eklendi!');
    });

    renderComments();
  }

  /* ═══════════ HELPERS ═══════════ */
  function escapeHtml(str) { const d = document.createElement('div'); d.textContent = str; return d.innerHTML; }

  function avatarColor(name) {
    const c = ['#06b6d4','#10b981','#8b5cf6','#ef4444','#f59e0b','#ec4899','#3b82f6'];
    let h = 0; for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
    return c[Math.abs(h) % c.length];
  }

  function timeAgo(date) {
    const d = Math.floor((Date.now() - date) / 1000);
    if (d < 60) return 'az önce';
    if (d < 3600) return Math.floor(d / 60) + ' dk önce';
    if (d < 86400) return Math.floor(d / 3600) + ' saat önce';
    if (d < 604800) return Math.floor(d / 86400) + ' gün önce';
    return date.toLocaleDateString('tr-TR');
  }

  /* ═══════════ TOAST NOTIFICATION ═══════════ */
  function showToast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 2500);
  }

  /* ═══════════ VISIT TRACKER ═══════════ */
  try {
    const visits = JSON.parse(localStorage.getItem('cybersec_visits') || '{}');
    const page = location.pathname.split('/').pop() || 'index.html';
    visits[page] = (visits[page] || 0) + 1;
    visits._total = (visits._total || 0) + 1;
    localStorage.setItem('cybersec_visits', JSON.stringify(visits));
  } catch {}

  /* ═══════════ LOGO ROTATION ═══════════ */
  const logoImg = document.querySelector('.logo-icon img');
  if (logoImg) {
    const imgBase = isSubPage ? '../img/' : 'img/';
    const logos = [imgBase+'favicon-ak.svg', imgBase+'icon-hacker.svg', imgBase+'icon-fingerprint.svg'];
    let logoIdx = 0;
    setInterval(() => {
      logoIdx = (logoIdx + 1) % logos.length;
      logoImg.style.opacity = '0';
      logoImg.style.transform = 'scale(0.7) rotate(-10deg)';
      setTimeout(() => {
        logoImg.src = logos[logoIdx];
        logoImg.style.opacity = '1';
        logoImg.style.transform = 'scale(1) rotate(0deg)';
      }, 300);
    }, 3000);
  }
});

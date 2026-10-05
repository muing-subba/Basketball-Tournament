/**
 * LBEF HOOP FEST 2026 - Gallery & Lightbox Module
 * Filterable basketball action shots, high-res modal lightbox with Next/Prev and keyboard support
 */

const GALLERY_ITEMS = [
  {
    id: 1,
    category: 'action',
    title: 'Fastbreak Layup',
    caption: 'High-altitude finger roll layup against perimeter defensive contest in 4th quarter.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlOa_CMmM4NGFK1D02qX12x9VGLjAgmue3gEcyE1A4zESRo3TPgiAuDKRPVYR2VGW19Ru3AVnw9KbVrkLK0yu51B-2xOvf8bjKkXI2HZDCs281nPtK-C0XLArJgw4ZXt6LR94LfAEFSBxrVPjDXMDxRuX8GRXYrsglQN7as06FdNKgzYbD5bfOC8SiV6PdJs13jmCyo2lLdv9kq4e0C4_PayEPj35kB9h3cK4m7nxIPZCheEdZ9owIcw',
    alt: 'Basketball player in mid-air performing a layup towards the hoop under arena lights'
  },
  {
    id: 2,
    category: 'teams',
    title: 'Tactical Timeout Huddle',
    caption: 'Faculty coach diagramming baseline pick-and-roll strategy on clipboard with players.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfvViphp5JEzqloxFNeqloMRAbe6PlWvqyc7hTLKF_Lr2W1QAs8vwCsN2lV2B2UnBFXYPmJbH3cQKBV_QmQhASvkVFZMAeV59c-lExnfZ0oEpL8DZeH67rFPD5pyKXhpJLAjyURkkd02AluET8XBe41xDgvGZbKb4AOGjqBPhiTumBli7AwEqDu2AYzyFBylzrhHWKz1QJW27818lOHUiuvxo32B0v5C9tUBhG653u3bU3s1g6L8VC5w',
    alt: 'Basketball team huddling with coach on sidelines during high-stakes timeout'
  },
  {
    id: 3,
    category: 'action',
    title: 'Buzzer Beater Arc',
    caption: 'Corner 3-point release in the dying seconds of the semifinal game.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWRMwjd2qbqkA3BP2m77tiwNnffgvWmYs6hoMMR9SJ15AKR3cwTtPiN9PTzjh5aDPIlyvlqrxPqgGPznHoGRutsmxRmRHPxZmSvuPS9ZfEDEfOdAEn27QIVLbxaTzRBxymGFrqdMW1banjI_kWzGPQwiu-SRi1XIWada7TcnzwnWuWVqtOhFhM7GtwE24en3hk-lZjGBEgMZnFHFWahTq6g7m_645qbu-J4cmMllANxah4Fmi9jOdwVg',
    alt: 'Player releasing a 3-pointer basketball jump shot with stadium lighting'
  },
  {
    id: 4,
    category: 'awards',
    title: 'The Victory Cup',
    caption: 'Captains raising the championship trophy amidst gold and navy celebratory confetti.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkZSs3GmQ7mswQils3fk44zi5iMVO32uBEP0Ltubv2aSqby4L88jPAdS9pxcfNG-3TKPzYyzzUmlPSX_JUUB6rAx4LNBK_NXh20Pz72jucoqEWsrmz3499kn1lnvN7jrf4T1FfdT19h45mMBCzcJlyuQbQb2Tqq1hwYGA0M6HmYGyMCQ_QqIVHgVWeUXNdXSceUhWWSekfxq9lPLw2QaTHxwKv-210E_xRCt7y5ZZISliPb65B10r5Qw',
    alt: 'Championship podium celebration with basketball players lifting silver trophy cup'
  },
  {
    id: 5,
    category: 'arena',
    title: 'Maitidevi Arena Overhead',
    caption: 'Electrified stadium court perspective showing the hardwood surface and student bleachers.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsSNloGEYDno1yOpgiVqFgcvYKG0v8l2LAC62KwRDZ2fU16oSA1hYlKET61Z4sxwl6p0xtsrshJYt9YMafwKjAXWiuHnCRZpGViatX5N4Ae9zftlKpZMmWnDnmhWGOY4R0DY1o5VvA8A3MCDkBN4if5Pkcm9jY7q03NPkojG0RP5y53iwrIRqgoGFcgWDsCGDR3NRUUMsnneKNoWQnU94JyhQfrc8_HR-yghSG0iWgn6r0oDLbNYnuXQ',
    alt: 'Wide arena view with scoreboard and basketball court packed with energetic crowd'
  },
  {
    id: 6,
    category: 'action',
    title: 'Thunderous Rim Dunk',
    caption: 'One-handed rim takeoff displaying athletic power and student spirit.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOlKrPyqrAeUwGHjSD824P2GAGSdWwqkw7meZ13mOmIpp1cA9_HVlwkDh22wS1_LJ3UTTCV_rgamyioBRMHrC0pucGC4lyF42AA3D1M6Eh3TjB-geZCWttMbX66kaMlFTyWDRrHHNAeQcuiY1p8Fk1F3Bg0xROL8dL1wFnG8lxYb-IaUdgvgjm2zQ_JN-A4CngUK2atEr9PZ1LHxiDOWyC-Z3fc12ztf33qq2SXb5UsRQG6HJG8VnM0Q',
    alt: 'Athletic basketball player performing an explosive one-handed dunk at the hoop'
  }
];

let currentLightboxIndex = 0;
let activeGalleryCategory = 'all';

function renderGallery() {
  const container = document.getElementById('gallery-grid-container');
  if (!container) return;

  const filtered = GALLERY_ITEMS.filter(item => {
    return activeGalleryCategory === 'all' || item.category === activeGalleryCategory;
  });

  container.innerHTML = filtered.map((item, index) => {
    return `
      <div class="card" style="padding: 0; cursor: pointer; border-radius: var(--radius-md); overflow: hidden;" onclick="openGalleryLightbox(${item.id})">
        <div style="position: relative; height: 260px; overflow: hidden;">
          <img src="${item.img}" alt="${item.alt}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" class="gallery-thumb" onerror="this.src='https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80'">
          <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,30,54,0.95) 0%, transparent 60%);"></div>
          <div style="position: absolute; bottom: 12px; left: 14px; right: 14px; display: flex; justify-content: space-between; align-items: flex-end;">
            <div>
              <span class="badge-tag" style="background: rgba(255,87,34,0.2); color: var(--court-orange); margin-bottom: 4px; display: inline-block;">${item.category.toUpperCase()}</span>
              <h4 style="font-family: var(--font-display); font-size: 16px; color: var(--pure-white); font-weight: 700;">${item.title}</h4>
            </div>
            <span class="material-symbols-outlined" style="color: var(--court-orange); font-size: 24px;">zoom_in</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterGallery(category, buttonEl) {
  activeGalleryCategory = category;
  document.querySelectorAll('.gallery-filter-btn').forEach(btn => btn.classList.remove('active'));
  if (buttonEl) buttonEl.classList.add('active');
  renderGallery();
}

function openGalleryLightbox(itemId) {
  const itemIndex = GALLERY_ITEMS.findIndex(i => i.id === itemId);
  if (itemIndex === -1) return;
  currentLightboxIndex = itemIndex;
  updateLightboxContent();
  openModal('gallery-lightbox-modal');
}

function updateLightboxContent() {
  const item = GALLERY_ITEMS[currentLightboxIndex];
  if (!item) return;

  const content = document.getElementById('lightbox-content-box');
  if (content) {
    content.innerHTML = `
      <div style="position: relative; max-height: 520px; overflow: hidden; border-radius: var(--radius-sm); margin-bottom: 16px; background: #000; text-align: center;">
        <img src="${item.img}" alt="${item.alt}" style="max-height: 500px; max-width: 100%; object-fit: contain; margin: 0 auto; display: block;">
      </div>
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;">
        <div>
          <span class="badge-tag" style="background: rgba(255,87,34,0.2); color: var(--court-orange); margin-bottom: 6px; display: inline-block;">${item.category.toUpperCase()}</span>
          <h3 style="font-family: var(--font-display); font-size: 20px; color: var(--pure-white); margin-bottom: 4px;">${item.title}</h3>
          <p style="font-size: 13px; color: var(--secondary); max-width: 500px;">${item.caption}</p>
          <p style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">* Illustrative sports photography representation for academic demonstration.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary btn-sm" onclick="prevLightboxItem()" title="Previous Image">
            <span class="material-symbols-outlined">chevron_left</span>
          </button>
          <button class="btn btn-secondary btn-sm" onclick="nextLightboxItem()" title="Next Image">
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    `;
  }
}

function prevLightboxItem() {
  currentLightboxIndex = (currentLightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
  updateLightboxContent();
}

function nextLightboxItem() {
  currentLightboxIndex = (currentLightboxIndex + 1) % GALLERY_ITEMS.length;
  updateLightboxContent();
}

document.addEventListener('DOMContentLoaded', () => {
  renderGallery();

  // Keyboard navigation for Lightbox
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('gallery-lightbox-modal');
    if (modal && modal.classList.contains('open')) {
      if (e.key === 'ArrowLeft') prevLightboxItem();
      if (e.key === 'ArrowRight') nextLightboxItem();
    }
  });
});

window.filterGallery = filterGallery;
window.openGalleryLightbox = openGalleryLightbox;
window.prevLightboxItem = prevLightboxItem;
window.nextLightboxItem = nextLightboxItem;

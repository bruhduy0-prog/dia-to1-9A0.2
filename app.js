/* =========================================================
   Phân hoá thu nhập theo vùng — dữ liệu, biểu đồ, trò chơi
   ========================================================= */

/* ---------------------------------------------------------
   1. DỮ LIỆU  (nghìn đồng/người/tháng, giá hiện hành)
   --------------------------------------------------------- */
const DATA = {
  unitLabel: 'nghìn đồng/người/tháng',
  years: [2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024],
  source: 'Tổng cục Thống kê, Khảo sát mức sống dân cư (giá hiện hành).',
  regions: [
    { key: 'tdmnpb', name: 'Trung du và miền núi phía Bắc', tag: 'TD&MNPB',
      values: { 2010: 905, 2012: 1258, 2014: 1613, 2016: 1963, 2018: 2452, 2020: 2745, 2022: 3170, 2024: 3759 } },
    { key: 'dbsh', name: 'Đồng bằng sông Hồng', tag: 'ĐBSH',
      values: { 2010: 1580, 2012: 2351, 2014: 3265, 2016: 3883, 2018: 4775, 2020: 5084, 2022: 5586, 2024: 6558 } },
    { key: 'btb', name: 'Bắc Trung Bộ và Duyên hải miền Trung', tag: 'BTB & DHMT',
      values: { 2010: 1018, 2012: 1505, 2014: 1982, 2016: 2358, 2018: 3014, 2020: 3405, 2022: 3967, 2024: 4648 } },
    { key: 'tn', name: 'Tây Nguyên', tag: 'Tây Nguyên',
      values: { 2010: 1088, 2012: 1643, 2014: 2008, 2016: 2366, 2018: 2895, 2020: 2817, 2022: 3282, 2024: 3882 } },
    { key: 'dnb', name: 'Đông Nam Bộ', tag: 'ĐNB',
      values: { 2010: 2304, 2012: 3173, 2014: 4125, 2016: 4662, 2018: 5792, 2020: 6024, 2022: 6334, 2024: 7075 } },
    { key: 'dbSCL', name: 'Đồng bằng sông Cửu Long', tag: 'ĐBSCL',
      values: { 2010: 1247, 2012: 1797, 2014: 2327, 2016: 2778, 2018: 3585, 2020: 3874, 2022: 4077, 2024: 4753 } }
  ]
};

/* Lời giải thích: giữ nguyên văn phần “Giải thích” của đề bài.
   Đề chỉ nêu riêng Đông Nam Bộ, Đồng bằng sông Hồng và Trung du – miền núi phía Bắc. */
const WHY = {
  dnb:  { title: 'Kinh tế phát triển, nhiều việc làm thu nhập cao',
          body: 'Đông Nam Bộ có kinh tế phát triển, tập trung nhiều khu công nghiệp, doanh nghiệp và dịch vụ, tạo ra nhiều việc làm có thu nhập cao.', own: true },
  dbsh: { title: 'Kinh tế phát triển, nhiều việc làm thu nhập cao',
          body: 'Đồng bằng sông Hồng có kinh tế phát triển, tập trung nhiều khu công nghiệp, doanh nghiệp và dịch vụ, tạo ra nhiều việc làm có thu nhập cao.', own: true },
  tdmnpb: { title: 'Còn nhiều khó khăn về điều kiện sản xuất',
          body: 'Vùng còn nhiều khó khăn về địa hình, cơ sở hạ tầng, trình độ phát triển kinh tế và chất lượng lao động.', own: true },
  btb:   { title: 'Phân hoá do điều kiện tự nhiên và cơ hội việc làm',
          body: 'Điều kiện tự nhiên, trình độ phát triển kinh tế và cơ hội việc làm khác nhau dẫn đến sự phân hoá thu nhập giữa các vùng.', own: false },
  tn:    { title: 'Phân hoá do điều kiện tự nhiên và cơ hội việc làm',
          body: 'Điều kiện tự nhiên, trình độ phát triển kinh tế và cơ hội việc làm khác nhau dẫn đến sự phân hoá thu nhập giữa các vùng.', own: false },
  dbSCL: { title: 'Phân hoá do điều kiện tự nhiên và cơ hội việc làm',
          body: 'Điều kiện tự nhiên, trình độ phát triển kinh tế và cơ hội việc làm khác nhau dẫn đến sự phân hoá thu nhập giữa các vùng.', own: false }
};

/* Thứ tự trang: Biểu đồ → Kiểm tra → Nhận xét → Giải thích → Việc làm → Kết luận */
const PAGES = [
  { id: 'bieu-do',    num: '01', title: 'Biểu đồ thu nhập theo vùng', file: 'bieu-do.html' },
  { id: 'kiem-tra',   num: '02', title: 'Kiểm tra kiến thức',        file: 'kiem-tra.html' },
  { id: 'nhan-xet',   num: '03', title: 'Nhận xét',                  file: 'nhan-xet.html' },
  { id: 'giai-thich', num: '04', title: 'Giải thích',                file: 'giai-thich.html' },
  { id: 'viec-lam',   num: '05', title: 'Việc làm ở Hà Nội',         file: 'viec-lam.html' },
  { id: 'ket-luan',   num: '06', title: 'Kết luận',                  file: 'ket-luan.html' }
];

const state = { year: DATA.years[DATA.years.length - 1], open: null, last: {} };

/* ---------------------------------------------------------
   2. TIỆN ÍCH
   --------------------------------------------------------- */
const $ = (id) => document.getElementById(id);
const fmt = (n) => Math.round(n).toLocaleString('de-DE');
const pct1 = (n) => n.toLocaleString('vi-VN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const valueOf = (r, y) => (r.values[y] == null ? null : r.values[y]);
const wait = (ms) => new Promise((res) => window.setTimeout(res, ms));

function ranked(year) {
  return DATA.regions.filter((r) => valueOf(r, year) != null).sort((a, b) => valueOf(b, year) - valueOf(a, year));
}
const rankOf = (key, year) => ranked(year).findIndex((r) => r.key === key) + 1;

function growth(r) {
  const first = DATA.years[0];
  const last = DATA.years[DATA.years.length - 1];
  const a = valueOf(r, first);
  const b = valueOf(r, last);
  if (a == null || b == null) return null;
  return { abs: b - a, pct: ((b - a) / a) * 100, first, last, from: a, to: b };
}

function axisScale() {
  let max = 0;
  DATA.regions.forEach((r) => DATA.years.forEach((y) => { const v = valueOf(r, y); if (v != null && v > max) max = v; }));
  const steps = [250, 500, 750, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000];
  for (const s of steps) {
    const top = Math.ceil(max / s) * s;
    if (top / s <= 4) return { top, step: s };
  }
  const s = Math.ceil(max / 4 / 1000) * 1000;
  return { top: s * 4, step: s };
}

/* đếm số: từ giá trị cũ lên giá trị mới */
function tweenNumber(node, from, to, dur) {
  if (reduced() || from == null || from === to) { node.textContent = fmt(to); return; }
  const t0 = performance.now();
  const step = (t) => {
    const k = Math.min(1, (t - t0) / dur);
    const e = 1 - Math.pow(1 - k, 3);
    node.textContent = fmt(from + (to - from) * e);
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ---------------------------------------------------------
   3. ĐIỀU HƯỚNG TRANG
   --------------------------------------------------------- */
function isSingle() {
  return document.body.dataset.mode === 'single';
}

function setActiveNav(id) {
  document.querySelectorAll('.nav a').forEach((a) => {
    const on = a.dataset.nav === id;
    if (on) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  const idx = PAGES.findIndex((p) => p.id === id);
  const label = document.querySelector('.pageidx');
  if (label) {
    label.innerHTML = idx >= 0
      ? `Trang <b>${PAGES[idx].num}</b> / ${String(PAGES.length).padStart(2, '0')}`
      : 'Trang chủ';
  }
}

function showPage(id, animate) {
  const pages = [...document.querySelectorAll('.page')];
  const target = pages.find((p) => p.dataset.page === id) || pages[0];
  if (!target) return;
  const current = pages.find((p) => p.classList.contains('active'));

  if (current !== target) {
    pages.forEach((p) => p.classList.remove('active', 'enter'));
    target.classList.add('active');
    if (animate && !reduced()) {
      target.classList.add('enter');
      window.setTimeout(() => target.classList.remove('enter'), 400);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  document.body.dataset.page = target.dataset.page;
  setActiveNav(target.dataset.page);
  onPageShown(target.dataset.page);
}

function initRouting() {
  if (!isSingle()) {
    const id = document.body.dataset.page || 'home';
    setActiveNav(id);
    onPageShown(id);
    return;
  }
  // bản một file: hash = #bieu-do
  const pages = [...document.querySelectorAll('.page')].map((p) => p.dataset.page);
  const go = (animate) => {
    const id = location.hash.replace('#', '');
    showPage(pages.includes(id) ? id : pages[0], animate);
  };
  window.addEventListener('hashchange', () => go(true));
  go(false);
}

/* ---------------------------------------------------------
   4. HERO — biểu đồ nhỏ
   --------------------------------------------------------- */
function renderMini() {
  const box = $('miniBars');
  if (!box) return;
  const year = DATA.years[DATA.years.length - 1];
  const list = ranked(year);
  const max = Math.max(...list.map((r) => valueOf(r, year)));
  box.innerHTML = list.map((r, i) =>
    `<span class="mini-bar${i === 0 ? ' top' : ''}" data-s="${(valueOf(r, year) / max).toFixed(3)}"></span>`).join('');
  $('miniLabels').innerHTML = list.map((r) => `<span>${r.tag}</span>`).join('');
  const grow = () => box.querySelectorAll('.mini-bar').forEach((b, i) => {
    window.setTimeout(() => { b.style.transform = `scaleY(${b.dataset.s})`; }, reduced() ? 0 : 90 + i * 60);
  });
  requestAnimationFrame(grow);
}

/* ---------------------------------------------------------
   5. BIỂU ĐỒ CỘT
   --------------------------------------------------------- */
function renderYearRail() {
  const rail = $('yearRail');
  if (!rail) return;
  rail.innerHTML = DATA.years.map((y) =>
    `<button class="yr" type="button" data-year="${y}" aria-pressed="${y === state.year}" aria-label="Năm ${y}">${y}</button>`).join('');
  rail.querySelectorAll('.yr').forEach((b) => {
    b.addEventListener('click', () => setYear(Number(b.dataset.year)));
    b.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      const i = DATA.years.indexOf(Number(b.dataset.year));
      const next = DATA.years[(i + (e.key === 'ArrowRight' ? 1 : DATA.years.length - 1)) % DATA.years.length];
      setYear(next);
      const el = rail.querySelector(`[data-year="${next}"]`);
      if (el) el.focus();
    });
  });
}

function setYear(year) {
  if (year === state.year) return;
  const prev = state.year;
  state.year = year;
  $('yearRail').querySelectorAll('.yr').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.year) === year)));
  renderPlot(false, prev);
  if (state.open) renderDetail(state.open);
}

function renderPlot(first, prevYear) {
  const plot = $('plot');
  if (!plot) return;
  const { top, step } = axisScale();
  const ticks = Math.round(top / step);

  let grid = '<div class="gridlayer" aria-hidden="true">';
  for (let i = 0; i <= ticks; i++) {
    grid += `<div class="gridline${i === 0 ? ' zero' : ''}" style="bottom:${(i / ticks) * 100}%;transition-delay:${i * 60}ms"></div>`;
  }
  grid += '</div>';

  let axis = '<div class="axis" aria-hidden="true">';
  for (let i = 0; i <= ticks; i++) {
    axis += `<span style="bottom:${(i / ticks) * 100}%">${fmt(step * i)}</span>`;
  }
  axis += '</div>';

  const fromYear = prevYear == null ? null : prevYear;
  const cols = DATA.regions.map((r) => {
    const v = valueOf(r, state.year);
    const s = v == null ? 0 : v / top;
    const base = valueOf(r, DATA.years[0]);
    const g = base == null ? 0 : base / top;
    const startFrom = fromYear != null ? valueOf(r, fromYear) : null;
    const s0 = first ? 0 : (startFrom == null ? 0 : startFrom / top);
    return `<button class="col" type="button" data-key="${r.key}" aria-pressed="${state.open === r.key}"
        style="--s:${s0.toFixed(4)};--lab:${(s0 * 100).toFixed(2)}%" data-s="${s.toFixed(4)}"
        aria-label="${r.name}: ${v == null ? 'chưa có số liệu' : fmt(v) + ' nghìn đồng một tháng, năm ' + state.year}. Mở chi tiết.">
      <span class="barwrap">
        <span class="val" data-v="${v == null ? '' : v}">${v == null ? '—' : fmt(first && fromYear == null ? 0 : (startFrom == null ? v : startFrom))}</span>
        <span class="bar"></span>
        <span class="ghost${state.year === DATA.years[0] ? '' : ' on'}" style="--g:${(g * 100).toFixed(2)}%"></span>
      </span>
      <span class="nm"><span class="full">${r.name}</span><span class="brief">${r.tag}</span></span>
    </button>`;
  }).join('');

  plot.innerHTML = axis + grid + cols;

  const buttons = [...plot.querySelectorAll('.col')];
  const settle = () => {
    buttons.forEach((b, i) => {
      window.setTimeout(() => {
        b.style.setProperty('--s', b.dataset.s);
        b.style.setProperty('--lab', (Number(b.dataset.s) * 100).toFixed(2) + '%');
        const val = b.querySelector('.val');
        if (val.dataset.v === '') return;
        const to = Number(val.dataset.v);
        const from = first ? 0 : (Number(val.textContent.replace(/\./g, '')) || 0);
        if (!Number.isNaN(to)) tweenNumber(val, from, to, 420);
      }, reduced() ? 0 : i * 55);
    });
  };
  requestAnimationFrame(settle);
  window.setTimeout(() => plot.querySelectorAll('.gridline').forEach((g) => g.classList.add('in')), 20);

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => openRegion(btn.dataset.key, false));
    btn.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const i = buttons.indexOf(btn);
      buttons[(i + (e.key === 'ArrowRight' ? 1 : buttons.length - 1)) % buttons.length].focus();
    });
  });
}

/* ---------------------------------------------------------
   6. BẢNG CHI TIẾT VÙNG
   --------------------------------------------------------- */
function renderDetail(key) {
  const box = $('detail');
  if (!box) return;
  const r = DATA.regions.find((x) => x.key === key);
  if (!r) return;
  const v = valueOf(r, state.year);
  const g = growth(r);
  const rank = rankOf(key, state.year);
  const total = ranked(state.year).length;
  const why = WHY[key];
  const leader = ranked(state.year)[0];

  const rows = DATA.years.map((y) => {
    const val = valueOf(r, y);
    return `<tr class="${y === state.year ? 'now' : ''}"><td>${y}</td><td>${val == null ? '—' : fmt(val)}</td></tr>`;
  }).join('');

  const gapLine = rank === 1
    ? `<p>Cao hơn vùng thấp nhất (<b>${ranked(state.year)[total - 1].name}</b>) <b>${pct1(v / valueOf(ranked(state.year)[total - 1], state.year))} lần</b>.</p>`
    : `<p>Cao bằng <b>${Math.round((v / valueOf(leader, state.year)) * 100)}%</b> vùng dẫn đầu (<b>${leader.name}</b>).</p>`;

  box.innerHTML = `
    <div class="detail-head">
      <div>
        <h3>${r.name}</h3>
        <p class="sub">Năm ${state.year} · ${fmt(v)} nghìn đồng/người/tháng · xếp thứ ${rank}/${total}</p>
      </div>
      <button class="detail-close" type="button" aria-label="Đóng bảng chi tiết">✕</button>
    </div>
    <div class="detail-body">
      <div>
        <div class="facts">
          <div class="fact"><small>Năm ${state.year}</small><b>${fmt(v)}<span> nghìn đ</span></b></div>
          <div class="fact"><small>Mức tăng ${g.first}–${g.last}</small><b>+${pct1(g.pct)}<span>%</span></b></div>
          <div class="fact"><small>Tăng thêm</small><b>+${fmt(g.abs)}<span> nghìn đ</span></b></div>
          <div class="fact"><small>Thứ hạng năm ${state.year}</small><b class="rank">${rank} / ${total}</b></div>
        </div>
        <div class="series">
          <table>
            <caption>Chuỗi số liệu ${DATA.years[0]}–${DATA.years[DATA.years.length - 1]}</caption>
            <thead><tr><th scope="col">Năm</th><th scope="col">Nghìn đồng/tháng</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
      <div class="why">
        <b class="k">Vì sao</b>
        <p><b>${why.title}.</b> ${why.body}</p>
        ${gapLine}
        <p class="cite">${why.own
          ? 'Trích phần “Giải thích” của đề bài.'
          : 'Đề bài chỉ nêu nhận định chung cho các vùng còn lại; giữ nguyên văn câu đó.'}</p>
      </div>
    </div>`;

  box.classList.add('on');
  box.querySelector('.detail-close').addEventListener('click', closeDetail);
}

function openRegion(key, scroll) {
  state.open = key;
  document.querySelectorAll('.col').forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.key === key)));
  renderDetail(key);
  if (scroll) {
    const fig = $('chartFigure');
    if (!fig) return;
    const top = fig.getBoundingClientRect().top + window.scrollY - 84;
    window.scrollTo({ top, behavior: reduced() ? 'auto' : 'smooth' });
    window.setTimeout(() => {
      const btn = document.querySelector(`.col[data-key="${key}"]`);
      if (btn) btn.focus({ preventScroll: true });
    }, reduced() ? 0 : 420);
  }
}

function closeDetail() {
  state.open = null;
  const box = $('detail');
  box.classList.remove('on');
  box.innerHTML = '';
  document.querySelectorAll('.col').forEach((c) => c.setAttribute('aria-pressed', 'false'));
}

/* ---------------------------------------------------------
   7. HÀ NỘI — biểu đồ phụ
   --------------------------------------------------------- */
function renderDemand() {
  const box = $('demandBars');
  if (!box) return;
  const rows = [
    { label: 'Bán buôn bán lẻ và hoạt động dịch vụ khác', pct: 54.0, hint: '30.240 vị trí' },
    { label: 'Công nghiệp chế biến, chế tạo và xây dựng', pct: 25.0, hint: '14.000 vị trí' },
    { label: 'Dịch vụ du lịch, lữ hành', pct: 5.7, hint: '3.192 vị trí' },
    { label: 'Vận tải, kho bãi', pct: 3.3, hint: '1.848 vị trí' },
    { label: 'Nhóm khác (không nêu trong báo cáo)', pct: 12.0, hint: 'phần còn lại', other: true }
  ];
  box.innerHTML = rows.map((r) => `
    <div class="brow ${r.other ? 'other' : ''}">
      <div class="t"><span>${r.label}</span><span>${pct1(r.pct)}%</span></div>
      <div class="track"><div class="fill" style="width:0" data-w="${r.pct}"></div></div>
      <small>${r.hint}</small>
    </div>`).join('');
}

function animateDemand() {
  const box = $('demandBars');
  if (!box) return;
  box.querySelectorAll('.fill').forEach((f, i) => {
    window.setTimeout(() => { f.style.width = f.dataset.w + '%'; }, reduced() ? 0 : 120 + i * 90);
  });
}

function animateDonut() {
  const d = $('donut');
  if (!d) return;
  const target = 64.5;
  if (reduced()) { d.style.setProperty('--p', target); return; }
  const t0 = performance.now();
  const step = (t) => {
    const k = Math.min(1, (t - t0) / 900);
    d.style.setProperty('--p', (target * (1 - Math.pow(1 - k, 3))).toFixed(2));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function animateMeter() {
  const fill = $('meterFill');
  if (!fill) return;
  window.setTimeout(() => {
    fill.style.width = '100%';
    const goal = document.querySelector('.meter .goal');
    if (goal) goal.classList.add('on');
  }, reduced() ? 0 : 220);
}

/* ---------------------------------------------------------
   8. TRÒ CHƠI — 4 trắc nghiệm, 4 đúng/sai, 2 ghép cặp
   --------------------------------------------------------- */
const MCQ = [
  { q: 'Theo báo cáo thị trường lao động Hà Nội tháng 6/2026, lĩnh vực nào chiếm tỷ trọng cao nhất trong tổng nhu cầu tuyển dụng (56.000 vị trí)?',
    a: ['Công nghiệp chế biến, chế tạo và xây dựng.',
        'Dịch vụ du lịch, lữ hành.',
        'Bán buôn, bán lẻ và hoạt động dịch vụ khác.',
        'Vận tải, kho bãi.'],
    c: 2,
    why: 'Bán buôn, bán lẻ và hoạt động dịch vụ khác chiếm 54% trong 56.000 vị trí; công nghiệp chế biến, chế tạo và xây dựng khoảng 25%; du lịch, lữ hành 5,7%; vận tải, kho bãi 3,3%.',
    chart: { t: 'Hà Nội: nhu cầu tuyển dụng 56.000 vị trí', r: [['Bán buôn, bán lẻ, dịch vụ khác', 30240], ['CN chế biến, xây dựng', 14000]], u: 'vị trí' } },

  { q: 'Thực trạng đáng chú ý của nguồn cung lao động tại Hà Nội trong giai đoạn này là gì?',
    a: ['Thừa lao động có trình độ trung cấp và cao đẳng.',
        'Mất cân đối nghiêm trọng khi lao động có trình độ đại học trở lên và chưa qua đào tạo chiếm tỷ trọng lớn, trong khi thiếu hụt lao động kỹ thuật tay nghề cao.',
        'Lượng lao động chưa qua đào tạo chiếm dưới 10% tổng nguồn cung.',
        'Nguồn cung lao động đáp ứng hoàn toàn 100% nhu cầu kỹ thuật của doanh nghiệp.'],
    c: 1,
    why: 'Lao động đại học trở lên (33,3%) và chưa qua đào tạo (31,2%) chiếm tới 64,5% nguồn cung, trong khi lao động trung cấp, cao đẳng và lao động kỹ thuật tay nghề cao lại thiếu hụt, thị trường lao động mất cân đối.',
    chart: { t: 'Hà Nội: nguồn cung lao động', r: [['Đại học trở lên', 33.3], ['Chưa qua đào tạo', 31.2], ['Trung cấp, cao đẳng, khác', 35.5]], u: '%' } },

  { q: 'Nhận định nào sau đây không đúng về thu nhập bình quân đầu người phân theo vùng ở nước ta giai đoạn 2010–2024?',
    a: ['Thu nhập bình quân đầu người một tháng ở tất cả các vùng đều có xu hướng tăng.',
        'Đông Nam Bộ luôn là vùng giữ vị trí có thu nhập cao nhất cả nước.',
        'Sự chênh lệch thu nhập giữa các vùng là không đáng kể và có xu hướng biến mất hoàn toàn.',
        'Đồng bằng sông Hồng là vùng có mức thu nhập cao thứ hai sau Đông Nam Bộ.'],
    c: 2,
    why: 'Thu nhập giữa các vùng có sự chênh lệch rõ rệt, chưa có dấu hiệu biến mất hoàn toàn. Ba nhận định còn lại đều đúng theo nội dung bài học.',
    chart: { t: 'Năm 2024: vùng thấp nhất so với vùng cao nhất', r: [['TD & MN phía Bắc', 3749], ['Đông Nam Bộ', 6868]], u: 'nghìn đồng' } },

  { q: 'Đâu là nguyên nhân chính dẫn đến sự chênh lệch thu nhập bình quân đầu người giữa các vùng?',
    a: ['Do sự khác biệt về điều kiện tự nhiên, trình độ phát triển kinh tế, cơ sở hạ tầng và cơ hội việc làm.',
        'Do các vùng có quy mô dân số và diện tích hoàn toàn giống nhau.',
        'Do chính sách chỉ tập trung phát triển nông nghiệp ở tất cả các tỉnh thành.',
        'Do sự đồng đều tuyệt đối về chất lượng nguồn lao động giữa các vùng miền.'],
    c: 0,
    why: 'Điều kiện tự nhiên, trình độ phát triển kinh tế, cơ sở hạ tầng và cơ hội việc làm khác nhau dẫn đến sự phân hóa thu nhập giữa các vùng.',
    chart: { t: 'Đông Nam Bộ: 2010 → 2024', r: [['Năm 2010', 2212], ['Năm 2024', 6868]], u: 'nghìn đồng' } }
];

/* Đúng – sai: hai câu, mỗi câu bốn ý (a–d) */
const TF_GROUPS = [
  { q: 'Nhận định về thực trạng thị trường lao động và giải pháp giải quyết việc làm tại Hà Nội năm 2026',
    subs: [
      { s: 'Nhu cầu tuyển dụng của Hà Nội đạt 56.000 vị trí, trong đó ngành bán buôn, bán lẻ và hoạt động dịch vụ khác chiếm tỷ trọng cao nhất (54%).',
        c: true, why: 'Đúng. Bán buôn, bán lẻ và hoạt động dịch vụ khác chiếm 54% trong 56.000 vị trí, cao nhất trong bốn nhóm ngành được nêu.' },
      { s: 'Thị trường lao động Hà Nội hoàn toàn cân đối, không có sự thiếu hụt nhân lực tay nghề cao hay chênh lệch cung – cầu.',
        c: false, why: 'Sai. Thị trường lao động Hà Nội mất cân đối: thiếu lao động kỹ thuật, tay nghề cao; lao động đại học trở lên và chưa qua đào tạo chiếm tới 64,5% nguồn cung.' },
      { s: 'Hà Nội đang triển khai các kế hoạch như hỗ trợ đào tạo nghề, tạo sinh kế bền vững cho lao động mất đất nông nghiệp hoặc lao động dôi dư.',
        c: true, why: 'Đúng. Kế hoạch số 193/KH-UBND hỗ trợ đào tạo nghề và Kế hoạch số 199 về giải pháp việc làm, tạo sinh kế bền vững cho người lao động.' },
      { s: 'Tính đến hết tháng 10, Hà Nội đã giải quyết việc làm cho 183.249 lao động, vượt kế hoạch năm (đạt 107,16%).',
        c: true, why: 'Đúng. Mục tiêu cả năm là 171.000 lao động; đến hết tháng 10 đã giải quyết 183.249 lao động, đạt 107,16% kế hoạch năm.' }
    ] },
  { q: 'Nhận định về thu nhập bình quân đầu người phân theo vùng ở nước ta giai đoạn 2010–2024',
    subs: [
      { s: 'Thu nhập bình quân đầu người một tháng ở tất cả các vùng đều có xu hướng tăng trong giai đoạn 2010–2024.',
        c: true, why: 'Đúng. Thu nhập bình quân đầu người một tháng ở tất cả các vùng đều tăng trong giai đoạn 2010–2024.' },
      { s: 'Đông Nam Bộ luôn là vùng giữ vị trí có mức thu nhập bình quân đầu người cao nhất cả nước.',
        c: true, why: 'Đúng. Đông Nam Bộ luôn cao nhất: 2.212 nghìn đồng (2010) và 6.868 nghìn đồng (2024).' },
      { s: 'Năm 2010 vùng Trung du và miền núi phía Bắc có thu nhập thấp nhất, nhưng đến năm 2024 vị trí này thuộc về Bắc Trung Bộ.',
        c: false, why: 'Sai. Ngược lại: năm 2010 Bắc Trung Bộ có thu nhập thấp nhất; đến năm 2024 Trung du và miền núi phía Bắc thấp nhất (3.749 nghìn đồng).' },
      { s: 'Sự chênh lệch thu nhập giữa các vùng bắt nguồn từ các yếu tố khác nhau về điều kiện tự nhiên, trình độ phát triển kinh tế và cơ sở hạ tầng.',
        c: true, why: 'Đúng. Đây là những yếu tố được nêu trong phần giải thích về sự phân hóa thu nhập giữa các vùng.' }
    ] }
];

/* Ghép cặp: một câu, bốn cặp */
const MATCH = [
  { title: 'Ghép mỗi đối tượng với đặc điểm hoặc giải pháp phù hợp',
    rows: [
      { left: 'Đông Nam Bộ và Đồng bằng sông Hồng', right: 'industrial',
        rightText: 'Kinh tế phát triển, nhiều công nghiệp và dịch vụ',
        why: 'Kinh tế phát triển, tập trung nhiều khu công nghiệp, doanh nghiệp và dịch vụ, tạo nhiều việc làm có thu nhập cao.' },
      { left: 'Trung du và miền núi phía Bắc', right: 'mountain',
        rightText: 'Khó khăn về địa hình, hạ tầng, kinh tế và lao động',
        why: 'Còn khó khăn về địa hình, cơ sở hạ tầng, trình độ phát triển kinh tế và chất lượng lao động.' },
      { left: 'Thị trường lao động Hà Nội năm 2026', right: 'imbalance',
        rightText: 'Mất cân đối cung – cầu, thiếu lao động tay nghề cao',
        why: 'Mất cân đối cung – cầu: lao động đại học trở lên và chưa qua đào tạo chiếm tới 64,5% nguồn cung, trong khi thiếu hụt lao động kỹ thuật tay nghề cao.' },
      { left: 'Giải pháp của Nhà nước', right: 'policy',
        rightText: 'Đầu tư kinh tế, tạo việc làm, nâng cao đời sống',
        why: 'Tiếp tục đầu tư phát triển kinh tế, tạo việc làm và nâng cao đời sống người dân ở những vùng còn khó khăn.' }
    ] }
];

const TF_FLAT = TF_GROUPS.flatMap((g, gi) => g.subs.map((s, si) => ({ ...s, gi, si })));

const game = {
  step: 0, score: 0, locked: false,
  steps: [{ type: 'mcq', i: 0 }, { type: 'mcq', i: 1 }, { type: 'mcq', i: 2 }, { type: 'mcq', i: 3 }, { type: 'tf' }, { type: 'match' }],
  tfPicks: TF_FLAT.map(() => null),
  matchPicks: []
};
const totalPoints = () => MCQ.length + TF_FLAT.length + MATCH[0].rows.length;

function setProgress(points) {
  const fill = $('progressFill');
  if (fill) fill.style.width = `${(points / totalPoints()) * 100}%`;
  const now = $('scoreNow');
  if (now) {
    now.textContent = game.score;
    now.classList.remove('bump');
    void now.offsetWidth;
    now.classList.add('bump');
  }
}

function setRound(n) {
  [1, 2, 3].forEach((i) => {
    const el = $('round' + i);
    if (!el) return;
    el.classList.toggle('active', i === n);
    el.classList.toggle('done', i < n);
  });
}

function clearStage() {
  const answers = $('answers');
  if (answers) answers.innerHTML = '';
  const fb = $('feedback');
  if (fb) { fb.className = 'feedback'; fb.innerHTML = ''; }
  const next = $('nextBtn');
  if (next) next.disabled = true;
  game.locked = false;
}

function renderStep() {
  const step = game.steps[game.step];
  if (!step) return finish();
  clearStage();
  if (step.type === 'mcq') return renderMCQ(step.i);
  if (step.type === 'tf') return renderTF();
  return renderMatch();
}

/* biểu đồ nhỏ trong lời giải */
function miniChart(c) {
  const max = Math.max(...c.r.map((x) => x[1]));
  const fmtV = (v) => (String(v).includes('.') ? pct1(v) : fmt(v));
  return `<div class="mini-chart">
    <b>${c.t}</b>
    ${c.r.map(([label, v]) => `
      <span class="mc-row">
        <span class="mc-label">${label}</span>
        <span class="mc-track"><span class="mc-fill" style="--w:${(v / max) * 100}%"></span></span>
        <span class="mc-val">${fmtV(v)}${c.u ? ' ' + c.u : ''}</span>
      </span>`).join('')}
  </div>`;
}

function renderMCQ(i) {
  setRound(1);
  const item = MCQ[i];
  $('qcount').textContent = `Câu ${i + 1} / ${MCQ.length}`;
  $('question').textContent = item.q;
  $('qhelp').textContent = 'Chọn một đáp án.';
  const wrap = document.createElement('div');
  wrap.className = 'options';
  item.a.forEach((text, k) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'opt';
    b.innerHTML = `<span class="letter">${'ABCD'[k]}</span><span>${text}</span>`;
    b.addEventListener('click', () => {
      if (game.locked) return;
      game.locked = true;
      const ok = k === item.c;
      wrap.querySelectorAll('.opt').forEach((el, idx) => {
        el.disabled = true;
        if (idx === item.c) el.classList.add('correct');
        else if (idx === k) el.classList.add('wrong');
      });
      if (ok) game.score += 1;
      feedback(ok, ok ? 'Chính xác' : 'Chưa đúng', item.why);
      if (item.chart) $('feedback').insertAdjacentHTML('beforeend', miniChart(item.chart));
      $('nextBtn').disabled = false;
      setProgress(game.step + 1);
    });
    wrap.appendChild(b);
  });
  $('answers').appendChild(wrap);
  $('nextBtn').textContent = 'Tiếp tục';
  $('nextBtn').onclick = () => advance();
}

function renderTF() {
  setRound(2);
  game.tfPicks = TF_FLAT.map(() => null);
  $('qcount').textContent = 'Câu 5 / 6 · Đúng – Sai';
  $('question').textContent = 'Đúng hay sai?';
  $('qhelp').textContent = 'Hai câu, tám ý. Chọn Đúng hoặc Sai cho từng ý, rồi bấm “Kiểm tra”.';
  const list = document.createElement('div');
  list.className = 'tf-list';
  TF_GROUPS.forEach((g, gi) => {
    const head = document.createElement('h3');
    head.className = 'tf-group';
    head.innerHTML = `<span class="tf-num">Câu ${gi + 1}</span>${g.q}`;
    list.appendChild(head);
    g.subs.forEach((item, si) => {
      const idx = TF_FLAT.findIndex((x) => x.gi === gi && x.si === si);
      const row = document.createElement('div');
      row.className = 'tf-row';
      row.innerHTML = `<p class="tf-stmt"><b>${'abcd'[si]}.</b> ${item.s}</p>
        <div class="tf-btns">
          <button class="tf-btn" type="button" data-v="1">Đúng</button>
          <button class="tf-btn" type="button" data-v="0">Sai</button>
        </div>`;
      row.querySelectorAll('.tf-btn').forEach((b) => {
        b.addEventListener('click', () => {
          if (game.locked) return;
          game.tfPicks[idx] = b.dataset.v === '1';
          row.querySelectorAll('.tf-btn').forEach((x) => x.classList.toggle('on', x === b));
          $('nextBtn').disabled = game.tfPicks.some((p) => p === null);
        });
      });
      list.appendChild(row);
    });
  });
  $('answers').appendChild(list);
  $('nextBtn').textContent = 'Kiểm tra';
  $('nextBtn').disabled = true;
  $('nextBtn').onclick = () => checkTF();
}

function checkTF() {
  if (game.locked) return;
  game.locked = true;
  let ok = 0;
  const rows = [...$('answers').querySelectorAll('.tf-row')];
  TF_FLAT.forEach((item, i) => {
    const row = rows[i];
    const picks = row.querySelectorAll('.tf-btn');
    const picked = game.tfPicks[i];
    const right = picked === item.c;
    if (right) ok++;
    picks.forEach((b) => {
      const v = b.dataset.v === '1';
      b.disabled = true;
      b.classList.remove('on');
      if (v === item.c) b.classList.add('correct');
      else if (v === picked) b.classList.add('wrong');
    });
    const p = document.createElement('p');
    p.className = 'qhelp';
    p.style.gridColumn = '1 / -1';
    p.style.margin = '10px 0 0';
    p.innerHTML = `<b>${right ? 'Đúng' : 'Chưa đúng'}.</b> ${item.why}`;
    row.appendChild(p);
  });
  game.score += ok;
  feedback(ok === TF_FLAT.length, `${ok}/${TF_FLAT.length} ý đúng`, 'Xem lời giải dưới từng ý.');
  setProgress(MCQ.length + TF_FLAT.length);
  $('nextBtn').textContent = 'Tiếp tục';
  $('nextBtn').disabled = false;
  $('nextBtn').onclick = () => advance();
}

function renderMatch() {
  setRound(3);
  game.matchPicks = MATCH.map((b) => b.rows.map(() => ''));
  $('qcount').textContent = 'Câu 6 / 6 · Ghép cặp';
  $('question').textContent = 'Ghép cặp';
  $('qhelp').textContent = 'Mỗi dòng bên trái chọn một nội dung phù hợp ở danh sách bên phải.';
  const wrap = document.createElement('div');
  MATCH.forEach((block, bi) => {
    const sec = document.createElement('div');
    sec.className = 'match-block';
    sec.innerHTML = `<h3><span class="tf-num">Câu ${bi + 1}</span>${block.title}</h3>`;
    const rows = document.createElement('div');
    rows.className = 'match-rows';
    block.rows.forEach((r, ri) => {
      const row = document.createElement('div');
      row.className = 'mrow';
      const opts = ['<option value="">— Chọn —</option>']
        .concat(block.rows.map((x) => `<option value="${x.right}">${x.rightText}</option>`)).join('');
      row.innerHTML = `<span class="mleft">${r.left}</span><span class="mselect"><select aria-label="Ghép cho ${r.left}">${opts}</select></span>`;
      const sel = row.querySelector('select');
      sel.addEventListener('change', () => {
        game.matchPicks[bi][ri] = sel.value;
        $('nextBtn').disabled = !game.matchPicks.every((g) => g.every((v) => v));
      });
      rows.appendChild(row);
    });
    sec.appendChild(rows);
    wrap.appendChild(sec);
  });
  $('answers').appendChild(wrap);
  $('nextBtn').textContent = 'Kiểm tra';
  $('nextBtn').disabled = true;
  $('nextBtn').onclick = () => checkMatch();
}

function checkMatch() {
  if (game.locked) return;
  game.locked = true;
  let points = 0;
  const lines = [];
  MATCH.forEach((block, bi) => {
    const rows = $('answers').querySelectorAll('.match-block')[bi].querySelectorAll('.mrow');
    block.rows.forEach((r, ri) => {
      const sel = rows[ri].querySelector('select');
      const ok = game.matchPicks[bi][ri] === r.right;
      if (ok) points++;
      sel.disabled = true;
      sel.classList.add(ok ? 'ok' : 'no');
      lines.push(`<p class="qhelp" style="margin:8px 0 0"><b>${ok ? 'Đúng' : 'Chưa đúng'} — ${r.left}:</b> ${r.why}</p>`);
    });
  });
  game.score += points;
  feedback(points === MATCH[0].rows.length, `${points}/${MATCH[0].rows.length} cặp đúng`, 'Ô xanh là cặp đúng, ô đỏ là cặp chưa đúng.');
  $('feedback').insertAdjacentHTML('beforeend', lines.join(''));
  setProgress(totalPoints());
  $('nextBtn').textContent = 'Xem kết quả';
  $('nextBtn').disabled = false;
  $('nextBtn').onclick = () => advance();
}

function feedback(ok, title, text) {
  const fb = $('feedback');
  if (!fb) return;
  fb.className = `feedback on ${ok ? 'ok' : 'bad'}`;
  fb.innerHTML = `<strong>${title}</strong><span>${text}</span>`;
}

function advance() {
  game.step++;
  if (game.step >= game.steps.length) return finish();
  renderStep();
}

function finish() {
  $('stageNormal').hidden = true;
  $('stageResult').hidden = false;
  setRound(4);
  const total = totalPoints();
  game.score = Math.round(game.score * 10) / 10;
  $('finalScore').textContent = game.score;
  const pct = (game.score / total) * 100;
  $('resultTitle').textContent = game.score === total ? 'Đúng toàn bộ!' : pct >= 70 ? 'Nắm bài tốt' : 'Cần xem lại một chút';
  $('resultMessage').textContent = game.score === total
    ? 'Bạn đã trả lời đúng cả ' + total + ' điểm. Giờ hãy thử giải thích lại bằng lời của mình: vì sao Đông Nam Bộ dẫn đầu và vì sao Trung du và miền núi phía Bắc còn thấp?'
    : 'Đọc lại trang Nhận xét và Giải thích, rồi bấm “Làm lại” để thử lần nữa.';
  setProgress(total);
}

function resetGame() {
  game.step = 0; game.score = 0; game.locked = false;
  $('stageNormal').hidden = false;
  $('stageResult').hidden = true;
  $('nextBtn').textContent = 'Tiếp tục';
  $('nextBtn').onclick = () => advance();
  setProgress(0);
  renderStep();
}

/* ---------------------------------------------------------
   9. HIỂN THỊ THEO TRANG
   --------------------------------------------------------- */
let observed = false;
function observeReveals() {
  const els = document.querySelectorAll('.reveal:not(.in)');
  if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('in')); return; }
  if (!observed) {
    observed = true;
    window.__io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        window.__io.unobserve(e.target);
      });
    }, { threshold: 0.12 });
  }
  els.forEach((el) => window.__io.observe(el));
}

function onPageShown(id) {
  if (id === 'bieu-do') {
    renderYearRail();
    renderPlot(true, null);
    if (state.open) renderDetail(state.open);
  }
  if (id === 'viec-lam') {
    animateDemand();
    animateDonut();
    animateMeter();
  }
  observeReveals();
}

/* ---------------------------------------------------------
   10. KHỞI TẠO
   --------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const y = Number(params.get('nam'));
  if (DATA.years.includes(y)) state.year = y;

  renderMini();
  const src = $('chartSrc');
  if (src) src.innerHTML = `<b>Nguồn:</b> ${DATA.source}`;

  $('againBtn') && $('againBtn').addEventListener('click', resetGame);

  document.querySelectorAll('[data-open]').forEach((chip) => {
    chip.addEventListener('click', () => {
      const key = chip.dataset.open;
      const go = () => {
        state.year = DATA.years[DATA.years.length - 1];
        renderYearRail();
        openRegion(key, true);
      };
      if (isSingle() && location.hash !== '#bieu-do') { location.hash = 'bieu-do'; window.setTimeout(go, 120); }
      else if (location.pathname.includes('bieu-do')) go();
      else location.href = `bieu-do.html?vung=${key}#detail`;
    });
  });

  const vung = params.get('vung');
  renderDemand();
  initRouting();
  if (vung && DATA.regions.some((r) => r.key === vung)) {
    state.year = DATA.years[DATA.years.length - 1];
    if ($('plot')) openRegion(vung, false);
  }

  if ($('stageNormal')) resetGame();
});




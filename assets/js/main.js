
(function () {
  const MOBILE_MQ = window.matchMedia('(max-width: 767px)');
  const header = document.querySelector('.site-header');
  const navWrap = document.querySelector('.nav-wrap');
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');

  function placeMenu() {
    if (!menu || !navWrap) return;
    if (MOBILE_MQ.matches) {
      if (menu.parentElement !== document.body) {
        document.body.appendChild(menu);
      }
    } else {
      setMenuOpen(false);
      if (menu.parentElement !== navWrap) {
        navWrap.appendChild(menu);
      }
    }
  }

  function setMenuOpen(open) {
    if (!toggle || !menu) return;
    if (!MOBILE_MQ.matches) {
      open = false;
    }
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
    if (backdrop) {
      backdrop.classList.toggle('is-visible', open);
      backdrop.hidden = !open;
    }
    if (open) {
      menu.querySelector('[data-menu-close]')?.focus({ preventScroll: true });
    }
  }

  let backdrop = document.querySelector('[data-menu-backdrop]');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'menu-backdrop';
    backdrop.setAttribute('data-menu-backdrop', '');
    backdrop.hidden = true;
    document.body.appendChild(backdrop);
  }

  placeMenu();
  MOBILE_MQ.addEventListener('change', placeMenu);

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      if (!MOBILE_MQ.matches) return;
      setMenuOpen(!menu.classList.contains('is-open'));
    });
    backdrop.addEventListener('click', () => setMenuOpen(false));
    menu.querySelector('[data-menu-close]')?.addEventListener('click', () => setMenuOpen(false));
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    });
  }

  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  document.querySelectorAll('[data-current-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll('[data-contact-form]').forEach((form) => {
    const inquiry = form.querySelector('[data-inquiry-type]');
    const umbrellaPanel = form.querySelector('[data-umbrella-fields]');
    const quantity = form.querySelector('[data-quantity-field]');
    const upload = form.querySelector('[data-design-upload]');

    function sync() {
      if (!inquiry || !umbrellaPanel) return;
      const needUmbrella = inquiry.value === 'umbrella' || inquiry.value === 'payung';
      umbrellaPanel.classList.toggle('hidden', !needUmbrella);
      if (quantity) {
        quantity.required = needUmbrella;
        if (!needUmbrella) quantity.value = '';
      }
      if (upload && !needUmbrella) upload.value = '';
    }

    if (inquiry) {
      inquiry.addEventListener('change', sync);
      sync();
    }
  });
})();

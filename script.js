// Плавное появление hero и секций + navbar scroll + mobile menu
document.addEventListener('DOMContentLoaded', () => {
  // Hero reveal
  const hero = document.querySelector('.hero');
  setTimeout(()=> hero && hero.classList.add('revealed'), 120);

  // Navbar scroll change
  const navbar = document.querySelector('.navbar');
  const onScroll = () => {
    if (window.scrollY > 40) navbar && navbar.classList.add('scrolled');
    else navbar && navbar.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});

  // IntersectionObserver для блоков .content (reveal on scroll)
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.content').forEach(el => io.observe(el));

  // Mobile hamburger toggle
  const hamb = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamb && mobileMenu) {
    hamb.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      // animate bars
      hamb.classList.toggle('active');
      if (mobileMenu.classList.contains('open')) {
        mobileMenu.style.display = 'block';
      } else {
        mobileMenu.style.display = 'none';
      }
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', (ev) => {
    if (!mobileMenu || !hamb) return;
    const target = ev.target;
    if (!mobileMenu.contains(target) && !hamb.contains(target) && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      mobileMenu.style.display = 'none';
      hamb.classList.remove('active');
    }
  });
});

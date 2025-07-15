const translations = {
  fr: {
    accueil: "Accueil",
    produits: "Produits",
    contact: "Contact",
    explore: "Explorez l'univers Zé-Ham",
    modelBtn: "Voir modèle",
    price: "60 dt",
  },
  en: {
    accueil: "Home",
    produits: "Products",
    contact: "Contact",
    explore: "Explore the world of Zé-Ham",
    modelBtn: "View model",
    price: "60 TND",
  }
};

function applyLanguage(lang) {
  const t = translations[lang];

  // Traduire les liens de navigation
  document.querySelectorAll('nav a')[0].textContent = t.accueil;
  document.querySelectorAll('nav a')[1].textContent = t.produits;
  document.querySelectorAll('nav a')[2].textContent = t.contact;

  // Traduire la sidebar
  document.querySelector('#sidebarTitle').textContent = lang === 'fr' ? "Menu" : "Menu";
  document.querySelectorAll('.sidebar-menu a')[0].innerHTML = `<i class="fas fa-home"></i> ${t.accueil}`;
  document.querySelectorAll('.sidebar-menu a')[1].innerHTML = `<i class="fas fa-tshirt"></i> ${t.produits}`;
  document.querySelectorAll('.sidebar-menu a')[2].innerHTML = `<i class="fas fa-envelope"></i> ${t.contact}`;

  // Traduire le texte principal
  const caption = document.querySelector('.fixed-caption');
  if (caption) caption.textContent = t.explore;

  // Traduire les boutons produits
  document.querySelectorAll('.product button').forEach(btn => {
    btn.textContent = t.modelBtn;
  });

  // Stocker la langue choisie
  localStorage.setItem('lang', lang);
}

// Language Selector Logic
function toggleLanguageOptions(event) {
    event.stopPropagation(); // Prevent document click from immediately closing
    const languageOptions = document.getElementById('languageOptions');
    if (languageOptions) {
        languageOptions.classList.toggle('show');
    }
}

function selectLanguage(lang, element) {
    const selected = document.querySelector('.language-selector .selected');
    const languageOptions = document.getElementById('languageOptions');

    if (selected && languageOptions) {
        selected.innerHTML = element.innerHTML;
        document.querySelectorAll('#languageOptions li').forEach(li => li.classList.remove('active'));
        element.classList.add('active');
        languageOptions.classList.remove('show');
        console.log('Langue sélectionnée:', lang);
        // You would typically store the selected language in localStorage or a global variable
        // and re-render content based on it here.
    }
}

// Function to close language dropdown if clicked outside
document.addEventListener('click', function(event) {
    const languageSelector = document.querySelector('.language-selector');
    const languageOptions = document.getElementById('languageOptions');
    if (languageSelector && languageOptions && !languageSelector.contains(event.target)) {
        languageOptions.classList.remove('show');
    }
});

// Sidebar Logic
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
const navbarTitle = document.getElementById('navbarTitle');
const sidebarTitle = document.getElementById('sidebarTitle');

if (sidebarToggle && sidebar && navbarTitle && sidebarTitle) { // Ensure all elements exist
    sidebarToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the document click listener from closing it immediately
        sidebar.classList.toggle('active');
        document.body.classList.toggle('sidebar-active');
        
        // Toggle "Zé-Ham" visibility and sidebar title on small screens
        if (window.innerWidth <= 830) {
            if (sidebar.classList.contains('active')) {
                navbarTitle.style.display = 'none'; // Hide navbar Zé-Ham
                sidebarTitle.textContent = 'Zé-Ham'; // Change sidebar title to Zé-Ham
            } else {
                navbarTitle.style.display = 'block'; // Show navbar Zé-Ham
                sidebarTitle.textContent = 'Menu'; // Change sidebar title back to Menu
            }
        }
    });
}

// Close sidebar when clicking outside (only on small screens where sidebar is active)
document.addEventListener('click', (e) => {
    // Check if click is outside sidebar and toggle button, and sidebar is active
    if (window.innerWidth <= 830 && sidebar && sidebarToggle && sidebar.classList.contains('active') && !sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
        sidebar.classList.remove('active');
        document.body.classList.remove('sidebar-active');
        // Revert changes when sidebar closes
        if (navbarTitle) navbarTitle.style.display = 'block'; // Show navbar Zé-Ham
        if (sidebarTitle) sidebarTitle.textContent = 'Menu'; // Change sidebar title back to Menu
    }
});

// Close sidebar when a link is clicked inside it
if (sidebarLinks.length > 0 && sidebar && navbarTitle && sidebarTitle) {
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 830) {
                sidebar.classList.remove('active');
                document.body.classList.remove('sidebar-active');
                // Revert changes when sidebar closes
                if (navbarTitle) navbarTitle.style.display = 'block'; // Show navbar Zé-Ham
                if (sidebarTitle) sidebarTitle.textContent = 'Menu'; // Change sidebar title back to Menu
            }
        });
    });
}


// Adjust body margin on resize and handle Zé-Ham visibility for desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 830) {
        if (sidebar) sidebar.classList.remove('active');
        document.body.classList.remove('sidebar-active');
        if (navbarTitle) navbarTitle.style.display = 'block'; // Ensure navbar Zé-Ham is visible on desktop
        if (sidebarTitle) sidebarTitle.textContent = 'Menu'; // Ensure sidebar title is "Menu" on desktop
    } else {
        // When resizing to small screen and sidebar is active, hide navbar Zé-Ham
        if (sidebar && sidebar.classList.contains('active')) {
            if (navbarTitle) navbarTitle.style.display = 'none';
            if (sidebarTitle) sidebarTitle.textContent = 'Zé-Ham';
        } else {
            if (navbarTitle) navbarTitle.style.display = 'block'; // Ensure it's visible if sidebar is closed
            if (sidebarTitle) sidebarTitle.textContent = 'Menu';
        }
    }
});

// --- Attach event listeners after the header content is loaded ---
// This part is crucial as it runs AFTER header.html is injected into the DOM

// Attach click listener for language selection
const selectedLanguageDiv = document.querySelector('.language-selector .selected');
if (selectedLanguageDiv) {
    selectedLanguageDiv.addEventListener('click', toggleLanguageOptions);
}

// Attach click listeners for language options
const languageOptionLis = document.querySelectorAll('#languageOptions li');
if (languageOptionLis.length > 0) {
    languageOptionLis.forEach(li => {
        const lang = li.dataset.lang; // Use data-lang attribute to get language code
        li.addEventListener('click', function() {
            selectLanguage(lang, this);
        });
    });
}
document.addEventListener("DOMContentLoaded", function () {
  const languageSelector = document.querySelector('.language-selector');
  const selected = languageSelector.querySelector('.selected');
  const options = document.getElementById('languageOptions');

  selected.addEventListener('click', () => {
    options.classList.toggle('show');
  });

  options.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', () => {
      const lang = item.getAttribute('data-lang');

      // Changer le texte du bouton
      selected.querySelector('span').textContent = lang === 'fr' ? 'Fr' : 'En';
      selected.querySelector('img').src = item.querySelector('img').src;

      // Appliquer la langue
      applyLanguage(lang);

      // Fermer le menu
      options.classList.remove('show');
    });
  });
});

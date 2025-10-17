const sections = document.querySelectorAll('section');
const linksNav = document.querySelectorAll('.navigation a');
const header = document.querySelector('header');
const btnHome = document.querySelector('.btn-home');
const menuIcon = document.querySelector('#menu-burger');
const nav = document.querySelector('.navigation');

const burgerActive = () => {
	menuIcon.classList.toggle('bx-x');
	nav.classList.toggle('active');
}

const scrollActive = () => {
	sections.forEach(section => {
		let top = window.scrollY;
		let offset = section.offsetTop - 150;
		let height = section.offsetHeight;
		let id = section.getAttribute('id');

		if(top > offset && top < offset + height) {
			linksNav.forEach(links => {
				links.classList.remove('active');
				document.querySelector(`.navigation a[href*=${id}]`).classList.add('active');
			})
		}
	})
	header.classList.toggle('sticky', window.scrollY > 100);
    btnHome.classList.toggle('btnDisplay', window.scrollY > 150);
    menuIcon.classList.remove('bx-x');
    nav.classList.remove('active');
}

ScrollReveal({
	reset: true,
	distance: '80px',
	duration: 2000,
	delay: 200
});

ScrollReveal().reveal('.home-content, .section-title',{origin: 'top'})
ScrollReveal().reveal('.home-img, .services-content, .portfolio-box, .contact-form, .container',{origin: 'bottom'})
ScrollReveal().reveal('.home-content h1, .about-img',{origin: 'left'})
ScrollReveal().reveal('.home-content p, .about-content',{origin: 'right'})


const typed = new Typed('.multiple', {
	strings: ["Développeur", "Web Designer"],
	typeSpeed: 100,
	backSpeed: 100,
	backDelay: 1000,
	loop: true
})

menuIcon.addEventListener('click', burgerActive);
window.addEventListener('scroll', scrollActive);


// ------------------------------------------------
// ✅ LIGHTBOX / FULLSCREEN IMAGE SYSTEM AVEC GALERIE
// ------------------------------------------------

// Crée dynamiquement le lightbox dans le DOM
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.innerHTML = `
    <span class="close-btn">&times;</span>
    <button class="prev-btn">&#10094;</button>
    <img id="lightbox-img" src="" alt="">
    <button class="next-btn">&#10095;</button>
    <div class="image-counter"></div>
`;
document.body.appendChild(lightbox);

// Variables pour gérer la galerie
let currentImageIndex = 0;
let galleryImages = [];

// Récupère toutes les images du carrousel
function loadGalleryImages() {
    const carouselImages = document.querySelectorAll('#carouselExampleControls .carousel-item img');
    galleryImages = Array.from(carouselImages).map(img => ({
        src: img.src,
        alt: img.alt
    }));
}

// Fonction pour afficher l'image à l'index donné
function showImage(index) {
    if (galleryImages.length === 0) return;
    
    // Assurer que l'index reste dans les limites
    if (index < 0) index = galleryImages.length - 1;
    if (index >= galleryImages.length) index = 0;
    
    currentImageIndex = index;
    
    const lightboxImg = document.getElementById("lightbox-img");
    lightboxImg.src = galleryImages[index].src;
    lightboxImg.alt = galleryImages[index].alt;
    
    // Mettre à jour le compteur
    const counter = lightbox.querySelector('.image-counter');
    counter.textContent = `${index + 1} / ${galleryImages.length}`;
}

// Fonction pour ouvrir (modifiée)
function openFullScreen(src) {
    // Charger les images si ce n'est pas déjà fait
    if (galleryImages.length === 0) {
        loadGalleryImages();
    }
    
    // Trouver l'index de l'image cliquée
    currentImageIndex = galleryImages.findIndex(img => img.src === src);
    if (currentImageIndex === -1) currentImageIndex = 0;
    
    showImage(currentImageIndex);
    lightbox.style.display = "flex";
}

// Fonction pour fermer
function closeFullScreen() {
    lightbox.style.display = "none";
}

// Navigation suivant
function nextImage() {
    showImage(currentImageIndex + 1);
}

// Navigation précédent
function prevImage() {
    showImage(currentImageIndex - 1);
}

// Gestion des événements
lightbox.addEventListener('click', (e) => {
    if (e.target !== document.getElementById("lightbox-img") && 
        !e.target.classList.contains('prev-btn') && 
        !e.target.classList.contains('next-btn')) {
        closeFullScreen();
    }
});

// Boutons de navigation
lightbox.querySelector('.prev-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    prevImage();
});

lightbox.querySelector('.next-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    nextImage();
});

// Navigation au clavier
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeFullScreen();
    }
});

// Charger les images au chargement de la page
window.addEventListener('load', loadGalleryImages);

console.log("Merci 'la minute code' pour ce tuto https://www.youtube.com/watch?v=BY9-dXbX09E");
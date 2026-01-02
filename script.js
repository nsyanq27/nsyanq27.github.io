/* ==================== PRELOADER (FIXED: CEPAT HILANG) ==================== */
const preloader = document.getElementById('preloader');
const toast = document.getElementById('toast');

// Fungsi untuk menghilangkan loader
function removePreloader() {
    if (preloader.style.display !== 'none') {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            // Munculkan pesan selamat datang (Toast)
            toast.className = "show";
            setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
        }, 500);
    }
}

// 1. Hilang saat halaman selesai loading (Normal)
window.addEventListener('load', removePreloader);

// 2. FITUR BARU: PAKSA HILANG DALAM 2 DETIK (Biar ga kelamaan nunggu sinyal)
setTimeout(removePreloader, 2000); 


/* ==================== THEME LIGHT/DARK TOGGLE ==================== */
const modeIcon = document.getElementById('mode-icon');
const body = document.body;

if(localStorage.getItem('theme') === 'light'){
    body.classList.add('light-mode');
    modeIcon.classList.replace('bx-sun', 'bx-moon');
}

function toggleLightMode() {
    body.classList.toggle('light-mode');
    if(body.classList.contains('light-mode')){
        modeIcon.classList.replace('bx-sun', 'bx-moon');
        localStorage.setItem('theme', 'light');
    } else {
        modeIcon.classList.replace('bx-moon', 'bx-sun');
        localStorage.setItem('theme', 'dark');
    }
}

/* ==================== GOOGLE TRANSLATE SETUP ==================== */
function setLanguage(lang) {
    document.cookie = "googtrans=/auto/" + lang;
    location.reload();
}
function checkLanguage() {
    const cookies = document.cookie.split(';');
    let currentLang = 'en'; 
    for(let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf('googtrans=') == 0) {
            let val = c.substring('googtrans='.length, c.length);
            if (val.includes('/id')) currentLang = 'id';
            break;
        }
    }
    document.getElementById('btn-en').classList.remove('active');
    document.getElementById('btn-id').classList.remove('active');
    document.getElementById('btn-' + currentLang).classList.add('active');
}
checkLanguage();

/* ==================== THEME COLOR SWITCHER ==================== */
function setColor(color) {
    document.documentElement.style.setProperty('--main-color', color);
}

/* ==================== SCROLL REVEAL ANIMATION ==================== */
const sr = ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
    reset: false 
});

sr.reveal('.home-content, .heading', { origin: 'top' });
sr.reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
sr.reveal('.home-content h1, .about-img, .education-container', { origin: 'left' });
sr.reveal('.home-content p, .about-content', { origin: 'right' });
sr.reveal('.skill-box', { interval: 100 }); 

/* ==================== TYPING EFFECT ==================== */
const typed = new Typed('.multiple-text', {
    strings: ['Graphic Design', 'Social Media Specialist', 'UI/UX Design', 'Front-End Developer', 'Game-Based Learning App'],
    typeSpeed: 100, backSpeed: 100, backDelay: 1000, loop: true
});

/* ==================== CURSOR TRAIL ==================== */
const trail = document.getElementById('cursor-trail');
window.addEventListener('mousemove', function(e) {
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    trail.style.opacity = 1;
    setTimeout(() => { trail.style.opacity = 0; }, 200);
});

/* ==================== NUMBER COUNTER ANIMATION ==================== */
const counters = document.querySelectorAll('.counter');
const speed = 200; 
const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};
let counterActivated = false;
window.addEventListener('scroll', () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const position = aboutSection.getBoundingClientRect().top;
        if(position < window.innerHeight / 1.5 && !counterActivated) {
            animateCounters();
            counterActivated = true;
        }
    }
});

/* ==================== SCROLL TOP & PROGRESS ==================== */
const progressPath = document.querySelector('.progress-wrap-btn path');
const pathLength = progressPath.getTotalLength();
progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
progressPath.style.strokeDashoffset = pathLength;
progressPath.getBoundingClientRect();
progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
const updateProgress = function () {
    const scroll = window.pageYOffset;
    const height = document.body.scrollHeight - window.innerHeight;
    const progress = pathLength - (scroll * pathLength / height);
    progressPath.style.strokeDashoffset = progress;
}
updateProgress();
window.addEventListener('scroll', updateProgress);
const progressWrap = document.querySelector('.progress-wrap-btn');
window.addEventListener('scroll', function () {
    if (window.pageYOffset > 50) { progressWrap.classList.add('active-progress'); } else { progressWrap.classList.remove('active-progress'); }
});
progressWrap.addEventListener('click', function (event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ==================== SCROLL PROGRESS BAR ==================== */
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    scrollProgress.style.width = progress + "%";
});

/* ==================== CONFETTI EFFECT ==================== */
const sendBtn = document.getElementById('send-btn');
if(sendBtn) {
    sendBtn.addEventListener('click', (e) => {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    });
}

/* ==================== CLICK SOUND EFFECT ==================== */
const audio = document.getElementById("clickSound");
const clickableElements = document.querySelectorAll('a, button, .portfolio-box, .skill-box, .journey-thumb, .cert-card');
clickableElements.forEach(el => {
    el.addEventListener('click', () => {
        audio.currentTime = 0; audio.play();
    });
});

/* ==================== NAVBAR TOGGLE ==================== */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/* ==================== PORTFOLIO FILTER ==================== */
const filterButtons = document.querySelectorAll('.filter-item');
const portfolioItems = document.querySelectorAll('.portfolio-box');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        let dataFilter = button.getAttribute('data-filter');
        portfolioItems.forEach(item => {
            if(dataFilter === 'all' || item.classList.contains(dataFilter)) {
                item.classList.remove('hide');
                item.style.display = 'flex';
            } else {
                item.classList.add('hide');
                item.style.display = 'none';
            }
        });
    });
});

/* ==================== UNIVERSAL 3D TILT EFFECT ==================== */
const tiltElements = document.querySelectorAll('.tilt-3d, .tilt-card');
tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xCenter = rect.width / 2;
        const yCenter = rect.height / 2;
        
        const rotateX = ((y - yCenter) / yCenter) * -10; // Max rotation 10deg
        const rotateY = ((x - xCenter) / xCenter) * 10;

        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
});

/* ==================== MAGNETIC BUTTONS ==================== */
const magneticBtns = document.querySelectorAll('.magnetic-btn');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', function(e){
        const x = e.pageX - (btn.getBoundingClientRect().left + window.scrollX);
        const y = e.pageY - (btn.getBoundingClientRect().top + window.scrollY);
        const btnWidth = btn.offsetWidth;
        const btnHeight = btn.offsetHeight;
        
        const transX = (x - btnWidth / 2);
        const transY = (y - btnHeight / 2);
        
        this.style.transform = `translate(${transX * 0.3}px, ${transY * 0.3}px)`;
    });
    btn.addEventListener('mouseout', function(){
        this.style.transform = '';
    });
});

/* ==================== CUSTOM CONTEXT MENU ==================== */
const contextMenu = document.getElementById("context-menu");
const scope = document.querySelector("body");

scope.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    const { clientX: mouseX, clientY: mouseY } = event;
    
    contextMenu.style.top = `${mouseY}px`;
    contextMenu.style.left = `${mouseX}px`;
    
    contextMenu.classList.add("active");
});

scope.addEventListener("click", (e) => {
    if(e.target.offsetParent != contextMenu){
        contextMenu.classList.remove("active");
    }
});

/* ==================== TAB TITLE CHANGER ==================== */
let docTitle = document.title;
window.addEventListener("blur", () => {
    document.title = "Come back! 😭 | Neisya";
});
window.addEventListener("focus", () => {
    document.title = docTitle;
});

/* ==================== MODAL LOGIC & SLIDESHOW (UPDATED MANUAL ICON LINK) ==================== */
const modal = document.getElementById("cvModal");
const btn = document.getElementById("open-cv");
const span = document.getElementsByClassName("close-btn")[0];
if(btn) { btn.onclick = function(e) { e.preventDefault(); modal.style.display = "block"; } }
if(span) { span.onclick = function() { modal.style.display = "none"; } }

const portfolioModal = document.getElementById("portfolioModal");
const portfolioClose = document.getElementsByClassName("close-portfolio")[0];
const portfolioLinks = document.querySelectorAll(".portfolio-link");
const popupTitle = document.getElementById("popup-title");
const popupDesc = document.getElementById("popup-desc");
const slideshowContainer = document.getElementById("slideshow-container");
const techStackContainer = document.getElementById("tech-stack-icons"); 

const simpleImageModal = document.getElementById('simpleImageModal');
const simpleImage = document.getElementById('simpleImage');
const simpleClose = document.querySelector('.close-simple');

let slideIndex = 1;

window.plusSlides = function(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (slides.length === 0) return;
    
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[slideIndex-1].style.display = "block";  
}

// LOGIKA KLIK PORTFOLIO (LATEST PROJECT) - BACA LINK ICON MANUAL
portfolioLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const title = this.getAttribute('data-title');
        const desc = this.getAttribute('data-desc');
        const rawImg = this.getAttribute('data-img');
        // KITA BACA LINK DARI SINI:
        const rawTech = this.getAttribute('data-tech') || ""; 
        
        const imgArray = rawImg.split(',').map(item => item.trim());

        popupTitle.textContent = title;
        popupDesc.textContent = desc;

        // --- GENERATE SLIDESHOW ---
        let sliderHtml = "";
        if (imgArray.length > 1) {
            imgArray.forEach(imgSrc => {
                sliderHtml += `<div class="mySlides fade">`;
                if (imgSrc.toLowerCase().endsWith('.mp4')) {
                    sliderHtml += `
                        <video width="100%" height="100%" controls autoplay muted loop style="width:100%; height:100%; object-fit:cover;">
                            <source src="${imgSrc}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    `;
                } else {
                    sliderHtml += `<img src="${imgSrc}">`;
                }
                sliderHtml += `</div>`;
            });
            sliderHtml += `
                <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
                <a class="next" onclick="plusSlides(1)">&#10095;</a>
            `;
        } else {
            const singleSrc = imgArray[0];
            sliderHtml = `<div class="mySlides fade" style="display:block;">`;
            if (singleSrc.toLowerCase().endsWith('.mp4')) {
                sliderHtml += `
                    <video width="100%" height="100%" controls autoplay muted loop style="width:100%; height:100%; object-fit:cover;">
                        <source src="${singleSrc}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                `;
            } else {
                sliderHtml += `<img src="${singleSrc}">`;
            }
            sliderHtml += `</div>`;
        }
        slideshowContainer.innerHTML = sliderHtml;

        // --- GENERATE TECH ICONS DARI LINK MANUAL ---
        let techHtml = "";
        if(rawTech) {
            const techList = rawTech.split(',');
            techList.forEach(tech => {
                // Sekarang tech berisi link gambar (cth: img/logo/corel.png)
                // Kita buat tag IMG langsung
                techHtml += `<img src="${tech.trim()}" class="tech-logo" onerror="this.style.display='none'">`;
            });
        } else {
            techHtml = `<span style="font-size:12px; color:#aaa;">No software data</span>`;
        }
        techStackContainer.innerHTML = techHtml;
        
        // Reset Slide
        slideIndex = 1;
        if(imgArray.length > 1) { showSlides(1); }

        portfolioModal.style.display = "flex"; 
        portfolioModal.style.justifyContent = "center";
        portfolioModal.style.alignItems = "center";
    });
});

if(portfolioClose) { 
    portfolioClose.onclick = function() { 
        portfolioModal.style.display = "none"; 
        const videos = slideshowContainer.querySelectorAll('video');
        videos.forEach(video => video.pause());
    } 
}

if(simpleClose) {
    simpleClose.onclick = function() {
        simpleImageModal.style.display = "none";
    }
}

window.onclick = function(event) {
    if (event.target == modal) { modal.style.display = "none"; }
    if (event.target == portfolioModal) { 
        portfolioModal.style.display = "none"; 
        const videos = slideshowContainer.querySelectorAll('video');
        videos.forEach(video => video.pause());
    }
    if (event.target == simpleImageModal) { simpleImageModal.style.display = "none"; }
}

// LOGIKA KLIK IMAGE UNTUK ORGANISASI & SERTIFIKAT (SIMPLE MODAL - HANYA GAMBAR)
window.openImageModal = function(element) {
    const imgSrc = element.src;
    simpleImage.src = imgSrc;
    simpleImageModal.style.display = "flex";
}

/* ==================== COOKIE CONSENT ==================== */
const cookieContainer = document.querySelector(".cookie-container");
const cookieBtn = document.querySelector(".cookie-btn");
if(cookieBtn) {
    cookieBtn.addEventListener("click", () => {
        cookieContainer.classList.remove("active");
        localStorage.setItem("cookieBannerDisplayed", "true");
    });
}
setTimeout(() => {
    if (!localStorage.getItem("cookieBannerDisplayed")) {
        cookieContainer.classList.add("active");
    }
}, 2000);




/* ==================== LOGIKA SLIDER SERTIFIKAT (SIMPLE MODAL) ==================== */
let certImages = []; // Menyimpan daftar gambar
let certIndex = 0;   // Menyimpan posisi gambar saat ini

const simplePrevBtn = document.querySelector('.simple-prev');
const simpleNextBtn = document.querySelector('.simple-next');
const pageNum = document.getElementById('simple-page-num');

// Fungsi dipanggil saat Card Sertifikat diklik
function openCertModal(element) {
    const imgTag = element.querySelector('img');
    const rawSlides = imgTag.getAttribute('data-slides');
    
    // Reset modal
    simpleImageModal.style.display = "flex";
    simpleImageModal.style.flexDirection = "column"; // Biar page number di bawah gambar

    if (rawSlides) {
        // JIKA GAMBAR LEBIH DARI 1 (ADA DATA-SLIDES)
        certImages = rawSlides.split(',').map(s => s.trim());
        certIndex = 0; // Mulai dari gambar pertama
        
        // Tampilkan tombol navigasi
        simplePrevBtn.style.display = "block";
        simpleNextBtn.style.display = "block";
        
        // Load gambar pertama
        updateCertImage();
    } else {
        // JIKA GAMBAR CUMA 1 (NORMAL)
        simpleImage.src = imgTag.src;
        
        // Sembunyikan tombol navigasi
        simplePrevBtn.style.display = "none";
        simpleNextBtn.style.display = "none";
        pageNum.innerText = "";
    }
}

// Fungsi untuk Ganti Slide (Prev/Next)
function changeCertSlide(n) {
    certIndex += n;
    
    // Loop (Jika di akhir balik ke awal, dsb)
    if (certIndex >= certImages.length) {
        certIndex = 0;
    }
    if (certIndex < 0) {
        certIndex = certImages.length - 1;
    }
    
    updateCertImage();
}

// Update src gambar di modal
function updateCertImage() {
    simpleImage.style.opacity = 0; // Efek fade out dikit
    setTimeout(() => {
        simpleImage.src = certImages[certIndex];
        simpleImage.style.opacity = 1;
    }, 200);

    // Update tulisan halaman (Contoh: 1 / 2)
    if(pageNum) {
        pageNum.innerText = `${certIndex + 1} / ${certImages.length}`;
    }
}
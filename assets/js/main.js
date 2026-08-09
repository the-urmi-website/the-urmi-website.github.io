/*=========================================================
  THE URMI - MAIN.JS
=========================================================*/

"use strict";

/*=========================================================
  STICKY HEADER
=========================================================*/

const header = document.querySelector("header");

window.addEventListener("scroll", function () {

    if (window.scrollY > 60) {

        header.style.background = "rgba(255,255,255,.97)";
        header.style.boxShadow = "0 8px 25px rgba(0,0,0,.08)";

    } else {

        header.style.background = "rgba(255,255,255,.90)";
        header.style.boxShadow = "0 2px 20px rgba(0,0,0,.05)";

    }

});


/*=========================================================
  SMOOTH SCROLL
=========================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});


/*=========================================================
  FADE UP ANIMATION
=========================================================*/

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("fade-up");

        }

    });

}, {

    threshold: .15

});


document.querySelectorAll(

".room-card,.facility-card,.experience-card,.testimonial-card,.gallery-item,.why-card,.info-box"

).forEach(function (el) {

    observer.observe(el);

});


/*=========================================================
  GALLERY LIGHT EFFECT
=========================================================*/

document.querySelectorAll(".gallery-item img").forEach(function(img){

    img.addEventListener("mouseenter",function(){

        img.style.filter="brightness(85%)";

    });

    img.addEventListener("mouseleave",function(){

        img.style.filter="brightness(100%)";

    });

});


/*=========================================================
  COUNTER ANIMATION
=========================================================*/

const counters=document.querySelectorAll("[data-count]");

const counterObserver=new IntersectionObserver(function(entries){

entries.forEach(function(entry){

if(!entry.isIntersecting) return;

const counter=entry.target;

const target=+counter.dataset.count;

let count=0;

const speed=target/120;

const update=function(){

count+=speed;

if(count<target){

counter.innerText=Math.floor(count);

requestAnimationFrame(update);

}

else{

counter.innerText=target;

}

};

update();

counterObserver.unobserve(counter);

});

});

counters.forEach(function(counter){

counterObserver.observe(counter);

});


/*=========================================================
  ACTIVE MENU
=========================================================*/

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll("nav a");

window.addEventListener("scroll",function(){

let current="";

sections.forEach(function(section){

const top=section.offsetTop-120;

const height=section.clientHeight;

if(pageYOffset>=top){

current=section.getAttribute("id");

}

});

navLinks.forEach(function(link){

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});


/*=========================================================
  SCROLL TO TOP BUTTON
=========================================================*/

const topButton=document.createElement("button");

topButton.innerHTML="?";

topButton.id="scrollTop";

document.body.appendChild(topButton);

topButton.style.position="fixed";
topButton.style.right="25px";
topButton.style.bottom="25px";
topButton.style.width="48px";
topButton.style.height="48px";
topButton.style.border="none";
topButton.style.borderRadius="50%";
topButton.style.background="#8B6B3F";
topButton.style.color="#fff";
topButton.style.fontSize="22px";
topButton.style.cursor="pointer";
topButton.style.display="none";
topButton.style.zIndex="999";

window.addEventListener("scroll",function(){

if(window.scrollY>500){

topButton.style.display="block";

}

else{

topButton.style.display="none";

}

});

topButton.addEventListener("click",function(){

window.scrollTo({

top:0,

behavior:"smooth"

});

});



/*=========================================================
  CONTACT FORM
=========================================================*/

const contactForm=document.querySelector(".contact-form");

if(contactForm){

contactForm.addEventListener("submit",function(e){

e.preventDefault();

alert("Thank you! Your enquiry has been received.");

contactForm.reset();

});

}


/*=========================================================
  CURRENT YEAR
=========================================================*/

const year=document.getElementById("year");

if(year){

year.textContent=new Date().getFullYear();

}


/*=========================================================
  PRELOADER (OPTIONAL)
=========================================================*/

window.addEventListener("load",function(){

const preloader=document.getElementById("preloader");

if(preloader){

preloader.style.opacity="0";

setTimeout(function(){

preloader.remove();

},500);

}

});

/*=========================================================
  HERO SLIDER
=========================================================*/

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function showSlide(index){

    slides.forEach(function(slide){

        slide.classList.remove("active");

    });

    slides[index].classList.add("active");

}

function nextSlide(){

    currentSlide++;

    if(currentSlide >= slides.length){

        currentSlide = 0;

    }

    showSlide(currentSlide);

}

if(slides.length > 0){

    showSlide(0);

    setInterval(nextSlide,5000);

}


/*=========================================================
  HERO DOTS
=========================================================*/

const heroSlider=document.querySelector(".hero-slider");

if(heroSlider && slides.length>1){

const dots=document.createElement("div");

dots.className="hero-dots";

slides.forEach(function(slide,index){

const dot=document.createElement("span");

if(index===0){

dot.classList.add("active");

}

dot.addEventListener("click",function(){

currentSlide=index;

showSlide(currentSlide);

updateDots();

});

dots.appendChild(dot);

});

heroSlider.appendChild(dots);

}

function updateDots(){

const dots=document.querySelectorAll(".hero-dots span");

dots.forEach(function(dot){

dot.classList.remove("active");

});

if(dots[currentSlide]){

dots[currentSlide].classList.add("active");

}

}

setInterval(function(){

if(slides.length>1){

currentSlide++;

if(currentSlide>=slides.length){

currentSlide=0;

}

showSlide(currentSlide);

updateDots();

}

},5000);

/*=========================================================
  GALLERY LIGHTBOX
=========================================================*/

const galleryImages = document.querySelectorAll(".gallery-item img");

if (galleryImages.length > 0) {

    const lightbox = document.createElement("div");

    lightbox.className = "gallery-lightbox";

    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close">&times;</button>
        <img class="lightbox-image" src="" alt="Gallery Image">
    `;

    document.body.appendChild(lightbox);

    const lightboxImage =
        lightbox.querySelector(".lightbox-image");

    const closeButton =
        lightbox.querySelector(".lightbox-close");


    /* OPEN IMAGE */

    galleryImages.forEach(function(image) {

        image.addEventListener("click", function() {

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;

            lightbox.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });


    /* CLOSE BUTTON */

    closeButton.addEventListener("click", function() {

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

    });


    /* CLOSE BY CLICKING OUTSIDE IMAGE */

    lightbox.addEventListener("click", function(event) {

        if (event.target === lightbox) {

            lightbox.classList.remove("active");

            document.body.style.overflow = "";

        }

    });


    /* ESC KEY */

    document.addEventListener("keydown", function(event) {

        if (event.key === "Escape") {

            lightbox.classList.remove("active");

            document.body.style.overflow = "";

        }

    });

}

/*=========================================================
  END
=========================================================*/
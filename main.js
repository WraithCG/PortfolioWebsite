'use strict';

document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            populateData(data);
            // After data is populated, initialize the original event listeners
            initializeEventListeners();
        })
        .catch(error => console.error('Error fetching data:', error));
});

function populateData(data) {
    // --- Sidebar & General ---
    document.getElementById('favicon').href = data.personalInfo.favicon;
    document.getElementById('sidebar-avatar').src = data.personalInfo.avatar;
    document.getElementById('sidebar-name').textContent = data.personalInfo.name;
    document.getElementById('sidebar-name').title = data.personalInfo.name;
    document.getElementById('sidebar-title').textContent = data.personalInfo.title;

    // --- Contacts ---
    const contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = data.contacts.map(contact => `
        <li class="contact-item">
            <div class="icon-box"><ion-icon name="${contact.icon}"></ion-icon></div>
            <div class="contact-info">
                <p class="contact-title">${contact.title}</p>
                ${
                    contact.type === 'link' ? `<a href="${contact.link}" class="contact-link">${contact.value}</a>` :
                    contact.type === 'time' ? `<time datetime="${contact.datetime}">${contact.value}</time>` :
                    `<address>${contact.value}</address>`
                }
            </div>
        </li>
    `).join('');

    // --- Socials ---
    const socialList = document.getElementById('social-list');
    socialList.innerHTML = data.socials.map(social => `
        <li class="social-item"><a href="${social.link}" class="social-link"><ion-icon name="${social.icon}"></ion-icon></a></li>
    `).join('');

    // --- Navbar ---
    const navbarList = document.getElementById('navbar-list');
    navbarList.innerHTML = data.navigation.map((item, index) => `
        <li class="navbar-item"><button class="navbar-link ${index === 0 ? 'active' : ''}" data-nav-link>${item}</button></li>
    `).join('');

    // --- About Page ---
    document.getElementById('about-title').textContent = data.about.title;
    const aboutText = document.getElementById('about-text');
    aboutText.innerHTML = data.about.text.map(p => `<p>${p}</p>`).join('');

    // --- Services ---
    const servicesList = document.getElementById('services-list');
    servicesList.innerHTML = data.services.map(service => `
        <li class="service-item">
            <div class="service-icon-box"><img src="${service.icon}" alt="icon" width="40"></div>
            <div class="service-content-box">
                <h4 class="h4 service-item-title">${service.title}</h4>
                <p class="service-item-text">${service.text}</p>
            </div>
        </li>
    `).join('');
    
    // --- Testimonials ---
    const testimonialsList = document.getElementById('testimonials-list');
    testimonialsList.innerHTML = data.testimonials.map(testimonial => `
        <li class="testimonials-item">
            <div class="content-card" data-testimonials-item>
                <figure class="testimonials-avatar-box">
                    <img src="${testimonial.avatar}" alt="${testimonial.name}" data-testimonials-avatar width="60">
                </figure>
                <h4 class="h4 testimonials-item-title" data-testimonials-title>${testimonial.name}</h4>
                <div class="testimonials-text" data-testimonials-text><p>${testimonial.text}</p></div>
            </div>
        </li>
    `).join('');


    // --- Clients ---
    const clientsList = document.getElementById('clients-list');
    clientsList.innerHTML = data.clients.map(client => `
        <li class="clients-item"><a href="${client.link}"><img src="${client.logo}" alt="logo"></a></li>
    `).join('');
    
    // --- Resume Page: Education ---
    const educationList = document.getElementById('education-list');
    educationList.innerHTML = data.resume.education.map(edu => `
        <li class="timeline-item">
            <h4 class="h4 timeline-item-title">${edu.institution}</h4>
            <span>${edu.period}</span>
            <p class="timeline-text">${edu.description}</p>
        </li>
    `).join('');
    
    // --- Resume Page: Experience ---
    const experienceList = document.getElementById('experience-list');
    experienceList.innerHTML = data.resume.experience.map(exp => `
        <li class="timeline-item">
            <h4 class="h4 timeline-item-title">${exp.role}</h4>
            <span>${exp.period}</span>
            <p class="timeline-text">${exp.description}</p>
        </li>
    `).join('');

    // --- Resume Page: Skills ---
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = data.skills.map(skill => `
        <li class="skills-item">
            <div class="title-wrapper">
                <h5 class="h5">${skill.name}</h5>
                <data value="${skill.value}">${skill.value}%</data>
            </div>
            <div class="skills-progress-bg">
                <div class="skills-progress-fill" style="width: ${skill.value}%;"></div>
            </div>
        </li>
    `).join('');

    // --- Portfolio Page ---
    const filterList = document.getElementById('portfolio-filter-list');
    filterList.innerHTML = data.portfolio.categories.map((cat, index) => `
        <li class="filter-item"><button class="${index === 0 ? 'active' : ''}" data-filter-btn>${cat}</button></li>
    `).join('');
    
    const selectList = document.getElementById('portfolio-select-list');
    selectList.innerHTML = data.portfolio.categories.map(cat => `
        <li class="select-item"><button data-select-item>${cat}</button></li>
    `).join('');
    
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = data.portfolio.projects.map(proj => `
        <li class="project-item active" data-filter-item data-category="${proj.category.toLowerCase()}">
            <a href="${proj.link}">
                <figure class="project-img">
                    <div class="project-item-icon-box"><ion-icon name="eye-outline"></ion-icon></div>
                    <img src="${proj.image}" alt="${proj.title}" loading="lazy">
                </figure>
                <h3 class="project-title">${proj.title}</h3>
                <p class="project-category">${proj.category}</p>
            </a>
        </li>
    `).join('');

    // --- Blog Page ---
    const blogList = document.getElementById('blog-posts-list');
    blogList.innerHTML = data.blog.map(post => `
        <li class="blog-post-item">
            <a href="${post.link}">
                <figure class="blog-banner-box">
                    <img src="${post.image}" alt="${post.title}" loading="lazy">
                </figure>
                <div class="blog-content">
                    <div class="blog-meta">
                        <p class="blog-category">${post.category}</p>
                        <span class="dot"></span>
                        <time datetime="${post.date}">${new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                    </div>
                    <h3 class="h3 blog-item-title">${post.title}</h3>
                    <p class="blog-text">${post.text}</p>
                </div>
            </a>
        </li>
    `).join('');
    
    // --- Contact Page ---
    document.getElementById('map-iframe').src = data.contact.mapUrl;
}

function initializeEventListeners() {
    //Opening or closing side bar
    const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

    const sidebar = document.querySelector("[data-sidebar]");
    const sidebarBtn = document.querySelector("[data-sidebar-btn]");
    sidebarBtn.addEventListener("click", function() { elementToggleFunc(sidebar); });

    //Activating Modal-testimonial
    const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
    const modalContainer = document.querySelector('[data-modal-container]');
    const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
    const overlay = document.querySelector('[data-overlay]');

    const modalImg = document.querySelector('[data-modal-img]');
    const modalTitle = document.querySelector('[data-modal-title]');
    const modalText = document.querySelector('[data-modal-text]');
    const modalTime = document.querySelector('[data-modal-time]');

    const testimonialsModalFunc = function () {
        modalContainer.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    for (let i = 0; i < testimonialsItem.length; i++) {
        testimonialsItem[i].addEventListener('click', function () {
            modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
            modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
            modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
            modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;
            testimonialsModalFunc();
        });
    }

    //Activating close button in modal-testimonial
    modalCloseBtn.addEventListener('click', testimonialsModalFunc);
    overlay.addEventListener('click', testimonialsModalFunc);

    //Activating Filter Select and filtering options
    const select = document.querySelector('[data-select]');
    const selectItems = document.querySelectorAll('[data-select-item]');
    const selectValue = document.querySelector('[data-select-value]');
    const filterBtn = document.querySelectorAll('[data-filter-btn]');

    select.addEventListener('click', function () { elementToggleFunc(this); });

    for(let i = 0; i < selectItems.length; i++) {
        selectItems[i].addEventListener('click', function() {
            let selectedValue = this.innerText.toLowerCase();
            selectValue.innerText = this.innerText;
            elementToggleFunc(select);
            filterFunc(selectedValue);
        });
    }

    const filterItems = document.querySelectorAll('[data-filter-item]');

    const filterFunc = function (selectedValue) {
        for(let i = 0; i < filterItems.length; i++) {
            if(selectedValue === "all") {
                filterItems[i].classList.add('active');
            } else if (selectedValue === filterItems[i].dataset.category) {
                filterItems[i].classList.add('active');
            } else {
                filterItems[i].classList.remove('active');
            }
        }
    }

    //Enabling filter button for larger screens 
    let lastClickedBtn = filterBtn[0];

    for (let i = 0; i < filterBtn.length; i++) {
        filterBtn[i].addEventListener('click', function() {
            let selectedValue = this.innerText.toLowerCase();
            selectValue.innerText = this.innerText;
            filterFunc(selectedValue);

            lastClickedBtn.classList.remove('active');
            this.classList.add('active');
            lastClickedBtn = this;
        });
    }

    // Enabling Contact Form
    const form = document.querySelector('[data-form]');
    const formInputs = document.querySelectorAll('[data-form-input]');
    const formBtn = document.querySelector('[data-form-btn]');

    for(let i = 0; i < formInputs.length; i++) {
        formInputs[i].addEventListener('input', function () {
            if(form.checkValidity()) {
                formBtn.removeAttribute('disabled');
            } else { 
                formBtn.setAttribute('disabled', '');
            }
        });
    }

    // Enabling Page Navigation 
    const navigationLinks = document.querySelectorAll('[data-nav-link]');
    const pages = document.querySelectorAll('[data-page]');

    for(let i = 0; i < navigationLinks.length; i++) {
        navigationLinks[i].addEventListener('click', function() {
            for(let j = 0; j < pages.length; j++) {
                if(this.innerHTML.toLowerCase() === pages[j].dataset.page) {
                    pages[j].classList.add('active');
                    navigationLinks[j].classList.add('active');
                    window.scrollTo(0, 0);
                } else {
                    pages[j].classList.remove('active');
                    navigationLinks[j].classList.remove('active');
                }
            }
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            populatePage(data);
            initializeInteractivity(data);
        })
        .catch(error => console.error("Error loading portfolio data:", error));
});

function populatePage(data) {
    // Header
    document.getElementById('logo-container').innerHTML = `<a href="#"><span>${data.header.logo}</span>${data.header.name}</a>`;
    document.getElementById('nav-list').innerHTML = data.header.navLinks.map((link, index) => `<li><a href="${link.href}" class="${index === 0 ? 'active' : ''}"><i class="${link.icon}"></i>${link.text}</a></li>`).join('');

    // Home Section
    document.getElementById('home-info').innerHTML = `
        <h3 class="hello">Hello, my name is <span class="name">${data.home.name}</span></h3>
        <h3 class="profession">I'm a <span class="typing"></span></h3>
        <p>${data.home.description}</p>
        <div class="row"><div class="buttons padd-15"><a href="#contact" class="btn hire-me" data-section-index="4">Hire me!</a></div></div>`;
    
    // Social Card Integration
    const socialCardData = data.home.socialCard;
    if (socialCardData) {
        document.getElementById('home-img-container').innerHTML = `
            <div class="card">
                <img class="image" alt="Social Media Avatar" src="${socialCardData.imageUrl}" />
                <div class="heading">${socialCardData.heading}</div>
                <div class="icons">${socialCardData.socials.map(social => `<a class="${social.class}" href="${social.href}" target="_blank" rel="noopener noreferrer">${social.svg}</a>`).join('')}</div>
            </div>`;
    }

    // About Section
    document.getElementById('about-text').innerHTML = `<h3>I'm ${data.home.name} and <span>${data.about.specialty}</span></h3><p>${data.about.description}</p>`;
    document.getElementById('personal-info-container').innerHTML = data.about.personalInfo.map(item => `<div class="info-item padd-15"><p>${item.label}: <span>${item.value}</span></p></div>`).join('');
    document.getElementById('skills-container').innerHTML = data.about.skills.map(skill => `<div class="skill-item padd-15"><h5>${skill.name}</h5><div class="progress"><div class="progress-in" style="width: ${skill.percentage};"></div><div class="skill-percent">${skill.percentage}</div></div></div>`).join('');
    document.getElementById('education-timeline').innerHTML = data.about.education.map(item => `<div class="timeline-item"><div class="circle-dot"></div><h3 class="timeline-date"><i class="fa fa-calendar"></i> ${item.date}</h3><h4 class="timeline-title">${item.title}</h4><p class="timeline-text">${item.text}</p></div>`).join('');
    document.getElementById('experience-timeline').innerHTML = data.about.experience.map(item => `<div class="timeline-item"><div class="circle-dot"></div><h3 class="timeline-date"><i class="fa fa-calendar"></i> ${item.date}</h3><h4 class="timeline-title">${item.title}</h4><p class="timeline-text">${item.text}</p></div>`).join('');

    // Services Section
    document.getElementById('services-container').innerHTML = data.services.map(service => `<div class="service-item padd-15"><div class="service-item-inner"><div class="icon"><i class="${service.icon}"></i></div><h4>${service.title}</h4><p>${service.description}</p></div></div>`).join('');

    // Portfolio Section
    document.getElementById('portfolio-container').innerHTML = data.portfolio.map(item => `<div class="portfolio-item padd-15"><div class="portfolio-item-inner shadow-dark"><div class="portfolio-img"><img src="${item.imageUrl}" alt="portfolio image"></div></div></div>`).join('');

    // Contact Section
    document.getElementById('contact-title').textContent = data.contact.title;
    document.getElementById('contact-subtitle').textContent = data.contact.subtitle;
    document.getElementById('contact-info-container').innerHTML = data.contact.info.map(item => `<div class="contact-info-item padd-15"><div class="icon"><i class="${item.icon}"></i></div><h4>${item.title}</h4><p>${item.data}</p></div>`).join('');
    document.getElementById('contact-form-title').textContent = data.contact.formTitle;
    document.getElementById('contact-form-subtitle').textContent = data.contact.formSubtitle;
}

function initializeInteractivity(data) {
    // Typing animation using data from JSON
    if (data.home.professions && data.home.professions.length > 0) {
        new Typed(".typing", { strings: data.home.professions, typeSpeed: 100, backSpeed: 60, loop: true });
    }

    // Aside navigation logic
    const nav = document.querySelector(".nav"), navList = nav.querySelectorAll("li"), totalNavList = navList.length, allSection = document.querySelectorAll(".section"), totalSection = allSection.length;
    for (let i = 0; i < totalNavList; i++) {
        const a = navList[i].querySelector("a");
        a.addEventListener("click", function() {
            removeBackSection();
            for (let j = 0; j < totalNavList; j++) {
                if (navList[j].querySelector("a").classList.contains("active")) addBackSection(j);
                navList[j].querySelector("a").classList.remove("active");
            }
            this.classList.add("active");
            showSection(this);
            if (window.innerWidth < 1200) asideSectionTogglerBtn();
        });
    }

    function showSection(element) {
        for (let i = 0; i < totalSection; i++) allSection[i].classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        document.querySelector("#" + target).classList.add("active");
    }
    function removeBackSection() { for (let i = 0; i < totalSection; i++) allSection[i].classList.remove("back-section"); }
    function addBackSection(num) { allSection[num].classList.add("back-section"); }
    function updateNav(element) {
        for (let i = 0; i < totalNavList; i++) {
            navList[i].querySelector("a").classList.remove("active");
            const target = element.getAttribute("href").split("#")[1];
            if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) navList[i].querySelector("a").classList.add("active");
        }
    }

    document.querySelector(".hire-me").addEventListener("click", function() {
        const sectionIndex = this.getAttribute("data-section-index");
        showSection(this);
        updateNav(this);
        removeBackSection();
        addBackSection(sectionIndex);
    });

    const navTogglerBtn = document.querySelector(".nav-toggler"), aside = document.querySelector(".aside");
    navTogglerBtn.addEventListener("click", () => asideSectionTogglerBtn());
    function asideSectionTogglerBtn() {
        aside.classList.toggle("open");
        navTogglerBtn.classList.toggle("open");
        for (let i = 0; i < totalSection; i++) allSection[i].classList.toggle("open");
    }

    // Style Switcher Logic
    document.querySelector(".style-switcher .s-icon").addEventListener("click", () => document.querySelector(".style-switcher").classList.toggle("open"));
    window.addEventListener("scroll", () => { if (document.querySelector(".style-switcher").classList.contains("open")) document.querySelector(".style-switcher").classList.remove("open"); });
    const alternateStyles = document.querySelectorAll(".alternate-style");
    window.setActiveStyle = function(color) {
        alternateStyles.forEach((style) => {
            if (color === style.getAttribute("title")) style.removeAttribute("disabled");
            else style.setAttribute("disabled", "true");
        });
    }
    const dayNight = document.querySelector(".day-night");
    dayNight.addEventListener("click", () => {
        dayNight.querySelector("i").classList.toggle("fa-sun");
        dayNight.querySelector("i").classList.toggle("fa-moon");
        document.body.classList.toggle("dark");
    });
    window.addEventListener("load", () => {
        if (document.body.classList.contains("dark")) dayNight.querySelector("i").classList.add("fa-sun");
        else dayNight.querySelector("i").classList.add("fa-moon");
    });
}

/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


// Scroll to up on upScroll click
let upScroll = document.querySelector("#upScroll");
window.addEventListener('scroll', function(e) {
    if (window.scrollY >= 100)
      upScroll.style.display = "block";
    else 
    upScroll.style.display = "none";
});

upScroll.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
  });

//toggle Menu in mobile
document.querySelector("#toggleMenu").addEventListener('click', function() {
        
    let navToggle = document.querySelector("#navbarList");
        navToggle.classList.toggle("toggleClass");
     
});


//Global Variables
let mainContent = document.querySelector("#mainContent")
let allSections = document.querySelectorAll("section");
let navList  = document.querySelector('#navbarList'); 
let SectionFragment = document.createDocumentFragment();
let navFragment = document.createDocumentFragment();
let addBtn = document.querySelector("#addNewSection");
let allLinks =document.querySelectorAll("#navbarList li.menu__link a");
let sectionsNum=allSections.length;
let Sect = document.querySelector("section");
let activLink =document.querySelector("#navbarList li a");
let navLinkClick = document.querySelector(".navLink");
const sectionPragFr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus'+
    'faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget' +
    'lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt.' +
    'Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu' +
    'augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam' +
    'porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit.' +
    'Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.' ;
    const sectionPragSt='Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida,'+
     'ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu,'+
     ' vitae rhoncus purus. Vestibulum fermentum consectetur porttitor.'+
     ' Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.';
// build the nav

allSections.forEach(function (section) {
    const navlistElement = `<li class='menu__link'><a class='nav-link'  href='#${section.id}'>${section.dataset.nav}</a></li>`;
    navList.insertAdjacentHTML('beforeend', navlistElement);
  });

// Scroll to section on link click
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: "smooth", 
        block: "start", 
        inline: "start"
        
      });
     
     
  });
});



// Main Functions
for (let i=0;i<allSections.length;i++){
    function addSection(i) {
       let secContent = document.createElement("section"); //cearte section
       secContent.setAttribute("id", "section-" + i);
       secContent.setAttribute("data-nav","section" +" " +i);
           let divContent = document.createElement("div"); //cearte div
           divContent.setAttribute("class", "landing__container");
           let headerTitel = document.createElement("h2"); //cearte header for section 
           let textNodeheaderTitel = document.createTextNode("Section" +" "+ i);
           headerTitel.appendChild(textNodeheaderTitel);
           let paragraphContent1 = document.createElement("p");//cearte paragraph
           let paragraphContent2 = document.createElement("p");//cearte paragraph
           let textNodparagraphContent1 = document.createTextNode(sectionPragFr);
           let textNodparagraphContent2 = document.createTextNode(sectionPragSt);
           paragraphContent1.appendChild(textNodparagraphContent1);
           paragraphContent2.appendChild(textNodparagraphContent2);
           divContent.appendChild(headerTitel); //append header for div
           divContent.appendChild(paragraphContent1);//append paragraph1 for div
           divContent.appendChild(paragraphContent2);//append paragraph2for div
           secContent.appendChild(divContent); //append div for section 
           SectionFragment.appendChild(secContent); //append section for  DocumentFragment
           let navLi = document.createElement("li"); //cearte li
           navLi.setAttribute("class","menu__link");
           let navLink = document.createElement("a"); //cearte ancor
           navLink.setAttribute("class","nav-link");
           navLink.setAttribute("href", "#section-" + i);
           let textNodnavLink = document.createTextNode("Section" +" "+ i);
           navLink.appendChild(textNodnavLink);
           navLi.appendChild(navLink); //append a to li
           navFragment.appendChild(navLi); //append li  for  DocumentFragment
           mainContent.appendChild(SectionFragment); //append SectionFragment  for  mainContent
           navList.appendChild(navFragment);//append navFragment  for  navbarList
           //Scroll to section when add
           secContent.scrollIntoView({
               behavior: "smooth", 
               block: "start", 
               inline: "start"
           });
         
       };
     
      
    
};

// Set sections and Build menu
addBtn.addEventListener("click", () => {

    let SectionsNum = document.querySelectorAll("#mainContent section").length;
    let curElment=SectionsNum + 1;

    addSection(curElment);
   
});




// Add class 'active' to section when near top of viewport
const navlinks = document.querySelectorAll(".nav-link")
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const index = Array.from(allSections).indexOf(entry.target)

      allSections.forEach(sec => {
       
        sec.classList.remove("your-active-class")
      })

      navlinks.forEach(lin => {
        lin.classList.remove("linkActive")
      })
      navlinks[index].classList.add("linkActive")
      allSections[index].classList.add("your-active-class")
    }
  })
},

{
  threshold: 0.25,
});

allSections.forEach(sec => {
  observer.observe(sec)
});
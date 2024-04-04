//selects the ul for the slides
const track = document.querySelector(".carousel_track");
//selects the ul for the slides and turns the children into an array
const slide = Array.from(track.children);
//selects the right button for the carousel
const nextButton = document.querySelector(".right-carousel-button");
//selects the left button for the carousel
const prevButton = document.querySelector(".left-carousel-button");
//selects the div for the dots
const dotsNav = document.querySelector(".carousel-nav");
//makes the dots an array 
const dots = Array.from(dotsNav.children);
//returns the width of the first slide 
const slideWidth = slide[0].getBoundingClientRect().width;
console.log(slideWidth)

//to set a constant width for eacg slide  
for ( let a = 0; a < slide.length; a++){
    slide[a].style.left = slideWidth * a + "px";
}


const move = (currentSlide,targetslide,track) => {
    // returns the -x axis i.e the distance to move to the left
    track.style.transform = "translateX(-"+ targetslide.style.left + ")";
    //removes "current_-side" class to the classList of the currentSlide 
    currentSlide.classList.remove("current_slide");
    //adds "current_-side" class to the classList of the nextSlide or prevSlide
    targetslide.classList.add("current_slide");
}

const updateDots = (current_dot, targetDot) => {
    //removes "current_-side" class to the classList of the currentDot 
    current_dot.classList.remove("current_slide");
    //adds "current_-side" class to the classList of the currentDot 
    targetDot.classList.add("current_slide");
};


//funxtion adds "its hidden" class to the firstDot or lastDot 
const hideButtons = (targetIndex,prevButton,nextButton,slide)=> {
    //for firstDot
    if (targetIndex === 0){
        prevButton.classList.add("its_hidden");
        nextButton.classList.remove("its_hidden");
    //for lastDot
    }else if (targetIndex === slide.length -1 ){
        prevButton.classList.remove("its_hidden");
        nextButton.classList.add("its_hidden");
    }
    //the everything in between removes the "its_hidden " class
    else {
        prevButton.classList.remove("its_hidden");
        nextButton.classList.remove("its_hidden");
    }
}
//to move the slides right
nextButton.addEventListener("click", function(){
    //selects the element with class "current_slide" inside the ul(carousel_track)
    const currentSlide = track.querySelector(".current_slide");
    //this selects the next element to the right
    const nextSlide = currentSlide.nextElementSibling;
    //selects the dot with the class "current_slide"
    const current_dot = dotsNav.querySelector(".current_slide");
    //selects the nextelementslibing for the dot with the class "current_slide"
    const nextDot = current_dot.nextElementSibling;
    //finds the index of the nextSlide 
    const nextIndex = slide.findIndex(slide => slide === nextSlide);
    
    updateDots(current_dot,nextDot);
    move(currentSlide,nextSlide,track);
    hideButtons(nextIndex,prevButton,nextButton,slide);
});

//to move the slides left
prevButton.addEventListener("click",function(){
    //selects the element with class "current_slide" inside the ul(carousel_track)
    const currentSlide = track.querySelector(".current_slide");
    //this selects the slide to the left
    const prevSlide = currentSlide.previousElementSibling;
    //selects the dot with the class "current_slide"
    const current_dot = dotsNav.querySelector(".current_slide");
    //selects the prevelementslibing for the dot with the class "current_slide"
    const prevDot = current_dot.previousElementSibling;
    //finds the index of the prevSlide 
    const prevIndex = slide.findIndex(slide => slide === prevSlide);
    
    move(currentSlide,prevSlide,track);
    hideButtons(prevIndex,prevButton,nextButton,slide);
    updateDots(current_dot,prevDot);

});


//for the dots to move the slides
dotsNav.addEventListener("click", e => {
    //this makes sure that only the dot buttons are clickable in the div
    const targetDot = e.target.closest("button");
    //this breaks the function if anything other than the dots in the div are clicked
    if (!targetDot) return;
    //selects the element with class "current_slide" inside the ul(carousel_track)
    const currentSlide = track.querySelector(".current_slide");
    //selects the element with class "current_slide" inside the ul(carousel_nav)
    const current_dot = dotsNav.querySelector(".current_slide");
    //finds the index of the clickedDot 
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    //from the array slide uses the index of the clickedDot to select a slide
    const targetslide = slide[targetIndex];

    move(currentSlide,targetslide,track);
    updateDots(current_dot,targetDot);
    hideButtons(targetIndex,prevButton,nextButton,slide)

})

// // ... (Your existing code)

// Function to move to the next slide
const moveToNextSlide = () => {
    const currentSlide = track.querySelector(".current_slide");
    const nextSlide = currentSlide.nextElementSibling || slide[0];
    const current_dot = dotsNav.querySelector(".current_slide");
    const nextDot = current_dot.nextElementSibling || dots[0];
    const nextIndex = slide.findIndex((slide) => slide === nextSlide);

    updateDots(current_dot, nextDot);
    // move(currentSlide, nextSlide, track);
    hideButtons(nextIndex, prevButton, nextButton, slide);
       // Hide the current slide with a fade-out effect
    //    currentSlide.style.opacity = 0;

       // Move to the next slide with a fade-in effect
       setTimeout(() => {
           move(currentSlide, nextSlide, track);
        //    currentSlide.style.opacity = 1;
       }, 40); // Adjust the timeout based on the transition duration
};

// Function to start the automatic sliding
const startAutomaticSlide = () => {
    // Change the time interval (in milliseconds) according to your preference
    setInterval(moveToNextSlide, 3000); // 5000ms = 5 seconds
};

// Call the function to start automatic sliding
startAutomaticSlide();

// ... (Your existing code)

document.addEventListener("DOMContentLoaded", function () {
    // Get all elements with the class 'fade-in-up'
    var fadeElements = document.querySelectorAll('.fade-in-up');

    function fadeInElements() {
        var triggerHeight = window.innerHeight * 0.95; // Adjust the percentage as needed

        fadeElements.forEach(function (element, index) {
            // Calculate the distance of the element from the top of the viewport
            var elementTop = element.getBoundingClientRect().top;

            // Check if the element is in the viewport and below the trigger height
            if (elementTop - triggerHeight < 0) {
                // Calculate staggered delay based on index
                var delay = index * 30; // Adjust the delay as needed

                // Apply the delay using CSS style
                element.style.transitionDelay = delay + 'ms';

                // Add the 'fade-in' class after the delay
                element.classList.add('fade-in');
            }
        });
    }

    // Attach the fadeInElements function to the scroll event
    window.addEventListener('scroll', fadeInElements);

    // Trigger the fadeInElements function on page load
    fadeInElements();
});
const navBar = document.querySelector("#nav-bar");
console.log(navBar.getBoundingClientRect().top)
const body = document.body;
let lastScroll = 0;
window.addEventListener("scroll",() => {
    let currentscroll = window.scrollY
    if (currentscroll <= 0){
        body.classList.remove("scroll-up")
    }

    if (window.scrollY >= 400 && currentscroll > lastScroll && !body.classList.contains("scroll-down")){
        body.classList.remove("scroll-up")
        body.classList.add("scroll-down")
    }
    // }
    if ( currentscroll < lastScroll && body.classList.contains("scroll-down")){
        body.classList.remove("scroll-down")
        body.classList.add("scroll-up")
    }

    lastScroll = currentscroll;
})

var div = document.querySelector(".image-container-staff")
div.addEventListener("mouseover", function(){
    h3.style.color = "blue";
})

// function sideBar(e){
//     e.preventDefault()
//     const sidebar = document.querySelector(".side-bar")
//     document.querySelector(".first-bar").style.display = "none"
//     // document.body.classList.add("fixed")
//     sidebar.style.display = 'flex'
//     document.body.classList.add("fixed")

//     return false;//to prevent the anchor tag from taking me to the top of the screen 
     
// }

// function closeBar(e){
//     e.preventDefault()
//     const sidebar = document.querySelector(".side-bar")
//     document.querySelector(".first-bar").style.display = "flex"
//     document.body.classList.remove("fixed")
//     sidebar.style.display = 'none'

//     // return false;
// }

// document.querySelector(".first-bar").addEventListener("click",sideBar)
// document.querySelector(".second-bar").addEventListener("click",closeBar)
function sideBar(e) {
    e.preventDefault();
    const sidebar = document.querySelector(".side-bar");
    const firstBar = document.querySelector(".first-bar");

    firstBar.style.display = "none";
    sidebar.style.display = 'flex';
    // document.body.classList.add("fixed");
}

function closeBar(e) {
    e.preventDefault();
    const sidebar = document.querySelector(".side-bar");
    const firstBar = document.querySelector(".first-bar");

    firstBar.style.display = "block"; // Show the first bar again
    sidebar.style.display = 'none';
    // document.body.classList.remove("fixed");
}

document.querySelector(".first-bar").addEventListener("click", sideBar);
document.querySelector(".second-bar").addEventListener("click", closeBar);


const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel1");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];
let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});
// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");
// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});
const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    if (!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}
const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
}
const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

document.getElementById('subscribeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    //example
    const form = document.getElementById("subscribeForm")
    const formdata = new FormData(form)
    const email = document.getElementById('emailInput').value;

    // Example of using fetch to send a POST request to the server
    const show_message = document.querySelector(".subscription")
    function show(){
        show_message.classList.add("show-successfull")
    };
    function hide(){
        show_message.classList.remove("show-successfull")
    };
    fetch('/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => {
        if (response.ok) {
            setTimeout(show,100);
            setTimeout(hide,1000);
            document.getElementById('emailInput').value = ''; // Clear input field
        } else {
            throw new Error('Failed to subscribe');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Invalid email or duplicate email.');
    });
});




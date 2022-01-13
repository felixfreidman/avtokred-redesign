// // header-swiper
let menu = [];
let HeadersArray = document.querySelectorAll(".attention-container__header");
HeadersArray.forEach((element) => {
    let HeaderValue = element.textContent;
    menu.push(HeaderValue);
});
console.log(menu);
let swiper = new Swiper("#greetingSwipper", {
    // fadeEffect: {
    //     crossFade: true,
    // },
    navigation: {
        nextEl: ".greeting-next",
        prevEl: ".greeting-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function(index, className) {
            return '<span class="' + className + '">' + menu[index] + "</span>";
        },
    },
    // pagination: {
    //     el: ".swiper-pagination",
    //     type: "bullets",
    //     clickable: true,
    // },
    loop: true,
    // autoplay: {
    //   delay: 2300,
    // },
    // fadeEffect: {
    //     crossFade: true,
    // },
    effect: "fade",
    speed: 800,
    watchSlidesProgress: true,
    watchVisibility: true,
    disableOnInteraction: true,
});
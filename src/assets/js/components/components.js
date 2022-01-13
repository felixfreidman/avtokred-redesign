// header-swiper
function swiperInit() {}
var swiper = new Swiper("#bankSwiper", {
    fadeEffect: {
        crossFade: true,
    },
    navigation: {
        nextEl: ".bank-next",
        prevEl: ".bank-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
    },
    loop: true,
    fadeEffect: {
        crossFade: true,
    },
    speed: 800,
    watchSlidesProgress: true,
    watchVisibility: true,
});

var swiper = new Swiper("#whyusSwiper", {
    fadeEffect: {
        crossFade: true,
    },
    navigation: {
        nextEl: ".whyus-next",
        prevEl: ".whyus-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
    },
    loop: true,
    fadeEffect: {
        crossFade: true,
    },
    speed: 800,
    watchSlidesProgress: true,
    watchVisibility: true,
});
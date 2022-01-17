// // header-swiper
let menu = [];
let HeadersArray = document.querySelectorAll(".attention-container__header");
HeadersArray.forEach((element) => {
    let HeaderValue = element.getAttribute("data-info");
    menu.push(HeaderValue);
});
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
            let readyElement = `
            <div class = "${className} bullet-special">
                <div class ="bullet-header">${menu[index]}</div>
                <div class = ""></div>
            </div>
            `;
            return readyElement;
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
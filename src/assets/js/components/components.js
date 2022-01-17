
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

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName("typewrite");
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute("data-type");
        var period = elements[i].getAttribute("data-period");
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

AOS.init({
    startEvent: "DOMContentLoaded",
});

// Slider Section
$(document).ready(function() {
    $("#sliderDebt").slider({
        range: "min",
        animate: true,
        value: 500000,
        min: 100000,
        max: 4350000,
        step: 1000,
        slide: function(event, ui) {
            let debtValue = ui.value;
            debtValue = numberWithCommas(debtValue);
            $("#debtInput").val(debtValue);
        },
    });
    $("#debtInput").val($("#sliderDebt").slider("option", "value"));
    $("#debtInput").change(function() {
        $("#sliderDebt").slider("value", $(this).val());
    });
    $("#sliderTime").slider({
        range: "min",
        animate: true,
        value: 3,
        min: 1,
        max: 8,
        step: 1,
        slide: function(event, ui) {
            let timeValue = ui.value;
            switch (timeValue) {
                case 1:
                    timeValue = `${timeValue} год`;
                    break;
                case 2:
                    timeValue = `${timeValue} года`;
                    break;
                case 3:
                    timeValue = `${timeValue} года`;
                    break;
                case 4:
                    timeValue = `${timeValue} года`;
                    break;
                default:
                    timeValue = `${timeValue} лет`;
            }
            $("#timeInput").val(timeValue);
        },
    });
    $("#timeInput").val($("#sliderTime").slider("option", "value"));
    let timeValue = $("#timeInput").val();
    console.log(timeValue);
    switch (timeValue) {
        default: timeValue = `${timeValue} года`;
    }
    $("#timeInput").val(timeValue);
    $("#timeInput").change(function() {
        $("#sliderTime").slider("value", $(this).val());
    });
    $("#sliderIncome").slider({
        range: "min",
        animate: true,
        value: 30000,
        min: 10000,
        max: 500000,
        step: 5000,
        slide: function(event, ui) {
            let debtValue = ui.value;
            debtValue = numberWithCommas(debtValue);
            $("#incomeInput").val(debtValue);
        },
    });
    $("#incomeInput").val($("#sliderIncome").slider("option", "value"));
    $("#incomeInput").change(function() {
        $("#sliderIncome").slider("value", $(this).val());
    });
    $("#sliderInvest").slider({
        range: "min",
        animate: true,
        value: 100000,
        min: 0,
        max: 400000,
        step: 1000,
        slide: function(event, ui) {
            let debtValue = ui.value;
            debtValue = numberWithCommas(debtValue);
            $("#investInput").val(debtValue);
        },
    });
    $("#investInput").val($("#sliderInvest").slider("option", "value"));
    $("#investInput").change(function() {
        $("#sliderInvest").slider("value", $(this).val());
    });

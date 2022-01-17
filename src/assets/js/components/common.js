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

// // Main Menu Section

// const dinamicMenu = document.getElementById("wrapperContent");
// const menuFirstRow = document.getElementById("navigationFirstRow");
// const menuSecondRow = document.getElementById("navigationSecondRow");
// const navigationContainer = document.getElementById("navigationContainer");
// const menuMiniRow = document.getElementById("navigationRowMini");
// const formButton = document.getElementById("formButton");
// const formContainer = document.getElementById("formContainer");
// const aboutButton = document.getElementById("aboutButton");
// const aboutContainer = document.getElementById("aboutContainer");
// const banksButton = document.getElementById("banksButton");
// const banksContainer = document.getElementById("banksContainer");
// const whyusButton = document.getElementById("whyusButton");
// const whyusContainer = document.getElementById("whyusContainer");
// const faqButton = document.getElementById("faqButton");
// const formActivationButton = document.getElementById("formActivation");
// formButton.addEventListener("click", () => {
//     if (!formButton.classList.contains("formExpansion")) {
//         formButton.classList.add("formExpansion");
//         formContainer.classList.add("formContainerExpansion");
//         menuSecondRow.classList.add("rowResize");
//     }
// });

// formActivationButton.addEventListener("click", () => {
//     if (!formButton.classList.contains("formExpansion")) {
//         formButton.classList.add("formExpansion");
//         formContainer.classList.add("formContainerExpansion");
//         menuSecondRow.classList.add("rowResize");
//     }
//     formButton.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//         inline: "nearest",
//     });
// });
// aboutButton.addEventListener("click", () => {
//     if (!aboutContainer.classList.contains("aboutExpansion")) {
//         aboutButton.classList.add("buttonModdif");
//         aboutContainer.classList.add("aboutExpansion");
//         navigationContainer.classList.add("containerResize");
//         dinamicMenu.setAttribute(
//             "style",
//             `height: ${dynamicMenu.offsetHeight + aboutContainer.offsetHeight}`
//         );
//     }
// });

// banksButton.addEventListener("click", () => {
//     if (!banksButton.classList.contains("banksExpansion")) {
//         banksButton.classList.add("banksExpansion");
//         banksContainer.classList.add("banksContainerExpansion");
//         navigationContainer.classList.add("rowResizeBanks");
//         menuMiniRow.classList.add("miniRowResize");
//     }
// });

// whyusButton.addEventListener("click", () => {
//     if (!whyusButton.classList.contains("miniCardExpansion")) {
//         whyusButton.classList.add("miniCardExpansion");
//         whyusContainer.classList.add("miniCardContainerExpansion");
//         faqButton.classList.add("miniCardResize");
//         menuMiniRow.classList.add("miniRowCardResize");
//     }
// });

const firstScreen = document.getElementById("firstScreen");
const secondScreem = document.getElementById("secondScreen");
const allNextButtons = document.querySelectorAll(
    ".form-navigation__button--next"
);
allNextButtons.forEach((button) => {
    button.addEventListener("click", () => {
        let buttonId = button.id;
        buttonId = buttonId.replace("Button", "");
        let parentId = button.parentNode.parentNode.id;
        document.getElementById(parentId).classList.toggle("screen--hide");
        document.getElementById(parentId).classList.toggle("screen--show");
        document.getElementById(buttonId).classList.toggle("screen--hide");
        document.getElementById(buttonId).classList.toggle("screen--show");
    });
});
const alPrevButtons = document.querySelectorAll(
    ".form-navigation__button--prev"
);
alPrevButtons.forEach((button) => {
    button.addEventListener("click", () => {
        let buttonId = button.id;
        buttonId = buttonId.replace("Button", "");
        let parentId = button.parentNode.parentNode.id;
        document.getElementById(parentId).classList.toggle("screen--hide");
        document.getElementById(parentId).classList.toggle("screen--show");
        document.getElementById(buttonId).classList.toggle("screen--hide");
        document.getElementById(buttonId).classList.toggle("screen--show");
    });
});
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
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
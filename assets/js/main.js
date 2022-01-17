"use strict";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

var allNextButtons = document.querySelectorAll(".form-navigation__button--next");
var detailedFormObject = {
  type: "",
  credit: "",
  time: "",
  income: "",
  invest: "",
  userName: "",
  userPhone: ""
};
allNextButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var buttonId = button.id;
    buttonId = buttonId.replace("Button", "");
    var parentId = button.parentNode.parentNode.id;
    document.getElementById(parentId).classList.toggle("screen--hide");
    document.getElementById(parentId).classList.toggle("screen--show");
    document.getElementById(buttonId).classList.toggle("screen--hide");
    document.getElementById(buttonId).classList.toggle("screen--show");
    var typesInputs = document.querySelectorAll("input[name='autoSelect']");
    typesInputs.forEach(function (input) {
      if (input.checked) {
        var checkedOption = input.id;
        detailedFormObject.type = checkedOption.toString();
      }
    });
    var creditSum = document.getElementById("debtInput").value;
    console.log(creditSum);
    detailedFormObject.credit = creditSum.toString();
    var creditTime = document.getElementById("timeInput").value;
    detailedFormObject.time = creditTime.toString();
    var userIncome = document.getElementById("incomeInput").value;
    detailedFormObject.income = userIncome.toString();
    var creditInvest = document.getElementById("investInput").value;
    detailedFormObject.invest = creditInvest.toString();
    console.log(detailedFormObject);
  });
});
var allPrevButtons = document.querySelectorAll(".form-navigation__button--prev");
allPrevButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var buttonId = button.id;
    buttonId = buttonId.replace("Button", "");
    var parentId = button.parentNode.parentNode.id;
    document.getElementById(parentId).classList.toggle("screen--hide");
    document.getElementById(parentId).classList.toggle("screen--show");
    document.getElementById(buttonId).classList.toggle("screen--hide");
    document.getElementById(buttonId).classList.toggle("screen--show");
  });
});
var detailedButton = document.getElementById("detailedForm");
detailedButton.addEventListener("click", function () {
  document.getElementById("firstScreen").classList.toggle("screen--hide");
  document.getElementById("firstScreen").classList.toggle("screen--show");
  document.getElementById("secondScreen").classList.toggle("screen--hide");
  document.getElementById("secondScreen").classList.toggle("screen--show");
});
var userNameInput = document.getElementById("userName");
var userPhoneInput = document.getElementById("userPhone");
$(document).ready(function () {
  $(".submit-button").addClass("form-navigation__button--disabled");
  $("#userName").keyup(function () {
    console.log("yes");

    if ($(this).val().length != 0 && $("#userPhone").val().length != 0) {
      $(".submit-button").removeClass("form-navigation__button--disabled");
    }
  });
  $("#userPhone").keyup(function () {
    console.log("yes");

    if ($(this).val().length != 0 && $("#userName").val().length != 0) {
      $(".submit-button").removeClass("form-navigation__button--disabled");
    }
  });
}); // // header-swiper

var menu = [];
var HeadersArray = document.querySelectorAll(".attention-container__header");
HeadersArray.forEach(function (element) {
  var HeaderValue = element.getAttribute("data-info");
  menu.push(HeaderValue);
});
var swiper = new Swiper("#greetingSwipper", {
  // fadeEffect: {
  //     crossFade: true,
  // },
  navigation: {
    nextEl: ".greeting-next",
    prevEl: ".greeting-prev"
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function renderBullet(index, className) {
      var readyElement = "\n            <div class = \"".concat(className, " bullet-special\">\n                <div class =\"bullet-header\">").concat(menu[index], "</div>\n                <div class = \"\"></div>\n            </div>\n            ");
      return readyElement;
    }
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
  disableOnInteraction: true
});

var TxtType = function TxtType(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
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

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");

  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");

    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  } // INJECT CSS


  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

AOS.init({
  startEvent: "DOMContentLoaded"
}); // Slider Section

$(document).ready(function () {
  $("#sliderDebt").slider({
    range: "min",
    animate: true,
    value: 500000,
    min: 100000,
    max: 4350000,
    step: 1000,
    slide: function slide(event, ui) {
      var debtValue = ui.value;
      debtValue = numberWithCommas(debtValue);
      $("#debtInput").val(debtValue);
    }
  });
  $("#debtInput").val($("#sliderDebt").slider("option", "value"));
  $("#debtInput").change(function () {
    $("#sliderDebt").slider("value", $(this).val());
  });
  $("#sliderTime").slider({
    range: "min",
    animate: true,
    value: 3,
    min: 1,
    max: 8,
    step: 1,
    slide: function slide(event, ui) {
      var timeValue = ui.value;

      switch (timeValue) {
        case 1:
          timeValue = "".concat(timeValue, " \u0433\u043E\u0434");
          break;

        case 2:
          timeValue = "".concat(timeValue, " \u0433\u043E\u0434\u0430");
          break;

        case 3:
          timeValue = "".concat(timeValue, " \u0433\u043E\u0434\u0430");
          break;

        case 4:
          timeValue = "".concat(timeValue, " \u0433\u043E\u0434\u0430");
          break;

        default:
          timeValue = "".concat(timeValue, " \u043B\u0435\u0442");
      }

      $("#timeInput").val(timeValue);
    }
  });
  $("#timeInput").val($("#sliderTime").slider("option", "value"));
  var timeValue = $("#timeInput").val();
  console.log(timeValue);

  switch (timeValue) {
    default:
      timeValue = "".concat(timeValue, " \u0433\u043E\u0434\u0430");
  }

  $("#timeInput").val(timeValue);
  $("#timeInput").change(function () {
    $("#sliderTime").slider("value", $(this).val());
  });
  $("#sliderIncome").slider({
    range: "min",
    animate: true,
    value: 30000,
    min: 10000,
    max: 500000,
    step: 5000,
    slide: function slide(event, ui) {
      var debtValue = ui.value;
      debtValue = numberWithCommas(debtValue);
      $("#incomeInput").val(debtValue);
    }
  });
  $("#incomeInput").val($("#sliderIncome").slider("option", "value"));
  $("#incomeInput").change(function () {
    $("#sliderIncome").slider("value", $(this).val());
  });
  $("#sliderInvest").slider({
    range: "min",
    animate: true,
    value: 100000,
    min: 0,
    max: 400000,
    step: 1000,
    slide: function slide(event, ui) {
      var debtValue = ui.value;
      debtValue = numberWithCommas(debtValue);
      $("#investInput").val(debtValue);
    }
  });
  $("#investInput").val($("#sliderInvest").slider("option", "value"));
  $("#investInput").change(function () {
    $("#sliderInvest").slider("value", $(this).val());
  });
});
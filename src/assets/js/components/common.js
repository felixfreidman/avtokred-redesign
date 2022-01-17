function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const allNextButtons = document.querySelectorAll(
    ".form-navigation__button--next"
);
let detailedFormObject = {
    type: "",
    credit: "",
    time: "",
    income: "",
    invest: "",
    userName: "",
    userPhone: "",
};
allNextButtons.forEach((button) => {
    button.addEventListener("click", () => {
        let buttonId = button.id;
        buttonId = buttonId.replace("Button", "");
        let parentId = button.parentNode.parentNode.id;
        document.getElementById(parentId).classList.toggle("screen--hide");
        document.getElementById(parentId).classList.toggle("screen--show");
        document.getElementById(buttonId).classList.toggle("screen--hide");
        document.getElementById(buttonId).classList.toggle("screen--show");
        const typesInputs = document.querySelectorAll("input[name='autoSelect']");
        typesInputs.forEach((input) => {
            if (input.checked) {
                let checkedOption = input.id;
                detailedFormObject.type = checkedOption.toString();
            }
        });
        const creditSum = document.getElementById("debtInput").value;
        console.log(creditSum);
        detailedFormObject.credit = creditSum.toString();
        const creditTime = document.getElementById("timeInput").value;
        detailedFormObject.time = creditTime.toString();
        const userIncome = document.getElementById("incomeInput").value;
        detailedFormObject.income = userIncome.toString();
        const creditInvest = document.getElementById("investInput").value;
        detailedFormObject.invest = creditInvest.toString();
        console.log(detailedFormObject);
    });
});
const allPrevButtons = document.querySelectorAll(
    ".form-navigation__button--prev"
);
allPrevButtons.forEach((button) => {
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

const detailedButton = document.getElementById("detailedForm");
detailedButton.addEventListener("click", () => {
    document.getElementById("firstScreen").classList.toggle("screen--hide");
    document.getElementById("firstScreen").classList.toggle("screen--show");
    document.getElementById("secondScreen").classList.toggle("screen--hide");
    document.getElementById("secondScreen").classList.toggle("screen--show");
});

const userNameInput = document.getElementById("userName");
const userPhoneInput = document.getElementById("userPhone");
$(document).ready(function() {
    $(".submit-button").addClass("form-navigation__button--disabled");
    $("#userName").keyup(function() {
        console.log("yes");
        if ($(this).val().length != 0 && $("#userPhone").val().length != 0) {
            $(".submit-button").removeClass("form-navigation__button--disabled");
        }
    });
    $("#userPhone").keyup(function() {
        console.log("yes");
        if ($(this).val().length != 0 && $("#userName").val().length != 0) {
            $(".submit-button").removeClass("form-navigation__button--disabled");
        }
    });
});
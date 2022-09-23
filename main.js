const INPUTS = document.querySelectorAll(".form-control");
const TIP_COUNT = document.querySelectorAll(".tip-count");
const TIP = document.getElementById("tip");
const TOTAL = document.getElementById("total");
const Reset = document.getElementById("reset");
let inputValues = {
  bill: 0,
  tip: 0,
  people: 0,
};

function getSelected() {
  let selected = document.querySelector("input:checked");
  selected = selected.value;
  inputValues["tip"] = parseInt(selected);
}

function evaluateBill({ bill, tip, people }) {
  if (people == 0) {
    people = 1;
  }

  let tip_amount = (bill * tip) / 100;
  tip_amount = tip_amount / people;
  let total = bill / people + tip_amount;
  TIP.innerHTML = `$${tip_amount.toFixed(2)}`;
  TOTAL.innerHTML = `$${total.toFixed(2)}`;
}

function validateInput(e, inputEl) {
  let replaced = e.target.value.replace(/[^\d.]/g, "");
  if (replaced === "") {
    inputEl.classList.remove("valued");
    inputEl.value = "";
  } else {
    inputEl.classList.remove("error");
    inputEl.classList.add("valued");
    inputEl.value = replaced;
  }

  let errorMessage = "." + inputEl.id; // Error Message class must be queried with a dot
  errorMessage = document.querySelector(errorMessage);

  switch (inputEl.id) {
    case "bill":
      if (replaced == 0) {
        inputEl.classList.add("error");
        errorMessage.innerHTML = "Cannot be zero";
        inputValues[inputEl.id] = parseInt(0);
      } else {
        errorMessage.innerHTML = "";
        inputValues[inputEl.id] = parseInt(replaced);
      }
      break;
    case "custom":
      let custom = document.getElementById("select");
      custom.value = replaced === "" ? 0 : replaced;
      custom.checked = true;

      getSelected();
      evaluateBill({ ...inputValues });

      if (replaced > 90) {
        inputEl.classList.add("error");
        errorMessage.innerHTML = "Tip cannot be more than 90% of bill";
      } else {
        errorMessage.innerHTML = "";
      }
      break;
    case "people":
      if (Math.floor(replaced) == 0) {
        inputEl.classList.add("error");
        errorMessage.innerHTML = "Cannot be zero";
        inputValues[inputEl.id] = parseInt(0);
      } else if (replaced > 21) {
        inputEl.classList.add("error");
        errorMessage.innerHTML = "Limit is 21";
      } else {
        errorMessage.innerHTML = "";
        inputValues[inputEl.id] = parseInt(replaced);
      }
  }
}

INPUTS.forEach((inputEl) => {
  inputEl.addEventListener("input", function (e) {
    validateInput(e, inputEl);
    evaluateBill({ ...inputValues });
  });
});

TIP_COUNT.forEach((tips) => {
  tips.addEventListener("change", function () {
    getSelected();
    evaluateBill({ ...inputValues });
  });
});

Reset.addEventListener("click", function () {
  evaluateBill({
    bill: 0,
    tip: 0,
    people: 0,
  });
});

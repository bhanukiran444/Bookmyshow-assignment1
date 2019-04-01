let _numbersArray = [7000, 7001, 7002, 7003, 7004, 7005];

const form = document.querySelector("form");
let divList = document.querySelector("#divList");
const divErrorMessage = document.querySelector("#errorMsg");
const btnResetArray = document.querySelector("#btnResetArray");

btnResetArray.addEventListener('click', function(){
  _numbersArray = []
  renderList()
})

form.addEventListener("submit", function(e) {
  divErrorMessage.innerHTML = "";
  e.preventDefault();

  let txtNum = document.querySelector("#txtNumber").value;

  if (txtNum === "") {
    divErrorMessage.style.display = "block";
    divErrorMessage.innerHTML = "Please enter a number";
  } else if (txtNum.includes("-") && txtNum.includes(",")) {
    calculateBothRangeAndNumbers(txtNum);
  } else if (txtNum.includes(",")) {
    calculateMultipleNumbers(txtNum);
  } else if (txtNum.includes("-")) {
    calculateRange(txtNum);
  } else if (checkDuplicate(txtNum)) {
    displayDuplicateMessage(txtNum);
  } else {
    divErrorMessage.style.display = "none";
    _numbersArray.push(parseInt(txtNum));
  }

  document.querySelector("#txtNumber").value = "";
  renderList();
});

function calculateBothRangeAndNumbers(txtNum) {
  const newArray = txtNum.split(",");

  let multiData = newArray.filter(function(num) {
    if (!num.includes("-")) return true;
  });

  let rangeData = newArray.filter(function(num) {
    if (num.includes("-")) return true;
  });

  if (multiData.length > 0) {
    calculateMultipleNumbers(multiData.toString());
  }

  if (rangeData.length == 1) {
    calculateRange(rangeData.toString());
  } else {
    rangeData.forEach(function(singleRangeData) {
      calculateRange(singleRangeData.toString());
    });
  }
}

function calculateMultipleNumbers(txtNum) {
  console.log(txtNum);
  const newArray = txtNum.split(",");
  let duplicateValues = "";
  newArray.forEach(function(num) {
    if (!checkDuplicate(num)) {
      _numbersArray.push(parseInt(num));
    } else {
      duplicateValues += num + ", ";
    }
  });
  if (duplicateValues != "") {
    displayDuplicateMessage(duplicateValues);
  }
}

function calculateRange(txtNum) {
  const numRangeFirst = parseInt(txtNum.split("-")[0]);
  const numRangeLast = parseInt(txtNum.split("-")[1]);
  let rangeArray = [];
  for (let i = numRangeFirst; i <= numRangeLast; i++) {
    rangeArray.push(i);
  }
  let duplicateValues = "";
  rangeArray.forEach(function(num) {
    if (!checkDuplicate(num)) {
      _numbersArray.push(parseInt(num));
    } else {
      duplicateValues += num + ", ";
    }
  });
  if (duplicateValues != "") {
    displayDuplicateMessage(duplicateValues);
  }
}

function checkDuplicate(num) {
  if (_numbersArray.includes(parseInt(num))) return true;
  return false;
}

function displayDuplicateMessage(txt) {
  divErrorMessage.style.display = "block";
  divErrorMessage.innerHTML += txt + "- Already exists - Duplicate Values ";
}

function renderList() {
  divList.innerHTML = "";
  let htmlLiElement = "";
  _numbersArray.forEach(function(item) {
    htmlLiElement += `<li class="list-group-item">${item}</li>`;
  });
  divList.innerHTML = htmlLiElement;
}

renderList();

// validation
function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : event.keyCode;
  if (
    charCode != 44 &&
    charCode != 32 &&
    charCode != 45 &&
    charCode > 31 &&
    (charCode < 48 || charCode > 57)
  ) {
    return false;
  }
  return true;
}
const slider = document.querySelector("#sliderInput");
const valueBox = document.querySelector("#valueBox");
const inputValue = document.querySelector(".value");
const rangeMinValue = document.querySelector(".rangeMinValue");
const rangeMaxValue = document.querySelector(".rangeMaxValue");
const interesVal = document.querySelector("#interesVal");
const contractVal = document.querySelector("#contractVal");
const periodVal = document.querySelector("#periodVal");
const mangFeeVal = document.querySelector("#mangFeeVal");
const monthPay = document.querySelector("#monthPay");
const projCostVal = document.querySelector("#projCostVal");
const selectPeriod = document.querySelector("#period");
const timeRangeBox =  document.querySelector(".timeRangeBox");
const payment = document.querySelector("#payment");
const allRadioCheckBoxes = document.querySelectorAll(".radioCheck");
const url = "https://nikitapodkopaev.github.io/Kalkulaatori%20andmed.xlsx?raw=false";
const oReq = new XMLHttpRequest();
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";
let json = undefined;
let dataArr = [];
let creditSum = slider.value;
let checkBoxState = "";
let checkBoxId = 0;
let userInputSum = 0;
let defalutPeriods = {};
let defalutCredits = {};
oReq.onload = function(e) {
    var arraybuffer = oReq.response;
    var data = new Uint8Array(arraybuffer);
    var arr = new Array();
    for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");
    var workbook = XLSX.read(bstr, {type:"binary"});
    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];
    json = XLSX.utils.sheet_to_json(worksheet,{raw:true});
    structureData(json);
  }
  oReq.send();

class productServised{
    constructor(interes, contractSum, monthSum, period, defaultCredit, defaultperiod, name){
        this.interes = interes;
        this.contractSum = contractSum;
        this.monthSum = monthSum;
        this.period = period;
        this.defaultCredit = defaultCredit;
        this.defaultperiod = defaultperiod;
        this.name = name;
    }
}
function structureData(file){
    for(let i = 1; i < json.length - 1; i++){
        const interes = json[i].__EMPTY_1;
        const contractSum = json[i].__EMPTY_2;
        const monthSum = json[i].__EMPTY_3;
        const period = json[i].__EMPTY_4;
        let defaultCredit = json[i].__EMPTY_5;
        let defaultperiod = json[i].__EMPTY_6;
        let name = json[i]["kalkulaatori konfigureerimise sisendid"];
        if (defaultCredit == undefined || defaultperiod == undefined){
            console.log(defaultCredit, defaultperiod)
            defaultperiod =  dataArr[i-2].defaultperiod;
            defaultCredit = dataArr[i-2].defaultCredit;
            name = dataArr[i-2]["kalkulaatori konfigureerimise sisendid"];
        }
        if(!(name in defalutPeriods)){
            defalutPeriods[name] = defaultperiod;
        } 
        if(!(name in defalutCredits)){
            defalutCredits[name] = defaultCredit;
        } 
        dataArr.push(new productServised(interes, contractSum, monthSum, period, defaultCredit, defaultperiod, name))
    }
}

allRadioCheckBoxes.forEach(radioCheckBox => radioCheckBox.addEventListener("click", function(){
    removeAllOptions()
    checkBoxState = radioCheckBox.value;
    checkBoxId = radioCheckBox.id;
    slider.value = defalutCredits[checkBoxState];
    setValue();
    addNewOptions();
}))


function removeAllOptions(){
    const allOptions = document.querySelectorAll("option");
        for(let optionId = 0; optionId < allOptions.length; optionId++){
            selectPeriod.remove(allOptions[optionId]);
        }
}
function addNewOptions(){
    let servisePeriod = dataArr[checkBoxId].period;
    console.log()
    let maxServisePeriod = parseInt(servisePeriod.substr(servisePeriod.search("-") + 1, servisePeriod.length));
    for(let month = 6; month < maxServisePeriod + 6; month += 6){
        let newOption = document.createElement("option");
        if (month == defalutPeriods[checkBoxState]){
            newOption.selected = true;
        }
        newOption.innerText = month + " kuud";
        newOption.value = month;
        selectPeriod.appendChild(newOption);
    }
    changeValues(checkBoxId);
}

function changeValues(number){
    creditSum = slider.value - userInputSum;
    const interes = parseFloat(dataArr[number].interes);
    const contractSum = parseInt(dataArr[number].contractSum);
    const contractMonthSum = parseInt(dataArr[number].monthSum);
    const selectedPeriod = parseInt(selectPeriod.value);
    const totalProjectCost = Math.round(((creditSum * interes) / 12) * selectedPeriod + parseInt(slider.value) + contractSum + (contractMonthSum * selectedPeriod));
    interesVal.innerHTML = "<b>" + (interes * 100).toFixed(2) + " %" + "</b>";
    contractVal.innerHTML = "<b>" + contractSum + " €" + "</b>";
    mangFeeVal.innerHTML = "<b>" + contractMonthSum + " €" + "</b>";
    periodVal.innerHTML = "<b>" + selectPeriod.value + " kuud" + "</b>";
    projCostVal.innerHTML = "<b>" + totalProjectCost.toLocaleString("ru-RU") + " €" +"</b>";
    monthPay.innerHTML = Math.round(totalProjectCost / selectedPeriod, 2).toFixed(2) + " €"; 
    /* платеж единовренмеенный не отношу к общем выплатам. плачу равномеррное суммы тела кредита и товар
    */

}
function setValue(){
    let newVal = parseInt((slider.value - slider.min) * 100 / (slider.max - slider.min));
    let newPos = (10 - (newVal * 0.17));
    let sliderValue = parseInt(slider.value);
    document.querySelector('.value').value = sliderValue.toLocaleString("ru-RU");
    slider.style.backgroundSize = newVal + "% 100%"
    document.querySelector('.valueBoxPos').style.left = `calc(${newVal}% + (${newPos}px))`;
    creditSum = slider.value - userInputSum;
    valueChecker();

}
setTimeout(function(){
    setValue()
changeValues(1);
allRadioCheckBoxes[0].click();
},10)

slider.addEventListener("input",setValue )
inputValue.addEventListener('click', function(){
  inputValue.value = "";
})
inputValue.addEventListener("input", function(){
    maxValue = 25000;
    minValue = 300;
    inputTextValue = inputValue.value.replace(/\s/g, "");
    if(parseInt(inputTextValue) > maxValue && inputTextValue.length >= 3){
        inputValue.value = maxValue;
        slider.value = maxValue;
        setValue();
    }
    else if(parseInt(inputTextValue) < minValue && inputTextValue.length >= 3){
        setTimeout(function(){
        inputValue.value = minValue;
        slider.value = minValue;
        setValue();
        },300)
    }
    else if(inputTextValue.length >= 3){
        setTimeout(function(){
            slider.value = parseInt(inputTextValue);
        setValue();
        },500)
        
    }
})
payment.addEventListener("input", function(){
    let minValue = dataArr[parseInt(checkBoxId)].defaultCredit;
    userInputSum = parseInt(payment.value);
    if(userInputSum > minValue){
        userInputSum = minValue;
        payment.value = minValue;
    }
    creditSum = slider.value - userInputSum

    valueChecker()

})
function valueChecker(){
    if(checkBoxState == "PV"){
        changeValues(0);
    }
    else if(checkBoxState == "Soojuspumbad" && creditSum >= 300 && creditSum <=  1999){
        changeValues(1);
    }
    else if(checkBoxState == "Soojuspumbad" && creditSum >= 2000 && creditSum <=  5999){
        changeValues(2);
    }
    else if(checkBoxState == "Soojuspumbad" && creditSum >= 6000 && creditSum <=  25000){
        changeValues(3);
    }
    else if(checkBoxState == "Elektriauotode laadijad" && creditSum >= 300 && creditSum <=  1999){
        changeValues(4);
    }
    else if(checkBoxState == "Elektriauotode laadijad" && creditSum >= 2000 && creditSum <=  5999){
        changeValues(5);
    }
    else if(checkBoxState == "Elektriauotode laadijad" && creditSum >= 6000 && creditSum <=  25000){
        changeValues(6);
    }
    else if(checkBoxState == "Võrguvaba elektrijaam Off-grid" && creditSum >= 300 && creditSum <=  1999){
        changeValues(7);
    }
    else if(checkBoxState == "Võrguvaba elektrijaam Off-grid" && creditSum >= 2000 && creditSum <=  5999){
        changeValues(8);
    }
    else if(checkBoxState == "Võrguvaba elektrijaam Off-grid" && creditSum >= 6000 && creditSum <=  25000){
        changeValues(9);
    }
    else if(checkBoxState == "Elektri- ja gaasitööd" && creditSum >= 300 && creditSum <=  999){
        changeValues(10);
    }
    else if(checkBoxState == "Elektri- ja gaasitööd" && creditSum >= 1000 && creditSum <=  1999){
        changeValues(11);
    }
    else if(checkBoxState == "Elektri- ja gaasitööd" && creditSum >= 2000 && creditSum <=  5999){
        changeValues(12);
    }
    else if(checkBoxState == "Elektri- ja gaasitööd" && creditSum >= 6000 && creditSum <=  25000){
        changeValues(13);
    }
}
selectPeriod.addEventListener("click", function(){
    valueChecker();
})


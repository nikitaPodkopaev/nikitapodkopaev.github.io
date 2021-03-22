const slider = document.querySelector("#sliderInput");
const valueBox = document.querySelector("#valueBox");
const inputValue = document.querySelector(".value");
function setValue(){
    if(slider.value == ""){
        console.log("Blank");
    }
    else{
    let newVal = parseInt((slider.value - slider.min) * 100 / (slider.max - slider.min));
    let newPos = (10 - (newVal * 0.17));
    let sliderValue = parseInt(slider.value);
    document.querySelector('.value').value = sliderValue.toLocaleString("ru-RU");
    slider.style.backgroundSize = newVal + "% 100%"
    document.querySelector('.valueBoxPos').style.left = `calc(${newVal}% + (${newPos}px))`;
    }
}
setValue()
slider.addEventListener("input",setValue )
inputValue.addEventListener('click', function(){
    inputValue.value = "5";
    slider.value = 0;
    console.log(slider.value, inputValue.value)
    setValue();
})
inputValue.addEventListener("input", function(){
    maxValue = 25000;
    minValue = 300;
    inputTextValue = inputValue.value.replace(/\s/g, "");
    if(parseInt(inputValue.value.replace(/\s/g, "")) > maxValue){
        inputValue.value = maxValue;
        slider.value = maxValue;
        setValue();
    }
    else if(parseInt(inputValue.value.replace(/\s/g, "")) < minValue){
        inputValue.value = minValue;
        slider.value = minValue;
        setValue();
    }
    else{
        slider.value = inputTextValue;
        setValue();
    }
})

var url = "https://nikitapodkopaev.github.io/Kalkulaatori%20andmed.xlsx?raw=false";
var oReq = new XMLHttpRequest();
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";

oReq.onload = function(e) {
  var arraybuffer = oReq.response;

  /* convert data to binary string */
  var data = new Uint8Array(arraybuffer);
  var arr = new Array();
  for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  var bstr = arr.join("");

  /* Call XLSX */
  var workbook = XLSX.read(bstr, {type:"binary"});

  /* DO SOMETHING WITH workbook HERE */
  var first_sheet_name = workbook.SheetNames[0];
  /* Get worksheet */
  var worksheet = workbook.Sheets[first_sheet_name];
  console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
}

oReq.send();

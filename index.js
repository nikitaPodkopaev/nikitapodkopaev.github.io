const slider = document.querySelector("#sliderInput");
const valueBox = document.querySelector("#valueBox");
const inputValue = document.querySelector(".value");
const fileInput = document.createElement("input");
fileInput.id = "input";
fileInput.accept = ".xls,.xlsx";
fileInput.type = "file";
fileInput.value = "Kalkulaatori andmed.xlsx";
console.log(fileInput);
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
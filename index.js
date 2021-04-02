let idCounter = 1;
let elementId = 0;
let palindromeObjectArr = [];
const palindromeTabelCont = document.querySelector("#palindromeTabelCont");
const addBtn = document.querySelector("#addBtn");
const palindromInp = document.querySelector("#palindromInp");
class palindrome{
    constructor(id, word, result){
        this.id = id;
        this.word = word;
        this.result = result;
        idCounter += 1;
    }
}
const testValues = ["anna", "Anna", "anna ", "YellowSubmarine" ]
addTestCases(testValues);
addTestCasesToTheFront();
addBtn.addEventListener('click', () => {
        const newWord = palindromInp.value;
        addNewWord(newWord);
        addDataToTheFront(palindromeObjectArr[idCounter - 2]);
  
})
function isPalindrome (word) {
    word = word.toLowerCase().replace(/\s/g,"");
	const lenOfTheWord = word.length;
    for(let i = 0; i < Math.floor(lenOfTheWord / 2); i++){
        if(word[i] !== word[lenOfTheWord - i - 1]){
            return false;
        }
        return true;
    }
}

function addTestCases(arr){
    arr.forEach(element => {
        palindromeObjectArr.push(new palindrome(idCounter, element, isPalindrome(element)))
    });
}
function addNewWord(word){
    let newPalindrome = new palindrome(idCounter, word, isPalindrome(word));
    palindromeObjectArr.push(newPalindrome);
}
function colorTheElement(element){
    element.style.color = "#ecf0f1";
    if((element.innerText) === "true"){
        element.style.backgroundColor = "#2ecc71";
    }
    if((element.innerText) === "false"){
        element.style.backgroundColor = "#e74c3c";
    }
}
function addDeletOption(element){
element.addEventListener('click', () => {
    const selectedElement = document.getElementById(element.id);
    palindromeTabelCont.removeChild(selectedElement);
    palindromeObjectArr.splice(palindromeObjectArr.indexOf(element.id, 1))
    idCounter--;
    elementId--;
})
}
function addChangeOption(element){
    element.addEventListener("change", () => {
        const selectedElementResult = document.querySelector(".result" + element.id);
        selectedElementResult.innerText = isPalindrome(element.value);
        colorTheElement(selectedElementResult);
    })
}
function addTestCasesToTheFront(){
    for(let i = 0; i < 4; i++){
        addDataToTheFront(palindromeObjectArr[i]);
    }
}
function addDataToTheFront(element){
        const newTr = document.createElement("tr");
        newTr.id = elementId;
        const newDelBtn = document.createElement("button");
        const newInput = document.createElement("input");
        newInput.classList.add("valueBox");
        newDelBtn.classList.add("delBtn");
        newDelBtn.innerHTML = "&#10060;";
        newDelBtn.id = elementId;
        newInput.id = elementId;
        addDeletOption(newDelBtn);
        addChangeOption(newInput);
        for(let i = 0; i < 4; i++){
            const newTd = document.createElement("td");
            if(i === 0){
                newTd.innerText = element.id;
            }
            if(i === 1){
                newInput.value = element.word;
                newTd.appendChild(newInput);
            }
            if(i === 2){
                newTd.innerText = element.result;
                newTd.classList.add("result" + elementId);
                colorTheElement(newTd);
            }
            if(i === 3){
                newTd.appendChild(newDelBtn);
            }
            newTr.appendChild(newTd)
        }
        palindromeTabelCont.appendChild(newTr);
        elementId++;
}

let lastFCR = 0;
function showCalculator(id){

    document.getElementById("welcome").style.display="none";

    document.getElementById("fcr").style.display="none";
    document.getElementById("cfcr").style.display="none";
    document.getElementById("cost").style.display="none";

    document.getElementById(id).style.display="block";
}
function calculateFCR(){

    let feed=parseFloat(document.getElementById("feed").value);
    let weight=parseFloat(document.getElementById("weight").value);

    let result = feed / weight;

    lastFCR = result;

    document.getElementById("cfcrFcr").value = result.toFixed(2);

    document.getElementById("fcrResult").innerHTML=
    "FCR = "+result.toFixed(2);

}

function calculateCFCR(){

    let avg=parseFloat(document.getElementById("avgWeight").value);

    let fcr=parseFloat(document.getElementById("cfcrFcr").value);

    let result=((2-avg)/5)+fcr;

    document.getElementById("cfcrResult").innerHTML=
    "CFCR = "+result.toFixed(2);

}

function calculateCost(){

    let chicks=parseFloat(document.getElementById("chicks").value);

    let chickPrice=parseFloat(document.getElementById("chickPrice").value);

    let feed=parseFloat(document.getElementById("feedKg").value);

    let feedPrice=parseFloat(document.getElementById("feedPrice").value);

    let weight=parseFloat(document.getElementById("liveWeight").value);

    let medicine=parseFloat(document.getElementById("medicine").value);

    let a=chicks*chickPrice;

    let b=feed*feedPrice;

    let c=weight*3;

    let d=medicine;

    let total=(a+b+c+d)/weight;

    document.getElementById("costResult").innerHTML=
    "Production Cost = ₹"+total.toFixed(2)+" / kg";

}
function resetFCR() {
    document.getElementById("feed").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("fcrResult").innerHTML = "";
}
function toggleCalculator(){

let calc=document.getElementById("miniCalculator");

if(calc.style.display=="block"){

calc.style.display="none";

}
else{

calc.style.display="block";

}

}

let calcHistory = [];

function press(value){
    document.getElementById("calcDisplay").value += value;
}

function deleteLast(){
    const display = document.getElementById("calcDisplay");
    display.value = display.value.slice(0, -1);
}

function clearCalc(){
    document.getElementById("calcDisplay").value = "";
}

function calculate(){
    const display = document.getElementById("calcDisplay");
    const expression = display.value;

    if (!expression) {
        return;
    }

    try {
        const result = eval(expression);
        display.value = result;
        addHistory(expression, result);
    } catch {
        display.value = "Error";
    }
}

function addHistory(expression, result) {
    calcHistory.unshift({ expression, result });
    if (calcHistory.length > 10) {
        calcHistory.pop();
    }
    renderHistory();
}

function renderHistory() {
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";

    if (calcHistory.length === 0) {
        historyList.innerHTML = "<li class='empty'>No history yet.</li>";
        return;
    }

    calcHistory.forEach(entry => {
        const item = document.createElement("li");
        item.innerHTML = `<span class="expr">${entry.expression}</span><span class="result">= ${entry.result}</span>`;
        historyList.appendChild(item);
    });
}

function clearHistory() {
    calcHistory = [];
    renderHistory();
}

renderHistory();
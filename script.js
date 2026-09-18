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
calc.style.left = "";
calc.style.top = "";
calc.style.right = "25px";
calc.style.bottom = "100px";

}

}

const miniCalculator = document.getElementById("miniCalculator");
const calcHeader = document.querySelector(".calc-header");

let dragState = null;

if (calcHeader) {
    calcHeader.addEventListener("mousedown", function(event) {
        if (event.target.closest("button")) return;

        const rect = miniCalculator.getBoundingClientRect();
        dragState = {
            startX: event.clientX,
            startY: event.clientY,
            originLeft: rect.left,
            originTop: rect.top
        };

        miniCalculator.classList.add("dragging");
    });
}

window.addEventListener("mousemove", function(event) {
    if (!dragState) return;

    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;

    miniCalculator.style.left = `${dragState.originLeft + deltaX}px`;
    miniCalculator.style.top = `${dragState.originTop + deltaY}px`;
    miniCalculator.style.right = "auto";
    miniCalculator.style.bottom = "auto";
});

window.addEventListener("mouseup", function() {
    dragState = null;
    miniCalculator.classList.remove("dragging");
});

let calcHistory = [];

function press(value){
    const display = document.getElementById("calcDisplay");
    display.value += value;
    display.focus();
}

function deleteLast(){
    const display = document.getElementById("calcDisplay");
    display.value = display.value.slice(0, -1);
    display.focus();
}

function clearCalc(){
    const display = document.getElementById("calcDisplay");
    display.value = "";
    display.focus();
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
    display.focus();
}

function handleCalculatorKeyboard(event) {
    const display = document.getElementById("calcDisplay");
    if (!display) return;

    const isTypingInOtherInput = document.activeElement &&
        document.activeElement !== display &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName);

    if (isTypingInOtherInput && !event.ctrlKey && !event.metaKey && !event.altKey) {
        return;
    }

    const key = event.key;

    if (/^[0-9]$/.test(key)) {
        event.preventDefault();
        press(key);
        return;
    }

    if (["+", "-", ".", "/", "%", "(", ")"].includes(key) || key === "*" || key === "x" || key === "X" || key === "Multiply" || key === "Divide") {
        event.preventDefault();
        const mappedValue = key === "x" || key === "X" || key === "Multiply" ? "*" : key === "Divide" ? "/" : key;
        press(mappedValue);
        return;
    }

    if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
        return;
    }

    if (key === "Backspace" || key === "Delete") {
        event.preventDefault();
        deleteLast();
        return;
    }

    if (key === "Escape") {
        event.preventDefault();
        clearCalc();
    }
}

document.addEventListener("keydown", handleCalculatorKeyboard);

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
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

function press(value){

document.getElementById("calcDisplay").value+=value;

}

function clearCalc(){

document.getElementById("calcDisplay").value="";

}

function calculate(){

let display=document.getElementById("calcDisplay");

try{

display.value=eval(display.value);

}

catch{

display.value="Error";

}

}
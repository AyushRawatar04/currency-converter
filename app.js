const baseURL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";
const fromCurr=document.querySelector(".From select");
const toCurr=document.querySelector(".To select");
const dropdownS=document.querySelectorAll("select");
const msg=document.querySelector(".msg");
let btn=document.querySelector("button");

for(select of dropdownS){
    for(currcode in countryList){
    let newOption=document.createElement("option");
    newOption.innerText=currcode;
    newOption.value=currcode;
    if(select.name==="from" && currcode==="USD")
        newOption.selected="selected";
    else if(select.name==="to" && currcode==="INR")
        newOption.selected="selected";
    select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
        updateExchange();
    });
}

const updateFlag=(element)=>{
    console.log(element);
    let currCode=element.value;
    console.log(currCode);
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let flagImg=element.parentElement.querySelector("img");
    flagImg.src=newSrc;
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    updateExchange();
});
updateExchange();
async function updateExchange(){
    let amt=document.querySelector("input");
    let amtVal=amt.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amt.value="1";
    }
    console.log(amtVal);
    // console.log(fromCurr.value,toCurr.value);
    const URL=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    const rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log("rate=",rate);
    let finalAmt=rate*amtVal;
    msg.innerHTML=`${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}
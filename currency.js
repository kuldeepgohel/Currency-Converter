const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"; // fetch data from api


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const icon = document.querySelector("#icon");


// set default dropdown menu...
for (let select of dropdowns) {
    for (currcode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if (select.name === "from" && currcode === "USD")  // for set default country in "from" dropdown
        {
            newOption.selected = "selected";
        }
        if (select.name === "to" && currcode === "INR")   // for set default country in "to" dropdown 
        {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updatFlag(evt.target);
    });

}

//change flag according to currency 
const updatFlag = (element) => {
    let ccode = element.value; // for currency code
    let countryCode = countryList[ccode]; // using currency code we get country code
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// default value when it load...
window.addEventListener("load", () => {
    updateExchangeRate();
})

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});


const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amvalue = amount.value;
    console.log(amvalue);
    if (amvalue === ' ' || amvalue < 1) {
        amvalue = 1;
        amount.value = "1";
    }

    // get the exchange rate 
    const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch(URL); // fetch api 
    let data = await response.json();  // fetch data from api 
    let rate = data[tocurr.value.toLowerCase()];   // fatch rate from data of currency
    let finalAmount = (amvalue * rate).toFixed(2);
    msg.innerText = `${amvalue} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
}

//exchange button 
icon.addEventListener("click", () => {
    let cr;
    cr = fromcurr.value;
    // console.log(fromcurr.value);
    fromcurr.value = tocurr.value;
    // console.log(fromcurr.value);
    tocurr.value = cr;
    let countryCode1 = countryList[fromcurr.value];
    let countryCode2 = countryList[tocurr.value];
    let chgflag1 = `https://flagsapi.com/${countryCode1}/shiny/64.png`;
    let chgflag2 = `https://flagsapi.com/${countryCode2}/shiny/64.png`;
    let img1 = document.querySelector("img");
    let img2 = document.querySelector("#img2");
    img1.src = chgflag1;
    img2.src = chgflag2;
});

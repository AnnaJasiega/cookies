let cookieDiv = document.getElementById('cookies'),
    body = document.getElementsByTagName('body'),
    vendors = document.getElementById('vendors'),
    vendorsList = [],
    accept = document.getElementById('accept'),
    reject = document.getElementById('reject');

function checkCookie(){
    if (document.cookie === '') {
        loadVendors();
        startPopup();
    }
}

function loadVendors() {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          vendorsList = (JSON.parse(xhttp.responseText)).vendors;
        }
    };
    xhttp.open("GET", "https://vendorlist.consensu.org/vendorlist.json", true);
    xhttp.send();
}    

function startPopup() {
    setTimeout(function(){
    createVendorsList();
    body[0].classList.add('noScroll');
    cookieDiv.classList.remove('invisible');
    }, 1000);
}

function createVendorsList() {
    for (let i=0; i<vendorsList.length; i++){     
    let newDiv = document.createElement("div"),
        newP = document.createElement("p"),
        newA = document.createElement("a"),
        newInput = document.createElement("input");

        newP.innerText = vendorsList[i].name;
        newP.className = 'newP';
        newA.innerText = vendorsList[i].policyUrl;
        newA.href = vendorsList[i].policyUrl;
        newInput.type = 'checkbox';
        newInput.checked = 'checked';
        newInput.value = vendorsList[i].name;

        vendors.appendChild(newDiv);
        newDiv.appendChild(newP);
        newDiv.appendChild(newInput);
        newDiv.appendChild(newA); 
    }
}

accept.addEventListener('click', function(){
    setCookie(true);
    stopPopup();
})

reject.addEventListener('click', function(){
    setCookie(false);
    stopPopup();
})

function stopPopup(){
    body[0].classList.remove('noScroll');
    cookieDiv.classList.add('invisible');
}

function setCookie(data){
    let date = new Date(),
        vendedorsInputs = document.getElementsByTagName('input'),
        checkedInputs = [],
        approved = data;

        date.setTime(date.getTime() + 24*60*60*1000);
    
        for (let i=0; i<vendedorsInputs.length; i++){
            if (vendedorsInputs[i].checked = true) {
                checkedInputs.push(vendedorsInputs[i].value);
            }
        }
   document.cookie = "approved=" + approved + "; expires=" + date.toGMTString() + "; secure";   
   document.cookie = "checkedVendedors=" + checkedInputs.toString() + "; expires=" + date.toGMTString()+ "; secure" ;
};

checkCookie();
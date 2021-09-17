function show(id){
    document.getElementById(id).style.display = 'block';
}
function hide(id){
    document.getElementById(id).style.display = 'none';
}

function showProgLang(){
    var yesItem = document.getElementById('yes');
    var noItem = document.getElementById('no');

    yesItem.onchange = function() { show('prog-lang-to-show');};
    noItem.onchange = function() { hide('prog-lang-to-show');};
}

function fillHighSchoolList(list_3){
    list_3.options[0].value = "gymnazium";
    list_3.options[0].text = "Gymnázium";

    list_3.options[1].value = "odborna";
    list_3.options[1].text = "Odborná škola";

    list_3.options[2].value = "konzervatorium";
    list_3.options[2].text = "Konzervatórium";

    list_3.options[3].value = "ine";
    list_3.options[3].text = "Iné";
}
function fillUniversityList(list_3){
    list_3.options[0].value = "stu";
    list_3.options[0].text = "STU";

    list_3.options[1].value = "uk";
    list_3.options[1].text = "UK";

    list_3.options[2].value = "euba";
    list_3.options[2].text = "EUBA";

    list_3.options[3].value = "ine";
    list_3.options[3].text = "Iné";
}
function fillITEmploymentList(list_3){
    list_3.options[0].value = "softverovy-inzinier";
    list_3.options[0].text = "Softvérový inžinier";

    list_3.options[1].value = "technicka-podpora";
    list_3.options[1].text = "Technická podpora";

    list_3.options[2].value = "web-designer";
    list_3.options[2].text = "Web designer";

    list_3.options[3].value = "ine";
    list_3.options[3].text = "Iné";
}
function fillPriemEmploymentList(list_3){
    list_3.options[0].value = "auto";
    list_3.options[0].text = "Automobilový priemysel";

    list_3.options[1].value = "elektrotechnika";
    list_3.options[1].text = "Elektrotechnika";

    list_3.options[2].value = "strojarstvo";
    list_3.options[2].text = "Strojárstvo";

    list_3.options[3].value = "ine";
    list_3.options[3].text = "Iné";
}
function clearList(list_3){
    list_3.options[0].value = "";
    list_3.options[0].text = "";

    list_3.options[1].value = "";
    list_3.options[1].text = "";

    list_3.options[2].value = "";
    list_3.options[2].text = "";

    list_3.options[3].value = "";
    list_3.options[3].text = "";
}

function changeList1(){
    var list_1 = document.getElementById("list1");
    var list_2 = document.getElementById("list2");
    var list_3 = document.getElementById("list3");

    var list2_label = document.getElementById("list2-label");
    var list3_label = document.getElementById("list3-label");

    var selected = list_1.selectedIndex;

    show("list2-label");
    show("list3-label");
    show("list2");
    show("list3");

    if(list_1.options[selected].index == 0){
        list2_label.innerHTML = "Vyberte typ školy:";
        list_2.options[0].value = "stredna-skola";
        list_2.options[0].text = "Stredná škola";

        list_2.options[1].value = "vysoka-skola";
        list_2.options[1].text = "Vysoká škola";

        list3_label.innerHTML = "Vyberte typ strednej školy:";
        fillHighSchoolList(list_3);
    }
    else if (list_1.options[selected].index == 1){
        list2_label.innerHTML = "Vyberte oblasť zamestnania:";
        list_2.options[0].value = "it";
        list_2.options[0].text = "IT";

        list_2.options[1].value = "priemysel";
        list_2.options[1].text = "Priemysel";

        list3_label.innerHTML = "Vyberte náplň vašej práce:";
        fillITEmploymentList(list_3);
    }
    else{
        list2_label.innerHTML = "";
        list_2.options[0].value = "";
        list_2.options[0].text = "";

        list_2.options[1].value = "";
        list_2.options[1].text = "";

        list3_label.innerHTML = "";
        clearList(list_3);

        hide("list2-label");
        hide("list3-label");
        hide("list2");
        hide("list3");
    }
}
function changeList2(){
    var list_1 = document.getElementById("list1");
    var list_2 = document.getElementById("list2");
    var list_3 = document.getElementById("list3");

    var list3_label = document.getElementById("list3-label");

    var selected1 = list_1.selectedIndex;
    var selected2 = list_2.selectedIndex;

    if(list_1.options[selected1].index == 0 && list_2.options[selected2].index == 0){
        list3_label.innerHTML = "Vyberte typ strednej školy:";
        fillHighSchoolList(list_3);
    }
    else if(list_1.options[selected1].index == 0 && list_2.options[selected2].index == 1){
        list3_label.innerHTML = "Vyberte názov vysokej školy:";
        fillUniversityList(list_3);
    }
    else if(list_1.options[selected1].index == 1 && list_2.options[selected2].index == 0){
        list3_label.innerHTML = "Vyberte oblasť IT:";
        fillITEmploymentList(list_3);
    }
    else if(list_1.options[selected1].index == 1 && list_2.options[selected2].index == 1){
        list3_label.innerHTML = "Vyberte oblasť priemyslu:";
        fillPriemEmploymentList(list_3);
    }
}

function getAge(birthdate) {
    var today = new Date();

    var age = today.getFullYear() - birthdate.getFullYear();
    var m = today.getMonth() - birthdate.getMonth();
    if (m < 0 ||
        (m == 0 && (today.getDate() < birthdate.getDate()))) {
        age--;
    }
    return age;
}
function checkAge(){
    var valid = true;
    var age_elem = document.getElementById('age');
    var birthdate_elem = document.getElementById('birthdate');

    if (age_elem.value!="" && birthdate_elem.value!="") {

        var birthdate = new Date(birthdate_elem.value);

        if (age_elem.value < 0 || age_elem.value > 115) {
            alert("Nesprávny vek! Zadajte vek v rozmedzí 0-115.");
        }

        birthdate_elem.style.border = "1px solid lightgray";
        age_elem.style.border = "1px solid lightgray";

        var calc_age = getAge(birthdate);
        if (calc_age != age.value) {
            birthdate_elem.style.border = "1px solid red";
            age_elem.style.border = "1px solid red";
            valid = false;
        }
    }
    return valid;
}
function checkAgeWithAlert(){
    var valid = checkAge();

    if (!valid)
        alert("Vek a dátum narodenia sa nezhodujú!");

    return valid;
}

function checkMail(){
    var valid = true;
    var email = document.getElementById("email");
    var regex = /^(\S{3,})[@]([a-zA-Z]+[.])+([a-zA-Z]{2,4})$/;

    email.style.border = "1px solid lightgray";
    if(regex.test(email.value) == false){
        email.style.border = "1px solid red";
        valid = false;
        alert("Nesprávny formát mailu! Mail musí obsahovať:\n" +
            "- zavináč,\n" +
            "- minimálne 2 domény,\n" +
            "- vrcholová doména 2-4 znaky,\n" +
            "- pred zavináčom minimálne 3 znaky.");
    }

    return valid;
}
function checkPhone(){
    var valid = true;
    var phone = document.getElementById("phone");
    var regex = /(^[+]([0-9]{12})$)|(^[0-9]{10}$)/;

    phone.style.border = "1px solid lightgray";
    if(regex.test(phone.value) == false){
        phone.style.border = "1px solid red";
        valid = false;
        alert("Nesprávny formát telefónneho čísla! Vyplňťe v tvare +421XXXXXXXXX alebo 09XXXXXXXX.");
    }

    return valid;
}
function checkPSC(){
    var valid = true;
    var psc = document.getElementById("psc");
    var regex = /(^[0-9]{5}$)|(^[0-9]{3} [0-9]{2}$)/;

    psc.style.border = "1px solid lightgray";
    if(regex.test(psc.value) == false){
        psc.style.border = "1px solid red";
        valid = false;
        alert("Nesprávny formát PSČ! Vyplňte v tvare XXXXX alebo XXX XX.");
    }

    return valid;
}


function validateForm() {
    var valid = true;

    var name = document.getElementById("name");
    var birthdate = document.getElementById("birthdate");
    var street = document.getElementById("street");
    var city = document.getElementById("city");
    var age = document.getElementById("age");
    var email = document.getElementById("email");
    var psc = document.getElementById("psc");
    var state = document.getElementById("state");
    alert("Nevyplnili ste všetky povinné polia!");


if (!checkMail() || !checkAge() || !checkPhone() || !checkPSC()) {
    valid = false;

    if (name.value == "" || birthdate.value == "" || street.value == "" || city.value == ""
        || age.value == "" || email.value == "" || psc.value == "" || state.value == "") {
        valid = false;
    }

    if (valid == false) {
        alert("Niektoré polia sú vyplnené nesprávne!");
    }


}
    return valid;
}
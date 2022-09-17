const getId = (item)=> document.getElementById(item);

const person = getId('person');//main
const addUserBtn = getId('add-user');
const doubleBtn = getId('double');
const showMillionairesBtn = getId('show-millionaires');
const sortBtn = getId('sort');
const calculateWealthBtn = getId('calculate-wealth');


getRandomUser()
getRandomUser()
getRandomUser()

let dataArr = [];


//fetch random user name and add money 

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    //console.log(data)
    
    const user = data.results[0];
    
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    
    //console.log(newUser)

    addData(newUser)
 
}


// double money
function doubleNumber() {
    dataArr = dataArr.map((user)=> {
        return {...user, money: user.money *2}
    })
    
    renderDom()
}


// filter milionaries
function filterMilionaries() {
    dataArr = dataArr.filter((user)=> user.money > 1000000);

    renderDom()
}

// ort richest
function sortByRichest() {
    dataArr.sort((a, b) => b.money - a.money );

    renderDom()
}

// ealth calculator
function calculateAllWealth() {
    const wealth = dataArr.reduce((acc, user) => (acc += user.money), 0);
  
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatNumber(wealth)}</strong></h3>`;
   person.appendChild(wealthEl);
}

// add the obj(newUser) at array data

function addData(obj) {
    dataArr.push(obj);

    renderDom()
}



// render dom 

function renderDom(provideData = dataArr) {
    person.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    provideData.forEach((item)=> {
        const div = document.createElement('div');
        div.classList.add('users');
        person.appendChild(div)
        div.innerHTML = `<strong>${item.name}</strong>`;

        const divWealth = document.createElement('div');
        divWealth.classList.add('wealth');
        divWealth.innerHTML = `$ ${formatNumber(item.money)}`
        div.appendChild(divWealth);

        //div.innerHTML = `<strong>${item.name}</strong> ${item.money}`
    })
}


// format number money 

function formatNumber(number) {
    return (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
}

//add a new user
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleNumber);
showMillionairesBtn.addEventListener('click', filterMilionaries);
sortBtn.addEventListener('click', sortByRichest);
calculateWealthBtn.addEventListener('click', calculateAllWealth);


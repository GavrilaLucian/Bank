'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movements,sort=false) {
  containerMovements.innerHTML='';


  const movs=sort ? movements.slice().sort((a,b) => a-b) : movements;
   

  movs.forEach(function(mov,i) {
    const type = mov >0 ? 'deposit' : 'withdrawal'

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);

  });

}

const calcDisplayBalance=function(acc) {
  acc.balance = acc.movements.reduce((acc,mov)=>acc+mov,0);
  labelBalance.textContent=`${acc.balance}€`;
};

const calcDisplaySummary=function(acc) {
  const incomes=acc.movements
  .filter(mov=> mov>0)
  .reduce((acc,mov)=> acc+mov,0);
  labelSumIn.textContent=`${incomes}€`;

  const out=acc.movements
  .filter(mov=>mov<0)
  .reduce((acc,mov)=>acc+mov,0);
  labelSumOut.textContent=`${Math.abs(out)}€`;

  const interest=acc.movements
  .filter(mov=> mov>0)
  .map(deposit => (deposit * acc.interestRate)/100)
  .filter((int,i,arr)=>{
    return int>=1;
  })
  .reduce((acc,int)=> acc+int,0);
  labelSumInterest.textContent=`${interest}€`;
}


const createUsernames=function(accs){
  accs.forEach(function(acc){
  acc.username=acc.owner
  .toLowerCase()
  .split( ' ')
  .map(name=>name[0])
  .join('');
  });
};
createUsernames(accounts);

const updateUI = function(acc) {
  //Display movements
  displayMovements(acc.movements);

  //Display balance
  calcDisplayBalance(acc);
  
  //Display summary
  calcDisplaySummary(acc);
}

//Event handler
let currentAccount;

btnLogin.addEventListener('click',function(e){
  //Prevent form from submitting(nu se mai da refresh la pagina)
  e.preventDefault();

  currentAccount=accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if(currentAccount?.pin ===Number(inputLoginPin.value)) {
    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}!`;
    
    containerApp.style.opacity = 100;

    //Clear input fields
    inputLoginUsername.value=inputLoginPin.value='';
    inputLoginPin.blur();

    //Update UI
    updateUI(currentAccount);
    
  }
});

btnTransfer.addEventListener('click',function(e){
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc=accounts.find(acc=> acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value='';

  if(amount >0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username){
    //Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    
    //Update UI
    updateUI(currentAccount);
  }
})

btnLoan.addEventListener('click',function(e){
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount>0 && currentAccount.movements.some(mov => mov>=amount * 0.1)){
    //Add movement
    currentAccount.movements.push(amount);
    
    //Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value='';
})

btnClose.addEventListener('click', function(e){
  e.preventDefault();


  if(currentAccount.username === inputCloseUsername.value && currentAccount?.pin ===Number(inputClosePin.value)){
    const index=accounts.findIndex(acc => acc.username === currentAccount.username);
    console.log(index);

    //Delete account
    accounts.splice(index, 1);


    //Hide UI
    containerApp.style.opacity = 0;

    //Display message
    labelWelcome.textContent = 'Log in to get started';

  }
  inputCloseUsername.value = inputClosePin.value='';

})

let sorted = false;
btnSort.addEventListener('click',function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted =! sorted;
})























///////////////////////////////////////////////////////////////
//Challange 1


/*

const dogsIulia=[1,3,4,2,6];
const dogsKate=[3,2,6,1,4];
const dogsIulia1=dogsIulia.slice(1,-2);

const checkDogs=dogsIulia1.concat(dogsKate);

console.log(checkDogs);

checkDogs.forEach(function(years,i,arr){
  if(years>=3){
    console.log(`Dog number ${i+1} is an adult, and it's ${years} years old.`)
  }else  {
    console.log(`Dog number ${i+1} is a puppy, and it's ${years} years old.`)

  }
})



*/



////////////////////////////////////////////////////////





/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////




for ( const[i,movement] of movements.entries()) {
  if(movement>0){
    console.log(`Movement ${i+1}: You deposited ${movement}`);
  }else {
    console.log(`Movement ${i+1}: You withdrew ${Math.abs(movement)}`)
  }
}


console.log('-------FOREACH------');

movements.forEach(function(mov,i,arr) {
  if(mov>0){
    console.log(`Movement ${i+1}: You deposited ${mov}`);
  }else {
    console.log(`Movement ${i+1}: You withdrew ${Math.abs(mov)}`)
  }

})

*/




/*
// MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);


currencies.forEach(function(value,key,map) {
  console.log(`${key}: ${value}`)
})




//SET

const currenciesUnique= new Set(['USD','GBP','USD','EUR','EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function(value,key,map){
  console.log(`${key}: ${value}`);

})


*/








/*
let arr= ['a','b','c','d','e'];


//SLICE
console.log(arr.slice(-2));


//SPLICE
//console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);

//REVERSE
arr=['a','b','c','d','e'];
const arr2=['j','i','h','g','f'];
console.log(arr2.reverse());
console.log(arr2);

//CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);


//JOIN
console.log(letters.join(' - '));

*/





////////////////////////////////////////////////////





//MAP METHOD

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


const euroToUsd=1.1;

const movementsUSD=movements.map(function(mov){
  return mov * euroToUsd;
})

//const movementsUSD=movements.map(mov => mov * euroToUsd);


console.log(movements);
console.log(movementsUSD);

const movementsUSDfor=[];
for(const mov of movements) movementsUSDfor.push(mov*euroToUsd);
console.log(movementsUSDfor);


const movementDescriptions=movements.map((mov,i) => 
  
  `Movement ${i+1}:You ${mov>0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`
  
  
);

console.log(movementDescriptions)

*/

/*
////////////////////
////FILTER METHOD
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits=movements.filter(mov=>mov>0);
console.log(movements);
console.log(deposits);

//const depositsFor=[];
//for(const mov or movements) if(mov>0) depositsFor.push(mov);
//console.log(depositsFor);


const withdrawals=movements.filter(mov=>mov<0);
console.log(withdrawals)

*/

/*
//////////////////////////////////
///REDUCE method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//accumulator ->SNOWBALL
const balance=movements.reduce((acc,cur)=>acc + cur,0);
console.log(balance);


let balance2=0;
for(const mov of movements) balance2 += mov;
console.log(balance2);

//MAIMUM VALUE 
const max=movements.reduce((acc,mov)=>{
  if(acc > mov)
    return acc;
  else
    return mov;
},movements[0]);
console.log(max)
*/








/*


const calcAverageHumanAge=function(ages){
  const humanAge=ages.map(age=> age<=2 ? 2*age : 16+age*4);
  const adults=humanAge.filter(age=>age>18);
  

const average=adults.reduce((acc,age)=>(acc+age),0)/adults.length;

  console.log(humanAge);
  console.log(adults);
  console.log(puppies);
  console.log(average);
}

calcAverageHumanAge([5,2,4,1,15,8,3]);
calcAverageHumanAge([16,6,10,5,6,1,4]);

*/
/*


const calcAverageHumanAge= ages=>
 ages
 .map(age=> (age<=2 ? 2*age : 16+age*4))
 .filter(age => age>=18)
 .reduce((acc,age,i,arr)=>(acc+age)/arr.length,0);
console.log(calcAverageHumanAge([5,2,4,1,15,8,3]));
console.log(calcAverageHumanAge([16,6,10,5,6,1,3]));


*/




/*
//////////////////////////////////////
///////Chaining methods
/////////////////////////////////////
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroToUsd=1.1;
console.log(movements);

//PIPELINE
const totalDepositsUSD=movements
      .filter(mov=> mov>0)
    //.map(mov=>mov * euroToUsd)
      .map((mov,i,arr)=>{
       //console.log(arr)
       return   mov * euroToUsd
     
    })
      .reduce((acc,mov)=>acc+mov, 0);
console.log(totalDepositsUSD);
*/






/*

////////////////////////////////
//////THE FIND METHOD-returneaza un singur element
////////////////////////////////
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const firstWithdrawal=movements.find(mov => mov<0);

console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account=accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

*/


/*
/////////////////////////
/////THE SOME AND EVERY//
/////////////////////////
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements)

//Equality
console.log(movements.includes(-130));

//Condition
console.log(movements.some(mov => mov=== -130));

const anyDeposits=movements.some(mov => mov >0);
console.log(anyDeposits)


//EVERY
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements.every(mov=>mov>0));

console.log(account4.movements.every(mov=>mov>0));


//Separate callback
const deposit =mov => mov>0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
*/

/*
const arr =[[1,2,3],[4,5,6],7,8];
console.log(arr.flat());

const arrDeep =[[[1,2],3],[4,[5,6]],7,8];
console.log(arrDeep.flat(2));

const accountMovements = accounts.map(acc => acc.movements)
console.log(accountMovements);
const allMovements= accountMovements.flat();
console.log(allMovements);
const overalBalance = allMovements.reduce((acc,mov)=>acc+mov,0);
console.log(overalBalance)



//flat
const overalBalance=accounts
.map(acc => acc.movements)
.flat()
.reduce((acc,mov)=>acc+mov,0);
console.log(overalBalance);

//flatMap
const overalBalance2=accounts
.flatMap(acc => acc.movements)
.reduce((acc,mov)=>acc+mov,0);
console.log(overalBalance2);

*/

/*
/////////////////////////////////
////SORT////////////////////
/////////////////
//Strings
const owners=['Jonas','Zach','Adam','Martha'];
console.log(owners.sort())
console.log(owners)


//Numbers
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements)
//Return <0 ,A,B(keep order)
//Return >0 ,B,A(switch order)

//Ascending
//movements.sort((a,b) =>{
  //if(a>b) return 1;
 // if(a<b) return -1;
//})
movements.sort((a,b) => a-b)
console.log(movements);

//Descending
//movements.sort((a,b) =>{
  //if(a>b) return -1;
  //if(a<b) return 1;

//})
movements.sort((a,b) => b-a)
console.log(movements);
*/
/*
////////////////////////////////////
///More ways of creating and filling arrays
//////////////////////////////////

const arr=[1,2,3,4,5,6,7];
console.log(new Array(1,2,3,4,5,6,7));

//Empty array
const x = new Array(7)
console.log(x);

//FILL METHOD
//x.fill(4)
//Start at index 3
x.fill(1,3,5)
console.log(x)

arr.fill(23,3,6)
console.log(arr)


//Array.from
const y=Array.from({length:7},()=>1)
console.log(y);

const z=Array.from({length:7},(_,i)=>i+1)
console.log(z);


const l=Array.from({length:100},()=>Math.trunc(Math.random()*6+1))
console.log(l);


labelBalance.addEventListener('click',function(){
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€',''))
  );
  console.log(movementsUI);

})

*/

/*
//Challange 4
TEST DATA:
const dogs = [
  {weight:22, curFood:250, owners:['Alice','Bob']},
  {weight:8, curFood:200, owners:['Matilda']},
  {weight:13, curFood:275, owners:['Sarah','John']},
  {weight:32, curFood:340, owners:['Michael']},
];

recommendedFood=weight ** 0.75 * 28;
current >(recommended* 0.9) && current(recommended*1.1)
*/

const dogs = [
  {weight:22, curFood:250, owners:['Alice','Bob']},
  {weight:8, curFood:200, owners:['Matilda']},
  {weight:13, curFood:275, owners:['Sarah','John']},
  {weight:32, curFood:340, owners:['Michael']},
];
/*
//1.
dogs.forEach(dog => dog.recFood=Math.trunc(dog.weight ** 0.75 * 28));
console.log(dogs)
//2.
const dogSarah=dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(`Sara's dog is eating too ${dogSarah.curFood > dogSarah.recFood ? 'much!' : 'less!'}`);

//3.
const ownersEatTooMuch=dogs
.filter(dog => dog.curFood>dog.recFood)
.map(dog => dog.owners)
.flat();
console.log(ownersEatTooMuch)

const ownersEatTooLittle=dogs
.filter(dog => dog.curFood<dog.recFood)
.map(dog => dog.owners)
.flat();
console.log(ownersEatTooLittle)

//4.
console.log(`${ownersEatTooMuch.join(' and ')} dog's eat too much!`)
console.log(`${ownersEatTooLittle.join(' and ')} dog's eat too little!`)

//5.

console.log(dogs.some(dog => dog.recFood===dog.curFood));

//6.current >(recommended* 0.9) && current(recommended*1.1)
const checkEatingOkay=dog => dog.curFood>dog.recFood*0.9 && dog.curFood<dog.recFood*1.1;
console.log(dogs.some(checkEatingOkay));

//7.
console.log(dogs.filter(checkEatingOkay));

//8.
const dogsSorted = dogs.slice().sort((a,b)=>a.recFood-b.recFood);
console.log(dogsSorted);


*/
/*
//1.
dogs.forEach(dog => dog.recFood=Math.trunc(dog.weight**0.75*28));
console.log(dogs);

//2.
const dogSarah=(dog =>dog.owners.include('Sarah'));
console.log(`Sarah's dog eat too ${dogSarah.curFood>dogSarah.recFood ? 'much' : 'less'} `)

//3.
const ownersEatTooMuch=dogs
.filter(dog => dog.curFood>dog.recFood)
.map(dog=>dog.owners)
.flat()
console.log(ownersEatTooMuch)

const ownersEatTooLittle=dogs
.filter(dog => dog.curFood<dog.recFood)
.map(dog=>dog.owners)
.flat()
console.log(ownersEatTooLittle)

//4.
console.log(`${ownersEatTooMuch.join(' and ')} dog's eat too much`)
console.log(`${ownersEatTooLittle.join(' and ')} dog's eat too little`)

//5.
console.log(dogs.some(dog=> dog.curFood===dog.recFood));

//6.
const checkEatingOkay=dog=> dog.curFood >(dog.recFood* 0.9) && dog.curFood<(dog.recFood*1.1)
console.log(dogs.some(checkEatingOkay))

//7.
console.log(dogs.filter(checkEatingOkay))
const dogsSorted=dogs.slice().sort((a,b)=>a.recFood-b.recFood);
console.log(dogsSorted)
*/

//1.
dogs.forEach(dog=>dog.recFood=Math.trunc(dog.weight**0.75*28))
console.log(dogs)

//2.
const dogSarah=dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(`Sara's dog is eating too ${dogSarah.curFood > dogSarah.recFood ? 'much!' : 'less!'}`);

//3.
const ownersEatTooMuch=dogs
.filter(dog => dog.curFood>dog.recFood)
.map(dog=> dog.owners)
.flat()
console.log(ownersEatTooMuch)

const ownersEatTooLittle=dogs
.filter(dog => dog.curFood<dog.recFood)
.map(dog=> dog.owners)
.flat()
console.log(ownersEatTooLittle)

//4.
console.log(`${ownersEatTooMuch.join(' and ')} dogs eat too much`)
console.log(`${ownersEatTooLittle.join(' and ')} dogs eat too little`)

//5.
console.log(dogs.some(dog=>dog.recFood===dog.curFood))

//6.
const checkEatingOkay=dog =>dog.curFood> (dog.recFood* 0.9) && dog.curFood<(dog.recFood*1.1)
console.log(dogs.some(checkEatingOkay))

//7.
console.log(dogs.filter(checkEatingOkay))

//8.
const dogsSorted=dogs.slice().sort((a,b)=>a.recFood-b.recFood)
console.log(dogsSorted)
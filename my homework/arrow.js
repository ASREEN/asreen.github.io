// //Do this calculations below using Arrow function:
// let n1,n2; //get them from user input
// addition(n1,n2); as parameter
// multiply(); // as id value
// divide(n1,n2)// as parameter
// power()//as id value
// reminder(n1,n2) etc.

let erase = () => {
    d1.value = ' ';
    d2.value = ' ';
    userN.value='';
    result.innerHTML = ' ';
    info.innerHTML=' ';
}
function pow(num1, num2) {
    if (num2 == 0) {
        return 1;
    }
    return num1 * pow(num1, num2 - 1)
}
let myFunc = (n1, n2) => {
    result.innerHTML += ' ';
    let z = Number(n1) + Number(n2);
    let x = n1 * n2;
    let y = n1 / n2;
    let b = n1 % n2;
    let factorial = (x) => {
        if (x === 0) { return 1; }
        else {
            return x * factorial(x - 1);
            ;
        }
    }
    let f = eval(n1);
    result.innerHTML += ` The addition of ${n1} + ${n2}= ${z} <br>
    The Multiplication of ${n1} * ${n2}= ${x} <br> 
    The Divition of ${n1} / ${n2}= ${y} <br>
    The reminder of ${n1} % ${n2}= ${b} <br>
    The factorial of ${n1}! is  : ${factorial(f)}<br> The power of ${n1}<sup> ${n2}</sup> is  : ${pow(n1,n2)}<br>`;

}
// Display an users which array of objects(5 user data) inside a arrow function
// and show it using a <button onclick="users()">See User </button>
let users = [{
    name: 'arif',
    role: 'teacher',
    age: '20',
    country: 'Bangladesh'
},
{
    name: 'asreen',
    role: 'student',
    age: '20',
    country: 'Iraq'

},
{
    name: 'chuling',
    role: 'Student',
    age: '20',
    country: 'China'

},
{
    name: 'sujatha',
    role: 'Student',
    age: '20',
    country: 'India'
},
{
    name: 'cagri',
    role: 'Student',
    age: '20',
    country: 'Turkey'
},
{
    name: 'adel',
    role: 'Student',
    age: '20',
    country: 'Syria'
},
{
    name: 'khaled',
    role: 'Student',
    age: '20',
    country: 'Syria'
},
{
    name: 'peter',
    role: 'Student',
    age: '20',
    country: 'Poland'
},
{
    name: 'daniel',
    role: 'Student',
    age: '20',
    country: 'Spain'
},
{
    name: 'carlos',
    role: 'Student',
    age: '20',
    country: 'Spain'
},
{
    name: 'paolo',
    role: 'Student',
    age: '20',
    country: 'Italy'
}
];
// choose one user
let userFunc = (nameU) => {
    for (let j in users)
        if (nameU.toLowerCase() == users[j].name) {
            info.innerHTML += ` The ${j} is :${users[j].name} <br> The role is :${users[j].role} <br>
                                Age is :${users[j].age} <br> The country is :${users[j].country} <br>`
        }    

};
// function to display the all users
let allUser= ()=>{
    for (let j in users)
    info.innerHTML += ` The ${j} is :${users[j].name} <br> The role is :${users[j].role} <br>
    Age is :${users[j].age} <br> The country is :${users[j].country} <br><hr>`

}

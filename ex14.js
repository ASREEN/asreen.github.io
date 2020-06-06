// Part 01:
// Put this text in a variable as String in your js code:
// "His name is Tuergut. He is a Turkish legend. Everyone say Tuergut is a great fighter. Tuergut is also smart, brave and cleaver. Tuergut follows his brother in all wars for decades. When Tuergut dies, people were upset for him"

// now replace the name tuergut using any other name u like. Use JS function and display the variable in UI.
// display both text: before replace and after replace
// Part 02:
// - now seperate all lines from above text and put them in a new Array
// - show them as a unordered list in html by using js method

// Part 03:
// - now add this text in the array using js method(push) and update the result in UI
// "Yesterday is a History, tomorrow is mystery but today is a Gift"

let txt = "His name is Tuergut. He is a Turkish legend. Everyone say Tuergut is a great fighter. Tuergut is also smart, brave and cleaver. Tuergut follows his brother in all wars for decades. When Tuergut dies, people were upset for him";
document.getElementById('showText').innerHTML = txt;
console.log(txt);
function changeName(newName) {
    console.log(txt);
    document.getElementById('showText').innerHTML = ' ';
    let txt2 = txt.replace(/Tuergut/gi, newName.toString());// g= global match,i= insinsitive
    document.getElementById('showText').innerHTML = txt2;
    console.log(txt2);

}
function putArray() {
    let arr = txt.split(".");
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
        document.getElementById("showText2").innerHTML += `<ul><li>${arr[i]}</li></ul>`;
    }

}
let txt3 = "Yesterday is a History, tomorrow is mystery but today is a Gift";
function addText() {
    let arr = txt.split(".");
    arr.push(txt3);
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
        showText3.innerHTML += `<ul><li>${arr[i]}</li></ul>`;
    }
}
// using sperator

function splitString(separator) {
    const arrayOfStrings = txt.split(separator);
    for (let x in arrayOfStrings) {
        document.getElementById("showText4").innerHTML += `${arrayOfStrings[x]} <br>`;
    }
    //     console.log('The original string is: ', txt);
    //     console.log('The separator is: ', separator);
    //     console.log('The array has ', arrayOfStrings.length, ' elements: ', arrayOfStrings.join(' / '));
    //   }
    //   const tempestString = 'Oh brave new world that has such people in it.'
    //   const monthString = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'

    //   const space = ' '
    //   const comma = ','

    //   splitString(tempestString, space)
    //   splitString(tempestString)
    //   splitString(monthString, comma)
}

// Math skills
// Part 01:
// Use Math object and its functions to do below tasks:
// - create a button which can show random number and also can say if the number is smaller or bigger than 0.5
// - now make another button which can show random number from 0-100 like: 43.0232, 1.2323, 20.23923 etc

// Part 02:
// - Create a circle using CSS, html and js
// - use these equation in JS to find the circle Area = PI × r power 2
// here:
// - PI value should come from Math object
// - r is radius of circle from user and u should use it in css to change circle width and border radius
function anyNum() {
    let num = Math.random();
    randomN.value = num;
    if (num > 0.5) { showText5.innerHTML = ` This number :${num} is bigger than 0.5 ` }
    else { showText5.innerHTML = ` This number :${num} is smaller than 0.5 ` }
}
function anyNum2() {
    let num = Math.random() * 101;
    randomN.value = num;
}
function getCircle(r) {
    if (r == 0) {
        showText6.innerHTML = `Please enter a radieus `;
    }
    else {
        let p = Math.PI;
        let circleArea = p * Math.pow(r, 2);
        showText6.innerHTML =`circle Area = PI × r power 2= ${circleArea}`;
        var c = document.getElementById("myCanvas");
        console.log(c);
        var ctx = c.getContext("2d");
        console.log(ctx);
        ctx.beginPath();
        ctx.arc(100, 75, r, 0, 2 * Math.PI);//ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        ctx.fillStyle = "#FF0000";
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }
}

function fillCircle(r) {
    if (r == 0) {
        showText6.innerHTML = `Please enter a radieus `;
    }
    else {
        let p = Math.PI;
        let circleArea = p * Math.pow(r, 2);
        showText6.innerHTML =`circle Area = PI × r power 2= ${circleArea}`;
        var c = document.getElementById("myCanvas");
        console.log(c);
        var ctx = c.getContext("2d");
        console.log(ctx);
        ctx.beginPath();
        ctx.arc(150, 75, r, 0 , 2 * Math.PI);//ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        ctx.fillStyle = "#FF0000";
        ctx.strokeStyle = 'blue';
        ctx.stroke();
        ctx.fill();
    }
}

var persons = [
    {firstname : "Malcom", lastname: "Reynolds"},
    {firstname : "Kaylee", lastname: "Frye"},
    {firstname : "Jayne", lastname: "Cobb"}
  ];
  
  
  function getFullName(item) {
    var fullname = [item.firstname,item.lastname].join(" ");
    return fullname;
  }
  persons.map(getFullName(item));


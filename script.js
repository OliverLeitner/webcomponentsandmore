import * as oopstuff from "./myobject.js";
"use strict";
const testobjectcopy = Object.assign({}, oopstuff.testobject);
const myClassNode = new oopstuff.testClass("someval");
document.getElementById("subline").innerText = "javascript brought me!";

// trying to make something like watchers
const elementTag = "[v-input]";
const elements = document.querySelectorAll("input");
const outputTagPrefix = "current-";
const eventName = "input";

// bind our inputs to our object
const inputa = document.querySelector("input[name='supi']");
inputa.value = oopstuff.testobject.propertyb;
const inputb = document.querySelector("input[name='butti']");
inputb.value = oopstuff.testobject.propertya;

let count = 0;
const counterElement = document.getElementById("counter");
const dateElement = document.getElementById("date");

function clock() {
    let date = new Date();
    setTimeout(() => {
        dateElement.innerText = date.toUTCString();
        clock()
    }, 1000)
}
clock();

function counter() {
    setTimeout(() => {
        counterElement.innerText = count++;
        counter();
    }, 1000)
}
counter();

// todo, split better
function resetObjectValues(e) {
    e.preventDefault();
    Object.assign(oopstuff.testobject, testobjectcopy);
    inputa.value = oopstuff.testobject.propertyb;
    inputb.value = oopstuff.testobject.propertya;
    document.getElementById(outputTagPrefix + "0").innerHTML = "";
    document.getElementById(outputTagPrefix + "1").innerHTML = "";
    document.querySelectorAll(elementTag).forEach((inputfield) => {
        inputfield.classList.remove("changed");
    })
}

function submitstuff(e) {
    e.preventDefault()
    console.log(e) // event
    console.log(oopstuff.testobject) // data
}

// all the buttons loose the normal thingy
document.querySelectorAll("button").forEach((button) => {
    addEventListener("click", resetObjectValues.bind(this));
});
document.querySelector("input[name='submit']").addEventListener("click", submitstuff.bind(this));

elements.forEach((element, index) => {
    element.addEventListener(eventName, (e) => {
        document.querySelectorAll(elementTag).forEach((/*not used val, just idx*/outputelement, idx) => {
            // showing
            if (index === idx) {
                if (element.value) {
                    document.getElementById(outputTagPrefix + idx).innerHTML = element.value;
                    if(oopstuff.testobject.propertyb !== inputa.value) oopstuff.testobject.propertyb = inputa.value; // numeric
                    if(oopstuff.testobject.propertya !== inputb.value) oopstuff.testobject.propertya = inputb.value; // text
                    element.classList.add("changed");
                } else {
                    inputa.value = oopstuff.testobject.propertyb;
                    inputb.value = oopstuff.testobject.propertya;
                }
            }
        });
    });
});

// this has traditionally been a pain point in JavaScript.
// As a wise man once said "I hate JavaScript as it tends to lose the meaning of this all too easily".
// Fat arrows fix it by capturing the meaning of this from the surrounding context. Consider this pure JavaScript class

function Person(age) {
    this.age = age;
    this.growOld = function () {
        this.age++;
    }
}
var person = new Person(1);
setTimeout(person.growOld, 1000);

setTimeout(function () { console.log(person.age); }, 2000); // 1, should have been 2

// If you run this code in the browser this within the function is going to point to window
// because window is going to be what executes the growOld function.
// Fix is to use an arrow function:

function Person1(age) {
    this.age = age;
    this.growOld = () => {
        this.age++;
    }
}
var person1 = new Person1(1);
setTimeout(person.growOld, 1000);
setTimeout(function () { console.log(person.age); }, 2000); // 2


// Note that since you are using TypeScript you can be even sweeter in syntax and combine arrows with classes:
class Person2 {
    constructor(public age: number) {}  
    growOld = () => {
        this.age++;
    }
}
var person2 = new Person2(1);
setTimeout(person2.growOld, 1000);
setTimeout(function () { console.log(person.age); }, 2000); // 2

// Beyond the terse syntax, you only need to use the fat arrow if you are going
// to give the function to someone else to call. Effectively:
var growOld = person.growOld; // Then later someone else calls it:
growOld(); // this will be the window object 

// If you are going to call it yourself, i.e.
person.growOld();
// then this is going to be the correct calling context (in this example person )
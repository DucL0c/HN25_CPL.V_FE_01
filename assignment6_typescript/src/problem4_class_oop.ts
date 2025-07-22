// Bài 1:
// Tạo class 'Animal' với:
// - private property 'name'
// - constructor khởi tạo name
// - method 'speak()' in ra tên
class Animal {
    private name: string;

    constructor(name: string){
        this.name = name;
    }

    speak(): void{
        console.log(`The animal's name is ${this.name}.`);
    }
}
let myAnimal = new Animal("Lion");
myAnimal.speak();


/*----------------------------------------------------------------------------------------*/


// Bài 2: Tạo class 'Cat' kế thừa 'Animal', override method 'speak()' để in "Meow"
class Cat extends Animal {
    speak(): void {
        console.log("Meow.");
    }
}
let myCat = new Cat("Whiskers");
myCat.speak();


/*----------------------------------------------------------------------------------------*/


// Bài 3: Tạo abstract class 'Shape' với abstract method 'area()', sau đó triển khai cho class
abstract class Shape {
    abstract area(): void;
}
class Circle extends Shape {
    private radius: number;

    constructor(radius: number) {
        super();
        this.radius = radius;
    }

    area(): void {
        console.log(`The area of the circle is ${Math.PI * this.radius * this.radius}.`);
    }
}
let myCircle = new Circle(5);
myCircle.area();


/*----------------------------------------------------------------------------------------*/
// Bài 4: Sử dụng getter/setter để validate giá trị age (0 < age < 120) trong class 'Person'
class Person {
    private age: number;

    constructor(age: number) {
        this.age = age;
    }

    getAge(): number {
        return this.age;
    }

    setAge(age: number): void {
        if (age > 0 && age < 120) {
            this.age = age;
        } else {
            console.log("Invalid age. Age must be between 0 and 120.");
        }
    }
}

let person = new Person(25);
console.log(`Current age: ${person.getAge()}`);
person.setAge(30);
console.log(`Updated age: ${person.getAge()}`);
person.setAge(150); // Invalid age
console.log(`After trying to set invalid age: ${person.getAge()}`);

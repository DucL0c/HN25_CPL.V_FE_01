// Bài 1:
// Định nghĩa interface 'Car' với các thuộc tính:
// - brand (string, readonly)
// - speed (number)
// - start() (method)
interface Car {
    readonly brand: string;
    speed: number;
    start(): void;
}
let myCar: Car = {
    brand: "Toyota",
    speed: 0,
    start: function () {
        console.log(`${this.brand} is starting at speed ${this.speed} km/h.`);
    }
};
myCar.start();


/*----------------------------------------------------------------------------------------*/

// Bài 2:
// Tạo type 'Person' và 'Employee' kế thừa Person, thêm thuộc tính 'employeeId'
type Person = { name: string };
type Employee = Person & {
    employeeId: number
};
let employee: Employee = {
    name: "John Doe",
    employeeId: 12345
};
console.log(`Employee Name: ${employee.name}, ID: ${employee.employeeId}`);


/*----------------------------------------------------------------------------------------*/


// Bài 3: Sử dụng index signature để định nghĩa type 'Dictionary' cho object có key là string
type Dictionary = {
    [key: string]: string;
};
let myDictionary: Dictionary = {
    "name": "Alice",
    "city": "Wonderland",
    "occupation": "Adventurer"
};
console.log(myDictionary);


/*----------------------------------------------------------------------------------------*/


// Bài 4:
// Viết utility type 'OptionalFields<T>' để biến tất cả thuộc tính của T thành optional
type OptionalFields<T> = {
    [K in keyof T]?: T[K];
};
type User = {
    id: number;
    name: string;
    email: string;
};
let optionalUser: OptionalFields<User> = {
    id: 1,
    name: "Alice",
};
console.log(optionalUser);
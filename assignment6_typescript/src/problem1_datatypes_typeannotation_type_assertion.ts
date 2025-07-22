// Bài 1: Fix lỗi type và giải thích 
// let age: number = "25";
// let isActive: boolean = "true";
// let data: any = { x: 10 };
// data = "hello";

let age: number = 25;           //Vì type là number nên giá trị phải là một số.
let isActive: boolean = true;   //Vì type là boolean nên giá trị phải là true hoặc false.
let data: any = { x: 10 }; 
data = "hello";
console.log(`Age: ${age}, Active: ${isActive}, Data: ${data}`);


/*----------------------------------------------------------------------------------------*/


// Bài 2:
// Định nghĩa biến 'user' với các type sau bằng type annotation:
// - name (string, bắt buộc)
// - age (number, optional)
// - roles: tuple gồm 2 thanh phan string va number
let user: {
    name: string;
    age?: number;
    roles: [string, number];
} = {
    name: "John Doe",
    roles: ["admin", 1]
};
console.log(user);  


/*----------------------------------------------------------------------------------------*/


// Bài 3: Sử dụng type assertion để fix lỗi 
const input = document.getElementById("input") as HTMLInputElement; 
const value: number = Number(input.value);
console.log(`Input value as number: ${value}`);


/*----------------------------------------------------------------------------------------*/


// Bài 4: Khi nào dùng 'unknown' thay cho 'any'? Viết ví dụ minh họa.
function handleInputUnknown(input: unknown) {
  // Không thể làm trực tiếp: console.log(input.toUpperCase()); => lỗi
  if (typeof input === 'string') {
    // Sau khi kiểm tra, có thể thao tác an toàn
    console.log("Chuỗi viết hoa:", input.toUpperCase());
  } else if (typeof input === 'number') {
    console.log("Bình phương:", input * input);
  } else {
    console.log("Không hỗ trợ kiểu dữ liệu này");
  }
}
handleInputUnknown("hello");   // Chuỗi viết hoa: HELLO
handleInputUnknown(5);         // Bình phương: 25



function handleInputAny(input: any) {
  console.log(input.toUpperCase()); // Không báo lỗi nhưng sẽ crash nếu input là number
}

handleInputAny(123); // crash vì không thể gọi toUpperCase trên number
// Bài 1: Viết hàm 'sum' nhận vào 2 số, trả về tổng, với tham số thứ hai có default value = 10
function sum(a: number, b: number = 10): number {
    return a + b;
}
console.log(`Tổng: ${sum(5)}`);      // Tổng: 15
console.log(`Tổng: ${sum(5, 15)}`);  // Tổng: 20


/*----------------------------------------------------------------------------------------*/


// Bài 2: Sử dụng rest parameter để viết hàm 'mergeStrings' nhận nhiều chuỗi, trả về chuỗi đã
function mergeStrings(...strings: string[]): string {
    return strings.join(", ");
}
console.log(`Kết quả: ${mergeStrings("Hello", "World", "TypeScript")}`);  // Kết quả: Hello, World, TypeScript



/*----------------------------------------------------------------------------------------*/


// Bài 3:
// Overload hàm 'getValue' để xử lý 2 trường hợp:
// - Nếu đầu vào là string, trả về string uppercase
// - Nếu đầu vào là number, trả về số * 2
function getValue(value: string): string;
function getValue(value: number): number;
function getValue(value: string | number): string | number {
    if (typeof value === "string") {
        return value.toUpperCase();
    } else if (typeof value === "number") {
        return value * 2;
    }
    throw new Error("Invalid type");
}
console.log(`Kết quả: ${getValue("hello")}`);  // Kết quả: HELLO
console.log(`Kết quả: ${getValue(5)}`);        // Kết quả: 10


// Bài 4:
// Tim hieu ve generic va ung dung
// Sử dụng generic để viết hàm 'filterArray' lọc các phần tử theo điều kiện
function filterArray<T>(arr: T[], condition: (item: T) => boolean): T[] {
    return arr.filter(condition);
}
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = filterArray(numbers, n => n % 2 === 0);
console.log(evenNumbers); // [2, 4]
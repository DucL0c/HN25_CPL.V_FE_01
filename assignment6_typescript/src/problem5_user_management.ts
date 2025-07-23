// Task 1
interface User {
    readonly id: number;
    username: string;
    email: string;
    isActive?: boolean;
    role: 'admin' | 'user' | 'guest';
}


// Task 2
type UserProfile = User & {
    birthDate: Date;
    address?: string;
}


// Task 3
class UserAccount implements User {
    readonly id: number;
    public username: string;
    public email: string;
    public isActive?: boolean | undefined;
    public role: "admin" | "user" | "guest";
    private password: string;

    constructor(username: string, email: string, password: string, role: "admin" | "user" | "guest" = "user", isActive: boolean = true) {
        this.id = Date.now();
        this.username = username;
        this.email = email;
        this.isActive = isActive;
        this.role = role;
        this.password = password;
    }

    validatePassword(): boolean {
        return this.password.length >= 8;
    }

    getInfo(): User {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            role: this.role,
            isActive: this.isActive
        };
    }
}


// Task 4
class AdminUser extends UserAccount {
    permissions: string[];

    constructor(username: string, email: string, password: string, permissions: string[]) {
        super(username, email, password, 'admin', true);
        this.permissions = permissions;
    }

    override validatePassword(): boolean {
        return this['password'].length >= 12;
    }
}


// Task 5
function createUser(userData: Partial<User> & { password: string }): User {
    const role = userData.role ?? 'user';
    const password = userData.password;

    if (role === 'admin' && password.length < 12) {
        throw new Error("Admin password must be at least 12 characters.");
    }
    if (role === 'user' && password.length < 8) {
        throw new Error("User password must be at least 8 characters.");
    }

    const user = {
        id: Date.now(),
        username: userData.username ?? '',
        email: userData.email ?? '',
        role,
        isActive: userData.isActive ?? true
    } as User;

    return user;
}


// Task 6
function formatUserInfo(user: User | UserProfile): string {
  if ('birthDate' in user && user.birthDate) {
    return `User ${user.username} born on ${user.birthDate.toDateString()}`;
  } else {
    return `User ${user.username} (${user.role})`;
  }
}


// Task 7 + 8
export function initUserForm() {
  const form = document.getElementById("userForm") as HTMLFormElement;
  const emailInput = document.querySelector("#email") as HTMLInputElement;
  const passwordInput = document.querySelector("#password") as HTMLInputElement;
  const roleSelect = document.querySelector("#role") as HTMLSelectElement;

  form.onsubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const usernameInput = form.elements.namedItem("username") as HTMLInputElement;
    const password = passwordInput.value;
    const role = roleSelect.value as 'admin' | 'user' | 'guest';

    try {
      const newUser = createUser({
        username: usernameInput.value,
        email: emailInput.value,
        password,
        role
      });

    //   const resultDiv = document.getElementById("result")!;
    //   resultDiv.innerText = `${formatUserInfo(newUser)}`;
        Toastify({
            text: `User ${newUser.username} created!`,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #4f46e5, #9333ea)",
            close: true
        }).showToast();
    } catch (err) {
    //   const resultDiv = document.getElementById("result")!;
    //   resultDiv.innerText = `Error: ${(err as Error).message}`;
        Toastify({
            text: `Error: ${(err as Error).message}`,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #ef4444, #dc2626)",
            close: true
        }).showToast();
    }
  };
}
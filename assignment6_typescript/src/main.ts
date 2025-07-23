import "./style.css"
import { initUserForm } from "./problem5_user_management"

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <form id="userForm" class="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20 space-y-6 transform hover:scale-[1.01] transition-all duration-300">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create New User
          </h2>
          <p class="text-gray-600 mt-2">Fill in the details below to create a new account</p>
        </div>

        <!-- Username Field -->
        <div class="space-y-2">
          <label class="block text-gray-700 font-medium flex items-center">
            <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Username
          </label>
          <input 
            type="text" 
            name="username" 
            placeholder="Enter username"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white" 
            required 
          />
        </div>

        <!-- Email Field -->
        <div class="space-y-2">
          <label class="block text-gray-700 font-medium flex items-center">
            <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            Email
          </label>
          <input 
            type="email" 
            id="email" 
            placeholder="Enter email address"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white" 
            required 
          />
        </div>

        <!-- Password Field -->
        <div class="space-y-2">
          <label class="block text-gray-700 font-medium flex items-center">
            <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            Password
          </label>
          <input 
            type="password" 
            id="password" 
            placeholder="Enter secure password"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white" 
            required 
          />
        </div>

        <!-- Role Field -->
        <div class="space-y-2">
          <label class="block text-gray-700 font-medium flex items-center">
            <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
            Role
          </label>
          <select 
            id="role"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white cursor-pointer"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="guest">Guest</option>
          </select>
        </div>

        <!-- Submit Button -->
        <button 
          type="submit"
          class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
        >
          Create User
        </button>

        <!-- Result Message -->
        <div id="result" class="text-center"></div>
      </form>

      <!-- Additional Info -->
      <div class="mt-6 text-center text-sm text-gray-600">
        <p>Already have an account? <span class="text-blue-600 hover:text-blue-700 cursor-pointer font-medium hover:underline">Sign in here</span></p>
      </div>
    </div>
  </div>
`

initUserForm()

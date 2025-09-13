import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600">
        Apti<span className="text-green-500">Dost</span>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
        <a href="#home" className="hover:text-blue-600">
          Home
        </a>
        <a href="#features" className="hover:text-blue-600">
          Features
        </a>
        <a href="#mock-tests" className="hover:text-blue-600">
          Mock Tests
        </a>
        <a href="#about" className="hover:text-blue-600">
          About
        </a>
      </nav>

      {/* Buttons */}
      <div className="hidden md:flex gap-4">
        <button className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50">
          Login
        </button>
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
          Sign Up
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-6 gap-4 md:hidden">
          <a href="#home" className="hover:text-blue-600">
            Home
          </a>
          <a href="#features" className="hover:text-blue-600">
            Features
          </a>
          <a href="#mock-tests" className="hover:text-blue-600">
            Mock Tests
          </a>
          <a href="#about" className="hover:text-blue-600">
            About
          </a>
          <button className="w-40 px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50">
            Login
          </button>
          <button className="w-40 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            Sign Up
          </button>
        </div>
      )}
    </header>
  );
}

// "use client";

// import React from "react";
// import Link from "next/link";
// import { Menu, X } from "lucide-react";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = React.useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const navItems = [
//     { name: "Accueil", href: "/" },
//     { name: "Prévisions", href: "/previsions" },
//     { name: "Carte", href: "/carte" },
//     { name: "Articles", href: "/articles" },
//     { name: "Contact", href: "/contact" },
//     { name: "FAQ", href: "/faq" },
//   ];

//   return (
//     <header className="bg-blue-100">
//       <nav className="container mx-auto px-4 py-6">
//         <div className="flex justify-between items-center">
//           <Link href="/" className="text-2xl font-bold text-blue-600">
//             Logo
//           </Link>
//           <div className="hidden md:flex space-x-6">
//             {navItems.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className="text-gray-600 hover:text-blue-600 transition duration-300"
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>
//           <button className="md:hidden" onClick={toggleMenu}>
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//         {isMenuOpen && (
//           <div className="md:hidden mt-4">
//             {navItems.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className="block py-2 text-gray-600 hover:text-blue-600 transition duration-300"
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>
//         )}
//       </nav>
//       <div className="wave-container h-24 relative overflow-hidden">
//         <svg
//           className="absolute bottom-0 w-full h-full"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 1440 320"
//         >
//           <path
//             fill="#ffffff"
//             fillOpacity="1"
//             d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
//           ></path>
//         </svg>
//       </div>
//     </header>
//   );
// };

// export default Header;

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// import logo from "../../../public/src/SiteLogo.png";
// import Image from "next/image";
// import { FaSignInAlt, FaUserCircle, FaUserPlus } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import ProfileModal from "../ProfileModal/ProfileModal";

// const navItems = [
//   { title: "Home", url: "/" },
//   { title: "About Us", url: "/about" },
//   { title: "Leaderboard", url: "/leaderboard" },
//   { title: "FAQ", url: "/faq" },
//   { title: "Contact Us", url: "/contact-us" },
//   { title: "Dashboard", url: "/dashboard" },
// ];

// export default function Header() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);

//   const authState = useSelector((state) => state.user);
//   const { user = null, isLoggedIn = false, loading = true } = authState || {};

//   console.log("Is Authenticated:", isLoggedIn);
//   console.log("User Profile Data:", user);
//   console.log("Loading State:", loading);
//   const email = user?.email;

//   const filteredNavItems = navItems.filter((item) => {
//     if (item.title === "Dashboard") {
//       return !!email;
//     }
//     return true;
//   });
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <header className="sticky top-0 left-0 right-0 z-50 w-full  bg-white backdrop-blur-md border-b border-gray-200 shadow-sm ">
//       <div className="relative container max-w-7xl mx-auto p-5  border-red-400">
//         <div className="container mx-auto">
//           <div className="flex items-center justify-between h-16 lg:h-20">
//             <div className="flex items-center justify-center gap-2 lg:px-8 ">
//               <Link href="/" className="flex items-center gap-2">
//                 <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110">
//                   <Image src={logo} alt="siteLogo" width={56} height={56} />
//                 </div>
//                 <div className="hidden sm:flex flex-col ml-2">
//                   <span className="text-lg lg:text-xl font-bold text-gray-800 tracking-tight">
//                     Zero Olympiad
//                   </span>
//                   <span className="text-[10px] lg:text-xs text-gray-500 uppercase tracking-widest">
//                     Excellence Awaits
//                   </span>
//                 </div>
//               </Link>
//             </div>

//             {/* Logo and Mobile Menu Toggle */}
//             <div className="flex items-center justify-between w-full lg:w-auto">
//               {/* Desktop Navigation */}
//               <nav className="hidden lg:flex items-center gap-6 pr-10">
//                 {filteredNavItems.map((item) => (
//                   <Link
//                     key={item.title}
//                     href={item.url}
//                     className="text-md font-semibold text-gray-700 hover:text-primary transition-colors relative group"
//                   >
//                     {item.title}
//                   </Link>
//                 ))}
//               </nav>

//               {/* Logo */}

//               {/* Mobile Menu Toggle */}
//               <button
//                 onClick={toggleMobileMenu}
//                 className="lg:hidden p-2 text-gray-700 hover:text-primary transition-colors"
//                 aria-label="Toggle menu"
//               >
//                 {isMobileMenuOpen ? (
//                   <AiOutlineClose className="w-6 h-6" />
//                 ) : (
//                   <AiOutlineMenu className="w-6 h-6" />
//                 )}
//               </button>
//             </div>

//             <div>
//               {email ? (
//                 <div className="mt-0 flex items-center gap-4 lg:mt-0">
//                   {!isProfileOpen && (
//                     <button
//                       onClick={() => setIsProfileOpen((prev) => !prev)}
//                       className="flex items-center focus:outline-none cursor-pointer"
//                     >
//                       <div className="w-14 h-14 overflow-hidden border-2 border-purple-500 rounded-full">
//                         {user.profile_image_url ? (
//                           <Image
//                             src={user.profile_image_url || "no image"}
//                             alt="Profile"
//                             width={112}
//                             height={112}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <div className="flex h-full items-center justify-center text-gray-400 font-medium">
//                             <FaUserCircle size={100}></FaUserCircle>
//                           </div>
//                         )}
//                       </div>
//                     </button>
//                   )}
//                   {isProfileOpen && (
//                     <button
//                       onClose={() => setIsProfileOpen(false)}
//                       className="flex items-center focus:outline-none cursor-pointer"
//                     >
//                       <div className="w-14 h-14 overflow-hidden border-2 border-purple-500 rounded-full">
//                         {user.profile_image_url ? (
//                           <Image
//                             src={user.profile_image_url}
//                             alt="Profile"
//                             width={112}
//                             height={112}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <div className="flex h-full items-center justify-center text-gray-400 font-medium">
//                             <FaUserCircle size={100}></FaUserCircle>
//                           </div>
//                         )}
//                       </div>
//                     </button>
//                   )}
//                 </div>
//               ) : (
//                 <div className="hidden lg:flex items-center gap-4">
//                   <Link
//                     href={"/login"}
//                     className="px-5 py-1.5 flex justify-center items-center gap-2 text-lg text-gray-800 font-bold border border-primary rounded-sm hover:bg-primary hover:text-white transition-all"
//                   >
//                     <FaSignInAlt size={18} /> Login
//                   </Link>
//                   <Link
//                     href={"/registration"}
//                     className="px-5 py-1.5 text-lg flex justify-center items-center gap-2 text-white font-bold border border-primary rounded-sm bg-primary hover:bg-white hover:text-primary transition-all"
//                   >
//                     <FaUserPlus size={18} /> Register
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div
//           className={`lg:hidden top-0 left-0 right-0 border-t border-gray-200 shadow-lg transition-all duration-300 ease-in-out ${
//             isMobileMenuOpen
//               ? "flex opacity-100 translate-y-0"
//               : "hidden opacity-0 -translate-y-4 pointer-events-none"
//           }`}
//         >
//           <div className="container mx-auto px-4 py-6">
//             <nav className="flex flex-col gap-4">
//               {filteredNavItems.map((item, index) => (
//                 <Link
//                   key={item.title}
//                   href={item.url}
//                   className="text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100 px-4 py-3 rounded-lg transition-all duration-200"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   style={{ transitionDelay: `${index * 50}ms` }}
//                 >
//                   {item.title}
//                 </Link>
//               ))}
//             </nav>
//             <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-gray-200">
//               <Link
//                 href={"/login"}
//                 className="w-full py-3 flex justify-center items-center gap-2 text-gray-800 border border-primary rounded-lg hover:bg-primary hover:text-white transition-all"
//               >
//                 <FaSignInAlt size={16} /> Login
//               </Link>
//               <Link
//                 href={"/registration"}
//                 className="w-full py-3 flex justify-center items-center gap-2 text-white bg-primary rounded-lg hover:bg-white hover:text-primary transition-all"
//               >
//                 <FaUserPlus size={18} /> Register
//               </Link>
//             </div>
//           </div>
//         </div>
//         <ProfileModal
//           isOpen={isProfileOpen}
//           onClose={() => setIsProfileOpen(false)}
//         />
//       </div>
//     </header>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import logo from "../../../public/src/SiteLogo.png";
import Image from "next/image";
import { FaSignInAlt, FaUserCircle, FaUserPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import ProfileModal from "../ProfileModal/ProfileModal";

const navItems = [
  { title: "Home", url: "/" },
  { title: "About Us", url: "/about" },
  { title: "Leaderboard", url: "/leaderboard" },
  { title: "FAQ", url: "/faq" },
  { title: "Contact Us", url: "/contact-us" },
  { title: "Dashboard", url: "/dashboard" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Reference for the profile button and modal container
  const profileRef = useRef(null);

  const authState = useSelector((state) => state.user);
  const { user = null, isLoggedIn = false } = authState || {};
  const email = user?.email;

  // Handle scroll effect for sticky header styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logic to close modal when clicking anywhere else on the display
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  // Filter navigation items based on authentication status
  const filteredNavItems = navItems.filter((item) => {
    if (item.title === "Dashboard") return !!email;
    return true;
  });

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-2"
          : "bg-white py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-12 h-12 lg:w-14 lg:h-14 transition-transform duration-500 group-hover:rotate-[10deg]">
              <Image
                src={logo}
                alt="Zero Olympiad"
                fill
                className="object-contain"
              />
            </div>
            <div className="ml-3">
              <h1 className="mb-1 text-xl lg:text-2xl font-extrabold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent leading-none">
                Zero Olympiad
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium">
                Excellence Awaits
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {filteredNavItems.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className={`relative text-sm font-bold transition-colors duration-300 hover:text-primary ${
                  pathname === item.url ? "text-primary" : "text-gray-600"
                } group`}
              >
                {item.title}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                    pathname === item.url ? "w-full" : ""
                  }`}
                ></span>
              </Link>
            ))}
          </nav>

          {/* Right Section: Auth or Profile */}
          <div className="flex items-center gap-4">
            {email ? (
              <div className="relative" ref={profileRef}>
                {/* Profile Toggle Button */}
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="relative p-0.5 rounded-full transition-all active:scale-95 cursor-pointer focus:outline-none"
                  aria-haspopup="true"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden border-2 border-purple-500 hover:border-primary transition-colors shadow-inner">
                    {user.profile_image_url ? (
                      <Image
                        src={user.profile_image_url}
                        alt="Profile"
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <FaUserCircle className="w-full h-full text-gray-300 bg-gray-100" />
                    )}
                  </div>
                  <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm"></span>
                </button>

                {/* Profile Modal - Positioned absolutely relative to the container */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-72 origin-top-right z-[100] animate-in fade-in zoom-in duration-200">
                    <ProfileModal
                      isOpen={isProfileOpen}
                      onClose={() => setIsProfileOpen(false)}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-6 py-2 text-sm font-bold text-gray-700 hover:text-primary transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/registration"
                  className="px-6 py-2.5 text-sm font-bold text-white bg-primary rounded-full shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <AiOutlineClose size={24} />
              ) : (
                <AiOutlineMenu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-8 space-y-4">
          {filteredNavItems.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block text-lg font-semibold transition-all ${
                pathname === item.url
                  ? "text-primary translate-x-2"
                  : "text-gray-800"
              }`}
            >
              {item.title}
            </Link>
          ))}

          {!email && (
            <div className="flex flex-col gap-3 pt-6 border-t border-gray-100">
              <Link
                href="/login"
                className="flex items-center justify-center py-3 font-bold text-gray-700 bg-gray-50 rounded-xl"
              >
                Login
              </Link>
              <Link
                href="/registration"
                className="flex items-center justify-center py-3 font-bold text-white bg-primary rounded-xl"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

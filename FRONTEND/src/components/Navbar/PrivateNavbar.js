import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import { FiLogOut } from "react-icons/fi";
import { FaCreativeCommonsShare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logoutAPI } from "../../apis/user/usersAPI";
import { useAuth } from "../../AuthContext/AuthContext";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
};
const navigation = [
  { name: "Dashboard", href: "/dashboard", current: true },
  { name: "Pricing", href: "/plans", current: true },
];
const userNavigation = [{ name: "Sign out", href: "#" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PrivateNavbar() {
  const { logout } = useAuth();
  const mutation = useMutation({ mutationFn: logoutAPI });

  const handleLogout = () => {
    mutation.mutate();
    logout();
  };

  return (
    <Disclosure
      as="nav"
      className="bg-white/10 backdrop-blur-md border-b border-white/20 shadow-sm fixed w-full z-50 font-inter"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-100 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="text-white">
                    <FaCreativeCommonsShare className="h-10 w-10" />
                  </Link>
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "bg-white/20 text-white"
                          : "text-gray-100 hover:bg-white/10 hover:text-white transition-all duration-200",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex flex-shrink-0 gap-2">
                  {[
                    { to: "/ai-job-search", label: "AI Job Search" },
                    { to: "/ai-skill-assessment", label: "AI Skill Assessment" },
                    { to: "/ai-mock-interview", label: "Ai Mock Interview" },
                    { to: "/analyse-job", label: "Analyse Job" },
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="relative animate-bounce inline-flex items-center gap-x-1.5 rounded-md bg-purple-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 transition-all duration-200"
                    >
                      <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                      {item.label}
                    </Link>
                  ))}

                  <button
                    onClick={handleLogout}
                    type="button"
                    className="ml-2 inline-flex items-center gap-x-1.5 rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 transition-all duration-200"
                  >
                    <FiLogOut className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                  <Menu as="div" className="relative ml-3">
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Panel */}
          <Disclosure.Panel className="md:hidden bg-white/5 backdrop-blur-md">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-white/20 text-white"
                      : "text-gray-100 hover:bg-white/10 hover:text-white transition-all duration-200",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-white/10 pb-3 pt-4">
              <div className="flex items-center px-5 sm:px-6">
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-300">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2 sm:px-3">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/10 hover:text-white"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

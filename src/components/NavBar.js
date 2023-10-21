import Link from "next/link";
import Logo from "./Logo";
import { useRouter } from "next/router";
import { FacebookIcon, GithubMainIcon, GmailIcon, InstagramIcon, LinkArrow, LinkedinMainIcon, MoonIcon, SunIcon } from "./Icons";
import { motion } from "framer-motion";
import useThemeSwitcher from "./hooks/useThemeSwitcher";
import { useState } from "react";
import FetchDataFromFireBase, { responseStatus } from "../data/fetchDataFromFireBase";

const CustomLink = ({ href, title, className = "" }) => {
    const router = useRouter();
    return (
        <Link href={href} className={`${className} relative group`}>
            {title}
            <span
                className={`h-[2px] inline-block bg-dark absolute left-0 -bottom-1 
            group-hover:w-full transition-[width] ease duration-50
            ${router.asPath === href ? "w-full" : "w-0"} dark:bg-light
            `}
            >
                &nbsp;
            </span>
        </Link>
    );
};

const CustomMobileLink = ({ href, title, className = "", toggle }) => {
    const router = useRouter();

    const handleClick = () => {
        toggle();
        router.push(href);
    };

    return (
        <button
            href={href}
            className={`${className} relative group text-light dark:text-dark my-2`}
            onClick={handleClick}
        >
            {title}
            <span
                className={`h-[2px] inline-block bg-light absolute left-0 -bottom-1 
            group-hover:w-full transition-[width] ease duration-300
            ${router.asPath === href ? "w-full" : "w-0"} dark:bg-dark
            `}
            >
                &nbsp;
            </span>
        </button>
    );
};

const NavBar = () => {
    const router = useRouter();
    const componentName = "ContactMe";
    const endPoint = componentName + ".json";
    let response = FetchDataFromFireBase(endPoint, componentName);
    const isSuccess = response && response.message === responseStatus.success;
    let data = response.data;

    const [mode, setMode] = useThemeSwitcher();
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            {isSuccess && <header className="w-full pr-0 py-6 font-medium flex items-center justify-center dark:text-light relative z-10">
                <button
                    className=" flex-col justify-center items-center hidden lg:flex lg:absolute lg:left-5 lg:top-10"
                    onClick={handleClick}
                >
                    <span
                        className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm  ${isOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
                            }`}
                    ></span>
                    <span
                        className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? "opacity-0" : "opacity-100"
                            }`}
                    ></span>
                    <span
                        className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
                            }`}
                    ></span>
                </button>
                <button
                    className={`w-6 scale-150 flex items-center hidden lg:flex absolute lg:right-7 lg:top-9 justify-center rounded-full ${mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
                        }`}
                    onClick={() => setMode(mode === "light" ? "dark" : "light")}
                >
                    {mode === "dark" ? (
                        <SunIcon className={"fill-dark"} />
                    ) : (
                        <MoonIcon className={"fill-dark"} />
                    )}
                </button>
                <div className="w-full flex justify-around items-center justify-around lg:hidden">
                    <div className="">
                        <Logo />
                    </div>
                    <nav className="flex mx-25 items-center justify-end flex-wrap">
                        <CustomLink href="/" title="Home" className="mr-4" />
                        <CustomLink href="/about" title="About Me" className="mr-4" />
                        <CustomLink href="/skills" title="Skills" className="mr-4" />
                        <CustomLink href="/experience" title="Work Exp" className="mr-4" />
                        <CustomLink href="/projects" title="Projects" className="mr-4" />
                        <CustomLink href="/contact" title="Contact" className="mr-4" />
                    </nav>
                    <nav className="flex items-center justify-center flex-wrap">
                        <motion.a
                            href={data.faceBook.link}
                            target="_blank"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.7 }}
                            className="w-6 mx-4 lg:mx-2"
                            style={{ scale: 0.8 }}
                        >
                            <FacebookIcon />
                        </motion.a>
                        <motion.a
                            href={data.insta.link}
                            target="_blank"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.7 }}
                            className="w-6 mx-4 lg:mx-2"
                            style={{ scale: 0.8 }}
                        >
                            <InstagramIcon />
                        </motion.a>
                        <motion.a
                            href={data.linkedIn.link}
                            target="_blank"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.7 }}
                            className="w-6 mx-4 lg:mx-2"
                            style={{ scale: 0.8 }}
                        >
                            <LinkedinMainIcon />
                        </motion.a>
                        <motion.a
                            href={data.github.link}
                            target="_blank"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-6 mx-4 lg:mx-2"
                            style={{ scale: 0.8 }}
                        >
                            <GithubMainIcon />
                        </motion.a>
                        <motion.a
                            href={data.mail.link}
                            target="_blank"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-6 mx-4 lg:mx-2"
                            style={{ scale: 0.8 }}

                        >
                            <GmailIcon />
                        </motion.a>
                    </nav>
                    <button
                        className={`w-6 scale-150 flex items-center justify-center rounded-full p-1 ${mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
                            }`}
                        onClick={() => setMode(mode === "light" ? "dark" : "light")}
                    >
                        {mode === "dark" ? (
                            <SunIcon className={"fill-dark"} />
                        ) : (
                            <MoonIcon className={"fill-dark"} />
                        )}
                    </button>
                </div>

                {isOpen ? (
                    <motion.div
                        initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="min-w-[70vw] flex flex-col justify-between z-30 items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark/90 dark:bg-light/75 rounded-lg backdrop-blur-md py-32"
                    >
                        <button
                            className=" flex-col justify-center items-center lg:flex absolute left-5 top-10"
                            onClick={handleClick}
                        >
                            <span
                                className={`bg-light dark:bg-dark block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm  ${isOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
                                    }`}
                            ></span>
                            <span
                                className={`bg-light dark:bg-dark block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? "opacity-0" : "opacity-100"
                                    }`}
                            ></span>
                            <span
                                className={`bg-light dark:bg-dark block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
                                    }`}
                            ></span>
                        </button>
                        <button
                            className={`w-6 scale-150 flex items-center justify-center rounded-full absolute top-8 right-10 p-1 ${mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
                                }`}
                            onClick={() => setMode(mode === "light" ? "dark" : "light")}
                        >
                            {mode === "dark" ? (
                                <SunIcon className={"fill-dark"} />
                            ) : (
                                <MoonIcon className={"fill-dark"} />
                            )}
                        </button>
                        <nav className="flex items-center flex-col justify-center">
                            <CustomMobileLink
                                href="/"
                                title="Home"
                                className=""
                                toggle={handleClick} />
                            <CustomMobileLink
                                href="/about"
                                title="About Me"
                                className=""
                                toggle={handleClick} />
                            <CustomMobileLink
                                href="/skills"
                                title="Skills"
                                className=""
                                toggle={handleClick} />
                            <CustomMobileLink
                                href="/experience"
                                title="Work Exp"
                                className=""
                                toggle={handleClick} />
                            <CustomMobileLink
                                href="/projects"
                                title="Projects"
                                className=""
                                toggle={handleClick} />
                            <CustomMobileLink
                                href="/contact"
                                title="Contact"
                                className=""
                                toggle={handleClick} />
                            <Link href={data.resumeLink}
                                target="_blank"
                                className="flex mr-1 my-5 items-center bg-light text-dark p-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-dark hover:text-light border-2 border-solid border-transparent hover:border-light dark:bg-dark dark:text-light hover:dark:bg-light hover:dark:text-dark hover:dark:border-dark md:p-2 md:px-4 md:text-base"
                                download={true}
                            >
                                Resume <LinkArrow className={"w-6 ml-1"} />
                            </Link>
                        </nav>

                        <nav className="flex items-center mr-auto justify-center flex-wrap mt-2">
                            <motion.a
                                href={data.faceBook.link}
                                target="_blank"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.7 }}
                                className="w-6 mx-3"
                            >
                                <FacebookIcon />
                            </motion.a>

                            <motion.a
                                href={data.insta.link}
                                target="_blank"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.7 }}
                                className="w-6 mx-3"
                            >
                                <InstagramIcon />
                            </motion.a>
                            <motion.a
                                href={data.linkedIn.link}
                                target="_blank"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-6 mx-3"
                            >
                                <LinkedinMainIcon />
                            </motion.a>
                            <motion.a
                                href={data.github.link}
                                target="_blank"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-6 mx-3"
                            >
                                <GithubMainIcon />
                            </motion.a>
                            <motion.a
                                href={data.mail.link}
                                target="_blank"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-6 mx-3"
                            >
                                <GmailIcon />
                            </motion.a>
                        </nav>

                    </motion.div>
                ) : null}

                <div className="absolute left-[50%] top-4 translate-x-[-50%] lg:flex hidden">
                    <Logo />
                </div>
            </header>}
        </>
    );
};

export default NavBar;

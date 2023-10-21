import Layout from "./Layout";
import Technologies from "./Technologies";

const Footer = () => {
    return (
        <footer className="w-full border-t-2 border-solid border-dark font-medium text-lg dark:text-light dark:border-light sm:text-base p-0">
            <Layout className="py-8 flex items-center justify-evenly lg:flex-col ">
                <div className="lg:mb-3">
                    <div className="lg:text-center">
                        Build with{" "}
                        <span className="text-primary dark:text-primaryDark text-2xl px-1">
                            &#9825;
                        </span>{" "}
                        by&nbsp;
                        <span className="underline underline-offset-2">Rohan</span>
                    </div>
                    <div className="w-full flex justify-between mx-auto">
                        <Technologies tech1="#nextJS" tech2="#tailwindcss" tech3="#framer-motion" tech4="#Firebase" />
                    </div>
                </div>
                <div className="lg:mt-3">
                    <div>{new Date().getFullYear()} &copy; All Rights Reserved</div>
                    <div className="w-full flex justify-end mx-auto text-xs sm:justify-center">
                        Special Thanks &nbsp;
                        <a
                            href="https://github.com/codebucks27"
                            className="underline underline-offset-2 cursor-pointer text-indigo-700 dark:text-purple-300">
                            CodeBucks
                        </a>
                        !
                    </div>
                </div>
            </Layout>
        </footer>
    );
};
export default Footer;

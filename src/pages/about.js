import Head from "next/head";
import AnimatedText from "../components/AnimatedText";
import Layout from "../components/Layout";
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import Education, { Courses } from "../components/Education";
import TransitionEffect from "../components/TransitionEffect";
import { LinkArrow } from "../components/Icons";
import Link from "next/link";
import { useRouter } from "next/router";
import FetchDataFromFireBase, { responseStatus } from "../data/fetchDataFromFireBase";
import { motion } from "framer-motion";
import { divVariant } from "../data/motion";

import Loader from "../components/Loader";
import { FramerImage } from "./projects";


export const AnimatedNumbers = ({ value, className }) => {
    const ref = useRef(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: 3000 });
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current && latest.toFixed(0) <= value) {
                ref.current.textContent = latest.toFixed(0);
            }
        });
    }, [springValue, value]);
    return <span className={className} ref={ref}></span>;
};

const About = () => {
    const router = useRouter();
    const componentName = "AboutMe";
    const endPoint = componentName + ".json";
    let response = FetchDataFromFireBase(endPoint, componentName);
    const isSuccess = response && response.data && response.message === responseStatus.success;
    let data = response.data;
    return (
        <>
            <Head>
                <title>Rohan Chaudhary</title>

                <meta
                    name="description"
                    content="My Portfolio"
                />
                <meta property="og:title" content="About Me Page" />
            </Head>
            <TransitionEffect />
            {!isSuccess && <Loader text={response.message} />}

            {isSuccess &&
                <main className="flex w-full flex-col items-center justify-center dark:text-light">
                    <Layout className="p-32 pt-16 xl:p-24 lg:p-16 md:p-12 sm:pt-8 md:mt-10">
                        <AnimatedText
                            text="About Me"
                            className="mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
                        />
                        <motion.div initial="hidden"
                            whileInView="show" variants={divVariant(0.2)} className="grid w-full grid-cols-8 gap-16 sm:gap-8">
                            <div className="m-auto col-span-4 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8 dark:bg-dark dark:border-light xl:col-span-8 md:col-span-8 md:order-1">
                                <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[102%] rounded-[2rem] bg-dark dark:bg-light" />
                                <FramerImage
                                    src={data.profileImage}
                                    alt="Rohan Chaudhary picture photo"
                                    className="w-full h-auto rounded-2xl"
                                    priority
                                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                                />
                            </div>
                            <div className="hidden md:block" />

                            <div className="col-span-4 flex flex-col items-center justify-start xl:col-span-8 md:col-span-8 md:order-2">
                                <h2 className="mb-4 text-lg font-bold uppercase text-primary dark:text-primaryDark">
                                    {data.aboutTitle}
                                </h2>
                                <p className="text-justify font-medium indent-10">
                                    {data.aboutPara}
                                </p>
                                <h2 className=" my-4 text-lg font-bold uppercase text-primary dark:text-primaryDark">
                                    Personal Details
                                </h2>
                                <p className="text-justify font-medium indent-10">
                                    {data.personalDetails}
                                </p>
                            </div>
                        </motion.div>
                        <Education />
                        <Courses courses={data.courses} />
                    </Layout>
                    <motion.div initial="hidden"
                        whileInView="show" variants={divVariant(0.1)} className="m-auto w-3/4 flex flex-col items-center">
                        <h2 className="text-lg mb-5 font-bold uppercase text-center text-dark/75 dark:text-light/75">
                            Interested in knowing more about me ?
                        </h2>
                        <Link
                            href="/contact"
                            className="flex mb-5 items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base"
                        >Contact Me<LinkArrow className={"w-6 ml-1"} />
                        </Link>
                    </motion.div>
                </main>
            }
        </>
    );
};
export default About;

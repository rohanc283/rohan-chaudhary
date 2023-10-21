import Head from "next/head";
import Layout from "../components/Layout";
import AnimatedText from "../components/AnimatedText";
import Link from "next/link";
import { LinkArrow } from "../components/Icons";
import TransitionEffect from "../components/TransitionEffect";
import FetchDataFromFireBase, { responseStatus } from "../data/fetchDataFromFireBase";
import { TypeAnimation } from "react-type-animation";
import WhatDoIDo from "../components/WhatDoIDo/WhatDoIDo";
import { motion } from "framer-motion";
import { divVariant } from '../data/motion'
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import { FramerImage } from "./projects";


export default function Home() {
    const router = useRouter();
    const componentName = "Profile";
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
                <meta property="og:title" content="Index Page" />
            </Head>
            <TransitionEffect />
            {!isSuccess && <Loader text={response.message} />}
            {isSuccess &&
                <motion.main className="flex items-center flex-col justify-center text-dark w-full min-h-screen dark:text-light">
                    <Layout className="p-32 w-full mt-10 pt-0 xl:p-24 lg:p-16 md:p-12 md:pt-16 sm:pt-8">
                        <motion.div initial="hidden"
                            whileInView="show" variants={divVariant(0.2)} className="flex items-center justify-between w-full lg:flex-col-reverse lg:mt-20">
                            <div className="w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center">

                                <p className="my-4 text-base font-medium mr-1 text-center md:text-sm sm:text-xs lg:mt-10">
                                    Hello, Its Me
                                </p>

                                <AnimatedText
                                    text="Rohan Chaudhary"
                                    className="!text-6xl uppercase font-bold text-primary dark:text-primaryDark !text-center !text-left xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl"
                                />
                                <div className="my-4 text-base font-medium text-center md:text-sm sm:text-xs">
                                    <TypeAnimation
                                        sequence={data.profession}
                                        wrapper="span"
                                        speed={1}
                                        deletionSpeed={1}
                                        style={{ fontSize: '2em', display: 'inline-block' }}
                                        repeat={Infinity} className="my-4 font-medium text-center"
                                    />
                                </div>
                                <div className="flex items-center self-center mt-2 lg:self-center">
                                    <Link
                                        href={data.resumeLink}
                                        target="_blank"
                                        className="flex mr-1 items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base"
                                        download={true}
                                    >
                                        Resume <LinkArrow className={"w-6 ml-1"} />
                                    </Link>
                                    <Link
                                        href={data.mail}
                                        className="flex ml-1 items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base"
                                    >
                                        HireMe <LinkArrow className={"w-6 ml-1"} />
                                    </Link>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <FramerImage
                                    src={data.profilePic}
                                    alt="Rohan Chaudhary's generated profile pic"
                                    className="h-auto m-auto rounded-full shadow-2xl lg:inline-block lg:w-full"
                                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 50vw"
                                />
                            </div>
                        </motion.div>
                    </Layout>
                    <WhatDoIDo data={data} />
                </motion.main>
            }
        </>
    );
}

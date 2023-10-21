import AnimatedText from "../components/AnimatedText";
import Head from "next/head";
import Layout from "../components/Layout";
import Link from "next/link";
import { GithubIcon, LinkArrow } from "../components/Icons";
import { motion } from "framer-motion";
import Technologies from "../components/Technologies";
import TransitionEffect from "../components/TransitionEffect";
import FetchDataFromFireBase, { responseStatus } from "../data/fetchDataFromFireBase";
import { divVariant } from "../data/motion";
import Loader from "../components/Loader";


const DisplayProjects = ({ projects }) => {
    projects = projects.sort((a, b) => {
        if (a.year == b.year) {
            return b.month - a.month;
        }
        return b.year - a.year;

    });
    const personalProjects = projects;
    return personalProjects && personalProjects.map(function (project, index) {
        const title = project.title;
        const img = project.thumbNail;
        const summary = project.desc;
        const link = project.videoLink;
        const github = project.sourceCodeLink;
        const technologies = project.technologies;

        return (
            <FeaturedProject
                key={index}
                title={title}
                img={img}
                summary={summary}
                link={link}
                github={github}
                technologies={technologies}
            />
        );

    });
};

const FeaturedProject = ({ title, summary, img, link, github, technologies }) => {
    const tech1 = technologies[0];
    const tech2 = technologies[1];
    const tech3 = technologies[2];
    return (
        <motion.div initial="hidden" whileInView="show" variants={divVariant(0.2)} className="col-span-12">
            <article className="w-full flex items-center justify-between relative rounded-3xl border border-solid border-dark bg-light shadow-2xl p-12 rounded-br-2xl dark:bg-dark dark:border-light lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4">
                <div className="absolute top-0 left-0 -right-3 -z-10 w-[101.5%] h-[102%] rounded-[2.5rem] bg-dark rounded-br-3xl dark:bg-light xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]" />
                <div
                    className="w-1/2 cursor-pointer overflow-hidden rounded-lg lg:w-full" >
                    <FramerImage
                        src={img}
                        alt={title}
                        className="w-full h-auto flex justify-center items-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 50vw"
                    />
                </div>
                <div className="w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6">
                    <h2 className="my-2 w-full text-left text-3xl font-bold text-primary dark:text-primaryDark lg:text-2xl">
                        {title}
                    </h2>
                    <p className="my-2 font-medium text-dark dark:text-light text-justify sm:text-sm">
                        {summary}
                    </p>
                    <div className="flex flex-row justify-normal">
                        <Technologies tech1={tech1} tech2={tech2} tech3={tech3} />
                    </div>
                    <div className="mt-5 flex items-center">
                        {link && <Link
                            href={link}
                            target="_blank"
                            className="rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold dark:bg-light dark:text-dark sm:px-4 sm:text-base"
                        >
                            View Video
                        </Link>}
                        {github && <Link href={github} target="_blank" className={`${link ? 'ml-4' : ''} w-10`}>
                            <GithubIcon />
                        </Link>}
                    </div>
                </div>
            </article>
        </motion.div>
    );
};

export const FramerImage = (motion.img);

const Projects = () => {
    const componentName = "Projects";
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
                <meta property="og:title" content="Projects Page" />
            </Head>
            <TransitionEffect />
            {!isSuccess && <Loader text={response.message} />}
            {isSuccess &&
                <main className="w-full flex flex-col items-center justify-center dark:text-light">
                    <Layout className="pt-16 p-32 xl:p-24 lg:p-32 md:p-12 sm:pt-8 md:mt-10">
                        <motion.div initial="hidden" whileInView="show" variants={divVariant(0.2)}>
                            <AnimatedText
                                text="My Recent Projects"
                                className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
                            />
                            <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
                                <DisplayProjects projects={data} />
                            </div>
                            <h2 className="font-bold text-6xl mt-32 w-full text-center md:text-6xl xs:text-4xl">
                                More To Come
                            </h2>
                        </motion.div>
                    </Layout>
                    <motion.div initial="hidden" whileInView="show" variants={divVariant(0.2)} className="m-auto w-3/4 flex flex-col items-center mt-10">
                        <h2 className="text-lg mb-5 font-bold uppercase text-center text-dark/75 dark:text-light/75">
                            Ready to collaborate and embark on exciting projects together ?
                        </h2>
                        <Link
                            href="/contact"
                            className="flex mb-5  items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base"
                        >
                            Contact Me <LinkArrow className={"w-6 ml-1"} />
                        </Link>
                    </motion.div>
                </main>
            }
        </>
    );
};
export default Projects;

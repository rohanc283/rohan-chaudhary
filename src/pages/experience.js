import Head from "next/head";
import Layout from "../components/Layout";
import Experience from "../components/Experience";
import TransitionEffect from "../components/TransitionEffect";
import Link from "next/link";
import { LinkArrow } from "../components/Icons";
import FetchDataFromFireBase, { responseStatus } from "../data/fetchDataFromFireBase";
import { motion } from "framer-motion";
import { divVariant } from "../data/motion";
import Loader from "../components/Loader";

const ExperienceSection = () => {
  const componentName = "Experience";
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
        <meta property="og:title" content="Experience Page" />
      </Head>
      <TransitionEffect />
      {!isSuccess && <Loader text={response.message} />}
      {isSuccess &&
        <main className="flex w-full flex-col items-center justify-center dark:text-light">
          <Layout className="p-32 pt-16 xl:p-24 lg:p-16 md:p-12 sm:pt-8 md:mt-10 ">
            <Experience data={data} />
          </Layout>
          <motion.div initial="hidden" whileInView="show" variants={divVariant(0.2)} className="m-auto w-3/4 flex flex-col items-center mt-24">
            <h2 className="text-lg mb-5 font-bold uppercase text-center text-dark/75 dark:text-light/75">
              Interested in having me join your organization ?
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
export default ExperienceSection;

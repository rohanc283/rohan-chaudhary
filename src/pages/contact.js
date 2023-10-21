import Head from "next/head";
import Layout from "../components/Layout";
import TransitionEffect from "../components/TransitionEffect";
import AnimatedText from "../components/AnimatedText";
import FetchDataFromFireBase, { responseStatus } from "../data/fetchDataFromFireBase";
import Contact from "../components/contact/Contact";
import { motion } from "framer-motion";
import { divVariant } from "../data/motion";
import Loader from "../components/Loader";

const ContactSection = () => {
  const componentName = "ContactMe";
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
        <meta property="og:title" content="Contact Page" />
      </Head>
      <TransitionEffect />
      {!isSuccess && <Loader text={response.message} />}
      {isSuccess &&
        <main className="w-full flex flex-col items-center justify-center dark:text-light">
          <Layout className="pt-16 p-32 xl:p-24 lg:p-32 md:p-12 sm:pt-8 md:mt-10">
            <motion.div initial="hidden"
              whileInView="show" variants={divVariant(0.2)}>

              <AnimatedText
                text="Contact Me"
                className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
              />
              <Contact data={data} />
            </motion.div>

          </Layout>
        </main>
      }
    </>
  );
};
export default ContactSection;

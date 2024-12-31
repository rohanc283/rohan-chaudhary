import { useScroll, motion } from "framer-motion";
import { useRef } from "react";
import LiIcon from "./LiIcon";
import AnimatedText from "./AnimatedText";
import { divVariant } from "../data/motion";

const ExperienceDetails = ({ experiences, index }) => {
    return (
        experiences &&
        experiences.map((exp, index) => (
            <Details
                key={index}
                position={exp.position}
                company={exp.companyName}
                companyLink={exp.companyLink}
                time={exp.duration}
                module={exp.module}
                description={exp.description}
                clients={exp.clients}
                awards={exp.awards}
            />
        ))
    );
};

const Details = ({
    position,
    company,
    companyLink,
    time,
    module,
    description,
    clients,
    awards,
}) => {
    const ref = useRef(null);

    const displayDescription = (works) => {
        return (
            works &&
            works.map((work, index) => {
                return <li key={index}>{work}</li>;
            })
        );
    };
    const displayClients = (clients) => {
        return (
            clients &&
            clients.map((client) => {
                return (
                    <div key={client.id} className="list-disc ms-9">
                        <h3 className="capitalize mt-5 font-bold text-xl sm:text-xl xs:text-lg">
                            {client.position}&nbsp;
                            <a
                                href={client.clientLink}
                                target="_blank"
                                className="text-primary dark:text-primaryDark capitalize cursor-pointer"
                            >
                                @{client.clientName}
                            </a>
                        </h3>
                        <span className="capitalize mt-5 font-medium text-dark/75 dark:text-light/75 xs:text-sm">
                            {client.duration}
                        </span>
                        <h6 className="capitalize font-bold  text-primary dark:text-primaryDark capitalize pointer">
                            {client.module}
                        </h6>
                        <div className="text-justify my-5 font-medium text-md w-full md:text-sm">
                            {displayDescription(client.description)}
                        </div>
                    </div>
                );
            })
        );
    };
    return (
        <li
            ref={ref}
            className="my-8 first:mt-0 last:mb-0 w-[90%] mx-auto flex flex-col justify-between md:w-[80%]"
        >
            <LiIcon reference={ref} />
            <motion.div
                initial={{ y: 50 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
            >
                <h3 className="capitalize mt-5 font-bold text-xl sm:text-xl xs:text-lg">
                    {position}&nbsp;
                    <a
                        href={companyLink}
                        target="_blank"
                        className="text-primary dark:text-primaryDark capitalize cursor-pointer"
                    >
                        @{company}
                    </a>
                </h3>
                <span className="capitalize mt-5 font-medium text-dark/75 dark:text-light/75 xs:text-sm">
                    {time}
                </span>
                <h6 className="capitalize font-bold  text-primary dark:text-primaryDark capitalize pointer">
                    {module}
                </h6>
                <h6 className="capitalize font-bold  text-primary dark:text-primaryDark capitalize pointer">
                    Awards
                </h6>
                <div className="text-justify my-5 ml-5 font-medium text-md w-full md:text-sm">
                    <ul>
                        {awards &&
                            awards.map((award, index) => (
                                <li key={index} className="list-disc ms-9">
                                    {award}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="text-justify my-5 ml-5 font-medium text-md w-full md:text-sm">
                    <ul>{displayDescription(description)}</ul>
                </div>
                <h6 className="capitalize font-bold text-primary dark:text-primaryDark capitalize pointer">
                    Clients
                </h6>
                <div className="text-justify my-5 ml-5 font-medium text-md w-full md:text-sm">
                    {displayClients(clients)}
                </div>
            </motion.div>
        </li>
    );
};

const Experience = ({ data }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center start"],
    });
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            variants={divVariant(0.2)}
            className="mt-30"
        >
            <AnimatedText
                text="Experiences"
                className="mb-5 lg:!text-6xl sm:mb-8 sm:!text-4xl xs:!text-2xl"
            />
            <div className="text-center mb-16 md:mb-16">
                My work experience as a software engineer , full stack and android developer ,
                working on different companies and projects.
            </div>
            <div ref={ref} className="w-[90%] mx-auto relative lg:w-[90%] md:w-full">
                <motion.div
                    className="absolute left-9 top-0.5 w-[4px] h-full bg-dark origin-top dark:bg-light md:w-[2px] md:left-[30px] xs:left-[20px]"
                    style={{ scaleY: scrollYProgress }}
                />
                <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
                    <ExperienceDetails experiences={data} />
                </ul>
            </div>
        </motion.div>
    );
};
export default Experience;

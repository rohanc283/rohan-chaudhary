import { useScroll, motion } from "framer-motion";
import { useRef } from "react";
import LiIcon from "./LiIcon";
import { education } from "./data/Education";
import Link from "next/link";
import { divVariant } from "../data/motion";

const EducationDetails = ({ education }) => {
    return education && education.map((educationFact) => (
        <Details
            key={educationFact.name}
            name={educationFact.name}
            company={educationFact.company}
            year={educationFact.year}
            place={educationFact.address}
            score={educationFact.score}
        />
    ));
};

const CourseDetails = ({ courses }) => {
    courses = courses && courses.sort((a, b) => {
        if (a.completionYear == b.completionYear) {
            if (a.month == b.month) {
                return b.day - a.day;
            }
            return b.month - a.month;
        }
        return b.completionYear - a.completionYear;

    });
    return courses && courses.map((courses, index) => (
        <Details
            key={index}
            name={courses.courseTitle}
            company={courses.from}
            year={courses.completionYear}
            place=""
            link={courses.credentialLink}
        />
    ));
};

const Details = ({ name, company, year, place, link, score }) => {
    const ref = useRef(null);
    return (
        <li
            ref={ref}
            className="my-8 first:mt-0 4xl:last:mb-19 2xl:last:mb-1 xl:last:mb-10 xs:last:mb-5 w-[60%] mx-auto flex flex-col justify-between md:w-[80%]"
        >
            <LiIcon reference={ref} />
            <motion.div
                initial={{ y: 50 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}>
                <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg">{name}</h3>
                <span className="capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm">
                    {year} |{" "}
                    <span className="uppercase font-bold text-primary dark:text-primaryDark">
                        {company}
                    </span>{" "}
                    {company && "-"} {place} 
                    {score && <h3 className="capitalize font-bold">{score}</h3>}
                    {link && <Link href={link} target="_blank" className="uppercase font-bold hover:underline">Credential</Link>}
                </span>
            </motion.div>
        </li>
    );
};

const Education = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center start"],
    });
    return (
        <motion.div initial="hidden"
            whileInView="show" variants={divVariant(0.2)} className="my-32">
            <h2 className="font-bold text-6xl mb-32 w-full text-center md:text-4xl xs:text-2xl md:mb-16">
                Education
            </h2>
            <div ref={ref} className="w-[75%] mx-auto relative lg:w-[90%] md:w-full">
                <motion.div
                    className="absolute left-9 top-0.5 w-[4px] h-full bg-dark origin-top dark:bg-light md:w-[2px] md:left-[30px] xs:left-[20px]"
                    style={{ scaleY: scrollYProgress }}
                />
                <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
                    <EducationDetails education={education} />
                </ul>
            </div>
        </motion.div>
    );
};

export const Courses = ({ courses }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center start"],
    });
    return (
        <motion.div initial="hidden"
            whileInView="show" variants={divVariant(0.2)} className="mt-32">
            <h2 className="font-bold text-6xl mb-32 w-full text-center md:text-4xl xs:text-2xl md:mb-16">
                Courses /<br />Certifications
            </h2>
            <div ref={ref} className="w-[75%] mx-auto relative lg:w-[90%] md:w-full">
                <motion.div
                    className="absolute left-9 top-0.5 w-[4px] h-full bg-dark origin-top dark:bg-light md:w-[2px] md:left-[30px] xs:left-[20px]"
                    style={{ scaleY: scrollYProgress }}
                />
                <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
                    <CourseDetails courses={courses} />
                </ul>
            </div>
        </motion.div>
    );
};
export default Education;

import { motion } from "framer-motion";
import { skills } from "./data/Skills";
import { divVariant } from "../data/motion";

const displaySkills = (skills) => {
    return skills && skills.skillsArray && skills.skillsArray.map(function (skill) {
        var name = skill.name;
        var x = skill.x;
        var y = skill.y;

        return (
            <motion.div
                key={name}
                className={`flex items-center justify-center rounded-full font-semibold ${skill.colorLight} text-light py-3 px-6 shadow-dark cursor-pointer absolute dark:text-dark dark:${skill.colorDark} lg:py-2 lg:px-4 md:text-sm md:py-1.5 md:px-3 sm:bg-transparent sm:dark:bg-transparent sm:font-bold sm:text-xs sm:p-2 sm:text-dark sm:dark:text-light`}
                whileHover={{ scale: 1.25 }}
                initial={{ x: 0, y: 0 }}
                whileInView={{ x: x, y: y, transition: { duration: 1.5 } }}
            >
                {name}
            </motion.div>
        );
    });
};

const SkillsItems = () => {
    return (
        <motion.div initial="hidden" whileInView="show" variants={divVariant(0.2)} className="mt-40 w-full">
            <h2 className="font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16">
                Other Concepts
            </h2>
            <div className="w-full mt-20 h-screen relative flex items-center justify-center rounded-full bg-circularLight dark:bg-circularDark lg:h-[80vh] sm:h-[60vh] xs:h-[50vh] lg:bg-circularLightLg lg:dark:bg-circularDarkLg md:bg-circularLightMd md:dark:bg-circularDarkMd sm:bg-circularLightSm sm:dark:bg-circularDarkSm">
                {displaySkills(skills)}
            </div>
        </motion.div>
    );
};
export default SkillsItems;

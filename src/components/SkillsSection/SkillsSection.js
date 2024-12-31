import React from 'react'
import classes from './SkillsSection.module.css';
import AnimatedText from '../AnimatedText';
import { motion } from "framer-motion";
import { divVariant } from '@/src/data/motion';
import { FramerImage } from '@/src/pages/projects';


const SkillsSection = ({ allSkillsData }) => {
  let techSkills = [];
  const webSkills = allSkillsData.skills.techSkills.webDevelopment;
  const backEndSkills = allSkillsData.skills.techSkills.backEndDevelopment;
  const androidSkills = allSkillsData.skills.techSkills.androidAppDevelopment;
  const otherSkills = allSkillsData.skills.techSkills.others;
  techSkills.push(webSkills);
  techSkills.push(backEndSkills);
  techSkills.push(androidSkills);
  techSkills.push(otherSkills);
  let softSkills = allSkillsData.skills.softSkills;
  let currentlyLearning = allSkillsData.skills.currentlyLearning;
  return (
    <div className="mt-30" id="skills">
      {techSkills && <motion.div initial="hidden" whileInView="show" variants={divVariant(0.2)} className={classes['wrapper']}>
        <AnimatedText
          text="Tech Skills"
          className="mb-5 lg:!text-6xl sm:mb-8 sm:!text-4xl xs:!text-2xl"
        />
        <div className="text-center mb-16 md:mb-16">{allSkillsData.mainLine}</div>

        <div className={classes['SkillsContainer']}>
          {techSkills && techSkills.map((skillsData, index) => (
            <article key={index} className="w-50 max-w-md flex-col flex items-center justify-start relative rounded-3xl border border-solid border-dark bg-light shadow-2xl p-12 rounded-br-2xl dark:bg-dark dark:border-light lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4">
              <div className="absolute top-0 left-0 -right-3 -z-10 w-[101.5%] h-[102%] rounded-[2.5rem] bg-dark rounded-br-3xl dark:bg-light xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]" />
              <h2 className={classes.SkillTitle}>{skillsData.title}</h2>
              <div className={classes.SkillList}>
                {skillsData && skillsData.skills && skillsData.skills.map((item, childIndex) => (
                  <>
                    {item && <div key={childIndex} className={classes.SkillItem}>
                      {item && item.image && <FramerImage className={classes.SkillImage} src={item.image} alt="Tech Skill Item" />}
                      {item && item.title}
                    </div>
                    }
                  </>
                ))}
              </div>
            </article>
          ))}

        </div>
      </motion.div>}

      {softSkills && <motion.div initial="hidden" whileInView="show" variants={divVariant(0.2)} className={`${classes['wrapper']} my-32`}>
        <AnimatedText
          text={softSkills.title}
          className="mb-5 lg:!text-6xl sm:mb-8 sm:!text-4xl xs:!text-2xl"
        />
        <div className={`${classes['SkillsContainer']}`}>

          <article className="w-full flex items-center justify-center relative rounded-3xl border border-solid border-dark bg-light shadow-2xl p-12 rounded-br-2xl dark:bg-dark dark:border-light lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4">
            <div className="absolute top-0 left-0 -right-3 -z-10 w-[101.5%] h-[102%] rounded-[2.5rem] bg-dark rounded-br-3xl dark:bg-light xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]" />
            <div className={classes.SkillList}>
              {softSkills && softSkills.skills && softSkills.skills.map((item, childIndex) => (
                <div key={childIndex} className={classes.SkillItem}>
                  <FramerImage className={classes.SkillImage} src={item.image} alt="Soft Skill Item" />
                  {item.title}
                </div>
              ))}
            </div>
          </article>
        </div>
      </motion.div>}

      {currentlyLearning && <motion.div initial="hidden" whileInView="show" variants={divVariant(0.2)} className={`${classes['wrapper']} my-32`}>
        <AnimatedText
          text="Currently Learning"
          className="mb-5 lg:!text-6xl sm:mb-8 sm:!text-4xl xs:!text-2xl"
        />
        <div className={`${classes['SkillsContainer']}`}>

          <article className="w-full flex items-center justify-center relative rounded-3xl border border-solid border-dark bg-light shadow-2xl p-12 rounded-br-2xl dark:bg-dark dark:border-light lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4">
            <div className="absolute top-0 left-0 -right-3 -z-10 w-[101.5%] h-[102%] rounded-[2.5rem] bg-dark rounded-br-3xl dark:bg-light xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]" />
            <div className={classes.SkillList}>
              {currentlyLearning && currentlyLearning.map((item, childIndex) => (
                <div key={childIndex} className={classes.SkillItem}>
                  <FramerImage width={24} height={24} className={classes.SkillImage} src={item.image} alt="Currently Learning Skill Item" />
                  {item.title}
                </div>
              ))}
            </div>
          </article>
        </div>
      </motion.div>}
    </div>
  )
}

export default SkillsSection;
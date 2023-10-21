import React from 'react'
import { projectExperience, WhatDoIHelp } from '../../data/data'
import css from './WhatDoIDo.module.scss'
import { motion } from 'framer-motion'
import { AnimatedNumbers } from '@/src/pages/about'
import { useRouter } from 'next/router'
import { LinkArrow } from '../Icons'
import Link from 'next/link'
import { fadeIn, staggerContainer, textVariant, divVariant } from '../../data/motion'

const WhatDoIDo = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`flex item-center justify-center mt-5 mx-10 mb-10 ${css.container}`}>

        <h2 className="font-bold text-8xl mb-10 w-full text-center md:text-6xl xs:text-4xl md:mb-10">
          What Do I Do
        </h2>

        {/* left side */}
        <div className={css.leftSide}>
          {
            projectExperience.map((exp, i) => {
              return <motion.div variants={fadeIn("right", "tween", (i + 1) * 0.2, 0.3)} className={css.exp} key={i}>
                <div style={{ background: exp.bg }} className="flexCenter">
                  <exp.icon size={25} color="white" />
                </div>
                <div>
                  <span>{exp.name}</span>
                </div>
              </motion.div>
            })
          }
        </div>


        {/* right */}
        <motion.div variants={textVariant(0.3)}
          className={css.rightSide}>

          <div className="w-full px-2 mt-5 flex items-center justify-between hidden md:flex">
            <div className="flex flex-col items-start justify-start xl:items-center">
              <span className="inline-block text-7xl font-bold md:text-6xl sm:text-3l xs:text-4xl">
                <span /> {data.experience} +
              </span>
              <h2 className="text-xl font-medium text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                Experience
              </h2>
            </div>
            <div className="flex flex-col items-start justify-start xl:items-center">
              <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5l xs:text-4xl">
                <AnimatedNumbers value={data.projects} /> +
              </span>
              <h2 className="text-xl font-medium text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm">
                Projects
              </h2>
            </div>
          </div>

          {data && data.whatDoIDo && data.whatDoIDo.map((paragraph, i) => <span className='secondaryText' key={i}>{paragraph}</span>)}


          <div className="w-full px-2 mt-5 flex items-center justify-between md:hidden">
            <div className="flex flex-col items-start justify-start">
              <span className="inline-block text-7xl text-primary dark:text-primaryDark font-bold md:text-6xl sm:text-3l xs:text-4xl">
                <span /> {data.experience} +
              </span>
              <h2 className="text-xl font-medium font-bold text-primary dark:text-primaryDark xl:text-center md:text-lg sm:text-base xs:text-sm">
                Experience
              </h2>
            </div>
            <div className="flex flex-col items-start justify-start">
              <span className="inline-block font-bold text-primary dark:text-primaryDark text-7xl font-bold md:text-6xl sm:text-5l xs:text-4xl">
                <AnimatedNumbers className={'text-primary dark:text-primaryDark'} value={data.projects} /> +
              </span>
              <h2 className="text-xl font-medium text-primary dark:text-primaryDark xl:text-center md:text-lg sm:text-base xs:text-sm">
                Projects
              </h2>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div initial="hidden"
        whileInView="show" variants={divVariant(0.2)} className="w-1/2 m-auto flex items-center justify-around mt-2 mb-10 md:flex-col">
        <h2 className="text-lg mx-5 md:mt-5 font-bold uppercase text-center text-dark/75 dark:text-light/75">
          Let&apos;s join forces
        </h2>
        <motion.a
          href={data.mail}
          className="flex mx-5 md:mt-5 items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base">
          Hire Me <LinkArrow className={"w-5 ml-1"} />
        </motion.a>
        <Link
          href="/contact"
          className="relative mx-5 md:mt-5 group text-lg font-medium capitalize text-dark dark:text-light md:text-base"
        >
          Contact Me
          <span className={`h-[2px] inline-block bg-dark dark:bg-light absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${router.asPath === "mailto:alex.ribault@gmail.com"
            ? "w-full"
            : "w-0"
            }`}
          ></span>
        </Link>

      </motion.div>
      <h2 className="text-lg mx-5 md:mt-5 mb-10 font-bold uppercase text-center text-dark/75 dark:text-light/75">
        {data.joinLine}
      </h2>
    </>
  )
}

export default WhatDoIDo
const Technologies = ({ tech1, tech2, tech3, tech4 }) => {
    return (
        <>
            <div className="text-lg sm:text-[10px] font-semibold  text-primaryRed dark:text-primaryDarkOrange">
                {tech1}
            </div>
            <div className="text-lg sm:text-[10px] font-semibold  text-primaryPurple dark:text-primaryDarkYellow mx-3">
                {tech2}
            </div>
            <div className={`text-lg sm:text-[10px] font-semibold text-primaryBlue dark:text-primaryDark ${tech4 ? 'mr-3 ' : ''}`}>
                {tech3}
            </div>
            <div className="text-lg sm:text-[10px] font-semibold lg:font-medium text-lime-700 dark:text-rose-300">
                {tech4}
            </div>
        </>
    );
};

export default Technologies;

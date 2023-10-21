import { motion } from "framer-motion";

const Logo = () => {
    return (
        <div className="flex items-center justify-center">
            <motion.div
                className="w-16 h-16 bg-dark cursor-pointer text-light flex items-center justify-center rounded-full text-2xl font-bold border border-solid border-transparent dark:border-light "
                whileHover={{
                    backgroundColor: [
                        "#121212",
                        "rgba(131,58,180,1)",
                        "rgba(253,29,29,1)",
                        "rgba(252,176,69,1)",
                        "rgba(131,58,180,1)",
                        "#121212",
                    ],
                    transition: { duration: 1, repeat: Infinity },
                }}
                whileTap={{ scale: 1.5 }}>
                RC
            </motion.div>
        </div>
    );
};
export default Logo;

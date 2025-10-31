import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from "framer-motion";

const Spinner = ({ size = 150 }) => (
  <motion.div
    className="lottie-loader-container"
    role="status"
    aria-live="polite"
    aria-label="Loading"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.3 }}
  >
    <DotLottieReact
      src="https://lottie.host/4fb50594-70f9-488c-8775-57d3be47a569/OPrPivjDEU.lottie"
      loop
      autoplay
      style={{ width: size, height: size }}
    />
  </motion.div>
);

export default Spinner;

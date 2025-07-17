import { motion } from 'framer-motion';
import fadeInUp from '../Animation/FadeInUp';



const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="about-container">
        {/* Step 1: Heading appears first */}

        {/* Step 2: Paragraph 1 */}
        <motion.p variants={fadeInUp(0.6)} initial="hidden" animate="visible" className="animated-p">
          Hi! 👋 I'm a dedicated learner who originally studied <strong>Zoology</strong>, but recently made a bold decision to switch to the world of <strong>web development</strong>. This journey hasn't been easy — it's taken a lot of effort, sacrifices, and overcoming many challenges.
        </motion.p>

        {/* Step 3: Paragraph 2 */}
        <motion.p variants={fadeInUp(1.0)} initial="hidden" animate="visible" className="animated-p">
          I created this website as part of my self-learning path. Here, I practice building components, layouts, and modern UI designs to sharpen my front-end development skills.
        </motion.p>

        {/* Step 4: Paragraph 3 */}
        <motion.p variants={fadeInUp(1.4)} initial="hidden" animate="visible" className="animated-p">
          This project is built using <strong>React, CSS, and JavaScript</strong>. I'm still growing and learning every day, and your feedback or suggestions would mean a lot. 😊
        </motion.p>
      </div>
    </section>
  );
};

export default AboutUs;

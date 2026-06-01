import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BsLinkedin } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { SiWhatsapp } from "react-icons/si";
import { registerSection } from "../../lib/sectionNavigation.js";
import ContactLink from "./contact/ContactLink.jsx";
import ContactSignalVisual from "./contact/ContactSignalVisual.jsx";
import SiteFooter from "./contact/SiteFooter.jsx";

const contactLinks = [
  {
    label: "EMAIL",
    href: "mailto:afif.ghaziri2004@gmail.com",
    ariaLabel: "Email Afif Ghaziri",
    icon: MdOutlineMail,
  },
  {
    label: "WHATSAPP",
    href: "https://wa.me/963964302160",
    ariaLabel: "Contact Afif Ghaziri on WhatsApp",
    icon: SiWhatsapp,
    isExternal: true,
  },
  {
    label: "LINKEDIN",
    href: "https://linkedin.com/in/afif-ghaziri2004",
    ariaLabel: "Visit Afif Ghaziri on LinkedIn",
    icon: BsLinkedin,
    isExternal: true,
  },
];

const headlineLines = ["LET’S BUILD", "THE NEXT", "INTERFACE."];
const easing = [0.16, 1, 0.3, 1];

const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const copyVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(5px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.76,
      ease: easing,
    },
  },
};

const headlineLineVariants = {
  hidden: {
    opacity: 0,
    x: -34,
    filter: "blur(5px)",
  },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.74,
      delay: 0.12 + index * 0.12,
      ease: easing,
    },
  }),
};

const ctaVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.58 + index * 0.09,
      ease: easing,
    },
  }),
};

function Contact() {
  const contactSectionRef = useRef(null);
  const contentRef = useRef(null);
  const isSectionInView = useInView(contentRef, {
    amount: 0.24,
    margin: "-8% 0px -12% 0px",
  });

  useEffect(() => {
    registerSection("contact", contactSectionRef.current);

    return () => {
      registerSection("contact", null);
    };
  }, []);

  return (
    <section
      ref={contactSectionRef}
      data-section="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden px-5 pt-20 pb-14 sm:px-8 sm:pt-24 sm:pb-16 lg:min-h-[70vh] lg:px-16 lg:pt-28 lg:pb-14 xl:px-24 2xl:px-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[10%] top-24 h-80 w-80 rounded-full bg-cyan-300/7 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-18 right-[8%] h-96 w-96 rounded-full bg-blue-400/7 blur-3xl"
      />

      <motion.div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-352"
        initial="hidden"
        animate={isSectionInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(26rem,0.88fr)_minmax(28rem,0.82fr)] lg:items-center lg:gap-16">
          <div className="contents lg:block">
            <div className="order-1">
              <motion.div
                className="mb-5 flex items-center gap-4 lg:mb-6"
                variants={copyVariants}
              >
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-linear-to-r from-cyan-100/36 to-transparent"
                />
                <p className="font-osiris text-xs uppercase tracking-[0.34em] text-cyan-100/66 sm:text-sm">
                  06 / CONTACT
                </p>
              </motion.div>

              <h2
                id="contact-title"
                data-cursor="text"
                className="font-bruno max-w-[12ch] text-[clamp(2.25rem,9vw,4.7rem)] leading-[1.02] text-slate-50 drop-shadow-[0_0_28px_rgba(34,211,238,0.16)] lg:text-[clamp(3rem,4vw,5.25rem)]"
              >
                {headlineLines.map((line, index) => (
                  <motion.span
                    className="block"
                    custom={index}
                    key={line}
                    variants={headlineLineVariants}
                  >
                    {line}
                  </motion.span>
                ))}
              </h2>

              <motion.p
                data-cursor="text"
                className="font-oxanium mt-7 max-w-154 text-sm leading-7 text-slate-200/76 sm:text-base sm:leading-8 lg:mt-8"
                variants={copyVariants}
              >
                Available for frontend projects, interface work, and ideas that
                need to become real products.
              </motion.p>
            </div>

            <div className="order-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-10">
              {contactLinks.map((link, index) => (
                <motion.div
                  custom={index}
                  key={link.label}
                  variants={ctaVariants}
                >
                  <ContactLink {...link} />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="order-2 lg:order-0">
            <ContactSignalVisual isVisible={isSectionInView} />
          </div>
        </div>

        <motion.div variants={copyVariants}>
          <SiteFooter />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Contact;

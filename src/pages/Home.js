import styles from "./Frame.module.scss";
import {
  Link
} from "react-router-dom";

const Frame = () => {
  return (
    <section className={`${styles.frame} transIn`}>
      <div className={`${styles.frame__container} align_between`}>
        {/* top bar  */}
        <div className={styles.frame1}>
          {/* logo */}
          <nav className={`align_between`}>
            <Link to='/'>
              <img
                className={styles.whiteVersion013}
                alt=""
                src="/white-version01-3@2x.png"
              />
            </Link>
            <div className="align_between">
              <Link to="/contact-us" className={styles.signUp}>Sign Up</Link>
              <a href="https://app.talen.ai/auth/login" className={styles.signIn}><span>Sign In</span></a>
            </div>
          </nav>
        </div>
        {/* bottom section  */}
        <div className={`${styles.frame2} align_between`}>
          {/* left side */}
          <div className="align_between flex-column">
            <h1 className={styles.onePromptFind}>
              One prompt, Find all the best talents
            </h1>
            <article className={styles.theAiPowered}>
              The AI powered recruiting software you'll ever need to find, connect,
              and hire qualified candidates across the globe.
            </article>
            <div className={`${styles.vectorParent} align_between`}>
              <Link to="/contact-us" className={`${styles.signIn} ${styles.getStarted}`}><span>Get Started</span></Link>
              <a href="https://www.youtube.com/watch?v=6MCr6kiw-tw" target="_blank" className={styles.groupParent}>
                <img
                  className={styles.frameInner}
                  alt=""
                  src="/group-427318644.svg"
                />
                <div className={styles.howItWorks}>How it works</div>
              </a>
            </div>
          </div>
          {/* right image  */}
          <aside className={styles.webImage2b1}>
            <img
              alt=""
              src="/webimage-2b-1@2x.png"
            />
          </aside>
        </div>
      </div>
    </section >
  );
};

export default Frame;

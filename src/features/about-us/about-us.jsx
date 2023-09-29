
import { AboutUsCss } from 'stylesheets/about-us';

export function AboutUs() {
    return (
        <div className={AboutUsCss.aboutUs}>
            <section className={AboutUsCss.aboutUsSection}>
                <div className={AboutUsCss.aboutUsContainer}>
                    <h1 className={AboutUsCss.title}>ABOUT STUDYFIL</h1>
                    <p className={AboutUsCss.paragraph}>We are a group of four students pursuing our Bachelor's degree in the Computer Science program at Cavite State University - Don Severino De Las Alas Campus. As part of our academic journey, we have collaboratively developed an online platform dedicated to fostering knowledge sharing and acquisition across various chosen topics.</p>
                    <p className={AboutUsCss.paragraph}>The global COVID-19 pandemic has left a profound impact on society, catalyzing a significant surge in technological advancements. This transformation has witnessed the proliferation of e-commerce and the emergence of online learning as a viable alternative to traditional education methods. Drawing inspiration from these transformative trends, our team embarked on a research initiative culminating in the creation of StudyFil, a web-based online learning platform.</p>
                    <p className={AboutUsCss.paragraph}>StudyFil represents our endeavor to incorporate user-based collaborative filtering techniques into an educational platform. This innovative system is designed to cater to individuals aged 16 and older, offering personalized recommendations for topics and groups derived from user behavior patterns and their similarity with other users, providing a dynamic and interactive learning environment for them.</p>
                </div>
            </section>
            <section className={AboutUsCss.teamSection}>
                <div className={AboutUsCss.aboutUsContainer}>
                    <h1 className={AboutUsCss.title}>Meet the Team</h1>
                    <div className={AboutUsCss.profileWrapper}>
                        <div className={AboutUsCss.profile}>
                            <img src='/img/krizzle.png' className={AboutUsCss.profileImage} />
                            <div className={AboutUsCss.profileDescription}>
                                <p>Krizzle Mae Dapito</p>
                                <p>Team Leader</p>
                            </div>
                        </div>
                        <div className={AboutUsCss.dividerWrapper}>
                            <div className={AboutUsCss.divider} style={{ width: '72.5%'}} ></div>
                            <div className={AboutUsCss.divider} style={{ width: 'calc(100% - 75%)'}}></div>
                        </div>
                        <div className={AboutUsCss.backgroundLine} style={{ right: '15%'}}></div>
                    </div>

                    <div className={AboutUsCss.profileWrapper}>
                        <div className={AboutUsCss.profile}>
                            <div className={AboutUsCss.profileDescription}>
                                <p>Audrey Jane Delos Santos</p>
                                <p>UI/UX Designer</p>
                            </div>
                            <img src='/img/audrey.png' className={AboutUsCss.profileImage} />
                        </div>
                        <div className={AboutUsCss.dividerWrapper}>
                            <div className={AboutUsCss.divider} style={{ width: 'calc(100% - 75%)'}} ></div>
                            <div className={AboutUsCss.divider} style={{ width: '72.5%'}}></div>
                        </div>
                        <div className={AboutUsCss.backgroundLine} style={{ left: '15%'}}></div>
                    </div>

                    <div className={AboutUsCss.profileWrapper}>
                        <div className={AboutUsCss.profile}>
                            <img src='/img/sophia.png' className={AboutUsCss.profileImage} />
                            <div className={AboutUsCss.profileDescription}>
                                <p>Sophia Jane Seibel</p>
                                <p>Academic Analyst</p>
                            </div>
                        </div>
                        <div className={AboutUsCss.dividerWrapper}>
                            <div className={AboutUsCss.divider} style={{ width: '72.5%'}} ></div>
                            <div className={AboutUsCss.divider} style={{ width: 'calc(100% - 75%)'}}></div>
                        </div>
                        <div className={AboutUsCss.backgroundLine} style={{ right: '15%'}}></div>
                    </div>
                    
                    <div className={AboutUsCss.profileWrapper}>
                        <div className={AboutUsCss.profile}>
                            <div className={AboutUsCss.profileDescription}>
                                <p>Renier Paolo D. Sumagui</p>
                                <p>Developer</p>
                            </div>
                            <img src='/img/renier.jpg' className={AboutUsCss.profileImage} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
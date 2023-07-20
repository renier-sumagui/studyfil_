
import { AboutUsCss } from 'stylesheets/about-us';

export function AboutUs() {
    return (
        <div className={AboutUsCss.aboutUs}>
            <section className={AboutUsCss.aboutUsSection}>
                <div className={AboutUsCss.aboutUsContainer}>
                    <h1 className={AboutUsCss.title}>ABOUT STUDYFIL</h1>
                    <p className={AboutUsCss.paragraph}>We are a four-team member in a thesis group, completing our bachelor's degree in Computer Science program at Cavite State University - Don Severino De Las Alas Campus. We created an online platform where users could share and gain knowledge on topics they chose. StudyFil is a website that uses a collaborative filtering approach, specifically a user-based collaborative filtering algorithm that suggests topics and groups based on the user's past activities and similarities to other users.</p>
                    <p className={AboutUsCss.paragraph}>Online learning was introduced as an alternative method when the pandemic hit. Over time, everything will be back to normal, but online learning will remain a viable option for people. As technological devices continued to flourish during this time, e-commerce started to be recognized more. The industry used an algorithm called a recommender system, specifically collaborative filtering, which recommended items or products based on the similarities between the customers' interactions on the website. We decided to use the recommender system and figured that it is helpful in an online learning platform. We developed this website to allow anyone, ages 16 and above discover and learn diverse topics they like, from academic to non-academic.</p>
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
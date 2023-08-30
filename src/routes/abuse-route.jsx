import { TermsAndConditionsCss } from 'stylesheets/terms-and-conditions';
import { Link } from 'react-router-dom';
import { Report } from '@mui/icons-material';

function AbuseRoute() {
    return (
        <div className={TermsAndConditionsCss.terms}>
            <h1 className="flex alignCenter"><Report fontSize='2em' /> Report Abuse</h1>
            <ol className={TermsAndConditionsCss.indentedOrderedList}>
                <p className="indent"><span>Cyber Threat</span> refers to harmful or malicious actions carried out by individuals or groups with the <u>intent to cause damage, exploit vulnerabilities, or violate the website's terms of service</u>. These actions can negatively impact the website's functionality, security, or the experience of its users. Internet abuse can take various forms, and some of the common kinds of abuse include:</p>
                <li>
                    <span>Spamming</span> - involves sending unsolicited and often irrelevant or inappropriate content in bulk. This can be in the form of emails, comments, or messages. Spam not only annoys users but can also overload servers and degrade website performance
                </li>
                <li>
                    <span>Phishing</span> - is a deceptive practice where attackers create fake websites or emails that mimic legitimate ones, aiming to trick users into providing sensitive information like usernames, passwords, or financial details.
                </li>
                <li>
                    <span>Malware Distribution</span> - Attackers may use websites as a medium to distribute malware, such as viruses, ransomware, or Trojans, to infect users' devices and steal data or disrupt operations.
                </li>
                <li>
                    <span>Distributed Denial of Service (DDoS) Attacks</span> - In a DDoS attack, multiple compromised systems bombard a website with an overwhelming amount of traffic, causing it to become inaccessible to legitimate users.
                </li>
                <li>
                    <span>Hate Speech and Harassment</span> - Some users may abuse websites to spread hate speech, engage in cyberbullying, or harass others through comments, messages, or user-generated content.
                </li>
                <li>
                    <span>SQL Injection (SQLI) Attack</span> - It is a type of cyber attack where a malicious person takes advantage of a security flaw in a website or application. They do this by inserting harmful commands into the data fields that the website uses to communicate with its database. This allows the attacker to trick the application into doing things it shouldn't, like revealing sensitive data or even gaining control over the entire database. 
                </li>
                <li>
                    <span>Account Takeover (ATO)</span> - This involves unauthorized access to user accounts through various means, like brute-force attacks or using leaked credentials from data breaches, leading to identity theft or misuse of personal information.
                </li>
                <li>
                    <span>Content Violations</span> - Users may abuse websites by posting illegal, explicit, or offensive content, violating the platform's terms of service and community guidelines.
                </li>
                <li>
                    <span>Scamming and Fraud</span> - Websites can be used to host fraudulent schemes, phishing pages, or fake online stores to deceive users and steal their money or sensitive information.
                </li>
                <li>
                    <span>Click Fraud</span> - In the context of online advertising, individuals may generate artificial clicks on ads to drive up costs for advertisers or gain illegitimate revenue.
                </li>
                <li>
                    <span>Data Scraping and Crawling Abuse</span> - Some individuals or bots may scrape or crawl websites excessively to extract large amounts of data, causing strain on servers and violating the website's terms of use.
                </li>
                <li>
                    <span>Impersonation</span> - Abusers may create fake accounts or impersonate others to spread misinformation, manipulate opinions, or engage in harmful activities.
                </li>
            </ol>
            <p className="indent">The developer implemented security measures, such as age restriction, password encryption, and content and foul language filters, to prevent and mitigate abuse. The data are also secured against SQL Injections. Reporting mechanisms and community moderation can also help identify and address abusive behavior. </p>
            <ol className={TermsAndConditionsCss.indentedOrderedList}>
                <h2 className={TermsAndConditionsCss.heading2}>Do's and Don'ts when Accessing a Website</h2>
                <p className="indent">When accessing a website, users should keep in mind some important do's and don'ts to ensure a safe and pleasant online experience. Be informed about emerging threats online.</p>
                <p className="indent" style={{ marginTop: '10px' }}><span>Do's:</span></p>
                <li>
                    <span>Update Your Browser and Operating System</span> - Keep your web browser and operating system up-to-date with the latest security patches to protect against vulnerabilities.
                </li>
                <li>
                    <span>Read Privacy Policies and Terms of Service</span> - Familiarize yourself with the website's <Link to="/legal/terms" className={TermsAndConditionsCss.link}>privacy policies and terms of service</Link> to understand how your data will be used and what's expected of you as a user.
                </li>
                <li>
                    <span>Be Cautious with Personal Information</span> - Avoid sharing sensitive information unless necessary, as you create your account and/or group on this website.
                </li>
                <li>
                    <span>Logout your Account After Use</span> - When accessing accounts on public or shared devices, remember to log out after use to prevent unauthorized access.
                </li>
                <li>
                    <span>Report Suspicious or Abusive Content</span> - If you encounter suspicious or abusive content, you may click the “Kick” button if you are the creator of the group or the “Report” button if you are a member of the group you belong to and/or report it to the website administrator/developer: <span>sfreportabuse@gmail.com</span>.
                    <p className={TermsAndConditionsCss.paragraph}>If you are based in the <u>Philippines</u>, you may also contact the Office of Cybercrime:: Department of Justice - Republic of the Philippines:: <span>Tel: (+632) 523 8482, (+632) 523 6826</span> and/or the DOJ Action Center: <span>dojac@doj.gov.ph</span>.</p>
                </li>
            </ol>
            <ol className={TermsAndConditionsCss.indentedOrderedList}>
                <p className="indent" style={{ marginTop: '10px' }}><span>Don'ts:</span></p>
                <li>
                    <span>Click on Suspicious Links</span> - Avoid clicking on links in emails, messages, or on this website if they seem suspicious or come from unknown sources.  Look for the padlock icon and "https://" in the URL to ensure your data is encrypted during transmission.
                </li>
                <li>
                    <span>Avoid Using Public Wi-Fi for Sensitive Activities</span> - Public Wi-Fi networks are vulnerable to data interception. Avoid using them for sensitive activities like online banking or shopping.
                </li>
                <li>
                    <span>Don't Fall for Phishing Scams</span> - Be wary of emails or websites asking for personal information or login credentials. Legitimate organizations won't request such information via email.
                </li>
                <li>
                    <span>Don't Share Your Passwords</span> - Never share your passwords with anyone, and avoid using the same password for multiple accounts.
                </li>
                <li>
                    <span>Avoid Disabling Security Features</span> -  Keep your browser's security features, such as pop-up blockers and warning prompts, enabled.
                </li>
                <li>
                    <span>Don't Engage in Cyberbullying or Hate Speech</span> - Treat others with respect when interacting on websites, forums, or social media platforms.
                </li>
            </ol>
            <p className="indent">By following these dos and don'ts, you can protect your online privacy, security, and personal information while accessing StudyFil. It's essential to be vigilant and informed about potential threats in the ever-evolving digital landscape.</p>
        </div>
    )
}

export default AbuseRoute;
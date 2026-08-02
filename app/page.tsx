"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

const advisor = {
  name: "Mukesh Gupta",
  business: "Gupta Enterprises",
  phone: "+91 91996 84546",
  phoneRaw: "+919199684546",
  whatsapp: "919199684546",
  email: "guptaenterprises023@gmail.com",
  address: "Pathak Market, Kuchaikote, Gopalganj, Bihar – 841436",
  hours: "Monday–Saturday · 10:00 AM–5:00 PM",
};

const quickServices = [
  ["01", "Premium estimate", "Start with a transparent planning range before requesting an official illustration.", "#calculator"],
  ["02", "Policy status", "Get safe guidance for premium dues, revival, maturity and service requests.", "#policy-status"],
  ["03", "Forms & documents", "Identify the current form and supporting-document checklist you may need.", "#forms"],
  ["04", "Customer support", "Speak directly with your local point of contact for policy assistance.", "#contact"],
];

const planCategories = [
  ["01", "Protection planning", "Build a financial safety net so your family can manage essential goals if the unexpected happens.", "Needs-based cover assessment · Term guidance · Nominee support"],
  ["02", "Savings & endowment", "Combine disciplined long-term saving with life cover for planned milestones and financial stability.", "Goal mapping · Affordability review · Illustration explanation"],
  ["03", "Child future planning", "Plan for education, career and important milestones while protecting the objective from uncertainty.", "Education estimate · Milestone planning · Parent protection"],
  ["04", "Retirement & pension", "Create a retirement roadmap focused on regular income needs, independence and long-term peace of mind.", "Retirement gap · Income needs · Payout guidance"],
  ["05", "Money-back planning", "Explore periodic-benefit structures when liquidity is needed at defined stages of a long-term plan.", "Cash-flow review · Payout schedule · Suitability comparison"],
  ["06", "Health-related protection", "Understand eligible health and rider options that may strengthen protection alongside life insurance.", "Rider suitability · Exclusions awareness · Claims support"],
];

const serviceItems = [
  "New policy guidance",
  "Policy servicing",
  "Nominee & contact updates",
  "Premium support",
  "Claims guidance",
  "Document review",
];

const formItems = [
  ["Nomination or assignment", "For adding or changing a nominee, or understanding an assignment-related request."],
  ["Address & contact update", "For registered address, mobile number or email update assistance."],
  ["Bank details / NEFT", "For registering or changing bank details for eligible payouts."],
  ["Revival request", "For understanding requirements when reinstating an eligible lapsed policy."],
  ["Claim documents", "For maturity, survival benefit or death-claim document guidance, as applicable."],
  ["Duplicate policy document", "For guidance when an original policy document is lost or unavailable."],
];

const faqs = [
  ["How much life cover should I consider?", "It depends on dependants, income, loans, existing assets and future goals. A needs discussion gives a more useful answer than a fixed rule."],
  ["Is the online estimate an official premium?", "No. It is a broad planning estimate. Actual premium and eligibility depend on the selected product, underwriting, taxes and current insurer rules."],
  ["Can you help after the policy starts?", "Yes. Assistance is available for nomination, contact changes, premium questions, forms, maturity preparation and claims-document guidance."],
  ["What should I never send online?", "Never share OTPs, passwords, UPI PINs, card PINs, CVVs or complete banking credentials. Confirm a secure method before sharing policy documents."],
];

function Emblem({ small = false }: { small?: boolean }) {
  return <span className={`emblem-crop ${small ? "small" : ""}`} aria-hidden="true"><img src="/assets/lic-logo.png" alt="" /></span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [goal, setGoal] = useState("protection");
  const [age, setAge] = useState(32);
  const [term, setTerm] = useState(20);
  const [cover, setCover] = useState(1000000);
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const money = (value: number) => `₹${Math.round(value).toLocaleString("en-IN")}`;
  const estimate = useMemo(() => {
    const rates: Record<string, number> = { protection: 0.001, savings: 0.045, child: 0.042, retirement: 0.05 };
    let base = cover * rates[goal];
    if (goal === "protection") base *= Math.max(0.8, age / 32) * Math.max(0.65, 20 / term);
    else base *= Math.max(0.85, 1 + (age - 30) * 0.006) * Math.max(0.8, 1 - term * 0.002);
    const low = Math.max(2400, Math.round((base * 0.85) / 100) * 100);
    const high = Math.max(low + 600, Math.round((base * 1.15) / 100) * 100);
    return { low, high, monthlyLow: Math.round(low / 120) * 10, monthlyHigh: Math.round(high / 120) * 10 };
  }, [goal, age, term, cover]);

  const sendWhatsApp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `Hello, I am ${data.get("name")}. My phone number is ${data.get("phone")}. I need help with: ${data.get("interest") || "an LIC enquiry"}.${data.get("message") ? ` Details: ${data.get("message")}` : ""}`;
    window.open(`https://wa.me/${advisor.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main>
      <div className="noticebar">
        <p>Independent LIC agent website</p>
        <div><span>{advisor.hours}</span><a href={`tel:${advisor.phoneRaw}`}>{advisor.phone}</a></div>
      </div>

      <header className="site-header" id="top">
        <a className="brand" href="#top" aria-label="Mukesh Gupta home">
          <Emblem />
          <span className="brand-copy"><strong>{advisor.name}</strong><small>{advisor.business} · LIC Agent</small></span>
        </a>
        <nav aria-label="Primary navigation" className={menuOpen ? "nav-open" : ""}>
          <a href="#approach" onClick={closeMenu}>Approach</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#plans" onClick={closeMenu}>Planning</a>
          <a href="#customer-desk" onClick={closeMenu}>Customer desk</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Book a call <span>↗</span></a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span /><span /></button>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="hero-kicker"><span>01</span> Personal insurance guidance</div>
          <h1>Protect today.<br /><em>Plan tomorrow.</em></h1>
          <p className="hero-intro">Understand your options, choose with confidence and receive practical support throughout the policy journey—with Mukesh Gupta at Gupta Enterprises.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contact">Book a free consultation <span>↗</span></a>
            <a className="text-link" href="#plans">Explore planning options <span>→</span></a>
          </div>
          <div className="assurance-line"><span>Personal guidance</span><span>Local support</span><span>Clear documentation</span></div>
        </div>

        <aside className="planning-desk" aria-label="Planning overview">
          <div className="paperclip" aria-hidden="true" />
          <div className="desk-topline"><span>GUPTA ENTERPRISES · PLANNING NOTE</span><span>01 / 04</span></div>
          <div className="desk-title"><p>START WITH THE PURPOSE</p><h2>Your family is not a product category.</h2></div>
          <div className="desk-grid">
            <div><small>WE MAP</small><strong>People</strong><span>Who depends on you?</span></div>
            <div><small>WE DEFINE</small><strong>Goals</strong><span>What must happen, and when?</span></div>
            <div><small>WE CHECK</small><strong>Comfort</strong><span>What premium stays sustainable?</span></div>
            <div><small>THEN WE</small><strong>Compare</strong><span>Which official options fit?</span></div>
          </div>
          <a href="#approach" className="desk-footer"><span>See the advisory process</span><b>↓</b></a>
        </aside>
      </section>

      <div className="ticker" aria-label="Services offered"><div><span>Life cover planning</span><i>◆</i><span>Education goals</span><i>◆</i><span>Retirement income</span><i>◆</i><span>Savings strategy</span><i>◆</i><span>Policy servicing</span><i>◆</i></div></div>

      <section className="section approach" id="approach">
        <div className="section-heading"><p className="eyebrow">EVERYTHING IMPORTANT, EASY TO REACH</p><h2>Support that starts<br />with <em>your need.</em></h2></div>
        <p className="section-lede">Get the information and support you need without searching through complicated processes.</p>
        <div className="service-index" id="services">
          {quickServices.map(([no, title, copy, href]) => <a className="index-row" href={href} key={no}><span className="row-no">{no}</span><h3>{title}</h3><p>{copy}</p><b>↗</b></a>)}
        </div>
      </section>

      <section className="manifesto">
        <div className="manifesto-label">THE ADVISOR’S ROLE</div>
        <blockquote>“A useful recommendation is one you can understand, sustain and explain to your family.”</blockquote>
        <div className="manifesto-note"><span>Clear comparison</span><span>Official illustrations</span><span>Human follow-through</span></div>
      </section>

      <section className="section plans" id="plans">
        <div className="section-heading compact"><p className="eyebrow">PLANNING CATEGORIES</p><h2>Cover today.<br /><em>Prepare for tomorrow.</em></h2></div>
        <p className="section-lede">Begin with the purpose—not just a product name. Specific products, eligibility and current terms are discussed only after the need is clear.</p>
        <div className="plan-grid">
          {planCategories.map(([no, title, copy, fit]) => <article className="plan-card" key={no}><div className="plan-card-top"><span>{no}</span><i>Planning route</i></div><h3>{title}</h3><p>{copy}</p><div className="fit"><small>Discussion points</small>{fit}</div><a href="#contact">Discuss this goal <span>↗</span></a></article>)}
        </div>
        <p className="source-note">Product availability, premiums and benefits can change. Always review the current official benefit illustration and policy document before purchase.</p>
      </section>

      <section className="service-section" id="policy-status">
        <div className="service-copy"><p className="eyebrow light">SUPPORT BEYOND PURCHASE</p><h2>Service is part of the <em>promise.</em></h2><p>From the first conversation to routine updates and claim-stage guidance, receive direct, local assistance without unnecessary confusion.</p><a className="light-link" href="#contact">Get policy support <span>↗</span></a></div>
        <div className="service-ledger">{serviceItems.map((item, i) => <a href="#contact" key={item}><span>{String(i + 1).padStart(2, "0")}</span><p>{item}</p><b>→</b></a>)}</div>
      </section>

      <section className="image-story">
        <div className="image-frame"><img src="/assets/family-protection.png" alt="Indian family standing together under a blue LIC umbrella" loading="lazy" /><span>Protection should serve the family—not the other way around.</span></div>
        <div className="story-copy"><p className="eyebrow">GUIDANCE THAT STAYS USEFUL</p><h2>Planning is clearer when someone explains the <em>trade-offs.</em></h2><p>We discuss responsibilities, time horizon, existing cover and premium comfort before looking at suitable options.</p><ul><li>Goal and protection-needs discussion</li><li>Premium affordability and term review</li><li>Nominee and application-document guidance</li><li>Ongoing help with common servicing requests</li></ul><a className="button" href="#about">About the approach <span>↗</span></a></div>
      </section>

      <section className="calculator-section" id="calculator">
        <div className="calculator-copy"><p className="eyebrow light">PLANNING TOOL</p><h2>Start with a quick <em>estimate.</em></h2><p>This gives a broad budget-planning range. It is not an LIC quotation. Actual premiums depend on product, health, underwriting, taxes and current insurer rules.</p><div className="calc-note">Nothing entered here is transmitted or stored. The calculation runs only in your browser.</div></div>
        <div className="calculator-card">
          <label><span>Planning goal</span><select value={goal} onChange={(e) => { setGoal(e.target.value); setCalculated(false); }}><option value="protection">Family protection</option><option value="savings">Long-term savings</option><option value="child">Child future</option><option value="retirement">Retirement</option></select></label>
          <div className="calc-fields"><label><span>Current age</span><input type="number" min="18" max="65" value={age} onChange={(e) => { setAge(Math.max(18, Math.min(65, Number(e.target.value)))); setCalculated(false); }} /></label><label><span>Term (years)</span><input type="number" min="5" max="40" value={term} onChange={(e) => { setTerm(Math.max(5, Math.min(40, Number(e.target.value)))); setCalculated(false); }} /></label></div>
          <label><span>Target amount</span><input type="number" min="100000" step="10000" value={cover} onChange={(e) => { setCover(Math.max(100000, Number(e.target.value))); setCalculated(false); }} /></label>
          <button className="button calc-button" type="button" onClick={() => setCalculated(true)}>Show indicative range <span>↗</span></button>
          {calculated && <div className="calc-result" aria-live="polite"><small>INDICATIVE ANNUAL PLANNING RANGE</small><strong>{money(estimate.low)} — {money(estimate.high)}</strong><span>Monthly equivalent: {money(estimate.monthlyLow)} — {money(estimate.monthlyHigh)}</span><p>Illustration only—not an LIC quotation, premium or guaranteed benefit.</p><a href="#contact">Request official illustration <b>↗</b></a></div>}
        </div>
      </section>

      <section className="section customer-desk" id="customer-desk">
        <div className="section-heading compact"><p className="eyebrow">CUSTOMER DESK</p><h2>Your policy assistance,<br /><em>organised.</em></h2></div>
        <div className="status-board">
          <div className="status-copy"><p className="eyebrow">POLICY STATUS GUIDANCE</p><h3>Check your policy status safely.</h3><p>Keep the policy number, policyholder name and date of birth available. Tell us whether you need due-date, payment, revival, maturity or servicing information.</p><div className="security-note"><strong>Protect your account.</strong> Never share an OTP, password, UPI PIN, card PIN or CVV.</div><a className="text-link" href={`https://wa.me/${advisor.whatsapp}?text=${encodeURIComponent("Hello, I need help with my LIC policy status.")}`} target="_blank" rel="noreferrer">Ask on WhatsApp <span>↗</span></a></div>
          <div className="status-steps"><article><span>01</span><h4>Keep basics ready</h4><p>Have the minimum policy details available through an appropriate channel.</p></article><article><span>02</span><h4>Describe the query</h4><p>Due date, payment, revival, maturity or another service request.</p></article><article><span>03</span><h4>Use the right channel</h4><p>Get guided to the relevant official or branch process.</p></article></div>
        </div>

        <div className="forms-head" id="forms"><p className="eyebrow">FORMS & CHECKLISTS</p><h3>Find the right paperwork for your request.</h3><p>Form versions and requirements can change. Request the current form and a supporting-document checklist before submission.</p></div>
        <div className="forms-list">{formItems.map(([title, copy], i) => <a href="#contact" key={title}><span>{String(i + 1).padStart(2, "0")}</span><h4>{title}</h4><p>{copy}</p><b>↗</b></a>)}</div>
        <div className="document-strip"><strong>A useful starting checklist</strong><span>Policy document or number</span><span>Signed request matching official records</span><span>Identity/address proof where applicable</span><span>Cancelled cheque for payout requests</span></div>
      </section>

      <section className="about-section" id="about">
        <div className="about-image"><img src="/assets/advisor-consultation.png" alt="Insurance advisor explaining a plan to an Indian couple" loading="lazy" /><span>MUKESH GUPTA · GUPTA ENTERPRISES</span></div>
        <div className="about-copy"><p className="eyebrow">ABOUT THE ADVISOR</p><h2>Local guidance built on clarity and <em>long-term service.</em></h2><p>Insurance decisions combine family responsibilities, long timelines and formal documentation. Mukesh Gupta’s role is to make each step easier to understand—from identifying the purpose of cover to handling future service requests.</p><div className="value-grid"><div><span>01</span><strong>Clear conversations</strong><p>Straightforward explanation of options and responsibilities.</p></div><div><span>02</span><strong>Personal attention</strong><p>Guidance shaped around your family, goals and comfort.</p></div><div><span>03</span><strong>Process support</strong><p>Help preparing applications and common servicing requirements.</p></div><div><span>04</span><strong>Local availability</strong><p>A nearby point of contact for ongoing questions.</p></div></div></div>
      </section>

      <section className="section faq-section">
        <div className="faq-title"><p className="eyebrow">COMMON QUESTIONS</p><h2>Answers before<br />the next <em>step.</em></h2></div>
        <div className="faq-list">{faqs.map(([q, a], i) => <div className={`faq-item ${activeFaq === i ? "active" : ""}`} key={q}><button type="button" aria-expanded={activeFaq === i} onClick={() => setActiveFaq(activeFaq === i ? null : i)}><span>{q}</span><b>{activeFaq === i ? "−" : "+"}</b></button><div className="faq-answer"><p>{a}</p></div></div>)}</div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-copy"><p className="eyebrow light">START A CONVERSATION</p><h2>Clear answers begin with a <em>simple call.</em></h2><p>Appointments are helpful for detailed planning discussions and document reviews.</p><div className="contact-lines"><a href={`tel:${advisor.phoneRaw}`}><small>CALL</small><span>{advisor.phone}</span></a><a href={`mailto:${advisor.email}`}><small>EMAIL</small><span>{advisor.email}</span></a><div><small>VISIT</small><span>{advisor.address}</span></div><div><small>HOURS</small><span>{advisor.hours}</span></div></div></div>
        <form className="contact-form" onSubmit={sendWhatsApp}><div className="form-topline"><span>CALLBACK REQUEST</span><b>PRIVATE ENQUIRY</b></div><div className="form-row"><label>Your name<input name="name" required placeholder="Full name" /></label><label>Phone number<input name="phone" required inputMode="tel" placeholder="+91" /></label></div><label>I need help with<select name="interest" defaultValue=""><option value="" disabled>Select a topic</option><option>Family protection</option><option>Long-term savings</option><option>Child future planning</option><option>Retirement planning</option><option>Existing policy service</option><option>Forms or documentation</option></select></label><label>Message<textarea name="message" rows={3} placeholder="Add helpful context. Do not include OTPs, PINs or passwords." /></label><button className="button form-submit" type="submit">Continue on WhatsApp <span>↗</span></button><p>No form data is stored on this website. Submitting opens WhatsApp with your prepared message.</p></form>
      </section>

      <footer className="site-footer" id="disclosure">
        <div className="footer-grid"><div className="footer-identity"><img src="/assets/lic-logo.png" alt="Life Insurance Corporation of India logo" /><h3>{advisor.name}</h3><p>{advisor.business} · Personal insurance guidance and policy servicing support for families in Kuchaikote, Gopalganj and nearby areas.</p></div><div><small>EXPLORE</small><a href="#plans">Planning categories</a><a href="#services">Policy services</a><a href="#calculator">Premium estimate</a><a href="#about">About Mukesh</a></div><div><small>CONTACT</small><a href={`tel:${advisor.phoneRaw}`}>{advisor.phone}</a><a href={`mailto:${advisor.email}`}>{advisor.email}</a><span>{advisor.address}</span></div><div><small>OFFICIAL RESOURCES</small><a href="https://licindia.in/insurance-plan" target="_blank" rel="noreferrer">LIC plan catalogue ↗</a><a href="https://licindia.in/branch-locator" target="_blank" rel="noreferrer">LIC branch locator ↗</a><a href="https://licindia.in/policy-guidelines-helpline" target="_blank" rel="noreferrer">Policy guidelines ↗</a></div></div>
        <div className="legal-grid"><details><summary>Privacy policy <span>+</span></summary><p>This website does not maintain a customer login or website database. Calculator values stay in your browser. Phone, email and WhatsApp enquiries are handled through those communication services. Never send OTPs, passwords, PINs, CVVs or complete banking credentials.</p></details><details><summary>Terms of use <span>+</span></summary><p>The site is educational and does not issue a policy, guarantee acceptance or provide a binding quotation. Product availability, eligibility, premiums, benefits, exclusions and underwriting are governed by current insurer rules and official policy documents.</p></details></div>
        <div className="disclosure"><strong>Important:</strong> This is an independent agent website and not LIC of India’s official website. “LIC” and its marks belong to Life Insurance Corporation of India. Insurance is the subject matter of solicitation. Benefits are subject to policy terms, eligibility and underwriting. Please read the official sales brochure and policy document carefully before concluding a sale. LIC of India IRDAI Registration No. 512.</div>
        <div className="footer-bottom"><span>© 2026 Gupta Enterprises</span><span>{advisor.hours}</span><a href="#top">Back to top ↑</a></div>
      </footer>
    </main>
  );
}

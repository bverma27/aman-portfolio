import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, BriefcaseBusiness,
  CarFront, Check, ChevronLeft, CircleHelp, HeartPulse, Home,
  Leaf, Menu, ShieldCheck, Sparkles, TrendingUp, Wallet, X,
} from 'lucide-react'
import './styles.css'

const services = [
  { title: 'Loans', note: 'Home, personal & business', icon: Home },
  { title: 'Investments', note: 'Wealth building, your way', icon: TrendingUp },
  { title: 'Health insurance', note: 'Covers the whole family', icon: HeartPulse },
  { title: 'Life insurance', note: 'Term & protection plans', icon: ShieldCheck },
  { title: 'Car insurance', note: 'Zero-dep, fewer headaches', icon: CarFront },
  { title: 'Mutual funds', note: 'SIPs built around your goals', icon: Wallet },
  { title: 'Property', note: 'Real estate, thoughtfully planned', icon: BriefcaseBusiness },
]

const quizSteps = [
  {
    prompt: 'What’s top of mind for your money right now?',
    caption: 'There’s no wrong answer. Just start where you are.',
    options: ['Growing my wealth', 'Feeling more secure', 'Buying a home', 'Getting organized'],
  },
  {
    prompt: 'How do you feel when investments go up and down?',
    caption: 'A little honest instinct goes a long way.',
    options: ['I stay the course', 'I get a little nervous', 'I prefer steady & simple', 'I’m still figuring it out'],
  },
  {
    prompt: 'How would you describe your savings habit?',
    caption: 'This helps us make your next step feel doable.',
    options: ['A regular monthly rhythm', 'When there’s something left', 'Saving for one big goal', 'I want to start fresh'],
  },
  {
    prompt: 'What would feeling good about money look like?',
    caption: 'Choose the one that sounds most like you.',
    options: ['A plan I can stick to', 'More room to grow', 'A safety net for my family', 'Less stress, more clarity'],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

function formatRupees(amount) {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2).replace(/\.?0+$/, '')} Cr`
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1).replace(/\.0$/, '')}L`
  return `₹${Math.round(amount).toLocaleString('en-IN')}`
}

function App() {
  const [monthly, setMonthly] = useState(10000)
  const [years, setYears] = useState(15)
  const [quizOpen, setQuizOpen] = useState(false)
  const [quizStep, setQuizStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [bookingOpen, setBookingOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const invested = monthly * 12 * years
  const futureValue = monthly * (((1 + 0.12 / 12) ** (years * 12) - 1) / (0.12 / 12)) * (1 + 0.12 / 12)
  const wealth = formatRupees(futureValue)
  const chartPoints = Array.from({ length: 13 }, (_, index) => {
    const year = Math.max(1, Math.round((years * index) / 12))
    const value = monthly * (((1 + 0.12 / 12) ** (year * 12) - 1) / (0.12 / 12)) * (1 + 0.12 / 12)
    return { x: 28 + (index / 12) * 342, y: 195 - (value / futureValue) * 150 }
  })
  const chartPath = chartPoints.map((point, index) => `${index ? 'L' : 'M'} ${point.x} ${point.y}`).join(' ')
  const areaPath = `${chartPath} L 370 200 L 28 200 Z`
  const archetype = answers[1] === 'I stay the course' || answers[0] === 'More room to grow'
    ? 'The Ambitious Planner'
    : answers[0] === 'Getting organized' || answers[1] === 'I’m still figuring it out'
      ? 'The Mindful Builder'
      : 'The Steady Dreamer'

  const openQuiz = () => {
    setQuizStep(0)
    setAnswers([])
    setQuizOpen(true)
  }
  const pickAnswer = (answer) => {
    const next = [...answers]
    next[quizStep] = answer
    setAnswers(next)
    if (quizStep < quizSteps.length - 1) setQuizStep(quizStep + 1)
    else setQuizStep(quizSteps.length)
  }
  const closeBooking = () => {
    setBookingOpen(false)
    setSubmitted(false)
  }

  return (
    <div className="site-shell antialiased">
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Aman Verma home">Aman Verma<span>.</span></a>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'}>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#playground" onClick={() => setMenuOpen(false)}>Playground</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About Aman</a>
          <button className="button button-dark nav-cta" onClick={() => setBookingOpen(true)}>Book a consultation <ArrowUpRight size={15} /></button>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <motion.div className="hero-copy" initial="hidden" animate="visible" variants={fadeUp}>
            <div className="eyebrow"><span className="eyebrow-dot" /> Financial consultation, made human</div>
            <h1>Stop stressing about money. <em>Let’s make it work for you.</em></h1>
            <p className="hero-description">Personalized financial consultation for your life goals—no jargon, no judgment.</p>
            <div className="hero-actions">
              <button className="button button-dark" onClick={openQuiz}>Take the 60-second quiz <ArrowRight size={16} /></button>
              <button className="button button-light" onClick={() => setBookingOpen(true)}>Book a free chat</button>
            </div>
            <div className="hero-proof"><div className="avatar-stack"><span>AV</span><span>✦</span><span>✓</span></div><p><strong>A little more clarity.</strong><br />A lot more confidence.</p></div>
          </motion.div>
          <motion.div className="hero-visual" initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .12 }}>
            <div className="hero-photo">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=85" alt="Aman Verma, financial advisor" />
              <div className="photo-shade" />
              <div className="photo-label"><span>Meet your money person</span><strong>Aman Verma</strong></div>
            </div>
            <div className="photo-note"><div className="note-icon"><Leaf size={17} /></div><div><span>Good plans grow</span><small>at your own pace.</small></div></div>
            <div className="hero-image-index">01 <span>—</span> A MORE HUMAN KIND OF FINANCE</div>
          </motion.div>
          <a href="#services" className="scroll-cue"><ArrowDown size={14} /> A little less stress starts here</a>
        </section>

        <section className="services section-wrap" id="services">
          <motion.div className="section-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .3 }} variants={fadeUp}>
            <div className="eyebrow centered-eyebrow">Practical help, without the hard sell</div>
            <h2>Big plans. <em>Small steps.</em></h2>
            <p>Whatever your next chapter looks like, we’ll make the money side feel a little simpler.</p>
          </motion.div>
          <div className="service-grid">
            {services.map(({ title, note, icon: Icon }, index) => (
              <motion.article className="service-card" key={title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={fadeUp} transition={{ delay: index * .055 }}>
                <div className="service-card-top"><span className="service-number">0{index + 1}</span><span className="service-icon"><Icon size={20} strokeWidth={1.7} /></span></div>
                <h3>{title}</h3><p>{note}</p><ArrowUpRight className="service-arrow" size={16} />
              </motion.article>
            ))}
            <article className="service-card service-hello">
              <span className="hello-spark"><Sparkles size={18} /></span>
              <h3>Not sure where to start?</h3>
              <p>Tell me what’s on your mind. We’ll figure it out together.</p>
              <button onClick={() => setBookingOpen(true)} className="text-link">Let’s talk <ArrowRight size={14} /></button>
            </article>
          </div>
        </section>

        <section className="playground section-wrap" id="playground">
          <motion.div className="playground-intro" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="eyebrow"><span className="eyebrow-dot" /> Your future, in the making</div>
            <h2>A little <em>what if?</em></h2>
            <p>Small, steady investments can add up to something wonderful. Play around and see what your monthly SIP could grow into.</p>
            <div className="assumption-note"><CircleHelp size={15} /><span>Illustration assumes 12% annual returns. Actual returns vary.</span></div>
          </motion.div>
          <motion.div className="calculator-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={fadeUp}>
            <div className="calculator-controls">
              <div className="calculator-title"><span className="calculator-icon"><TrendingUp size={18} /></span><div><span>Money playground</span><strong>Try out your future</strong></div></div>
              <label className="range-control">
                <span className="range-label">Invest monthly <strong>{formatRupees(monthly)}</strong></span>
                <input type="range" min="1000" max="100000" step="1000" value={monthly} style={{ '--range-progress': `${((monthly - 1000) / 99000) * 100}%` }} onChange={(event) => setMonthly(Number(event.target.value))} aria-label="Monthly investment amount" />
                <span className="range-hints"><span>₹1,000</span><span>₹1,00,000</span></span>
              </label>
              <label className="range-control">
                <span className="range-label">Investment duration <strong>{years} years</strong></span>
                <input type="range" min="1" max="30" step="1" value={years} style={{ '--range-progress': `${((years - 1) / 29) * 100}%` }} onChange={(event) => setYears(Number(event.target.value))} aria-label="Investment duration in years" />
                <span className="range-hints"><span>1 year</span><span>30 years</span></span>
              </label>
              <div className="calc-footnote"><BadgeCheck size={16} /><span>Just a friendly illustration, not a promise.</span></div>
            </div>
            <div className="calculator-result">
              <div className="result-topline"><span>YOUR MONEY, GIVEN TIME</span><span className="live-dot">● LIVE</span></div>
              <p className="result-caption">Your wealth in <strong>{years} years</strong></p>
              <AnimatePresence mode="wait"><motion.div className="result-amount" key={wealth} initial={{ opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -7 }} transition={{ duration: .2 }}>{wealth}<span>+</span></motion.div></AnimatePresence>
              <div className="chart-wrap" aria-label={`Projected investment growth chart, approximately ${wealth} in ${years} years`}>
                <svg viewBox="0 0 400 225" role="img" aria-label="Illustrative investment growth chart">
                  <defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#789b78" stopOpacity=".33" /><stop offset="100%" stopColor="#789b78" stopOpacity="0" /></linearGradient><linearGradient id="chartLine" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stopColor="#bd9868" /><stop offset="42%" stopColor="#789b78" /><stop offset="100%" stopColor="#1e3a2f" /></linearGradient></defs>
                  {[50, 100, 150, 200].map(y => <line key={y} x1="28" y1={y} x2="370" y2={y} stroke="#e9e9df" strokeDasharray="3 5" />)}
                  <motion.path d={areaPath} fill="url(#chartFill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .6 }} />
                  <motion.path d={chartPath} fill="none" stroke="url(#chartLine)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: .8, ease: 'easeOut' }} />
                  <circle cx="370" cy={chartPoints[12].y} r="5" fill="#1e3a2f" stroke="#fff" strokeWidth="3" />
                  <text x="28" y="220">YEAR 1</text><text x="333" y="220">YEAR {years}</text>
                </svg>
              </div>
              <div className="result-legend"><span><i className="legend-wealth" /> Potential value</span><span className="invested-legend">You invest <strong>{formatRupees(invested)}</strong></span></div>
            </div>
          </motion.div>
        </section>

        <section className="about section-wrap" id="about">
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=85" alt="A warm, sunlit space to talk money" />
            <div className="about-image-caption"><span>A seat at the table</span><strong>Always yours.</strong></div>
          </div>
          <motion.div className="about-copy" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} variants={fadeUp}>
            <div className="eyebrow"><span className="eyebrow-dot" /> A note from Aman</div>
            <h2>Good advice starts with <em>a good conversation.</em></h2>
            <p className="about-lead">Money can be personal. Talking about it shouldn’t feel complicated.</p>
            <p>I’m Aman. I help people make sense of the choices in front of them, find a plan that fits real life, and feel a little more at ease about what comes next.</p>
            <p>No pressure to have it all figured out before we talk. That’s what the conversation is for.</p>
            <button className="button button-dark" onClick={() => setBookingOpen(true)}>A little about me <ArrowRight size={16} /></button>
            <div className="about-signoff">Aman <span>✳</span></div>
          </motion.div>
        </section>

        <section className="closing-cta section-wrap">
          <motion.div className="closing-inner" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="closing-decoration"><span /><span /><span /></div>
            <div className="eyebrow centered-eyebrow">You don’t have to figure it out alone</div>
            <h2>Let’s make your next<br /><em>money move a good one.</em></h2>
            <p>One easy conversation. A little more clarity. No strings attached.</p>
            <button className="button button-dark" onClick={() => setBookingOpen(true)}>Book a free 15-minute chat <ArrowRight size={16} /></button>
          </motion.div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand"><a className="wordmark" href="#home">Aman Verma<span>.</span></a><p>Money, made more human.</p></div>
          <div className="footer-nav"><span>TAKE A LOOK</span><a href="#services">Services</a><a href="#playground">Money playground</a><a href="#about">About Aman</a></div>
          <div className="footer-contact"><span>WHENEVER YOU’RE READY</span><p>Start with a simple hello.</p><button className="text-link" onClick={() => setBookingOpen(true)}>Let’s have a chat <ArrowUpRight size={14} /></button></div>
          <div className="footer-note"><span className="footer-sun">✳</span><p>Rooted in real life.<br />Made for what’s next.</p></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Aman Verma. Made with care.</span><span>Financial guidance for real life.</span><a href="#home">Back to the top ↑</a></div>
      </footer>

      <AnimatePresence>
        {quizOpen && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setQuizOpen(false) }}>
          <motion.div className="quiz-modal" role="dialog" aria-modal="true" aria-labelledby="quiz-title" initial={{ opacity: 0, y: 20, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }}>
            <button className="modal-close" onClick={() => setQuizOpen(false)} aria-label="Close quiz"><X size={19} /></button>
            {quizStep < quizSteps.length ? <>
              <div className="quiz-top"><div className="quiz-mark"><Sparkles size={19} /></div><span>MONEY VIBE CHECK</span><span>{quizStep + 1} / 4</span></div>
              <div className="quiz-progress"><span style={{ width: `${((quizStep + 1) / 4) * 100}%` }} /></div>
              <AnimatePresence mode="wait"><motion.div key={quizStep} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                <p className="quiz-kicker">A QUICK CHECK-IN</p><h2 id="quiz-title">{quizSteps[quizStep].prompt}</h2><p className="quiz-caption">{quizSteps[quizStep].caption}</p>
                <div className="quiz-options">{quizSteps[quizStep].options.map(option => <button key={option} onClick={() => pickAnswer(option)}>{option}<ArrowRight size={15} /></button>)}</div>
              </motion.div></AnimatePresence>
              <div className="quiz-footer">{quizStep > 0 && <button className="back-button" onClick={() => setQuizStep(quizStep - 1)}><ChevronLeft size={15} /> Back</button>}<span>Just for you. No data saved.</span></div>
            </> : <div className="quiz-result">
              <div className="result-bloom"><Sparkles size={22} /></div><p className="quiz-kicker">YOUR MONEY ARCHETYPE</p><h2 id="quiz-title">{archetype}</h2>
              <p className="quiz-caption">Your best plan is one that feels good in real life—not just on paper.</p>
              <div className="tips-card"><span>YOUR FIRST LITTLE STEPS</span><p><Check size={15} /> Start with one money goal that matters most to you.</p><p><Check size={15} /> Make a small monthly habit before aiming bigger.</p></div>
              <button className="button button-dark quiz-book" onClick={() => { setQuizOpen(false); setBookingOpen(true) }}>Talk it through with Aman <ArrowRight size={16} /></button>
              <button className="retake-link" onClick={openQuiz}>Start over</button>
            </div>}
          </motion.div>
        </motion.div>}
      </AnimatePresence>

      <AnimatePresence>
        {bookingOpen && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) closeBooking() }}>
          <motion.div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title" initial={{ opacity: 0, y: 20, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }}>
            <button className="modal-close" onClick={closeBooking} aria-label="Close booking form"><X size={19} /></button>
            {submitted ? <div className="booking-success"><div className="success-icon"><Check size={24} /></div><p className="quiz-kicker">MESSAGE RECEIVED</p><h2 id="booking-title">Thanks for reaching out.</h2><p>I’ll be in touch soon to find a time that works for you.</p><button className="button button-dark" onClick={closeBooking}>Sounds good <ArrowRight size={15} /></button></div> : <>
              <div className="eyebrow"><span className="eyebrow-dot" /> A simple first step</div>
              <h2 id="booking-title">Let’s talk <em>money.</em></h2>
              <p className="booking-intro">Tell me a little about you, and I’ll be in touch to set up a relaxed, no-pressure chat.</p>
              <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
                <label>Your name<input name="name" type="text" placeholder="What should I call you?" required /></label>
                <label>Phone / WhatsApp<input name="phone" type="tel" placeholder="+91 98765 43210" minLength={8} required /></label>
                <label>What would you like to talk about?
                  <select name="service" defaultValue="" required><option value="" disabled>Pick what’s on your mind</option>{services.map(service => <option key={service.title}>{service.title}</option>)}<option>Not sure yet</option></select>
                </label>
                <label>When’s a good time?<input name="time" type="text" placeholder="e.g. Weekday evenings" required /></label>
                <button className="button button-dark submit-booking" type="submit">Request a free chat <ArrowRight size={16} /></button>
              </form>
              <p className="privacy-note"><ShieldCheck size={14} /> Your details stay between us. No spam, ever.</p>
            </>}
          </motion.div>
        </motion.div>}
      </AnimatePresence>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)

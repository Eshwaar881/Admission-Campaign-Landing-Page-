import { useMemo, useState } from 'react';

const programs = [
  { title: 'Early Learners', description: 'Structured play, discovery labs, and social confidence.' },
  { title: 'Daycare Enrichment', description: 'Flexible hours, healthy meals, and licensed caregivers.' },
  { title: 'Demo Visit', description: 'Guided tour, classroom preview, and enrollment chat.' },
];

const galleryItems = [
  { label: 'Creative Space', accent: '#f6d365' },
  { label: 'Outdoor Play', accent: '#f093fb' },
  { label: 'Healthy Meals', accent: '#fadf86' },
  { label: 'Parent Lounge', accent: '#cbb4d4' },
];

const checklist = [
  'Small class sizes for personalized attention',
  'Daily program updates and progress tracking',
  'Licensed educators with early childhood training',
  'Safe, clean facility with a nurturing environment',
];

const testimonials = [
  {
    name: 'Alexandra M.',
    role: 'Parent of 2-year-old Lily',
    quote: 'The admissions process was smooth and the demo visit helped us feel confident right away. Our child loves the creative play areas.',
  },
  {
    name: 'Marcus P.',
    role: 'Family member',
    quote: 'The staff were warm, attentive, and well organized. The daycare program balances fun and learning beautifully.',
  },
  {
    name: 'Priya S.',
    role: 'Working parent',
    quote: 'I appreciated the priority enrollment options and the care updates after each visit. The demo visit was a game-changer.',
  },
];

const faqs = [
  {
    question: 'How do I reserve a demo visit?',
    answer: 'Use the booking form to select your preferred date and program. Our team will confirm your visit within one business day.',
  },
  {
    question: 'What ages do you accept?',
    answer: 'We enroll children ages 6 months through 5 years with small group ratios and flexible full-day scheduling.',
  },
  {
    question: 'Are meals included in the daycare program?',
    answer: 'Yes, our daycare program includes healthy breakfasts, snacks, and lunch designed for growing learners.',
  },
];

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const firstWeekday = firstDay.getDay();
  const numberOfDays = new Date(year, month + 1, 0).getDate();
  const days = [];

  for (let i = 0; i < firstWeekday; i += 1) {
    days.push(null);
  }

  for (let date = 1; date <= numberOfDays; date += 1) {
    days.push(new Date(year, month, date));
  }

  return days;
}

function App() {
  const [today] = useState(() => new Date());
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth());
  const [calendarYear, setCalendarYear] = useState(today.getFullYear());

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    program: 'Early Learners',
    visitDate: formatDate(today),
    message: '',
  });

  const [submissionMessage, setSubmissionMessage] = useState('');

  const calendarDays = useMemo(
    () => getMonthDays(calendarYear, calendarMonth),
    [calendarMonth, calendarYear]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmissionMessage(
      `Thanks, ${formData.name || 'visitor'}! We received your request for a ${formData.program} demo visit on ${formData.visitDate}.`
    );
    setFormData({ name: '', email: '', program: 'Early Learners', visitDate: formatDate(today), message: '' });
  };

  const handleDateSelect = (date) => {
    if (!date) return;
    const iso = formatDate(date);
    setFormData((prev) => ({ ...prev, visitDate: iso }));
  };

  const monthLabels = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  return (
    <div className="page-shell">
      <header className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Admissions Open</span>
          <h1>Launch your child’s next chapter with our daycare admissions.</h1>
          <p>
            Discover a safe, joyful learning community with flexible enrollment, creative curriculum, and guided demo visits for every family.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#demo-form">Book a Demo Visit</a>
            <a className="button secondary" href="#enroll">Apply Now</a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-card">
            <p className="hero-card-title">Today’s Open Offers</p>
            <ul>
              <li>Priority enrollment for infants & toddlers</li>
              <li>Sibling discounts on full-day care</li>
              <li>Summer readiness booster sessions</li>
            </ul>
          </div>
        </div>
      </header>

      <main>
        <section className="section-intro" aria-labelledby="programs-heading">
          <div>
            <p className="section-label">Our campaign highlights</p>
            <h2 id="programs-heading">Programs built for families who want more than daycare.</h2>
          </div>
          <div className="card-grid">
            {programs.map((item) => (
              <article key={item.title} className="feature-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-light" aria-labelledby="campus-heading">
          <div className="section-copy">
            <p className="section-label">Why parents choose us</p>
            <h2 id="campus-heading">A warm, dependable place for play, growth, and peace of mind.</h2>
            <p>
              From responsive care routines to curriculum-rich activities, our campus is designed for the modern family.
              Tour classrooms, meet teachers, and see how our learning path supports early social, emotional, and creative growth.
            </p>
          </div>
          <div className="checklist-card">
            <h3>What you’ll experience</h3>
            <ul>
              {checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="gallery-section" aria-labelledby="gallery-heading">
          <div className="section-copy">
            <p className="section-label">Campus tour preview</p>
            <h2 id="gallery-heading">A glimpse of life in our classrooms and outdoor spaces.</h2>
          </div>
          <div className="gallery-grid">
            {galleryItems.map((item) => (
              <div key={item.label} className="gallery-card" style={{ background: item.accent }}>
                <strong>{item.label}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="testimonial-section" aria-labelledby="testimonial-heading">
          <div className="section-copy">
            <p className="section-label">Parent reviews</p>
            <h2 id="testimonial-heading">Trusted by families who value caring, modern childcare.</h2>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.name} className="testimonial-card">
                <p>{item.quote}</p>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="faq-section" aria-labelledby="faq-heading">
          <div className="section-copy">
            <p className="section-label">Questions answered</p>
            <h2 id="faq-heading">Admissions, schedules, and what to expect.</h2>
          </div>
          <div className="faq-grid">
            {faqs.map((item) => (
              <div key={item.question} className="faq-item">
                <p className="faq-question">{item.question}</p>
                <p className="faq-answer">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="form-section" id="enroll" aria-labelledby="form-heading">
          <div className="section-copy">
            <p className="section-label">Schedule your visit</p>
            <h2 id="form-heading">Reserve a demo and secure priority enrollment.</h2>
            <p>
              Complete the quick form below and our admissions team will contact you within one business day.
            </p>
          </div>

          <div className="form-layout">
            <form className="enrollment-form" onSubmit={handleSubmit}>
              <label>
                Full name
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  required
                />
              </label>

              <label>
                Email address
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                />
              </label>

              <label>
                Interested program
                <select name="program" value={formData.program} onChange={handleChange}>
                  <option>Early Learners</option>
                  <option>Daycare Enrichment</option>
                  <option>Demo Visit</option>
                </select>
              </label>

              <label>
                Preferred visit date
                <input
                  type="date"
                  name="visitDate"
                  value={formData.visitDate}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Notes / questions
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share your child’s age or any scheduling needs."
                />
              </label>

              <button type="submit" className="button primary">Request a Demo</button>
              {submissionMessage && <p className="submission-message">{submissionMessage}</p>}
            </form>

            <aside className="calendar-card" aria-label="Booking calendar">
              <div className="calendar-header">
                <button type="button" onClick={() => {
                  setCalendarMonth((prev) => (prev === 0 ? 11 : prev - 1));
                  if (calendarMonth === 0) setCalendarYear((y) => y - 1);
                }} aria-label="Previous month">‹</button>
                <div>
                  <span>{monthLabels[calendarMonth]}</span>
                  <strong>{calendarYear}</strong>
                </div>
                <button type="button" onClick={() => {
                  setCalendarMonth((prev) => (prev === 11 ? 0 : prev + 1));
                  if (calendarMonth === 11) setCalendarYear((y) => y + 1);
                }} aria-label="Next month">›</button>
              </div>

              <div className="calendar-weekdays">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
              <div className="calendar-days">
                {calendarDays.map((date, index) => {
                  const iso = date ? formatDate(date) : null;
                  const selected = iso === formData.visitDate;
                  const isToday = date && formatDate(date) === formatDate(today);
                  return (
                    <button
                      key={`${date?.toString() || 'empty'}-${index}`}
                      type="button"
                      className={`calendar-day ${selected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                      onClick={() => handleDateSelect(date)}
                      disabled={!date}
                      aria-label={date ? `Select ${iso}` : 'Empty date'}
                    >
                      {date?.getDate() ?? ''}
                    </button>
                  );
                })}
              </div>
              <div className="calendar-note">
                Selected date: <strong>{formData.visitDate}</strong>
              </div>
            </aside>
          </div>
        </section>

        <section className="cta-strip">
          <div>
            <h2>Ready to make admissions easy?</h2>
            <p>Join our next open house and see why families trust us for personalized care.</p>
          </div>
          <a className="button secondary" href="#demo-form">Book a visit</a>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 Admission Campaign Landing Page. Accessible, modern, and optimized for families.</p>
      </footer>
    </div>
  );
}

export default App;

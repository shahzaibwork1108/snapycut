import { useState, FormEvent } from "react";
import { X, Calendar, Clock, Sparkles, CheckCircle2, ChevronRight, Video, Target, TrendingUp, Scissors } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    channelType: "",
    challenge: "",
    date: "",
    time: "",
    name: "",
    email: "",
    handle: ""
  });
  


  const [bookingProgress, setBookingProgress] = useState(0);

  const handleSelectChannel = (channel: string) => {
    setFormData(prev => ({ ...prev, channelType: channel }));
    setStep(2);
  };

  const handleSelectChallenge = (challenge: string) => {
    setFormData(prev => ({ ...prev, challenge: challenge }));
    setStep(3);
  };

  const startBookingSimulation = () => {
    setStep(5);
    let current = 0;
    const interval = setInterval(() => {
      current += 8;
      if (current >= 100) {
        setBookingProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setStep(6);
        }, 800);
      } else {
        setBookingProgress(current);
      }
    }, 150);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    startBookingSimulation();
  };

  const resetModal = () => {
    setStep(1);
    setBookingProgress(0);
    setFormData({
      channelType: "",
      challenge: "",
      date: "",
      time: "",
      name: "",
      email: "",
      handle: ""
    });
    onClose();
  };

  // Pre-calculated dates for the next few days
  const getNextDays = () => {
    const days = [];
    const options = { weekday: 'short', month: 'short', day: 'numeric' } as const;
    for (let i = 1; i <= 5; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push({
        raw: d.toISOString().split('T')[0],
        formatted: d.toLocaleDateString('en-US', options)
      });
    }
    return days;
  };

  const timeSlots = ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"];

  return (
    <> 
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={resetModal}
            className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in"
            id="modal-backdrop"
          />

          {/* Modal Card */}
          <div
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-purple-500/20 bg-neutral-950 p-6 md:p-8 text-white shadow-2xl shadow-purple-950/20 animate-scale-in"
            id="modal-card"
          >
            {/* Top Close Button */}
            <button
              onClick={resetModal}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors p-1.5 hover:bg-neutral-900 rounded-lg"
              id="modal-close-btn"
            >
              <X size={20} />
            </button>

            {/* Step Indicators */}
            {step <= 4 && (
              <div className="mb-6 flex gap-1.5" id="step-indicators">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      step >= i ? "bg-purple-600 shadow-[0_0_10px_rgba(168,85,247,0.5)]" : "bg-neutral-800"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Step 1: Platform Type */}
            {step === 1 && (
              <div id="step-1">
                <div className="mb-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-950/50 px-3 py-1 text-xs font-semibold text-purple-400 border border-purple-500/10">
                    <Sparkles size={12} className="text-purple-400 animate-pulse" /> Step 1: Primary Target Channel
                  </span>
                  <h3 className="mt-3 text-2xl font-bold text-white tracking-tight"> What content channel are we auditing? </h3>
                  <p className="mt-1 text-neutral-400 text-sm"> Choose the primary slot you need help scripting, editing, and growing. </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    { id: "youtube", title: "YouTube Shorts / Reels", icon: Video, desc: "Fast cuts, high retention edits" },
                    { id: "tiktok", title: "TikTok Native Content", icon: TrendingUp, desc: "Hook-driven trends & sounds" },
                    { id: "instagram", title: "Instagram Reels", icon: Target, desc: "Aesthetic branding & lifestyle" },
                    { id: "personal", title: "Personal Brand / Podcast", icon: Scissors, desc: "Multi-angle clips & setups" },
                  ].map((chan) => (
                    <button
                      key={chan.id}
                      onClick={() => handleSelectChannel(chan.title)}
                      className="group flex flex-col items-start rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 text-left transition-all hover:border-purple-500/40 hover:bg-purple-950/10 hover:shadow-lg"
                      id={`channel-btn-${chan.id}`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 text-neutral-300 group-hover:bg-purple-600 group-hover:text-white transition-all">
                        <chan.icon size={20} />
                      </div>
                      <h4 className="mt-3 font-semibold text-white group-hover:text-purple-300 transition-colors">{chan.title}</h4>
                      <p className="mt-1 text-xs text-neutral-400">{chan.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Main blocker */}
            {step === 2 && (
              <div id="step-2">
                <div className="mb-6">
                  <button onClick={() => setStep(1)} className="text-xs text-purple-400 hover:underline mb-2 block">
                    &larr; Back to platforms
                  </button>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-950/50 px-3 py-1 text-xs font-semibold text-purple-400 border border-purple-500/10">
                    Step 2: Core Bottleneck
                  </span>
                  <h3 className="mt-3 text-2xl font-bold text-white tracking-tight"> What is holding you back? </h3>
                  <p className="mt-1 text-neutral-400 text-sm"> What is your biggest problem with publishing daily content? </p>
                </div>

                <div className="space-y-2">
                  {[
                    "Editing takes too much time & energy",
                    "Struggling to find high-performing hooks/scripts",
                    "Consistency triggers (burnout, lack of setup)",
                    "Thumbnails, Titles & SEO positioning are weak",
                    "We have a team but no clear visual style"
                  ].map((problem, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectChallenge(problem)}
                      className="w-full flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-3 text-left transition-all hover:border-purple-500/40 hover:bg-purple-950/10"
                      id={`challenge-btn-${i}`}
                    >
                      <span className="text-sm font-medium text-neutral-200">{problem}</span>
                      <ChevronRight size={16} className="text-neutral-500" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Pick Date & Time */}
            {step === 3 && (
              <div id="step-3">
                <div className="mb-6">
                  <button onClick={() => setStep(2)} className="text-xs text-purple-400 hover:underline mb-2 block">
                    &larr; Back to bottleneck
                  </button>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-950/50 px-3 py-1 text-xs font-semibold text-purple-400 border border-purple-500/10">
                    Step 3: Choose Slot
                  </span>
                  <h3 className="mt-3 text-2xl font-bold text-white tracking-tight"> Select your strategy call session </h3>
                  <p className="mt-1 text-neutral-400 text-sm"> Choose an available slot. All sessions are carried out over Google Meet. </p>
                </div>

                {/* Day Selection */}
                <span className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Select Date</span>
                <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-neutral-800">
                  {getNextDays().map((day) => (
                    <button
                      key={day.raw}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, date: day.formatted }))}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center min-w-[76px] transition-all cursor-pointer ${
                        formData.date === day.formatted
                          ? "border-purple-600 bg-purple-950/30 text-white"
                          : "border-neutral-800 bg-neutral-900/30 text-neutral-400 hover:border-neutral-700 hover:text-white"
                      }`}
                      id={`date-slot-${day.raw}`}
                    >
                      <span className="text-xs">{day.formatted.split(',')[0]}</span>
                      <span className="text-base font-bold mt-1">{day.formatted.split(' ')[2] || day.formatted.split(',')[1]?.trim()}</span>
                    </button>
                  ))}
                </div>

                {/* Time Selection */}
                {formData.date && (
                  <div className="mt-4">
                    <span className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Select Time</span>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, time }))}
                          className={`py-2 rounded-lg border text-xs font-semibold text-center transition-all cursor-pointer ${
                            formData.time === time
                              ? "border-purple-600 bg-purple-600 text-white"
                              : "border-neutral-800 bg-neutral-900/30 text-neutral-400 hover:border-neutral-700"
                          }`}
                          id={`time-slot-${time.replace(/[:\s]/g, '-')}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Next button */}
                <button
                  disabled={!formData.date || !formData.time}
                  onClick={() => setStep(4)}
                  className="w-full mt-6 py-3 rounded-xl bg-purple-600 text-white font-semibold text-sm hover:bg-purple-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                  id="date-next-btn"
                >
                  Confirm Slot ({formData.date} &bull; {formData.time || "Pick Time"})
                </button>
              </div>
            )}

            {/* Step 4: Contact Form */}
            {step === 4 && (
              <div id="step-4">
                <div className="mb-6">
                  <button onClick={() => setStep(3)} className="text-xs text-purple-400 hover:underline mb-2 block">
                    &larr; Back to calendar
                  </button>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-950/50 px-3 py-1 text-xs font-semibold text-purple-400 border border-purple-500/10">
                    Step 4: Contact Details
                  </span>
                  <h3 className="mt-3 text-2xl font-bold text-white tracking-tight"> Almost done! Who is hosting? </h3>
                  <p className="mt-1 text-neutral-400 text-sm"> Fill in your details so our team can prepare your custom strategy blueprint. </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900/50 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-sm transition-all"
                      id="input-name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900/50 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-sm transition-all"
                      id="input-email"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Social ID / Channel Handle (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. @username or youtube.com/c/handle"
                      value={formData.handle}
                      onChange={(e) => setFormData(p => ({ ...p, handle: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900/50 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-sm transition-all"
                      id="input-handle"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-purple-600 text-white font-semibold text-sm hover:bg-purple-500 transition-all shadow-[0_4px_20px_rgba(147,51,234,0.3)] hover:shadow-[0_4px_25px_rgba(147,51,234,0.5)] active:scale-[0.99]"
                      id="submit-booking-btn"
                    >
                      Lock in my Free Strategy Audit Call 🚀
                    </button>
                    <p className="mt-2 text-[10px] text-neutral-500 text-center">
                      By submitting, you agree to receive follow-up emails regarding your video audit.
                    </p>
                  </div>
                </form>
              </div>
            )}

            {/* Step 5: Booking Load Simulation */}
            {step === 5 && (
              <div className="flex flex-col items-center justify-center py-12 text-center" id="step-5">
                <div className="relative h-20 w-20 flex items-center justify-center">
                  <span className="absolute animate-ping h-8 w-8 rounded-full bg-purple-600 opacity-75"></span>
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
                  <Calendar size={20} className="absolute text-purple-400 animate-pulse" />
                </div>
                <h4 className="mt-6 text-xl font-bold text-white">Configuring Custom Video Audit...</h4>
                <p className="mt-2 text-sm text-neutral-400 max-w-sm">
                  Reviewing your channel bottleneck and reserving slots on the calendar timeline.
                </p>

                <div className="mt-8 w-full max-w-xs bg-neutral-900 rounded-full h-2 overflow-hidden border border-neutral-800">
                  <div
                    className="h-full bg-purple-600 transition-all duration-150"
                    style={{ width: `${bookingProgress}%` }}
                  />
                </div>
                <span className="mt-2 text-xs font-mono text-purple-400">{bookingProgress}% compiled</span>
              </div>
            )}

            {/* Step 6: Success! */}
            {step === 6 && (
              <div className="text-center py-8" id="step-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-950 border border-purple-500/30 text-purple-400 mb-6">
                  <CheckCircle2 size={36} className="text-purple-400 animate-bounce" />
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">Your Strategy Audit is Confirmed!</h3>
                <p className="mt-2 text-sm text-neutral-300 max-w-md mx-auto">
                  High-five, <span className="font-semibold text-purple-300">{formData.name}</span>! We have locked your spot on <span className="text-purple-300 font-semibold">{formData.date}</span> at <span className="text-purple-300 font-semibold">{formData.time}</span>.
                </p>

                <div className="mt-6 rounded-xl border border-purple-500/10 bg-purple-950/20 p-4 text-left max-w-md mx-auto">
                  <h4 className="font-semibold text-sm text-purple-300 mb-2 flex items-center gap-1.5">
                    <Sparkles size={14} /> Next Steps for Snapycut Video Audit:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-neutral-400">
                    <li className="flex items-start gap-1">
                      <span className="text-purple-400 font-bold">&bull;</span> Check your inbox (<span className="text-neutral-300">{formData.email}</span>) for the calendar invite.
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-purple-400 font-bold">&bull;</span> A video strategist is analyzing your niche & competitors right now.
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-purple-400 font-bold">&bull;</span> Prepare your existing channels to discuss video improvements.
                    </li>
                  </ul>
                </div>

                <button
                  onClick={resetModal}
                  className="mt-8 px-6 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-200 text-xs font-semibold hover:border-purple-600 hover:text-white hover:bg-neutral-900/60 transition-all"
                  id="close-success-btn"
                >
                  Awesome, let's explore Snapycut!
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

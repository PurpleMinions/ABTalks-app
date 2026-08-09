import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, Check, ChevronDown, ChevronRight, Code2, Copy, Flame,
  Github, Heart, Home, Lightbulb, Linkedin, LockKeyhole, RefreshCw,
  Rocket, Send, Sparkles, Trophy, TrendingUp, UserRound, Volume2, Keyboard,
  VolumeX, X, Clock3
} from "lucide-react";
import "./styles.css";

const challenge = {
  day: 12,
  total: 60,
  task: {
    title: "Build a tiny product that solves one annoying problem",
    intro: "Today, turn a small frustration into something people can actually use.",
    goal: "Ship a polished single-page experience with a clear input, a useful output, and one moment of delight.",
    deliverables: [
      "A responsive interface that works at 390px",
      "One meaningful interaction or state change",
      "A deployed version anyone can open"
    ],
    stretch: "Add a tiny detail that makes the experience feel unmistakably yours."
  }
};

function Logo(){return <div className="logo"><span>AB</span>Talks</div>}
function Button({children,variant="primary",className="",onClick,href}){const Tag=href?"a":"button";return <Tag href={href} onClick={onClick} className={`btn btn-${variant} ${className}`}>{children}</Tag>}
function Header(){return <header className="app-header"><a href="/" className="app-logo"><Logo/></a><a href="/builder/twisha" className="header-link">Builder profile <ArrowRight size={14}/></a></header>}
function BottomNav({active="home"}){return <nav className="bottom-nav"><a className={active==="home"?"active":""} href="/dashboard"><Home size={18}/><span>Home</span></a><a className={active==="day"?"active":""} href="/day/12"><Code2 size={18}/><span>Today</span></a><a href="/dashboard"><Trophy size={18}/><span>Wins</span></a><a href="/dashboard"><UserRound size={18}/><span>Profile</span></a></nav>}
function ProgressRing({value=0}){return <div className="progress-ring" style={{"--value":`${value}%`}}><strong>{value}%</strong></div>}
function TestLink({value}){const [tested,setTested]=useState(false);const test=()=>{if(!value){return}setTested(true);try{window.open(value,"_blank","noopener,noreferrer")}catch(e){}};return <button type="button" className={`test-link ${tested?"tested":""}`} onClick={test}>{tested?<Check size={12}/>:"Test"}</button>}
function LinkField({label,icon,placeholder,value,onChange,required=true}){
  const github=/GitHub/i.test(label);
  const prefix="https://github.com/";
  const visible=github&&value.startsWith(prefix)?value.slice(prefix.length):github?value.replace(/^https?:\/\/(www\.)?github\.com\//i,""):value;
  const update=e=>onChange(github?prefix+e.target.value.replace(/^https?:\/\/(www\.)?github\.com\//i,""):e.target.value);
  return <label className="field"><span>{label} {required&&<b>*</b>}</span><div className={`input-wrap ${github?"github-input":""}`}>{icon}{github&&<span className="input-prefix">github.com/</span>}<input value={visible} onChange={update} placeholder={github?"your-username/project":placeholder} inputMode="url" autoComplete="url"/>{value&&<TestLink value={github?prefix+visible:value}/>}</div></label>
}

const jokes=[
    ["😎","Why do programmers prefer dark mode?","Because light attracts bugs.","Dark mode can reduce visual glare in low-light conditions."],
    ["🐛","Why did the developer go broke?","Because they used up all their cache.","A cache stores frequently used data so it can be reused faster."],
    ["😅","How do you comfort a JavaScript bug?","You console it.","console.log() is a simple way to inspect values while debugging."],
    ["😂","Why did the function break up with the loop?","It needed some space.","Loops repeat instructions; functions package reusable instructions."],
    ["🔧","What is a programmer's favorite place?","The foo bar.","foo and bar are common placeholder names in programming examples."],
    ["🍫","Why did the CSS rule get promoted?","It had great specificity.","CSS specificity helps decide which rule wins when selectors compete."],
    ["🎨","What did the Git commit say?","I've got your back.","A commit creates a checkpoint in your version-control history."],
    ["📦","Why did the API go to therapy?","Too many unresolved requests.","APIs let programs communicate through requests and responses."],
    ["🧠","Why was the array organized?","It knew its indexes.","Indexes identify positions inside an array."],
    ["🔢","What did one bit say to the other?","Nice to byte you.","A byte is commonly made from eight bits."],
    ["💾","Why did the developer use Git?","They wanted fewer plot twists.","Version control lets you see how a codebase changed over time."],
    ["🌿","Why was the bug embarrassed?","It was caught in production.","Production is the live environment users actually access."],
    ["🚨","Why did the React component feel calm?","It had good state management.","State is data that can affect what a component renders."],
    ["⚛️","Why did the server get promoted?","It handled every request.","Servers receive requests and return data or perform actions."],
    ["🖥️","Why did the programmer use GitHub?","They wanted receipts.","A public repository can make your learning work visible."],
    ["🧾","Why did the UI become code?","It wanted its pixels to do something.","Frontend code turns designs into interactive browser experiences."],
    ["✨","Why did the code pass the interview?","It had strong fundamentals.","Small consistent builds compound into stronger fundamentals."],
    ["🎯","Why did the API bring a map?","It needed a good route.","Routes tell an app where a request should go."],
    ["🚀","Why did the developer ship early?","Finished beats perfect.","Small finished builds create feedback and momentum."],
    ["🗺️","Why did the variable feel confident?","It knew its value.","Variables give names to values your program needs to use."],
  ];
function BeatPlayer(){
  const [playing,setPlaying]=useState(false);
  const [muted,setMuted]=useState(()=>{try{return localStorage.getItem("abtalks-keyboard-muted")==="1"}catch(e){return false}});
  const ctx=useRef(null),timer=useRef(null),step=useRef(0);
  const stop=()=>{if(timer.current)clearInterval(timer.current);timer.current=null;if(ctx.current){ctx.current.close().catch(()=>{});ctx.current=null}setPlaying(false)};
  const toggleMute=()=>{setMuted(v=>{const next=!v;try{localStorage.setItem("abtalks-keyboard-muted",next?"1":"0")}catch(e){};if(next)stop();return next})};
  const clack=()=>{
    const c=ctx.current;if(!c)return;
    const now=c.currentTime;
    const b=c.createBuffer(1,Math.floor(c.sampleRate*.035),c.sampleRate),d=b.getChannelData(0);
    for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length);
    const src=c.createBufferSource(),filter=c.createBiquadFilter(),gain=c.createGain();
    src.buffer=b;filter.type="bandpass";filter.frequency.value=2300+(step.current%3)*420;filter.Q.value=1.1;
    gain.gain.value=.16;src.connect(filter);filter.connect(gain);gain.connect(c.destination);src.start(now);
  };
  const start=async()=>{
    if(muted)return;
    try{
      const C=window.AudioContext||window.webkitAudioContext;if(!C)return;
      stop();const c=new C();await c.resume();ctx.current=c;step.current=0;
      const play=()=>{clack();step.current++;if(step.current%4===0){setTimeout(clack,70)}};
      play();timer.current=setInterval(play,185);setPlaying(true);
    }catch(e){setPlaying(false)}
  };
  return <div className="beat-controls">
    <button type="button" className={`beat-button ${playing?"playing":""}`} onClick={playing?stop:start} aria-label={playing?"Stop keyboard beats":"Play keyboard beats"}>
      {playing?<Volume2 size={15}/>:<Keyboard size={15}/>}<span>{playing?"Keyboard on":"Play keyboard beats"}</span><i className="beat-bars"><b/><b/><b/><b/></i>
    </button>
    <button type="button" className="sound-toggle" onClick={toggleMute} aria-label={muted?"Unmute keyboard audio":"Mute keyboard audio"}>
      {muted?<VolumeX size={15}/>:<Volume2 size={15}/>}<span>{muted?"Unmute":"Mute"}</span>
    </button>
  </div>
}

function JokePopover({onClose}){const [index,setIndex]=useState(0);const next=()=>{setIndex(i=>(i+1)%jokes.length);navigator.vibrate?.(12)};const joke=jokes[index];return <div className="joke-popover"><div className="joke-popover-head"><span><Sparkles size={15}/> DAILY CODE CHECK-IN</span><button onClick={onClose}><X size={16}/></button></div><div className="joke-emoji">{joke[0]}</div><h3>{joke[1]}</h3><strong>{joke[2]}</strong><p><Lightbulb size={14}/>{joke[3]}</p><button className="another-joke" onClick={next}>Another joke <RefreshCw size={14}/></button></div>}
function Landing(){const [joke,setJoke]=useState(false);return <main className="landing dark-landing"><div className="landing-orb orb-a"/><div className="landing-orb orb-b"/><div className="landing-orb orb-c"/><header className="landing-header"><Logo/><div className="landing-head-actions"><BeatPlayer/><button className="joke-trigger" onClick={()=>{setJoke(true);navigator.vibrate?.(12)}}><Sparkles size={15}/> Need a joke?</button><a href="/dashboard">Student demo <ArrowRight size={14}/></a></div></header><section className="hero hero-new"><div className="hero-copy"><div className="hero-kicker"><span className="live-dot"/> A daily coding challenge for college students</div><h1>Build proof of<br/><em>what you can do.</em></h1><p>ABTalks is a 60-day build-in-public challenge for Indian college students. Choose a track, build something every day, and leave a public receipt of your work.</p><div className="hero-actions"><Button href="/dashboard">See the student experience <ArrowRight size={17}/></Button><a className="text-link" href="#how">How it works <ChevronDown size={15}/></a></div></div><div className="hero-visual"><a href="/dashboard#tracks" className="hero-note note-pink"><span>01</span><strong>CHOOSE</strong><small>Pick a track →</small></a><a href="/day/12" className="hero-note note-blue"><span>02</span><strong>BUILD</strong><small>Open today’s task →</small></a><a href="/day/12#proof" className="hero-note note-lime"><span>03</span><strong>PROVE</strong><small>Submit proof →</small></a><div className="hero-streak"><Flame size={18}/><strong>11</strong><span>day streak</span></div></div></section><section id="how" className="landing-explain"><div className="explain-intro"><span className="section-kicker">HOW ABTALKS WORKS</span><h2>Small build. Public proof. Repeat.</h2><p>Every day gives you a focused coding task. Build it, push your work to GitHub, share the learning on LinkedIn, and keep your streak moving.</p></div><div className="explain-grid"><article><b>01</b><Code2/><h3>Pick a track</h3><p>Choose the kind of work you want to get better at.</p></article><article><b>02</b><Clock3/><h3>Build today</h3><p>Spend roughly 45 minutes shipping something tangible.</p></article><article><b>03</b><Github/><h3>Leave proof</h3><p>Your commit and post become a public record of progress.</p></article><article><b>04</b><TrendingUp/><h3>Compound it</h3><p>After 60 days, you have work you can show recruiters.</p></article></div></section><section className="landing-proof"><div><span className="section-kicker">WHY IT MATTERS</span><h2>Consistency becomes visible.</h2><p>ABTalks turns “I’m learning to code” into something you can actually show: shipped projects, commits, reflections, and a streak that tells the story.</p></div><div className="proof-stack"><div><strong>1,240</strong><span>students shipping today</span></div><div><strong>18.4k</strong><span>public proof receipts</span></div><div><strong>60</strong><span>days of practice</span></div></div></section><section className="landing-final"><span className="section-kicker">READY WHEN YOU ARE</span><h2>Your first day can be small.</h2><p>You don't need a perfect idea. You need one finished thing — then another tomorrow.</p><Button href="/dashboard">Explore ABTalks <ArrowRight size={17}/></Button></section>{joke&&<JokePopover onClose={()=>setJoke(false)}/>}</main>}

function StreakCelebration() {
  const fires = Array.from({length: 11}, (_, i) => i);
  return <div className="streak-page-celebration" aria-label="11 day streak">
    <div className="streak-page-confetti" aria-hidden="true">
      {Array.from({length:42},(_,i)=><i key={i} style={{"--i":i}}>{["✦","•","🔥","✧","< />","+" ][i%6]}</i>)}
    </div>
    <div className="streak-fire-row">
      {fires.map(i => <span key={i} style={{"--i": i}}>🔥</span>)}
    </div>
    <div className="streak-celebration-copy">
      <span>STREAK CHECK-IN</span>
      <strong>11 DAYS. YOU'RE ON FIRE.</strong>
      <small>You've shipped 11 days in a row. Keep the streak alive.</small>
    </div>
  </div>;
}

function Dashboard(){const [toast,setToast]=useState("");const [freeze,setFreeze]=useState(false);const [share,setShare]=useState(false);const notify=m=>{setToast(m);setTimeout(()=>setToast(""),2000)};return <main className="app-shell dark-app student-experience student-orange-red"><Header/><StreakCelebration/><div className="dashboard-content"><section className="profile-nudge-top"><div className="nudge-icon"><UserRound size={17}/></div><div><strong>Get noticed faster</strong><p>Add your target job role — profile is 80% complete.</p></div><ChevronRight size={17}/></section><section className="welcome"><div><p className="eyebrow">THURSDAY · DAY 12</p><h1>Good evening, builder.</h1><p>One more small win before you call it a night.</p></div><ProgressRing value={18}/></section><section className="activity-ticker"><div className="ticker-dot"/><div className="ticker-track"><span>🔥 Rahul S. just completed Day 12!</span><span>⚡ 1,240 students shipped today</span><span>🚀 Priya K. hit a 14-day streak</span></div></section><section className="streak-card"><div className="streak-copy"><div className="streak-number"><Flame size={22}/> 11</div><span>day streak</span><p>Best so far. Keep the chain alive.</p></div><div className="mini-calendar">{Array.from({length:7},(_,i)=><span key={i} className={i<6?"done":i===6?"today":""}>{i<6?<Check size={11}/>:i===6?"12":"·"}</span>)}</div></section><section className="streak-tools"><button onClick={()=>setFreeze(true)}><LockKeyhole size={15}/><span><strong>1 streak freeze</strong><small>Available for a rough day</small></span><ChevronRight size={15}/></button><button onClick={()=>notify("Recovery is available after a missed day.")}><Heart size={15}/><span><strong>Recovery option</strong><small>Missed a day? Restart gently.</small></span><ChevronRight size={15}/></button></section><section className="today-card"><div className="card-label"><span>UP NEXT</span><span>~45 MIN</span></div><h2>{challenge.task.title}</h2><p>{challenge.task.intro}</p><Button href="/day/12">Open today's task <ArrowRight size={17}/></Button></section><section className="stats-row"><div><span>CHALLENGE</span><strong>18 / 60</strong><small>days completed</small></div><div><span>PROOF</span><strong>22</strong><small>receipts shipped</small></div></section><section className="standing"><div className="section-heading"><div><span className="section-kicker">YOUR SIGNAL</span><h2>Showing up is a skill.</h2></div><Trophy size={20}/></div><div className="achievement"><div className="badge"><Flame size={21}/></div><div><strong>Consistency Rookie</strong><p>10+ consecutive days</p></div><Check size={18}/></div><div className="standing-row"><span>Your standing</span><strong>Top 18%</strong><span className="up">↑ 6% this week</span></div><div className="milestone-badges"><div className="milestone unlocked" title="Requirement: 7 consecutive days"><span>🔥</span><strong>Week 1 Survivor</strong><small>Unlocked</small></div><div className="milestone" title="Requirement: complete 30 days"><span>½</span><strong>Halfway Hero</strong><small>30 days</small></div><div className="milestone" title="Requirement: reach a 30-day streak"><span>⚡</span><strong>Streak Master</strong><small>30 streak</small></div></div></section><section className="share-progress"><div className="section-heading"><div><span className="section-kicker">SHARE YOUR PROGRESS</span><h2>Make the streak visible.</h2></div><Sparkles size={18}/></div><div className="share-card"><div className="share-brand"><Logo/><span>60 DAY RUN</span></div><div className="share-main"><span>DAY 12</span><strong>11</strong><small>day streak</small></div><div className="share-footer"><span>Building in public.</span><span>ABTalks</span></div></div><button className="share-button" onClick={()=>setShare(true)}><Send size={15}/> Share progress card</button></section><section className="edge-banner"><div className="edge-symbol">↺</div><div><strong>Missed a day?</strong><p>Your progress stays. Your streak can recover.</p></div><a href="/day/12">Restart <ArrowRight size={14}/></a></section></div>{freeze&&<div className="modal-backdrop" onClick={()=>setFreeze(false)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setFreeze(false)}><X size={18}/></button><div className="modal-icon"><LockKeyhole size={22}/></div><span className="section-kicker">STREAK FREEZE</span><h2>Protect one future day.</h2><p>You have one freeze. Use it when college, exams, or life gets in the way.</p><Button onClick={()=>{setFreeze(false);notify("Streak freeze saved for later.")}}>Keep my freeze</Button></div></div>}{share&&<div className="modal-backdrop" onClick={()=>setShare(false)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setShare(false)}><X size={18}/></button><span className="section-kicker">YOUR SHARE CARD</span><h2>Proof that you showed up.</h2><div className="share-card"><div className="share-brand"><Logo/><span>60 DAY RUN</span></div><div className="share-main"><span>DAY 12</span><strong>11</strong><small>day streak</small></div><div className="share-footer"><span>Building in public.</span><span>ABTalks</span></div></div><Button onClick={()=>notify("Share sheet opened — mock action.")}><Send size={15}/> Share</Button></div></div>}{toast&&<div className="toast"><Check size={16}/> {toast}</div>}<BottomNav active="home"/></main>}
function BuilderProfile() {
  return <main className="builder-profile dark-landing">
    <header className="landing-header"><Logo/><div className="landing-head-actions"><a href="/dashboard">← Dashboard</a></div></header>
    <section className="profile-hero">
      <div className="profile-avatar">T</div><div className="profile-kicker">BUILDER PROFILE · ABTALKS</div>
      <h1>Twisha <em>Mehta.</em></h1><p>Frontend builder documenting 60 days of shipping, learning, and public proof.</p>
      <div className="profile-tags"><span>React</span><span>JavaScript</span><span>UI</span><span>Build in public</span></div>
    </section>
    <section className="profile-grid">
      <article className="profile-card profile-stat"><span>STREAK</span><strong>11 🔥</strong><small>days in a row</small></article>
      <article className="profile-card profile-stat"><span>PROGRESS</span><strong>12 / 60</strong><small>challenge days</small></article>
      <article className="profile-card profile-stat"><span>STANDING</span><strong>Top 18%</strong><small>among active builders</small></article>
      <article className="profile-card profile-project"><span className="section-kicker">LATEST PROOF</span><h2>Day 12 · API endpoint</h2><p>Shipped a small endpoint and documented the learning publicly.</p><div className="profile-proof"><b>+142</b><span>lines added</span><b>-12</b><span>lines changed</span></div></article>
    </section>
  </main>;
}

function Confetti(){const symbols=["</>","{}","=>","[]","&&","//","01","()",";","<>"];return <div className="confetti code-confetti" aria-hidden="true">{Array.from({length:120},(_,i)=><i key={i} style={{"--x":`${(i*31)%100}%`,"--delay":`${(i%14)*35}ms`}}>{symbols[i%symbols.length]}</i>)}</div>}
function DayPage(){const [repo,setRepo]=useState("");const [commit,setCommit]=useState("");const [linkedin,setLinkedin]=useState("");const [deployed,setDeployed]=useState("");const [submitted,setSubmitted]=useState(false);const [confetti,setConfetti]=useState(false);const [toast,setToast]=useState("");const [sound,setSound]=useState(false);const notify=m=>{setToast(m);setTimeout(()=>setToast(""),2200)};const validGithub=/^https?:\/\/(www\.)?github\.com\/[^/]+\/[^/?#]+(?:\/.*)?$/i.test(repo);const validCommit=/^https?:\/\/(www\.)?github\.com\/[^/]+\/[^/]+\/commit\/[a-z0-9]+/i.test(commit);const validLinkedin=/^https?:\/\/(www\.)?linkedin\.com\/(?:posts|feed\/update)\/.+/i.test(linkedin);const ready=validGithub&&validCommit&&validLinkedin;const submit=()=>{if(!ready){notify("Use valid GitHub + LinkedIn links first.");return}setSubmitted(true);setConfetti(true);navigator.vibrate?.([18,35,18]);if(sound){try{const C=window.AudioContext||window.webkitAudioContext;const c=new C();const o=c.createOscillator();const g=c.createGain();o.frequency.value=740;g.gain.value=.035;o.connect(g);g.connect(o.context.destination);o.start();o.stop(o.context.currentTime+.18)}catch(e){}}setTimeout(()=>setConfetti(false),3000)};const copyStarter=()=>{navigator.clipboard?.writeText(`Day 12 starter brief: ${challenge.task.title}\n\n${challenge.task.goal}\n\n${challenge.task.deliverables.map(x=>"- "+x).join("\n")}`);notify("Starter template copied!");navigator.vibrate?.(12)};return <main className="app-shell dark-app day-shell student-experience student-orange-red"><header className="app-header day-header"><a href="/dashboard" className="back-link">←</a><div className="day-title"><span>DAY 12</span><strong>Build & prove</strong></div><div className="day-header-actions"><button className={`sound-toggle ${sound?"on":""}`} onClick={()=>setSound(!sound)}>{sound?<Volume2 size={15}/>:<VolumeX size={15}/>}</button><div className="day-chip"><Flame size={14}/> 11</div></div></header><div className="day-content"><div className="day-progress"><span>12 / 60</span><div><i style={{width:"20%"}}/></div><span>20%</span></div><article className="task-hero"><div className="task-tag"><Code2 size={14}/> FRONTEND</div><h1>{challenge.task.title}</h1><p>{challenge.task.intro}</p><div className="challenge-meta"><span>⏱ ~45 mins</span><span>🏷 React / Tailwind</span><span>🎯 Intermediate</span></div><button className="copy-starter" onClick={copyStarter}><Copy size={15}/> Copy starter template</button></article><section className="task-section"><div className="section-kicker">WHAT TO BUILD</div><h2>Turn an annoyance into a tiny product.</h2><p>{challenge.task.goal}</p><ul>{challenge.task.deliverables.map(x=><li key={x}><Check size={16}/>{x}</li>)}</ul><div className="stretch"><Sparkles size={16}/><div><strong>Optional stretch</strong><p>{challenge.task.stretch}</p></div></div></section><section id="proof" className="proof-section"><div className="section-kicker">LEAVE YOUR RECEIPTS</div><h2>Show that you shipped.</h2><p className="section-intro">Enter public links and see a preview before you submit.</p><LinkField label="GitHub repository" icon={<Github size={17}/>} placeholder="github.com/you/project" value={repo} onChange={setRepo}/>{repo&&validGithub?<div className="github-diff-card"><div className="commit-top"><Github size={16}/><span>LATEST COMMIT · JUST NOW</span><b>+142 / -12</b></div><strong>feat: completed day 12 API endpoint</strong><p>twisha-mehta · main · 2 min ago</p><div className="diff-bar"><i/><i/></div></div>:repo?<div className="field-error">Use a public github.com repository URL.</div>:null}<LinkField label="Commit URL" icon={<Github size={17}/>} placeholder="github.com/.../commit/..." value={commit} onChange={setCommit}/>{commit&&!validCommit&&<div className="field-error">Paste a github.com/.../commit/... URL.</div>}<LinkField label="Live deployment URL" icon={<Rocket size={17}/>} placeholder="your-project.vercel.app" value={deployed} onChange={setDeployed} required={false}/><LinkField label="LinkedIn post" icon={<Linkedin size={17}/>} placeholder="linkedin.com/posts/..." value={linkedin} onChange={setLinkedin}/>{linkedin&&validLinkedin?<div className="linkedin-skeleton"><div className="li-head"><div className="avatar">T</div><div><strong>Student builder</strong><span>Student · just now</span></div><Linkedin size={15}/></div><p>Day 12 shipped 🚀 Built a small API endpoint, learned something new, and left the receipt on GitHub.</p><div className="li-footer"><span>♡ 18</span><span>↗ Repost</span><span>💬 4</span></div></div>:linkedin?<div className="field-error">Use a public linkedin.com post URL.</div>:null}</section><section className={`submission-card ${submitted?"success":""}`}>{submitted?<><div className="success-icon"><Check size={25}/></div><div><strong>Day 12 is in the bag.</strong><p>Your streak is safe. See you tomorrow.</p></div><span className="day-chip">12 🔥</span></>:<><div><div className="submit-count">{[validGithub,validCommit,validLinkedin].filter(Boolean).length}/3</div><strong>Ready to submit?</strong><p>GitHub repo, commit, and LinkedIn post are required.</p></div><Button onClick={submit} className={!ready?"disabled":""}><Send size={16}/> Submit day 12</Button></>}</section><div className="edge-note"><Heart size={14}/> Missed yesterday? Your progress stays even if your streak resets.</div></div>{!submitted&&<div className="sticky-submit"><div><strong>{[validGithub,validCommit,validLinkedin].filter(Boolean).length}/3 valid proof links</strong><span>{ready?"Ready to submit":"Add valid GitHub + LinkedIn links"}</span></div><Button onClick={submit} className={!ready?"disabled":""}><Send size={15}/> Submit</Button></div>}{confetti&&<Confetti/>}{toast&&<div className="toast"><Check size={16}/> {toast}</div>}<BottomNav active="day"/></main>}
function App(){const path=window.location.pathname.replace(/\/+$/,"")||"/";if(path==="/dashboard")return <Dashboard/>
  if (path === "/builder/twisha") return <BuilderProfile />;if(path==="/day/12")return <DayPage/>;return <Landing/>}

createRoot(document.getElementById("root")).render(<App/>);

// Valentino, Anoushka's grey tabby, answers questions about Anoushka, her work and himself.
// Scripted for now: `answer()` matches keywords against TOPICS. To switch to a real model later,
// make `answer()` call a server endpoint and keep the same return shape ({ html, chips }).
(() => {
  const R = document.body.dataset.root || "";
  const link = (href, text) => {
    const ext = href.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${href.startsWith("http") ? href : R + href}"${ext}>${text}</a>`;
  };
  const CAL = "https://calendly.com/noushka-umich/30min";
  const LINKEDIN = "https://www.linkedin.com/in/anoushkaghosh/";
  const EMAIL = "mailto:noushka@umich.edu";
  const GITHUB = "https://github.com/ghoshanoushka";
  const BEHANCE = "https://www.behance.net/Anoushka-Ghosh";
  const RESUME = "https://drive.google.com/file/d/1x3pUb8lTMzYpkzIJ6nRIZ6F23U4mlWyp/view";

  const START = ["What does Anoushka do?", "Which project should I see first?", "Is she open to work?", "Who are you?"];
  const CAT = ["What are you like?", "Who's Ollie?", "What does Anoushka do?"];

  // Checked in order; the first topic with a matching keyword answers. Keys under 4 letters match whole words only.
  // Valentino talks about Anoushka, her work and himself. Answers are her own words, lightly edited.
  const TOPICS = [
    // ---------- Work ----------
    {
      keys: ["deploy chat", "deploychat", "chatbot", "chat product", "inference", "llm"],
      html: "With the rebrand, Deploy pivoted to being an inference company that hosts open-source LLMs. Deploy Chat is the obvious next big step, and she's designing it right now. It isn't public yet, so that's all I can say.",
      chips: ["What about the design system?", "Is she open to work?"],
    },
    {
      keys: ["hardest", "difficult", "challeng", "toughest", "hard problem", "complex problem"],
      html: `The Mensio wizard flow. Even the team didn't know how to make the tool work efficiently, so she used every tool and method she could to understand the product and what it could do. Then she streamlined it so customers could pull their own data without reaching out to the analyst team. ${link("projects/mensio.html", "Read the case study")}.`,
      chips: ["What is she proudest of?", "What's her design process?"],
    },
    {
      keys: ["proud", "favorite project", "favourite project", "best project"],
      html: `Mensio. Customers relied on analysts to pull their data, and even the team wasn't sure how the tool should work. She turned it into a guided flow customers can use on their own, and it shipped in 2026. ${link("projects/mensio.html", "Read the case study")}.`,
      chips: ["What was the hardest problem?", "Which project should I see first?"],
    },
    {
      keys: ["mensio", "data explorer", "analytics", "dashboard"],
      html: `Mensio is sponsorship and ad intelligence for brands, teams and networks. Customers didn't trust themselves to pull data, so they emailed analysts instead. She redesigned the Data Explorer so they can build it themselves. ${link("projects/mensio.html", "Read the case study")}.`,
      chips: ["What about the design system?", "Is she open to work?"],
    },
    {
      keys: ["design system", "hive", "rebrand", "landing", "component", "token"],
      html: `When Hive rebranded as Deploy in October 2026, Anoushka and the design team rebuilt the design system for the new brand. One system serves both the Portal and the marketing site: the color tokens are shared, and product and marketing each get their own type scale. She worked with frontend engineers through handoff. ${link("projects/deploy-design-system.html", "Read the case study")}.`,
      chips: ["What about Mensio?", "How do I get in touch?"],
    },
    {
      keys: ["denial", "claim", "capstone", "revenue cycle", "healthcare"],
      html: `For her University of Michigan capstone, Anoushka and three teammates redesigned a claim denials platform for a healthcare revenue cycle company, so teams get from an alert to a fix faster. They interviewed users, ran usability tests, redesigned four workflows and wrote an 18-month implementation plan. ${link("projects/denials.html", "Read the case study")}.`,
      chips: ["What are her fun projects?", "How do I get in touch?"],
    },
    {
      keys: ["ctrl z", "ctrlz", "ctrl-z", "converge", "anti-algorithm"],
      html: `ctrl z is an anti-algorithm app: real people, not a feed, plan your day, and you see it one surprise card at a time. Her team of five designed it in 2½ hours at Converge '25 and won 1st place. She designed the swipe and owned how the app works. ${link("projects/ctrlz.html", "See ctrl z")}.`,
      chips: ["What about Bumpy AI?", "What about Coverflow?"],
    },
    {
      keys: ["bumpy", "pregnan", "ross", "tech jam", "innovation jam"],
      html: `Bumpy AI is an AI tab for a pregnancy app: ask a question and the answer turns into a plan. It's from the Michigan Ross Business+Tech Innovation Jam. She was the only designer on a team of four, so she did the flows, brand, screens and prototype. ${link("projects/bumpy.html", "See Bumpy AI")}.`,
      chips: ["What about ctrl z?", "What about Somnia?"],
    },
    {
      keys: ["somnia", "sleep", "bedtime", "garden", "consumer health"],
      html: `Somnia is a sleep app that helps college students keep a steady bedtime. It's from a Consumer Health Technologies class at UMSI. She led the brainstorming and designed the de-stressing activities, their interactions and the garden that rewards them. ${link("projects/somnia.html", "See Somnia")}.`,
      chips: ["What about ctrl z?", "What about Coverflow?"],
    },
    {
      keys: ["coverflow", "cover flow", "vision pro", "visionos", "apple music", "product management", "f1", "formula"],
      html: `Coverflow brings Coverflow back to Apple Music on Vision Pro: your albums stand in a row in your room, and playing the Formula 1 theme turns the room into the track. She made it for Intro to Product Management at UMSI, the first time she tried a Vision Pro. ${link("projects/coverflow.html", "See Coverflow")}.`,
      chips: ["What about Somnia?", "What are her fun projects?"],
    },
    {
      keys: ["fun project", "side project", "hackathon", "jam", "class project", "concept"],
      html: `Four, from design jams and class: ${link("projects/ctrlz.html", "ctrl z")} won 1st place at Converge '25, ${link("projects/bumpy.html", "Bumpy AI")} is an AI helper for a pregnancy app, ${link("projects/somnia.html", "Somnia")} is a sleep app that grows a garden, and ${link("projects/coverflow.html", "Coverflow")} brings Coverflow to Apple Music on Vision Pro. ${link("fun.html", "See the Fun page")}.`,
      chips: ["What about ctrl z?", "What about Coverflow?", "What does she do for fun?"],
    },
    {
      keys: ["project", "case stud", "see first", "start", "best work", "portfolio"],
      html: `Start with ${link("projects/mensio.html", "Mensio")}. It shows her research, product design and acting as PM on one project. Then see the ${link("projects/deploy-design-system.html", "Deploy Design System")} for systems and visual design, and ${link("projects/denials.html", "Claim Denials")} for research-led healthcare work. Her side projects are on the ${link("fun.html", "Fun page")}.`,
      chips: ["What about Mensio?", "What about Claim Denials?", "What are her fun projects?"],
    },
    {
      keys: ["freelance", "contract", "part-time", "part time", "side gig", "consult"],
      html: `She's only looking for full-time roles right now, so no freelance or contract work. ${link(CAL, "Book a chat")} if you have a full-time role in mind.`,
      chips: ["What kind of role is she looking for?", "How do I get in touch?"],
    },
    {
      keys: ["open to", "hire", "hiring", "job", "role", "available", "opportunit", "looking", "design engineer", "full-time", "full time", "remote", "relocat"],
      html: `Yes, she's open to full-time roles. She'd love a design engineer kind of role, where she can use AI to design faster and more accurately. ${link(CAL, "Book a chat")} or reach out to her on ${link(LINKEDIN, "LinkedIn")}.`,
      chips: ["Where has she worked?", "What tools does she use?"],
    },
    {
      keys: ["contact", "reach", "email", "mail", "touch", "talk", "call her", "a call", "call with", "meet", "linkedin", "calendly", "behance", "social", "profile"],
      html: `${link(CAL, "Book a 30-minute chat")}, ${link(EMAIL, "email her")} or message her on ${link(LINKEDIN, "LinkedIn")}. Her code is on ${link(GITHUB, "GitHub")} and older visual work is on ${link(BEHANCE, "Behance")}.`,
      chips: ["Is she open to work?"],
    },
    {
      keys: ["tool", "figma", "code", "coding", "github", "ai", "claude", "prototyp", "software", "stack", "develop"],
      html: `Figma for design and prototyping, and code for the rest. She builds and prototypes with AI tools like Claude Code, and this site was made that way. Her code is on ${link(GITHUB, "GitHub")}.`,
      chips: ["What kind of role is she looking for?", "What's her design process?"],
    },
    {
      keys: ["engineer", "pm", "product manager", "collaborat", "work with", "teamwork", "team player", "cross-functional", "stakeholder"],
      html: "She brings PMs and engineers in early: rough flows get walked through before they're polished, and every state is written down before handoff. On Mensio she also stepped in as PM, and she does design QA with engineers before anything ships.",
      chips: ["What's her design process?", "What tools does she use?"],
    },
    {
      keys: ["process", "approach", "how does she design", "how she design", "method", "how does she work"],
      html: "Understand first, then design. She talks to users and the people who know the product best, maps how it really works, then designs in small steps and tests until the flow feels obvious.",
      chips: ["What was the hardest problem?", "How does she work with PMs and engineers?"],
    },

    // ---------- Anoushka ----------
    {
      keys: ["for fun", "hobb", "free time", "spare time", "outside work", "outside of work", "weekend", "personal", "enjoy", "pastime", "fun"],
      html: "Lately she's been building a lot with Claude (token maxing, she calls it). Otherwise she's watching TV, cooking, or taking me and my brother Ollie out on walks.",
      chips: ["What's her favourite food?", "Who's Ollie?"],
    },
    {
      keys: ["food", "eat", "cook", "spice", "spicy", "cuisine", "dish"],
      html: "Anything Indian, or anything that can match its level of spice and flavour. She cooks a lot too.",
      chips: ["Where is she from?", "What does she do for fun?"],
    },
    {
      keys: ["from", "kolkata", "calcutta", "india", "grow up", "grew up", "hometown", " live", " lives", "based", "located", "san francisco", "sf"],
      html: "She's from Kolkata, the City of Joy, in India. She moved to the US in 2024 for her master's and now lives in San Francisco.",
      chips: ["What did she study?", "What does she do for fun?"],
    },
    {
      keys: ["study", "studied", "degree", "school", "master", "university", "umich", "umsi", "ann arbor", "go to michigan", "at michigan", "university of michigan", "education", "college", "undergrad", "hci", "fashion", "graduat"],
      html: "She studied fashion technology for her undergrad, then did her MS in HCI at the University of Michigan in Ann Arbor. Go Blue!",
      chips: ["How did she get into design?", "Where has she worked?"],
    },
    {
      keys: ["into design", "why design", "why does she design", "become a designer", "became a designer", "motivat", "inspir", "passion"],
      html: "She's always been passionate about designing for a cause. She wants to give something back to the world, creatively.",
      chips: ["What's her design process?", "What did she study?"],
    },
    {
      keys: ["experience", "worked", "work before", "where", "companies", "career", "work history", "previous", "background", "resume", "cv", "intern", "michigan daily", "entrupy", "inext", "pawsncare"],
      html: `Anoushka is a UX/UI designer at Deploy, after interning there in 2025, when it was still Hive. Before that, she was a product designer at The Michigan Daily, an authentication specialist at Entrupy, a graphic designer at inext and designed social media for Pawsncare. ${link(RESUME, "See her resume")}.`,
      chips: ["What does Anoushka do?", "How do I get in touch?"],
    },
    {
      keys: ["skill", "good at", "strength", "speciali", "focus", "care about", "accessib"],
      html: "Anoushka covers user research, product design, design systems and visual design, plus design QA with engineers. She cares most about accessibility and inclusive design, and likes untangling complex dashboards and workflows.",
      chips: ["Which project should I see first?", "What tools does she use?"],
    },

    // ---------- Valentino and Ollie ----------
    {
      keys: ["ollie", "brother", "sibling", "other cat", "orange cat", "two cats"],
      html: "Ollie is my brother. He's from India and flew all the way here! We're bonded, but between us, I don't mind when he's not around. He doesn't respect my space, and when he grooms me he chews my whiskers off.",
      chips: ["What are you like?", "What does Anoushka do for fun?"],
    },
    {
      keys: ["are you real", "you real", "real cat", "real valentino", "are you a cat", "your photo", "photo of you", "picture of you", "what do you look like"],
      html: `Yes, I'm real. I'm Anoushka's grey tabby. There's a photo of us on her ${link("about.html", "About page")}.`,
      chips: CAT,
    },
    {
      keys: ["your name", "named", "called", "how old", "age", "birthday", "adopt", "rescue", "valentine", "who are you", "about you", "yourself", "tino"],
      html: "I'm Valentino, Anoushka's grey tabby, and I turned 2 this year. She adopted me from a rescue in Ann Arbor. I came with the name, and since she picked me up on Valentine's Day, she kept it.",
      chips: CAT,
    },
    {
      keys: ["you like", "what are you like", "personality", "lazy", "clingy", "toy", "treat", "fetch", "climb", "favorite thing", "favourite thing", "good boy"],
      html: "I'm the goodest boy. More dog than cat, honestly: loyal, clingy and very protective of her. I love crunchy treats, my little raccoon toy and chasing a string, and I fetch. My favourite thing is climbing trees whenever we go to the park.",
      chips: ["Who's Ollie?", "What does Anoushka do?"],
    },

    {
      keys: ["what does", "what do", "who is", "who's", "tell me about anoushka", "designer", "job title", "title"],
      html: "Anoushka is a UX/UI designer at Deploy in San Francisco, where she works on the product and its design system. She focuses on thoughtful, scalable products from 0–1 and beyond.",
      chips: ["Which project should I see first?", "Where has she worked?"],
    },
  ];

  const OFF_TOPIC = {
    html: "I only know about Anoushka, her work and me. Try asking about her projects, where she's worked or how to get in touch.",
    chips: START,
  };

  async function answer(q) {
    const s = ` ${q.toLowerCase()} `;
    const hit = TOPICS.find((t) => t.keys.some((k) => (k.length < 4 ? new RegExp(`\\b${k}\\b`).test(s) : s.includes(k))));
    return hit || OFF_TOPIC;
  }

  // Valentino, the grey tabby, sits in the corner on his own. Ollie's drawing is kept below but isn't shown.
  // Colours come from Anoushka's photos in media/reference.
  const PINK = "#F2A7A0";
  const VAL = { x: 103, body: "#8E8983", dark: "#625D58", chest: "#C4BDB4", muzzle: "#DDD6CC", paw: "#B3ACA4", eye: "#E3A73E" };
  const OLLIE = { x: 151, body: "#E6A15C", dark: "#CF8743", chest: "#FBF6EE", muzzle: "#FBF6EE", paw: "#FBF6EE", eye: "#D6D27C" };

  // Big, low-set eyes with two sparkles each read as cute.
  const pupils = (c, derp) => derp
    // Ollie: smaller pupils pointing in slightly different directions. Zero brain cells.
    ? `<ellipse cx="-6.2" cy="52.4" rx="2.1" ry="2.9" fill="#22252A"/><ellipse cx="7.6" cy="51.2" rx="2.1" ry="2.9" fill="#22252A"/>
       <circle cx="-5.3" cy="51" r="1" fill="#fff"/><circle cx="8.5" cy="49.8" r="1" fill="#fff"/>`
    : `<ellipse cx="-7" cy="52" rx="3" ry="3.9" fill="#22252A"/><ellipse cx="7" cy="52" rx="3" ry="3.9" fill="#22252A"/>
       <circle cx="-5.7" cy="50.2" r="1.3" fill="#fff"/><circle cx="8.3" cy="50.2" r="1.3" fill="#fff"/>
       <circle cx="-8.2" cy="53.8" r=".6" fill="#fff"/><circle cx="5.8" cy="53.8" r=".6" fill="#fff"/>`;

  const face = (c, ollie) => `
        <path d="M-16.5 46c-2.2-7-1.4-14.6 1.6-18.6 1-1.3 2.6-1.4 3.8-.6 3 2 6 4.8 8.2 7.8zM16.5 46c2.2-7 1.4-14.6-1.6-18.6-1-1.3-2.6-1.4-3.8-.6-3 2-6 4.8-8.2 7.8z" fill="${c.body}"/>
        <path d="M-13.4 40.4c-.5-3.6 0-7 1.2-9 1.8 1.2 3.8 3 5.2 4.8zM13.4 40.4c.5-3.6 0-7-1.2-9-1.8 1.2-3.8 3-5.2 4.8z" fill="${PINK}"/>
        <ellipse cx="0" cy="50.5" rx="18.5" ry="15.2" fill="${c.body}"/>
        ${ollie
          ? `<path d="M-13 59c-1-7 4.4-11 9.6-11.6L-1.2 37h2.4l1.2 10.4C7.6 48 14 52 13 59c-3.8 6.4-22.2 6.4-26 0z" fill="${c.muzzle}"/>`
          : `<ellipse cx="0" cy="59" rx="8.8" ry="5.6" fill="${c.muzzle}"/>
             <path d="M-4.4 37.4l1.2 3.6M0 36.6v4M4.4 37.4l-1.2 3.6M-18 50.6l4 .8M-17.6 54.4l4-.2M18 50.6l-4 .8M17.6 54.4l-4-.2" stroke="${c.dark}" stroke-width="1.5" stroke-linecap="round"/>`}
        <g class="vc-eyes">
          <ellipse cx="-7" cy="51.6" rx="4.6" ry="5.2" fill="${c.eye}"/><ellipse cx="7" cy="51.6" rx="4.6" ry="5.2" fill="${c.eye}"/>
          <g class="vc-pupils">${pupils(c, ollie)}</g>
        </g>
        <ellipse cx="-12.6" cy="58.4" rx="3.4" ry="2" fill="${PINK}" opacity=".7"/><ellipse cx="12.6" cy="58.4" rx="3.4" ry="2" fill="${PINK}" opacity=".7"/>
        <path d="M-1.2 57.2c0-.5.5-.8 1.2-.8s1.2.3 1.2.8-.6 1.1-1.2 1.1-1.2-.6-1.2-1.1z" fill="${PINK}"/>
        ${ollie ? `<path d="M-1 59.6h2v1.4a1 1 0 0 1-2 0z" fill="#E98585"/>` : ""}
        <path d="M0 58.3v.5c-.5 1-1.7 1.2-2.4.5M0 58.8c.5 1 1.7 1.2 2.4.5" fill="none" stroke="#3F4349" stroke-width=".75" stroke-linecap="round"/>`;

  const sitCat = (c, ollie) => `
    <g class="vc-cat" data-cat="${ollie ? "ollie" : "valentino"}" transform="translate(${c.x} 0)">
      <g class="vc-bob">
        <g class="vc-tail">
          <path d="M12 99c7 6 8.5 18 3.5 28-2 4-6.5 4.2-6.5.6" fill="none" stroke="${c.body}" stroke-width="5.5" stroke-linecap="round"/>
          <path d="M12 99c7 6 8.5 18 3.5 28-2 4-6.5 4.2-6.5.6" fill="none" stroke="${ollie ? "#F2BE85" : c.dark}" stroke-width="5.5" stroke-dasharray="3 5.5"/>
        </g>
        <path d="M-19 102c-3-15 4-31 19-33 15 2 22 18 19 33z" fill="${c.body}"/>
        <ellipse cx="0" cy="66" rx="12" ry="7" fill="${c.body}"/>
        ${ollie ? "" : `<path d="M-16.8 81c3.8.4 6 2.4 6.8 4.8M-18 89.6c3.8.4 6 2.4 6.8 4.8M16.8 81c-3.8.4-6 2.4-6.8 4.8M18 89.6c-3.8.4-6 2.4-6.8 4.8" fill="none" stroke="${c.dark}" stroke-width="1.8" stroke-linecap="round"/>`}
        <path d="M-8.6 102c-1.8-12-.6-30 8.6-36 9.2 6 10.4 24 8.6 36z" fill="${c.chest}"/>
        <ellipse cx="-5.6" cy="101.6" rx="4.6" ry="3" fill="${c.paw}"/><ellipse cx="5.6" cy="101.6" rx="4.4" ry="2.9" fill="${c.paw}"/>
        <g class="vc-head"><g transform="translate(0 66) scale(1.1) translate(0 -66)">${face(c, ollie)}</g></g>
        <path d="M-12 57.4l-10.5-1.6M-12 59.6l-9.6 2.6M12 57.4l10.5-1.6M12 59.6l9.6 2.6" stroke="${ollie ? "#B7A28C" : c.dark}" stroke-width=".6" stroke-linecap="round"/>
      </g>
    </g>`;

  const leaf = (x, y, r, s = 1, fill = "#8BAE6A") =>
    `<path class="vc-leaf" d="M0 0c4-5 12-5 15 0-3 5-11 5-15 0z" fill="${fill}" transform="translate(${x} ${y}) rotate(${r}) scale(${s})"/>`;

  // Valentino lying down like a loaf, drawn facing left. He starts asleep, wakes after a few seconds,
  // and now and then bats his yarn ball.
  const LOAF = (c) => `
    <g class="vc-cat" data-cat="valentino">
      <g class="vc-ball"><circle cx="13" cy="79" r="6" fill="#A493E3"/><path d="M8 77q5-3 10 0M8 81q5 3 10 0M11.5 73.6q-2.4 5.4 0 10.8" fill="none" stroke="#7D6BC8" stroke-width=".9" stroke-linecap="round"/></g>
      <g class="vc-tail">
        <path d="M112 78C132 78 138 60 134 48c-3-6-9-4-7 2" fill="none" stroke="${c.body}" stroke-width="6.5" stroke-linecap="round"/>
        <path d="M112 78C132 78 138 60 134 48c-3-6-9-4-7 2" fill="none" stroke="${c.dark}" stroke-width="6.5" stroke-dasharray="3 6"/>
      </g>
      <g class="vc-body">
        <path d="M34 83c-8 0-9-10-1-16 14-9 56-11 78-6 14 4 15 22 1 22z" fill="${c.body}"/>
        <path d="M70 58q3 4 1 9M83 57q3 4 1 9M96 58q3 4 1 9M107 61q2 4 0 8" fill="none" stroke="${c.dark}" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M60 83c2-6 9-9 18-9" fill="none" stroke="${c.dark}" stroke-width="1.2" stroke-linecap="round" opacity=".35"/>
      </g>
      <ellipse class="vc-paw" cx="36" cy="82.4" rx="7.2" ry="3.6" fill="${c.paw}"/>
      <ellipse cx="50" cy="83" rx="7" ry="3.4" fill="${c.paw}"/>
      <g class="vc-head">
        <path d="M30 45L28 27.5 43 38zM47 38l13-10.5L60.5 45z" fill="${c.body}" stroke="${c.body}" stroke-width="3" stroke-linejoin="round"/>
        <path d="M31.4 41.6 30.6 32.4 38.4 38.2zM51.4 38.2l6.4-5.4.2 8.8z" fill="${PINK}"/>
        <ellipse cx="44" cy="51" rx="18" ry="14" fill="${c.body}"/>
        <path d="M40 38.6l1 4.4M44 38v4.6M48 38.6l-1 4.4" stroke="${c.dark}" stroke-width="1.4" stroke-linecap="round"/>
        <ellipse cx="43" cy="57.4" rx="8.4" ry="5.2" fill="${c.muzzle}"/>
        <g class="vc-open">
          <ellipse cx="36.4" cy="50.4" rx="3.8" ry="4.4" fill="${c.eye}"/><ellipse cx="50" cy="50.4" rx="3.8" ry="4.4" fill="${c.eye}"/>
          <g class="vc-pupils"><ellipse cx="36.4" cy="50.8" rx="2.2" ry="3.1" fill="#22252A"/><ellipse cx="50" cy="50.8" rx="2.2" ry="3.1" fill="#22252A"/>
            <circle cx="37.4" cy="49.2" r="1" fill="#fff"/><circle cx="51" cy="49.2" r="1" fill="#fff"/></g>
        </g>
        <path class="vc-closed" d="M32.6 51q3.8 2.8 7.6 0M46.2 51q3.8 2.8 7.6 0" fill="none" stroke="${c.dark}" stroke-width="1.5" stroke-linecap="round"/>
        <ellipse cx="31" cy="56" rx="3" ry="1.8" fill="${PINK}" opacity=".7"/><ellipse cx="56" cy="56" rx="3" ry="1.8" fill="${PINK}" opacity=".7"/>
        <path d="M41.8 55.2c0-.5.5-.8 1.2-.8s1.2.3 1.2.8-.6 1.1-1.2 1.1-1.2-.6-1.2-1.1z" fill="${PINK}"/>
        <path class="vc-smile" d="M43 56.3v.7M39.4 56.3c.6 1.9 2.6 2.4 3.6 1 1 1.4 3 .9 3.6-1" fill="none" stroke="#3F4349" stroke-width=".85" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M35 57.4l-14-2M35 59.4l-13.4 2.6M51 57.4l14-2M51 59.4l13.4 2.6" stroke="${c.dark}" stroke-width=".6" stroke-linecap="round"/>
      </g>
    </g>`;

  // The corner Valentino is Anoushka's own drawings (media/valentino), one per mood: curled up asleep, lying down once
  // he wakes, pouncing on his ball now and then, and sitting up when you hover or chat. The empty .vc-head and
  // .vc-pupils groups keep the hover and pointer code below working.
  const IMG = `${R}media/valentino`;
  const SCENE = `
    <div class="vc-scene vc-drawn" aria-hidden="true">
      <div class="vc-cat" data-cat="valentino">
        <span class="vc-pose vc-curl"><img src="${IMG}/val-curl.webp" alt=""></span>
        <span class="vc-pose vc-loaf"><img src="${IMG}/val-loaf.webp" alt=""><img class="vc-blink" src="${IMG}/val-loaf-blink.webp" alt=""></span>
        <span class="vc-pose vc-sit"><img class="vc-wag" src="${IMG}/val-sit-tail.webp" alt=""><img src="${IMG}/val-sit-body.webp" alt=""><img class="vc-blink" src="${IMG}/val-sit-blink.webp" alt=""></span>
        <span class="vc-ball"></span>
        <span class="vc-head"><span class="vc-pupils"></span></span>
      </div>
    </div>`;

  // The chat header uses Valentino's face.
  const FACE = `<img src="${IMG}/val-face.webp" alt="">`;

  document.body.insertAdjacentHTML(
    "beforeend",
    `<div class="vc-tree">
      ${SCENE}
      <button type="button" class="vc-hit vc-launch" aria-label="Chat with Valentino, Anoushka's cat" aria-expanded="false" aria-controls="vc-panel"></button>
      <span class="vc-z" aria-hidden="true"><i>z</i><i>z</i><i>z</i></span>
      <div class="vc-say vc-say-val" hidden><button type="button" class="vc-say-text">Hi, I'm Valentino. Ask me about Anoushka's work.</button><button type="button" class="vc-x" aria-label="Dismiss">×</button></div>
      <div class="vc-ask" hidden><button type="button" class="vc-ask-text">Ask Valentino</button><button type="button" class="vc-x" aria-label="Hide">×</button></div>
    </div>
    <section class="vc-panel" id="vc-panel" role="dialog" aria-label="Chat with Valentino" hidden>
      <header class="vc-head">
        <span class="vc-avatar">${FACE}</span>
        <div><p class="vc-name">Valentino</p><p class="vc-sub">Anoushka's cat · ask about her or me</p></div>
        <button type="button" class="vc-close" aria-label="Close chat">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </header>
      <div class="vc-log" role="log" aria-live="polite"></div>
      <form class="vc-form">
        <input class="vc-input" type="text" placeholder="Ask Valentino about Anoushka…" aria-label="Your question" maxlength="200" autocomplete="off">
        <button type="submit" class="vc-send" aria-label="Send" disabled>
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </form>
    </section>`
  );

  // On phones Valentino's face in the bottom bar opens the chat instead of the branch.
  const slot = document.querySelector(".dock-cat-slot");
  if (slot) slot.outerHTML = `<button type="button" class="dock-cat" aria-label="Chat with Valentino, Anoushka's cat" aria-expanded="false" aria-controls="vc-panel">${FACE}</button>`;
  const dockCat = document.querySelector(".dock-cat");
  const launch = document.querySelector(".vc-launch");
  const panel = document.querySelector(".vc-panel");
  const log = panel.querySelector(".vc-log");
  const form = panel.querySelector(".vc-form");
  const input = panel.querySelector(".vc-input");
  const send = panel.querySelector(".vc-send");
  let started = false;
  let busy = false;

  const scroll = () => (log.scrollTop = log.scrollHeight);

  function bubble(who, content) {
    const el = document.createElement("div");
    el.className = `vc-msg vc-${who}`;
    if (who === "bot") el.innerHTML = content;
    else el.textContent = content;
    log.append(el);
    scroll();
    return el;
  }

  function chips(list) {
    log.querySelectorAll(".vc-chips").forEach((c) => c.remove());
    if (!list?.length) return;
    const wrap = document.createElement("div");
    wrap.className = "vc-chips";
    list.forEach((q) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "vc-chip";
      b.textContent = q;
      b.addEventListener("click", () => ask(q));
      wrap.append(b);
    });
    log.append(wrap);
    scroll();
  }

  async function ask(q) {
    q = q.trim();
    if (!q || busy) return;
    busy = true;
    chips([]);
    bubble("user", q);
    input.value = "";
    send.disabled = true;
    const typing = bubble("bot", '<span class="vc-dots"><i></i><i></i><i></i></span>');
    const [reply] = await Promise.all([answer(q), new Promise((r) => setTimeout(r, 650))]);
    typing.innerHTML = reply.html;
    chips(reply.chips);
    busy = false;
  }

  function open() {
    tree.classList.add("awake");
    panel.hidden = false;
    tree.classList.add("chatting");
    hideHello();
    askBtn.hidden = true;
    val.classList.remove("is-hover");
    launch.setAttribute("aria-expanded", "true");
    dockCat?.setAttribute("aria-expanded", "true");
    if (!started) {
      started = true;
      bubble("bot", "Hi, I'm Valentino, Anoushka's cat. Ask me about her work, her life outside it, or me.");
      chips(START);
    }
    input.focus();
  }

  function close() {
    panel.hidden = true;
    tree.classList.remove("chatting");
    launch.setAttribute("aria-expanded", "false");
    dockCat?.setAttribute("aria-expanded", "false");
    (dockCat?.offsetParent ? dockCat : launch).focus();
    showAsk();
  }

  const scene = document.querySelector(".vc-scene");
  const tree = document.querySelector(".vc-tree");
  const val = scene.querySelector('[data-cat="valentino"]');
  const valPupils = val.querySelector(".vc-pupils");
  const sayVal = document.querySelector(".vc-say-val");
  const askBtn = document.querySelector(".vc-ask");
  const askText = askBtn.querySelector(".vc-ask-text");
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  // He's mirrored where he sits bottom left, so the pointer's x flips too.
  const mirrored = () => getComputedStyle(scene).scale.startsWith("-1");

  // Once awake, his pupils follow the pointer.
  addEventListener("pointermove", (e) => {
    if (!tree.classList.contains("awake")) return;
    const r = val.querySelector(".vc-head").getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * (mirrored() ? -1 : 1), dy = e.clientY - (r.top + r.height * 0.6);
    const d = Math.hypot(dx, dy) || 1;
    valPupils.style.transform = `translate(${(dx / d) * 1.2}px, ${(dy / d) * 0.8}px)`;
  }, { passive: true });

  // The hello bubble shows once per visit; after that a small "Ask Valentino" label stays above him until it's closed.
  let askOff = false;
  try { askOff = localStorage.getItem("vc-ask-off") === "1"; } catch {}
  const showAsk = () => { askBtn.hidden = askOff || !panel.hidden || !sayVal.hidden; };
  const hideHello = () => { sayVal.hidden = true; try { sessionStorage.setItem("vc-hello", "1"); } catch {} showAsk(); };
  let seen = false;
  try { seen = sessionStorage.getItem("vc-hello") === "1"; } catch {}
  function wake() {
    tree.classList.add("awake");
    setTimeout(() => {
      if (!panel.hidden) return;
      if (seen) return showAsk();
      sayVal.hidden = false;
      setTimeout(hideHello, 7000);
    }, 500);
  }
  setTimeout(wake, still ? 0 : 3000);
  sayVal.querySelector(".vc-say-text").addEventListener("click", open);
  sayVal.querySelector(".vc-x").addEventListener("click", hideHello);
  askText.addEventListener("click", open);
  askBtn.querySelector(".vc-x").addEventListener("click", () => {
    askOff = true;
    try { localStorage.setItem("vc-ask-off", "1"); } catch {}
    showAsk();
  });
  // Mouse only: on a phone, Safari treats a tap that changes the page on hover as just a hover, and never opens the chat
  [launch, askText].forEach((el) => {
    el.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") val.classList.add("is-hover"); });
    el.addEventListener("pointerleave", () => val.classList.remove("is-hover"));
  });

  // Now and then, while nobody's chatting, he bats the ball.
  if (!still) (function play() {
    setTimeout(() => {
      if (tree.classList.contains("awake") && panel.hidden) {
        val.classList.add("play");
        setTimeout(() => val.classList.remove("play"), 1600);
      }
      play();
    }, 9000 + Math.random() * 9000);
  })();

  launch.addEventListener("click", () => (panel.hidden ? open() : close()));
  dockCat?.addEventListener("click", () => (panel.hidden ? open() : close()));
  panel.querySelector(".vc-close").addEventListener("click", close);
  panel.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  input.addEventListener("input", () => (send.disabled = !input.value.trim()));
  form.addEventListener("submit", (e) => { e.preventDefault(); ask(input.value); });
})();

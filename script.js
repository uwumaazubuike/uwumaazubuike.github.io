const sections = document.querySelectorAll('section');
const achievements = document.querySelectorAll('.achievement');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.2 });

sections.forEach(sec => observer.observe(sec));
achievements.forEach(item => observer.observe(item));

// MAKE FUNCTION GLOBAL (THIS IS THE FIX)
window.sendMessage = function () {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  if (!input || !chatBox) {
    console.log("Chatbot elements not found");
    return;
  }

  let text = input.value.trim().toLowerCase();
  if (text === "") return;

  addMessage(text, "user");

  let response = getResponse(text);

  setTimeout(() => {
    addMessage(response, "bot");
  }, 300);

  input.value = "";
};

// ADD MESSAGE
function addMessage(text, sender) {
  const chatBox = document.getElementById("chat-box");

  let msg = document.createElement("div");
  msg.className = "message " + sender;
  msg.textContent = text;

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// RESPONSE LOGIC
function getResponse(input) {
  input = input.toLowerCase();

  // GREETING
  if (input.includes("hello") || input.includes("hi")) {
    return `Hello, I'm the virtual assistant for ${PROFILE.name}. How can I assist you today?`;
  }

  // WHO ARE YOU
  if (input.includes("who") && input.includes("you")) {
    return `${PROFILE.name} is a customer-focused professional based in ${PROFILE.location} with ${PROFILE.experience} of experience in sales, operations, and virtual assistance. She supports businesses by improving processes, managing operations, and delivering excellent customer service.`;
  }

  // WHAT DO YOU DO
  if (input.includes("what") && input.includes("do")) {
    return `${PROFILE.name} specializes in ${PROFILE.roles.join(", ")}. She helps businesses stay organized, manage daily operations, and improve workflows through strong communication, structure, and attention to detail.`;
  }

  // SKILLS
  if (input.includes("skill")) {
    return `Core Skills: ${PROFILE.skills.core.join(", ")}.\nTools: ${PROFILE.skills.tools.join(", ")}.`;
  }

  // SERVICES / PROJECTS (REPLACED WITH VALUE-BASED WORK)
  if (input.includes("project") || input.includes("work") || input.includes("service")) {
    return PROFILE.services.map(s => `• ${s}`).join("\n");
  }

  // EXPERIENCE
  if (input.includes("experience") || input.includes("work history")) {
    return PROFILE.workExperience
      .map(job => `${job.role} at ${job.company} (${job.period})`)
      .join("\n");
  }

  // CERTIFICATIONS
  if (input.includes("cert") || input.includes("certificate")) {
    return PROFILE.certifications.join("\n");
  }

  // TRAINING
  if (input.includes("training")) {
    return PROFILE.training.join("\n");
  }

  // EDUCATION
  if (input.includes("education") || input.includes("school")) {
    return PROFILE.education;
  }

  // AVAILABILITY (HIGH PRIORITY FOR RECRUITERS)
  if (
    input.includes("hire") ||
    input.includes("available") ||
    input.includes("job") ||
    input.includes("freelance") ||
    input.includes("internship") ||
    input.includes("part time") ||
    input.includes("full time")
  ) {
    return `${PROFILE.availability.freelance} ${PROFILE.availability.internship} ${PROFILE.availability.fulltime} ${PROFILE.availability.parttime}\n\nYou can contact her directly via ${PROFILE.contact.email}`;
  }

  // CONTACT
  if (
    input.includes("contact") ||
    input.includes("email") ||
    input.includes("phone") ||
    input.includes("linkedin")
  ) {
    return `Email: ${PROFILE.contact.email}\nPhone: ${PROFILE.contact.phone}\nLinkedIn: ${PROFILE.contact.linkedin}`;
  }

  // LOCATION
  if (input.includes("location") || input.includes("where")) {
    return `${PROFILE.name} is based in ${PROFILE.location}.`;
  }

  // PORTFOLIO / WEBSITE
  if (input.includes("portfolio") || input.includes("website") || input.includes("github")) {
  return `You can explore Uwuma's portfolio here:\n${PROFILE.websites.join("\n")}\n\nIf you're looking for someone to support your operations or customer experience, feel free to reach out directly.`;
}

  // PERSONALITY / TRAITS
  if (input.includes("personality") || input.includes("trait")) {
    return PROFILE.personality.join(", ");
  }

  // DEFAULT RESPONSE (SMART + GUIDED + PROFESSIONAL)
  return "I can assist with information about Uwuma’s experience, skills, services, or how to work with her. If you're looking to hire or collaborate, feel free to ask for contact details.";
}


// ENTER KEY SUPPORT + WELCOME MESSAGE
document.addEventListener("DOMContentLoaded", function () {
  const chatBox = document.getElementById("chat-box");

  if (chatBox) {
    let welcome = document.createElement("div");
    welcome.className = "message bot";
    welcome.textContent = "Hello! I'm Uwuma's virtual assistant. Ask me about experience, skills, availability, or how to work with Uwuma.";
    chatBox.appendChild(welcome);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const active = document.activeElement;
      if (active && active.id === "user-input") {
        e.preventDefault();
        window.sendMessage();
      }
    }
  });
});


// PROFILE DATA
const PROFILE = {
  name: "Azubuike Uwuma Black",
  location: "Lagos, Nigeria",
  experience: "2 years",

  roles: [
    "Customer Service",
    "Virtual Assistance",
    "Operations Support",
    "Administrative Support"
  ],

  personality: [
    "Reliable",
    "Detail-oriented",
    "Organized",
    "Professional",
    "Strong communicator",
    "Efficient",
    "Adaptable"
  ],

  skills: {
    core: [
      "Customer Service",
      "Calendar Management",
      "Client Engagement & Follow-up",
      "Data Entry",
      "Basic Data Analysis",
      "Onboarding & Offboarding Support",
      "Project Management",
      "Lead Generation & Qualification",
      "Phone, Email & Chat Support",
      "Proofreading",
      "Canva Design"
    ],
    tools: [
      "Google Workspace",
      "Microsoft 365",
      "Notion",
      "ClickUp",
      "Trello"
    ]
  },

  availability: {
    freelance: "Yes, she is available for freelance work.",
    internship: "Yes, she is open to internships.",
    fulltime: "Yes, she is open to full-time roles.",
    parttime: "Yes, she is available for part-time roles."
  },

  contact: {
    email: "uwumaazubuike@gmail.com",
    phone: "+234 816 659 3309",
    linkedin: "https://www.linkedin.com/in/uwumaazubuikeblack"
  },

  services: [
    "Virtual Administrative Support",
    "Calendar & Email Management",
    "Customer Support (Phone, Chat, Email)",
    "Lead Generation & Follow-ups",
    "Data Entry & Database Management",
    "Meeting Scheduling & Coordination",
    "CRM Management",
    "Basic Canva Design",
    "SOP Documentation & Process Support"
  ],

  certifications: [
    "Jobberman Soft Skills Training Certificate",
    "ICT Competence Certificate",
    "She Lead Africa Data Analysis Certificate",
    "Mastercard Prep2Soar Certificate"
  ],

  training: [
    "Women Techsters – Data Analysis Track (Ongoing)",
    "Digitaley Data Analysis Training (Ongoing)",
    "Self-learning in Virtual Assistance tools (Notion, ClickUp)"
  ],

  education: "B.Sc. Animal & Environmental Biology – Rivers State University (2023)",

  workExperience: [
    {
      role: "Virtual Administrative Support",
      company: "Abimoni Limited",
      period: "2025"
    },
    {
      role: "Customer Support & Client Relations",
      company: "BetaSms",
      period: "2024"
    }
  ],

  websites: [
    "https://uwumaazubuike.github.io/"
  ]
};

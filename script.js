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

// RESPONSE LOGIC
function getResponse(input) {
  input = input.toLowerCase();

  // GREETING
  if (input.includes("hello") || input.includes("hi")) {
    return `Hello, I’m the assistant for ${PROFILE.name}. I can help you learn about her experience, skills, or how to work with her. How can I assist you today?`;
  }

  // WHO ARE YOU
  if (input.includes("who") && input.includes("you")) {
    return `${PROFILE.name} is a customer-focused professional based in ${PROFILE.location}. With ${PROFILE.experience} of experience, they specialize in customer support, operations, and virtual assistance.`;
  }

  // WHAT DO YOU DO
  if (input.includes("what") && input.includes("do")) {
    return `${PROFILE.name} helps businesses stay organized, manage daily operations, and improve processes. Uwuma handles customer support, scheduling, data management, and administrative coordination efficiently.`;
  }

  // SKILLS
  if (input.includes("skill")) {
    return `Core Skills:\n${PROFILE.skills.core.join(", ")}\n\nTools:\n${PROFILE.skills.tools.join(", ")}`;
  }

  // SERVICES
  if (input.includes("service") || input.includes("offer")) {
    return PROFILE.services.join("\n");
  }

  // EXPERIENCE
  if (input.includes("experience")) {
    return PROFILE.workExperience
      .map(job => `${job.role} at ${job.company} (${job.period})`)
      .join("\n");
  }

  // CERTIFICATIONS
  if (input.includes("cert") || input.includes("certificate")) {
    return PROFILE.certifications.join("\n");
  }

  // ACHIEVEMENTS
  if (input.includes("achievement")) {
    return PROFILE.achievements.join("\n");
  }

  // EDUCATION
  if (input.includes("education") || input.includes("degree")) {
    return PROFILE.education;
  }

  // AVAILABILITY (RECRUITER PUSH)
  if (
    input.includes("hire") ||
    input.includes("available") ||
    input.includes("job") ||
    input.includes("freelance") ||
    input.includes("internship") ||
    input.includes("part time") ||
    input.includes("full time")
  ) {
    return `${PROFILE.availability.message}\n\nYou can reach out directly via ${PROFILE.contact.email}`;
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

  // DEFAULT RESPONSE (SMART + GUIDED)
  return "I can help you with skills, experience, services, or how to hire/contact Uwuma. What would you like to know?";
}


// ENTER KEY SUPPORT
document.addEventListener("DOMContentLoaded", function () {
  const chatBox = document.getElementById("chat-box");

  if (chatBox) {
    let welcome = document.createElement("div");
    welcome.className = "message bot";
    welcome.textContent = "Hi! Ask me about skills, experience, services, or how to hire Uwuma.";
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
  name: "Uwuma Azubuike Black",
  location: "Lagos, Nigeria",
  experience: "2 years",

  skills: {
    core: [
      "Customer Service",
      "Calendar Management",
      "Client Engagement & Follow-up",
      "Data Entry",
      "Basic Data Analysis",
      "Project Management",
      "Lead Generation",
      "Onboarding & Offboarding Support",
      "Email, Phone & Chat Support",
      "Proofreading"
    ],
    tools: [
      "Google Workspace",
      "Microsoft 365",
      "Notion",
      "ClickUp",
      "Trello",
      "Canva",
      "Python (Intermediate)"
    ]
  },

  services: [
    "• Virtual Administrative Support",
    "• Calendar & Email Management",
    "• Customer Support (Phone, Chat, Email)",
    "• Lead Generation & Follow-ups",
    "• Data Entry & Database Management",
    "• Meeting Scheduling & Coordination",
    "• CRM Management",
    "• Basic Canva Design",
    "• SOP Documentation & Process Support"
  ],

  availability: {
    message: "Yes, Uwuma is available for freelance, internship, part-time, and full-time opportunities."
  },

  contact: {
    email: "uwumaazubuike@gmail.com",
    phone: "+2348166593309",
    linkedin: "https://www.linkedin.com/in/uwumaazubuikeblack"
  },

  achievements: [
    "• Contributed to a 54.46% revenue increase",
    "• Improved customer engagement by over 35%",
    "• Maintained response times under 5 minutes",
    "• Achieved 100% client onboarding success rate",
    "• Improved efficiency through process documentation and FAQs"
  ],

  certifications: [
    "• Jobberman Soft Skills Training Certificate",
    "• ICT Competence Certificate",
    "• She Lead Africa Data Analysis Certificate",
    "• Mastercard Prep2Soar Certificate"
  ],

  workExperience: [
    {
      role: "Virtual Administrative Support",
      company: "Abimoni Limited",
      period: "2025",
    },
    {
      role: "Customer Support & Client Relations",
      company: "BetaSms",
      period: "2024",
    }
  ],

  education: "B.Sc. Animal & Environmental Biology, Rivers State University (2023)"
};

window.sendMessage = function () {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  if (!input || !chatBox) {
    console.log("Chatbot elements not found");
    return;
  }

  let text = input.value.trim();
  if (text === "") return;
    
    <input type="text" id="user-input" placeholder="Type a message">
<button onclick="sendMessage()">Send</button>

<div id="chat-box"></div>

  // USER MESSAGE
  addMessage(text, "user");

  input.value = "";

  // TYPING INDICATOR
  let typing = document.createElement("div");
  typing.className = "message bot typing";
  typing.innerHTML = `<span>Assistant is typing</span><span class="dots"></span>`;
  chatBox.appendChild(typing);

  chatBox.scrollTop = chatBox.scrollHeight;

  let response = getResponse(text);

  // DELAY + REPLACE WITH ACTUAL RESPONSE
  setTimeout(() => {
    typing.remove();
    addMessage(response, "bot");
  }, 1000 + Math.random() * 1000); // natural delay
};


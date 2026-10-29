export const TEMPLATES = {
  'Job Poster': {
    subject: '{Role} Application | IIT Alumnus | 4+ YOE',
    body: `Hi {Name},

I came across your post about the {Position} opportunity at {Company} and wanted to express my interest. I’ve already applied through the job posting shared and wanted to reach out to you directly.

I’m a 2022 IIT graduate with 4+ years of experience building high-performance, full-stack systems with a strong {Focus} focus. My expertise includes {Skills}, microservices, distributed systems, scalable architecture, and AI-powered solutions. I have also worked extensively on HLD, LLD, system design, performance optimization, and end-to-end ownership of production-grade systems.

I’m excited about the opportunity to contribute to {Company} and believe my experience aligns well with the {Position} role.

I’ve attached my resume for your reference. I’d appreciate it if you could consider my profile for the opportunity.

Thank you for your time!

Best regards,
Mukul Kumar Babra
+91-8077709231`,
  },
  'LinkedIn Post': {
    subject: '{Role} Application | IIT Alumnus | 4+ YOE',
    body: `Hi {Name},

I came across your post regarding the {Role} opportunity at {Company}, and I’m excited to express my interest. With strong experience in Python, Javascript, Nodejs, React.js, microservices, distributed systems, scalable architecture, and AI powered solution. I believe I would be a great fit for this role.

I’m a 2022 IIT graduate with 4+ years of experience in building high-performance fullstack systems (backend focused), designing and scaling microservices, and working with cloud architectures and AI solution. My work also involves end-to-end ownership across HLD, LLD, system design, performance optimization, and production-grade delivery.

I am passionate about solving complex engineering challenges and contributing to large-scale platforms, and would love the opportunity to bring that experience to {Company}.

Please find my resume attached. I would be delighted to discuss my background further.

Looking forward to hearing from you.

Best regards,
Mukul Kumar Babra
+91-8077709231`,
  },
  'Cold Email': {
    subject: '{Role} Application | IIT Alumnus | 4+ YOE',
    body: `Hi {Name},

I hope you're doing well.

I'm reaching out to express my interest in the {Role} opportunity at {Company}. I'm a 2022 IIT Jodhpur graduate with 4+ years of experience building scalable, high-performance full-stack systems, with a strong focus on backend engineering, system design, and AI-powered solutions.

Currently, at Healthworks AI, I take end-to-end ownership of five business-critical applications across both {Sides} development. My work involves designing scalable architectures, building microservices, integrating distributed systems, optimizing application performance, and delivering reliable, production-grade solutions.

My technical expertise includes Java, Python, JavaScript, Node.js, React.js, microservices, distributed systems, cloud architecture, and AI-powered solutions. I also have extensive experience in HLD, LLD, system design, performance optimization, and taking applications from architecture and design through production.

I'm passionate about solving complex engineering challenges and building scalable, high-performance systems. I'd welcome the opportunity to discuss how my experience could contribute to the team at {Company}.

I've attached my resume for your consideration. If you're not the right person to contact regarding this opportunity, I'd appreciate it if you could point me in the right direction.

Thank you for your time and consideration. I look forward to hearing from you.

Best regards,
Mukul Kumar Babra
+91-8077709231`,
  },
}

const TECH_STACK_LANGUAGE = { Java: 'Java', Python: 'Python', 'Node.js': null }

// Backend: "<language>, Node.js, JavaScript, React.js". Frontend moves React.js to the front.
function skillsList(roleType, techStack) {
  if (!roleType || !techStack) return undefined
  const skills = [TECH_STACK_LANGUAGE[techStack], 'Node.js', 'JavaScript', 'React.js'].filter(Boolean)
  if (roleType === 'Frontend') skills.unshift(skills.pop())
  return skills.join(', ')
}

const SIDES = { Backend: 'backend and frontend', Frontend: 'frontend and backend' }

// Placeholders whose value hasn't been entered yet are left as-is, e.g. "{Company}".
export function fillTemplate(text, values) {
  const replacements = {
    Name: values.firstName.trim() || undefined,
    Company: values.companyName.trim() || undefined,
    Position: values.role.trim() || undefined,
    Role: values.role.trim() || undefined,
    Focus: values.roleType.toLowerCase() || undefined,
    Skills: skillsList(values.roleType, values.techStack),
    Sides: SIDES[values.roleType],
  }
  return text.replace(/\{(\w+)\}/g, (match, key) => replacements[key] ?? match)
}

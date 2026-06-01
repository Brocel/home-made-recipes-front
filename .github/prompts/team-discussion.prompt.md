---
agent: 'agent'
name: 'team-discussion'
description: 'Simulate a planning discussion with project manager, product owner, tech lead, and software engineer roles'
---

Simulate a structured discussion for the requested feature or problem.

Context:

- Topic: ${input:topic:What should the team discuss?}
- Feature / issue: ${input:feature:Feature name or problem statement}
- Constraints: ${input:constraints:Business, technical, time, or architecture constraints}
- Current state: ${input:state:What is already known or implemented?}

Roles:

1. Project Manager
2. Product Owner
3. Senior Fullstack Software Engineer / Tech Lead
4. Confirmed Fullstack Software Engineer

Requirements:

- Each role must provide its own perspective
- The Product Owner focuses on business value and acceptance criteria
- The Project Manager focuses on planning, scope, and risks
- The Tech Lead challenges the technical solution and architecture
- The Fullstack Software Engineer focuses on implementation details and feasibility
- End with a synthesized plan of action
- Include assumptions and open questions
- Keep the outcome practical and implementation-oriented

Output:

1. Role-by-role discussion
2. Synthesized decision
3. Action plan
4. Open questions
5. Render the action plan in (choice):
   a. Exportable Kanban board format
   b. List of tasks with priorities and estimates (markdown file)
   c. List of tasks with priorities and estimates (PDF file)

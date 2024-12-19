# NexMeet 🚀

NexMeet is a feature-rich video conferencing application designed for seamless online meetings and video calls. Built with modern web technologies, it provides functionalities such as scheduling upcoming meetings, recording sessions, and accessing previous meeting records. The project is optimized for efficiency and user experience.

## Table of Contents 📖

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Folder Structure](#folder-structure)
6. [Contributing](#contributing)
7. [Acknowledgements](#acknowledgements)

## Features ✨

- **Video Conferencing:** 🎥 High-quality video and audio for smooth communication.
- **Upcoming Meetings:** 📅 Schedule and manage your meetings effortlessly.
- **Meeting Recordings:** 🎙️ Record and save meetings for future reference.
- **Meeting History:** 🕒 View previous meeting records and notes.
- **User Authentication:** 🔒 Secure user login and signup using Clerk.
- **Responsive Design:** 📱 Works across various devices and screen sizes.

## Technologies Used 🛠️

- **Frontend:**
  - [Next.js](https://nextjs.org/): ⚛️ React-based framework for server-side rendering and static site generation.
  - [Tailwind CSS](https://tailwindcss.com/): 🎨 Utility-first CSS framework for styling.
  - [ShadCN UI](https://shadcn.dev/) & [Acernity UI](https://acernityui.com/): 🖌️ UI component libraries for a polished design.

- **Video Conferencing:**
  - [Stream](https://getstream.io/): 📡 Real-time video and audio communication.

- **Authentication:**
  - [Clerk](https://clerk.dev/): 🔐 User authentication and management.

## Installation 🧑‍💻

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/NexMeet.git
   ```

2. Navigate to the project directory:
   ```bash
   cd NexMeet
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Add the following variables:
     ```env
     NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
     CLERK_FRONTEND_API=your_clerk_frontend_api
     CLERK_API_KEY=your_clerk_api_key
     ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage 💡

- Sign up or log in using the authentication system.
- Schedule upcoming meetings or join existing ones.
- Start a meeting, and optionally record the session.
- Access meeting history to review past discussions.

## Folder Structure 📂

```
NexMeet/
├── components/       # Reusable UI components
├── pages/            # Application pages
├── public/           # Static assets
├── styles/           # Global styles
├── utils/            # Utility functions
├── .env.local        # Environment variables (ignored in Git)
└── package.json      # Project dependencies and scripts
```

## Contributing 🤝

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request on GitHub.

## Acknowledgements 🙌

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Stream](https://getstream.io/)
- [Clerk](https://clerk.com/docs)
- [ShadCN UI](https://ui.shadcn.com/)
- [Acernity UI](https://ui.aceternity.com/)

# The Google Meet Clone

A video conferencing application that replicates the core functionalities of Google Meet. Built using Next.js, TypeScript, and Stream's Video and Chat SDKs, this application allows users to conduct virtual meetings with real-time video, audio, and messaging capabilities.

<p align="center">
    <a href="https://tropicolx.hashnode.dev/building-a-google-meet-clone-with-nextjs-and-tailwindcss-part-one" style="display: block;" align="center">
        <img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1727703697955/ce9ba7d8-e626-4bdb-8fdf-a98d9061cf34.png" alt="Building a Google Meet Clone with Next.js and TailwindCSS" width="60%" />
    </a>
</p>
<p align="center"><a href="https://tropicolx.hashnode.dev/building-a-google-meet-clone-with-nextjs-and-tailwindcss-part-one" align="center">Click to read!</a></p>
    

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- **User Authentication**: Secure user authentication using Clerk for both registered users and guests.
- **Meeting Lobby**: Users can configure audio and video settings before joining a meeting.
- **Dynamic Video Layouts**: Supports grid and speaker layouts with smooth animations using GSAP.
- **Screen Sharing**: Participants can share their screens during the meeting.
- **Real-time Messaging**: Integrated chat functionality using Stream Chat SDK.
- **Meeting Recordings**: Ability to record meetings and access recordings afterward.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS.
- **Interactive Controls**: Users can mute/unmute audio, enable/disable video, and more.

## Demo

You can access a live demo of the application [here](https://google-meet-clone-eta.vercel.app/).

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Stream Account**: Sign up for a free account at [Stream](https://getstream.io/)
- **Clerk Account**: Sign up for a free account at [Clerk](https://clerk.dev/)
- **ngrok**: For exposing your local server to the internet

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/google-meet-clone.git
   cd google-meet-clone
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Stream Dashboard**
   
   - Create a new Stream app with video calling and chat messaging enabled.
   - Update Permissions:
      -  Navigate to **Roles & Permissions** under **Chat messaging**.
      -  Select the **user** role and **messaging** scope.
      -  Edit permissions to enable:
         - **Create Message**
         - **Read Channel**
         - **Read Channel Members**
      - Save and confirm changes.

  
4. **Set Up Clerk Dashboard**
   
   [Create and setup a new Clerk application](https://tropicolx.hashnode.dev/building-a-google-meet-clone-with-nextjs-and-tailwindcss-part-one#heading-creating-a-new-clerk-project).
    
5. **Set Up ngrok**
   
   [Set up an ngrok tunnel](https://tropicolx.hashnode.dev/building-a-google-meet-clone-with-nextjs-and-tailwindcss-part-one#heading-syncing-clerk-with-your-stream-app) for the `/webhooks` route.


6. **Configure Clerk Webhooks**

   [Add the webhook to your clerk app](https://tropicolx.hashnode.dev/building-a-google-meet-clone-with-nextjs-and-tailwindcss-part-one#heading-syncing-clerk-with-your-stream-app).
     
7. **Set Up Environment Variables**

   Create a `.env.local` file in the root directory and add your Stream and Clerk API keys:

   ```env
   NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
   STREAM_API_SECRET=your_stream_api_secret
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   WEBHOOK_SECRET=your_clerk_webhook_signing_secret
   ```

## Usage

1. **Run the Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:3000`.

2. **Create a New Meeting**

   - Visit `http://localhost:3000`.
   - Click on **New Meeting** to generate a unique meeting link.

3. **Join a Meeting**

   - Configure your audio and video settings in the lobby.
   - Enter the meeting and start collaborating!

## Technologies Used

- **Next.js**: React framework for server-side rendering and routing.
- **TypeScript**: Typed superset of JavaScript.
- **Tailwind CSS**: Utility-first CSS framework.
- **GSAP**: Animation library for smooth transitions.
- **Stream Video SDK**: Provides video calling functionality.
- **Stream Chat SDK**: Enables real-time messaging.
- **Clerk**: User management and authentication.
- **ngrok**: Exposes local servers to the internet securely.

## License

This project is licensed under the [MIT License](LICENSE).

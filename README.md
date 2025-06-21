# Notez - Telegram Mini App for Personal Notes

## ✨ Summary

Notez is a lightweight and intuitive **Telegram Mini App** that lets users write, view, and manage personal notes directly within Telegram. Whether you’re signed in through Telegram or visiting as a guest, Notez provides a seamless note-taking experience with autosaving and syncing through **Firebase Firestore**.

## 📅 Description

Notez offers a quick and clean interface for saving important thoughts, reminders, and plans. Users can create notes via a modal, browse their collection, view note details, and even edit them. All notes are securely stored per user using Telegram's WebApp authentication or a guest fallback ID.

Key features include:

* Quick Add modal with title and content fields
* Unique note IDs for direct access and editing
* Firestore integration for real-time storage and retrieval
* Guest fallback support for anonymous users
* Clean UI using React, TailwindCSS, and ShadCN components

---

# 📖 README

## Notez - Telegram Mini App for Notes

A mini app built for Telegram using React + Firebase to manage personal notes.

### ✨ Features

* ✍️ Add notes via modal
* 📓 View all personal notes
* 📘 Open and edit individual notes
* 📊 Sorted recent notes with preview
* 🔐 Telegram WebApp user authentication (with guest fallback)

### 🚀 Tech Stack

* **React + Vite**
* **Firebase Firestore** (NoSQL database)
* **Telegram WebApp SDK**
* **Tailwind CSS + ShadCN UI**

### ⚙️ Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/notez.git
cd notez
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add your Firebase config:

```env
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx
```

4. Start the development server:

```bash
npm run dev
```

### 🔧 Firebase Firestore Structure

```plaintext
users (collection)
 └── userId (document)
      └── id
      └── username
      └── notes: [
            {
              id: string,
              title: string,
              content: string,
              createdAt: string
            },
            ...
        ]
```

### 🔓 Authentication

Uses `window.Telegram.WebApp.initDataUnsafe.user` for Telegram users.
If no Telegram user is found, a temporary guest user is created with an ID like `guest-<timestamp>`.

### 🌐 Deploy

You can deploy Notez as a static site using:

* **Vercel**
* **Netlify**
* **Firebase Hosting**

Ensure the domain is whitelisted in Telegram's Bot settings.

### 🌟 Credits

Built by \[Your Name / Team Name].
Telegram Bot Powered. Firebase Backed.

---

Let me know if you want to generate assets like logos, banners, or a Telegram bot link generator!

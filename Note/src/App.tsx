import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Note, Notes } from "./pages";
import { db } from "./firebase";
import { Toaster } from "@/components/ui/sonner";
import { setDoc, doc, getDoc } from "firebase/firestore";
import Layout from "./pages/Layout";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const tg = window.Telegram?.WebApp;
      tg?.ready();

      console.log("window.Telegram:", window.Telegram);
      console.log("Telegram WebApp:", window.Telegram?.WebApp);
      console.log("initDataUnsafe:", window.Telegram?.WebApp?.initDataUnsafe);

      const tgUser = tg?.initDataUnsafe?.user;
      let cleanUser;

      if (!tgUser) {
  console.warn("⚠️ No Telegram user detected. Falling back to guest mode.");
}

      if (tgUser?.id) {
        cleanUser = {
          id: tgUser.id,
          username: tgUser.username,
          first_name: tgUser.first_name,
          last_name: tgUser.last_name || "",
          is_premium: tgUser.is_premium || false,
          createdAt: new Date().toISOString(),
          notes: [],
        };
      } else {
        const existingGuestId = localStorage.getItem("guest_user_id");
        const guestId = existingGuestId || `guest-${Date.now()}`;
        if (!existingGuestId) {
          localStorage.setItem("guest_user_id", guestId);
        }

        cleanUser = {
          id: guestId,
          username: "guest",
          first_name: "Guest",
          last_name: "",
          is_premium: false,
          createdAt: new Date().toISOString(),
          notes: [],
        };
      }

      try {
        const userRef = doc(db, "users", String(cleanUser.id));
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, cleanUser);
          console.log("✅ New user saved to Firestore:", cleanUser);
          localStorage.setItem("tg_user", JSON.stringify(cleanUser));
        } else {
          const existingData = userSnap.data();
          console.log("ℹ️ User already exists in Firestore:", existingData);
          localStorage.setItem("tg_user", JSON.stringify(existingData));
        }
      } catch (err) {
        console.error("❌ Error saving user to Firestore:", err);
      }

      setLoading(false);
    };

    init();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/:id" element={<Note />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;

import { useState, useEffect } from "react";

type TelegramUserLite = {
  id: number;
  username?: string;
  first_name: string;
  is_premium: boolean;
  last_name?: string;
  createdAt: string;
};

const useTelegramUser = () => {
  const [user, setUser] = useState<TelegramUserLite | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("tg_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return user;
};

export default useTelegramUser;

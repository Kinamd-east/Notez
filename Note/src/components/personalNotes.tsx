import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase"; // Adjust the path if needed

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

type Note = {
  id: string;
  title: string;
  createdAt: string;
  content?: string;
};

export function PersonalNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem("tg_user") || "{}");
        if (!user?.id) return;

        const userRef = doc(db, "users", String(user.id));
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setNotes(userData.notes || []);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
      setLoading(false);
    };

    fetchNotes();
  }, []);

  if (loading) {
    return <div className="p-4 text-muted-foreground">Loading notes...</div>;
  }

  if (!notes.length) {
    return <div className="p-4 text-muted-foreground">No notes found.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {notes.map((note, index) => (
        <Link to={note.id} key={note.id}>
          <Card
            key={index}
            className="@container/card cursor-pointer hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader>
              <CardDescription>
                {new Date(note.createdAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {note.title}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="text-muted-foreground">
                {note.content || "No details provided"}
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}

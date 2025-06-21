import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Note = {
  id: string;
  title: string;
  createdAt: string;
  content?: string;
};

export function SectionCards() {
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
          const userNotes = userData.notes || [];

          // Sort by createdAt descending
          const sorted = [...userNotes].sort(
            (a: Note, b: Note) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

          setNotes(sorted);
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
    <div className="flex flex-col gap-4">
      <h1 className="font-bold px-8 pt-8 text-xl">Recent Notes</h1>

      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {notes.slice(0, 2).map((note) => (
          <Link to={note.id} key={note.id}>
            <Card className="@container/card cursor-pointer hover:shadow-lg transition-shadow duration-200">
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

      {/* See More Button */}
      <div className="flex justify-end px-6 pb-4">
        <Link to="/notes">
          <Button variant="outline">See More</Button>
        </Link>
      </div>
    </div>
  );
}

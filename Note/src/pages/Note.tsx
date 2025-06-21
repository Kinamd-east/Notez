import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { PencilIcon } from "lucide-react";
import { db } from "@/firebase";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Note = () => {
  const { id } = useParams();
  const [note, setNote] = useState<null | any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);

      try {
        const user = JSON.parse(localStorage.getItem("tg_user") || "{}");
        if (!user?.id) return setNotFound(true);

        const userRef = doc(db, "users", String(user.id));
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) return setNotFound(true);

        const userData = userSnap.data();
        const foundNote = (userData.notes || []).find((n: any) => n.id === id);

        if (foundNote) {
          setNote(foundNote);
          setTitle(foundNote.title);
          setContent(foundNote.content);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error("Error fetching note:", err);
        setNotFound(true);
      }

      setLoading(false);
    };

    fetchNote();
  }, [id]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("tg_user") || "{}");
    if (!user?.id) return;

    try {
      const userRef = doc(db, "users", String(user.id));
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) return;

      const userData = userSnap.data();
      const notes = userData.notes || [];

      const updatedNotes = notes.map((n: any) =>
        n.id === id ? { ...n, title, content } : n
      );

      await updateDoc(userRef, { notes: updatedNotes });
      toast.success("Note updated successfully");

      setNote({ ...note, title, content });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to update note:", error);
      toast.error("Failed to update note");
    }
  };

  if (loading) {
    return <div className="p-4 text-muted-foreground">Loading note...</div>;
  }

  if (notFound || !note) {
    return <div className="p-4 text-red-500 font-medium">Note not found.</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <Button className="flex flex-row gap-2" onClick={() => setIsDialogOpen(true)}>
        Edit
        <PencilIcon className="w-4 h-4" />
      </Button>

      <h1 className="text-2xl font-bold">{note.title}</h1>
      <p className="text-sm text-muted-foreground">
        {new Date(note.createdAt).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </p>
      <p className="mt-4 whitespace-pre-wrap">{note.content}</p>

      {/* Edit Modal */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Note</AlertDialogTitle>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4 pt-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  required
                />
              </div>
              <Button type="submit" className="cursor-pointer">Save Changes</Button>
            </form>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Note;

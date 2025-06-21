import { IconMail } from "@tabler/icons-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "./ui/button";
import useTelegramUser from "@/hooks/useTelegramUser";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ComponentType;
  }[];
}) {
  const user = useTelegramUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");

  const submitNote = async () => {
    if (!title || !note) return;

    try {
      const userId = user?.id; // or however you're storing the logged-in user
      const userRef = doc(db, "users", userId);
      const noteId = crypto.randomUUID(); // Unique ID for this note

      await updateDoc(userRef, {
        notes: arrayUnion({
          id: noteId, // ✅ Add unique ID
          title,
          content: note,
          createdAt: new Date().toISOString(),
        }),
      });

      // Optional: Reset inputs
      setTitle("");
      setNote("");

      console.log("Note added!");
      toast.success("Note successfully added");
      setIsDialogOpen(false); // ✅ Close dialog on success
    } catch (err) {
      toast.error(err);
      console.error("Error adding note:", err);
    }
  };
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger asChild>
                <SidebarMenuButton
                  tooltip="Add Note"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                >
                  <IconMail />
                  <span className="sr-only">Note</span>
                  <span>Add Note</span>
                </SidebarMenuButton>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Note</AlertDialogTitle>
                  <AlertDialogDescription>
                    Type whatever you want and click confirm to save...
                  </AlertDialogDescription>
                  <div className="flex items-center w-full justify-center">
                    <form
                      className="w-full flex flex-col gap-4"
                      onSubmit={(e) => {
                        e.preventDefault();
                        submitNote();
                      }}
                    >
                      <Label htmlFor="notetitle">Title</Label>
                      <Input
                        id="notetitle"
                        placeholder="Note Title"
                        className="w-full"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                      <Textarea
                        className="w-full h-[12rem]"
                        placeholder="Type your message here."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        required
                      />
                      <Button type="submit">Submit</Button>
                    </form>
                  </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link to={item.url}>
                <SidebarMenuButton
                  tooltip={item.title}
                  className="cursor-pointer"
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

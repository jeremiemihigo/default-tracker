import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

type Props = {
  title: string;
  btnname: string | ReactNode;
  description?: string;
  component: ReactNode;
};

export default function Popup({
  title,
  description,
  component,
  btnname,
}: Props) {
  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button variant="default">{btnname}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{component}</div>
      </DialogContent>
    </Dialog>
  );
}

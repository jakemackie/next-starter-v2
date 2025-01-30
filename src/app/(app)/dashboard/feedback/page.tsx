import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FeedbackForm } from './feedback-form'

export default function Feedback() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Feedback</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription>
            This starter template is in alpha and we would love to hear your feedback.
          </DialogDescription>
        </DialogHeader>
        <FeedbackForm />
      </DialogContent>
    </Dialog>
  );
}

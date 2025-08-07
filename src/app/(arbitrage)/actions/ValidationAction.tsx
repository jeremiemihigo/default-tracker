"use client";

import { ICombo } from "@/app/interface/IOther";
import { Combobox } from "@/app/Tools/combobox";
import Loading from "@/app/Tools/loading";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  id: string;
  typeAction: string;
};
const labels = [
  { label: "APPROVED", value: "APPROVED" },
  { label: "REJECTED", value: "REJECTED" },
];

function ValidationAction({ id, typeAction }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [feedbacks, setFeedbacks] = useState<ICombo[]>([]);
  const [feedbackselect, setFeedbacksSelect] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const Loadfeedback = async () => {
    try {
      const res = await fetch("/api/feedback", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        setFeedbacks(data.data);
      }
      setIsLoading(false);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const initialize = async () => {
      await Loadfeedback();
    };
    initialize();
  }, []);

  const submitedStatus = async () => {
    setIsSending(true);
    const donner = {
      codeclient: id,
      feedback: feedbackselect,
      statut: value,
      typeAction,
    };
    if (donner.statut === "REJECTED" && donner.feedback === "") {
      toast("Veuillez selectionner le statut du client");
      return;
    } else {
      const response = await fetch("/api/action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([donner]),
      });
      const payload = await response.json().catch(() => null);
      if (payload.status === 200) {
        toast("Opération effectuée");
        setIsSending(false);
      } else {
        setIsSending(false);
        toast(payload.data, {
          description: "Y a eu un souci avec lors de la validation",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      }
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loading type="Loading" />
      ) : (
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Combobox value={value} data={labels} setValue={setValue} />
            {value === "REJECTED" && (
              <Combobox
                value={feedbackselect}
                data={feedbacks}
                setValue={setFeedbacksSelect}
              />
            )}
          </div>

          <div>
            <Button
              disabled={isSending}
              onClick={() => submitedStatus()}
              className="w-full"
            >
              Valider
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ValidationAction;

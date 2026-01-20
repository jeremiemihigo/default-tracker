"use client";

import { dataDecision } from "@/app/static/lien";
import { Combobox } from "@/app/Tools/combobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  data: {
    customer_id: string;
    shop: string;
    idHistorique: string;
    region: string;
    par: string;
    customer_name: string;
  };
};

function ChangeDecision({ data }: Props) {
  const [decision, setDecisionSelect] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [commentaire, setCommentaire] = useState<string>("");

  const submitedStatus = async () => {
    setIsSending(true);
    const donner = {
      codeclient: data.customer_id,
      comment: commentaire,
      shop: data.shop,
      idHistorique: data.idHistorique,
      region: data.region,
      par: data.par,
      customer_name: data.customer_name,
      decision,
    };
    const response = await fetch("/api/decision_/change_decision", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donner),
    });
    const payload = await response.json().catch(() => null);
    if (payload.status === 200) {
      toast("Opération effectuée");
      setIsSending(false);
    } else {
      setIsSending(false);
      toast(
        "A decision has already been made for this client; you can go to the decisions module to modify it if necessary.",
        { duration: 10000 }
      );
    }
  };

  return (
    <div>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Combobox
            value={decision}
            data={dataDecision}
            setValue={setDecisionSelect}
          />
        </div>
        <div className="grid gap-3">
          <Input
            onChange={(e) => setCommentaire(e.target.value)}
            id="comment"
            name="comment"
            value={commentaire}
            placeholder="commentaire"
          />
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
    </div>
  );
}

export default ChangeDecision;

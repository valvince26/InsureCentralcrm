import React from "react";

export default function WebhookPreview() {
  const jsonPayload = `{
  "event": "disposition.selected",
  "data": {
    "outcome": "no_answer",
    "lead_id": "L-8829-XP",
    "action": "requeue",
    "delay": 7200
  },
  "timestamp": "2023-10-27T14:45:00Z"
}`;

  return (
    <div className="bg-surface-container border border-outline-variant p-6 rounded-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">terminal</span>
        </div>
        <h4 className="text-title-md font-title-md">Webhook Payload Preview</h4>
      </div>
      <pre className="bg-inverse-surface text-surface-container-low p-4 rounded-lg text-code-md overflow-x-auto border border-outline/30">
        {jsonPayload}
      </pre>
    </div>
  );
}

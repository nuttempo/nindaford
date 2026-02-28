type LeadPayload = Record<string, string | number | boolean | null | undefined>;

type LeadWebhookResult = {
  attempted: boolean;
  success: boolean;
  httpStatus?: number;
};

function getLeadWebhookUrl() {
  const url = import.meta.env.VITE_LEAD_WEBHOOK_URL?.trim();
  if (!url) {
    return null;
  }

  if (!/^https?:\/\//i.test(url)) {
    return null;
  }

  return url;
}

export async function submitLeadWebhook(payload: LeadPayload): Promise<LeadWebhookResult> {
  const webhookUrl = getLeadWebhookUrl();

  if (!webhookUrl || typeof window === "undefined") {
    return { attempted: false, success: false };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });

    return {
      attempted: true,
      success: response.ok,
      httpStatus: response.status,
    };
  } catch {
    return {
      attempted: true,
      success: false,
    };
  }
}

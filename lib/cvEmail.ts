type SendOtpInput = {
  toEmail: string;
  otpCode: string;
  minutesValid: number;
};

export type CvOtpDeliveryInfo = {
  messageId?: string;
  accepted?: string[];
  rejected?: string[];
  response?: string;
};

function getEmailConfig() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || "465");
  const secure = String(process.env.SMTP_SECURE || (port === 465 ? "true" : "false")) === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;

  if (!user || !pass || !from) {
    throw new Error(
      "Missing SMTP configuration. Set SMTP_USER, SMTP_PASS (Gmail App Password), and SMTP_FROM (or SMTP_USER)."
    );
  }

  return { host, port, secure, user, pass, from };
}

export async function sendCvOtpEmail(input: SendOtpInput): Promise<CvOtpDeliveryInfo> {
  const nodemailer = await import("nodemailer");
  const { host, port, secure, user, pass, from } = getEmailConfig();

  const transport = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const subject = "Your CV verification code";
  const text = `Your CV verification code is ${input.otpCode}. It expires in ${input.minutesValid} minutes.`;
  const html = `
    <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial;line-height:1.4">
      <h2 style="margin:0 0 12px">CV Verification Code</h2>
      <p style="margin:0 0 12px">Use this code to view the resume:</p>
      <div style="display:inline-block;padding:12px 16px;border-radius:12px;background:#111827;color:#fff;font-size:20px;letter-spacing:2px;font-weight:700">
        ${input.otpCode}
      </div>
      <p style="margin:12px 0 0;color:#374151">Expires in ${input.minutesValid} minutes.</p>
    </div>
  `;

  try {
    if (process.env.NODE_ENV !== "production") {
      await transport.verify();
    }

    const info = await transport.sendMail({
      from: `Qamrul Hassan Portfolio <${from}>`,
      to: input.toEmail,
      subject,
      text,
      html,
    });

    return {
      messageId: info.messageId,
      accepted: (info.accepted as string[]) || [],
      rejected: (info.rejected as string[]) || [],
      response: (info.response as string) || "",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    throw new Error(`Failed to send OTP email. ${message}`);
  }
}

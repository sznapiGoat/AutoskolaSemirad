import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contactSchema";
import { site } from "@/lib/site";

const TO = process.env.CONTACT_TO_EMAIL || "sznapi7@seznam.cz";
// Until a domain is verified in Resend, the shared sender only delivers to the
// Resend account owner's address. Set CONTACT_FROM_EMAIL once a domain is verified.
const FROM = process.env.CONTACT_FROM_EMAIL || "Autoškola web <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return NextResponse.json(
      { ok: false, error: "Odesílání e-mailů zatím není nastavené." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Neplatný požadavek." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Zkontrolujte prosím vyplněné údaje." },
      { status: 422 },
    );
  }

  const { name, phone, email, service, message } = parsed.data;
  const resend = new Resend(apiKey);

  const rows: [string, string][] = [
    ["Jméno", name],
    ["Telefon", phone],
    ["E-mail", email || "—"],
    ["Zájem o", service],
    ["Zpráva", message || "—"],
  ];

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email || undefined,
      subject: `Nová poptávka z webu: ${name} — ${service}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: `<h2 style="font-family:sans-serif">Nová poptávka z webu ${site.name}</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 12px;color:#666;vertical-align:top"><strong>${k}</strong></td><td style="padding:6px 12px">${escapeHtml(
                v,
              ).replace(/\n/g, "<br>")}</td></tr>`,
          )
          .join("")}
        </table>`,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "E-mail se nepodařilo odeslat." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      { ok: false, error: "E-mail se nepodařilo odeslat." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

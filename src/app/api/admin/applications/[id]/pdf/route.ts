import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, isValidToken } from "@/lib/adminAuth";
import { getApplication } from "@/lib/db";
import { buildApplicationPdf } from "@/lib/pdf";

export const dynamic = "force-dynamic";

const slug = (s: string) => s.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Not covered by the /admin middleware, so guard here.
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!(await isValidToken(token))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const app = await getApplication(id);
  if (!app) {
    return NextResponse.json({ error: "Application not found." }, { status: 404 });
  }

  let pdf: Uint8Array;
  try {
    pdf = await buildApplicationPdf(app.data ?? {});
  } catch (err) {
    console.error("PDF export error:", err);
    return NextResponse.json(
      { error: "Could not generate the PDF for this application." },
      { status: 500 }
    );
  }
  const name =
    slug([app.first_name, app.surname].filter(Boolean).join("-")) || "applicant";

  // Uint8Array is a valid response body at runtime; the cast sidesteps a
  // TS lib-typing quirk (its buffer is typed as possibly-shared).
  return new NextResponse(pdf as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="HG-Care-Application-${name}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}

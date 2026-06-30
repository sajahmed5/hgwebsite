import { recruitmentSteps } from "@/data/site";

// Desktop: an animated winding "road" with a carer walking past six milestone
// stops. Mobile: a clean vertical timeline (the SVG text is too small on phones).
// The SVG is static/trusted markup, injected as-is to keep its kebab-case
// attributes and CSS animations intact.
const PATH =
  "M160,830 C160,775 200,745 200,700 C200,650 480,640 480,590 C480,540 200,530 200,480 C200,430 480,420 480,370 C480,320 200,310 200,260 C200,210 440,200 440,150";

const journeySvg = `
<style>
.rj-bg{fill:#f3faf9}
.rj-hill{fill:#dcecdd}
.rj-sun{fill:#fbe3a3}
.rj-card{fill:#ffffff;stroke:#d2e8ea}
.rj-ct{font:600 14px var(--font-sans,sans-serif);fill:#015159}
.rj-cs{font:400 12px var(--font-sans,sans-serif);fill:#5c6b62}
.rj-pn{font:600 15px var(--font-sans,sans-serif);fill:#ffffff}
.rj-tag{font:600 12px var(--font-sans,sans-serif);fill:#ffffff}
.rj-conn{stroke:#bcd9c5;stroke-width:1.4}
.rj-carer{offset-path:path("${PATH}");offset-rotate:0deg;animation:rj-travel 22s linear infinite,rj-fade 22s linear infinite}
.rj-dashes{animation:rj-flow 1.4s linear infinite}
.rj-bob{animation:rj-bob .7s ease-in-out infinite}
@keyframes rj-travel{from{offset-distance:0%}to{offset-distance:100%}}
@keyframes rj-fade{0%{opacity:0}4%{opacity:1}90%{opacity:1}100%{opacity:0}}
@keyframes rj-flow{to{stroke-dashoffset:-32}}
@keyframes rj-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
@media (prefers-reduced-motion:reduce){.rj-carer{animation:none;offset-distance:0%;opacity:1}.rj-dashes,.rj-bob{animation:none}}
</style>
<svg width="100%" viewBox="0 0 680 900" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="rjTitle rjDesc">
<title id="rjTitle">The HG Care recruitment journey</title>
<desc id="rjDesc">A winding path with a walking carer passing six milestones, from applying to growing your career.</desc>
<rect class="rj-bg" x="4" y="4" width="672" height="892" rx="22"/>
<ellipse class="rj-hill" cx="150" cy="770" rx="230" ry="95"/>
<ellipse class="rj-hill" cx="545" cy="420" rx="220" ry="105"/>
<ellipse class="rj-hill" cx="190" cy="210" rx="190" ry="80"/>
<circle class="rj-sun" cx="600" cy="80" r="34"/>
<path d="${PATH}" fill="none" stroke="#6FAE86" stroke-width="36" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${PATH}" fill="none" stroke="#8FC79F" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>
<path class="rj-dashes" d="${PATH}" fill="none" stroke="#FCFDFA" stroke-width="3" stroke-linecap="round" stroke-dasharray="16 16"/>

<rect x="40" y="816" width="100" height="26" rx="13" fill="#67912c"/>
<text class="rj-tag" x="90" y="833" text-anchor="middle">Start here</text>

<line class="rj-conn" x1="172" y1="700" x2="184" y2="700"/>
<rect class="rj-card" x="4" y="674" width="168" height="52" rx="12" stroke-width="1"/>
<text class="rj-ct" x="18" y="700">You apply</text>
<text class="rj-cs" x="18" y="717">A quick online form</text>
<circle cx="200" cy="700" r="17" fill="#00606c" stroke="#ffffff" stroke-width="3"/>
<text class="rj-pn" x="200" y="700" text-anchor="middle" dominant-baseline="central">1</text>

<line class="rj-conn" x1="497" y1="590" x2="508" y2="590"/>
<rect class="rj-card" x="508" y="564" width="168" height="52" rx="12" stroke-width="1"/>
<text class="rj-ct" x="522" y="590">Interview</text>
<text class="rj-cs" x="522" y="607">A friendly chat</text>
<circle cx="480" cy="590" r="17" fill="#00606c" stroke="#ffffff" stroke-width="3"/>
<text class="rj-pn" x="480" y="590" text-anchor="middle" dominant-baseline="central">2</text>

<line class="rj-conn" x1="172" y1="480" x2="184" y2="480"/>
<rect class="rj-card" x="4" y="454" width="168" height="52" rx="12" stroke-width="1"/>
<text class="rj-ct" x="18" y="480">Training</text>
<text class="rj-cs" x="18" y="497">Paid induction</text>
<circle cx="200" cy="480" r="17" fill="#00606c" stroke="#ffffff" stroke-width="3"/>
<text class="rj-pn" x="200" y="480" text-anchor="middle" dominant-baseline="central">3</text>

<line class="rj-conn" x1="497" y1="370" x2="508" y2="370"/>
<rect class="rj-card" x="508" y="344" width="168" height="52" rx="12" stroke-width="1"/>
<text class="rj-ct" x="522" y="370">Your first role</text>
<text class="rj-cs" x="522" y="387">Begin with support</text>
<circle cx="480" cy="370" r="17" fill="#00606c" stroke="#ffffff" stroke-width="3"/>
<text class="rj-pn" x="480" y="370" text-anchor="middle" dominant-baseline="central">4</text>

<line class="rj-conn" x1="172" y1="260" x2="184" y2="260"/>
<rect class="rj-card" x="4" y="234" width="168" height="52" rx="12" stroke-width="1"/>
<text class="rj-ct" x="18" y="260">NVQ &amp; support</text>
<text class="rj-cs" x="18" y="277">Gain qualifications</text>
<circle cx="200" cy="260" r="17" fill="#00606c" stroke="#ffffff" stroke-width="3"/>
<text class="rj-pn" x="200" y="260" text-anchor="middle" dominant-baseline="central">5</text>

<line x1="440" y1="150" x2="440" y2="108" stroke="#C98A2E" stroke-width="2.4" stroke-linecap="round"/>
<path d="M440,108 L470,118 L440,128 Z" fill="#84b43c"/>
<circle cx="440" cy="150" r="18" fill="#67912c" stroke="#ffffff" stroke-width="3"/>
<rect x="436.5" y="143" width="1.6" height="14" fill="#ffffff"/>
<path d="M438.1,143.5 L446,146 L438.1,148.5 Z" fill="#ffffff"/>
<rect class="rj-card" x="476" y="124" width="168" height="52" rx="12" stroke-width="1"/>
<text class="rj-ct" x="490" y="150">Grow further</text>
<text class="rj-cs" x="490" y="167">New opportunities!</text>

<g class="rj-carer">
<g class="rj-bob">
<rect x="-19" y="-45" width="7" height="20" rx="3.5" fill="#A9CDEC"/>
<rect x="12" y="-45" width="7" height="20" rx="3.5" fill="#A9CDEC"/>
<rect x="-9" y="-22" width="6.5" height="20" rx="3" fill="#9CC4E6"/>
<rect x="2.5" y="-22" width="6.5" height="20" rx="3" fill="#9CC4E6"/>
<ellipse cx="-6" cy="-2" rx="6" ry="3.2" fill="#FFFFFF" stroke="#D8E0E6" stroke-width="0.6"/>
<ellipse cx="6" cy="-2" rx="6" ry="3.2" fill="#FFFFFF" stroke="#D8E0E6" stroke-width="0.6"/>
<rect x="-15" y="-46" width="30" height="27" rx="9" fill="#A9CDEC"/>
<rect x="-15" y="-24" width="30" height="5" rx="2.5" fill="#8FB8DF"/>
<circle cx="-15.5" cy="-26" r="3.4" fill="#F1C7A4"/>
<circle cx="15.5" cy="-26" r="3.4" fill="#F1C7A4"/>
<rect x="-5" y="-41" width="10" height="8" rx="2" fill="#FFFFFF" stroke="#D8E0E6" stroke-width="0.5"/>
<rect x="-0.9" y="-40" width="1.8" height="6" rx="0.6" fill="#2E8B57"/>
<rect x="-3" y="-37.9" width="6" height="1.8" rx="0.6" fill="#2E8B57"/>
<rect x="-3.5" y="-52" width="7" height="7" rx="2" fill="#F1C7A4"/>
<ellipse cx="0" cy="-58" rx="12" ry="13.5" fill="#2E3A4F"/>
<path d="M-11,-48 Q-13,-43 -9,-41 L9,-41 Q13,-43 11,-48 Z" fill="#27324A"/>
<ellipse cx="0" cy="-55" rx="7.8" ry="9" fill="#F1C7A4"/>
<ellipse cx="-3" cy="-56" rx="1.1" ry="1.5" fill="#37414A"/>
<ellipse cx="3" cy="-56" rx="1.1" ry="1.5" fill="#37414A"/>
<circle cx="-4.7" cy="-52.5" r="1.7" fill="#F2A9A0" opacity="0.85"/>
<circle cx="4.7" cy="-52.5" r="1.7" fill="#F2A9A0" opacity="0.85"/>
<path d="M-2.4,-50.6 Q0,-48.6 2.4,-50.6" fill="none" stroke="#9A5B4B" stroke-width="1" stroke-linecap="round"/>
</g>
</g>
</svg>`;

export default function RecruitmentJourney() {
  return (
    <div className="mt-14">
      {/* Desktop: animated winding road */}
      <div
        className="mx-auto hidden max-w-2xl md:block"
        dangerouslySetInnerHTML={{ __html: journeySvg }}
      />

      {/* Mobile: vertical timeline */}
      <ol className="relative mx-auto max-w-md space-y-7 md:hidden">
        <span
          aria-hidden
          className="absolute bottom-3 left-6 top-3 w-0.5 -translate-x-1/2 rounded bg-gradient-to-b from-brand-200 to-accent-300"
        />
        {recruitmentSteps.map((s, i) => {
          const last = i === recruitmentSteps.length - 1;
          return (
            <li key={s.title} className="relative flex items-start gap-4">
              <div
                className={`z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-extrabold text-white ring-4 ring-cream ${
                  last ? "bg-accent-500" : "bg-brand-600"
                }`}
              >
                {i + 1}
              </div>
              <div className="pt-1">
                <h3 className="font-bold text-brand-900">
                  <span className="mr-1.5">{s.icon}</span>
                  {s.title}
                </h3>
                <p className="mt-1 text-sm text-brand-900/70">{s.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

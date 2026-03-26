const WEIGHTS = [
  { value: 100, label: "100 · Thin" },
  { value: 200, label: "200 · ExtraLight" },
  { value: 300, label: "300 · Light" },
  { value: 400, label: "400 · Regular" },
  { value: 500, label: "500 · Medium" },
  { value: 600, label: "600 · SemiBold" },
  { value: 700, label: "700 · Bold" },
  { value: 800, label: "800 · ExtraBold" },
  { value: 900, label: "900 · Black" },
];

const SIZES = [12, 14, 16, 18, 20, 24, 28, 32, 40, 48, 64, 96];

const CN_SHORT   = "造梦次元，无限可能";
const EN_SHORT   = "Dreama — AI Creative Studio";
const CN_PARA    = "人工智能正在重塑创意边界，让每个人都能成为创作者。图像、视频、音乐，一切皆可生成。";
const EN_PARA    = "Artificial intelligence is reshaping the boundaries of creativity, empowering everyone to become a creator.";
const DIGITS     = "0123456789";
const PUNCT_CN   = "。，、：；「」【】…—～·！？";
const PUNCT_EN   = ".,;:!?()[]{}@#$%&*+-=/\\<>'\"";

const ROW = "border-b border-gray-100 py-3";
const LABEL = "text-[11px] text-gray-400 font-mono w-36 shrink-0 pt-0.5";

export default function FontTestPage() {
  return (
    <div className="
      mx-auto min-h-screen max-w-5xl bg-white px-10 py-12 text-ink
    ">
      <header className="mb-12 border-b-2 border-black pb-6">
        <p className="mb-1 font-mono text-xs text-gray-400">OPPO Sans 4.0 SC — Full Font (woff2)</p>
        <h1 className="text-4xl font-bold">字体测试页 / Font Test</h1>
      </header>

      {/* Weight scale */}
      <section className="mb-14">
        <h2 className="
          mb-5 font-mono text-xs tracking-widest text-gray-400 uppercase
        ">
          Weight Scale — fixed 32px
        </h2>
        <div>
          {WEIGHTS.map(({ value, label }) => (
            <div key={value} className={`
              ${ROW}
              flex items-baseline gap-6
            `}>
              <span className={LABEL}>{label}</span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span style={{ fontWeight: value, fontSize: 32 }}>{CN_SHORT}</span>
                <span style={{ fontWeight: value, fontSize: 32 }}>{EN_SHORT}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Size scale */}
      <section className="mb-14">
        <h2 className="
          mb-5 font-mono text-xs tracking-widest text-gray-400 uppercase
        ">
          Size Scale — fixed weight 400
        </h2>
        <div>
          {SIZES.map((size) => (
            <div key={size} className={`
              ${ROW}
              flex items-baseline gap-6
            `}>
              <span className={LABEL}>{size}px</span>
              <div className="
                flex min-w-0 flex-1 flex-col gap-0.5 overflow-hidden
              ">
                <span style={{ fontSize: size, fontWeight: 400, lineHeight: 1.3 }}>{CN_SHORT}</span>
                <span style={{ fontSize: size, fontWeight: 400, lineHeight: 1.3 }}>{EN_SHORT}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weight × Size matrix */}
      <section className="mb-14">
        <h2 className="
          mb-5 font-mono text-xs tracking-widest text-gray-400 uppercase
        ">
          Weight × Size Matrix (Chinese)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="
                  pr-4 pb-2 font-mono text-[11px] whitespace-nowrap
                  text-gray-400
                ">weight ↓ / size →</th>
                {SIZES.map((s) => (
                  <th key={s} className="
                    px-2 pb-2 font-mono text-[11px] whitespace-nowrap
                    text-gray-400
                  ">{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {WEIGHTS.map(({ value, label }) => (
                <tr key={value} className="border-t border-gray-100">
                  <td className="
                    py-2 pr-4 font-mono text-[11px] whitespace-nowrap
                    text-gray-400
                  ">{label}</td>
                  {SIZES.map((size) => (
                    <td key={size} className="px-2 py-1 whitespace-nowrap">
                      <span style={{ fontSize: size, fontWeight: value, lineHeight: 1 }}>造梦</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Paragraph */}
      <section className="mb-14">
        <h2 className="
          mb-5 font-mono text-xs tracking-widest text-gray-400 uppercase
        ">
          Paragraph — 16px / 1.75 leading
        </h2>
        <div className="grid grid-cols-2 gap-8">
          {[300, 400, 500, 700].map((w) => (
            <div key={w}>
              <p className="mb-2 font-mono text-[11px] text-gray-400">{w}</p>
              <p style={{ fontWeight: w, fontSize: 16, lineHeight: 1.75 }}>{CN_PARA}</p>
              <p style={{ fontWeight: w, fontSize: 16, lineHeight: 1.75, marginTop: 8 }}>{EN_PARA}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Digits & Punctuation */}
      <section className="mb-14">
        <h2 className="
          mb-5 font-mono text-xs tracking-widest text-gray-400 uppercase
        ">
          Digits &amp; Punctuation — 24px
        </h2>
        <div>
          {WEIGHTS.map(({ value, label }) => (
            <div key={value} className={`
              ${ROW}
              flex items-center gap-6
            `}>
              <span className={LABEL}>{label}</span>
              <div className="flex flex-col gap-0.5">
                <span style={{ fontWeight: value, fontSize: 24 }}>{DIGITS}</span>
                <span style={{ fontWeight: value, fontSize: 24 }}>{PUNCT_CN}</span>
                <span style={{ fontWeight: value, fontSize: 24 }}>{PUNCT_EN}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Alphabet */}
      <section className="mb-14">
        <h2 className="
          mb-5 font-mono text-xs tracking-widest text-gray-400 uppercase
        ">
          Alphabet — 24px
        </h2>
        <div>
          {WEIGHTS.map(({ value, label }) => (
            <div key={value} className={`
              ${ROW}
              flex items-baseline gap-6
            `}>
              <span className={LABEL}>{label}</span>
              <div className="flex flex-col gap-0.5">
                <span style={{ fontWeight: value, fontSize: 24 }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</span>
                <span style={{ fontWeight: value, fontSize: 24 }}>abcdefghijklmnopqrstuvwxyz</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Common UI strings */}
      <section className="mb-14">
        <h2 className="
          mb-5 font-mono text-xs tracking-widest text-gray-400 uppercase
        ">
          UI Strings
        </h2>
        <div className="grid grid-cols-2 gap-x-12">
          {[
            ["立即体验", "Try Now"],
            ["开始创作", "Start Creating"],
            ["了解更多", "Learn More"],
            ["免费注册", "Sign Up Free"],
            ["登录账户", "Log In"],
            ["造梦次元", "Dreama"],
            ["¥99 / 月", "¥99 / mo"],
            ["一键生成", "Generate"],
          ].map(([cn, en]) => (
            <div key={cn} className={`
              ${ROW}
              flex items-center gap-4
            `}>
              {[400, 500, 600, 700].map((w) => (
                <span key={w} style={{ fontWeight: w, fontSize: 18 }} className="
                  mr-4
                ">
                  {cn} · {en}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

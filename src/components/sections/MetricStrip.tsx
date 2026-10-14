import { metrics } from "@/content/profile";
import { container } from "@/lib/layout";

/*
  Chaar numbers ek band mein. Background thoda gehra hai taaki ye patti
  hero se alag dikhe — box ya card ke bina.

  Har number ke saath project ka naam zaroori hai: bina uske reader maan
  leta hai ki chaaron ek hi project ke hain, aur phir chaaron kamzor ho jate hain.
*/
export function MetricStrip() {
  return (
    <section className="border-line bg-paper-2 border-y">
      <div
        className={`${container} grid grid-cols-2 gap-x-8 gap-y-10 py-12 md:grid-cols-4`}
      >
        {metrics.map((metric) => (
          <div key={metric.label} data-reveal>
            {/* tabular-nums: numbers ek dusre ke neeche seedhe align rehte hain */}
            <p className="font-heading text-title font-semibold tabular-nums">
              {metric.value}
            </p>
            <p className="text-ink-soft mt-2 text-sm leading-snug">
              {metric.label}
            </p>
            <p className="text-label text-cobalt mt-3 font-mono uppercase">
              {metric.project}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

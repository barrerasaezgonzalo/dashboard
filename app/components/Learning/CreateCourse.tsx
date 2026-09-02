import { GraduationCap, Sparkles } from "lucide-react";
import { DashboardSection } from "../Ui/DashboardSection";
import { SectionHeader } from "../Ui/SectionHeader";
import { HistoryCourses } from "./HistoryCourses";
import { useLearning } from "@/app/hooks/useLearning";
import { CourseLevel } from "@/app/types";

export function CreateCourse() {
  const {
    topic,
    setTopic,
    level,
    setLevel,
    duration,
    setDuration,
    handleGenerateCourse,
    loading,
  } = useLearning();

  return (
    <DashboardSection
      id=""
      header={
        <SectionHeader
          title="Aprendizaje"
          description="Crea un plan de estudio adaptado a tu objetivo y ritmo."
          icon={GraduationCap}
          color="violet"
        />
      }
    >
      <label className="block mx-4 mt-4">
        <textarea
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          rows={4}
          placeholder="Ej: Quiero aprender React desde fundamentos hasta crear aplicaciones completas."
          className="w-full resize-none rounded-lg border border-neutral-600 bg-transparent px-3 py-3 text-base text-neutral-200 outline-none transition placeholder:text-neutral-500 focus:border-violet-500/60"
        />
      </label>

      <div className="mx-4 mb-4 mt-2 grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-neutral-300">
            Duración
          </span>

          <div className="flex items-center gap-2">
            <input
              type="text"
              inputMode="numeric"
              value={duration}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value === "") {
                  setDuration("");
                  return;
                }
                const number = Number(value);
                if (number <= 12) {
                  setDuration(value);
                }
              }}
              placeholder="6"
              maxLength={2}
              className="w-12 h-11 min-w-0 rounded-lg border border-neutral-600 bg-transparent text-center text-base text-neutral-300 outline-none transition placeholder:text-neutral-500 focus:border-violet-500/60"
            />
            <span className="text-base text-neutral-500">Sessiones</span>
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-neutral-300">
            Nivel
          </span>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as CourseLevel)}
            className="h-11 w-fit cursor-pointer rounded-lg border border-neutral-600 bg-neutral-800 px-3 text-base text-neutral-500 outline-none transition focus:border-violet-500/60"
          >
            <option value="basic">Básico</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
          </select>
        </label>

        <button
          type="button"
          onClick={handleGenerateCourse}
          disabled={!topic.trim() || !duration.trim() || loading}
          className="mt-7 flex h-11 cursor-pointer items-center gap-2 rounded-lg border border-neutral-500 bg-violet-500 px-4 text-base font-medium text-white transition hover:bg-violet-600 disabled:opacity-30"
        >
          <Sparkles size={20} />
          {loading ? "Generando..." : "Generar plan"}
        </button>
        <div className="sm:col-span-3">
          <HistoryCourses />
        </div>
      </div>
    </DashboardSection>
  );
}

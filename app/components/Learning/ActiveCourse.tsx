import {
  BookOpen,
  Clock3,
  Expand,
  GraduationCap,
  SquarePlus,
} from "lucide-react";
import { useState } from "react";
import { DashboardSection } from "../Ui/DashboardSection";
import { SectionHeader } from "../Ui/SectionHeader";
import { ModalCourse } from "./ModalCourse";
import { useLearning } from "@/app/hooks/useLearning";
import { SectionActionButton } from "../Ui/SectionActionButton";

export function ActiveCourse() {
  const [isOpen, setIsOpen] = useState(false);

  const { activeCourse, selectedSession, handleResetLearning } = useLearning();

  const currentPosition = selectedSession?.position ?? 1;

  return (
    <DashboardSection
      id="learning"
      button={
        <SectionActionButton
          onClick={handleResetLearning}
          icon={SquarePlus}
          color="violet"
        />
      }
      header={
        <SectionHeader
          title="Aprendizaje"
          description="Sigue avanzando en tu plan y completa cada etapa a tu ritmo."
          icon={GraduationCap}
          color="violet"
        />
      }
    >
      <div className="mx-4 mt-4 rounded-xl border border-neutral-700 bg-neutral-900/40 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-xl font-medium text-neutral-200">
              {activeCourse?.title}
            </h3>

            <div className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
              <Clock3 size={17} className="text-violet-400" />

              <span>
                Sesión {currentPosition} de {activeCourse?.totalSessions}
              </span>
            </div>
          </div>

          <span className="shrink-0 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400">
            En curso
          </span>
        </div>
      </div>

      <div className="mx-4 mt-4 rounded-xl border border-neutral-700 bg-neutral-800/30 p-5">
        <span className="text-base font-medium text-violet-400">
          Sesión {currentPosition}
        </span>

        <h4 className="mt-1 text-lg font-medium text-neutral-200">
          {selectedSession?.title}
        </h4>

        <div className="mt-4">
          <div className="flex items-center gap-2 text-neutral-300">
            <BookOpen size={19} className="text-violet-400" />

            <span className="text-base font-medium">
              Material de aprendizaje
            </span>
          </div>

          <p className="mt-3 text-base leading-7 text-neutral-400">
            {selectedSession?.description}
          </p>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="mt-4 flex cursor-pointer items-center gap-2 text-base font-medium text-violet-400 transition hover:text-violet-300"
          >
            <Expand size={18} />
            Ver material completo
          </button>
        </div>
      </div>

      <ModalCourse isOpen={isOpen} setIsOpen={setIsOpen} />
    </DashboardSection>
  );
}

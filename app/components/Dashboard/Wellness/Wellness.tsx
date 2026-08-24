"use client";

import { checkInQuestions } from "@/app/constants";
import { useEffect, useState } from "react";
import { CheckInBlock } from "./CheckInBlock";
//import { PlanBlock } from "./PlanBlock";
import { EmptyPlanBlock } from "./EmptyPlanBlock";

export type PlanTaskStatus = "pending" | "completed" | "rejected";

export type PlanTask = {
  id: number;
  title: string;
  day: number;
  status: PlanTaskStatus;
};

// const initialPlanTasks: PlanTask[] = [
//   {
//     id: 1,
//     title: "Salir a tomar fotos con un amigo",
//     day: 1,
//     status: "completed",
//   },
//   {
//     id: 2,
//     title: "Caminar 30 minutos sin teléfono",
//     day: 2,
//     status: "completed",
//   },
//   {
//     id: 3,
//     title: "Ordenar un espacio de la casa",
//     day: 3,
//     status: "rejected",
//   },
//   {
//     id: 4,
//     title: "Llamar a alguien cercano",
//     day: 4,
//     status: "pending",
//   },
//   {
//     id: 5,
//     title: "Preparar una comida tranquila",
//     day: 5,
//     status: "pending",
//   },
//   {
//     id: 6,
//     title: "Salir a caminar y tomar aire",
//     day: 6,
//     status: "pending",
//   },
//   {
//     id: 7,
//     title: "Planificar algo agradable para la próxima semana",
//     day: 7,
//     status: "pending",
//   },
// ];

export function Wellness() {
  // const [tasks] =
  //   useState<PlanTask[]>(initialPlanTasks);

  const [answer, setAnswer] = useState("");
  const [randomQuestion, setRandomQuestion] = useState("");

  useEffect(() => {
    const question =
      checkInQuestions[Math.floor(Math.random() * checkInQuestions.length)];

    setRandomQuestion(question);
  }, []);
  // const handleStatusChange = (
  //   id: number,
  //   status: PlanTaskStatus
  // ) => {
  //   setTasks((current) =>
  //     current.map((task) =>
  //       task.id === id
  //         ? {
  //             ...task,
  //             status:
  //               task.status === status
  //                 ? "pending"
  //                 : status,
  //           }
  //         : task
  //     )
  //   );
  // };

  // const completedTasks =
  //   tasks.filter(
  //     (task) =>
  //       task.status === "completed"
  //   ).length;

  // const progress = Math.round(
  //   (completedTasks / tasks.length) * 100
  // );
  return (
    <div
      className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2"
      id="wellness"
    >
      <CheckInBlock
        question={randomQuestion}
        answer={answer}
        setAnswer={setAnswer}
      />

      {/* <PlanBlock
        tasks={tasks}
        progress={progress}
        onStatusChange={
          handleStatusChange
        }
      /> */}
      <EmptyPlanBlock />
    </div>
  );
}

import type { AnimationGeneratorType } from "motion"

export const BASE_TRANSITION = {
  duration: 0.15,
  type: "spring" as AnimationGeneratorType,
  stiffness: 200,
  damping: 15,
}

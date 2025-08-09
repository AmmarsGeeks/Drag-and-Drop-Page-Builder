import { MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"

export const useFormBuilderSensors = () => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 }, // 10px
  })

  // mobile devices
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 300, tolerance: 5 }, // 300ms, 5px
  })

  return useSensors(mouseSensor, touchSensor)
}

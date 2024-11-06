export function useCssHandles(input) {
  const acc = {}

  input.forEach((value) => {
    acc[value] = value
  })

  return {
    handles: acc,
    withModifiers: (base, modifier) => {
      return modifier ? `${base}--${modifier}` : input
    },
  }
}

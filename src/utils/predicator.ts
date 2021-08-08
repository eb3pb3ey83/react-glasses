export default function predicator<paramsType>(params: paramsType) {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => Boolean(value)))
}

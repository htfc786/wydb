interface exercise {
  title: string
  subtitle: object
  content: wyContent
}

interface wySentencePart {
  o: string // original
  t: string // translation
  extra?: object
}

type wySentence = wySentencePart[]

type wyContent = wySentence[]

export { exercise, wyContent, wySentence, wySentencePart }

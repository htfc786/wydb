interface exercise {
  title: string
  subtitle: object
  content: exerciseContent[]
}

interface exerciseSentence {
  type?: string
  original: exerciseContent
  translation?: exerciseContent
  connections?: exerciseContentConnection[]
}

interface exerciseContent {
  text?: string
  tokens?: exerciseContentToken[]
}

interface exerciseContentToken {
  id: string
  c: string // char
}

interface exerciseContentConnection {
  type: 'combine'
  from: {
    start: string
    end: string
  }[]
  to: {
    start: string
    end: string
  }[]
}

export {
  exercise,
  exerciseSentence,
  exerciseContent,
  exerciseContentToken,
  exerciseContentConnection,
}

import request from '../util/request'

const delay = (millisecond) => {
  return new Promise((resolve) => {
    setTimeout(resolve, millisecond)
  })
}

export default {
  namespace: 'puzzlecards',

  state: {
    data: [],
    counter: 0
  },

  effects: {
    *queryInitCards(_, sagaEffects) {
      const { call, put } = sagaEffects
      const endpointUrl = 'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke'

      const puzzle = yield call(request, endpointUrl)
      yield put({ type: 'addNewCard', payload: puzzle })

      yield call(delay, 3000)

      const puzzle2 = yield call(request, endpointUrl)
      yield put({ type: 'addNewCard', payload: puzzle2 })
    }
  },

  reducers: {
    addNewCard(state, { payload: newCard }) {
      const nextCounter = state.counter + 1
      const newCardWithId = { id: nextCounter, ...newCard }
      const nextData = state.data.concat(newCardWithId)
      return {
        data: nextData,
        counter: nextCounter
      }
    }
  }
}

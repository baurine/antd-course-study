import request from '../util/request'
import { message } from 'antd'

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
      const endpointUrl = '/dev/random_joke'

      try {
        const puzzle = yield call(request, endpointUrl)
        yield put({ type: 'addNewCard', payload: puzzle })

        yield call(delay, 3000)

        const puzzle2 = yield call(request, endpointUrl)
        yield put({ type: 'addNewCard', payload: puzzle2 })
      } catch (e) {
        message.error('数据获取失败!')
      }
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

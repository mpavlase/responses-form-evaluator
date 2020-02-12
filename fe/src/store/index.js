import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    responses: {
      0: {
        response: [
          {
            id: 1,
            question: 'ot1',
            answer: '...0'
          },
          {
            id: 2,
            question: 'ot2',
            answer: 'odpoved 20'
          },
          {
            id: 3,
            question: 'ot3',
            answer: 'odpov30'
          },
          {
            id: 4,
            question: 'ot4',
            answer: 'odpov40'
          }
        ],
        votes: {
          jana: {
            vote: 'no',
            comment: 'ee, ne'
          },
          tonda: {
            vote: 'no',
            comment: 'takove nechceme'
          }
        }
      },
      1: {
        response: [
          {
            id: 1,
            question: 'ot1',
            answer: '...1'
          },
          {
            id: 2,
            question: 'ot2',
            answer: 'odpoved 21'
          },
          {
            id: 3,
            question: 'ot3',
            answer: 'odpov31'
          },
          {
            id: 4,
            question: 'ot4',
            answer: 'odpov41'
          }
        ],
        votes: {
          jana: {
            vote: 'yes',
            comment: 'jooo'
          },
          tonda: {
            vote: 'no',
            comment: 'takove nechceme'
          }
        }
      },
      2: {
        response: [
          {
            id: 1,
            question: 'ot1',
            answer: '...2'
          },
          {
            id: 2,
            question: 'ot2',
            answer: 'odpoved 22'
          },
          {
            id: 3,
            question: 'ot3',
            answer: 'odpov32'
          },
          {
            id: 4,
            question: 'ot4',
            answer: 'odpov42'
          }
        ],
        votes: {
          jana: {
            vote: 'no',
            comment: 'jooo'
          },
          tonda: {
            vote: 'yes',
            comment: 'takove nechceme'
          }
        }
      },
      3: {
        response: [
          {
            id: 1,
            question: 'ot1',
            answer: '...3'
          },
          {
            id: 2,
            question: 'ot2',
            answer: 'odpoved 23'
          },
          {
            id: 3,
            question: 'ot3',
            answer: 'odpov33'
          },
          {
            id: 4,
            question: 'ot4',
            answer: 'odpov43'
          }
        ],
        votes: {
          jana: {
            vote: 'yes',
            comment: 'jooo'
          },
          tonda: {
            vote: 'no',
            comment: 'takove nechceme'
          }
        }
      }
    },
    hiddenQuestions: [],
    name: '[myname]',
    voteOptions: ['yes', 'no'],
    currentResponseId: 0
  },
  mutations: {
    setComment (state, { id, comment }) {
      if (state.responses[id].votes[state.name] === undefined) {
        Vue.set(state.responses[id].votes, state.name, {})
      }
      Vue.set(state.responses[id].votes[state.name], 'comment', comment)
    },
    setVote (state, { id, vote }) {
      if (state.responses[id].votes[state.name] === undefined) {
        Vue.set(state.responses[id].votes, state.name, {})
      }
      Vue.set(state.responses[id].votes[state.name], 'vote', vote)
    },
    toggleQuestionVisibility (state, question) {
      // window.console.log(`toggle ${id}, ${state.hiddenQuestions.entries()}`)
      // window.console.debug(state.hiddenQuestions)

      const internalSet = new Set(state.hiddenQuestions)
      const item = question.id

      if (internalSet.has(item)) {
        internalSet.delete(item)
      } else {
        internalSet.add(item)
      }

      state.hiddenQuestions = [...internalSet]
    },
    jumpBackward (state) {
      // window.console.log(this)
      if (!this.getters.canJumpBackward) {
        return false
      }

      state.currentResponseId--
    },
    jumpForward (state) {
      // window.console.log(this)
      if (!this.getters.canJumpForward) {
        return false
      }

      state.currentResponseId++
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    canJumpBackward (state) {
      // window.console.log(state)
      const ids = Object.keys(state.responses)
      const index = ids.indexOf(String(state.currentResponseId))
      const nextIndex = index - 1

      return nextIndex >= 0
    },
    canJumpForward (state) {
      const ids = Object.keys(state.responses)
      // window.console.log(state)
      // window.console.log(ids)
      const index = ids.indexOf(String(state.currentResponseId))
      if (index === -1) {
        return false
      }

      const nextIndex = index + 1

      return nextIndex < ids.length
    },
    isQuestionVisible (state) {
      return function (question) {
        const item = question.id
        const internalSet = new Set(state.hiddenQuestions)
        return !internalSet.has(item)
      }
    }
  }
})

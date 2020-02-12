<template>
  <div>
    <span @click="jumpBackward" v-show="canJumpBackward">jump to previous</span> |
    <span @click="jumpForward" v-show="canJumpForward">jump to next</span>

    <ul>
      <li v-for="item in response.response"
          v-bind:key="item.id"
          v-show="!isQuestionVisible(item)"
          @click="toggleQuestionVisibility(item)"
      >{{ item.question }}</li>
    </ul>

    <div v-for="item in response.response" v-bind:key="item.id" v-show="isQuestionVisible(item)">
      <span class="question" @click="toggleQuestionVisibility(item)">{{ item.question }}</span>
      <span class="answer">{{ item.answer }}</span>
    </div>

    <div>
      Votes:<br />
      <select v-model="vote">
        <option v-for="(item, id) in voteOptions" v-bind:key="id">{{ item }}</option>
      </select>
      <input v-model="comment">
      <ul>
        <li v-for="(item, id) in response.votes" v-bind:key="id">
          <span class="author">{{ id }}</span>
          <span class="vote" v-bind:class="item.vote">({{ item.vote }})</span>
          <span class="comment">{{ item.comment }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResponseDetail',
  methods: {
    jumpBackward () {
      if (this.canJumpBackward) {
        this.$store.commit('jumpBackward')
      }
    },
    jumpForward () {
      if (this.canJumpForward) {
        this.$store.commit('jumpForward')
      }
    },
    toggleQuestionVisibility (item) {
      this.$store.commit('toggleQuestionVisibility', item)
    },
    isQuestionVisible (item) {
      return  this.$store.getters.isQuestionVisible(item)
    }
  },
  props: {
    value: {
      get () {
        window.console.log('this.response')
        return this.response
      },
      set (newValue) {
        window.console.log('hodn')
        window.console.log(newValue)
      }
    }
  },
  computed: {
    response () {
      return this.$store.state.responses[this.value]
    },
    name: {
      get () {
        return this.$store.state.name
      }
    },
    voteOptions: {
      get () {
        return this.$store.state.voteOptions
      }
    },
    comment: {
      get () {
        const user = this.$store.state.name
        const comment = this.response.votes[user]?.comment
        return comment
      },
      set (newValue) {
        const payload = {
          id: this.value,
          comment: newValue
        }
        this.$store.commit('setComment', payload)
      }
    },
    vote: {
      get () {
        const user = this.$store.state.name
        const vote = this.response.votes[user]?.vote
        return vote
      },
      set (newValue) {
        const payload = {
          id: this.value,
          vote: newValue
        }
        this.$store.commit('setVote', payload)
      }
    },
    canJumpBackward () {
      return this.$store.getters.canJumpBackward
    },
    canJumpForward () {
      return this.$store.getters.canJumpForward
    },
    hiddenQuestions () {
      //console.log(this.$store.state.hiddenQuestions)
      return this.$store.state.hiddenQuestions
    }
  }
}
</script>

<style scoped>
.question {
  font-weight: bold;
  margin-right: 0.5em;
}

.answer {
  color: darkseagreen;
}

.author {
  font-weight: bold;
}

.vote {
  padding: 2px 5px;
}
.vote.yes {
  background-color: lime;
}
.vote.no {
  background-color: red;
}

.comment {
  font-style: italic;
}
</style>

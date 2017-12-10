<template>
  <div>
  <div class="rate-bar trott" v-if="optionValue.name == 'Trott'">
    <div class="title-bar">
        <img src="../assets/images/trott.png" class="emote-pic">
        <!-- <div>{{votes}} votes</div> -->
    </div>
    <div class="background">
      <div class="foreground" :style="{ 'width' : percent+'%' }"></div>
    </div>
  </div>

  <div class="rate-bar smith" v-else-if="optionValue.name == 'Smith'">
    <div class="title-bar">
        <img src="../assets/images/smith.png" class="emote-pic">
        <!-- <div>{{votes}} votes</div> -->
    </div>
    <div class="background">
      <div class="foreground" :style="{ 'width' : percent+'%' }"></div>
    </div>
  </div>

  <div class="rate-bar ross" v-else-if="optionValue.name == 'Ross'">
    <div class="title-bar">
        <img src="../assets/images/ross.png" class="emote-pic">
        <!-- <div>{{votes}} votes</div> -->
      </div>
      <div class="background">
        <div class="foreground" :style="{ 'width' : percent+'%' }"></div>
      </div>
  </div>

  </div>
</template>

<script>
export default {
  name: 'rate-bar',

  props: ['optionValue', 'voteData'],

  computed: {
    percent() {
        // https://github.com/muxy/overlay-app-rig/blob/master/docs/Vote.md#getting-votes
        if (this.voteData && this.voteData.specific) {
          // No one has voted, return 0
          if (this.voteData.count === 0) {
            return 0;
          }

          // The `specific` field in vote data holds the counts of votes 0-4
          return Math.floor(
            (this.voteData.specific[this.optionValue.id] / this.voteData.count) * 100
            );
        }
        return 0;
      },

      // return the number of votes for this item
      votes() {
        // https://github.com/muxy/overlay-app-rig/blob/master/docs/Vote.md#getting-votes
        if (this.voteData && this.voteData.specific) {
          return this.voteData.specific[this.optionValue.id];
        }
        return 0;
      }
    }
  };
  </script>

  <style lang="scss" scoped>
  @import url(//fonts.googleapis.com/css?family=Roboto:100,500);

    .rate-bar {
      display: flex;
      flex-direction: column;
      .title-bar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: white;
        font-weight: 100;
        font-size: 0.9rem;

        .emote-pic{
          max-width: 100%;
          max-height: 5em;
        }

      }
      .background {
        background-color: #6d6d6d;
        position: relative;
        .foreground {
          background-color: #fff;
          display: flex;
          justify-content: center;
          height: 5px;
          transition: width 0.5s;
        }
        span {
          position: absolute;
          top: 0;
          left: 50%;
          color: #5f5f5f;
          font-weight: 900;
          line-height: 2rem;

          // animate changes in the results
          transform: translateX(-50%);
        }
      }
    }



    .rate-bar.ross { 
      border: solid;
      border-color: #66b1ef
    }

    .rate-bar.smith { 
      border: solid;
      border-color: green;
    }

    .rate-bar.trott {
      border: solid 2px #d86243;
      border-radius: 3px;
    }
    </style>

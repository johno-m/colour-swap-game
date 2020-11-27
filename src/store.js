import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        board: [],
        backupBoard: [],
        activeScreen: 'new',
        moveCount: 0,
        game: {
            width: 5,
            difficulty: 5
        },
        gameTimeCounter: 0
    },
    getters: {
        board(state){
            return state.board
        },
        game(state){
            return state.game
        },
        difficulty(state){
            return state.game.difficulty
        },
        backupBoard(state){
            return state.backupBoard
        },
        activeScreen(state){
            return state.activeScreen
        },
        gameTimeCounter(state){
            return state.gameTimeCounter
        },
        moveCount(state){
            return state.moveCount
        }
    },
    mutations: {
        UPDATE_BOARD(state, actions) {
            actions.forEach((action) => {
                state.board.splice(action.index, 1, action.status)
            })
        },
        BUILD_BOARD(state, board) {
            state.board = board
        },
        RESET_GAME(state, options) {
            state.game = {
                width: options.width,
                difficulty: options.difficulty,
            }
            state.gameTimeCounter = 0
            state.moveCount = 0
        },
        RESET_BOARD(state) {
            console.log(state.backupBoard)
            state.board = state.backupBoard
        },
        SET_DIFFICULTY(state, difficulty) {
            state.game.difficulty = difficulty
        },
        SET_ACTIVE_SCREEN(state, screen) {
            state.activeScreen = screen
        },
        SET_BACKUP(state, backup) {
            state.backupBoard = []
            backup.forEach(status => {
                state.backupBoard.push(status)
            })
        },
        CLEAR_BOARD(state){
            state.board = []
        },
        SET_TIME_COUNTER(state, time){
            state.gameTimeCounter = parseInt(time)
        },
        SET_CLICK_COUNT(state, count){
            state.moveCount = count
        }

    },
    actions: {
        buildBoard({ commit }, board) {
            commit("BUILD_BOARD", board)
        },
        updateBoard({ commit }, actions) {
            commit("UPDATE_BOARD", actions)
        },
        setDifficulty({ commit }, difficulty) {
            commit("SET_DIFFICULTY", difficulty)
        },
        resetBoard({ commit }) {
            commit("RESET_BOARD")
        },
        startNewGame({ commit }, options) {
            commit("RESET_GAME", options)
        },
        setBackup({ commit }, backup){
            commit("SET_BACKUP", backup)
        },
        setActiveScreen({ commit }, screen){
            commit("SET_ACTIVE_SCREEN", screen)
        },
        clearBoard({ commit }){
            commit("CLEAR_BOARD")
        },
        setTimeCount({ commit }, time){
            commit("SET_TIME_COUNTER", time)
        },
        setClickCount({ commit }, count){
            commit("SET_CLICK_COUNT", count)
        }

   }
 });
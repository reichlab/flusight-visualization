import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import * as d3 from "d3";
import jsonValues from "../assets/data/values@1.json";

const ASSET_LOCATION = "../assets";

export interface State {
  values: Array<number>;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    values: [],
  },
  mutations: {
    setValues(state, values) {
      state.values = values;
    },
  },
  actions: {
    fetchValues({ commit }) {
      commit("setValues", jsonValues);
    },
  },
  modules: {},
});

export function useStore(): Store<State> {
  return baseUseStore(key);
}

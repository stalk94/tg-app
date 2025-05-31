import { createStore as create } from 'statekit-lite';

type ContextState = {

}

export const context = create({} as ContextState, {
    devtools: { name: 'ctx' },
    immer: true
});
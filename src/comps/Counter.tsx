import { Match, Switch } from "solid-js"
import CounterBloc, { e } from "../bloc/counter/bloc"
import { DecrementEvent, IncrementEvent } from "../bloc/counter/event"
import { CounterStatus } from "../bloc/counter/state"

export default function Counter() {
    return (
        <>
            <Switch fallback={ <div>no State</div> }>
                <Match when={ CounterBloc.stateGetter.status === CounterStatus.Added }>state: added</Match>
                <Match when={ CounterBloc.stateGetter.status === CounterStatus.Substract }>state: substracted</Match>
            </Switch>
            <div>{ CounterBloc.stateGetter.counterValue }</div>

            <div>
                <button onClick={ () => e(new IncrementEvent(1)) }>+</button>
            </div>

            <div>
                <button onClick={ () => e(new DecrementEvent(1)) }>-</button>
            </div>
        </>
    )
}

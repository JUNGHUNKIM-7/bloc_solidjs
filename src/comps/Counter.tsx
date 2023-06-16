import { Match, Switch } from "solid-js"
import CounterBloc, { e } from "../bloc/counter/bloc"
import { DecrementEvent, IncrementEvent } from "../bloc/counter/event"

export default function Counter() {
    return (
        <>
            <Switch fallback={ <div>no State</div> }>
                <Match when={ CounterBloc.eventGetter instanceof IncrementEvent }>state: added</Match>
                <Match when={ CounterBloc.eventGetter instanceof DecrementEvent }>state: substracted</Match>
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

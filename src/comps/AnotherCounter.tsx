import { Match, Switch } from "solid-js"
import CounterBloc, { CounterStatus, DecrementEvent, IncrementEvent } from "../bloc/counter/bloc"

export default function AnotherCounter() {
    const counterBloc = new CounterBloc()

    return (
        <div>
            <div>another councter</div>
            <Switch fallback={ <div>no State</div> }>
                <Match when={ counterBloc.state.status === CounterStatus.Added }>state: added</Match>
                <Match when={ counterBloc.state.status === CounterStatus.Substract }>state: substracted</Match>
            </Switch>

            <div>{ counterBloc.state.counterValue }</div>

            <div>
                <button onClick={ () => counterBloc.eventSink = new IncrementEvent(1) }>+</button>
            </div>

            <div>
                <button onClick={ () => counterBloc.eventSink = new DecrementEvent(1) }>-</button>
            </div>

        </div>
    )
}
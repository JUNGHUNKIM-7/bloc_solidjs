import { Match, Switch } from 'solid-js'
import ChildCounter from './ChildCounter'
import AnotherCounter from './AnotherCounter'
import { bloc } from '../bloc/bloc'
import { CounterStatus } from '../bloc/counter/state'
import { DecrementEvent, IncrementEvent } from '../bloc/counter/event'

export default function Counter() {
	return (
		<>
			<Switch fallback={<div>no State</div>}>
				<Match when={bloc.counterState.status === CounterStatus.Added}>
					state: added
				</Match>
				<Match
					when={bloc.counterState.status === CounterStatus.Substract}
				>
					state: substracted
				</Match>
			</Switch>

			<div>{bloc.counterState.counterValue}</div>

			<ChildCounter counterBloc={bloc} />

			<AnotherCounter />

			<div>
				<button
					onClick={() =>
						bloc.counterEventSink = new IncrementEvent(1)}
				>
					+
				</button>
			</div>

			<div>
				<button
					onClick={() =>
						bloc.counterEventSink = new DecrementEvent(1)}
				>
					-
				</button>
			</div>
		</>
	)
}

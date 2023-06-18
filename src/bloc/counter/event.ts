import { setCounter } from '../bloc'
import CounterState, { CounterStatus } from './state'

//Events
export default class CounterEvent {}

export class IncrementEvent implements CounterEvent {
	constructor(private counterValue: number) {}

	increment() {
		setCounter((prev) =>
			CounterState.copyWith(
				CounterStatus.Added,
				prev.counterValue + this.counterValue,
			)
		)
	}
}

export class DecrementEvent implements CounterEvent {
	constructor(private counterValue: number) {}

	decrement() {
		setCounter((prev) =>
			CounterState.copyWith(
				CounterStatus.Substract,
				prev.counterValue - this.counterValue,
			)
		)
	}
}

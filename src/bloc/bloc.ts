import { createSignal } from 'solid-js'
import CounterState, { CounterStatus } from './counter/state'
import CounterEvent, { DecrementEvent, IncrementEvent } from './counter/event'

//all signals, store...
export const [counter, setCounter] = createSignal<CounterState>(
	new CounterState(CounterStatus.Initial, 0),
	{
		equals(prev, next) {
			return prev.counterValue === next.counterValue &&
				prev.status === next.status
		},
	},
)

enum Repositories {
	Network = 0, // 0
	Configs, // 1 ..
}

//bloc only + repositories
//combine here
export default class Bloc {
	private constructor() {}
	private static _instance: Bloc
	private static _childrens: unknown[]

	private static getChild<T>(repositories: Repositories): T {
		return this._childrens[repositories] as T
	}

	static getInstance(children: unknown[]): Bloc {
		this._instance = new Bloc()
		this._childrens = children
		return this._instance
	}

	get counterState() {
		return counter()
	}

	set counterEventSink(e: CounterEvent) {
		if (e instanceof IncrementEvent) e.increment()
		else if (e instanceof DecrementEvent) e.decrement()
	}

	//get, set...
}

//repositories here
export const bloc = Bloc.getInstance([
	// repository singleton
])

import { splitProps } from 'solid-js'
import type Bloc from '../bloc/bloc'

interface ChildProps {
	counterBloc: Bloc
}

export default function ChildCounter(props: ChildProps) {
	const [local] = splitProps(props, ['counterBloc'])

	return (
		<div>
			<div>this is child</div>
			<div>{local.counterBloc.counterState.counterValue}</div>
		</div>
	)
}

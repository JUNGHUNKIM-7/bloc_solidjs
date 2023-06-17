import { splitProps } from "solid-js";
import type CounterBloc from "../bloc/counter/bloc"

interface ChildProps {
    counterBloc: CounterBloc;
}

export default function ChildCounter(props: ChildProps) {
    const [local] = splitProps(props, ["counterBloc"])

    return (
        <div>
            <div>this is another</div>
            <div>{ local.counterBloc.state.counterValue }</div>
        </div>
    )

}
import type { JSXElement } from "solid-js";
import type { TestProps, Wrapper } from "../types/types";


type Func = (prop: TestProps) => JSXElement

export default function Test2000(props: Wrapper) {
    const Props: Func = (props) => {
        return <div>{ props.age }</div>
    }


    return (
        <div>
            <div>this is test3</div>
            <div>{ props.children }</div>
        </div>
    )
}
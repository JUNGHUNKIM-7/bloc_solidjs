import type { JSXElement } from "solid-js";

export interface Wrapper {
    children: JSXElement
}

export interface TestProps extends Wrapper {
    title: string
    age: number
}
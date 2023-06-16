```
mutable list- for. i() - index subscribed list.

Can combine signal with property in store.

SetStore(primitive / function, key, value)

claaList={{ prop: signal() }}

const [Data] = CreateResource(getter - fn type not invoke, fetcher)
Data.loading : bool
Concept: Fetch + createEffect
```

# prop destructing 금지
- use mergeProps, separateProps
- use children(() => props.children)


# derived
```tsx
const double = () => coutner() * 2

```
# store
```tsx
const [user, setUser] = createStore({
    name: "Dave",
    age: 0
})
setUser("age", 1)
```

# default prop
```tsx
- astro
const props: MyComp = {
	title: "titles",
	age: 12,
};
---

<Layout title="Welcome to Astro.">
	<main>
		<Test {...props} client:load />

- tsx
export default function Test(prop: MyComp) {
    const { title, age } = mergeProps({ title: "default prop", age: 0 }, prop)
}
```

# sep prop with reactivity
```tsx
<Greeting greeting="Yo" name={name()} style="color: teal;" />

export default function Greeting(props) {
  const [local, others] = splitProps(props, ["greeting", "name"])
  return <h3 {...others}>{local.greeting} {local.name}</h3>
}
```

# effect vs createRenderEffect(first + reactive)
```tsx
createEffect(() => {
    if (loading()) {
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }
})

createMemo(() => (counter()))

vs

createRenderEffect(() => {
  console.log(counter())
})

setCounter(1)
setCounter(2)

//queueMicrotask 실행 시 run
queueMicrotask(() => {
  // 이제 `count = 2` 출력
  console.log("microtask");
  setCount(3);  // 즉시 `count = 3` 출력
  console.log("goodbye");
});
```

# control
```tsx
- for
//mutable
<For each={} fallback={<div>fallback</div>}>
{(item, index) => (
  <div>
    #{index()} {item} // index is reactive
  </div>
)}

//immutable
<Index each={state.list} fallback={<div>Loading...</div>}>
  {(item, index) => (
    <div>
      #{index} {item()} // index is fixed
    </div>
  )}
</Index>

- switch
<Switch fallback={<p>{x()} is between 5 and 10</p>}>
  <Match when={x() > 10}>
    <p>{x()} is greater than 10</p>
  </Match>
  <Match when={5 > x()}>
    <p>{x()} is less than 5</p>
  </Match>
</Switch>

- Conditional render with dynamic
const RedThing = () => <strong style="color: red">Red Thing</strong>;
const GreenThing = () => <strong style="color: green">Green Thing</strong>;
const BlueThing = () => <strong style="color: blue">Blue Thing</strong>;

//obj to dynamic comp
const options = {
  red: RedThing,
  green: GreenThing,
  blue: BlueThing
}
<Dynamic component={options[selected()]} />
```

# toggle
```tsx
const isSelected = createSelector(selectedId);
<For each={list()}>
  {(item) => <li classList={{ active: isSelected(item.id) }}>{item.name}</li>}
</For>;

<div classList={ { [style.active]: loading() } }>
```

# portal
- below document.body
- behave like z-index
```tsx
<Portal>
  <div class="popup">
    <h1>Popup</h1>
    <p>Some text you might need for something or other.</p>
  </div>
</Portal>
```

# err handling / if throw err in component
- throw Error("err")
```tsx
const Broken = (props) => {
  throw new Error("Oh No");
  return <>Never Getting Here</>
}

<Comp1>
//non block error
<ErrorBoundary fallback={err => err}>
    <Broken />
</ErrorBoundary>
<Comp2>
```

# onMount + onCleanup(LifeCycle)
- only run on client side!

# conditional
- use classList
- double curly brace, { {cssName: COND} }

```tsx
<button
  classList={{selected: current() === 'foo'}}
```

# ref
```tsx
let htmlElem

<tag ref={htmlElem}>
```

# component nesting (children) - useContext replacement
- parent hold state,
- access state in children
- children

children(() => props.children)
```tsx
export default function Wrappper(prop: { children: ChildNode }) {
    const c = children(() => prop.children)
    return (
        <div>
            wrapper node
            <div>{ c() }</div>
        </div>
    )
}

export default function Child() {
    return (
        <div>child</div>
    )
}

- 자식 컴포넌트 상태 변화(share)
- updator :
createEffect(() => c().forEach(item => item.style.color = props.color))
```

# commit multiple at once (batch)
```tsx
batch(() => {
  setFirstName(firstName() + "n");
  setLastName(lastName() + "!");
})
```

# createReaction - run only once, exclusive way
```tsx
const [s, set] = createSignal("start");

//아래의 EFFECT 실행!!! once!
const track = createReaction(() => console.log("something"));

// 다음에 s가 변경되면 리액션을 실행합니다. - make dependency
track(() => s());
set("end"); // "something"
set("final"); // 리액션은 첫 업데이트에서만 실행되기 때문에 작동하지 않으며, track 을 다시 호출해야 합니다.
```

# on/untrack - include/exclude only(signal)
```tsx
createEffect(on(a, (a) => {
  a 가 변하면, 아래 함수 실행
  console.log(a, b());
}, { defer: true }));
# untrack - off signal - untrack

a / b is signal
createEffect(() => {
  console.log(a(), untrack(b))
});
```

# Asyncronous
# lazy
```tsx
const Greeting = lazy(() => import("./greeting"));
```

# createResource
```tsx
const [data] = createResource<User[]>(async () => {
    return [{ name: "John" }, { name: "Dave" }]
}, { initialValue: [] as User[] })

const [user] = createResource(userId, fetchUser); //userId is dependency, changed, run fetchUser

const [user, {mutate - ??, refresh - refresh?}]

- PROPERTY
data.loading
data.error
```

# delayed loading(placeholder ) -> for lazy, createResource
```tsx
<Suspense fallback={<p>Loading...</p>}>
  <Greeting name="Jake" />
</Suspense>
```

# nested suspense or multiple suspend (rendering order ..)
```tsx
<Suspense fallback={<h1>Loading...</h1>}>
  <ProfilePage user={user()} posts={posts()} trivia={trivia()} />
</Suspense>

- ProfilePage (runBlocking + mutlple launches + join all)
revealOrder="forward"(정방향)/"backward"(역방향) / "together"(join all)
<SuspenseList revealOrder="together" tail="collapsed">
  <ProfileDetails user={props.user} />
  <Suspense fallback={<h2>Loading posts...</h2>}>
    <ProfileTimeline posts={props.posts} />
  </Suspense>
  <Suspense fallback={<h2>Loading fun facts...</h2>}>
    <ProfileTrivia trivia={props.trivia} />
  </Suspense>
</SuspenseList>
```

# handle form
```tsx
<form action="" method='post' onSubmit={ (e: Event) => {
  e.preventDefault()
  const form = e.target as HTMLFormElement
  const formData = new FormData(form)
  const name = formData.get("name")
  console.log(name)
  setLoading(true)
} }>
  <input type="text" name="name" />
  <button formaction="" aria-busy={ loading() }>submit button</button>
</form>
```
# Enzyme

+ debug([options]) => String
+ tap(intercepter) => Self

```
const result = shallow((
  <ul>
    <li>xxx</li>
    <li>yyy</li>
    <li>zzz</li>
  </ul>
)).find('li')
  .tap(n => console.log(n.debug()))
  .map(n => n.text());
```

## Array
### 查
+ at(index) => ShallowWrapper
+ get(index) => ReactElement
+ first() => ShallowWrapper
+ last() => ShallowWrapper

### 遍历
+ every(selector) => Boolean

```
component.find('div').every('img') // false
component.find('div').every('div') // true
component.find('div').every('.wrap') // false
```

+ everyWhere(fn) => Boolean

```
component.find('div').everyWhere(n => n.hasClass('wrap')) // false
component.find('div').everyWhere(n => n.type() == 'div') // true
```

+ some(selector) => Boolean

```
const wrapper = shallow((
  <div>
    <div className="foo qoo" />
    <div className="foo boo" />
    <div className="foo hoo" />
  </div>
));
expect(wrapper.find('.foo').some('.qoo')).to.equal(true);
expect(wrapper.find('.foo').some('.foo')).to.equal(true);
expect(wrapper.find('.foo').some('.bar')).to.equal(false);
```

+ someWhere(fn) => Boolean

```
const wrapper = shallow((
  <div>
    <div className="foo qoo" />
    <div className="foo boo" />
    <div className="foo hoo" />
  </div>
));
expect(wrapper.find('.foo').someWhere(n => n.hasClass('qoo'))).to.equal(true);
expect(wrapper.find('.foo').someWhere(n => n.hasClass('foo'))).to.equal(true);
expect(wrapper.find('.foo').someWhere(n => n.hasClass('bar'))).to.equal(false);
```

+ forEach(fn) => Self

```
const wrapper = shallow((
  <div>
    <div className="foo bax" />
    <div className="foo bar" />
    <div className="foo baz" />
  </div>
));

wrapper.find('.foo').forEach((node) => {
  expect(node.hasClass('foo')).to.equal(true);
});
```

+ map(fn) => Array<Any>

```
const wrapper = shallow((
  <div>
    <div className="foo">bax</div>
    <div className="foo">bar</div>
    <div className="foo">baz</div>
  </div>
));

const texts = wrapper.find('.foo').map(node => node.text());
expect(texts).to.eql(['bax', 'bar', 'baz']);
```

+ reduce(fn[, initialValue]) => Any

```
function Foo() {
  return (
    <div>
      <Bar amount={2} />
      <Bar amount={4} />
      <Bar amount={8} />
    </div>
  );
}

const wrapper = shallow(<Foo />);
const total = wrapper.find(Bar).reduce((amount, n) => amount + n.prop('amount'), 0);
expect(total).to.equal(14);
```

+ reduceRight(fn[, initialValue]) => Any

### 筛选
+ filter(selector) => ShallowWrapper
+ filterWhere(fn) => ShallowWrapper
+ not(selector) => ShallowWrapper



### 复制
+ slice([begin[, end]]) => ShallowWrapper

```
const wrapper = shallow((
  <div>
    <div className="foo bax" />
    <div className="foo bar" />
    <div className="foo baz" />
  </div>
));
expect(wrapper.find('.foo').slice(1)).to.have.lengthOf(2);
expect(wrapper.find('.foo').slice(0, 2).at(1).hasClass('bar')).to.equal(true);
```

## Tree

###  查

+ find(selector) => ShallowWrapper
> 在渲染树中找到每一个返回true的节点
+ findWhere(fn) => ShallowWrapper:  finds very

+ exists([selector]) => Boolean

```
const wrapper = mount(<div className="some-class" />);
expect(wrapper.exists('.some-class')).to.equal(true);
expect(wrapper.find('.other-class').exists()).to.equal(false);
```

+ dive([options]) => ShallowWrapper

```
function Bar() {
  return (
    <React.Fragement>
      <div className="bar"/>
      <div className="in-bar" />
    </React.Fragement>
  );
}

function Foo() {
  return (
    <div>
      <Bar />
    </div>
  );
}
```

```
wrapper.find(Bar).dive().get(0)
```
![image](https://user-images.githubusercontent.com/12481194/63337803-32f43a80-c374-11e9-9ced-370452427243.png)


```
wrapper.find(Bar).dive().find('.bar').get(0)
```

#### 包含
+ contains(nodeOrNodes) => Boolean
+ containsAllMatchingElements(patternNodes) => Boolean
+ containsAnyMatchingElements(patternNodes) => Boolean
+ containsMatchingElement(patternNode) => Boolean

#### 子节点
![image](https://user-images.githubusercontent.com/12481194/63325109-13511800-c35c-11e9-9ee0-3b081b7552d0.png)

+ childAt(index) => ShallowWrapper
> 通过索引寻找某节点的子节点
![image](https://user-images.githubusercontent.com/12481194/63325403-9d997c00-c35c-11e9-89cf-7ee6c8eab338.png)


+ children([selector]) => ShallowWrapper
> 返回所有节点的子节点

```
const component = shallow(<Header {...props} />);
component.find('div').children().length // 2
```

![image](https://user-images.githubusercontent.com/12481194/63325519-e5200800-c35c-11e9-8680-dfc4f1ce45ba.png)

#### 父节点

+ closet(selector) => ShallowWrapper

```
component.find('img').closest('div').get(0)
```

+ parent() => ShallowWrapper

```
component.find('img').parent().get(0)
```

+ parents() => ShallowWrapper

```
component.find('img').parents().length  // 3
component.find('img').parents('.logo').length // 1
```


![image](https://user-images.githubusercontent.com/12481194/63326147-3086e600-c35e-11e9-8f1e-7cea4bfe96b7.png)

### 比较
+ equals(node) => Boolean

```
const wrapper = shallow(<MyComponent />);
expect(wrapper.equals('<div className="foo bar" />').to.equal(true);
```

## Node

+ text() => String

```
const wrapper = shallow(<div><b>important</b></div>);
expect(wrapper.text()).to.equal('important'); // true
```

```
const wrapper = shallow(<div><Foo /><b>important</b></div>);
expect(wrapper.text()).to.equal('<Foo />important'); // true
```

+ .html() => String

```
function Foo() {
  return (<div className="in-foo" />);
}
```

```
function Bar() {
  return (
    <div className="in-bar">
      <Foo />
    </div>
  );
}
```

```
const wrapper = shallow(<Bar />);
expect(wrapper.html()).to.equal('<div class="in-bar"><div class="in-foo"></div></div>');
expect(wrapper.find(Foo).html()).to.equal('<div class="in-foo"></div>');
```

```
const wrapper = shallow(<div><b>important</b></div>);
expect(wrapper.html()).to.equal('<div><b>important</b></div>');
```

+ is(selector) => Boolean

```
const wrapper = shallow(<div className="some-class other-class" />);
expect(wrapper.is('.some-class')).to.equal(true);
```

+ type() => String | Function | null

```
function Foo() {
  return <div />;
}
const wrapper = shallow(<Foo />);
expect(wrapper.type()).to.equal('div');
```

```
function Foo() {
  return (
    <div>
      <button type="button" className="btn">Button</button>
    </div>
  );
}
const wrapper = shallow(<Foo />);
expect(wrapper.find('.btn').type()).to.equal('button');
```

```
function Foo() {
  return <Bar />;
}
const wrapper = shallow(<Foo />);
expect(wrapper.type()).to.equal(Bar);
```

```
function Null() {
  return null;
}
const wrapper = shallow(<Null />);
expect(wrapper.type()).to.equal(null);
```

+ hasClass(className) => Boolean



## Compoennt

+ prop(key) => Any
+ props() => Object
+ state([key]) => Any

```
// can only be called on class components
const wrapper = shallow(<MyComponent />);
expect(wrapper.state().foo).to.equal(10);
expect(wrapper.state('foo')).to.equal(10);
```

+ context([key]) => Any

```
const wrapper = shallow(
  <MyComponent />,
  { context: { foo: 10 } },
);
expect(wrapper.context().foo).to.equal(10);
expect(wrapper.context('foo')).to.equal(10);
```

+ key() => String

```
const wrapper = shallow((
  <ul>
    {['foo', 'bar'].map(s => <li key={s}>{s}</li>)}
  </ul>
)).find('li');
expect(wrapper.at(0).key()).to.equal('foo');
expect(wrapper.at(1).key()).to.equal('bar');
```

+ name() => String|null

```
const wrapper = shallow(<div />);
expect(wrapper.name()).to.equal('div'); // true
```

```
function Foo() {
  return (
    <div>
      123
    </div>
  );
}
function SomeWrappingComponent() {
  return <Foo />;
}
const wrapper = shallow(<SomeWrappingComponent />);
expect(wrapper.name()).to.equal('Foo'); // true
```

```
Foo.displayName = 'A cool custom name';
function SomeWrappingComponent() {
  return <Foo />;
}
const wrapper = shallow(<SomeWrappingComponent />);
expect(wrapper.name()).to.equal('A cool custom name'); // true
```

+ setProps(nextProps[, callback]) => Self

```
import sinon from 'sinon';

const spy = sinon.spy(MyComponent.prototype, 'componentWillReceiveProps');

const wrapper = shallow(<MyComponent foo="bar" />);
expect(spy).to.have.property('callCount', 0);
wrapper.setProps({ foo: 'foo' });
expect(spy).to.have.property('callCount', 1);
```

+ setState(nextState[, callback]) => Self

+ setContext(context) => Self

```
import React from 'react';
import PropTypes from 'prop-types';

function SimpleComponent(props, context) {
  const { name } = context;
  return <div>{name}</div>;
}
SimpleComponent.contextTypes = {
  name: PropTypes.string,
};
```

```
const context = { name: 'foo' };
const wrapper = shallow(<SimpleComponent />, { context });
expect(wrapper.text()).to.equal('foo');
wrapper.setContext({ name: 'bar' });
expect(wrapper.text()).to.equal('bar');
wrapper.setContext({ name: 'baz' });
expect(wrapper.text()).to.equal('baz');
```

+ render() => CheerioWrapper

```
function Foo() {
  return (<div className="in-foo" />);
}
```

```
function Bar() {
  return (
    <div className="in-bar">
      <Foo />
    </div>
  );
}
```

```
const wrapper = shallow(<Bar />);
expect(wrapper.find('.in-foo')).to.have.lengthOf(0);
expect(wrapper.find(Foo).render().find('.in-foo')).to.have.lengthOf(1);
```

+ renderProp(propName)(...args) => ShallowWrapper


```
class Mouse extends React.Component {
  constructor() {
    super();
    this.state = { x: 0, y: 0 };
  }

  render() {
    const { render } = this.props;
    return (
      <div
        style={{ height: '100%' }}
        onMouseMove={(event) => {
          this.setState({
            x: event.clientX,
            y: event.clientY,
          });
        }}
      >
        {render(this.state)}
      </div>
    );
  }
}

Mouse.propTypes = {
  render: PropTypes.func.isRequired,
};
```

```
const App = () => (
  <div style={{ height: '100%' }}>
    <Mouse
      render={(x = 0, y = 0) => (
        <h1>
          The mouse position is ({x}, {y})
        </h1>
      )}
    />
  </div>
);
```

```
// testing with no arguments
const wrapper = shallow(<App />)
  .find(Mouse)
  .renderProp('render')();

expect(wrapper.equals(<h1>The mouse position is 0, 0</h1>)).to.equal(true);
```

```
// testing with multiple arguments
const wrapper = shallow(<App />)
  .find(Mouse)
  .renderProp('render')(10, 20);

expect(wrapper.equals(<h1>The mouse position is 10, 20</h1>)).to.equal(true);
```

+ getWrappingComponent() => ShallowWrapper

```
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import store from './my/app/store';
import mockStore from './my/app/mockStore';

function MyProvider(props) {
  const { children, customStore } = props;

  return (
    <Provider store={customStore || store}>
      <Router>
        {children}
      </Router>
    </Provider>
  );
}
MyProvider.propTypes = {
  children: PropTypes.node,
  customStore: PropTypes.shape({}),
};
MyProvider.defaultProps = {
  children: null,
  customStore: null,
};

const wrapper = shallow(<MyComponent />, {
  wrappingComponent: MyProvider,
});
const provider = wrapper.getWrappingComponent();
provider.setProps({ customStore: mockStore });
```

+ getElement() => ReactElement
+ getElements() => Array<ReactElement>

+ shallow([options]) => ShallowWrapper
+ mount([options]) => ShallowWrapper
+ unmount() => Self
+ update() => Self

+ isEmptyRender() => Boolean

## Event

+ simulate(event[, ...args]) => Self

```
class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <div className={`clicks-${count}`}>
          {count} clicks
        </div>
        <a href="url" onClick={() => { this.setState({ count: count + 1 }); }}>
          Increment
        </a>
      </div>
    );
  }
}

const wrapper = shallow(<Foo />);

expect(wrapper.find('.clicks-0').length).to.equal(1);
wrapper.find('a').simulate('click');
expect(wrapper.find('.clicks-1').length).to.equal(1);
```

+ simulateError(error) => Self

```
function Something() {
  // this is just a placeholder
  return null;
}

class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    const { spy } = this.props;
    spy(error, info);
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    return (
      <React.Fragment>
        {hasError ? 'Error' : children}
      </React.Fragment>
    );
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  spy: PropTypes.func.isRequired,
};

const spy = sinon.spy();
const wrapper = shallow(<ErrorBoundary spy={spy}><Something /></ErrorBoundary>);
const error = new Error('hi!');
wrapper.find(Something).simulateError(error);

expect(wrapper.state()).to.have.property('hasError', true);
expect(spy).to.have.property('callCount', 1);
expect(spy.args).to.deep.equal([
  error,
  {
    componentStack: `
    in Something (created by ErrorBoundary)
    in ErrorBoundary (created by WrapperComponent)
    in WrapperComponent`,
  },
]);
```
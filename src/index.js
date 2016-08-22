import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {Floaty, floatyReducer} from 'floaty/lib';
import base from 'floaty/lib/base';
import theme from './theme';
import createStore from 'redux/src/createStore';

Object.keys(theme).forEach(key => {
    base[key] = classNames(base[key], theme[key]);
});

const layout = {
    type: 'row',
    items: [
        {
            type: 'stack',
            names: [
                'Foo'
            ],
            items: [
                {
                    type: 'prop-ref',
                    name: 'button'
                }
            ]
        }, {
            type: 'stack',
            names: [
                'a', 'b', 'c'
            ],
            items: [
                {
                    content: 'Hello'
                }, {
                    content: 'world!'
                }, {
                    type: 'row',
                    items: [
                        {
                            content: 'Foo'
                        }, {
                            content: 'Bar'
                        }
                    ]
                }
            ]
        }
    ]
};
const store = createStore(floatyReducer, layout, window.devToolsExtension && window.devToolsExtension());

class App extends React.Component {
    state = {
        amount: 0,
        message: 'Click me'
    };

    componentWillMount() {
        this.subscription = store.subscribe(this.forceUpdate.bind(this));
    }

    componentWillUnmount() {
        store.unsubscribe(this.subscription);
    }

    handleAddClick() {
        this.setState({amount: this.state.amount + 1});
    }

    handleRemoveClick() {
        this.setState({amount: this.state.amount - 1});
    }

    handleButtonClick() {
        const list = ['Ouch', 'Bugger', 'Yikes', 'Get off me', 'Stop touching me'];
        const message = list[Math.floor(Math.random() * list.length)];
        this.setState({message});
    }

    renderRowItems() {
        const rowItems = [];
        for (let i = 0; i < this.state.amount; i++) {
            rowItems.push(
                <RowItem key={i}>
                    <button onClick={this.handleRemoveClick.bind(this)}>Remove me</button>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo accumsan iaculis. Pellentesque porta tempus nulla quis cursus. Vivamus quis ipsum ut sem facilisis scelerisque eu quis felis. Nam nec convallis libero. Aenean egestas velit magna, at pulvinar justo cursus non. Morbi congue sem quis porttitor varius. Phasellus luctus metus vel odio mollis, ac hendrerit ante egestas. Aliquam erat volutpat. Vestibulum nec purus ultricies, lobortis justo vitae, lacinia purus. Curabitur ut blandit libero. Sed non nisi in ipsum ultrices consectetur. Phasellus ultricies volutpat leo vel bibendum. Pellentesque iaculis, mi non commodo euismod, mi tellus ultricies sapien, vel ullamcorper turpis metus vel magna.</p>
                    <p>Fusce magna augue, euismod quis tempus et, scelerisque non ligula. Curabitur varius nulla eget tellus congue aliquet. Nam vel auctor ex. Duis viverra eleifend augue, laoreet iaculis lorem viverra in. Maecenas imperdiet sapien id varius dictum. Vivamus id malesuada sem. Integer sed imperdiet leo, id pharetra sem. Quisque luctus neque at placerat laoreet. Nulla viverra accumsan odio, id dapibus diam facilisis cursus.</p>
                    <p>Cras vestibulum pretium sapien ac aliquam. Cras elementum aliquet quam. Vivamus aliquam malesuada rhoncus. Duis venenatis feugiat dignissim. Aenean maximus diam quam, sit amet luctus mauris aliquet in. Aliquam libero sapien, dictum quis dui non, dictum vehicula elit. Fusce id auctor massa. Fusce sed tincidunt lectus. Sed blandit erat non ante imperdiet facilisis eu sed mauris.</p>
                    <p>Fusce ac enim sed ipsum ornare tincidunt. Duis molestie fermentum risus eu dignissim. In pellentesque tempus fermentum. Donec malesuada facilisis massa, id bibendum magna laoreet et. Vivamus gravida mi nec auctor molestie. Nunc a hendrerit ligula. Integer pharetra ligula et dui ultrices pellentesque. Cras elementum eros ac pretium eleifend. Donec sollicitudin libero non nisl suscipit sagittis. Vestibulum dictum malesuada velit. Praesent id erat et mauris suscipit feugiat in sed eros. Cras quis mattis sem. Nulla nec quam id eros suscipit maximus eleifend eu elit.</p>
                    <p>Etiam in nisl eros. Aliquam interdum lobortis ipsum. Aliquam tempor justo augue. Nullam non dictum ipsum. Nullam finibus dui magna, et condimentum lacus convallis at. Quisque vitae enim sem. Vestibulum accumsan mattis neque. Fusce faucibus, tellus eget volutpat bibendum, justo elit aliquam magna, interdum tempor erat erat eget metus. Nullam vel sollicitudin augue, vel imperdiet odio.</p>
                </RowItem>
            );
        }
        return rowItems;
    }

    renderButton() {
        return <button onClick={this.handleButtonClick.bind(this)}>{this.state.message}</button>;
    }

    render() {
        return <Floaty style={{width: 400, height: 200}} dispatch={store.dispatch} layout={store.getState()} theme={base} refs={{button: this.renderButton()}}/>;
    }
}

const container = document.createElement('div');
document.body.appendChild(container);

ReactDOM.render(<App/>, container);

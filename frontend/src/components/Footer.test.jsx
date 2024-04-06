import Footer from "./Footer";
import renderer from 'react-test-renderer';
import { Provider } from "react-redux";
import store from "../stores/store";

describe('lol', () => {
    it('meow', () => {
        const component = renderer.create(<Provider store={store}><Footer /></Provider>)
        
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot();

        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})
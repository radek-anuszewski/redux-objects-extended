import {useRef, useState} from "react";
import { connect, useSelector, useDispatch } from "react-redux";

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_INVOICE = 'UPDATE_INVOICE';
export const UPDATE_RANDOM_TEXT = 'UPDATE_RANDOM_TEXT';

const App = () => {
  return (
    <>
        <UserForm />
        <DataDisplayContainerLotsOfRerenders />
        <DataDisplayContainerLessRerenders />
    </>
  );
};

export default App;


const DataDisplay = ({ title, data }) => {
    const rerenderCount = useRef(0);

    return (
        <div style={{ border: '1px solid black', padding: 16 }}>
            <h2>{title}</h2>
            <h3>{data.name} {data.surname}, elements on invoice:</h3>
            {Object.entries(data.invoice).map(([key, value], index) => (
                <div key={index}>{key}: {value}</div>
            ))}
            <small>Rerenders: {rerenderCount.current++}</small>
        </div>
    );
};

const DataDisplayContainerLotsOfRerenders = (() => {
    const mapStateToProps = state => {
        const data = {
            name: state.user.name,
            surname: state.user.surname,
            invoice: state.invoice,
        };

        return {
            title: 'Lots of rerenders',
            data,
        };
    };

    const Component = props => <DataDisplay {...props} />

    return connect(mapStateToProps)(Component);
})();

const DataDisplayContainerLessRerenders = (() => {
    const mapStateToProps = state => {
        return {
            user: state.user,
            invoice: state.invoice,
        };
    };

    const Component = props => {
        const data = {
            name: props.user.name,
            surname: props.user.surname,
            invoice: props.invoice,
        };

        return <DataDisplay title="Less rerenders" data={data}/>;
    }

    return connect(mapStateToProps)(Component);
})();

const UserForm = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [invoice, setInvoice] = useState({ field: '', value: 0 });

    const onChange = e => dispatch({
        type: UPDATE_USER,
        payload: { field: e.target.id, value: e.target.value }
    });
    
    const updateInvoice = e => setInvoice(invoice => ({
        ...invoice,
        [e.target.id]: e.target.value,
    }));
    
    const addInvoice = () => {
        dispatch({
            type: UPDATE_INVOICE,
            payload: invoice,
        });
        setInvoice({ field: '', value: 0 });
    };

    const updateRandomText = e => dispatch({
        type: UPDATE_RANDOM_TEXT,
        payload: e.target.value,
    });

    return (
        <>
            <form>
                <fieldset>
                    <legend>User</legend>
                    <label htmlFor="name">Name</label><input id="name" type="text" value={user.name} onChange={onChange} /><br />
                    <label htmlFor="surname">Surname</label><input id="surname" type="text" value={user.surname} onChange={onChange} /><br />
                </fieldset>
                <fieldset>
                    <legend>Invoice</legend>
                    <label htmlFor="field">Invoice element name</label><input id="field" type="text" value={invoice.field} onChange={updateInvoice} /><br />
                    <label htmlFor="value">Invoice element value</label><input id="value" type="text" value={invoice.value} onChange={updateInvoice} /><br />
                    <button type="button" onClick={addInvoice}> Add invoice element</button>
                </fieldset>
                <fieldset>
                    <legend>Some random text to update in store</legend>
                    <label htmlFor="randomText">Random text</label><input id="randomText" type="text" onChange={updateRandomText} /><br />
                </fieldset>
            </form>
        </>
    )
}

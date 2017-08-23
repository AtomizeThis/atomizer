import React from 'react';
// import { connect } from 'react-redux';
// import { search } from '../redux/concepts'
// import { getSuggestions } from '../redux/suggestions'

const Modal = (props) => (
        <div className="modal" style={{display: props.visible ? 'block' : 'none'}} id="myModal">
            <div className="modal-content">
                <div className="modal-header">
                    <span className="close">&times;</span>
                    <h2>The Real Freakin' Deal</h2>
                </div>
                <div className="modal-body">
                    <p>Some text in the Modal Body</p>
                    <p>Some other text...</p>
                </div>
                <div className="modal-footer">
                    <h3>Modal Footer</h3>
                </div>
            </div>
        </div>
)

export default Modal

// class Test extends Component {
//     render() {
//         return (
//             <div>
//                 <MyComponent text={'1'} />
//                 <MyComponent text={'2'} />
//             </div>
//         );
//     }
// }

// const mapState = null
// const mapDispatch = null
// export default connect(mapState, mapDispatch)(Modal);


import React, { Component } from 'react';

const Character = props => {
    const card = props.characters.map((row, index) => {
                const userName = (row.name || "").split(' ');
                const userLogo = userName[0].charAt(0) + (userName[1] || "").charAt(0);
        return (
            <div className="col-md-4 col-lg-3 tileContainer" key={index}>
                <div className="card text-center" count={index + 1}>
                    <div className="card-header logoHeader bg-warning">
                        {userLogo}
                    </div>   
                    <div className="card-body">
                        <h5 className="card-title">{row.name}</h5>
                        <button onClick={() => props.selectCharacter(index)} className="btn btn-primary" >Details</button>
                    </div>
                </div>
            </div>
        );
    });

    return <div className="col-sm-12 row">{card}</div>;
}

// const Character = props => {
//     const card = props.characters.map((row, index) => {
//         const userName = (row.name || "").split(' ');
//         const userLogo = userName[0].charAt(0) + (userName[1] || "").charAt(0);
//         return (
//             <div key={index} className="btn-group btnGroup">
//                 <button className="btnLogo btn btn-warning">{userLogo} </button>
//                 <button className="btnName btn" onClick={() => props.selectCharacter(index)}>{row.name} </button>
//             </div>
//         );
//     });

//     return <div className="btn-group-vertical">{card}</div>;
// }

class Body extends Component {
    render() {
        const { characters, selectCharacter } = this.props;
        return (
            // <div className="container">
            //     <div className="col-sm-3 col-md-3 col-lg-2">
            //         <div className="row">
            //             <Character characters={characters} selectCharacter={selectCharacter} />
            //         </div>
            //     </div>
            //     <div className="col-sm-9 col-md-9 col-lg-10">
            //         <div className="container">
            //             <div className="col-sm-12 row">
            //             </div>
            //         </div>
            //     </div>
            // </div>
            <div className="container">
                <Character characters={characters} selectCharacter={selectCharacter} />
                <div ></div>
            </div>
        )
    }
}

export default Body;
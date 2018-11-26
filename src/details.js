import React, { Component } from 'react';
import moment from 'moment'

const LeftPanel = props => {
    let data = props.character || {};
    const userName = (data.name || "").split(' ');
    const userLogo = userName[0].charAt(0) + (userName[1] || "").charAt(0);
    return <div className="col-md-5 col-lg-4">
        <div className="card">
            <div className="card-header bg-info logoHeader">
                {userLogo}
            </div>
            <div className="card-body">
                <div className="card-title">{data.name}</div>
                <table className="table table-sm">
                    <tbody>
                        <tr>
                            <td>Gender</td>
                            <td className="text-capitalize">{data.gender}</td>
                        </tr>
                        <tr>
                            <td>DOB</td>
                            <td>{data.birth_year}</td>
                        </tr>
                        <tr>
                            <td>Height</td>
                            <td>{data.height}</td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td>{data.mass} KG</td>
                        </tr>
                        <tr>
                            <td>Color</td>
                            <td className="text-capitalize">{data.skin_color}</td>
                        </tr>
                        <tr>
                            <td>Hair Color</td>
                            <td className="text-capitalize">{data.hair_color}</td>
                        </tr>
                        <tr>
                            <td>Eye Color</td>
                            <td className="text-capitalize">{data.eye_color}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>;
}

const Films = props => {
    const allFilms = props.allFilms || {};
    const data = (props.films || []).map((link, index) => {
        let episodeId = (link.match(/\/\d+\/$/)[0] || "").replace(/\//g, '');
        let film = allFilms[episodeId];
        let date = moment(film.release_date).format('LLLL').replace('12:00 AM','');
        return (
            <div key={index} className="col-md-12 ">
                <div className="card flex-md-row shadow-sm">
                    <div className="card-body d-flex flex-column align-items-start">
                        <strong className="d-inline-block mb-2 text-primary"></strong>
                        <h3 className="mb-0">
                            <a className="text-dark" href={link}>{film.title}</a>
                        </h3>
                        <div className="mb-1 text-muted">{date}</div>
                        <div> 
                            <span className="badge badge-secondary p-2 m-1">Director: {film.director}</span>
                            <span className="badge badge-secondary p-2 m-1">Producer: {film.producer}</span>
                        </div>
                        <p className="card-text mb-auto">{film.opening_crawl}</p>
                    </div>
                </div>
            </div>
        );
    });

    return <div className="row pb-2"> {data} </div>;
}

// const Links = props => {
//     const data = (props.data || []).map((link, index) => {
//         return (
//             <div key={index} className="alert alert-light" role="alert">
//                 <a href={link}> {link} </a>
//             </div>
//         );
//     });

//     return <div className="card-body"> {data} </div>;
// }

const RightPanel = props => {
    let data = props.character || {};
    const allFilms = props.allFilms || {};
    return <div className="col-md-7 col-lg-8">
        <div className="accordion" id="allDetails">
            <div className="card">
                <div className="card-header" id="filmHeading">
                    <h5 className="mb-0">
                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#films"
                            aria-expanded="true" aria-controls="films">
                            Films ({data.films.length})
                        </button>
                    </h5>
                </div>

                <div id="films" className="collapse show" aria-labelledby="filmHeading" data-parent="#allDetails">
                    <Films films={data.films} allFilms={allFilms}/>
                </div>
            </div>
            {/* <div className="card">
                <div className="card-header" id="starshipHeading">
                    <h5 className="mb-0">
                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#starships"
                            aria-expanded="true" aria-controls="starships">
                            Starships
                        </button>
                    </h5>
                </div>

                <div id="starships" className="collapse show" aria-labelledby="starshipHeading" data-parent="#allDetails">
                    <div className="card-body">
                        <Links data={data.starships} />
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header" id="specieHeading">
                    <h5 className="mb-0">
                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#species"
                            aria-expanded="true" aria-controls="species">
                            Species
                        </button>
                    </h5>
                </div>

                <div id="species" className="collapse show" aria-labelledby="specieHeading" data-parent="#allDetails">
                    <div className="card-body">
                        <Links data={data.species} />
                    </div>
                </div>
            </div>
            <div className="card" hidden={!data.vehicles.length} >
                <div className="card-header" id="vehicleHeading">
                    <h5 className="mb-0">
                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#vehicle"
                            aria-expanded="true" aria-controls="vehicle">
                            Vehicles
                        </button>
                    </h5>
                </div>

                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#allDetails">
                    <div className="card-body">
                        <Links data={data.vehicles} />
                    </div>
                </div>
            </div> */}
        </div>
    </div>;
}

class Details extends Component {
    render() {
        const { character, closeCharacter, allFilms } = this.props;
        return (
            <div className="container tileContainer">
                <div className="col-md-1 row float-right pb-2">
                    <button onClick={() => closeCharacter()} className="btn btn-warning" aria-label="Close">
                        <span aria-hidden="true">Back</span>
                    </button>
                </div>
                <div className="col-md-12 row">
                    <LeftPanel character={character} />
                    <RightPanel character={character} allFilms={allFilms} />
                </div>
            </div>
        )
    }
}

export default Details;
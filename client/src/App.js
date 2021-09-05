import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
class App extends Component {
  constructor() {
    super();
    this.state = {
      _id: "",
      id: "",
      first_name: "",
      last_name: "",
      donations: "",
      total: "",
      image: "",
      des: "",
      donors: [],
      pages: 1,
      spage: 1
    };
    this.addDonor = this.addDonor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changePage = this.changePage.bind(this);
  }
  changePage(e){
    this.fetchDonor();
  e.preventDefault();
  }
  
  addDonor(e) {
  
      fetch("http://localhost:5000/api", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data === "Se creo un nuevo Donante") {
            toast.success(data);
          } else {
            toast.error(data);
          }
          this.fetchDonor();
        }) //respuesta
        .catch((err) => console.log(err));
    
    e.preventDefault();
    e.target.reset();
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  componentDidMount() {
    
    this.countPageDonor();
    this.fetchDonor();
  }
  countPageDonor() {
    fetch(`http://localhost:5000/api/page`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.setState({ pages: data });
        // console.log(this.state.pages);
      })
      .catch((err) => console.log(err));
  }

  // eliminar donate 
  deleteDonor(id) {
    console.log(id);
    fetch(`http://localhost:5000/api/id${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        toast.success(data);
        this.fetchDonor();
      })
      .catch((err) => console.log(err));
  }

  fetchDonor() {
    fetch(`http://localhost:5000/api/page${this.state.spage}`)
      .then((res) => res.json())
      .then((data) => {
         console.log(data)
    
        if(typeof data === 'string'){
            if(data === 'No Hay Datos'){
              toast.success('No Hay Ragistros');
            }else{
            toast.error('No hay más paginas');
          }
        }else{
        this.setState({ donors: data });
      }
      })
      .catch((err) => console.log(err));
  }



  render() {
    return (
      <div className="container">
        {/* inpunt donante */}
        <div className="row">
          <div className="border border-success rounded mt-5 p-4">
            <h1 className="text-center text-success">
              <i className="bi bi-person-plus-fill "></i> Ingrese un Nuevo
              Donante
            </h1>
            <form onSubmit={this.addDonor} className="form-row">
              <div className="form-group col-md-1">
                <input
                  type="number"
                  name="id"
                  placeholder="Id"
                  className="form-control"
                  onChange={this.handleChange} 
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <input
                  type="text"
                  name="first_name"
                  placeholder="Nombre donante"
                  className="form-control"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-5">
                <input
                  type="text"
                  name="last_name"
                  placeholder="Apellido del donate"
                  className="form-control"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-2">
                <input
                  type="number"
                  name="donations"
                  placeholder=" # donate"
                  className="form-control"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-3">
                <input
                  type="number"
                  min="0"
                  name="total"
                  placeholder="valor"
                  className="form-control"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-7">
                <input
                  type="text"
                  name="image"
                  placeholder="url de la imagen"
                  className="form-control"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-10">
                <textarea
                  className="form-control"
                  placeholder="Ingrese una descripcion"
                  name="description"
                  onChange={this.handleChange}
                ></textarea>
              </div>

              <div className="form-group col-md-2">
                <button type="submit" className="btn btn-outline-success">
                  <i className="bi bi-person-check-fill"></i>Agrega un Nuevo
                  Donante
                </button>
              </div>
            </form>
          </div>

          <div className="col-md-7"></div>
          <div className="col-md-5 justify-content-end mt-2 ">
            <form onSubmit={this.changePage} className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text" id="btnGroupAddon">
                  Páginas {this.state.pages}
                </div>
              </div>

              <input
                onChange={this.handleChange}
                type="number"
                className="form-control"
                placeholder="ir a la pagina..."
                name="spage"
                aria-label="Input group example"
                aria-describedby="btnGroupAddon"
              />
              <button type="submit" className="btn btn-secondary ml-1">
                OK
              </button>
            </form>
          </div>
        </div>

        <div className="row">
          <h4 className="mt-4 text-center text-danger">Lista de Donantes</h4>
          <table className="table table-sm">
            <thead>
              <tr className="text-danger text-center">
                <th scope="col"> Id</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>donación</th>
                <th>Total</th>
                <th>Foto</th>
                <th>Descripción</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody className="text-center">
            {   
              this.state.donors.map( donor => { 
                  return (
                    
                    <tr>
                      <td>{donor.id}</td>
                      <td>{donor.first_name}</td>
                      <td>{donor.last_name}</td>
                      <td>{donor.donations}</td>
                      <td>{donor.total.$numberDecimal}</td>
                      <td>
                        <img src={donor.image} width="50" height="50" />
                      </td>
                      <td>{donor.description}</td>
                      
                      <td>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => this.deleteDonor(donor.id)}
                        >
                          <i className="bi bi-person-dash-fill"></i> Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;

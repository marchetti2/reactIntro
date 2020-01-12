import React, { Component } from "react";
import TechItem from "./TechItem";

class TechList extends Component {
  state = {
    newTech: "",
    techs: [],
    verify: false
  };

  //executado assim que o componente aparece em tela
  componentDidMount() {
    const techs = localStorage.getItem("techs");

    if (techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }
  //executado sempre quando houver alteraçoes nas props ou estado
  componentDidUpdate(_, prevState) {
    if (prevState.techs !== this.state.techs) {
      localStorage.setItem("techs", JSON.stringify(this.state.techs));
    }
  }

  //executado quando o componente deixa de existir
  componentWillUnmount() {}

  handleInputChange = e => {
    this.setState({ newTech: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.techs.indexOf(this.state.newTech) === -1) {
      this.setState({
        techs: [...this.state.techs, this.state.newTech],
        newTech: "",
        verify: false
      });
    } else {
      this.setState({ verify: true });
      //return alert("tech alread exist");
    }
  };

  handleDelete = tech => {
    this.setState({ techs: this.state.techs.filter(t => t !== tech) });
  };

  render() {
    const { verify } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          {this.state.techs.map(tech => (
            <TechItem
              key={tech}
              tech={tech}
              onDelete={() => this.handleDelete(tech)}
            />
          ))}
        </ul>
        <input
          type="text"
          onChange={this.handleInputChange}
          value={this.state.newTech}
        />
        <button type="submit">Enviar</button>
        {verify ? <p>tech alread exist</p> : null}
      </form>
    );
  }
}

export default TechList;

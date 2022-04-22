import { connect } from "http2";
import React, { Component } from "react";
import { useEffect } from "react";

export default class CategoryDropdown extends React.Component<{container: HTMLDivElement}> {

  open: boolean;

  constructor(props: any) {
    super(props)
    this.open = false;
  }

  handleButtonClick = () => {
    this.setState(state => {
      return {
        open: !this.open
      };
    });
  };

  render() {
    return (
      <>
        <ul>
          <li>
            <a className="w-32" onClick={this.handleButtonClick} href="#">Categoria</a>
            <div className={`${open() ? "visible" : "invisible"}`}>
              <a className="no-underline " href="https://starbuycommerce.herokuapp.com/category/1">Eletrônico</a>
              <a className="no-underline" href="https://starbuycommerce.herokuapp.com/category/2">Vestuário</a>
              <a className="no-underline" href="https://starbuycommerce.herokuapp.com/category/4">Livros</a>
              <a className="no-underline" href="https://starbuycommerce.herokuapp.com/category/7">Música</a>
              <a className="no-underline" href="https://starbuycommerce.herokuapp.com/category/3">Casa</a>
            </div>
          </li>
        </ul>
      </>
    )
  }
}
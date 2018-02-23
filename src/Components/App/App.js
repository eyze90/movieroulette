import React, { Component } from 'react'
import './App.css'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import BottomNav from '../BottomNav/BottomNav'
import WatchList from '../WatchList/WatchList'
// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import { GridList } from 'material-ui/GridList'

class App extends Component {
  constructor() {
    super()
    this.state = {
      searchResults: [],
      watchList: [],
      view: 'Search' // Search or WatchList
    }
  }

  handleResults = (searchResults) => {
    this.setState({
      searchResults: searchResults
    })
  }

  clearResults = () => {
    this.setState({
      searchResults: []
    })
  }

  addMovie = (movie, add) => {
    const { watchList } = this.state
    if(add === true) { 
      this.setState({
        watchList: watchList.concat(movie) 
      })
    } else {
      watchList.splice(watchList.indexOf(movie), 1)
      this.setState({
        watchList: watchList
      })
    }
  }
  
  updateView = (view) => {
    this.setState({
      view: view
    })
  }

  render() {
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        // backgroundColor: '#141B41'
      },
      fixedNav: {
        position: 'fixed',
        zIndex: 10,
        width: '100%'
      },
      offset: {
        paddingTop: 120
      },
      displayFixed: {
        position: 'sticky',
        bottom: 0,
        overflow: 'hidden'
      },
      centerText: {
        textAlign: 'center'
      }
    }

    return (
      <MuiThemeProvider>
        <div className="container-fluid">
          <div className="row" style={styles.fixedNav} >
            <AppBar title="???" titleStyle={styles.centerText} showMenuIconButton={false} />
            <SearchBar handleResults={this.handleResults} clearResults={this.clearResults} />
          </div>
          <main className="row" style={{...styles.offset, }}>
            <SearchResults view={this.state.view} searchResults={this.state.searchResults} addMovie={this.addMovie} watchList={this.state.watchList} />
            <WatchList view={this.state.view} watchList={this.state.watchList} />
          </main>
            <BottomNav updateView={this.updateView} style={styles.displayFixed} />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
